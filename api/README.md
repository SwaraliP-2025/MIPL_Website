# Project Dashboard API

A PHP backend layer that proxies all Google Apps Script calls, eliminating CORS issues and providing a clean API interface.

## Architecture

```
Frontend (JavaScript) 
    ↓
Backend API (PHP) 
    ↓
Google Apps Script 
    ↓
Google Sheets
```

## Endpoints

### Projects
- **GET** `/api/projects` - Get all projects
  - Response: Array of project objects

### Timeline
- **GET** `/api/timeline?action=getProjectTimeline&projectName=PROJECT_NAME` - Get timeline for a project
- **GET** `/api/timeline?action=getAllTimelines` - Get all timelines
- **GET** `/api/timeline?action=getTimelineProjects` - Get list of projects with timelines

### Bank Guarantees
- **GET** `/api/bank-guarantees` - Get all bank guarantees

### Feedback
- **POST** `/api/feedback` - Submit feedback
  - Parameters: `projectName`, `feedback`

### Documents
- **GET** `/api/documents?projectName=PROJECT_NAME` - Get documents for a project
- **POST** `/api/documents` - Upload a document
  - Parameters: `projectName`, `fileName`, `fileData`, `description`, `fileType`, `documentDate`, `addToTimeline`
- **GET** `/api/documents?action=getViewUrl&fileId=FILE_ID` - Get document view URL
- **GET** `/api/documents?action=downloadDocument&fileId=FILE_ID` - Get document download URL

### Health Check
- **GET** `/api/health` - Check if API is running

## Configuration

Edit `api/config.php` to update:
- `GOOGLE_APPS_SCRIPT_URL` - Your Google Apps Script deployment URL
- `API_TIMEOUT` - Request timeout in seconds
- `API_MAX_RETRIES` - Number of retries for failed requests

## Deployment

### Local Development
The API works automatically with the frontend on localhost.

### Netlify
1. Copy the `api` folder to your Netlify Functions directory
2. Update frontend URLs to call `/api/...` endpoints

### Hostinger (Shared Hosting)
1. Upload the `api` folder to your public_html directory
2. Ensure `.htaccess` is in the `api` folder
3. Update frontend URLs to call `/api/...` endpoints
4. Verify PHP version supports `curl` extension

### Custom Domain
The API automatically works with any domain:
- `https://yourdomain.com/api/projects`
- `https://yourdomain.com/api/timeline?action=getProjectTimeline&projectName=ISCOP`
- etc.

## Frontend Integration

Update your frontend JavaScript to call the local API instead of Google Apps Script:

```javascript
// OLD (Direct to Google Apps Script - CORS issues)
const API_URL = "https://script.google.com/macros/s/...";
fetch(API_URL + "?action=getProjects")

// NEW (Through local API - No CORS issues)
const API_URL = "/api";
fetch(API_URL + "/projects")
```

## Error Handling

All endpoints return JSON responses:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## CORS Headers

The API automatically sets CORS headers to allow requests from any origin:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`

## Retry Logic

The API includes automatic retry logic:
- Retries failed requests up to 3 times
- Waits 1 second between retries
- Handles network timeouts gracefully

## Performance

- Response compression enabled (gzip)
- Caching headers set for optimal performance
- Timeout set to 30 seconds per request
- Connection pooling for multiple requests

## Security

- SSL certificate verification enabled
- Input validation on all parameters
- Error messages don't expose sensitive information
- CORS headers properly configured

## Troubleshooting

### "Failed to connect to Google Apps Script"
- Verify `GOOGLE_APPS_SCRIPT_URL` in `config.php` is correct
- Check that Google Apps Script deployment is active
- Verify PHP `curl` extension is enabled

### "Endpoint not found"
- Check the endpoint path is correct
- Verify `.htaccess` is in the `api` folder
- Check Apache `mod_rewrite` is enabled

### CORS errors still appearing
- Clear browser cache
- Verify API is being called (not direct Google Apps Script URL)
- Check browser console for actual error message

## Future Enhancements

- Add caching layer (Redis/Memcached)
- Add request logging and monitoring
- Add rate limiting
- Add authentication/authorization
- Add webhook support
- Add batch request support
