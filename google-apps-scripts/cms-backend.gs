const CMS_ADMIN_EMAIL = 'info@consultmipl.com';
const CMS_ADMIN_PASSWORD = 'Mipl@2000';

const ALLOWED_SHEETS = [
  'SiteConfig', 'Services', 'Projects', 'Jobs',
  'Gallery', 'Publications', 'Leadership', 'Stats',
  'SocialActivities', 'HeroContent', 'Achievements',
  'NavbarConfig', 'FooterConfig', 'LogoConfig', 'Journey',
  'ClientLogos', 'Testimonials'
];

// ── CORS helper ──────────────────────────────────────────────
function corsResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GET handler ──────────────────────────────────────────────
function doGet(e) {
  try {
    var action = e.parameter.action;
    var sheet  = e.parameter.sheet;

    // Health check
    if (action === 'ping') {
      return corsResponse({ success: true, message: 'CMS backend is live' });
    }

    // Get all content for a sheet
    if (action === 'getSheet' && sheet) {
      return getSheetData(sheet);
    }

    // Get all sheets at once (for full site load)
    if (action === 'getAllContent') {
      return getAllContent();
    }

    return corsResponse({ success: false, message: 'Unknown action: ' + action });
  } catch (err) {
    return corsResponse({ success: false, message: err.toString() });
  }
}

// ── POST handler ─────────────────────────────────────────────
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;

    // Auth check for all write operations
    if (action === 'login') {
      return handleLogin(body.email, body.password);
    }

    // All other POST actions require auth token
    if (!validateToken(body.token)) {
      return corsResponse({ success: false, message: 'Unauthorized' });
    }

    if (action === 'saveRow')    return saveRow(body.sheet, body.row, body.rowIndex);
    if (action === 'deleteRow')  return deleteRow(body.sheet, body.rowIndex);
    if (action === 'addRow')     return addRow(body.sheet, body.row);
    if (action === 'saveSheet')  return saveSheet(body.sheet, body.rows);
    if (action === 'initSheets') return initAllSheets();
    if (action === 'uploadImage') return uploadImageToDrive(body.fileName, body.fileData, body.mimeType || 'image/jpeg');

    return corsResponse({ success: false, message: 'Unknown action: ' + action });
  } catch (err) {
    return corsResponse({ success: false, message: err.toString() });
  }
}

// ── Auth ─────────────────────────────────────────────────────
function handleLogin(email, password) {
  if (email === CMS_ADMIN_EMAIL && password === CMS_ADMIN_PASSWORD) {
    // Simple token: base64 of email:timestamp (good enough for internal CMS)
    var token = Utilities.base64Encode(email + ':' + Date.now());
    // Store token in script properties with 8h expiry
    PropertiesService.getScriptProperties().setProperty(
      'cms_token_' + token,
      String(Date.now() + 8 * 60 * 60 * 1000)
    );
    return corsResponse({ success: true, token: token, email: email });
  }
  return corsResponse({ success: false, message: 'Invalid credentials' });
}

function validateToken(token) {
  if (!token) return false;
  var props = PropertiesService.getScriptProperties();
  var expiry = props.getProperty('cms_token_' + token);
  if (!expiry) return false;
  if (Date.now() > parseInt(expiry)) {
    props.deleteProperty('cms_token_' + token);
    return false;
  }
  return true;
}

// ── Read ─────────────────────────────────────────────────────
function getSheetData(sheetName) {
  if (ALLOWED_SHEETS.indexOf(sheetName) === -1) {
    return corsResponse({ success: false, message: 'Sheet not allowed: ' + sheetName });
  }

  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return corsResponse({ success: true, sheet: sheetName, headers: [], rows: [] });
  }

  var data    = sheet.getDataRange().getValues();
  if (data.length === 0) {
    return corsResponse({ success: true, sheet: sheetName, headers: [], rows: [] });
  }

  var headers = data[0].map(function(h) { return h.toString().trim(); });
  var rows    = [];

  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j] !== undefined ? data[i][j].toString() : '';
    }
    rows.push(row);
  }

  return corsResponse({ success: true, sheet: sheetName, headers: headers, rows: rows });
}

function getAllContent() {
  var result = {};
  for (var i = 0; i < ALLOWED_SHEETS.length; i++) {
    var name = ALLOWED_SHEETS[i];
    var res  = JSON.parse(getSheetData(name).getContent());
    result[name] = res.rows || [];
  }
  return corsResponse({ success: true, content: result });
}

// ── Write ─────────────────────────────────────────────────────
// Save a single row (rowIndex is 0-based data row, not sheet row)
function saveRow(sheetName, rowData, rowIndex) {
  var sheet = getOrCreateSheet(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  var values = headers.map(function(h) {
    return rowData[h] !== undefined ? rowData[h] : '';
  });

  // +2 because row 1 = headers, rowIndex is 0-based
  var sheetRow = rowIndex + 2;
  sheet.getRange(sheetRow, 1, 1, values.length).setValues([values]);

  return corsResponse({ success: true, message: 'Row saved' });
}

// Add a new row
function addRow(sheetName, rowData) {
  var sheet   = getOrCreateSheet(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  var values = headers.map(function(h) {
    return rowData[h] !== undefined ? rowData[h] : '';
  });

  sheet.appendRow(values);
  return corsResponse({ success: true, message: 'Row added' });
}

// Delete a row (rowIndex is 0-based data row)
function deleteRow(sheetName, rowIndex) {
  var sheet    = getOrCreateSheet(sheetName);
  var sheetRow = rowIndex + 2; // +2: header row + 0-based index
  sheet.deleteRow(sheetRow);
  return corsResponse({ success: true, message: 'Row deleted' });
}

// Replace entire sheet content (used for bulk save)
function saveSheet(sheetName, rows) {
  var sheet   = getOrCreateSheet(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Clear data rows (keep header)
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }

  // Write new rows
  for (var i = 0; i < rows.length; i++) {
    var values = headers.map(function(h) {
      return rows[i][h] !== undefined ? rows[i][h] : '';
    });
    sheet.getRange(i + 2, 1, 1, values.length).setValues([values]);
  }

  return corsResponse({ success: true, message: 'Sheet saved with ' + rows.length + ' rows' });
}

// ── Sheet initializer ─────────────────────────────────────────
// Call this once to create all sheets with correct headers
function initAllSheets() {
  var definitions = {
    'SiteConfig': ['key', 'value'],
    'Services':   ['id', 'title', 'description', 'icon', 'features'],
    'Projects':   ['id', 'title', 'category', 'client', 'challenge', 'solution', 'result', 'image'],
    'Jobs':       ['id', 'title', 'department', 'location', 'type', 'experience', 'description', 'requirements'],
    'Gallery':    ['id', 'category', 'title', 'description', 'image', 'date'],
    'Publications': ['id', 'title', 'authors', 'journal', 'year', 'category', 'abstract', 'link'],
    'Leadership': ['id', 'name', 'designation', 'education', 'vision', 'image'],
    'Stats':      ['page', 'label', 'value', 'icon'],
    'SocialActivities': ['id', 'title', 'description', 'image', 'category'],
    'HeroContent': ['page', 'heading', 'subheading', 'description'],
    'Achievements': ['id', 'title', 'description', 'year', 'icon'],
    'NavbarConfig': ['name', 'href', 'dropdown_items', 'order'],
    'FooterConfig': ['section', 'key', 'value', 'order'],
    'LogoConfig': ['type', 'src', 'alt', 'width', 'height', 'order'],
    'Journey':    ['id', 'year', 'title', 'description'],
    'ClientLogos': ['id', 'name', 'logo'],
    'Testimonials': ['id', 'quote', 'author', 'company', 'role']
  };

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  for (var name in definitions) {
    var existing = ss.getSheetByName(name);
    if (!existing) {
      var newSheet = ss.insertSheet(name);
      var headers  = definitions[name];
      newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Style header row
      var headerRange = newSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4a5568');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      newSheet.setFrozenRows(1);

      Logger.log('Created sheet: ' + name);
    } else {
      Logger.log('Sheet already exists: ' + name);
    }
  }

  // Seed SiteConfig with defaults if empty
  var configSheet = ss.getSheetByName('SiteConfig');
  if (configSheet && configSheet.getLastRow() <= 1) {
    var defaults = [
      ['company_name',    'Maha Infotech Pvt. Ltd. (MIPL)'],
      ['tagline',         'A New Era of Security'],
      ['address',         '708, Plot - B Lodha Supremus, Sandozbaugh, Thane, Maharashtra 400607, INDIA'],
      ['email',           'info@consultmipl.com'],
      ['phone',           '+91 22 XXXX XXXX'],
      ['website',         'https://consultmipl.com'],
      ['linkedin',        ''],
      ['twitter',         ''],
      ['footer_text',     '© 2025 All Copyrights Reserved by MIPL'],
      ['about_intro',     'MIPL is a leading security & IT consultancy firm from India.'],
      ['hero_cta_text',   'Book Consultation'],
      ['hero_cta_link',   '/contact'],
    ];
    configSheet.getRange(2, 1, defaults.length, 2).setValues(defaults);
  }

  return corsResponse({ success: true, message: 'All sheets initialized successfully' });
}

// ── Helper ────────────────────────────────────────────────────
function getOrCreateSheet(name) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    Logger.log('Auto-created sheet: ' + name);
  }
  return sheet;
}


// ============================================================
// SEED FUNCTION — Run this ONCE from Apps Script editor to
// populate all sheets with the current website data.
// Select "seedAllData" from the function dropdown and click Run.
// ============================================================
function seedAllData() {
  initAllSheets(); // ensure sheets + headers exist first

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ── SERVICES ─────────────────────────────────────────────
  var servicesData = [
    ['cctv', 'CCTV', 'Video management is not only about capturing, but also about transmission, recording and analytics.', 'Camera', 'IP Camera Network Design & Deployment,Video Management Systems (VMS),AI-Based Video Analytics,Facial Recognition Integration,License Plate Recognition (ANPR),Cloud & On-Premise Storage Solutions'],
    ['biometrics', 'BIOMETRICS', 'Biometric identification, authentication & verification... unimodal or multimodal from fingerprints to vascular to face recognition to iris.', 'Shield', 'Fingerprint Recognition Systems,Vascular Pattern Recognition,Face Recognition Technology,Iris Scanning Solutions,Unimodal & Multimodal Systems,Access Control Integration'],
    ['intrusion-detection', 'INTRUSION DETECTION', 'PIDS – or perimeter intrusion detection systems – offer establishments a proactive tool to tackle a potential criminal before the incident is committed.', 'Shield', 'Perimeter Security Systems,Motion Detection & Alerts,Thermal Imaging Integration,Fence-Mounted Sensors,Underground Detection Systems,Real-Time Threat Assessment'],
    ['command-control', 'COMMAND & CONTROL', 'Designing the command & control is a critical task since wrong designs will always lead to faulty implementations.', 'Cpu', 'Command Center Architecture,Integrated Security Operations,Real-Time Monitoring Systems,Emergency Response Coordination,Multi-Agency Integration,Decision Support Systems'],
    ['access-control', 'ACCESS CONTROL', 'Anything that comes in or goes out of an enterprise has to be identified, controlled and monitored.', 'Shield', 'Card-Based Access Systems,Biometric Access Control,Vehicle Access Management,Visitor Management Systems,Emergency Lockdown Protocols,Integration with CCTV & Alarms'],
  ];
  _seedSheet(ss, 'Services', ['id','title','description','icon','features'], servicesData);

  // ── PROJECTS ─────────────────────────────────────────────
  var projectsData = [
    ['1','Aurangabad Smart City','smart-city','Aurangabad Smart City Development Corporation Limited','Comprehensive smart city infrastructure with integrated security, traffic management, and citizen services.','End-to-end smart city solution with command & control center, city-wide surveillance, and integrated services.','Successfully deployed smart city infrastructure enhancing urban management and citizen services.','public/projects/0148.png'],
    ['2','Integrated Security Management System','industrial','Nayara Energy (formerly Essar Oil), Jamanagar','Comprehensive security management for one of India\'s largest refineries with complex infrastructure.','Integrated security solution with CCTV, access control, perimeter security, and command & control systems.','Enhanced security posture with real-time monitoring and incident management capabilities.','projects/Nayara.jpg'],
    ['3','Surveillance at all district and tehsil courts of Madhya Pradesh','government','Hon High Court of Madhya Pradesh, Jabalpur','Surveillance systems for all district courts across Madhya Pradesh as per Supreme Court mandate.','Centralized surveillance architecture with video management systems deployed across multiple court locations.','Comprehensive security coverage for judicial infrastructure with centralized monitoring.','projects/MP_HIGH_COURT_JABALPUR_-_panoramio.jpg'],
    ['4','Integrated security & surveillance system','industrial','MRPL, Mangalore Refinery','Securing a large-scale refinery with high-risk operational zones and critical assets.','End-to-end integrated security and surveillance system covering perimeter protection, access control, and centralized monitoring.','Improved operational safety, threat detection, and centralized security management.','projects/Hydrocracker_Units.jpg'],
    ['5','Integrated security & surveillance system','industrial','HPCL — Mumbai Refinery','Modernization of security infrastructure for critical petroleum facility.','Integrated security management system with advanced CCTV, access control, and analytics.','Enhanced security with improved incident response and compliance with safety regulations.','projects/hpclmum.jpg'],
    ['6','Security consultancy for physical & electronic security','enterprise','Surat Diamond Bourse','High-security infrastructure for world\'s largest diamond trading center.','Multi-layered security with biometric access, CCTV surveillance, and intrusion detection systems.','World-class security infrastructure protecting high-value assets and ensuring business continuity.','projects/suratdiam.jpg'],
    ['7','Security consultancy for ELV & Communication','industrial','IOCL Bio-refinery (Through Praj)','Designing ELV and communication systems for a next-generation bio-refinery.','Security consultancy for ELV systems including surveillance, networking, and communication infrastructure.','Reliable and scalable security architecture aligned with refinery operations.','projects/iocl.jpg'],
    ['8','Access Control & Security Systems','enterprise','BNP Paribas','Ensuring secure access and compliance for a global banking environment.','Advanced access control and integrated security systems across facilities.','Enhanced physical security and regulatory compliance.','projects/bnppari.jpg'],
    ['9','Integrated Security Management System with C4I','industrial','Privi Organics','Managing security across a chemical manufacturing facility.','Integrated Security Management System with C4I-based command and control.','Centralized security operations and improved situational awareness.',''],
    ['10','Integrated Video Surveillance System (IVSS) for LPG Bottling Divisions','industrial','HPCL — LPG SBU','Monitoring multiple LPG bottling plants with consistent security standards.','Integrated Video Surveillance System (IVSS) across HPCL LPG divisions.','Uniform surveillance and improved safety compliance.',''],
    ['11','Integrated Security Management Project','enterprise','Ganjam Jewellers','Protecting high-value retail assets against theft and intrusion.','Integrated security with video surveillance, access control, and intrusion detection.','Secure retail operations with enhanced customer confidence.','projects/ganjam.jpg'],
    ['12','City Surveillance System, Bharuch','smart-city','Gujarat Police','Improving public safety through city-wide surveillance.','City surveillance system with centralized monitoring and analytics.','Enhanced law enforcement capabilities and public safety.',''],
    ['13','Integrated Port Management & Security System','industrial','Gujarat Maritime Board','Securing port infrastructure and maritime operations.','Integrated Port Management and Security System.','Improved port safety, monitoring, and operational efficiency.',''],
    ['14','Security Consultancy Services','enterprise','Hiranandani Group','Comprehensive security planning for large real estate developments.','End-to-end security consultancy services.','Well-planned, scalable, and future-ready security infrastructure.',''],
    ['15','Security Consultancy Services','industrial','Adani Power','Securing large-scale power generation facilities.','Security consultancy covering risk assessment and system design.','Improved asset protection and operational resilience.',''],
    ['16','IP-based Biometric Access Control System (iBACS)','industrial','HPCL','Standardizing access control across nationwide facilities.','Centralized biometric authentication system with integration to existing security infrastructure.','Standardized access control across all HPCL locations with enhanced security and audit trails.',''],
    ['17','Pipeline Perimeter Intrusion Detection System','industrial','HPCL','Protecting long-distance pipelines from intrusion and sabotage.','Advanced perimeter intrusion detection systems.','Early threat detection and reduced operational risk.',''],
    ['18','Video Surveillance System','smart-city','Navi Mumbai Municipal Corporation','Enhancing urban safety through technology.','City-wide video surveillance system.','Improved monitoring and faster response to incidents.',''],
    ['19','Nanded Safe City Project','smart-city','Nanded Municipal Corporation, Maharashtra','Strengthening city security infrastructure.','Integrated safe city surveillance and command center.','Improved public safety and crime monitoring.',''],
    ['20','Electronic Locking Systems for Fuel Trucks','industrial','HPCL','Preventing fuel theft during transportation.','Electronic locking systems for fuel trucks.','Reduced pilferage and improved logistics security.',''],
    ['21','CCTV Upgradation of O&D terminals','industrial','HPCL','Upgrading legacy surveillance infrastructure.','Modern IP-based CCTV systems across terminals.','Improved video quality and centralized monitoring.',''],
    ['22','Kolhapur Safe City Project','smart-city','Kolhapur Municipal Corporation, Maharashtra','Enhancing safety across urban public spaces.','Integrated safe city surveillance infrastructure.','Improved city security and crime prevention.',''],
    ['23','Amravati Safe City','smart-city','Amravati Municipal Corporation, Maharashtra','City-wide public safety enhancement.','Safe city surveillance and monitoring system.','Strengthened law enforcement and citizen safety.',''],
    ['24','Upgrading security at Vidhan Bhavan, Mumbai & Nagpur','government','Maharashtra Legislative Secretariat Maharashtra','Securing critical government infrastructure.','Upgradation of security systems at Vidhan Bhavan, Mumbai and Nagpur.','Enhanced protection for legislative premises.',''],
    ['25','Video Surveillance','industrial','Jawaharlal Nehru Port Trust (JNPT)','Comprehensive security for India\'s largest container port with critical infrastructure.','Integrated port security solution with perimeter protection, access control, and surveillance.','Enhanced port security meeting international standards with improved operational efficiency.',''],
    ['26','Gurgaon CCTV Project','smart-city','Gurgaon Municipal Corporation','Urban surveillance for crime prevention.','City-wide CCTV surveillance system.','Improved public safety and monitoring.',''],
    ['27','Security & Fire Risk Analysis','government','Indian Institute of Management, Bangalore','Assessing security and fire risks in a large academic campus.','Comprehensive security and fire risk analysis.','Improved campus safety and compliance.',''],
    ['28','Godhra Safe City Project','smart-city','Gujarat Police','State-wide safe city infrastructure with integrated security management.','Comprehensive safe city solution with surveillance, analytics, and emergency management systems.','Enhanced public safety infrastructure in Godhra.',''],
    ['29','Thane City Surveillance Control Room','smart-city','Thane Police, Maharashtra','City-wide surveillance and emergency response system for public safety.','Integrated safe city platform with video surveillance, analytics, and command & control center.','Improved public safety with real-time monitoring and faster emergency response times.',''],
    ['30','Aurangabad Safe City Project','smart-city','Aurangabad Municipal Corporation','Implementing smart surveillance across the city.','Integrated safe city solution with centralized command center.','Enhanced urban safety and surveillance efficiency.',''],
  ];
  _seedSheet(ss, 'Projects', ['id','title','category','client','challenge','solution','result','image'], projectsData);

  // ── JOBS ─────────────────────────────────────────────────
  var jobsData = [
    ['Accounts & Admin Executive','Daily Accounting tasks, account finalisation, TDS, GST Payroll, PF, income tax, coordination with CA & CS, other financial and accounting tasks.','Thane, Maharashtra','4 to 6 Years','B.Com in Commerce','ERP System, Accounts'],
    ['Data Analyst','MIPL is looking for a data analyst to work across GIS and eGovernance domains. The job involves cross department coordination, with the goal being increase in city taxes. The opening is based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra.','Chhatrapati Sambhajinagar, Maharashtra','4 to 6 Years','UG: B.B.A / B.M.S. in Any Specialization, B.Sc in Any Specialization, Any Graduate','MS Office, Smart Cities, eGovernance'],
    ['Resident Construction Manager','Handling civil, electrical & instrumentation project management onsite, for a refinery project and a school project, working out of Mangalore.','Mangaluru, Karnataka','6 to 8 Years','B.E /Diploma in Civil','Construction Management, Site Exectution, Civil Engineering'],
  ];
  _seedSheet(ss, 'Jobs', ['title','description','location','experience','education','key skills'], jobsData);

  // ── GALLERY ───────────────────────────────────────────────
  var galleryData = [
    ['1','Awards','1st in ICCC Infrastructure','Ranked 1st in ICCC Infrastructure (IMAF Audit) mentored by Mr. Prasad Patil, Director of MIPL','/awards/ICCC Awards3.png','2025'],
    ['2','Events','Annual Security Summit','Industry leaders gathering at MIPL hosted summit','/awards/summit.jpg','2023'],
    ['3','Team','Team Building Workshop','MIPL team collaboration and training session','/placeholder-team.jpg','2023'],
    ['4','Projects','Smart City Project Launch','Inauguration of major smart city security project','/placeholder-project.jpg','2022'],
    ['5','Awards','Best IT Consultancy Award','Awarded for excellence in IT consulting services','/placeholder-award2.jpg','2022'],
    ['6','Events','Cricket League','MIPL Cricket Tournament','/events/cricket-match.jpg','2025'],
  ];
  _seedSheet(ss, 'Gallery', ['id','category','title','description','image','date'], galleryData);

  // ── PUBLICATIONS ──────────────────────────────────────────
  var pubsData = [
    ['1','IVSS for District & Subordinate Courts of Madhya Pradesh','MIPL Team','Internal','2022','Case Study','Comprehensive risk analysis and design of an integrated video surveillance system with distributed monitoring across 201 court premises to meet Supreme Court security mandates.','/publications/CASE STUDY1_MIPL.pdf'],
    ['2','ISMS for Mangalore Refineries & Petrochemicals Ltd.','MIPL Team','Internal','2020','Case Study','Comprehensive documentation of security rollout for court premises following Supreme Court mandates.','/publications/CASE STUDY 2_MIPL.pdf'],
  ];
  _seedSheet(ss, 'Publications', ['id','title','authors','journal','year','category','abstract','link'], pubsData);

  // ── HERO CONTENT ──────────────────────────────────────────
  var heroData = [
    ['home','A New Era of Security','Maha Infotech Pvt. Ltd.','MIPL is a leading security & IT consultancy firm from India, offering sustainable designs and solutions.'],
    ['about','About MIPL','Our Story','Learn about our journey, values, and the team behind MIPL.'],
    ['services','Why MIPL?','Our Services','MIPL has the expertise, acumen, technology, will and the resolve to ensure safety and security.'],
    ['projects','Our Clients','Project Portfolio','Explore our portfolio of security and smart city projects across India.'],
    ['gallery','Gallery','Our Journey in Pictures','Explore our milestones, achievements, and memorable moments.'],
    ['careers','Career Opportunities','Join Our Team','Join Maha Infotech Pvt. Ltd. and be part of a team shaping the future of security.'],
    ['contact','Get in Touch','Contact Us','Reach out to us for consultations, partnerships, or any queries.'],
    ['publications','Publications & Research','Knowledge Sharing','Sharing expertise through technical papers, white papers, and case studies.'],
    ['social-activities','Social Contribution','Giving Back','Our commitment to education, community, and social responsibility.'],
  ];
  _seedSheet(ss, 'HeroContent', ['page','heading','subheading','description'], heroData);

  // ── SITE CONFIG ───────────────────────────────────────────
  var configSheet = ss.getSheetByName('SiteConfig');
  if (configSheet && configSheet.getLastRow() <= 1) {
    var configData = [
      ['company_name','Maha Infotech Pvt. Ltd. (MIPL)'],
      ['tagline','A New Era of Security'],
      ['address','708, Plot - B Lodha Supremus, Sandozbaugh, Thane, Maharashtra 400607, INDIA'],
      ['email','info@consultmipl.com'],
      ['phone','+91 22 XXXX XXXX'],
      ['website','https://consultmipl.com'],
      ['linkedin',''],
      ['twitter',''],
      ['footer_text','© 2025 All Copyrights Reserved by MIPL'],
      ['about_intro','MIPL is a leading security & IT consultancy firm from India.'],
      ['hero_cta_text','Book Consultation'],
      ['hero_cta_link','/contact'],
    ];
    configSheet.getRange(2, 1, configData.length, 2).setValues(configData);
  }

  // ── STATS ─────────────────────────────────────────────────
  var statsData = [
    // About page stats
    ['about', 'Years of Experience', '25+', 'Users'],
    ['about', 'Office Locations', '4', 'Globe'],
    ['about', 'Winning Consultancy', 'Award', 'Award'],
    // Social Activities impact stats
    ['social', 'Students Supported', '500+', 'Users'],
    ['social', 'Awareness Programs', '50+', 'Target'],
    ['social', 'Years of Service', '15+', 'Heart'],
    ['social', 'Community Initiatives', '10+', 'HandHeart'],
  ];
  _seedSheet(ss, 'Stats', ['page','label','value','icon'], statsData);

  // ── ACHIEVEMENTS ──────────────────────────────────────────
  var achievementsData = [
    ['1', 'Security Excellence Awards - Finalist', 'First international recognition for outstanding contributions to security technology and management.', '2014', 'Trophy'],
    ['2', 'Security Excellence Awards - Finalist', 'Second consecutive year as finalist, showcasing consistent excellence in security management.', '2015', 'Trophy'],
    ['3', 'Security Excellence Awards - Finalist', 'Recognized as finalist for innovative security solutions and implementations in the international arena.', '2017', 'Trophy'],
    ['4', 'Nanded Safe City Project', 'Implemented comprehensive safe city solution recognized nationally and internationally for its innovative approach and effectiveness.', '2017', 'Award'],
    ['5', 'Kolhapur Safe City Project', 'Delivered integrated surveillance and security management system for enhanced public safety recognized nationally and internationally.', '2017', 'Award'],
  ];
  _seedSheet(ss, 'Achievements', ['id','title','description','year','icon'], achievementsData);

  // ── SOCIAL ACTIVITIES ─────────────────────────────────────
  var socialData = [
    ['1', 'Aatman Educational Society', 'Founded and managing a non-profit trust dedicated to inclusive education and supporting children with learning differences and disabilities.', '', 'Founder Trustee'],
    ['2', 'Aatman Academy', 'An inclusive school specifically designed for children with learning differences and disabilities, offering specialized curriculum and support systems.', '', 'Managing Trustee'],
    ['3', 'SECONA', 'Active member and secretary of Security Consultants Association of India, contributing to industry standards and best practices.', '', 'Member Secretary'],
  ];
  _seedSheet(ss, 'SocialActivities', ['id','title','description','image','category'], socialData);

  // ── LEADERSHIP ──────────────────────────────────────────
  var leadershipData = [
    ['1', 'Mr. Prasad Patil', 'Director, MIPL', 'Mechanical Engineering (COEP), MBA (IIM Bangalore)', 'Prasad is one of the leading security consultants and safe city experts in India. He has advised several municipal corporations, government departments, PSUs & large private sector organisations on the effective use of technology in the field of security management. He has nearly more than two decades of experience as a consultant in information technology and security management.', '/prasadsir.png'],
    ['2', 'Mr. Sudhir Deshpande', 'Director, MIPL', 'Electronics Engineering (JNEC Aurangabad)', 'Sudhir is a leading consultant in India in the field of security management, including large CCTV systems, access control technologies and emergency and disaster management preparedness. For the past 20 years, Mr. Deshpande has been actively advising large corporations on networking, communication and security management projects.', '/sudhir_sir-removebg-preview.png'],
  ];
  _seedSheet(ss, 'Leadership', ['id','name','designation','education','vision','image'], leadershipData);

  // ── JOURNEY ──────────────────────────────────────────────
  var journeyData = [
    ['1', '2000', 'Company Founded', 'MIPL established as security & IT consultancy'],
    ['2', '2010', 'Government Projects', 'Started major government and PSU projects'],
    ['3', '2015', 'Udaan iMEGA', 'Delivered Udaan iMEGA eGovernance project'],
    ['4', '2017', 'Kolhapur Safe City', 'Implemented Kolhapur Safe City project'],
    ['5', '2018', 'Refinery C&C', 'First Command & Control system in Indian refinery'],
    ['6', '2020', 'Court Security', 'Supreme Court-mandated security rollout for courts'],
  ];
  _seedSheet(ss, 'Journey', ['id', 'year', 'title', 'description'], journeyData);

  // ── STATS ──────────────────────────────────────────────
  var statsData = [
    ['home', '25', 'Years Experience', 'Users'],
    ['home', '50', 'Major Projects', 'Globe'],
    ['home', '500', 'Security Audits', 'Shield'],
    ['home', '100', 'Client Satisfaction', 'Award'],
    ['about', '25+', 'Years of Experience', 'Users'],
    ['about', '4', 'Office Locations', 'Globe'],
    ['about', 'Award', 'Winning Consultancy', 'Award'],
  ];
  _seedSheet(ss, 'Stats', ['page', 'value', 'label', 'icon'], statsData);

  // ── CLIENT LOGOS ──────────────────────────────────────────
  var clientLogosData = [
    ['1', 'HPCL', '/clients/hpcl-logo.png'],
    ['2', 'JNPT', '/clients/jnpt-logo.png'],
    ['3', 'Aurangabad Smart City', '/clients/ascdcl-logo.png'],
    ['4', 'IOCL', '/clients/iocl-logo.png'],
    ['5', 'BNP Paribas', '/clients/bnp-paribas.jpg'],
    ['6', 'Nayara Energy', '/clients/nayara-logo.jpg'],
    ['7', 'MRPL', '/clients/mrpl-logo.jpg'],
    ['8', 'Gujarat Police', '/clients/gujarat-police-logo.jpg'],
    ['9', 'Surat Diamond Bourse', '/clients/sdb-logo.png'],
    ['10', 'Maharashtra Govt', '/clients/maharashtra-logo.png'],
  ];
  _seedSheet(ss, 'ClientLogos', ['id', 'name', 'logo'], clientLogosData);

  // ── TESTIMONIALS ──────────────────────────────────────────
  var testimonialsData = [
    ['1', 'MIPL\'s integrated security solution has significantly enhanced our refinery\'s safety and operational efficiency. Their expertise in handling complex projects is unmatched.', 'Senior Manager', 'HPCL Mumbai Refinery', 'Operations & Security'],
    ['2', 'The smart city surveillance system implemented by MIPL has transformed our city\'s security infrastructure. Their end-to-end approach ensured seamless deployment.', 'Project Director', 'Aurangabad Smart City Development Corporation', 'Smart City Initiative'],
    ['3', 'Working with MIPL on our port security management system was exceptional. They delivered a world-class solution that meets international standards.', 'Chief Security Officer', 'Jawaharlal Nehru Port Trust', 'Port Security'],
  ];
  _seedSheet(ss, 'Testimonials', ['id', 'quote', 'author', 'company', 'role'], testimonialsData);

  // ── NAVBAR CONFIG ──────────────────────────────────────────
  var navbarData = [
    ['Home', '/', '', '1'],
    ['About', '/about', 'About MIPL,Our Achievements,Our Publications,Our Social Contribution,Gallery', '2'],
    ['Services', '/services', '', '3'],
    ['Our Clients', '/projects', '', '4'],
    ['Careers', '/careers', '', '5'],
    ['Contact', '/contact', '', '6'],
    ['CSN Digital Coffee Table Book', '/coffee-table-book', '', '7'],
  ];
  _seedSheet(ss, 'NavbarConfig', ['name','href','dropdown_items','order'], navbarData);

  // ── FOOTER CONFIG ───────────────────────────────────────────
  var footerData = [
    ['company', 'description', 'A New Era of Security. Security & IT consultancy from India.', '1'],
    ['company', 'linkedin_url', 'https://www.linkedin.com/company/mipl-security-&-it-consultants/about/', '2'],
    ['company', 'twitter_url', 'https://x.com/consultmipl', '3'],
    ['quicklinks', 'link_1_name', 'About Us', '4'],
    ['quicklinks', 'link_1_href', '/about', '5'],
    ['quicklinks', 'link_2_name', 'Our Team', '6'],
    ['quicklinks', 'link_2_href', '/about', '7'],
    ['quicklinks', 'link_3_name', 'Careers', '8'],
    ['quicklinks', 'link_3_href', '/careers', '9'],
    ['quicklinks', 'link_4_name', 'Contact', '10'],
    ['quicklinks', 'link_4_href', '/contact', '11'],
    ['services', 'service_1_name', 'Security Consultancy', '12'],
    ['services', 'service_1_href', '/services', '13'],
    ['services', 'service_2_name', 'Security Audits (TRAVA)', '14'],
    ['services', 'service_2_href', '/services', '15'],
    ['services', 'service_3_name', 'eGovernance', '16'],
    ['services', 'service_3_href', '/services', '17'],
    ['services', 'service_4_name', 'Smart City & Safe City', '18'],
    ['services', 'service_4_href', '/services', '19'],
    ['contact', 'email', 'info@consultmipl.com', '20'],
    ['contact', 'phone', '+91 98213 01414', '21'],
    ['contact', 'locations', 'Thane – Chhatrapati Sambhajinagar – Navi Mumbai – Dubai', '22'],
    ['bottom', 'copyright_text', '© 2026 Maha Infotech Pvt. Ltd. All rights reserved.', '23'],
    ['bottom', 'privacy_href', '/privacy', '24'],
    ['bottom', 'terms_href', '/terms', '25'],
  ];
  _seedSheet(ss, 'FooterConfig', ['section','key','value','order'], footerData);

  // ── LOGO CONFIG ─────────────────────────────────────────────
  var logoData = [
    ['main', '/logo.png', 'MIPL Logo', '140', '56', '1'],
  ];
  _seedSheet(ss, 'LogoConfig', ['type','src','alt','width','height','order'], logoData);

  Logger.log('✅ All data seeded successfully!');
  return 'Seeded successfully';
}

// Helper: seed a sheet only if it has no data rows yet
function _seedSheet(ss, sheetName, headers, rows) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    var hr = sheet.getRange(1, 1, 1, headers.length);
    hr.setBackground('#4a5568');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Only seed if sheet is empty (no data rows)
  if (sheet.getLastRow() <= 1) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
    Logger.log('Seeded ' + rows.length + ' rows into ' + sheetName);
  } else {
    Logger.log('Skipped ' + sheetName + ' — already has data');
  }
}


// ============================================================
// IMAGE UPLOAD — Saves base64 image to Google Drive and
// returns a public URL usable directly in <img src="...">
// Called via POST: { action: "uploadImage", fileName, fileData (base64), mimeType, token }
// ============================================================
function uploadImageToDrive(fileName, fileData, mimeType) {
  try {
    var folderName = 'MIPL Website CMS Images';
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    // Decode base64 and create file
    var decoded = Utilities.base64Decode(fileData);
    var blob = Utilities.newBlob(decoded, mimeType, fileName);
    var file = folder.createFile(blob);

    // Make publicly accessible (anyone with link can view)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // Return direct image URL (works as <img src>)
    var fileId = file.getId();
    var publicUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      url: publicUrl,
      fileId: fileId,
      fileName: fileName
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Image upload error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Upload failed: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
