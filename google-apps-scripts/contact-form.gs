// Google Apps Script for Contact Form
// Deploy this as a web app with "Anyone" access

function doPost(e) {
  try {
    // Parse the form data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (same workbook as CTB Feedback)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create "Contact Form" sheet
    var sheet = ss.getSheetByName("Contact Form");
    if (!sheet) {
      sheet = ss.insertSheet("Contact Form");
      // Add headers
      sheet.appendRow([
        "Timestamp",
        "First Name",
        "Last Name", 
        "Email",
        "Organization",
        "Service Interest",
        "Message"
      ]);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0d47a1");
      headerRange.setFontColor("#ffffff");
    }
    
    // Get current timestamp in DD/MM/YYYY HH:mm:ss format
    var now = new Date();
    var day = ('0' + now.getDate()).slice(-2);
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    var timestamp = "'" + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    
    // Append the data
    sheet.appendRow([
      timestamp,
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.organization || "",
      data.serviceInterest || "",
      data.message || ""
    ]);
    
    // Send email notification - COMMENTED OUT FOR NOW
    /*
    var emailBody = "New Contact Form Submission\n\n" +
                    "Name: " + data.firstName + " " + data.lastName + "\n" +
                    "Email: " + data.email + "\n" +
                    "Organization: " + data.organization + "\n" +
                    "Service Interest: " + data.serviceInterest + "\n" +
                    "Message: " + data.message + "\n\n" +
                    "Timestamp: " + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    
    MailApp.sendEmail({
      to: "swarali.pathrikar@consultmipl.com", // Change to your email
      subject: "New Contact Form Submission - MIPL Website",
      body: emailBody
    });
    */
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Form submitted successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Contact Form Script is running!");
}
