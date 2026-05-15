# Bank Guarantees Module - Quick Reference Guide

## 🚀 Quick Start

### 1. Verify Backend Sheet
Ensure your Google Sheet has a sheet named **exactly**: `BankGuarantees`

### 2. Add Sample Data
Create columns in the BankGuarantees sheet:
```
BG No. | Project Name | Company Name | From | To | Days | Guarantee Amt | Remarks
BG001  | Project A    | Company X    | 2024-01-15 | 2025-01-15 | 365 | ₹50,00,000 | Sample BG
```

### 3. Open Project Dashboard
- Navigate to Project Dashboard
- Bank Guarantees section will load automatically
- Check browser console (F12) for any errors

## 📊 Features Overview

### Data Display
- **Table**: Shows all bank guarantees in a compact format
- **Expiring Soon**: Shows BGs expiring within 30 days
- **Expired**: Shows BGs that have already expired
- **Statistics**: Total count, projects, days, and value

### Search & Filter
- Search by: BG No., Project Name, Company Name, Remarks
- Real-time filtering as you type
- Stats update based on filtered results

### Automatic Tracking
- System compares today's date with expiry dates daily
- Automatically categorizes as: Active, Expiring Soon, Expired
- Color-coded rows for easy identification

## 🔧 Configuration

### API URL
Located in: `Project Dashboard/script.js` (line 2)
```javascript
const API_URL = "https://script.google.com/macros/s/AKfycby8Mb2WDLia3dyCeNSjI2KKuP4RUcUk48FLgUeqfWBz-FeeHnzRUq0ixwBrXjsktJeszw/exec";
```

### Backend Function
Located in: `Project Dashboard/apps-script-backend-FIXED.gs` (lines 1111-1160)
- Function: `getBankGuarantees()`
- Action: `?action=getBankGuarantees`

## 📋 Data Format Requirements

### Date Format
- **Required**: YYYY-MM-DD (e.g., 2024-01-15)
- **NOT**: DD/MM/YYYY or MM/DD/YYYY

### Amount Format
- **Required**: Include ₹ symbol (e.g., ₹50,00,000)
- **Format**: ₹[amount with commas]

### Column Headers (Exact)
1. BG No.
2. Project Name
3. Company Name
4. From
5. To
6. Days
7. Guarantee Amt
8. Remarks

## 🐛 Troubleshooting

### Bank Guarantees Not Loading?

**Step 1**: Check Console
- Press F12 to open DevTools
- Go to Console tab
- Look for "Bank Guarantees API Response"

**Step 2**: Verify Sheet Name
- Sheet name must be exactly: `BankGuarantees`
- Case-sensitive (not "bankguarantees" or "Bank_Guarantees")

**Step 3**: Check Data Format
- Dates: YYYY-MM-DD format
- Amounts: Include ₹ symbol
- No empty rows in the middle of data

**Step 4**: Verify API URL
- Check if API_URL in script.js matches your deployment
- Redeploy Google Apps Script if changed

### Expiry Alerts Not Showing?

- Verify dates are in YYYY-MM-DD format
- Check if dates are within 30 days of today
- Refresh page (Ctrl+Shift+R for hard refresh)

### Search Not Working?

- Ensure data is loaded first
- Check if search term matches any field
- Try searching with partial text

## 📈 Statistics Explained

| Stat | Meaning |
|------|---------|
| Total Bank Guarantees | Total number of BGs in the system |
| Projects with BG | Number of unique projects with BGs |
| Total Days | Sum of all Days values |
| Total Value | Sum of all Guarantee Amt values |

## 🎨 Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| ✓ Active | Green | More than 30 days until expiry |
| ⏰ Expiring Soon | Orange | 0-30 days until expiry |
| ⚠️ Expired | Red | Already expired |

## 📱 Responsive Design

- **Desktop**: Full table with all columns visible
- **Tablet**: Scrollable table with compact design
- **Mobile**: Scrollable table with smaller fonts

## 🔄 Auto-Refresh

- Data loads when page opens
- Expiry status updates automatically
- No manual refresh needed

## 💾 Data Persistence

- All data stored in Google Sheet
- Changes in sheet reflect immediately on next page load
- No local storage used

## 🔐 Security

- Uses Google Apps Script for backend
- No sensitive data stored locally
- API calls use HTTPS
- Deployment URL is secure

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify data format matches requirements
3. Ensure Google Sheet has "BankGuarantees" sheet
4. Check API URL is correctly configured

---

**Last Updated**: May 14, 2026
**Version**: 1.0
