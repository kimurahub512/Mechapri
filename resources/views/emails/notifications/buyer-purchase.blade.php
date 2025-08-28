<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ご購入ありがとうございます！</title>
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
        <h1>🎉 ご購入ありがとうございます！</h1>
    </div>
    
    <div class="content">
        <div class="notification-message">
            <p>{{ $notification->user->name }}様</p>
            
            <p>この度は「{{ $notification->data['product_title'] }}」をご購入いただき、誠にありがとうございます。<br>
            購入した写真はマイページからいつでもご確認いただけます。</p>
            
            <p>引き続き「めちゃプリ」でのお買い物をお楽しみください。</p>
        </div>
        
        <div class="details">
            <div class="detail-row">
                <span class="detail-label">商品名:</span>
                <span class="detail-value">{{ $notification->data['product_title'] }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">数量:</span>
                <span class="detail-value">{{ $notification->data['quantity'] }}枚</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">価格:</span>
                <span class="detail-value">¥{{ number_format($notification->data['price']) }}</span>
            </div>
        </div>
        
        <a href="{{ url('/purchase-history') }}" class="button">購入履歴を確認</a>
    </div>
    
    <div class="footer">
        <p>このメールは自動送信されています。返信はできません。</p>
        <p>通知設定は<a href="{{ url('/account-setting') }}">アカウント設定</a>から変更できます。</p>
    </div>
</body>
</html>
