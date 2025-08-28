<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>「{{ $notification->data['seller_name'] }}」から新しい写真が届きました！</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .notification-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #1f2937;
        }
        .notification-message {
            font-size: 16px;
            margin-bottom: 30px;
            color: #4b5563;
        }
        .details {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #4F46E5;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            color: #6b7280;
        }
        .detail-value {
            color: #1f2937;
        }
        .button {
            display: inline-block;
            background-color: #4F46E5;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📸 「{{ $notification->data['seller_name'] }}」から新しい写真が届きました！</h1>
    </div>
    
    <div class="content">
        <div class="notification-message">
            <p>{{ $notification->user->name }}様</p>
            
            <p>フォロー中の「{{ $notification->data['seller_name'] }}」が新しい写真を出品しました。<br>
            最新の写真はこちらからご覧いただけます：</p>
            
            <p>気になる写真はお早めにチェックしてみてください！</p>
        </div>
        
        <div class="details">
            <div class="detail-row">
                <span class="detail-label">ショップ名:</span>
                <span class="detail-value">{{ $notification->data['seller_name'] }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">商品名:</span>
                <span class="detail-value">{{ $notification->data['product_title'] }}</span>
            </div>
        </div>
        
        <a href="{{ url('/product/' . $notification->data['product_id']) }}" class="button">商品ページを見る</a>
    </div>
    
    <div class="footer">
        <p>このメールは自動送信されています。返信はできません。</p>
        <p>通知設定は<a href="{{ url('/account-setting') }}">アカウント設定</a>から変更できます。</p>
    </div>
</body>
</html>
