# Product Batch API Documentation

## Overview
This API handles product batch creation, retrieval, and management for the MecchaPuri platform.

## Base URL
All endpoints are prefixed with `/api/product-batches`

## Authentication
All endpoints require authentication. Include the session cookie or CSRF token in requests.

## Endpoints

### 1. Create Product Batch
**POST** `/api/product-batches`

Creates a new product batch for the authenticated user.

#### Request Body
```json
{
  "title": "商品タイトル",
  "description": "商品説明（オプション）",
  "image_cnt": 5,
  "sales_deadline": "2024-12-31",
  "sales_limit": 100,
  "price": 1500.00,
  "display_mode": "normal",
  "add_category": false,
  "sn_print": true,
  "sn_format": "number",
  "is_public": true,
  "password": "password123",
  "files": [/* File uploads - see File Upload section below */]
}
```

#### Field Descriptions
- `title` (required): Product title (max 255 characters)
- `description` (optional): Product description (max 1000 characters)
- `image_cnt` (required): Number of images (1-100)
- `sales_deadline` (optional): Sales deadline date (must be future date)
- `sales_limit` (optional): Sales limit quantity (null = unlimited)
- `price` (required): Product price (0.00 - 999999.99)
- `display_mode` (required): One of: `normal`, `gacha`, `blur`, `password`, `cushion`
- `add_category` (required): Boolean - whether to add to category
- `sn_print` (required): Boolean - whether to print serial numbers
- `sn_format` (required if sn_print=true): One of: `number`, `random`
- `is_public` (required): Boolean - whether product is public
- `password` (required if display_mode=password): Password string (6-50 characters)
- `files` (optional): Array of uploaded files (max 10 files, 25MB each)

#### File Upload
Files are uploaded as multipart/form-data and stored in the filesystem:

**Supported Formats:**
- Images: JPG, JPEG, PNG
- Documents: PDF

**File Storage Location:**
```
storage/app/public/product-batches/user_{userId}/batch_{batchId}/
```

**File Processing:**
- Images are automatically resized to max 1500x2100px if larger
- Images are optimized for web delivery
- PDFs are stored as-is
- Original filenames are preserved in database
- Files are renamed with unique IDs for security

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "商品が正常に登録されました。",
  "data": {
    "id": 1,
    "title": "商品タイトル",
    "created_at": "2024-08-08 14:30:00",
    "files_count": 3
  }
}
```

#### Response (Validation Error - 422)
```json
{
  "success": false,
  "message": "パスワード設定を選択した場合、パスワードを入力してください。"
}
```

#### Response (Server Error - 500)
```json
{
  "success": false,
  "message": "商品の登録に失敗しました。しばらく時間をおいて再度お試しください。",
  "error": "Database connection failed"
}
```

### 2. List User's Product Batches
**GET** `/api/product-batches`

Retrieves product batches for the authenticated user.

#### Query Parameters
- `is_public` (optional): Filter by public status (true/false)
- `display_mode` (optional): Filter by display mode
- `price_min` (optional): Minimum price filter
- `price_max` (optional): Maximum price filter
- `per_page` (optional): Items per page (default: 10)

#### Response (Success - 200)
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "商品タイトル",
        "description": "商品説明",
        "image_cnt": 5,
        "sales_deadline": "2024-12-31",
        "sales_limit": 100,
        "price": "1500.00",
        "display_mode": "normal",
        "add_category": false,
        "sn_print": true,
        "sn_format": "number",
        "is_public": true,
        "created_at": "2024-08-08T14:30:00.000000Z",
        "updated_at": "2024-08-08T14:30:00.000000Z",
        "user": {
          "id": 1,
          "name": "ユーザー名",
          "email": "user@example.com"
        }
      }
    ],
    "per_page": 10,
    "total": 1
  }
}
```

### 3. Get Specific Product Batch
**GET** `/api/product-batches/{id}`

Retrieves a specific product batch by ID.

#### Response (Success - 200)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "商品タイトル",
    "description": "商品説明",
    "image_cnt": 5,
    "sales_deadline": "2024-12-31",
    "sales_limit": 100,
    "price": "1500.00",
    "display_mode": "normal",
    "add_category": false,
    "sn_print": true,
    "sn_format": "number",
    "is_public": true,
    "created_at": "2024-08-08T14:30:00.000000Z",
    "updated_at": "2024-08-08T14:30:00.000000Z",
    "user": {
      "id": 1,
      "name": "ユーザー名",
      "email": "user@example.com"
    }
  }
}
```

#### Response (Forbidden - 403)
```json
{
  "success": false,
  "message": "この商品にアクセスする権限がありません。"
}
```

### 4. Update Product Batch
**PUT** `/api/product-batches/{id}`

Updates a specific product batch (currently not implemented).

#### Response (Not Implemented - 501)
```json
{
  "success": false,
  "message": "更新機能は現在開発中です。"
}
```

### 5. Delete Product Batch
**DELETE** `/api/product-batches/{id}`

Deletes a specific product batch.

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "商品が正常に削除されました。"
}
```

#### Response (Forbidden - 403)
```json
{
  "success": false,
  "message": "この商品を削除する権限がありません。"
}
```

## Error Handling

All endpoints return consistent error responses:

### Validation Errors (422)
```json
{
  "success": false,
  "message": "エラーメッセージ"
}
```

### Authorization Errors (403)
```json
{
  "success": false,
  "message": "権限エラーメッセージ"
}
```

### Server Errors (500)
```json
{
  "success": false,
  "message": "サーバーエラーメッセージ",
  "error": "詳細エラー（開発環境のみ）"
}
```

## Frontend Integration

### Example JavaScript Usage
```javascript
// Create a product batch
const createProductBatch = async (data) => {
  try {
    const response = await fetch('/api/product-batches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Product created:', result.data);
      // Handle success
    } else {
      console.error('Error:', result.message);
      // Handle error
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Get user's product batches
const getUserProductBatches = async (filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/product-batches?${queryString}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching product batches:', error);
  }
};
```

## File Storage System

### Storage Location
Product batch files are stored in the filesystem at:
```
storage/app/public/product-batches/user_{userId}/batch_{batchId}/
```

### File Organization
- **User Isolation**: Each user's files are stored in separate directories
- **Batch Isolation**: Each product batch has its own subdirectory
- **Security**: Files are renamed with unique IDs to prevent conflicts
- **Backup**: Files are included in regular backup procedures

### File Types Supported
- **Images**: JPG, JPEG, PNG (automatically optimized)
- **Documents**: PDF (stored as-is)

### File Processing
- **Image Optimization**: Images are resized to max 1500x2100px if larger
- **Quality Settings**: JPEG images are saved at 90% quality
- **PNG Preservation**: PNG files maintain lossless quality
- **File Size**: Maximum 25MB per file

### Database Records
File metadata is stored in the `product_batch_files` table:
- `product_batch_id`: Foreign key to product batch
- `filename`: Unique filename in storage
- `original_name`: Original uploaded filename
- `file_path`: Relative path in storage
- `file_type`: Type of file (image, pdf)
- `file_size`: File size in bytes
- `sort_order`: Display order for files

## Database Schema

The `productbatches` table includes the following fields:

- `id` (Primary Key)
- `user_id` (Foreign Key to users table)
- `title` (String, Required)
- `description` (Text, Nullable)
- `image_cnt` (Integer, Default: 0)
- `sales_deadline` (Date, Nullable)
- `sales_limit` (Integer, Nullable)
- `price` (Decimal 10,2, Default: 0.00)
- `display_mode` (Enum: normal|gacha|blur|password|cushion)
- `add_category` (Boolean, Default: false)
- `sn_print` (Boolean, Default: true)
- `sn_format` (Enum: number|random, Default: number)
- `is_public` (Boolean, Default: true)
- `password` (String, Nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)
