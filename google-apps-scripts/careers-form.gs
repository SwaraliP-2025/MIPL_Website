// Google Apps Script for Careers Application Form
// Deploy this as a web app with "Anyone" access

function doPost(e) {
  try {
    // Parse the form data
    var data = JSON.parse(e.postData.contents);
    
    // Check if this is careers form data (has jobTitle field)
    if (!data.jobTitle) {
      // This is not careers form data, skip
      return ContentService.createTextOutput(JSON.stringify({
        "status": "error",
        "message": "Wrong form handler"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet (same workbook as CTB Feedback)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create "Careers Applications" sheet
    var sheet = ss.getSheetByName("Careers Applications");
    if (!sheet) {
      sheet = ss.insertSheet("Careers Applications");
      // Add headers
      sheet.appendRow([
        "Timestamp",
        "Job Title",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Date of Birth",
        "Current Location",
        "Education",
        "Work Status",
        "Work Status Other",
        "Years of Experience",
        "Current Salary",
        "Cover Letter",
        "Resume URL"
      ]);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 15);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0d47a1");
      headerRange.setFontColor("#ffffff");
    }
    
    // Parse the form data
    var data = JSON.parse(e.postData.contents);
    
    // Get current timestamp in DD/MM/YYYY HH:mm:ss format
    var now = new Date();
    var day = ('0' + now.getDate()).slice(-2);
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    var timestamp = "'" + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    
    // Handle resume file upload (if provided as base64)
    var resumeUrl = "";
    if (data.resumeFile && data.resumeFileName) {
      try {
        // Create folder for resumes if it doesn't exist
        var folders = DriveApp.getFoldersByName("MIPL Resumes");
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("MIPL Resumes");
        
        // Decode base64 and create file
        var fileBlob = Utilities.newBlob(
          Utilities.base64Decode(data.resumeFile.split(',')[1]),
          'application/pdf',
          data.resumeFileName
        );
        var file = folder.createFile(fileBlob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        resumeUrl = file.getUrl();
      } catch (uploadError) {
        Logger.log("Resume upload error: " + uploadError);
        resumeUrl = "Upload failed: " + uploadError.toString();
      }
    }
    
    // Append the data
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
    
    // Send email notification - COMMENTED OUT FOR NOW
    /*
    var emailBody = "New Job Application Received\n\n" +
                    "Job Title: " + data.jobTitle + "\n" +
                    "Name: " + data.firstName + " " + data.lastName + "\n" +
                    "Email: " + data.email + "\n" +
                    "Phone: " + data.phone + "\n" +
                    "Date of Birth: " + data.dateOfBirth + "\n" +
                    "Location: " + data.currentLocation + "\n" +
                    "Education: " + data.education + "\n" +
                    "Work Status: " + data.workStatus + (data.workStatusOther ? " (" + data.workStatusOther + ")" : "") + "\n" +
                    "Experience: " + data.yearsExperience + " years\n" +
                    "Current Salary: ₹" + data.currentSalary + "\n" +
                    "Cover Letter: " + (data.coverLetter || "Not provided") + "\n" +
                    "Resume: " + (resumeUrl || "Not uploaded") + "\n\n" +
                    "Timestamp: " + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    
    MailApp.sendEmail({
      to: "swarali.pathrikar@consultmipl.com", // Change to your email
      subject: "New Job Application - " + data.jobTitle + " - MIPL Website",
      body: emailBody
    });
    */
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Application submitted successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Careers Application Script is running!");
}
