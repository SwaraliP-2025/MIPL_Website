<?php
/**
 * Documents Endpoint
 * Handles document upload and retrieval
 */

$action = $_GET['action'] ?? $_POST['action'] ?? null;

if (!$action) {
    sendErrorResponse('Action parameter is required', 400);
}

switch ($action) {
    case 'getDocuments':
        handleGetDocuments();
        break;
    
    case 'uploadDocument':
        handleUploadDocument();
        break;
    
    case 'getViewUrl':
        handleGetViewUrl();
        break;
    
    case 'downloadDocument':
        handleDownloadDocument();
        break;
    
    default:
        sendErrorResponse('Unknown action: ' . $action, 400);
}

/**
 * Get documents for a project
 */
function handleGetDocuments() {
    $projectName = $_GET['projectName'] ?? $_POST['projectName'] ?? null;
    
    if (!$projectName) {
        sendErrorResponse('projectName parameter is required', 400);
    }
    
    $result = callGoogleAppsScript('getDocuments', [
        'projectName' => $projectName
    ]);
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}

/**
 * Upload a document
 */
function handleUploadDocument() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendErrorResponse('Only POST method is allowed', 405);
    }
    
    $projectName = $_POST['projectName'] ?? null;
    $fileName = $_POST['fileName'] ?? null;
    $fileData = $_POST['fileData'] ?? null;
    $description = $_POST['description'] ?? '';
    $fileType = $_POST['fileType'] ?? '';
    $documentDate = $_POST['documentDate'] ?? '';
    $addToTimeline = $_POST['addToTimeline'] ?? 'false';
    
    if (!$projectName) {
        sendErrorResponse('projectName parameter is required', 400);
    }
    
    if (!$fileName) {
        sendErrorResponse('fileName parameter is required', 400);
    }
    
    if (!$fileData) {
        sendErrorResponse('fileData parameter is required', 400);
    }
    
    $result = callGoogleAppsScript('uploadDocument', [
        'projectName' => $projectName,
        'fileName' => $fileName,
        'fileData' => $fileData,
        'description' => $description,
        'fileType' => $fileType,
        'documentDate' => $documentDate,
        'addToTimeline' => $addToTimeline
    ], 'POST');
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}

/**
 * Get document view URL
 */
function handleGetViewUrl() {
    $fileId = $_GET['fileId'] ?? $_POST['fileId'] ?? null;
    
    if (!$fileId) {
        sendErrorResponse('fileId parameter is required', 400);
    }
    
    $result = callGoogleAppsScript('getViewUrl', [
        'fileId' => $fileId
    ]);
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}

/**
 * Get document download URL
 */
function handleDownloadDocument() {
    $fileId = $_GET['fileId'] ?? $_POST['fileId'] ?? null;
    
    if (!$fileId) {
        sendErrorResponse('fileId parameter is required', 400);
    }
    
    $result = callGoogleAppsScript('downloadDocument', [
        'fileId' => $fileId
    ]);
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}
?>
