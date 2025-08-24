<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class NWPSService
{
    private Client $http;
    private string $baseUrl;
    private string $appKey;

    public function __construct(?Client $client = null)
    {
        $this->baseUrl = rtrim(config('nwps.base_url'), '/');
        $this->appKey = (string) config('nwps.app_key');
        $this->http = $client ?: new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => config('nwps.timeout'),
            'http_errors' => false, // Don't throw exceptions on HTTP error status codes
        ]);
    }

    public function systemSpec(): array
    {
        return $this->get('/nwpsapi/v2/spec');
    }

    public function maintenanceInfo(): array
    {
        return $this->get('/nwpsapi/v2/maintenanceinfo');
    }

    public function guestLogin(string $client, array $deviceInfo, int $days): array
    {
        $payload = array_merge([
            'app_key' => $this->appKey,
            'expire' => $days,
            'client' => $client,
        ], $deviceInfo);

        // NWPS v2 guest login endpoint
        return $this->postJson('/nwpsapi/v2/loginforguest', $payload);
    }

    public function uploadFile(string $token, array $multipart): array
    {
        // $multipart should include file part and required metadata per spec
        return $this->postMultipart('/nwpsapi/v2/files', $token, $multipart);
    }

    public function registerFileFromUrl(string $token, array $data): array
    {
        // Image registration (retrieval from URL)
        return $this->postJson('/nwpsapi/v2/filesfromurl/image', $data, $token);
    }

    public function getFileInfo(string $token, string $fileId): array
    {
        // Get file information
        $result = $this->get("/nwpsapi/v2/files/{$fileId}", $token);
        
        // Debug logging to see what we're getting
        try {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - NWPS getFileInfo raw result: " . json_encode($result, JSON_PRETTY_PRINT) . "\n", 
                FILE_APPEND
            );
        } catch (\Exception $e) {
            file_put_contents(storage_path('nwps_debug.log'), 
                date('Y-m-d H:i:s') . " - NWPS getFileInfo encoding error: " . $e->getMessage() . "\n", 
                FILE_APPEND
            );
        }
        
        return $result;
    }

    public function deleteFile(string $token, string $fileId): array
    {
        return $this->delete("/nwpsapi/v2/files/{$fileId}", $token);
    }

    public function getLoginQrCode(string $token, ?string $couponCode = null): array
    {
        // Get QR code for convenience store login (requires existing token)
        $uri = '/nwpsapi/v2/login/qrcode';
        if ($couponCode) {
            $uri .= '?coupon_code=' . urlencode($couponCode);
        }
        return $this->get($uri, $token);
    }

    private function get(string $uri, ?string $token = null): array
    {
        $headers = $this->authHeaders($token);
        // Log::info('NWPS GET request', ['uri' => $uri, 'base_url' => $this->baseUrl]);
        $res = $this->http->get($uri, ['headers' => $headers]);
        $responseBody = (string) $res->getBody();
        // Log::info('NWPS GET response', ['uri' => $uri, 'status' => $res->getStatusCode(), 'body_length' => strlen($responseBody)]);
        return json_decode($responseBody, true) ?: [];
    }

    private function getUnauthenticated(string $uri): array
    {
        // For endpoints that don't require authentication
        $headers = [
            'Accept' => 'application/json',
        ];
        $res = $this->http->get($uri, ['headers' => $headers]);
        return json_decode((string) $res->getBody(), true) ?: [];
    }

    private function delete(string $uri, ?string $token = null): array
    {
        $headers = $this->authHeaders($token);
        $res = $this->http->delete($uri, ['headers' => $headers]);
        return json_decode((string) $res->getBody(), true) ?: [];
    }

    private function postJson(string $uri, array $json, ?string $token = null): array
    {
        $headers = $this->authHeaders($token);
        // Log::info('NWPS POST request', ['uri' => $uri, 'base_url' => $this->baseUrl, 'payload' => $json]);
        $res = $this->http->post($uri, [
            'headers' => $headers,
            'json' => $json,
        ]);
        $responseBody = (string) $res->getBody();
        // Log::info('NWPS POST response', ['uri' => $uri, 'status' => $res->getStatusCode(), 'body_length' => strlen($responseBody)]);
        return json_decode($responseBody, true) ?: [];
    }

    private function postMultipart(string $uri, string $token, array $multipart): array
    {
        $headers = $this->authHeaders($token);
        $res = $this->http->post($uri, [
            'headers' => $headers,
            'multipart' => $multipart,
        ]);
        return json_decode((string) $res->getBody(), true) ?: [];
    }

    private function authHeaders(?string $token = null): array
    {
        $headers = [
            'Accept' => '*/*',
            'Accept-Encoding' => 'gzip, deflate, br',
            'Connection' => 'keep-alive',
            'User-Agent' => 'PostmanRuntime/7.45.0',
        ];

        if ($token) {
            // NWPS expects X-NWPSToken header for authenticated requests
            $headers['X-NWPSToken'] = $token;
        }
        return $headers;
    }
}


