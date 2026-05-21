<?php
/**
 * API Configuration
 * Central configuration for all API endpoints
 */

// Google Apps Script URL - Update this with your deployment URL
define('GOOGLE_APPS_SCRIPT_URL', 'https://script.google.com/macros/s/AKfycby8Mb2WDLia3dyCeNSjI2KKuP4RUcUk48FLgUeqfWBz-FeeHnzRUq0ixwBrXjsktJeszw/exec');

// API Configuration
define('API_TIMEOUT', 30); // seconds
define('API_MAX_RETRIES', 3);

// CORS Headers - Allow requests from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Make a request to Google Apps Script
 * 
 * @param string $action The action to perform
 * @param array $params Additional parameters
 * @param string $method GET or POST
 * @return array Response data
 */
function callGoogleAppsScript($action, $params = [], $method = 'GET') {
    $url = GOOGLE_APPS_SCRIPT_URL;
    
    if ($method === 'GET') {
        $queryParams = array_merge(['action' => $action], $params);
        $url .= '?' . http_build_query($queryParams);
        
        $response = makeHttpRequest($url, 'GET');
    } else {
        $postData = array_merge(['action' => $action], $params);
        $response = makeHttpRequest($url, 'POST', $postData);
    }
    
    return $response;
}

/**
 * Make an HTTP request with retry logic
 * 
 * @param string $url The URL to request
 * @param string $method GET or POST
 * @param array $data Data to send (for POST)
 * @return array Response data
 */
function makeHttpRequest($url, $method = 'GET', $data = null) {
    $retries = 0;
    $lastError = null;
    
    while ($retries < API_MAX_RETRIES) {
        try {
            $ch = curl_init();
            
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, API_TIMEOUT);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
            
            if ($method === 'POST' && $data) {
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
            }
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $error = curl_error($ch);
            
            curl_close($ch);
            
            if ($error) {
                $lastError = $error;
                $retries++;
                if ($retries < API_MAX_RETRIES) {
                    sleep(1); // Wait before retry
                    continue;
                }
            }
            
            if ($httpCode >= 200 && $httpCode < 300) {
                return json_decode($response, true) ?: ['error' => 'Invalid JSON response'];
            } else {
                $lastError = "HTTP $httpCode";
                $retries++;
                if ($retries < API_MAX_RETRIES) {
                    sleep(1);
                    continue;
                }
            }
        } catch (Exception $e) {
            $lastError = $e->getMessage();
            $retries++;
            if ($retries < API_MAX_RETRIES) {
                sleep(1);
                continue;
            }
        }
    }
    
    return [
        'success' => false,
        'error' => 'Failed to connect to Google Apps Script: ' . $lastError,
        'retries' => $retries
    ];
}

/**
 * Send JSON response
 * 
 * @param array $data Data to send
 * @param int $statusCode HTTP status code
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit();
}

/**
 * Send error response
 * 
 * @param string $message Error message
 * @param int $statusCode HTTP status code
 */
function sendErrorResponse($message, $statusCode = 400) {
    sendJsonResponse([
        'success' => false,
        'error' => $message
    ], $statusCode);
}
?>
