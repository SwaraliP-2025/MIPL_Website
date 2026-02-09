// Combined Google Apps Script for Contact Form AND Careers Form
// Deploy this as ONE web app with "Anyone" access

/**
 * Setup function to authorize Drive permissions
 * RUN THIS FIRST before deploying!
 */
function setupDrivePermissions() {
  try {
    // This function requests Drive permissions
    var folders = DriveApp.getFoldersByName("MIPL Resumes");
    if (folders.hasNext()) {
      Logger.log("Drive access authorized! Folder already exists.");
    } else {
      var folder = DriveApp.createFolder("MIPL Resumes");
      Logger.log("Drive access authorized! Created folder: " + folder.getName());
    }
    return "✅ Drive permissions authorized successfully!";
  } catch (error) {
    Logger.log("❌ Error: " + error.toString());
    return "❌ Error: " + error.toString();
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get current timestamp in DD/MM/YYYY HH:mm:ss format
    var now = new Date();
    var day = ('0' + now.getDate()).slice(-2);
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    var timestamp = "'" + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    
    // Check if this is CAREERS form (has jobTitle)
    if (data.jobTitle) {
      Logger.log("Processing CAREERS form");
      Logger.log("Job Title: " + data.jobTitle);
      Logger.log("Applicant: " + data.firstName + " " + data.lastName);
      Logger.log("Resume file present: " + (data.resumeFile ? "YES" : "NO"));
      Logger.log("Resume filename: " + (data.resumeFileName || "NONE"));
      
      var sheet = ss.getSheetByName("Careers Applications");
      if (!sheet) {
        Logger.log("Creating new Careers Applications sheet");
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
      
      // Handle resume file upload
      var resumeUrl = "";
      if (data.resumeFile && data.resumeFileName) {
        Logger.log("Starting resume upload process...");
        Logger.log("Resume filename: " + data.resumeFileName);
        Logger.log("Resume data length: " + data.resumeFile.length + " characters");
        
        try {
          // Create folder for resumes if it doesn't exist
          Logger.log("Looking for MIPL Resumes folder...");
          var folders = DriveApp.getFoldersByName("MIPL Resumes");
          var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("MIPL Resumes");
          Logger.log("Folder ready: " + folder.getName() + " (ID: " + folder.getId() + ")");
          
          // Decode base64 and create file
          Logger.log("Decoding base64 data...");
          var base64Data = data.resumeFile.split(',')[1];
          if (!base64Data) {
            Logger.log("No comma found in base64, using full string");
            base64Data = data.resumeFile;
          }
          Logger.log("Base64 data length after split: " + base64Data.length);
          
          var fileName = data.firstName + '_' + data.lastName + '_' + data.resumeFileName;
          Logger.log("Creating file: " + fileName);
          
          var decodedData = Utilities.base64Decode(base64Data);
          Logger.log("Decoded data length: " + decodedData.length + " bytes");
          
          var fileBlob = Utilities.newBlob(decodedData, 'application/pdf', fileName);
          Logger.log("Blob created, uploading to Drive...");
          
          var file = folder.createFile(fileBlob);
          Logger.log("File created in Drive with ID: " + file.getId());
          
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          Logger.log("File sharing set to ANYONE_WITH_LINK");
          
          resumeUrl = file.getUrl();
          Logger.log("Resume uploaded successfully!");
          Logger.log("File URL: " + resumeUrl);
        } catch (uploadError) {
          Logger.log("❌ Resume upload error: " + uploadError.toString());
          Logger.log("Error stack: " + uploadError.stack);
          resumeUrl = "Upload failed: " + uploadError.toString();
        }
      } else {
        Logger.log("⚠️ No resume file in request data");
        if (!data.resumeFile) Logger.log("  - resumeFile is missing or empty");
        if (!data.resumeFileName) Logger.log("  - resumeFileName is missing or empty");
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
      
      return ContentService.createTextOutput(JSON.stringify({
        "status": "success",
        "message": "Application submitted successfully",
        "resumeUploaded": resumeUrl ? true : false
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Otherwise, this is CONTACT form
    else {
      Logger.log("Processing CONTACT form");
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
      
      sheet.appendRow([
        timestamp,
        data.firstName || "",
        data.lastName || "",
        data.email || "",
        data.organization || "",
        data.serviceInterest || "",
        data.message || ""
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({
        "status": "success",
        "message": "Form submitted successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log("ERROR: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("MIPL Forms Script is running!");
}
