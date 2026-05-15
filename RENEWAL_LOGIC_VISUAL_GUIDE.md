# Bank Guarantee Renewal Logic - Visual Guide

## Decision Flow Chart

```
┌─────────────────────────────────────────────────────────────┐
│  Bank Guarantee Expiry Status Determination                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │ Check Remarks Field   │
                └───────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
        ┌──────────────┐        ┌──────────────┐
        │ Contains     │        │ Does NOT     │
        │ "renewed"?   │        │ contain      │
        │              │        │ "renewed"?   │
        └──────────────┘        └──────────────┘
                │                       │
                │ YES                   │ NO
                │                       │
                ▼                       ▼
        ┌──────────────────┐    ┌──────────────────┐
        │ Extract date     │    │ Use original     │
        │ from remarks     │    │ "To" date        │
        └──────────────────┘    └──────────────────┘
                │                       │
        ┌───────┴───────┐               │
        │               │               │
        ▼               ▼               │
    ┌────────┐    ┌────────┐           │
    │ Date   │    │ No     │           │
    │ found? │    │ date?  │           │
    └────────┘    └────────┘           │
        │              │               │
        │ YES          │ NO            │
        │              │               │
        ▼              ▼               ▼
    ┌──────────┐  ┌──────────┐  ┌──────────────┐
    │ Use that │  │ Mark as  │  │ Calculate    │
    │ date     │  │ "Active" │  │ from "To"    │
    └──────────┘  └──────────┘  └──────────────┘
        │              │              │
        └──────────────┴──────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Compare with Today's Date    │
        └──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌────────┐   ┌────────┐
    │ >30    │   │ ≤30    │   │ <0     │
    │ days   │   │ days   │   │ days   │
    │ away   │   │ away   │   │ past   │
    └────────┘   └────────┘   └────────┘
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌────────┐   ┌────────┐
    │ ACTIVE │   │EXPIRING│   │EXPIRED │
    │        │   │ SOON   │   │        │
    └────────┘   └────────┘   └────────┘
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌────────┐   ┌────────┐
    │ White  │   │ Yellow │   │  Red   │
    │ Row    │   │ Row    │   │ Row    │
    └────────┘   └────────┘   └────────┘
```

---

## Status Determination Matrix

| Remarks | Contains "renewed"? | Date Found? | Status Used | Result | Row Color |
|---------|-------------------|------------|------------|--------|-----------|
| "BG renewed till 15/06/2025" | ✓ YES | ✓ YES | 15/06/2025 | Active/Expiring/Expired | White/Yellow/Red |
| "Renewed till 20/05/2026" | ✓ YES | ✓ YES | 20/05/2026 | Active/Expiring/Expired | White/Yellow/Red |
| "BG renewed" | ✓ YES | ✗ NO | Active (fallback) | Active | White |
| "till 15/06/2025" | ✗ NO | - | Original "To" | Active/Expiring/Expired | White/Yellow/Red |
| "Extended to 15/06/2025" | ✗ NO | - | Original "To" | Active/Expiring/Expired | White/Yellow/Red |
| "Valid till 15/06/2025" | ✗ NO | - | Original "To" | Active/Expiring/Expired | White/Yellow/Red |

---

## Timeline Examples

### Scenario 1: Renewed BG (Future Date)
```
Timeline:
├─ Original "To": 01/01/2025 ❌ (EXPIRED)
├─ Today: 14/05/2026
├─ Remarks: "BG renewed till 15/06/2025"
└─ Renewal Date: 15/06/2025 ✓ (FUTURE)

Result: STATUS = "Active" ✓
        ROW COLOR = White
        
Why: Even though original date passed, BG was renewed
     and new date is in the future
```

### Scenario 2: Renewed BG (Expiring Soon)
```
Timeline:
├─ Original "To": 01/01/2025 ❌ (EXPIRED)
├─ Today: 15/05/2026
├─ Remarks: "Renewed till 20/05/2026"
└─ Renewal Date: 20/05/2026 ⚠️ (5 DAYS AWAY)

Result: STATUS = "Expiring Soon" ⚠️
        ROW COLOR = Yellow
        
Why: BG was renewed but renewal date is within 30 days
```

### Scenario 3: Renewed BG (Already Expired)
```
Timeline:
├─ Original "To": 01/01/2025 ❌ (EXPIRED)
├─ Today: 14/05/2026
├─ Remarks: "Renewed till 10/05/2026"
└─ Renewal Date: 10/05/2026 ❌ (4 DAYS PAST)

Result: STATUS = "Expired" ❌
        ROW COLOR = Red
        
Why: Even though BG was renewed, the renewal date has passed
```

### Scenario 4: Not Renewed (Original Date Expired)
```
Timeline:
├─ Original "To": 01/01/2025 ❌ (EXPIRED)
├─ Today: 14/05/2026
├─ Remarks: "Extended to 15/06/2025"
└─ No "renewed" keyword

Result: STATUS = "Expired" ❌
        ROW COLOR = Red
        
Why: No "renewed" keyword, so original "To" date is used
     Original date has passed
```

### Scenario 5: Not Renewed (Original Date Active)
```
Timeline:
├─ Original "To": 15/06/2025 ✓ (FUTURE)
├─ Today: 14/05/2026
├─ Remarks: "Valid till 15/06/2025"
└─ No "renewed" keyword

Result: STATUS = "Active" ✓
        ROW COLOR = White
        
Why: No "renewed" keyword, so original "To" date is used
     Original date is in the future
```

---

## Date Extraction Patterns

### Pattern 1: "renewed till" + date
```
Matches:
✓ "BG renewed till 15/06/2025"
✓ "renewed till: 15/06/2025"
✓ "Renewed till 15-06-2025"
✓ "RENEWED TILL 15/06/2025"

Regex: /renewed\s+till[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
```

### Pattern 2: "till" + date
```
Matches:
✓ "till 15/06/2025"
✓ "till: 15/06/2025"
✓ "till 15-06-2025"

Regex: /till[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i
```

### Pattern 3: Any date
```
Matches:
✓ "15/06/2025"
✓ "15-06-2025"
✓ "01/01/2026"

Regex: /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/
```

---

## Color Coding Reference

```
┌─────────────────────────────────────────────────────────┐
│ Row Background Colors                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ⬜ WHITE (#ffffff)                                      │
│    Status: ACTIVE                                       │
│    Meaning: BG is valid and not expiring soon          │
│    Action: No immediate action needed                   │
│                                                         │
│ 🟨 YELLOW (#fef3c7)                                    │
│    Status: EXPIRING SOON                               │
│    Meaning: BG will expire within 30 days              │
│    Action: Plan for renewal                            │
│                                                         │
│ 🟥 RED (#fee2e2)                                       │
│    Status: EXPIRED                                      │
│    Meaning: BG has already expired                      │
│    Action: Immediate action required                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Keyword Detection

```
┌─────────────────────────────────────────────────────────┐
│ Renewal Keywords (Case-Insensitive)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ✓ TRIGGERS RENEWAL LOGIC:                              │
│   • "renewed"                                           │
│   • "Renewed"                                           │
│   • "RENEWED"                                           │
│   • "BG renewed"                                        │
│   • "renewed till"                                      │
│   • "renewed till date"                                 │
│                                                         │
│ ✗ DOES NOT TRIGGER:                                    │
│   • "extended" (without "renewed")                      │
│   • "valid till"                                        │
│   • "till"                                              │
│   • "expired"                                           │
│   • "extended to"                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Checklist

- [x] Detect "renewed" keyword in remarks
- [x] Extract date from remarks using regex
- [x] Support multiple date formats (DD/MM/YYYY, DD-MM-YYYY)
- [x] Calculate expiry status from extracted date
- [x] Fallback to "Active" if renewed but no date
- [x] Use original "To" date if not renewed
- [x] Update row background color based on status
- [x] Display status badge (Active/Expiring Soon/Expired)
- [x] Show full remarks text with wrapping
- [x] Prevent HTML injection in remarks

---

## Quick Reference

| If Remarks Contain | Then | Status Calculation |
|-------------------|------|-------------------|
| "renewed" + date | Extract date | Use extracted date |
| "renewed" only | No date found | Mark as "Active" |
| No "renewed" | Any content | Use original "To" date |

---

## Common Mistakes to Avoid

❌ **Wrong:**
```javascript
// Only checking for "BG renewed till"
if (remarks.includes('BG renewed till')) { ... }
```

✅ **Correct:**
```javascript
// Checking for "renewed" keyword (flexible)
if (remarks.toLowerCase().includes('renewed')) { ... }
```

---

❌ **Wrong:**
```javascript
// Using original date even if renewed
expiryStatus = getExpiryStatus(guarantee['To']);
```

✅ **Correct:**
```javascript
// Check if renewed first
if (isRenewed) {
  expiryStatus = extractRenewalExpiryStatus(remarks);
} else {
  expiryStatus = getExpiryStatus(guarantee['To']);
}
```

---

## Summary

The renewal logic ensures that:
1. **Renewed BGs are never incorrectly flagged as expired**
2. **New expiry dates from remarks are properly extracted and used**
3. **Multiple date formats are supported for flexibility**
4. **Safe fallbacks are in place for edge cases**
5. **Visual indicators clearly show the status**
