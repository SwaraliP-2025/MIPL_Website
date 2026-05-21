# API Quick Start Guide

## What Changed?

**Before:** Frontend called Google Apps Script directly → CORS errors
**After:** Frontend calls local API → API calls Google Apps Script → No CORS errors

## For Local Development

### 1. Update Google Apps Script URL

Edit `api/config.php` line 7:
```php
define('GOOGLE_APPS_SCRIPT_URL', 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec');
```

Replace `YOUR_DEPLOYMENT_ID` with your actual deployment ID.

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test the API

Open browser console and run:
```javascript
fetch('/api/health').then(r => r.json()).then(console.log)
```

You should see:
```json
{"status": "ok", "message": "API is running"}
```

### 4. Test Projects Endpoint

```javascript
fetch('/api/projects').then(r => r.json()).then(console.log)
```

## For Hostinger Deployment

### 1. Upload API Folder

Via FTP or SSH:
```bash
scp -r api/ user@hostinger.com:~/public_html/
```

### 2. Update Google Apps Script URL

Edit `public_html/api/config.php` line 7 with your deployment ID.

### 3. Update Frontend API_URL

The frontend already uses `/api`, so it will work automatically.

### 4. Test

```bash
curl https://yourdomain.com/api/health
```

## For Netlify Deployment

### Option A: Use Relative Paths (Recommended)

The frontend already uses `/api`, which works on Netlify because:
- Frontend is served from `https://yourdomain.netlify.app`
- API calls go to `/api` (same domain)
- No CORS issues

**Note:** You'll need to handle the PHP backend separately (see deployment guide).

### Option B: Use Vercel for PHP Backend

1. Deploy `api` folder to Vercel
2. Update frontend API_URL:
   ```javascript
   const API_URL = "https://your-vercel-project.vercel.app/api";
   ```

## API Endpoints

All endpoints return JSON:

### Get All Projects
```bash
curl /api/projects
```

### Get Timeline for Project
```bash
curl "/api/timeline?action=getProjectTimeline&projectName=ISCOP"
```

### Get All Timelines
```bash
curl /api/timeline?action=getAllTimelines
```

### Get Timeline Projects
```bash
curl /api/timeline?action=getTimelineProjects
```

### Get Bank Guarantees
```bash
curl /api/bank-guarantees
```

### Submit Feedback
```bash
curl -X POST /api/feedback \
  -d "projectName=ISCOP&feedback=Great project"
```

### Get Documents
```bash
curl "/api/documents?projectName=ISCOP"
```

### Upload Document
```bash
curl -X POST /api/documents \
  -d "projectName=ISCOP&fileName=doc.pdf&fileData=BASE64_DATA&description=My doc&fileType=application/pdf&documentDate=2025-05-21"
```

## Troubleshooting

### "API is not running"
- Check `api/config.php` has correct Google Apps Script URL
- Verify Google Apps Script deployment is active
- Check browser console for actual error

### "Endpoint not found"
- Verify `.htaccess` is in `api` folder
- Check `mod_rewrite` is enabled (Hostinger usually has it)
- Verify file permissions: `chmod 644 api/*.php`

### "Failed to connect to Google Apps Script"
- Verify deployment URL in `config.php`
- Check Google Apps Script is deployed
- Verify PHP curl extension is enabled

### Still getting CORS errors
- Clear browser cache
- Verify frontend is calling `/api/...` (not direct Google Apps Script URL)
- Check browser console for actual error message

## File Structure

```
api/
├── config.php              # Configuration and utilities
├── index.php               # Main router
├── .htaccess               # Apache routing
├── README.md               # Full documentation
└── endpoints/
    ├── projects.php        # Projects endpoint
    ├── timeline.php        # Timeline endpoint
    ├── bank-guarantees.php # Bank guarantees endpoint
    ├── feedback.php        # Feedback endpoint
    └── documents.php       # Documents endpoint
```

## Frontend Changes

The frontend now calls:
- `/api/projects` instead of `API_URL?action=getProjects`
- `/api/timeline?action=...` instead of `API_URL?action=...`
- `/api/bank-guarantees` instead of `API_URL?action=getBankGuarantees`
- `/api/feedback` instead of `API_URL` (POST)
- `/api/documents` instead of `API_URL` (POST)

All changes are already made in `script.js`.

## Next Steps

1. ✅ Update `api/config.php` with your Google Apps Script URL
2. ✅ Test locally with `npm run dev`
3. ✅ Deploy to Hostinger (upload `api` folder)
4. ✅ Test on production domain
5. ✅ Build and deploy frontend

## Support

See `API_DEPLOYMENT_GUIDE.md` for detailed deployment instructions.
