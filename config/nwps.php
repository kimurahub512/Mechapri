<?php

return [
    // Base URL for NWPS API (set per environment)
    'base_url' => env('NWPS_BASE_URL', ''),

    // Application authentication key issued by NWPS
    'app_key' => env('NWPS_APP_KEY', ''),

    // Optional: callback URL for NWPS status updates (if used)
    'callback_url' => env('NWPS_CALLBACK_URL', ''),

    // HTTP client timeout (seconds)
    'timeout' => (int) env('NWPS_TIMEOUT', 300), // Increased to 5 minutes for testing

    // Guest token validity in days (align with print window)
    'guest_token_days' => (int) env('NWPS_GUEST_TOKEN_DAYS', 30),
];


