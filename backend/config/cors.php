<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    // Support one or many origins via FRONTEND_ORIGINS (comma-separated) or fallback to FRONTEND_ORIGIN
    'allowed_origins' => array_filter(array_map('trim', explode(',', env('FRONTEND_ORIGINS', env('FRONTEND_ORIGIN', 'http://localhost:5173'))))),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
