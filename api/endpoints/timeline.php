<?php
/**
 * Timeline Endpoint
 * Handles all timeline-related requests
 */

// Get the action from query string or POST data
$action = $_GET['action'] ?? $_POST['action'] ?? null;

if (!$action) {
    sendErrorResponse('Action parameter is required', 400);
}

switch ($action) {
    case 'getProjectTimeline':
        handleGetProjectTimeline();
        break;
    
    case 'getAllTimelines':
        handleGetAllTimelines();
        break;
    
    case 'getTimelineProjects':
        handleGetTimelineProjects();
        break;
    
    default:
        sendErrorResponse('Unknown action: ' . $action, 400);
}

/**
 * Get timeline for a specific project
 */
function handleGetProjectTimeline() {
    $projectName = $_GET['projectName'] ?? $_POST['projectName'] ?? null;
    
    if (!$projectName) {
        sendErrorResponse('projectName parameter is required', 400);
    }
    
    $result = callGoogleAppsScript('getProjectTimeline', [
        'projectName' => $projectName
    ]);
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}

/**
 * Get all timelines
 */
function handleGetAllTimelines() {
    $result = callGoogleAppsScript('getAllTimelines');
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}

/**
 * Get list of projects with timelines
 */
function handleGetTimelineProjects() {
    $result = callGoogleAppsScript('getTimelineProjects');
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}
?>
