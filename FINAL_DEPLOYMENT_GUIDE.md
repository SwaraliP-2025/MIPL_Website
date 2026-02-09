# Final Deployment Guide - All Forms Combined

## ✅ What's Been Done

### Backend (Google Apps Script)
- ✅ Created **ALL-FORMS-COMBINED.gs** - ONE script for all 3 forms
- ✅ CTB Feedback Form (with email notifications)
- ✅ Contact Form
- ✅ Careers Form (with resume upload to Drive)
- ✅ New deployment URL: `https://script.google.com/macros/s/AKfycbzQFxgaV1gxHIrlghOgnZIxjGAVg9B0rkJKE2W-s6XtBosZSeWJT5tBlAaK2wunWNY5rQ/exec`

### Frontend (Website)
- ✅ Updated Contact.jsx to use new URL
- ✅ Updated Careers.jsx to use new URL
- ✅ Resume upload with visual feedback (green checkmark + filename)
- ✅ All form fields have proper `name` attributes

## 📊 How It Works

### Form Detection (Automatic Routing)
The script automatically detects which form based on data fields:

1. **Careers Form**: Has `jobTitle` field → Routes to Careers handler
2. **Contact Form**: Has `firstName`, `lastName`, `message` → Routes to Contact handler
3. **CTB Feedback Form**: Has `email`, `name`, `informative` → Routes to Feedback handler

### Data Storage

**Careers Applications Sheet:**
- Columns: Timestamp, Job Title, First Name, Last Name, Email, Phone, Date of Birth, Current Location, Education, Work Status, Work Status Other, Years of Experience, Current Salary, Cover Letter, **Resume URL**
- Resume URL column contains clickable Google Drive link

**Contact Form Sheet:**
- Columns: Timestamp, First Name, Last Name, Email, Organization, Service Interest, Message

**CTB Feedback Sheet:**
- Columns: Email, Your Name, How Informative (1-5), Impact Coverage (1-5), IT Projects Interested, Mobile Apps Interested, Overall Design Rating (1-5), Additional Feedback, Send Copy, Timestamp
- Sends email to user if "Send Copy" is checked

### Resume Upload Process
1. User selects PDF file in Careers form
2. Frontend converts PDF to base64
3. Sends to backend with all form data
4. Backend decodes base64
5. Creates PDF file in "MIPL Resumes" folder in Google Drive
6. Sets file sharing to "Anyone with link"
7. Stores Drive URL in sheet's Resume URL column

## 🧪 Testing Checklist

### Test Contact Form
1. Go to Contact page
2. Fill out form
3. Submit
4. Check "Contact Form" sheet - should have new row with timestamp

### Test Careers Form
1. Go to Careers page
2. Click "Apply Now"
3. Fill ALL fields
4. **Select a PDF resume** - should see green checkmark with filename
5. Submit
6. Check "Careers Applications" sheet - should have new row
7. Check last column (Resume URL) - should have Drive link
8. Click the link - should open PDF in Drive
9. Check Google Drive - "MIPL Resumes" folder should have the PDF

### Test CTB Feedback Form
1. Go to CTB Feedback page (if you have one)
2. Fill out form
3. Check "Send me a copy of my responses"
4. Submit
5. Check "CTB Feedback" sheet - should have new row
6. Check email - should receive formatted email with responses

## 🔍 Troubleshooting

### If Careers form submits but no resume in Drive:

**Check browser console:**
- Should show `resumeFile: 'FILE_PRESENT'`
- Should show `resumeUploaded: true`

**Check Apps Script Executions:**
1. Go to Apps Script editor
2. Click "Executions" (clock icon)
3. Find latest execution
4. Check logs for errors

**Common issues:**
- File not selected: Console shows `NO_FILE`
- Permissions not authorized: Run `setupAllPermissions()` again
- File too large: Max 5MB for PDF
- Wrong file type: Must be PDF

### If Contact form not working:
- Check "Contact Form" sheet exists
- Check console for errors
- Verify URL is correct in Contact.jsx

### If CTB Feedback email not sending:
- Check "Send Copy" was checked
- Check email address is valid
- Check Apps Script execution logs
- Verify Gmail permissions authorized

## 📝 Summary

**Single Script URL for ALL forms:**
```
https://script.google.com/macros/s/AKfycbzQFxgaV1gxHIrlghOgnZIxjGAVg9B0rkJKE2W-s6XtBosZSeWJT5tBlAaK2wunWNY5rQ/exec
```

**Three Forms, One Backend:**
- ✅ CTB Feedback → "CTB Feedback" sheet + Email
- ✅ Contact → "Contact Form" sheet
- ✅ Careers → "Careers Applications" sheet + Drive upload

**Resume Upload:**
- ✅ Saves to "MIPL Resumes" folder in Drive
- ✅ Filename format: `FirstName_LastName_originalname.pdf`
- ✅ Shareable link stored in sheet
- ✅ Visual feedback on form (green checkmark)

## 🎯 Next Steps

1. **Test all three forms** using the checklist above
2. **Verify resume upload** - check Drive and sheet
3. **Test email notifications** for CTB Feedback
4. **Share any errors** if something doesn't work

Everything is now connected and ready to use! 🚀
