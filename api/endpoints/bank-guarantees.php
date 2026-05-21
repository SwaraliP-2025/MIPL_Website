<?php
/**
 * Bank Guarantees Endpoint
 * Handles all bank guarantee-related requests
 */

// Get the action from query string or POST data
$action = $_GET['action'] ?? $_POST['action'] ?? 'getBankGuarantees';

switch ($action) {
    case 'getBankGuarantees':
        handleGetBankGuarantees();
        break;
    
    default:
        sendErrorResponse('Unknown action: ' . $action, 400);
}

/**
 * Get all bank guarantees
 */
function handleGetBankGuarantees() {
    $result = callGoogleAppsScript('getBankGuarantees');
    
    if (isset($result['error'])) {
        sendErrorResponse($result['error'], 500);
    }
    
    sendJsonResponse($result);
}
?>
