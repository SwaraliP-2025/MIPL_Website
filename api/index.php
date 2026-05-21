<?php
/**
 * Main API Router
 * Routes all requests to appropriate handlers
 */

require_once __DIR__ . '/config.php';

// Get the request path
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/api';

// Remove base path from request path
if (strpos($requestPath, $basePath) === 0) {
    $requestPath = substr($requestPath, strlen($basePath));
}

// Remove leading/trailing slashes
$requestPath = trim($requestPath, '/');

// Parse the endpoint
$parts = explode('/', $requestPath);
$endpoint = $parts[0] ?? '';

// Route to appropriate handler
switch ($endpoint) {
    case 'projects':
        require_once __DIR__ . '/endpoints/projects.php';
        break;
    
    case 'timeline':
        require_once __DIR__ . '/endpoints/timeline.php';
        break;
    
    case 'bank-guarantees':
        require_once __DIR__ . '/endpoints/bank-guarantees.php';
        break;
    
    case 'feedback':
        require_once __DIR__ . '/endpoints/feedback.php';
        break;
    
    case 'documents':
        require_once __DIR__ . '/endpoints/documents.php';
        break;
    
    case 'health':
        sendJsonResponse(['status' => 'ok', 'message' => 'API is running']);
        break;
    
    default:
        sendErrorResponse('Endpoint not found: ' . $endpoint, 404);
}
?>
