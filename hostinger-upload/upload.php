<?php
/**
 * Hostinger Image Upload Endpoint for MIPL CMS
 * 
 * Upload images to Hostinger hosting and return the public URL
 * 
 * Usage: POST multipart/form-data with 'image' field
 * Returns: JSON { success: true, url: "https://..." }
 */

// Disable error display for security
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Set response type and CORS headers FIRST (before any output or exit)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS requests immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Only POST method is allowed'
    ]);
    exit;
}

// Configuration
$uploadDir = __DIR__ . '/uploads';
$baseUrl = 'https://' . $_SERVER['HTTP_HOST'] . '/hostinger-upload/uploads';

// Create uploads directory if it doesn't exist
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to create uploads directory. Check folder permissions.'
        ]);
        exit;
    }
}

// Check if uploads directory is writable
if (!is_writable($uploadDir)) {
    echo json_encode([
        'success' => false,
        'message' => 'Uploads directory is not writable. Set permissions to 755 or 775.'
    ]);
    exit;
}

// Check if image was uploaded
if (!isset($_FILES['image'])) {
    echo json_encode([
        'success' => false,
        'message' => 'No image file provided. Make sure form has enctype="multipart/form-data"'
    ]);
    exit;
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File too large (exceeds PHP upload_max_filesize limit)',
        UPLOAD_ERR_FORM_SIZE => 'File too large (exceeds form MAX_FILE_SIZE limit)',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION => 'Upload blocked by extension',
    ];
    $errorMsg = isset($errorMessages[$file['error']]) ? $errorMessages[$file['error']] : 'Unknown upload error';
    echo json_encode([
        'success' => false,
        'message' => 'Upload error: ' . $errorMsg . ' (Error code: ' . $file['error'] . ')'
    ]);
    exit;
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid file type: ' . $mimeType . '. Only JPEG, PNG, GIF, and WebP are allowed.'
    ]);
    exit;
}

// Validate file size (10MB max)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    echo json_encode([
        'success' => false,
        'message' => 'File too large (' . round($file['size'] / 1024 / 1024, 2) . 'MB). Maximum size is 10MB.'
    ]);
    exit;
}

// Generate unique filename
$originalName = pathinfo($file['name'], PATHINFO_FILENAME);
$originalName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalName);
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if ($mimeType === 'image/jpeg') $extension = 'jpg';
elseif ($mimeType === 'image/png') $extension = 'png';
elseif ($mimeType === 'image/gif') $extension = 'gif';
elseif ($mimeType === 'image/webp') $extension = 'webp';

$newFileName = $originalName . '_' . uniqid() . '.' . $extension;
$targetPath = $uploadDir . '/' . $newFileName;

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save file. Check folder permissions and disk space.'
    ]);
    exit;
}

// Return success with public URL
echo json_encode([
    'success' => true,
    'url' => $baseUrl . '/' . $newFileName,
    'fileName' => $newFileName,
    'originalName' => $file['name'],
    'size' => $file['size'],
    'type' => $mimeType
]);
