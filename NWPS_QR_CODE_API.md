# NWPS QR Code API Implementation

## Overview
This implementation provides an API endpoint to get QR codes for convenience store login using the NWPS (Network Printing Service) API.

## API Endpoint

### GET /api/nwps/login-qrcode

**Description**: Retrieves a QR code for convenience store login from NWPS.

**URL**: `/api/nwps/login-qrcode`

**Method**: `GET`

**Authentication**: Requires authenticated user

**Query Parameters**:
- `coupon_code` (optional): String, 1-16 characters
  - Allowed characters: A-Z, a-z, 0-9, and symbols !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~

**Example Requests**:
```
GET /api/nwps/login-qrcode
GET /api/nwps/login-qrcode?coupon_code=ABC123
```

**Response Format**:
```json
{
    "success": true,
    "data": {
        // NWPS API response data
        "qr_code_url": "https://...",
        "expires_at": "2024-01-01T12:00:00Z",
        // ... other NWPS fields
    }
}
```

**Error Response**:
```json
{
    "success": false,
    "message": "Error description"
}
```

## Implementation Details

### Backend Components

1. **NWPSService** (`app/Services/NWPSService.php`)
   - `getLoginQrCode(?string $couponCode = null): array`
   - Makes HTTP request to NWPS API endpoint `/nwpsapi/v2/login/qrcode`
   - Handles optional coupon code parameter

2. **NWPSController** (`app/Http/Controllers/NWPSController.php`)
   - `getLoginQrCode(Request $request, NWPSService $nwps): JsonResponse`
   - Validates coupon code format
   - Returns JSON response with NWPS data

3. **Routes** (`routes/web.php`)
   - `GET /api/nwps/login-qrcode` → `NWPSController@getLoginQrCode`
   - `GET /nwps-qrcode-test` → Test page for API

### Frontend Test Page

**File**: `resources/js/Pages/NWPSQrCodeTest.jsx`

**Features**:
- Input field for optional coupon code
- Validation for coupon code format
- Displays QR code response data
- Shows QR code image if available
- Error handling

**Access**: Visit `/nwps-qrcode-test` when authenticated

## Configuration

### NWPS Configuration (`config/nwps.php`)
```php
return [
    'base_url' => env('NWPS_BASE_URL', 'https://networkprint.ne.jp'),
    'app_key' => env('NWPS_APP_KEY', ''),
    'timeout' => env('NWPS_TIMEOUT', 30),
    'guest_token_days' => env('NWPS_GUEST_TOKEN_DAYS', 30),
];
```

### Environment Variables
```env
NWPS_BASE_URL=https://networkprint.ne.jp
NWPS_APP_KEY=your_app_key_here
NWPS_TIMEOUT=30
NWPS_GUEST_TOKEN_DAYS=30
```

## Usage Examples

### JavaScript/Axios
```javascript
// Without coupon code
const response = await axios.get('/api/nwps/login-qrcode');

// With coupon code
const response = await axios.get('/api/nwps/login-qrcode', {
    params: { coupon_code: 'ABC123' }
});

if (response.data.success) {
    const qrCodeData = response.data.data;
    console.log('QR Code URL:', qrCodeData.qr_code_url);
}
```

### cURL
```bash
# Without coupon code
curl -X GET "http://localhost:8000/api/nwps/login-qrcode" \
  -H "Authorization: Bearer YOUR_TOKEN"

# With coupon code
curl -X GET "http://localhost:8000/api/nwps/login-qrcode?coupon_code=ABC123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Error Handling

The API handles various error scenarios:

1. **Invalid coupon code format**: Returns validation error
2. **NWPS API errors**: Returns error message from NWPS
3. **Network errors**: Returns generic error message
4. **Authentication errors**: Returns 401 if not authenticated

## Testing

1. **Test Page**: Visit `/nwps-qrcode-test` to test the API interactively
2. **API Testing**: Use tools like Postman or curl to test the endpoint directly
3. **Unit Tests**: Can be added to test the service and controller methods

## Security Considerations

1. **Authentication**: Endpoint requires user authentication
2. **Input Validation**: Coupon code is validated for format and length
3. **Error Handling**: Sensitive information is not exposed in error messages
4. **Rate Limiting**: Consider adding rate limiting for production use

## Integration with NWPS Flow

This QR code API is separate from the main NWPS printing flow:

1. **QR Code Login**: Users scan QR code to login at convenience stores
2. **Print Code Generation**: After purchase, print codes are generated via `UploadToNWPSJob`
3. **Printing**: Users use print codes to print their purchased content

The QR code login is typically used for initial convenience store authentication, while print codes are used for actual printing of purchased content.

