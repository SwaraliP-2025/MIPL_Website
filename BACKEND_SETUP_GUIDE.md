# Backend Setup Guide - Google Apps Script

This guide will help you set up the backend for Contact Form and Careers Application Form using Google Apps Script (100% FREE).

## Overview

Both forms will store data in the **same Google Sheets workbook** where you have the CTB Feedback data.

**What you'll get:**
- ✅ Contact Form data in "Contact Form" sheet
- ✅ Careers Applications in "Careers Applications" sheet  
- ✅ CTB Feedback in existing sheet
- ✅ Email notifications for each submission
- ✅ Resume files stored in Google Drive
- ✅ Timestamp in DD/MM/YYYY format

---

## Step 1: Open Your Existing Google Sheet

1. Open the Google Sheet where you have CTB Feedback data
2. Click **Extensions** → **Apps Script**
3. You'll see the existing CTB Feedback script

---

## Step 2: Add Contact Form Script

1. In Apps Script editor, click the **+** next to "Files"
2. Select **Script**
3. Name it: `ContactForm`
4. Copy the entire code from `google-apps-scripts/contact-form.gs`
5. Paste it into the new script file
6. Click **Save** (💾 icon)

---

## Step 3: Add Careers Form Script

1. Click the **+** next to "Files" again
2. Select **Script**
3. Name it: `CareersForm`
4. Copy the entire code from `google-apps-scripts/careers-form.gs`
5. Paste it into the new script file
6. Click **Save** (💾 icon)

---

## Step 4: Deploy Contact Form Script

1. In Apps Script, open the `ContactForm.gs` file
2. Click **Deploy** → **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in:
   - **Description**: Contact Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
6. Click **Deploy**
7. Click **Authorize access**
8. Choose your Google account
9. Click **Advanced** → **Go to [Project Name] (unsafe)**
10. Click **Allow**
11. **COPY THE WEB APP URL** - you'll need this!

---

## Step 5: Deploy Careers Form Script

1. In Apps Script, open the `CareersForm.gs` file
2. Click **Deploy** → **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in:
   - **Description**: Careers Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
6. Click **Deploy**
7. Click **Authorize access** (if asked)
8. **COPY THE WEB APP URL** - you'll need this!

---

## Step 6: Update React Forms

### Contact Form (src/pages/Contact.jsx)

Find the `handleSubmit` function and replace it with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = {
    firstName: e.target.elements[0].value,
    lastName: e.target.elements[1].value,
    email: e.target.elements[2].value,
    organization: e.target.elements[3].value,
    serviceInterest: e.target.elements[4].value,
    message: e.target.elements[5].value
  };

  try {
    const response = await fetch('YOUR_CONTACT_FORM_WEB_APP_URL', {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive"
    });
  }
};
```

**Replace `YOUR_CONTACT_FORM_WEB_APP_URL`** with the URL from Step 4.

---

### Careers Form (src/pages/Careers.jsx)

Find the `handleSubmit` function and replace it with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = {
    jobTitle: selectedJob.title,
    firstName: e.target.elements[0].value,
    lastName: e.target.elements[1].value,
    email: e.target.elements[2].value,
    phone: e.target.elements[3].value,
    dateOfBirth: e.target.elements[4].value,
    currentLocation: e.target.elements[5].value,
    education: e.target.elements[6].value,
    workStatus: e.target.workStatus.value,
    workStatusOther: workStatus === 'other' ? e.target.elements[8].value : '',
    yearsExperience: e.target.elements[9].value,
    currentSalary: e.target.elements[10].value,
    coverLetter: e.target.elements[11].value || ''
  };

  // Handle resume file (optional - for now we'll skip file upload)
  // You can add file upload later if needed

  try {
    const response = await fetch('YOUR_CAREERS_FORM_WEB_APP_URL', {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      setIsSubmitting(false);
      setShowApplicationForm(false);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
    toast({
      title: "Error",
      description: "Failed to submit application. Please try again.",
      variant: "destructive"
    });
  }
};
```

**Replace `YOUR_CAREERS_FORM_WEB_APP_URL`** with the URL from Step 5.

---

## Step 7: Change Email Address

In both scripts (`contact-form.gs` and `careers-form.gs`), find this line:

```javascript
to: "info@consultmipl.com", // Change to your email
```

Change it to the email where you want to receive notifications.

---

## Step 8: Test the Forms

1. Go to your website
2. Fill out the Contact form and submit
3. Check your Google Sheet - you should see a new "Contact Form" sheet with the data
4. Check your email for notification
5. Do the same for Careers form

---

## Troubleshooting

**Form not submitting?**
- Check browser console for errors (F12)
- Make sure you replaced the Web App URLs correctly
- Verify the scripts are deployed with "Anyone" access

**Not receiving emails?**
- Check spam folder
- Verify email address in the script
- Check Apps Script execution logs (View → Executions)

**Timestamp format wrong?**
- The script uses DD/MM/YYYY format with apostrophe prefix
- If still showing MM/DD/YYYY, format the column as "Plain text" in Google Sheets

---

## What's Stored

### Contact Form Sheet
- Timestamp (DD/MM/YYYY HH:mm:ss)
- First Name
- Last Name
- Email
- Organization
- Service Interest
- Message

### Careers Applications Sheet
- Timestamp (DD/MM/YYYY HH:mm:ss)
- Job Title
- First Name
- Last Name
- Email
- Phone
- Date of Birth
- Current Location
- Education
- Work Status
- Work Status Other (if selected "Other")
- Years of Experience
- Current Salary
- Cover Letter
- Resume URL (when file upload is implemented)

---

## Need Help?

If you face any issues:
1. Check Apps Script execution logs: **View** → **Executions**
2. Look for error messages in red
3. Share the error message for help

---

## Cost: 100% FREE! 🎉

No hosting costs, no server management, everything runs on Google's infrastructure for free!
