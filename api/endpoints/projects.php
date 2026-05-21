<?php
/**
 * Projects Endpoint
 * Handles all project-related requests
 */

// Get the action from query string or POST data
$action = $_GET['action'] ?? $_POST['action'] ?? 'getProjects';

switch ($action) {
    case 'getProjects':
        handleGetProjects();
        break;
    
    default:
        sendErrorResponse('Unknown action: ' . $action, 400);
}

/**
 * Get all projects
 */
function handleGetProjects() {
    $result = callGoogleAppsScript('getProjects');
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}
?>
