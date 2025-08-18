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

// Email verification routes (for registration - no auth required)
Route::post('/api/send-verification-code', [ProfileController::class, 'sendVerificationCode'])->name('email.send-code');
Route::post('/api/verify-email-code', [ProfileController::class, 'verifyEmailCode'])->name('email.verify-code');

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
    Route::get('/payment/checkout/{product}', [App\Http\Controllers\PaymentController::class, 'checkout'])->name('payment.checkout');
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
