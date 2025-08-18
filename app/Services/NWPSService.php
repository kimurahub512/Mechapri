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
        return $this->get("/nwpsapi/v2/files/{$fileId}", $token);
    }

    public function deleteFile(string $token, string $fileId): array
    {
        return $this->delete("/nwpsapi/v2/files/{$fileId}", $token);
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
            // NWPS expects X-NWPSToken header for authenticated requests
            $headers['X-NWPSToken'] = $token;
        }

        return $headers;
    }
}


