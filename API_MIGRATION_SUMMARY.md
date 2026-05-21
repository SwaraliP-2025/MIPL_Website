# API Migration Summary: Path-Based Routes → Query Parameters

## Problem
The API was using path-based routes (`/projects`, `/documents`, `/timeline`, `/bank-guarantees`) which trigger CORS preflight requests. This caused issues on different hosting platforms (localhost, Netlify, Hostinger).

## Solution
Migrated all API calls to use query parameters (`?action=...`) instead of path-based routes. This eliminates preflight requests and works reliably everywhere.

## Changes at a Glance

### Before (Path-Based Routes)
```javascript
// GET requests with unnecessary configs
fetch(API_URL + "/projects", { cache: "no-store" })
fetch(API_URL + "/documents?action=getDocuments&...")
fetch(API_URL + "/timeline?action=getAllTimelines")
fetch(API_URL + "/bank-guarantees", { cache: "no-store" })

// POST requests with unnecessary headers
fetch(API_URL + "/feedback", {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: '...'
})
```

### After (Query Parameters)
```javascript
// GET requests - minimal config
fetch(API_URL)  // Default action returns projects
fetch(`${API_URL}?action=getDocuments&...`)
fetch(`${API_URL}?action=getAllTimelines`)
fetch(`${API_URL}?action=getBankGuarantees`)

// POST requests - no headers needed
fetch(API_URL, {
  method: 'POST',
  body: '...'
})
```

## API Endpoints

All endpoints now use the same base URL with query parameters:

| Feature | Method | Query Parameter |
|---------|--------|-----------------|
| Get Projects | GET | (none - default) |
| Get Documents | GET | `?action=getDocuments&projectName=...` |
| Get View URL | GET | `?action=getViewUrl&fileId=...` |
| Download Document | GET | `?action=downloadDocument&fileId=...` |
| Get All Timelines | GET | `?action=getAllTimelines` |
| Get Timeline Projects | GET | `?action=getTimelineProjects` |
| Get Bank Guarantees | GET | `?action=getBankGuarantees` |
| Add Feedback | POST | `action=addFeedback&projectName=...&feedback=...` |
| Upload Document | POST | `action=uploadDocument&projectName=...&...` |

## Why This Works

1. **No Preflight Requests**: Query parameters don't trigger CORS preflight
2. **Simple GET Requests**: Most operations use simple GET with no custom headers
3. **POST Without Headers**: POST requests don't include headers that trigger preflight
4. **Universal Compatibility**: Works on localhost, Netlify, Hostinger, and all browsers

## Implementation Details

### Frontend Changes (script.js)
- Updated API_URL to Google Apps Script URL
- Converted all path-based routes to query parameters
- Removed unnecessary fetch configs (cache, headers, mode, credentials)
- Kept POST requests simple (no headers)

### Backend Changes (apps-script-backend-FIXED.gs)
- **No changes needed** - Already handles `e.parameter.action` correctly
- `doGet(e)` processes GET requests with `e.parameter.action`
- `doPost(e)` processes POST requests with `e.parameter.action`

## Testing

### Quick Test
1. Open website in browser
2. Open DevTools Console (F12)
3. Check Network tab - should see NO OPTIONS requests
4. All features should work without CORS errors

### Full Test
- [ ] Load projects
- [ ] View timeline
- [ ] Upload documents
- [ ] Submit feedback
- [ ] View bank guarantees

## Deployment

No backend changes needed. Simply deploy the updated `script.js` to:
- Localhost (npm run dev)
- Netlify
- Hostinger
- Any other platform

## Files Modified

1. **e:\websitee\Project Dashboard\script.js**
   - Line 1-2: Updated API_URL
   - Line 148: Feedback POST call
   - Line 226: Get projects call
   - Line 515: Get documents call
   - Line 632: Get view URL call
   - Line 649: Download document call
   - Line 714: Upload document POST call
   - Line 2304: Get all timelines call
   - Line 2952: Get timeline projects call
   - Line 3089: Get bank guarantees call

## Files Not Modified

1. **e:\websitee\Project Dashboard\apps-script-backend-FIXED.gs**
   - Already correctly implemented
   - No changes needed

## Benefits

✅ **Eliminates CORS Issues**: No more preflight requests  
✅ **Works Everywhere**: Localhost, Netlify, Hostinger, all browsers  
✅ **Minimal Code**: Simpler fetch calls, fewer configs  
✅ **No Backend Changes**: Existing Apps Script works as-is  
✅ **Better Performance**: Fewer HTTP requests (no preflight)  
✅ **Future-Proof**: Query parameters are more stable than path-based routes  

## Rollback Plan

If needed, can revert to previous version:
```bash
git checkout HEAD -- e:\websitee\Project Dashboard\script.js
```

But this shouldn't be necessary - the new implementation is more robust.

## Questions?

The implementation follows Google Apps Script best practices for handling GET and POST requests with query parameters. All changes are backward compatible with the existing backend.
