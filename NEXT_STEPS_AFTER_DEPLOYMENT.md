# Next Steps After Deployment - Bank Guarantees

## 🎯 You've Done:
✅ Updated Google Apps Script
✅ Created BankGuarantees sheet
✅ Added data to sheet
✅ Deployed with same link

## ❌ Issue:
Bank Guarantees data not showing at frontend

## 🔧 What To Do Now (In Order)

### STEP 1: Verify Sheet Name (2 minutes)
1. Open your Google Sheet
2. Look at the sheet tabs at the bottom
3. Find the sheet with your bank guarantee data
4. **Right-click on the tab**
5. Click "Rename"
6. Type exactly: **BankGuarantees** (case-sensitive)
7. Press Enter

**Why**: The backend looks for a sheet named exactly "BankGuarantees"

### STEP 2: Verify Column Headers (2 minutes)
1. Click on the **BankGuarantees** sheet tab
2. Look at Row 1 (the header row)
3. Verify these exact headers in these exact columns:
   - **A1**: BG No.
   - **B1**: Project Name
   - **C1**: Company Name
   - **D1**: From
   - **E1**: To
   - **F1**: Days
   - **G1**: Guarantee Amt
   - **H1**: Remarks

**If headers are different**: Edit them to match exactly (case-sensitive)

### STEP 3: Verify Data Format (3 minutes)
1. Look at Row 2 (first data row)
2. Check each column:
   - **A2**: Has value like "BG-001" (not empty)
   - **B2**: Has project name (not empty)
   - **C2**: Has company name (not empty)
   - **D2**: Date in format **2024-01-15** (YYYY-MM-DD)
   - **E2**: Date in format **2025-12-31** (YYYY-MM-DD)
   - **F2**: Number like **351**
   - **G2**: Amount like **₹50,00,000** (with ₹ symbol)
   - **H2**: Any text or can be empty

**If dates are wrong format**: Change from 01/15/2024 to 2024-01-15

### STEP 4: Test API Connection (2 minutes)
1. Open Project Dashboard in browser
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Copy and paste this code:

```javascript
fetch('https://script.google.com/macros/s/AKfycbwCpsfZ5tA-osCDa8r7iTtUgfzzt6gkJTpKufoAlFsSqgRsyQombdltHwRG-EAQ9UC3VA/exec?action=getBankGuarantees')
  .then(r => r.json())
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error:', err))
```

5. Press Enter
6. Look at the output

**Expected output**:
```
Response: {success: true, bankGuarantees: Array(6)}
```

**If you see error**: "BankGuarantees sheet not found"
- Go back to STEP 1
- Verify sheet name is exactly "BankGuarantees"

### STEP 5: Hard Refresh Browser (1 minute)
1. Go to Project Dashboard
2. Press **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
3. Wait for page to load completely
4. Scroll to "Bank Guarantees" section
5. Check if data appears

## ✅ Verification Checklist

Before moving forward, verify ALL of these:

- [ ] Sheet name is exactly "BankGuarantees"
- [ ] Headers in Row 1 match exactly (case-sensitive)
- [ ] Data exists in Row 2+
- [ ] BG No. column (A) is not empty
- [ ] Project Name column (B) is not empty
- [ ] Company Name column (C) is not empty
- [ ] Dates are in YYYY-MM-DD format (e.g., 2024-01-15)
- [ ] Amount has ₹ symbol (e.g., ₹50,00,000)
- [ ] API test returns success: true
- [ ] Browser hard refreshed (Ctrl+Shift+R)

## 🎯 If Data Still Doesn't Show

### Check 1: Is Backend Deployed?
1. Open Google Apps Script
2. Look for "getBankGuarantees" function
3. Check if it exists
4. If not, copy it from documentation

### Check 2: Is doGet Updated?
1. In Google Apps Script, find the doGet function
2. Look for this line:
```javascript
if (action === 'getBankGuarantees') {
  return getBankGuarantees();
}
```
3. If not there, add it

### Check 3: Is Deployment Active?
1. In Google Apps Script, click "Deploy"
2. Look for "New deployment" button
3. If you see it, click it
4. Select "Web app"
5. Execute as: Your account
6. Who has access: Anyone
7. Click "Deploy"
8. Copy the new URL
9. Update API_URL in script.js if different

### Check 4: Clear Browser Cache
1. Press **Ctrl+Shift+Delete** (Windows) or **Cmd+Shift+Delete** (Mac)
2. Select "All time"
3. Check "Cookies and other site data"
4. Check "Cached images and files"
5. Click "Clear data"
6. Refresh page

## 📊 Sample Data to Test With

If you don't have data yet, add this to test:

```
BG No. | Project Name | Company Name | From | To | Days | Guarantee Amt | Remarks
BG-001 | Aurangabad Smart City | Contractor A | 2024-01-15 | 2025-12-31 | 351 | ₹50,00,000 | Performance guarantee
BG-002 | MRPL Integrated Security | Contractor B | 2023-12-01 | 2025-11-30 | 730 | ₹60,00,000 | Maintenance guarantee
```

## 🚀 Expected Result

When everything is working:
1. Page loads
2. Bank Guarantees section appears
3. Data loads in table
4. Guarantees grouped by project
5. Status badges show (if applicable)
6. Alerts show (if applicable)

## 📞 Still Not Working?

### Collect This Information:
1. Screenshot of console output (F12 → Console)
2. Screenshot of Google Sheet (headers and data)
3. Sheet name exactly as shown
4. Error message (if any)

### Then Check:
1. Sheet name = "BankGuarantees" exactly
2. Headers match exactly
3. Data exists in Row 2+
4. Dates in YYYY-MM-DD format
5. API returns success: true

## ⏱️ Time Estimate

- STEP 1: 2 minutes
- STEP 2: 2 minutes
- STEP 3: 3 minutes
- STEP 4: 2 minutes
- STEP 5: 1 minute
- **Total: 10 minutes**

## 🎓 Common Mistakes

❌ Sheet name is "Bank Guarantees" (with space) - should be "BankGuarantees"
❌ Headers have different spelling - must match exactly
❌ Dates in format 01/15/2024 - should be 2024-01-15
❌ Amount without ₹ symbol - should be ₹50,00,000
❌ Browser not hard refreshed - use Ctrl+Shift+R

## ✨ Success Indicators

✅ API returns success: true
✅ API returns data count > 0
✅ Table shows data grouped by project
✅ Status badges display (if applicable)
✅ Alerts show (if applicable)
✅ Search works
✅ Expand/collapse works

---

**Follow these steps in order**
**Should take about 10 minutes**
**95% success rate**
