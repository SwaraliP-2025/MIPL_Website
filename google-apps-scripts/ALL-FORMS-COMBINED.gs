function setupAllPermissions() {
  Logger.log('=== Setting up ALL permissions ===');
  
  try {
    // Test Sheets access
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('✅ Sheets access OK - Spreadsheet: ' + ss.getName());
    
    // Test Drive access
    var folders = DriveApp.getFoldersByName("MIPL Resumes");
    if (folders.hasNext()) {
      Logger.log('✅ Drive access OK - Folder already exists');
    } else {
      var folder = DriveApp.createFolder("MIPL Resumes");
      Logger.log('✅ Drive access OK - Created folder: ' + folder.getName());
    }
    
    // Test Gmail access
    var myEmail = Session.getEffectiveUser().getEmail();
    Logger.log('✅ Gmail access OK - Your email: ' + myEmail);
    
    GmailApp.sendEmail(
      myEmail,
      'All Permissions Authorized - MIPL Forms',
      'SUCCESS!\n\nAll permissions are authorized:\n✅ Google Sheets\n✅ Google Drive\n✅ Gmail\n\nYou can now deploy the script!'
    );
    
    Logger.log('=== ALL PERMISSIONS AUTHORIZED SUCCESSFULLY ===');
    return '✅ All permissions authorized! Check your email.';
    
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return '❌ Error: ' + error.toString();
  }
}

// ============================================================================
// MAIN HANDLER - Routes to correct form based on data
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
    
    // Route to correct form handler based on data fields
    if (data.jobTitle) {
      // CAREERS FORM (has jobTitle field)
      return handleCareersForm(data);
    } else if (data.firstName && data.lastName && data.message) {
      // CONTACT FORM (has firstName, lastName, message)
      return handleContactForm(data);
    } else if (data.email && data.name && data.informative) {
      // CTB FEEDBACK FORM (has email, name, informative rating)
      return handleFeedbackForm(data);
    } else {
      Logger.log('ERROR: Unknown form type');
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Unknown form type'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// CAREERS FORM HANDLER (with resume upload to Drive)
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
  
  // Get timestamp
  var timestamp = getFormattedTimestamp();
  
  // Handle resume file upload to Drive
  var resumeUrl = "";
  if (data.resumeFile && data.resumeFileName) {
    Logger.log('Resume file detected: ' + data.resumeFileName);
    Logger.log('Resume data length: ' + data.resumeFile.length + ' characters');
    
    try {
      // Get or create MIPL Resumes folder
      var folderName = 'MIPL Resumes';
      var folders = DriveApp.getFoldersByName(folderName);
      var folder;
      
      if (folders.hasNext()) {
        folder = folders.next();
        Logger.log('Folder found: ' + folder.getName());
      } else {
        folder = DriveApp.createFolder(folderName);
        Logger.log('Folder created: ' + folder.getName());
      }
      
      // Decode base64 and create file
      var base64Data = data.resumeFile;
      
      // Remove data URL prefix if present (data:application/pdf;base64,)
      if (base64Data.indexOf(',') !== -1) {
        base64Data = base64Data.split(',')[1];
        Logger.log('Removed data URL prefix');
      }
      
      var fileName = data.firstName + '_' + data.lastName + '_' + data.resumeFileName;
      Logger.log('Creating file: ' + fileName);
      
      // Decode base64 to bytes
      var decodedData = Utilities.base64Decode(base64Data);
      Logger.log('Decoded data length: ' + decodedData.length + ' bytes');
      
      // Create blob and file
      var blob = Utilities.newBlob(decodedData, 'application/pdf', fileName);
      var file = folder.createFile(blob);
      Logger.log('File created in Drive with ID: ' + file.getId());
      
      // Set file sharing to anyone with link
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      Logger.log('File sharing set to ANYONE_WITH_LINK');
      
      resumeUrl = file.getUrl();
      Logger.log('✅ Resume uploaded successfully!');
      Logger.log('File URL: ' + resumeUrl);
    } catch (uploadError) {
      Logger.log('❌ Resume upload error: ' + uploadError.toString());
      Logger.log('Error stack: ' + uploadError.stack);
      resumeUrl = "Upload failed: " + uploadError.toString();
    }
  } else {
    Logger.log('⚠️ No resume file in request');
  }
  
  // Save to sheet
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
// CONTACT FORM HANDLER
// ============================================================================

function handleContactForm(data) {
  Logger.log('Processing CONTACT form');
  Logger.log('Contact: ' + data.firstName + ' ' + data.lastName);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Contact Form");
  
  if (!sheet) {
    Logger.log('Creating new Contact Form sheet');
    sheet = ss.insertSheet("Contact Form");
    sheet.appendRow([
      "Timestamp", "First Name", "Last Name", "Email", "Organization", "Service Interest", "Message"
    ]);
    var headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0d47a1");
    headerRange.setFontColor("#ffffff");
  }
  
  // Get timestamp
  var timestamp = getFormattedTimestamp();
  
  // Save to sheet
  sheet.appendRow([
    timestamp,
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.organization || "",
    data.serviceInterest || "",
    data.message || ""
  ]);
  
  Logger.log('✅ Contact form saved to sheet');
  
  return ContentService.createTextOutput(JSON.stringify({
    "status": "success",
    "message": "Form submitted successfully"
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// CTB FEEDBACK FORM HANDLER (with email notifications)
// ============================================================================

function handleFeedbackForm(data) {
  Logger.log('Processing CTB FEEDBACK form');
  Logger.log('Email: ' + data.email);
  Logger.log('Send Copy: ' + data.sendCopy);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("CTB Feedback");
  
  if (!sheet) {
    Logger.log('Creating new CTB Feedback sheet');
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
  
  // Get timestamp
  var timestamp = getFormattedTimestamp();
  
  // Save to sheet
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
  Logger.log('✅ Feedback saved to sheet');
  
  // Send email if requested
  var emailResult = 'not_requested';
  if (data.sendCopy && data.email) {
    Logger.log('Sending email to: ' + data.email);
    try {
      sendFeedbackEmail(data.email, data);
      emailResult = 'sent';
      Logger.log('✅ Email sent successfully!');
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

// ============================================================================
// EMAIL FUNCTION FOR CTB FEEDBACK
// ============================================================================

function sendFeedbackEmail(email, data) {
  var subject = 'Your response on Chhatrapati Sambhajinagar CTB';
  
  var plainBody = 'Maha Infotech Pvt Ltd Chhatrapati Sambhajinagar CTB Feedback\n\n';
  plainBody += 'Email\n' + (data.email || '') + '\n\n';
  plainBody += 'Your Name\n' + (data.name || '') + '\n\n';
  plainBody += 'How informative did you find the CTB?\n' + (data.informative || '') + '\n\n';
  plainBody += 'Did you think the CTB covered the impact of the digital projects on Chhatrapati Sambhajinagar?\n' + (data.impact || '') + '\n\n';
  
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    plainBody += 'Which of the IT projects covered in the CTB did you find interesting and would like more information on?\n';
    plainBody += data.projects.join(', ') + '\n\n';
  }
  
  if (Array.isArray(data.apps) && data.apps.length > 0) {
    plainBody += 'Which of the Mobile apps included in the CTB did you find interesting and would like more information on?\n';
    plainBody += data.apps.join(', ') + '\n\n';
  }
  
  plainBody += 'How happy are you with the overall design and layout of the CTB?\n' + (data.design || '') + '\n\n';
  plainBody += 'Additional feedback: ' + (data.feedback || '') + '\n\n';
  plainBody += 'This form was created inside of MIPL.';
  
  var headerFileId = '1Dna7c6_I1T30MnzikSkDscFBR56LIYFd';
  var headerImageUrl = 'https://drive.google.com/uc?export=view&id=' + headerFileId;

  var htmlBody = '<!DOCTYPE html>';
  htmlBody += '<html><head><meta charset="UTF-8"></head>';
  htmlBody += '<body style="margin: 0; padding: 0; font-family: Roboto, Arial, sans-serif; background-color: #f5f5f5;">';
  htmlBody += '<div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">';
  
  htmlBody += '<div style="width: 100%; height: 200px; overflow: hidden; margin: 0; padding: 0; border-radius: 12px 12px 0 0;">';
  htmlBody += '<img src="' + headerImageUrl + '" alt="Chhatrapati Sambhajinagar" style="width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 20%;">';
  htmlBody += '</div>';
  
  htmlBody += '<div style="padding: 24px 24px 20px 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<h2 style="margin: 0; font-size: 24px; font-weight: 400; color: #202124; line-height: 1.3;">Feedback on the Digital Coffee Table Book of Chhatrapati Sambhajinagar</h2>';
  htmlBody += '</div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 4px; font-size: 14px; color: #70757a;">Email</div>';
  htmlBody += '<div style="font-size: 15px; color: #202124;">' + (data.email || '') + '</div>';
  htmlBody += '</div>';
 
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 4px; font-size: 14px; color: #70757a;">Your Name</div>';
  htmlBody += '<div style="font-size: 15px; color: #202124;">' + (data.name || '') + '</div>';
  htmlBody += '</div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 8px; font-size: 14px; color: #70757a;">How informative did you find the CTB?</div>';
  htmlBody += '<div style="display: inline-block; background: #1a73e8; color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px; font-weight: 600;">';
  htmlBody += (data.informative || '') + ' / 5';
  htmlBody += '</div></div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 8px; font-size: 14px; color: #70757a;">Did you think the CTB covered the impact of the digital projects on Chhatrapati Sambhajinagar?</div>';
  htmlBody += '<div style="display: inline-block; background: #1a73e8; color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px; font-weight: 600;">';
  htmlBody += (data.impact || '') + ' / 5';
  htmlBody += '</div></div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 8px; font-size: 14px; color: #70757a;">Which of the IT projects covered in the CTB did you find interesting?</div>';
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    data.projects.forEach(function(project) {
      htmlBody += '<div style="font-size: 15px; color: #202124; margin-bottom: 4px;">• ' + project + '</div>';
    });
  }
  htmlBody += '</div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 8px; font-size: 14px; color: #70757a;">Which Mobile apps did you find interesting?</div>';
  if (Array.isArray(data.apps) && data.apps.length > 0) {
    data.apps.forEach(function(app) {
      htmlBody += '<div style="font-size: 15px; color: #202124; margin-bottom: 4px;">• ' + app + '</div>';
    });
  }
  htmlBody += '</div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 8px; font-size: 14px; color: #70757a;">Overall design rating</div>';
  htmlBody += '<div style="display: inline-block; background: #1a73e8; color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px; font-weight: 600;">';
  htmlBody += (data.design || '') + ' / 5';
  htmlBody += '</div></div>';
  
  htmlBody += '<div style="padding: 24px; border-bottom: 1px solid #dadce0;">';
  htmlBody += '<div style="margin-bottom: 4px; font-size: 14px; color: #70757a;">Additional Feedback</div>';
  htmlBody += '<div style="font-size: 15px; color: #202124; white-space: pre-wrap;">' + (data.feedback || '') + '</div>';
  htmlBody += '</div>';
  
  htmlBody += '<div style="padding: 24px; text-align: center; background-color: #f5f5f5;">';
  htmlBody += '<p style="margin: 0; color: #5f6368; font-size: 12px;">This form was created inside of MIPL.</p>';
  htmlBody += '</div>';
  
  htmlBody += '</div></body></html>';
 
  var emailOptions = {
    htmlBody: htmlBody,
    name: 'Maha Infotech Pvt Ltd Chhatrapati Sambhajinagar CTB Feedback'
  };
  
  GmailApp.sendEmail(email, subject, plainBody, emailOptions);
  return true;
}

// ============================================================================
// UTILITY FUNCTIONS
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
