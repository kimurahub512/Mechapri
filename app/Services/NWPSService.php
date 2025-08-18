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
        ]);
    }

    public function systemSpec(): array
    {
        return $this->get('/api/v2/system/spec');
    }

    public function maintenanceInfo(): array
    {
        return $this->get('/api/v2/system/maintenance');
    }

    public function guestLogin(string $client, array $deviceInfo, int $days): array
    {
        $payload = array_merge([
            'app_key' => $this->appKey,
            'period' => $days,
            'client' => $client,
        ], $deviceInfo);

        return $this->postJson('/api/v2/auth/guest/login', $payload);
    }

    public function uploadFile(string $token, array $multipart): array
    {
        // $multipart should include file part and required metadata per spec
        return $this->postMultipart('/api/v2/files', $token, $multipart);
    }

    public function registerFileFromUrl(string $token, array $data): array
    {
        return $this->postJson('/api/v2/files/url', $data, $token);
    }

    public function getFileInfo(string $token, string $fileId): array
    {
        return $this->get("/api/v2/files/{$fileId}", $token);
    }

    public function deleteFile(string $token, string $fileId): array
    {
        return $this->delete("/api/v2/files/{$fileId}", $token);
    }

    private function get(string $uri, ?string $token = null): array
    {
        $headers = $this->authHeaders($token);
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
        $res = $this->http->post($uri, [
            'headers' => $headers,
            'json' => $json,
        ]);
        return json_decode((string) $res->getBody(), true) ?: [];
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
            'Accept' => 'application/json',
        ];

        if ($token) {
            $headers['Authorization'] = 'Bearer ' . $token;
        }

        return $headers;
    }
}


