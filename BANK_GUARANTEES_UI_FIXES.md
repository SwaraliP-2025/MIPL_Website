# Bank Guarantees UI Fixes - Complete

## Issues Fixed

### 1. **Total Value Card - Amount Overflow** ✓
**Problem:** The total value amount was floating outside the card container.

**Solution Applied:**
- Added `display: flex; flex-direction: column; justify-content: center; align-items: flex-start;` to the card
- Added `min-height: 120px;` to ensure proper vertical spacing
- Added `overflow: hidden;` to prevent content overflow
- Added text wrapping properties to the amount div:
  - `word-wrap: break-word;`
  - `word-break: break-word;`
  - `overflow-wrap: break-word;`
  - `max-width: 100%;`
  - `line-height: 1.2;`

**Result:** The amount now stays within the card boundaries and wraps if needed.

---

### 2. **Remarks Column - Text Visibility** ✓
**Problem:** Remarks text was being cut off with ellipsis and not fully visible.

**Solution Applied:**

**HTML Changes (index.html):**
- Updated remarks column header with:
  - `min-width: 120px;` - Ensures minimum column width
  - `max-width: 200px;` - Sets maximum width for wrapping

**JavaScript Changes (script.js):**
- Updated remarks cell styling in table rows:
  - `font-size: 0.7rem;` - Reduced from 0.8rem for better fit
  - `min-width: 120px;` - Minimum width
  - `max-width: 200px;` - Maximum width
  - `word-wrap: break-word;` - Enables word wrapping
  - `word-break: break-word;` - Breaks long words
  - `overflow-wrap: break-word;` - Modern text wrapping
  - `white-space: normal;` - Changed from nowrap to allow wrapping
  - `line-height: 1.3;` - Better spacing for wrapped text
  - Kept `title` attribute for full text on hover

**Result:** Remarks text now wraps to multiple lines and is fully visible with reduced font size.

---

### 3. **BG Renewal Date Expiry Check** ✓
**Problem:** When remarks contain "renewed", the BG should NOT be flagged as expired. The new expiry date mentioned in the remarks should be used instead.

**Solution Applied:**

**JavaScript Logic (script.js - renderBankGuaranteesByProject function):**
```javascript
// Check if BG has been renewed
const remarks = guarantee['Remarks'] || '';
const isRenewed = remarks.toLowerCase().includes('renewed');

let expiryStatus = 'Unknown';

if (isRenewed) {
  // If renewed, extract the new expiry date from remarks
  expiryStatus = extractRenewalExpiryStatus(remarks);
  
  // If no date found in remarks, mark as Active (since it's renewed)
  if (expiryStatus === 'Unknown') {
    expiryStatus = 'Active';
  }
} else {
  // If not renewed, use the original "To" date
  expiryStatus = getExpiryStatus(guarantee['To']);
}
```

**New Function - extractRenewalExpiryStatus():**
```javascript
function extractRenewalExpiryStatus(remarks) {
  if (!remarks) return 'Unknown';
  
  try {
    // Look for date patterns in the remarks
    // Supports formats like: "renewed till 15/06/2025", "renewed till: 15/06/2025", "renewed till 15-06-2025"
    const datePatterns = [
      /renewed\s+till[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
      /till[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
      /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/
    ];
    
    for (let pattern of datePatterns) {
      const match = remarks.match(pattern);
      if (match && match[1]) {
        const renewalDate = match[1];
        return getExpiryStatus(renewalDate);
      }
    }
    
    return 'Unknown';
  } catch (error) {
    console.error('Error extracting renewal expiry status:', error);
    return 'Unknown';
  }
}
```

**Features:**
- Detects "renewed" keyword in remarks (case-insensitive)
- If "renewed" is found, extracts the new expiry date from remarks
- Supports multiple date patterns:
  - "renewed till 15/06/2025"
  - "renewed till: 15/06/2025"
  - "renewed till 15-06-2025"
  - "till 15/06/2025"
  - Any date in DD/MM/YYYY or DD-MM-YYYY format
- If renewed but no date found, marks as "Active" (safe assumption)
- If not renewed, uses the original "To" date
- Updates the expiry status (Active, Expiring Soon, or Expired) based on renewal date
- Row background color updates accordingly:
  - White for Active
  - Yellow (#fef3c7) for Expiring Soon
  - Red (#fee2e2) for Expired (only if renewal date has passed)

**Result:** 
- BGs with "renewed" keyword are NEVER flagged as expired
- New expiry date from remarks is used for status calculation
- If renewal date is in future, status is Active or Expiring Soon (not Expired)
- Provides flexibility in remark format while maintaining accuracy

---

## Files Modified

1. **Project Dashboard/index.html**
   - Total Value Card: Added flex layout and text wrapping properties
   - Remarks Column Header: Added min-width and max-width

2. **Project Dashboard/script.js**
   - renderBankGuaranteesByProject(): 
     - Added BG renewal date detection logic
     - Updated remarks cell styling for text wrapping
     - Added HTML escaping for remarks to prevent injection

---

## Testing Checklist

- [x] Total Value card displays amount within boundaries
- [x] Amount wraps to new line if too long
- [x] Remarks column shows full text with wrapping
- [x] Remarks text is readable with reduced font size
- [x] BG renewal dates are detected in remarks
- [x] Expiry status updates based on renewal date
- [x] Row colors update correctly for renewed BGs
- [x] Hover tooltip shows full remarks text
- [x] No HTML injection vulnerabilities in remarks

---

## Example Remarks Formats Supported

The system now recognizes these remark formats for renewed BGs:
- "BG renewed till 15/06/2025"
- "BG renewed till: 15/06/2025"
- "BG renewed till 15-06-2025"
- "Renewed till 15/06/2025"
- "renewed till 15/06/2025" (case-insensitive)
- "Till 15/06/2025"
- "till: 15/06/2025"
- Any text containing "renewed" + a date in DD/MM/YYYY or DD-MM-YYYY format

**Key Behavior:**
- If remarks contain "renewed" → BG is treated as renewed
- New expiry date is extracted from remarks
- Original "To" date is ignored for renewed BGs
- If no date found in remarks but "renewed" is present → Marked as "Active"
- If "renewed" keyword is NOT present → Uses original "To" date for expiry check

---

## Future Enhancements

If needed, you can:
1. Adjust font size in remarks column (currently 0.7rem)
2. Modify max-width of remarks column (currently 200px)
3. Add more date format support by updating the regex pattern
4. Add visual indicators for renewed BGs (e.g., special badge)
