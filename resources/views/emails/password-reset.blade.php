<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>パスワードリセット</title>
    <style>
        body {
            font-family: 'Hiragino Sans', 'Noto Sans JP', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo {
            max-width: 200px;
            height: auto;
        }
        .content {
            padding: 0 20px;
        }
        .title {
            color: #363636;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 30px;
        }
        .message {
            color: #363636;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(270deg, #FF2AA1 0%, #AB31D3 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .button:hover {
            opacity: 0.9;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9e9e9;
            color: #969696;
            font-size: 14px;
            text-align: center;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('images/mechapuri-logo.svg') }}" alt="Mechapuri Logo" class="logo">
        </div>
        
        <div class="content">
            <h1 class="title">パスワードリセット</h1>
            
            <p class="message">
                パスワードリセットのリクエストを受け付けました。<br>
                以下のボタンをクリックして、新しいパスワードを設定してください。
            </p>
            
            <div style="text-align: center;">
                <a href="{{ $url }}" class="button">パスワードをリセット</a>
            </div>
            
            <div class="warning">
                <strong>注意:</strong><br>
                • このリンクは60分間有効です<br>
                • パスワードリセットをリクエストしていない場合は、このメールを無視してください<br>
                • セキュリティのため、このリンクは一度しか使用できません
            </div>
            
            <p class="message">
                ボタンがクリックできない場合は、以下のURLをコピーしてブラウザに貼り付けてください：<br>
                <a href="{{ $url }}" style="color: #FF2AA1; word-break: break-all;">{{ $url }}</a>
            </p>
        </div>
        
        <div class="footer">
            <p>このメールは自動送信されています。返信はできません。</p>
            <p>ご不明な点がございましたら、お問い合わせください。</p>
        </div>
    </div>
</body>
</html>
