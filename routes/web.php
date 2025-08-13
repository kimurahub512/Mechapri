<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductBatchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return inertia('Home');
})->name('home');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'show']);
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);

    // Social Authentication Routes
    Route::get('/login/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/login/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
    Route::get('/login/line', [SocialAuthController::class, 'redirectToLine'])->name('auth.line');
    Route::get('/login/line/callback', [SocialAuthController::class, 'handleLineCallback'])->name('auth.line.callback');
});

// Email Verification Routes
Route::middleware('auth')->group(function () {

    Route::get('/beginner', function(){
        return Inertia::render('Beginner');
    });
    
    Route::get('/shop-management', function(){
        return Inertia::render('MyShopManagement/ShopManagement');
    });
    Route::get('/myshop/edit', [App\Http\Controllers\ShopController::class, 'edit'])->name('shop.edit');
    Route::post('/myshop/update', [App\Http\Controllers\ShopController::class, 'update'])->name('shop.update');
    Route::get('/myshop/contents', [App\Http\Controllers\MyContentsController::class, 'index'])->name('myshop.contents');
Route::delete('/myshop/contents/{id}', [App\Http\Controllers\MyContentsController::class, 'destroy']);
Route::patch('/myshop/contents/{id}/toggle-public', [App\Http\Controllers\MyContentsController::class, 'togglePublic']);

// Category routes
Route::get('/myshop/category', [App\Http\Controllers\CategoryController::class, 'index'])->name('myshop.category');
Route::get('/myshop/category/create', [App\Http\Controllers\CategoryController::class, 'create'])->name('myshop.category.create');
Route::get('/myshop/category/{category}/edit', [App\Http\Controllers\CategoryController::class, 'edit'])->name('myshop.category.edit');
Route::post('/myshop/category', [App\Http\Controllers\CategoryController::class, 'store'])->name('myshop.category.store');
Route::put('/myshop/category/{category}', [App\Http\Controllers\CategoryController::class, 'update'])->name('myshop.category.update');
Route::delete('/myshop/category/{category}', [App\Http\Controllers\CategoryController::class, 'destroy'])->name('myshop.category.destroy');
Route::patch('/myshop/category/{category}/toggle-public', [App\Http\Controllers\CategoryController::class, 'togglePublic'])->name('myshop.category.toggle-public');
Route::post('/myshop/category/reorder', [App\Http\Controllers\CategoryController::class, 'reorder'])->name('myshop.category.reorder');
    Route::get('/myshop/transaction', function(){
        return Inertia::render('MyShopManagement/Transaction');
    });
    Route::get('/myshop/saleshistory', function(){
        return Inertia::render('MyShopManagement/SalesHistory');
    });
    Route::get('/myshop/registerproduct', function(){
        $user = auth()->user();
        $categories = $user->categories()->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('MyShopManagement/RegisterProduct', [
            'categories' => $categories,
        ]);
    });
    Route::get('/myshop/registerproduct/{id}/edit', [App\Http\Controllers\MyContentsController::class, 'edit']);    

    Route::get('/myshop/categoryedit', function(){  
        return Inertia::render('MyShopManagement/CategoryEdit');
    });
    Route::get('/myshop/settransferaccount', function(){
        return Inertia::render('MyShopManagement/SetTransferAccount');
    });
    
    Route::get('/notification', function(){
        return Inertia::render('Notification');
    });

    Route::get('/accountsetting', function(){
        return Inertia::render('AccountSetting');
    });

    Route::get('/favoriteproducts', function(){
        return Inertia::render('FavoriteProducts');
    });

    Route::get('/favoriteshops', function(){
        return Inertia::render('FavoriteShops');
    });

    Route::get('/purchasehistory', function(){
        return Inertia::render('PurchaseHistory');
    });

    Route::get('/cart', function(){
        return Inertia::render('Cart');
    });
        
    Route::get('/shoptop', [App\Http\Controllers\ShopTopController::class, 'index'])->name('shoptop');
    Route::get('/shop-newproducts', [App\Http\Controllers\ShopNewProductsController::class, 'index'])->name('shop.newproducts');

    Route::get('/shop-newcategory/{categoryId}', [App\Http\Controllers\ShopNewCategoryController::class, 'show'])->name('shop.newcategory');
    
    Route::get('/shoplow', function(){
        return Inertia::render('ShopLow');
    });
    
    Route::get('/productdetailsfree', function(){
        return Inertia::render('ProductDetailsFree');
    });

    Route::get('/purchasedproduct', function(){
        return Inertia::render('PurchasedProduct');
    });

    Route::get('/unpurchasedproduct', function(){
        return Inertia::render('UnpurchasedProduct');
    });

    Route::get('/unpurchasedproductexpand', function(){
        return Inertia::render('UnpurchasedProductExpand');
    });

    Route::get('/howtoprint', function(){
        return Inertia::render('HowToPrint');
    });

    Route::get('/homelogin', function(){
        return Inertia::render('HomeLogin');
    })->name('homelogin');

    Route::get('/verify-email', function () {
        return Inertia::render('Auth/VerifyEmail');
    })->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', function (Request $request) {
        if (!hash_equals((string) $request->route('id'), (string) $request->user()->getKey())) {
            throw new AuthorizationException;
        }

        if (!hash_equals((string) $request->route('hash'), sha1($request->user()->getEmailForVerification()))) {
            throw new AuthorizationException;
        }

        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('homelogin'));
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('homelogin'));
    })->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('homelogin'));
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    })->middleware('throttle:6,1')->name('verification.send');
});

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Account Settings API Routes
    Route::get('/api/account-settings', [ProfileController::class, 'getAccountSettings'])->name('account.settings.get');
    Route::post('/api/account-settings', [ProfileController::class, 'updateAccountSettings'])->name('account.settings.update');

    // Email verification routes
    Route::post('/api/check-email', [ProfileController::class, 'checkEmail'])->name('email.check');
    Route::post('/api/update-email', [ProfileController::class, 'updateEmail'])->name('email.update');
    Route::post('/api/send-verification-code', [ProfileController::class, 'sendVerificationCode'])->name('email.send-code');
    Route::post('/api/verify-email-code', [ProfileController::class, 'verifyEmailCode'])->name('email.verify-code');
    
    // Test email route (remove in production)
    Route::get('/test-email', function() {
        try {
            Mail::raw('Test email from Laravel', function($message) {
                $message->to('test@example.com')->subject('Test Email');
            });
            return 'Email sent successfully!';
        } catch (\Exception $e) {
            return 'Email failed: ' . $e->getMessage();
        }
    });
    
    // Test email with log driver (for debugging)
    Route::get('/test-email-log', function() {
        try {
            // Temporarily use log driver
            config(['mail.default' => 'log']);
            
            Mail::raw('Test email from Laravel (log driver)', function($message) {
                $message->to('test@example.com')->subject('Test Email - Log Driver');
            });
            
            return 'Email logged successfully! Check storage/logs/laravel.log';
        } catch (\Exception $e) {
            return 'Email failed: ' . $e->getMessage();
        }
    });
    
    // Test AWS SES API
    Route::get('/test-aws-ses', function() {
        try {
            $sesService = new \App\Services\AwsSesMailService();
            $htmlBody = '<h1>Test Email</h1><p>This is a test email from AWS SES API.</p>';
            $textBody = 'Test Email - This is a test email from AWS SES API.';
            
            $result = $sesService->send('test@example.com', 'Test AWS SES', $htmlBody, $textBody);
            
            return 'AWS SES email sent successfully! Message ID: ' . $result['MessageId'];
        } catch (\Exception $e) {
            return 'AWS SES failed: ' . $e->getMessage();
        }
    });
    
    Route::post('/upload-image', [\App\Http\Controllers\ImageUploadController::class, 'upload'])->name('image.upload');
    Route::get('/idol/upload', function () {
        return Inertia::render('Idol/ImageUpload');
    })->middleware('auth');

    // Product Batch API Routes
    Route::prefix('api/product-batches')->group(function () {
        Route::post('/', [ProductBatchController::class, 'store'])->name('product-batches.store');
        Route::get('/', [ProductBatchController::class, 'index'])->name('product-batches.index');
        Route::get('/{productBatch}', [ProductBatchController::class, 'show'])->name('product-batches.show');
        Route::match(['PUT', 'PATCH'], '/{productBatch}', [ProductBatchController::class, 'update'])->name('product-batches.update');
        Route::delete('/{productBatch}', [ProductBatchController::class, 'destroy'])->name('product-batches.destroy');
    });

    // Test route for debugging
    Route::get('/api/test-auth', function () {
        return response()->json([
            'authenticated' => auth()->check(),
            'user_id' => auth()->id(),
            'user' => auth()->user() ? auth()->user()->only(['id', 'name', 'email']) : null,
        ]);
    })->name('test.auth');
});

// Test AWS WorkMail connection
Route::get('/test-workmail-connection', function () {
    try {
        $host = 'smtp.mail.us-east-1.awsapps.com';
        $port = 465;
        
        echo "Testing connection to $host:$port...\n";
        
        // Test 1: Check if host is reachable
        echo "Testing DNS resolution...\n";
        $ip = gethostbyname($host);
        if ($ip === $host) {
            echo "DNS resolution failed for $host\n";
            return response()->json(['error' => "DNS resolution failed for $host"]);
        }
        echo "DNS resolution successful: $host -> $ip\n";
        
        // Test 2: Try different connection methods
        echo "Testing connection methods...\n";
        
        // Method 1: Basic socket with longer timeout
        echo "Method 1: Basic socket connection...\n";
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
                'timeout' => 30
            ]
        ]);
        
        $socket = @stream_socket_client(
            "ssl://$host:$port",
            $errno,
            $errstr,
            30,
            STREAM_CLIENT_CONNECT,
            $context
        );
        
        if (!$socket) {
            echo "Method 1 failed: $errstr ($errno)\n";
            
            // Method 2: Try without SSL first
            echo "Method 2: Trying without SSL...\n";
            $socket = @fsockopen($host, $port, $errno, $errstr, 10);
            if (!$socket) {
                echo "Method 2 failed: $errstr ($errno)\n";
                
                // Method 3: Try different port (587 for TLS)
                echo "Method 3: Trying port 587 with TLS...\n";
                $socket = @fsockopen($host, 587, $errno, $errstr, 10);
                if (!$socket) {
                    echo "Method 3 failed: $errstr ($errno)\n";
                    return response()->json(['error' => "All connection methods failed. Last error: $errstr ($errno)"]);
                } else {
                    echo "Method 3 successful (port 587)\n";
                }
            } else {
                echo "Method 2 successful (no SSL)\n";
            }
        } else {
            echo "Method 1 successful (SSL)\n";
        }
        
        // Test SMTP handshake
        $response = fgets($socket, 515);
        echo "SMTP Response: " . trim($response) . "\n";
        
        // Send EHLO
        fwrite($socket, "EHLO localhost\r\n");
        $response = fgets($socket, 515);
        echo "EHLO Response: " . trim($response) . "\n";
        
        fclose($socket);
        
        return response()->json([
            'success' => true,
            'message' => 'Connection test completed successfully',
            'details' => [
                'host' => $host,
                'port' => $port,
                'ip' => $ip
            ]
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
    }
});

// Test actual email sending with connection reset
Route::get('/test-workmail-send', function () {
    try {
        $email = 'test@example.com'; // Change this to a real email for testing
        $code = '123456';
        
        echo "Sending test email to $email...\n";
        
        // Force new connection by clearing any existing connections
        Mail::purge('smtp');
        
        // Send email
        Mail::to($email)->send(new \App\Mail\VerificationCodeMail($code));
        
        return response()->json([
            'success' => true,
            'message' => 'Test email sent successfully'
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
    }
});

// Test basic network connectivity
Route::get('/test-ping', function () {
    $host = 'smtp.mail.us-east-1.awsapps.com';
    
    echo "Testing basic connectivity to $host...\n";
    
    // Test 1: DNS resolution
    $ip = gethostbyname($host);
    echo "DNS Resolution: $host -> $ip\n";
    
    // Test 2: Ping (if available)
    if (function_exists('exec')) {
        $output = [];
        $return_var = 0;
        exec("ping -n 1 $host", $output, $return_var);
        echo "Ping result: " . implode("\n", $output) . "\n";
        echo "Ping return code: $return_var\n";
    }
    
    // Test 3: Port scan
    $ports = [465, 587, 25];
    foreach ($ports as $port) {
        $connection = @fsockopen($host, $port, $errno, $errstr, 5);
        if ($connection) {
            echo "Port $port: OPEN\n";
            fclose($connection);
        } else {
            echo "Port $port: CLOSED ($errstr)\n";
        }
    }
    
    return response()->json([
        'host' => $host,
        'ip' => $ip,
        'message' => 'Basic connectivity test completed'
    ]);
});

// Test different mail configurations
Route::get('/test-mail-configs', function () {
    $email = 'test@example.com'; // Change this to a real email
    $code = '123456';
    
    $configs = [
        'config1' => [
            'host' => 'smtp.mail.us-east-1.awsapps.com',
            'port' => 465,
            'encryption' => 'ssl',
            'timeout' => 30
        ],
        'config2' => [
            'host' => 'smtp.mail.us-east-1.awsapps.com',
            'port' => 587,
            'encryption' => 'tls',
            'timeout' => 30
        ],
        'config3' => [
            'host' => 'smtp.mail.us-east-1.awsapps.com',
            'port' => 465,
            'encryption' => 'ssl',
            'timeout' => 60
        ]
    ];
    
    foreach ($configs as $name => $config) {
        echo "Testing $name...\n";
        echo "Host: {$config['host']}, Port: {$config['port']}, Encryption: {$config['encryption']}\n";
        
        try {
            // Temporarily set mail config
            config([
                'mail.mailers.smtp.host' => $config['host'],
                'mail.mailers.smtp.port' => $config['port'],
                'mail.mailers.smtp.encryption' => $config['encryption'],
                'mail.mailers.smtp.timeout' => $config['timeout']
            ]);
            
            // Clear any existing connections
            Mail::purge('smtp');
            
            // Try to send email
            Mail::to($email)->send(new \App\Mail\VerificationCodeMail($code));
            
            echo "$name: SUCCESS\n";
            return response()->json([
                'success' => true,
                'working_config' => $name,
                'config' => $config
            ]);
            
        } catch (\Exception $e) {
            echo "$name: FAILED - " . $e->getMessage() . "\n";
        }
    }
    
    return response()->json([
        'success' => false,
        'message' => 'All configurations failed'
    ]);
});

require __DIR__.'/auth.php';
