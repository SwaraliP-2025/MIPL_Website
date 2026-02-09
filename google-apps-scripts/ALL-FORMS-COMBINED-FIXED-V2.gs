
function forceDrivePermission() {
  try {
    var folder = DriveApp.createFolder('TEST_PERMISSION_FOLDER');
    Logger.log('Folder created: ' + folder.getName());
    folder.setTrashed(true);
    Logger.log('Test folder deleted');
    return 'Drive permissions granted successfully!';
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}

// ============================================================================
// MAIN HANDLER - SINGLE doPost FUNCTION
// ============================================================================

function doPost(e) {
  try {
    Logger.log('=== FORM SUBMISSION RECEIVED ===');
    
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('ERROR: No postData received');
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'No data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = JSON.parse(e.postData.contents);
    Logger.log('Received data type: ' + (data.type || 'form submission'));
    
    // Handle login requests FIRST
    if (data.type === 'login') {
      Logger.log('Processing LOGIN request');
      return handleLogin(data);
    }
    
    // Handle form submissions based on form type
    if (data.jobTitle) {
      Logger.log('Processing CAREERS form');
      return handleCareersForm(data);
    } else if (data.serviceInterest !== undefined || (data.firstName && data.lastName && data.message)) {
      Logger.log('Processing CONTACT form');
      return handleContactForm(data);
    } else if (data.email && data.name && data.informative) {
      Logger.log('Processing CTB FEEDBACK form');
      return handleFeedbackForm(data);
    }
    
    Logger.log('ERROR: Unknown form type');
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': 'Unknown form type'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// LOGIN HANDLER
// ============================================================================

function handleLogin(data) {
  try {
    Logger.log('Login attempt for: ' + data.email);
    const email = data.email;
    const password = data.password;
    
    // Validate email domain
    if (!email.endsWith('@consultmipl.com')) {
      Logger.log('Login failed: Invalid email domain');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Only @consultmipl.com email addresses are allowed'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get credentials from Script Properties
    const scriptProperties = PropertiesService.getScriptProperties();
    const storedPassword = scriptProperties.getProperty(email);
    
    if (!storedPassword) {
      Logger.log('Login failed: User not found');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'User not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (storedPassword === password) {
      Logger.log('✅ Login successful for: ' + email);
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Login successful'
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      Logger.log('Login failed: Invalid password');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Invalid password'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('❌ Login error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Login failed: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Setup function to store credentials (run this once manually)
function setupLoginCredentials() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // Add users here - format: email: password
  const users = {
    'admin@consultmipl.com': 'Admin@123',
    'user@consultmipl.com': 'User@123'
    // Add more users as needed
  };
  
  scriptProperties.setProperties(users);
  Logger.log('✅ Login credentials setup complete');
  Logger.log('Users configured: ' + Object.keys(users).join(', '));
}

// ============================================================================
// CAREERS FORM - WITH DRIVE UPLOAD
// ============================================================================

function handleCareersForm(data) {
  Logger.log('Processing CAREERS form');
  Logger.log('Job Title: ' + data.jobTitle);
  Logger.log('Applicant: ' + data.firstName + ' ' + data.lastName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Careers Applications");
  
  if (!sheet) {
    Logger.log('Creating new Careers Applications sheet');
    sheet = ss.insertSheet("Careers Applications");
    sheet.appendRow([
      "Timestamp", "Job Title", "First Name", "Last Name", "Email", "Phone",
      "Date of Birth", "Current Location", "Education", "Work Status",
      "Work Status Other", "Years of Experience", "Current Salary", "Cover Letter", "Resume URL"
    ]);
    var headerRange = sheet.getRange(1, 1, 1, 15);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0d47a1");
    headerRange.setFontColor("#ffffff");
  }
  
  var timestamp = getFormattedTimestamp();
  
  // Upload resume
  var resumeUrl = "";
  if (data.resumeFile && data.resumeFileName) {
    Logger.log('Resume file detected: ' + data.resumeFileName);
    resumeUrl = uploadResumeToDrive(data.firstName, data.lastName, data.resumeFileName, data.resumeFile);
  } else {
    Logger.log('⚠️ No resume file in request');
  }
  
  sheet.appendRow([
    timestamp,
    data.jobTitle || "",
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.phone || "",
    data.dateOfBirth || "",
    data.currentLocation || "",
    data.education || "",
    data.workStatus || "",
    data.workStatusOther || "",
    data.yearsExperience || "",
    data.currentSalary || "",
    data.coverLetter || "",
    resumeUrl
  ]);
  
  Logger.log('✅ Careers application saved to sheet');
  
  return ContentService.createTextOutput(JSON.stringify({
    "status": "success",
    "message": "Application submitted successfully",
    "resumeUploaded": resumeUrl ? true : false
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// RESUME UPLOAD
// ============================================================================

function uploadResumeToDrive(firstName, lastName, fileName, fileData) {
  try {
    Logger.log('Starting resume upload...');
    
    var folderName = 'MIPL Resumes';
    var folder = getFolderByName(folderName);
    
    if (!folder) {
      Logger.log('Creating folder: ' + folderName);
      folder = DriveApp.createFolder(folderName);
    } else {
      Logger.log('Folder found: ' + folderName);
    }
    
    var base64Data = fileData;
    if (base64Data.indexOf(',') !== -1) {
      base64Data = base64Data.split(',')[1];
      Logger.log('Removed data URL prefix');
    }
    
    var fullFileName = firstName + '_' + lastName + '_' + fileName;
    Logger.log('Creating file: ' + fullFileName);
    
    var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'application/pdf', fullFileName);
    Logger.log('Blob created');
    
    var file = folder.createFile(blob);
    Logger.log('File created with ID: ' + file.getId());
    
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    Logger.log('File sharing set');
    
    var fileUrl = file.getUrl();
    Logger.log('✅ Resume uploaded successfully!');
    Logger.log('File URL: ' + fileUrl);
    
    return fileUrl;
    
  } catch (error) {
    Logger.log('❌ Resume upload error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return "Upload failed: " + error.toString();
  }
}

function getFolderByName(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  return folders.hasNext() ? folders.next() : null;
}

// ============================================================================
// CONTACT FORM
// ============================================================================

function handleContactForm(data) {
  Logger.log('Processing CONTACT form');
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Contact Form");
  
  if (!sheet) {
    sheet = ss.insertSheet("Contact Form");
    sheet.appendRow([
      "Timestamp", "First Name", "Last Name", "Email", "Organization", "Service Interest", "Message"
    ]);
    var headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0d47a1");
    headerRange.setFontColor("#ffffff");
  }
  
  var timestamp = getFormattedTimestamp();
  
  sheet.appendRow([
    timestamp,
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.organization || "",
    data.serviceInterest || "",
    data.message || ""
  ]);
  
  Logger.log('✅ Contact form saved');
  
  return ContentService.createTextOutput(JSON.stringify({
    "status": "success",
    "message": "Form submitted successfully"
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// CTB FEEDBACK FORM
// ============================================================================

function handleFeedbackForm(data) {
  Logger.log('Processing CTB FEEDBACK form');
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("CTB Feedback");
  
  if (!sheet) {
    sheet = ss.insertSheet("CTB Feedback");
    var headers = ['Email', 'Your Name', 'How Informative (1-5)', 
                   'Impact Coverage (1-5)', 'IT Projects Interested', 'Mobile Apps Interested', 
                   'Overall Design Rating (1-5)', 'Additional Feedback', 'Send Copy', 'Timestamp'];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
  
  var timestamp = getFormattedTimestamp();
  
  var rowData = [
    data.email || '',
    data.name || '',
    data.informative || '',
    data.impact || '',
    Array.isArray(data.projects) ? data.projects.join('\n') : '',
    Array.isArray(data.apps) ? data.apps.join('\n') : '',
    data.design || '',
    data.feedback || '',
    data.sendCopy ? 'Yes' : 'No',
    timestamp
  ];
  
  sheet.appendRow(rowData);
  Logger.log('✅ Feedback saved');
  
  var emailResult = 'not_requested';
  if (data.sendCopy && data.email) {
    try {
      sendFeedbackEmail(data.email, data);
      emailResult = 'sent';
      Logger.log('✅ Email sent');
    } catch (emailError) {
      Logger.log('❌ Email error: ' + emailError.toString());
      emailResult = 'failed';
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Form submitted successfully!',
    'emailStatus': emailResult
  })).setMimeType(ContentService.MimeType.JSON);
}

function sendFeedbackEmail(email, data) {
  var subject = 'Your response on Chhatrapati Sambhajinagar CTB';
  var plainBody = 'Thank you for your feedback on the Chhatrapati Sambhajinagar Digital Coffee Table Book.';
  
  var headerFileId = '1Dna7c6_I1T30MnzikSkDscFBR56LIYFd';
  var headerImageUrl = 'https://drive.google.com/uc?export=view&id=' + headerFileId;

  var htmlBody = '<!DOCTYPE html><html><body style="font-family: Arial, sans-serif;">';
  htmlBody += '<img src="' + headerImageUrl + '" style="width:100%; max-width:700px;"><br>';
  htmlBody += '<h2>Feedback on Digital Coffee Table Book</h2>';
  htmlBody += '<p><strong>Name:</strong> ' + (data.name || '') + '</p>';
  htmlBody += '<p><strong>Email:</strong> ' + (data.email || '') + '</p>';
  htmlBody += '<p><strong>Informative Rating:</strong> ' + (data.informative || '') + '/5</p>';
  htmlBody += '<p><strong>Impact Rating:</strong> ' + (data.impact || '') + '/5</p>';
  htmlBody += '<p><strong>Design Rating:</strong> ' + (data.design || '') + '/5</p>';
  htmlBody += '</body></html>';
 
  GmailApp.sendEmail(email, subject, plainBody, {htmlBody: htmlBody});
  return true;
}

// ============================================================================
// UTILITY
// ============================================================================

function getFormattedTimestamp() {
  var now = new Date();
  var day = ('0' + now.getDate()).slice(-2);
  var month = ('0' + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();
  var hours = ('0' + now.getHours()).slice(-2);
  var minutes = ('0' + now.getMinutes()).slice(-2);
  var seconds = ('0' + now.getSeconds()).slice(-2);
  return "'" + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}

function doGet(e) {
  return ContentService.createTextOutput("MIPL All Forms Script is running!");
}
