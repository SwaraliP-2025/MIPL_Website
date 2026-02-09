import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { websiteContent } from './websiteKnowledge.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced AI response function with comprehensive knowledge
function generateResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Simple one-word/short questions - concise answers
  
  // Email
  if (message === 'email' || message === 'email?' || message === 'email address') {
    return `📧 ${websiteContent.contact.email}`;
  }
  
  // Phone
  if (message === 'phone' || message === 'phone?' || message === 'phone number' || message === 'contact number') {
    return `📱 ${websiteContent.contact.phone}`;
  }
  
  // Address
  if (message === 'address' || message === 'address?' || message === 'location' || message === 'where') {
    return `📍 ${websiteContent.contact.headquarters}`;
  }
  
  // Founded
  if (message === 'founded' || message === 'when founded' || message === 'established') {
    return `Founded in ${websiteContent.company.founded}`;
  }
  
  // Experience
  if (message === 'experience' || message === 'how long' || message === 'years') {
    return `${websiteContent.company.experience} of experience in security & IT consulting`;
  }
  
  // Services count
  if (message === 'services' || message === 'how many services') {
    return `We offer ${websiteContent.services.length} core services: ${websiteContent.services.map(s => s.name).join(', ')}`;
  }
  
  // Greetings - brief
  if (message.match(/^(hi|hello|hey)$/)) {
    return `Hello! I'm MIPL's assistant. Ask me about our services, team, projects, or contact info. What would you like to know?`;
  }
  
  // Longer greetings
  if (message.match(/^(good morning|good afternoon|good evening|namaste)/)) {
    return `Hello! I'm MIPL's virtual assistant. I can help with:\n• Services & Technologies\n• Projects & Clients\n• Leadership Team\n• Contact Info\n\nWhat interests you?`;
  }
  
  // About company
  if (message.includes('about') || message.includes('who are you') || message.includes('company') || message.includes('mipl')) {
    return `${websiteContent.company.fullDescription}\n\n📍 Founded: ${websiteContent.company.founded}\n📍 Experience: ${websiteContent.company.experience}\n\n🎯 Mission: ${websiteContent.company.mission}\n\n🔭 Vision: ${websiteContent.company.vision}\n\nWe have offices in ${websiteContent.contact.locations.join(', ')}.`;
  }
  
  // Services - General
  if (message.includes('service') && !message.includes('specific') || message.includes('what do you do') || message.includes('offerings')) {
    return `We offer 6 core services:\n\n${websiteContent.services.map((s, i) => `${i + 1}. ${s.name}`).join('\n')}\n\nFor detailed information, visit our Services page or ask about a specific service.`;
  }
  
  // Security Consultancy
  if (message.includes('security consult') || message.includes('enterprise security')) {
    const service = websiteContent.services[0];
    return `${service.name}:\n\n${service.description}\n\nWe specialize in:\n• Enterprise-class security solutions\n• Safe city & smart city programs\n• AI & IOT in security management\n• Risk assessment & mitigation\n\nWant to know more about our approach?`;
  }
  
  // TRAVA / Security Audits
  if (message.includes('trava') || message.includes('audit') || message.includes('risk analysis') || message.includes('vulnerability')) {
    return `${websiteContent.trava.name} (${websiteContent.trava.fullName}):\n\n${websiteContent.trava.description}\n\n✅ Key Features:\n${websiteContent.trava.features.map(f => `• ${f}`).join('\n')}\n\nTRAVA helps organizations identify vulnerabilities in hardware, software, networks, and assess staff sensitivity in data handling. Our experienced team can conduct audits, suggest improvements, and implement necessary changes.`;
  }

  // Smart City / Safe City
  if (message.includes('smart city') || message.includes('safe city')) {
    const smartCity = websiteContent.services.find(s => s.name === 'Smart City');
    const safeCity = websiteContent.services.find(s => s.name === 'Safe City');
    return `🏙️ Smart City Solutions:\n${smartCity.description}\n\n🛡️ Safe City Solutions:\n${safeCity.description}\n\n📊 Our Safe City Projects:\n${websiteContent.projects.filter(p => p.category === 'Safe City').map(p => `• ${p.name} (${p.client})`).join('\n')}\n\nWe've successfully implemented safe city projects in Thane, Kolhapur, Nanded, Aurangabad, Nashik, and other cities across India.`;
  }
  
  // eGovernance
  if (message.includes('egovernance') || message.includes('e-governance') || message.includes('government') || message.includes('digital governance')) {
    const service = websiteContent.services.find(s => s.name === 'eGovernance Consultancy');
    return `${service.name}:\n\n${service.description}\n\n🏆 Notable Project:\nUdaan iMEGA eGovernance project - recognized with national & international awards for innovative implementation.\n\nWe have 20+ years of experience working with government departments, PSUs, and large public sector organizations.`;
  }
  
  // Technologies
  if (message.includes('technology') || message.includes('cctv') || message.includes('biometric') || message.includes('access control') || message.includes('intrusion')) {
    return `🔧 Our Technology Focus Areas:\n\n${websiteContent.technologies.map(t => `${t.name}:\n${t.description}\n\nCapabilities:\n${t.capabilities.slice(0, 3).map(c => `• ${c}`).join('\n')}`).join('\n\n')}\n\nWe provide end-to-end solutions from design to implementation.`;
  }
  
  // Leadership - General
  if (message.includes('director') || message.includes('leadership') || message.includes('team') || message.includes('founder')) {
    return `Our Directors:\n• Prasad Patil - Director, MIPL\n• Sudhir Deshpande - Director, MIPL\n\nTo know more about them, visit our About page.`;
  }
  
  // Prasad Patil
  if (message.includes('prasad')) {
    const prasad = websiteContent.leadership[0];
    return `${prasad.name} - ${prasad.role}\n📚 ${prasad.education}\n\nPrasad is one of the leading security consultants and safe city experts in India with 20+ years of experience.\n\nFor complete details, visit our About page.`;
  }
  
  // Sudhir Deshpande
  if (message.includes('sudhir')) {
    const sudhir = websiteContent.leadership[1];
    return `${sudhir.name} - ${sudhir.role}\n📚 ${sudhir.education}\n\nSudhir is a leading consultant in security management, CCTV systems, and access control technologies with 20+ years of experience.\n\nFor complete details, visit our About page.`;
  }

  // Projects / Clients
  if (message.includes('client') || message.includes('project') || message.includes('work') || message.includes('portfolio')) {
    return `Our Notable Clients:\n\n${websiteContent.projects.slice(0, 6).map(p => `• ${p.client}`).join('\n')}\n\nAnd many more! Visit our Projects page to see all our work.`;
  }
  
  // Specific projects
  if (message.includes('hpcl') || message.includes('biometric project')) {
    const project = websiteContent.projects.find(p => p.name.includes('iBACS'));
    return `${project.name}:\n\nClient: ${project.client}\n\n${project.description}\n\nThis is one of the largest biometric access control projects in the world, implemented across all HPCL facilities nationwide with centralized authentication and enhanced security.`;
  }
  
  if (message.includes('aurangabad') || message.includes('sambhajinagar')) {
    const project = websiteContent.projects.find(p => p.name.includes('Aurangabad'));
    return `${project.name}:\n\nClient: ${project.client}\n\n${project.description}\n\nThis comprehensive smart city project includes command & control center, city-wide surveillance, traffic management, and integrated citizen services.`;
  }
  
  // Industries
  if (message.includes('industr') || message.includes('sector') || message.includes('domain')) {
    return `🏭 Industries We Serve:\n\n${websiteContent.industries.map(i => `${i.name}:\n${i.description.substring(0, 150)}...`).join('\n\n')}\n\nWe have specialized expertise in each sector with tailored security solutions.`;
  }
  
  // Petroleum / Oil & Gas
  if (message.includes('petroleum') || message.includes('oil') || message.includes('gas') || message.includes('refinery')) {
    const industry = websiteContent.industries[0];
    return `${industry.name}:\n\n${industry.description}\n\n🏭 Notable Projects:\n• Nayara Energy (Essar Oil) Jamnagar - Comprehensive refinery security\n• HPCL Mumbai Refinery - Security infrastructure modernization\n• First Command & Control system in Indian refinery (2018)\n\nWe've tackled security threats in some of the most volatile environments in the world.`;
  }
  
  // Banking / ATM
  if (message.includes('bank') || message.includes('atm') || message.includes('financial')) {
    const industry = websiteContent.industries.find(i => i.name.includes('Banks'));
    return `${industry.name}:\n\n${industry.description}\n\nOur solutions provide:\n• Real-time actionable analytics\n• Efficient incident response\n• Technology + manpower protection\n• Theft and robbery prevention\n\nWe understand the unique security challenges in the banking sector.`;
  }

  // Awards / Recognition
  if (message.includes('award') || message.includes('recognition') || message.includes('achievement') || message.includes('excellence')) {
    return `🏆 Awards & Recognition:\n\n• Security Excellence Awards, London (Finalist 2014, 2015, 2017)\n• Udaan iMEGA eGovernance Project - National & International Recognition\n• Kolhapur Safe City Project - Award Winning\n• Nanded Safe City Project - Award Winning\n\nFor more details, visit our About page.`;
  }
  
  // Contact Information
  if (message.includes('contact') || message.includes('reach') || message.includes('phone') || message.includes('email') || message.includes('address') || message.includes('location') || message.includes('office')) {
    return `📞 Contact MIPL:\n\n📧 Email: ${websiteContent.contact.email}\n📱 Phone: ${websiteContent.contact.phone}\n\n📍 Headquarters:\n${websiteContent.contact.headquarters}\n\n🌍 Office Locations:\n${websiteContent.contact.locations.map(l => `• ${l}`).join('\n')}\n\n⏰ Working Hours: ${websiteContent.contact.workingHours}\n\n🔗 LinkedIn: ${websiteContent.contact.linkedin}\n\nFeel free to reach out for consultations or project inquiries!`;
  }
  
  // Careers / Jobs
  if (message.includes('career') || message.includes('job') || message.includes('opening') || message.includes('hiring') || message.includes('vacancy')) {
    return `💼 Current Job Openings at MIPL:\n\n${websiteContent.careers.map((j, i) => `${i + 1}. ${j.title}\n   📍 Location: ${j.location}\n   🏢 Department: ${j.department}\n   ⏰ Type: ${j.type}\n   📊 Experience: ${j.experience}\n   ${j.description}`).join('\n\n')}\n\n✨ Why Join MIPL?\n• Work on cutting-edge security projects\n• Collaborative culture with industry experts\n• Career growth opportunities\n• Work-life balance\n\nInterested? Visit our Careers page or email us at ${websiteContent.contact.email}`;
  }
  
  // History / Journey / Milestones
  if (message.includes('history') || message.includes('journey') || message.includes('milestone') || message.includes('founded') || message.includes('established')) {
    return `📅 MIPL's Journey:\n\n${websiteContent.milestones.map(m => `${m.year} - ${m.title}\n${m.description}`).join('\n\n')}\n\nFrom our founding in 2000 to becoming an award-winning consultancy, we've consistently delivered excellence in security and IT solutions across India and internationally.`;
  }
  
  // Values / Culture
  if (message.includes('value') || message.includes('culture') || message.includes('principle')) {
    return `🌟 Our Core Values:\n\n${websiteContent.company.coreValues.map(v => `${v.name}:\n${v.description}`).join('\n\n')}\n\nThese principles guide everything we do at MIPL, from client engagements to project delivery.`;
  }
  
  // Training
  if (message.includes('training') || message.includes('workshop') || message.includes('education')) {
    const service = websiteContent.services.find(s => s.name === 'Security Training');
    return `${service.name}:\n\n${service.description}\n\nWe offer:\n• Generic technology training\n• Project-specific implementation training\n• Handholding support during rollout\n• Staff sensitization programs\n• Technology appropriateness workshops\n\nOur training ensures your team can effectively use and maintain security systems.`;
  }

  // SECONA
  if (message.includes('secona')) {
    return `SECONA (Security Consultants' Association):\n\nA non-profit association of security consultants formed to work in the field of training, certification, standardisation & guidelines for security technologies.\n\n👥 Leadership:\n• Prasad Patil - Founder Chairman\n• Sudhir Deshpande - Member Secretary\n\nSECONA works towards establishing professional standards and best practices in the security consulting industry in India.`;
  }
  
  // Aatman
  if (message.includes('aatman')) {
    return `Aatman Educational Society:\n\nA non-profit trust that manages Aatman Academy, an inclusive school for children with learning differences & disabilities.\n\n👥 Founders:\n• Prasad Patil - Founder Trustee\n• Sudhir Deshpande - Founder Trustee\n\nBoth MIPL directors are deeply committed to inclusive education and social responsibility.`;
  }
  
  // Experience / Expertise
  if (message.includes('experience') || message.includes('expertise') || message.includes('qualification')) {
    return `MIPL's Experience & Expertise:\n\n📊 ${websiteContent.company.experience} in security & IT consulting\n🏆 Award-winning consultancy with international recognition\n🌍 ${websiteContent.contact.locations.length} office locations\n\n🎯 Core Expertise:\n• Enterprise security solutions\n• Safe & Smart City projects\n• Government & PSU projects\n• Industrial security (refineries, ports, airports)\n• CCTV, Biometrics, Access Control\n• Command & Control systems\n• Risk assessment & audits (TRAVA)\n\nOur team has successfully delivered complex, integrated projects across diverse sectors.`;
  }
  
  // Why choose MIPL
  if (message.includes('why mipl') || message.includes('why choose') || message.includes('advantage') || message.includes('benefit')) {
    return `Why Choose MIPL?\n\n✅ ${websiteContent.company.experience} of proven experience\n✅ Award-winning projects with international recognition\n✅ End-to-end capabilities from design to implementation\n✅ Expertise in AI & IOT integration\n✅ Proprietary TRAVA risk analysis tool\n✅ Led by India's leading security consultants\n✅ Successful delivery across diverse sectors\n✅ Focus on "appropriateness" of technology\n✅ Comprehensive training & support\n✅ Strong government & PSU relationships\n\nMIPL has the expertise, acumen, technology, will and resolve to ensure safety and security of systems entrusted to us.`;
  }
  
  // Pricing / Cost / Quote
  if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('budget')) {
    return `For pricing and project quotes, I recommend:\n\n1. 📞 Call us: ${websiteContent.contact.phone}\n2. 📧 Email: ${websiteContent.contact.email}\n3. 🌐 Book a consultation through our website\n\nOur team will assess your specific requirements and provide a customized quote based on:\n• Project scope and complexity\n• Technology requirements\n• Implementation timeline\n• Training and support needs\n\nEach project is unique, and we ensure our solutions are tailored to your security needs and budget.`;
  }
  
  // Default response with suggestions - concise
  return `I can help with:\n\n• Services & Technologies\n• Projects & Clients  \n• Leadership Team\n• Awards & Recognition\n• Career Opportunities\n• Contact Information\n\nWhat would you like to know?`;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = generateResponse(message);
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MIPL Chatbot API is running' });
});

app.listen(PORT, () => {
  console.log(`🤖 MIPL Chatbot API running on http://localhost:${PORT}`);
  console.log(`📚 Knowledge base loaded with comprehensive website content`);
});
