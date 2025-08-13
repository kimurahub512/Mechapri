<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>メールアドレス確認コード</title>
    <style>
        body {
            font-family: 'Noto Sans JP', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #FF2AA1;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .code {
            background-color: #FF2AA1;
            color: white;
            font-size: 24px;
            font-weight: bold;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
            letter-spacing: 5px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>メールアドレス確認コード</h1>
    </div>
    
    <div class="content">
        <p>こんにちは、</p>
        
        <p>メールアドレスの変更を確認するために、以下の6桁の確認コードをご利用ください：</p>
        
        <div class="code">{{ $code }}</div>
        
        <p>このコードは30分間有効です。</p>
        
        <p>このメールに心当たりがない場合は、このメールを無視してください。</p>
        
        <p>よろしくお願いいたします。</p>
    </div>
    
    <div class="footer">
        <p>このメールは自動送信されています。返信はできません。</p>
    </div>
</body>
</html>

