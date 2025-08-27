<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductBatchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Access\AuthorizationException;

// Route to serve watermarked images directly - MUST BE FIRST
Route::get('/api/watermarked-image/{path}', function($path) {
    Log::info('Watermark route called with path: ' . $path);
    Log::info('Request URL: ' . request()->url());
    Log::info('Request method: ' . request()->method());
    
    // Handle both encoded and unencoded paths
    $decodedPath = urldecode($path);
    Log::info('Decoded path: ' . $decodedPath);
    
    // Also try the original path in case it's already unencoded
    $originalPath = $path;
    
    // Validate the path to prevent directory traversal
    if (str_contains($decodedPath, '..') || !str_starts_with($decodedPath, 'product-batches/')) {
        Log::info('Path validation failed');
        return response('Invalid path: ' . $decodedPath, 404);
    }
    
    try {
        // Check if original file exists - try both decoded and original path
        $finalPath = null;
        if (Storage::disk('public')->exists($decodedPath)) {
            $finalPath = $decodedPath;
            Log::info('Using decoded path: ' . $decodedPath);
        } elseif (Storage::disk('public')->exists($originalPath)) {
            $finalPath = $originalPath;
            Log::info('Using original path: ' . $originalPath);
        } else {
            Log::error('Original image file not found for both paths: ' . $decodedPath . ' and ' . $originalPath);
            return response('Original image not found: ' . $decodedPath, 404);
        }
        
        Log::info('Original image exists, creating watermarked version');
        $watermarkService = app(\App\Services\ImageWatermarkService::class);
        $watermarkedPath = $watermarkService->createWatermarkedImage($finalPath);
        
        Log::info('Watermark service returned path: ' . ($watermarkedPath ?: 'null'));
        
        if ($watermarkedPath && Storage::disk('public')->exists($watermarkedPath)) {
            $fullPath = Storage::disk('public')->path($watermarkedPath);
            
            // Use a simple MIME type detection
            $extension = pathinfo($fullPath, PATHINFO_EXTENSION);
            $mimeType = match($extension) {
                'jpg', 'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'webp' => 'image/webp',
                default => 'image/jpeg'
            };
            
            Log::info('Serving watermarked image: ' . $watermarkedPath);
            return response()->file($fullPath, [
                'Content-Type' => $mimeType,
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);
        } else {
            Log::error('Watermarked image not found: ' . $watermarkedPath);
            return response('Image not found', 404);
        }
    } catch (\Exception $e) {
        Log::error('Error serving watermarked image: ' . $e->getMessage());
        return response('Error: ' . $e->getMessage(), 500);
    }
})->where('path', '.*')->name('watermarked.image');

// Catch-all route for watermarked images with base64 encoded paths
Route::get('/api/watermarked-image-b64/{path}', function($path) {
    Log::info('Base64 watermark route called with path: ' . $path);
    
    // Decode base64 path
    $decodedPath = base64_decode($path);
    Log::info('Base64 decoded path: ' . $decodedPath);
    
    // Validate the path to prevent directory traversal
    if (str_contains($decodedPath, '..') || !str_starts_with($decodedPath, 'product-batches/')) {
        Log::info('Path validation failed');
        return response('Invalid path: ' . $decodedPath, 404);
    }
    
    try {
        // Check if original file exists
        if (!Storage::disk('public')->exists($decodedPath)) {
            Log::error('Original image file not found: ' . $decodedPath);
            return response('Original image not found: ' . $decodedPath, 404);
        }
        
        Log::info('Original image exists, creating watermarked version');
        $watermarkService = app(\App\Services\ImageWatermarkService::class);
        $watermarkedPath = $watermarkService->createWatermarkedImage($decodedPath);
        
        Log::info('Watermark service returned path: ' . ($watermarkedPath ?: 'null'));
        
        if ($watermarkedPath && Storage::disk('public')->exists($watermarkedPath)) {
            $fullPath = Storage::disk('public')->path($watermarkedPath);
            
            // Use a simple MIME type detection
            $extension = pathinfo($fullPath, PATHINFO_EXTENSION);
            $mimeType = match($extension) {
                'jpg', 'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'webp' => 'image/webp',
                default => 'image/jpeg'
            };
            
            Log::info('Serving watermarked image: ' . $watermarkedPath);
            return response()->file($fullPath, [
                'Content-Type' => $mimeType,
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);
        } else {
            Log::error('Watermarked image not found: ' . $watermarkedPath);
            return response('Image not found', 404);
        }
    } catch (\Exception $e) {
        Log::error('Error serving watermarked image: ' . $e->getMessage());
        return response('Error: ' . $e->getMessage(), 500);
    }
})->where('path', '.*')->name('watermarked.image.encoded');



// Test route to check if routing is working
Route::get('/api/test', function() {
    return response('Test route working!');
});

// Simple test route for watermarked images
Route::get('/api/watermark-test', function() {
    return response('Watermark test route working!');
});





Route::get('/', function () {
    return inertia('Home');
})->name('home');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'show']);
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);

    // Logout Route
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    // Password Reset Routes
    Route::get('/forgot-password', function () {
        return Inertia::render('ForgotPassword', [
            'status' => session('status'),
        ]);
    })->name('password.request');

    Route::post('/forgot-password', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('/reset-password/{token}', function (Request $request) {
        return Inertia::render('ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
            'status' => session('status'),
        ]);
    })->name('password.reset');

    Route::post('/reset-password', [App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
        ->name('password.store');

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
        $user = auth()->user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = \App\Models\ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Get current month start and end dates
        $currentMonthStart = \Carbon\Carbon::now()->startOfMonth();
        $currentMonthEnd = \Carbon\Carbon::now()->endOfMonth();
        
        // Get all purchases of the user's products
        $allPurchases = \App\Models\UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->with(['productBatch'])
            ->get();
        
        // Calculate current month statistics
        $currentMonthPurchases = $allPurchases->filter(function($purchase) use ($currentMonthStart, $currentMonthEnd) {
            return $purchase->purchase_time >= $currentMonthStart && $purchase->purchase_time <= $currentMonthEnd;
        });
        
        // Calculate current month sales revenue
        $currentMonthSalesRevenue = $currentMonthPurchases->sum(function($purchase) {
            return $purchase->price * $purchase->cnt;
        });
        
        // Calculate total sales revenue (all time)
        $totalSalesRevenue = $allPurchases->sum(function($purchase) {
            return $purchase->price * $purchase->cnt;
        });
        
        // For initial load, we'll set print counts to 0 and let the API handle the real data
        // This prevents slow page loads due to multiple NWPS API calls
        $currentMonthPrintCount = 0;
        $totalPrintCount = 0;
        
        // Calculate balance (after 15% commission)
        $commissionRate = 0.15; // 15%
        $currentMonthBalance = $currentMonthSalesRevenue * (1 - $commissionRate);
        $totalBalance = $totalSalesRevenue * (1 - $commissionRate);
        
        $statistics = [
            'current_month' => [
                'sales_revenue' => (int)$currentMonthSalesRevenue,
                'print_count' => (int)$currentMonthPrintCount,
                'balance' => (int)$currentMonthBalance,
            ],
            'total' => [
                'sales_revenue' => (int)$totalSalesRevenue,
                'print_count' => (int)$totalPrintCount,
                'balance' => (int)$totalBalance,
            ],
            'commission_rate' => $commissionRate * 100, // 15%
            'payment_threshold' => 5000, // 5000円
        ];
        
        return Inertia::render('MyShopManagement/ShopManagement', [
            'statistics' => $statistics
        ]);
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
    Route::get('/myshop/transaction', [App\Http\Controllers\TransactionController::class, 'index'])->name('myshop.transaction');
    Route::get('/myshop/saleshistory', [App\Http\Controllers\SalesHistoryController::class, 'index'])->name('myshop.saleshistory');
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
    Route::get('/myshop/settransferaccount', [App\Http\Controllers\SetTransferAccountController::class, 'index'])->name('myshop.settransferaccount');
Route::post('/myshop/settransferaccount', [App\Http\Controllers\SetTransferAccountController::class, 'store'])->name('myshop.settransferaccount.store');
    
    Route::get('/notification', [App\Http\Controllers\NotificationController::class, 'index'])->name('notification.index');
    
    // Notification API routes
    Route::get('/api/notifications', [App\Http\Controllers\NotificationController::class, 'getNotifications'])->name('notification.get');
    Route::post('/api/notifications/mark-read', [App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notification.mark-read');
    Route::post('/api/notifications/mark-all-read', [App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notification.mark-all-read');
    Route::delete('/api/notifications/{id}', [App\Http\Controllers\NotificationController::class, 'delete'])->name('notification.delete');
    Route::get('/api/notifications/unread-count', [App\Http\Controllers\NotificationController::class, 'getUnreadCount'])->name('notification.unread-count');

    Route::get('/accountsetting', function(){
        return Inertia::render('AccountSetting');
    });

    Route::get('/favoriteproducts', [App\Http\Controllers\FavoriteProductController::class, 'index'])->name('favoriteproducts.index');

    Route::get('/favoriteshops', [App\Http\Controllers\FavoriteShopController::class, 'index'])->name('favoriteshops.index');
    
    // Favorite shops API routes
    Route::post('/api/favorite-shops', [App\Http\Controllers\FavoriteShopController::class, 'store'])->name('favoriteshops.store');
    Route::delete('/api/favorite-shops', [App\Http\Controllers\FavoriteShopController::class, 'destroy'])->name('favoriteshops.destroy');
    Route::post('/api/favorite-shops/toggle', [App\Http\Controllers\FavoriteShopController::class, 'toggle'])->name('favoriteshops.toggle');
    Route::get('/api/favorite-shops/check', [App\Http\Controllers\FavoriteShopController::class, 'check'])->name('favoriteshops.check');

    // Favorite products API routes
    Route::post('/api/favorite-products/toggle', [App\Http\Controllers\FavoriteProductController::class, 'toggle'])->name('favoriteproducts.toggle');
    Route::get('/api/favorite-products/check', [App\Http\Controllers\FavoriteProductController::class, 'check'])->name('favoriteproducts.check');

    Route::get('/purchasehistory', [App\Http\Controllers\PurchaseHistoryController::class, 'index'])->name('purchase.history');
    Route::get('/api/purchasehistory/{id}', [App\Http\Controllers\PurchaseHistoryController::class, 'show'])->name('purchase.history.show');

    // NWPS API routes
    Route::get('/api/nwps/login-qrcode', [App\Http\Controllers\NWPSController::class, 'getLoginQrCode'])->name('api.nwps.login-qrcode');
    
    // Shop Statistics API routes
    Route::get('/api/shop-statistics', [App\Http\Controllers\ShopStatisticsController::class, 'getShopStatistics'])->name('shop.statistics');


    // Cart routes
    Route::get('/cart', [App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
    Route::post('/api/cart/add', [App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
    Route::put('/api/cart/{cartItem}', [App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
    Route::delete('/api/cart/{cartItem}', [App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/api/cart', [App\Http\Controllers\CartController::class, 'clear'])->name('cart.clear');
        
    Route::get('/shoptop', [App\Http\Controllers\ShopTopController::class, 'index'])->name('shoptop');
    Route::get('/shop-newproducts', [App\Http\Controllers\ShopNewProductsController::class, 'index'])->name('shop.newproducts');

    Route::get('/shop-newcategory/{categoryId}', [App\Http\Controllers\ShopNewCategoryController::class, 'show'])->name('shop.newcategory');
    
    Route::get('/shoplow', function(){
        return Inertia::render('ShopLow');
    });
    
    Route::get('/productdetailsfree', function(){
        return Inertia::render('ProductDetailsFree');
    });

    // Direct expand routes (for viewing own products)
    Route::get('/purchasedproductexpand/{id}', [App\Http\Controllers\ProductBatchController::class, 'showPurchasedExpand'])
        ->name('product.purchased.expand')
        ->where('id', '[0-9]+');

    Route::get('/unpurchasedproductexpand/{id}', [App\Http\Controllers\ProductBatchController::class, 'showUnpurchasedExpand'])
        ->name('product.unpurchased.expand')
        ->where('id', '[0-9]+');

    // User-scoped expand routes (for viewing other users' products)
    Route::get('/user/{user_id}/purchasedproductexpand/{id}', [App\Http\Controllers\ProductBatchController::class, 'showPurchasedExpand'])
        ->name('user.product.purchased.expand')
        ->where(['user_id' => '[0-9]+', 'id' => '[0-9]+']);

    Route::get('/user/{user_id}/unpurchasedproductexpand/{id}', [App\Http\Controllers\ProductBatchController::class, 'showUnpurchasedExpand'])
        ->name('user.product.unpurchased.expand')
        ->where(['user_id' => '[0-9]+', 'id' => '[0-9]+']);

    Route::get('/howtoprint', function(){
        return Inertia::render('HowToPrint');
    });

    // Legal Document Routes
    Route::get('/tokushoho', function(){
        return Inertia::render('Legal/Tokushoho');
    });

    Route::get('/privacy', function(){
        return Inertia::render('Legal/Privacy');
    });

    Route::get('/terms', function(){
        return Inertia::render('Legal/Terms');
    });

    Route::get('/homelogin', [App\Http\Controllers\HomeLoginController::class, 'index'])->name('homelogin');

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

// Email verification routes (for registration - no auth required)
Route::post('/api/send-verification-code', [ProfileController::class, 'sendVerificationCode'])->name('email.send-code');
Route::post('/api/verify-email-code', [ProfileController::class, 'verifyEmailCode'])->name('email.verify-code');

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

// Dashboard sub-routes
Route::get('/dashboard/users', [App\Http\Controllers\DashboardController::class, 'users'])->name('dashboard.users');
Route::get('/dashboard/finance', [App\Http\Controllers\DashboardController::class, 'finance'])->name('dashboard.finance');
Route::get('/dashboard/products', [App\Http\Controllers\DashboardController::class, 'products'])->name('dashboard.products');
Route::get('/dashboard/sales', [App\Http\Controllers\DashboardController::class, 'sales'])->name('dashboard.sales');
Route::get('/dashboard/reports', [App\Http\Controllers\DashboardController::class, 'reports'])->name('dashboard.reports');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Account Settings API Routes
    Route::get('/api/account-settings', [ProfileController::class, 'getAccountSettings'])->name('account.settings.get');
    Route::post('/api/account-settings', [ProfileController::class, 'updateAccountSettings'])->name('account.settings.update');

    // Email verification routes (for account settings - requires auth)
    Route::post('/api/check-email', [ProfileController::class, 'checkEmail'])->name('email.check');
    Route::post('/api/update-email', [ProfileController::class, 'updateEmail'])->name('email.update');
    Route::post('/api/send-verification-code-auth', [ProfileController::class, 'sendVerificationCode'])->name('email.send-code-auth');
    Route::post('/api/verify-email-code-auth', [ProfileController::class, 'verifyEmailCode'])->name('email.verify-code-auth');
    

    
    Route::post('/upload-image', [\App\Http\Controllers\ImageUploadController::class, 'upload'])->name('image.upload');
    Route::get('/idol/upload', function () {
        return Inertia::render('Idol/ImageUpload');
    })->middleware('auth');

    // Product Password Routes
    Route::post('/api/product/verify-password', [App\Http\Controllers\ProductPasswordController::class, 'verify'])->name('product.verify.password');
    Route::post('/api/product/check-password-status', [App\Http\Controllers\ProductPasswordController::class, 'checkStatus'])->name('product.check.password.status');

    // Payment Routes
    Route::get('/payment/checkout/{product}/{cartItem?}', [App\Http\Controllers\PaymentController::class, 'checkout'])->name('payment.checkout');
    Route::get('/payment/complete', [App\Http\Controllers\PaymentController::class, 'complete'])->name('payment.complete');
    Route::post('/stripe/webhook', [App\Http\Controllers\PaymentController::class, 'webhook'])->name('stripe.webhook')->middleware('verify.stripe.signature');

    // Product Batch API Routes
    Route::prefix('api/product-batches')->group(function () {
        Route::post('/', [ProductBatchController::class, 'store'])->name('product-batches.store');
        Route::get('/', [ProductBatchController::class, 'index'])->name('product-batches.index');
        Route::get('/{productBatch}', [ProductBatchController::class, 'show'])->name('product-batches.show');
        Route::match(['PUT', 'PATCH'], '/{productBatch}', [ProductBatchController::class, 'update'])->name('product-batches.update');
        Route::delete('/{productBatch}', [ProductBatchController::class, 'destroy'])->name('product-batches.destroy');
    });


});



// Product routes
Route::middleware(['auth'])->group(function () {
    // Direct product routes (for viewing own products)
    Route::get('/purchasedproduct/{id}', [App\Http\Controllers\ProductBatchController::class, 'showPurchased'])
        ->name('product.purchased')
        ->where('id', '[0-9]+');

    Route::get('/unpurchasedproduct/{id}', [App\Http\Controllers\ProductBatchController::class, 'showUnpurchased'])
        ->name('product.unpurchased')
        ->where('id', '[0-9]+');

    // User-scoped product routes (for viewing other users' products)
    Route::get('/user/{user_id}/purchasedproduct/{id}', [App\Http\Controllers\ProductBatchController::class, 'showPurchased'])
        ->name('user.product.purchased')
        ->where(['user_id' => '[0-9]+', 'id' => '[0-9]+']);

    Route::get('/user/{user_id}/unpurchasedproduct/{id}', [App\Http\Controllers\ProductBatchController::class, 'showUnpurchased'])
        ->name('user.product.unpurchased')
        ->where(['user_id' => '[0-9]+', 'id' => '[0-9]+']);
});







// User shop route - must be at the end to avoid conflicts with other routes
Route::get('/{user_id}', [App\Http\Controllers\ShopTopController::class, 'show'])
    ->name('user.shop')
    ->where('user_id', '[0-9]+');

require __DIR__.'/auth.php';
