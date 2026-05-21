# API Deployment Guide

## Overview

The project now uses a PHP backend API layer to proxy all Google Apps Script calls. This eliminates CORS issues and provides a clean, scalable architecture.

### Architecture

```
Frontend (JavaScript)
    ↓ (calls /api/...)
Backend API (PHP)
    ↓ (calls Google Apps Script)
Google Apps Script
    ↓ (reads/writes)
Google Sheets
```

## Local Development

### Prerequisites
- PHP 7.4+ with curl extension
- Node.js (for frontend development)

### Setup

1. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   This will run on `http://localhost:5173` (or similar)

2. **The API is automatically available at:**
   ```
   http://localhost:5173/api/...
   ```

3. **Test the API:**
   ```bash
   curl http://localhost:5173/api/health
   ```

### Configuration

Edit `api/config.php` to update the Google Apps Script URL:

```php
define('GOOGLE_APPS_SCRIPT_URL', 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec');
```

## Netlify Deployment

### Option 1: Using Netlify Functions (Recommended)

1. **Create `netlify/functions/api.js`:**
   ```javascript
   // This would proxy to your PHP backend or directly to Google Apps Script
   // For now, use the public folder approach below
   ```

2. **Or use the public folder approach (simpler):**
   - The `api` folder is already in the public directory
   - Netlify will serve it as static files
   - PHP won't work on Netlify (it's a static host)

### Option 2: Use a Separate Backend Service

For Netlify, you have two options:

**A) Use Vercel for the PHP backend:**
1. Create a Vercel account
2. Deploy the `api` folder as a separate project
3. Update frontend API_URL to point to Vercel

**B) Keep Google Apps Script as-is:**
1. The CORS issue is only in development
2. On Netlify, the frontend is served from the same domain
3. CORS restrictions don't apply to same-origin requests

## Hostinger Deployment (Shared Hosting)

### Prerequisites
- SSH access to your Hostinger account
- PHP 7.4+ with curl extension enabled

### Deployment Steps

1. **Upload the API folder:**
   ```bash
   # Via FTP or SSH
   scp -r api/ user@hostinger.com:~/public_html/
   ```

2. **Verify .htaccess is present:**
   ```bash
   ls -la ~/public_html/api/.htaccess
   ```

3. **Set proper permissions:**
   ```bash
   chmod 755 ~/public_html/api
   chmod 644 ~/public_html/api/*.php
   chmod 644 ~/public_html/api/.htaccess
   ```

4. **Update frontend API_URL:**
   ```javascript
   const API_URL = "https://yourdomain.com/api";
   ```

5. **Test the API:**
   ```bash
   curl https://yourdomain.com/api/health
   ```

### Troubleshooting Hostinger

**Issue: "Endpoint not found"**
- Verify `.htaccess` is in the `api` folder
- Check that `mod_rewrite` is enabled (usually is by default)
- Contact Hostinger support if needed

**Issue: "Failed to connect to Google Apps Script"**
- Verify `curl` extension is enabled
- Check `GOOGLE_APPS_SCRIPT_URL` in `config.php`
- Verify Google Apps Script deployment is active

**Issue: "Permission denied"**
- Ensure files have correct permissions (644 for PHP files)
- Ensure directory has correct permissions (755)

## Custom Domain Deployment

### For any hosting provider:

1. **Upload the API folder to your web root:**
   ```
   /public_html/api/
   ```

2. **Update frontend to use relative paths:**
   ```javascript
   const API_URL = "/api";
   ```

3. **Or use absolute URLs:**
   ```javascript
   const API_URL = "https://yourdomain.com/api";
   ```

4. **Test all endpoints:**
   ```bash
   curl https://yourdomain.com/api/health
   curl https://yourdomain.com/api/projects
   curl https://yourdomain.com/api/timeline?action=getTimelineProjects
   curl https://yourdomain.com/api/bank-guarantees
   ```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects

### Timeline
- `GET /api/timeline?action=getProjectTimeline&projectName=PROJECT_NAME`
- `GET /api/timeline?action=getAllTimelines`
- `GET /api/timeline?action=getTimelineProjects`

### Bank Guarantees
- `GET /api/bank-guarantees` - Get all bank guarantees

### Feedback
- `POST /api/feedback` - Submit feedback

### Documents
- `GET /api/documents?projectName=PROJECT_NAME` - Get documents
- `POST /api/documents` - Upload document
- `GET /api/documents?action=getViewUrl&fileId=FILE_ID`
- `GET /api/documents?action=downloadDocument&fileId=FILE_ID`

### Health Check
- `GET /api/health` - Check API status

## Frontend Configuration

### Update API_URL

The frontend now uses:
```javascript
const API_URL = "/api";
```

This works on:
- ✅ Localhost (dev server)
- ✅ Netlify (same domain)
- ✅ Hostinger (same domain)
- ✅ Any custom domain

### No CORS Headers Needed

The PHP backend handles CORS automatically:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
```

## Performance Optimization

### Caching

The API includes caching headers:
```php
// 1 minute cache for JSON responses
ExpiresByType application/json "access plus 1 minute"
```

### Compression

Gzip compression is enabled:
```apache
AddOutputFilterByType DEFLATE application/json
```

### Retry Logic

Automatic retries for failed requests:
- Up to 3 retries
- 1 second delay between retries
- 30 second timeout per request

## Security

### CORS Headers
- Allows requests from any origin
- Prevents browser CORS errors
- Safe for public APIs

### Input Validation
- All parameters validated
- Error messages don't expose sensitive info
- SSL certificate verification enabled

### Rate Limiting
- Can be added in future versions
- Currently unlimited requests

## Monitoring

### Check API Status
```bash
curl https://yourdomain.com/api/health
```

### Check Logs
- Hostinger: Check error logs in cPanel
- Netlify: Check deployment logs
- Local: Check browser console

### Debug Mode
Add to `config.php` for debugging:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Troubleshooting

### "Failed to connect to Google Apps Script"
1. Verify deployment URL in `config.php`
2. Check Google Apps Script is deployed
3. Verify curl extension is enabled
4. Check network connectivity

### "Endpoint not found"
1. Verify `.htaccess` is present
2. Check `mod_rewrite` is enabled
3. Verify file permissions (644)
4. Check directory permissions (755)

### CORS errors still appearing
1. Clear browser cache
2. Verify API is being called (not direct Google Apps Script)
3. Check browser console for actual error
4. Verify API_URL is correct

### Slow responses
1. Check Google Apps Script performance
2. Verify network connectivity
3. Check server load
4. Consider adding caching

## Future Enhancements

- [ ] Add caching layer (Redis/Memcached)
- [ ] Add request logging and monitoring
- [ ] Add rate limiting
- [ ] Add authentication/authorization
- [ ] Add webhook support
- [ ] Add batch request support
- [ ] Add GraphQL endpoint
- [ ] Add API versioning

## Support

For issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check server logs
4. Contact hosting provider if needed

## Files

- `api/config.php` - Configuration and utilities
- `api/index.php` - Main router
- `api/.htaccess` - Apache routing rules
- `api/endpoints/projects.php` - Projects endpoint
- `api/endpoints/timeline.php` - Timeline endpoint
- `api/endpoints/bank-guarantees.php` - Bank guarantees endpoint
- `api/endpoints/feedback.php` - Feedback endpoint
- `api/endpoints/documents.php` - Documents endpoint
- `api/README.md` - API documentation
