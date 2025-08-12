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
    Route::get('/shop-newproducts', function(){
        // Get all public product batches with files, ordered by creation date (newest first)
        $productBatches = \App\Models\ProductBatch::with(['files' => function($query) {
                $query->orderBy('sort_order');
            }])
            ->where('is_public', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($batch) {
                // Calculate time duration from registration
                $createdAt = \Carbon\Carbon::parse($batch->created_at)->startOfDay();
                $now = \Carbon\Carbon::now()->startOfDay();
                $totalDays = $createdAt->diffInDays($now);

                // Format the time duration
                $badge1 = '';
                $badge2 = '以内';

                if ($totalDays >= 365) {
                    $badge1 = (int)($totalDays / 365) . '年';
                } elseif ($totalDays >= 30) {
                    $badge1 = (int)($totalDays / 30) . 'ヶ月';
                } else {
                    $badge1 = $totalDays . '日';
                }

                return [
                    'id' => $batch->id,
                    'title' => $batch->title,
                    'description' => $batch->description,
                    'price' => $batch->price,
                    'image_cnt' => $batch->image_cnt,
                    'display_mode' => $batch->display_mode,
                    'sales_deadline' => $batch->sales_deadline ? $batch->sales_deadline->format('Y-m-d') : null,
                    'sales_limit' => $batch->sales_limit,
                    'created_at' => $batch->created_at->format('Y-m-d H:i:s'),
                    'badge1' => $badge1,
                    'badge2' => $badge2,
                    'user' => [
                        'id' => $batch->user->id,
                        'name' => $batch->user->name,
                        'image' => $batch->user->image,
                        'shop_title' => $batch->user->shop_title,
                    ],
                    'files' => $batch->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'filename' => $file->filename,
                            'url' => $file->url,
                            'file_type' => $file->file_type,
                            'sort_order' => $file->sort_order,
                        ];
                    }),
                ];
            });

        return Inertia::render('ShopNewProducts', [
            'productBatches' => $productBatches,
        ]);
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

require __DIR__.'/auth.php';
