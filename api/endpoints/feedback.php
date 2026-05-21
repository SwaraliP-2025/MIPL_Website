<?php
/**
 * Feedback Endpoint
 * Handles feedback submission
 */

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendErrorResponse('Only POST method is allowed', 405);
}

$action = $_POST['action'] ?? null;

if (!$action) {
    sendErrorResponse('Action parameter is required', 400);
}

switch ($action) {
    case 'addFeedback':
        handleAddFeedback();
        break;
    
    default:
        sendErrorResponse('Unknown action: ' . $action, 400);
}

/**
 * Add feedback for a project
 */
function handleAddFeedback() {
    $projectName = $_POST['projectName'] ?? null;
    $feedback = $_POST['feedback'] ?? null;
    
    if (!$projectName) {
        sendErrorResponse('projectName parameter is required', 400);
    }
    
    if (!$feedback) {
        sendErrorResponse('feedback parameter is required', 400);
    }
    
    $result = callGoogleAppsScript('addFeedback', [
        'projectName' => $projectName,
        'feedback' => $feedback
    ], 'POST');
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}
?>
