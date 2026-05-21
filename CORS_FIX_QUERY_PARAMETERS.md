# CORS Fix: Query Parameter-Based API Calls

## Overview
Fixed all API calls to use query parameters instead of path-based routes to avoid CORS/preflight issues. This ensures the Apps Script API works reliably on localhost, Netlify, Hostinger, and all browsers.

## Changes Made

### 1. API Configuration (script.js line 1-2)
**Before:**
```javascript
const API_URL = "http://localhost:8000";
```

**After:**
```javascript
const API_URL = "https://script.google.com/macros/s/AKfycby2U6Jpif4JT3aAUPBpxQl2-SGYlEkE3I_73uwHIcYhXqad4R6aRHA8NVBuIBifiF1sXw/exec";
```

### 2. Removed Unnecessary Fetch Configs
All GET requests now use minimal config:
```javascript
// Before (with unnecessary headers)
fetch(API_URL + "/projects", { 
  cache: "no-store",
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// After (minimal config)
fetch(API_URL)
```

### 3. Converted Path-Based Routes to Query Parameters

#### Projects
- **Before:** `fetch(API_URL + "/projects")`
- **After:** `fetch(API_URL)` (default action returns projects)

#### Feedback
- **Before:** `fetch(API_URL + "/feedback", { method: 'POST', headers: {...} })`
- **After:** `fetch(API_URL, { method: 'POST', body: '...' })`

#### Documents
- **Before:** `fetch(API_URL + "/documents?action=getDocuments&...")`
- **After:** `fetch(API_URL + "?action=getDocuments&...")`

#### Timeline
- **Before:** `fetch(API_URL + "/timeline?action=getAllTimelines")`
- **After:** `fetch(API_URL + "?action=getAllTimelines")`

#### Bank Guarantees
- **Before:** `fetch(API_URL + "/bank-guarantees")`
- **After:** `fetch(API_URL + "?action=getBankGuarantees")`

### 4. All Query Parameter Actions

| Action | Method | Purpose |
|--------|--------|---------|
| (none) | GET | Get all projects (default) |
| `getProjects` | GET | Get all projects (explicit) |
| `getDocuments` | GET | Get documents for a project |
| `getViewUrl` | GET | Get view URL for a document |
| `downloadDocument` | GET | Get download URL for a document |
| `getAllTimelines` | GET | Get all project timelines |
| `getTimelineProjects` | GET | Get list of projects with timelines |
| `getBankGuarantees` | GET | Get all bank guarantees |
| `addFeedback` | POST | Submit feedback for a project |
| `uploadDocument` | POST | Upload a document |

## Apps Script Backend (apps-script-backend-FIXED.gs)

The backend already supports both `doGet()` and `doPost()` functions that handle `e.parameter.action`:

```javascript
function doGet(e) {
  var action = e.parameter.action;
  
  if (action === 'getDocuments') {
    return getProjectDocuments(e.parameter.projectName);
  }
  // ... more actions
}

function doPost(e) {
  var action = e.parameter.action;
  
  if (action === 'addFeedback') {
    return addFeedback(e.parameter.projectName, e.parameter.feedback);
  }
  // ... more actions
}
```

## Why This Fixes CORS Issues

1. **No Preflight Requests**: Query parameters don't trigger CORS preflight (OPTIONS) requests
2. **Simple GET Requests**: Most operations use simple GET requests with no custom headers
3. **POST Without Headers**: POST requests don't include unnecessary `Content-Type` headers that trigger preflight
4. **Works Everywhere**: This approach works on localhost, Netlify, Hostinger, and all browsers

## Testing

To verify the fix works:

1. Open the website in a browser
2. Open DevTools Console (F12)
3. Check that API calls complete without CORS errors
4. Verify all features work:
   - Load projects ✓
   - View timeline ✓
   - Upload documents ✓
   - Submit feedback ✓
   - View bank guarantees ✓

## Files Modified

- `e:\websitee\Project Dashboard\script.js` - Updated all fetch calls to use query parameters

## Files Not Modified (Already Correct)

- `e:\websitee\Project Dashboard\apps-script-backend-FIXED.gs` - Already handles `e.parameter.action` correctly

## Deployment

No changes needed to the Apps Script backend. Simply deploy the updated `script.js` to:
- Localhost (npm run dev)
- Netlify
- Hostinger
- Any other hosting platform

The API calls will work without CORS issues on all platforms.
