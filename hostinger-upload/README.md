# Hostinger Image Upload for MIPL CMS

This directory contains the image upload endpoint for the MIPL Content Management System.

## Files

- `upload.php` - Main upload endpoint
- `.htaccess` - Security configuration
- `index.php` - Directory protection
- `uploads/` - Directory where images are stored (auto-created)

## Deployment to Hostinger

1. **Upload the entire `hostinger-upload` folder** to your Hostinger hosting via FTP/cPanel/File Manager

2. **Recommended location**: `/public_html/hostinger-upload/`

3. **Set permissions** on the uploads directory:
   ```
   chmod 755 uploads/
   ```

4. **Test the upload endpoint** by visiting:
   ```
   https://consultmipl.com/hostinger-upload/upload.php
   ```
   (Should return JSON error since it's a GET request)

5. **Test with a form** or use the CMS admin panel to upload an image

## Security Notes

- The `.htaccess` file blocks access to sensitive files
- Only image MIME types are allowed (JPEG, PNG, GIF, WebP, SVG)
- Maximum file size: 10MB
- Filenames are randomized to prevent overwrites
- PHP files in uploads directory are blocked for security

## Frontend Integration

The CMS frontend (`src/components/admin/cmsApi.js`) is configured to:
1. Upload images directly to Hostinger via `cmsUploadImage()`
2. Store the returned URL in the Google Sheet via Google Apps Script

## Troubleshooting

### 500 Internal Server Error
- Check PHP error logs in Hostinger
- Ensure `uploads/` directory exists and is writable
- Verify `.htaccess` is not blocking PHP execution

### Upload Fails
- Check file size (max 10MB)
- Verify file type is an image
- Check Hostinger PHP settings (upload_max_filesize, post_max_size)

### Images Not Loading
- Verify the URL returned matches your domain
- Check file permissions in `uploads/` directory
- Ensure `.htaccess` allows image file access