<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\ProfileController;
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
    Route::get('/myshop/contents', function(){
        return Inertia::render('MyShopManagement/MyContents');
    });
    Route::get('/myshop/transaction', function(){
        return Inertia::render('MyShopManagement/Transaction');
    });
    Route::get('/myshop/saleshistory', function(){
        return Inertia::render('MyShopManagement/SalesHistory');
    });
    Route::get('/myshop/registerproduct', function(){
        return Inertia::render('MyShopManagement/RegisterProduct');
    });    
    Route::get('/myshop/category', function(){
        return Inertia::render('MyShopManagement/Category');
    });
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
        
    Route::get('/shoptop', function(){
        return Inertia::render('ShopTop');
    });
    Route::get('/shop-newproducts', function(){
        return Inertia::render('ShopNewProducts');
    });
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
    });

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
            return redirect()->intended(route('dashboard'));
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('dashboard'));
    })->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard'));
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
    Route::post('/upload-image', [\App\Http\Controllers\ImageUploadController::class, 'upload'])->name('image.upload');
    Route::get('/idol/upload', function () {
        return Inertia::render('Idol/ImageUpload');
    })->middleware('auth');
});

require __DIR__.'/auth.php';
