# Bank Guarantee Renewal Logic - Quick Reference

## How It Works

### Decision Tree

```
Does remarks contain "renewed"?
│
├─ YES → Extract date from remarks
│        │
│        ├─ Date found? → Use that date for expiry check
│        │
│        └─ No date found? → Mark as "Active"
│
└─ NO → Use original "To" date for expiry check
```

---

## Expiry Status Determination

### For Renewed BGs (contains "renewed" keyword)

| Scenario | Status | Row Color |
|----------|--------|-----------|
| Renewal date is in the future (>30 days) | Active | White |
| Renewal date is within 30 days | Expiring Soon | Yellow |
| Renewal date has passed | Expired | Red |
| "renewed" found but no date in remarks | Active | White |

### For Non-Renewed BGs (no "renewed" keyword)

| Scenario | Status | Row Color |
|----------|--------|-----------|
| "To" date is in the future (>30 days) | Active | White |
| "To" date is within 30 days | Expiring Soon | Yellow |
| "To" date has passed | Expired | Red |

---

## Remark Format Examples

### ✅ Correctly Recognized Formats

```
"BG renewed till 15/06/2025"
"BG renewed till: 15/06/2025"
"BG renewed till 15-06-2025"
"Renewed till 15/06/2025"
"renewed till 15/06/2025"
"Till 15/06/2025"
"till: 15/06/2025"
"BG Renewed till 30/12/2025"
"Renewed till 01/01/2026"
"till 31/03/2025"
```

### ✅ Flexible Formats (Also Supported)

```
"BG renewed till: 15/06/2025 - Extended"
"Renewed till 15-06-2025 for Project X"
"till 15/06/2025 (extended)"
"Renewed till 15/06/2025 - Final extension"
```

### ❌ Not Recognized (Will Use Original "To" Date)

```
"BG expired on 15/06/2025"  (no "renewed" keyword)
"Extended to 15/06/2025"     (no "renewed" keyword)
"Valid till 15/06/2025"      (no "renewed" keyword)
"15/06/2025"                 (no "renewed" keyword)
```

---

## Code Logic Breakdown

### Step 1: Check for "renewed" Keyword
```javascript
const isRenewed = remarks.toLowerCase().includes('renewed');
```
- Case-insensitive check
- Any occurrence of "renewed" triggers renewal logic

### Step 2: Extract Date (if renewed)
```javascript
const datePatterns = [
  /renewed\s+till[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
  /till[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
  /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/
];
```
- Pattern 1: Looks for "renewed till" followed by date
- Pattern 2: Looks for "till" followed by date
- Pattern 3: Looks for any date in DD/MM/YYYY or DD-MM-YYYY format

### Step 3: Calculate Expiry Status
```javascript
expiryStatus = getExpiryStatus(renewalDate);
```
- Compares renewal date with today
- Returns: "Active", "Expiring Soon", or "Expired"

### Step 4: Fallback for Renewed without Date
```javascript
if (expiryStatus === 'Unknown') {
  expiryStatus = 'Active';  // Safe assumption
}
```
- If "renewed" is present but no date found, assume it's still active

---

## Important Notes

1. **Renewed BGs are NEVER flagged as Expired** if the renewal date is in the future
2. **Original "To" date is ignored** for renewed BGs
3. **Date extraction is flexible** - supports multiple formats
4. **Case-insensitive** - "RENEWED", "Renewed", "renewed" all work
5. **Safe fallback** - If renewed but no date found, marked as "Active"

---

## Testing Examples

### Example 1: Simple Renewal
```
Original "To" date: 01/01/2025 (EXPIRED)
Remarks: "BG renewed till 15/06/2025"
Result: Status = "Active" (not Expired!)
Reason: Renewal date is in future
```

### Example 2: Renewal Expiring Soon
```
Original "To" date: 01/01/2025 (EXPIRED)
Remarks: "Renewed till 20/05/2026"
Today: 15/05/2026
Result: Status = "Expiring Soon" (within 30 days)
Reason: Renewal date is within 30 days
```

### Example 3: Renewed but No Date
```
Original "To" date: 01/01/2025 (EXPIRED)
Remarks: "BG renewed"
Result: Status = "Active"
Reason: "renewed" keyword present, no date found → Safe assumption
```

### Example 4: Not Renewed
```
Original "To" date: 01/01/2025
Remarks: "Extended to 15/06/2025"
Result: Status = "Expired"
Reason: No "renewed" keyword → Uses original "To" date
```

---

## Maintenance & Updates

To modify the renewal logic:

1. **Change the "renewed" keyword detection:**
   - Edit: `remarks.toLowerCase().includes('renewed')`
   - Example: Add more keywords like `includes('renewed') || includes('extended')`

2. **Add new date formats:**
   - Edit the `datePatterns` array in `extractRenewalExpiryStatus()`
   - Add new regex patterns as needed

3. **Change the 30-day threshold:**
   - Edit: `getExpiryStatus()` function
   - Change: `daysUntilExpiry <= 30` to desired threshold

4. **Change fallback status for renewed without date:**
   - Edit: `if (expiryStatus === 'Unknown') { expiryStatus = 'Active'; }`
   - Change 'Active' to 'Expiring Soon' or other status as needed
