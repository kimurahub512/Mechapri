<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Payment;
use App\Models\ProductBatch;
use App\Models\ProductBatchFile;
use App\Models\UserPurchasedProduct;
use App\Models\Withdrawal;
use App\Services\NWPSService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected NWPSService $nwpsService;

    public function __construct(NWPSService $nwpsService)
    {
        $this->nwpsService = $nwpsService;
    }

    public function index()
    {
        $metrics = $this->getDashboardMetrics();
        
        return Inertia::render('Dashboard', [
            'metrics' => $metrics
        ]);
    }

    private function getDashboardMetrics()
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

        // Total counts
        $totalUsers = User::count();
        $totalProducts = ProductBatch::count();
        
        // Use only UserPurchasedProduct for sales data (Payment creates UserPurchasedProduct after success)
        $totalSales = UserPurchasedProduct::count();
        
        // Total revenue from purchases only
        $totalRevenue = UserPurchasedProduct::sum('price');

        // Print count from NWPS API (actual prints, not just files)
        $totalPrintCount = $this->getTotalPrintCountFromNWPS();

        // Monthly counts
        $monthlyUserRegistration = User::where('created_at', '>=', $startOfMonth)->count();
        $monthlyProductRegistration = ProductBatch::where('created_at', '>=', $startOfMonth)->count();
        
        // Monthly sales from purchases only
        $monthlySales = UserPurchasedProduct::where('purchase_time', '>=', $startOfMonth)->count();

        // Monthly revenue from purchases only
        $monthlyRevenue = UserPurchasedProduct::where('purchase_time', '>=', $startOfMonth)->sum('price');

        // Previous month for comparison
        $lastMonthUserRegistration = User::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $lastMonthProductRegistration = ProductBatch::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        
        $lastMonthSales = UserPurchasedProduct::whereBetween('purchase_time', [$startOfLastMonth, $endOfLastMonth])->count();
        
        $lastMonthRevenue = UserPurchasedProduct::whereBetween('purchase_time', [$startOfLastMonth, $endOfLastMonth])->sum('price');

        // Calculate percentage changes
        $userRegistrationChange = $this->calculatePercentageChange($lastMonthUserRegistration, $monthlyUserRegistration);
        $productRegistrationChange = $this->calculatePercentageChange($lastMonthProductRegistration, $monthlyProductRegistration);
        $salesChange = $this->calculatePercentageChange($lastMonthSales, $monthlySales);
        $revenueChange = $this->calculatePercentageChange($lastMonthRevenue, $monthlyRevenue);

        // Additional stats - use created_at for active users since there's no last_login_at field
        $activeUsers = User::where('created_at', '>=', $now->subDays(30))->count();
        $pendingOrders = Payment::where('status', 'pending')->count();
        $completedOrders = UserPurchasedProduct::count();

        // User growth trend (last 6 months)
        $userGrowthTrend = $this->getUserGrowthTrend();

        // Recent activity data
        $recentActivity = $this->getRecentActivity();

        return [
            'totalUsers' => $totalUsers,
            'totalSales' => $totalSales,
            'totalPrintCount' => $totalPrintCount,
            'totalRevenue' => $totalRevenue,
            'monthlyUserRegistration' => $monthlyUserRegistration,
            'monthlySales' => $monthlySales,
            'monthlyProductRegistration' => $monthlyProductRegistration,
            'monthlyRevenue' => $monthlyRevenue,
            'activeUsers' => $activeUsers,
            'pendingOrders' => $pendingOrders,
            'completedOrders' => $completedOrders,
            'changes' => [
                'userRegistration' => $userRegistrationChange,
                'productRegistration' => $productRegistrationChange,
                'sales' => $salesChange,
                'revenue' => $revenueChange,
            ],
            'userGrowthTrend' => $userGrowthTrend,
            'recentActivity' => $recentActivity,
        ];
    }

    /**
     * Get total print count from NWPS API for all purchases
     */
    private function getTotalPrintCountFromNWPS()
    {
        $totalPrintCount = 0;
        
        // Get all purchases that have NWPS file IDs
        $purchases = UserPurchasedProduct::whereNotNull('nwps_file_id')
            ->with(['productBatch'])
            ->get();
        
        foreach ($purchases as $purchase) {
            try {
                // Get NWPS token - try purchase token first, then product token
                $token = $purchase->nwps_token;
                if (!$token) {
                    $token = $purchase->productBatch->nwps_token;
                }
                
                if (!$token) {
                    continue; // Skip if no token available
                }
                
                // Fetch file info from NWPS API
                $fileInfo = $this->nwpsService->getFileInfo($token, $purchase->nwps_file_id);
                
                // Extract printed count from response
                if (isset($fileInfo['status']['printed_count'])) {
                    $totalPrintCount += (int)$fileInfo['status']['printed_count'];
                }
                
            } catch (\Exception $e) {
                // Log error but continue processing other purchases
                \Illuminate\Support\Facades\Log::error('Failed to fetch NWPS print count for dashboard', [
                    'purchase_id' => $purchase->id,
                    'file_id' => $purchase->nwps_file_id,
                    'error' => $e->getMessage()
                ]);
            }
        }
        
        return $totalPrintCount;
    }

    /**
     * Get recent activity data for the dashboard
     */
    private function getRecentActivity()
    {
        $activities = collect();
        $now = Carbon::now();

        // Recent user registrations
        $recentUsers = User::orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        
        foreach ($recentUsers as $user) {
            $timeAgo = $this->getTimeAgo($user->created_at);
            $activities->push([
                'type' => 'user_registration',
                'title' => '新規ユーザー登録',
                'description' => $user->name ? $user->name . ' がプラットフォームに参加しました' : '新規ユーザーがプラットフォームに参加しました',
                'timeAgo' => $timeAgo,
                'icon' => 'user',
                'color' => 'green',
                'timestamp' => $user->created_at
            ]);
        }

        // Recent product registrations
        $recentProducts = ProductBatch::orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        
        foreach ($recentProducts as $product) {
            $timeAgo = $this->getTimeAgo($product->created_at);
            $activities->push([
                'type' => 'product_registration',
                'title' => '新規商品追加',
                'description' => '商品 "' . $product->title . '" が追加されました',
                'timeAgo' => $timeAgo,
                'icon' => 'product',
                'color' => 'purple',
                'timestamp' => $product->created_at
            ]);
        }

        // Recent purchases (only UserPurchasedProduct, not Payment)
        $recentPurchases = UserPurchasedProduct::orderBy('purchase_time', 'desc')
            ->limit(6)
            ->get();
        
        foreach ($recentPurchases as $purchase) {
            $timeAgo = $this->getTimeAgo($purchase->purchase_time);
            $activities->push([
                'type' => 'purchase',
                'title' => '新規注文',
                'description' => '¥' . number_format($purchase->price) . ' の注文が完了しました',
                'timeAgo' => $timeAgo,
                'icon' => 'order',
                'color' => 'blue',
                'timestamp' => $purchase->purchase_time
            ]);
        }

        // Sort all activities by timestamp (most recent first) and take top 6
        return $activities->sortByDesc('timestamp')->take(6)->values();
    }

    /**
     * Get human-readable time ago string
     */
    private function getTimeAgo($timestamp)
    {
        $now = Carbon::now();
        $diff = $now->diff($timestamp);
        
        if ($diff->y > 0) {
            return $diff->y . ' year' . ($diff->y > 1 ? 's' : '') . ' ago';
        } elseif ($diff->m > 0) {
            return $diff->m . ' month' . ($diff->m > 1 ? 's' : '') . ' ago';
        } elseif ($diff->d > 0) {
            return $diff->d . ' day' . ($diff->d > 1 ? 's' : '') . ' ago';
        } elseif ($diff->h > 0) {
            return $diff->h . ' hour' . ($diff->h > 1 ? 's' : '') . ' ago';
        } elseif ($diff->i > 0) {
            return $diff->i . ' minute' . ($diff->i > 1 ? 's' : '') . ' ago';
        } else {
            return 'Just now';
        }
    }

    private function calculatePercentageChange($oldValue, $newValue)
    {
        if ($oldValue == 0) {
            return $newValue > 0 ? 100 : 0;
        }
        
        $change = (($newValue - $oldValue) / $oldValue) * 100;
        return round($change, 1);
    }

    private function getUserGrowthTrend()
    {
        $months = collect();
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();
            
            $userCount = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            
            $months->push([
                'month' => $date->format('M Y'),
                'users' => $userCount,
                'date' => $date->format('Y-m')
            ]);
        }
        
        return $months;
    }

    public function users(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');
        $userType = $request->get('user_type', 'all');

        $query = User::query();

        // Apply search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply user type filter
        if ($userType !== 'all') {
            $query->where('user_type', $userType);
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->through(function ($user) {
                // Calculate total earned (as a seller) - from payments for products sold by this user
                $totalEarned = Payment::where('status', 'succeeded')
                    ->whereHas('productBatch', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    })
                    ->sum('amount');

                // Calculate total spent (as a buyer) - from user's purchases
                $totalSpent = UserPurchasedProduct::where('user_id', $user->id)
                    ->sum('price');

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                    'total_earned' => $totalEarned,
                    'total_spent' => $totalSpent,
                    'registered' => $user->created_at->format('Y-m-d H:i:s'),
                    'email_verified_at' => $user->email_verified_at,
                    'source' => $user->source,
                ];
            });

        return Inertia::render('Dashboard/UserManagement', [
            'users' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem(),
            ],
            'filters' => [
                'search' => $search,
                'user_type' => $userType,
            ]
        ]);
    }

    public function finance()
    {
        // Get all users who have sold products (have successful payments for their products)
        $sellers = User::whereHas('productBatches', function ($query) {
            $query->whereHas('payments', function ($paymentQuery) {
                $paymentQuery->where('status', 'succeeded');
            });
        })->get();
        
        $sellers = $sellers->map(function ($seller) {
            // Calculate total earned from successful payments for products sold by this user
            $totalEarned = Payment::where('status', 'succeeded')
                ->whereHas('productBatch', function ($query) use ($seller) {
                    $query->where('user_id', $seller->id);
                })
                ->sum('amount');

            // Calculate total withdrawn
            $totalWithdrawn = Withdrawal::where('seller_id', $seller->id)
                ->sum('amount');

            // Calculate commission (15%)
            $commission = $totalEarned * 0.15;

            // Calculate remaining balance after commission
            $remainingBalance = $totalEarned - $commission;

            // Calculate available withdrawal (remaining balance minus already withdrawn)
            $availableWithdrawal = $remainingBalance - $totalWithdrawn;

            return [
                'id' => $seller->id,
                'name' => $seller->name,
                'email' => $seller->email,
                'user_type' => $seller->user_type,
                'total_earned' => $totalEarned,
                'commission' => $commission,
                'total_withdrawn' => $totalWithdrawn,
                'remaining_balance' => $remainingBalance,
                'available_withdrawal' => $availableWithdrawal,
                'registered' => $seller->created_at->format('Y-m-d H:i:s'),
            ];
        });

        // Get recent withdrawals
        $recentWithdrawals = Withdrawal::with(['seller', 'manager'])
            ->orderBy('withdrawal_date', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($withdrawal) {
                return [
                    'id' => $withdrawal->id,
                    'seller_name' => $withdrawal->seller->name,
                    'amount' => $withdrawal->amount,
                    'withdrawal_date' => $withdrawal->withdrawal_date->format('Y-m-d'),
                    'notes' => $withdrawal->notes,
                    'manager_name' => $withdrawal->manager->name,
                    'created_at' => $withdrawal->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Dashboard/Finance', [
            'sellers' => $sellers,
            'recentWithdrawals' => $recentWithdrawals,
        ]);
    }

    /**
     * Create a new withdrawal record
     */
    public function createWithdrawal(Request $request)
    {
        $request->validate([
            'seller_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0.01',
            'withdrawal_date' => 'required|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Verify the user has sold products (has successful payments for their products)
        $user = User::findOrFail($request->seller_id);
        $hasSoldProducts = Payment::where('status', 'succeeded')
            ->whereHas('productBatch', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->exists();

        if (!$hasSoldProducts) {
            return redirect()->back()->with('error', '指定されたユーザーは商品を販売していません。');
        }

        // Calculate user's total earnings, commission, and current withdrawals
        $totalEarned = Payment::where('status', 'succeeded')
            ->whereHas('productBatch', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->sum('amount');

        $commission = $totalEarned * 0.15; // 15% commission
        $remainingBalance = $totalEarned - $commission;

        $totalWithdrawn = Withdrawal::where('seller_id', $user->id)
            ->sum('amount');

        $availableWithdrawal = $remainingBalance - $totalWithdrawn;

        // Check if withdrawal amount is valid
        if ($request->amount > $availableWithdrawal) {
            return redirect()->back()->with('error', '引き出し金額が利用可能残高を超えています。利用可能残高: ¥' . number_format($availableWithdrawal));
        }

        // Create the withdrawal record
        Withdrawal::create([
            'seller_id' => $request->seller_id,
            'amount' => $request->amount,
            'withdrawal_date' => $request->withdrawal_date,
            'notes' => $request->notes,
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', '引き出し記録が正常に作成されました。');
    }

    /**
     * Get withdrawal history for a specific seller
     */
    public function getSellerWithdrawals($sellerId)
    {
        $user = User::findOrFail($sellerId);
        
        // Check if user has sold products
        $hasSoldProducts = Payment::where('status', 'succeeded')
            ->whereHas('productBatch', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->exists();
        
        if (!$hasSoldProducts) {
            return response()->json(['error' => '指定されたユーザーは商品を販売していません。'], 400);
        }

        $withdrawals = Withdrawal::where('seller_id', $sellerId)
            ->with(['manager'])
            ->orderBy('withdrawal_date', 'desc')
            ->get()
            ->map(function ($withdrawal) {
                return [
                    'id' => $withdrawal->id,
                    'amount' => $withdrawal->amount,
                    'withdrawal_date' => $withdrawal->withdrawal_date->format('Y-m-d'),
                    'notes' => $withdrawal->notes,
                    'manager_name' => $withdrawal->manager->name,
                    'created_at' => $withdrawal->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->json($withdrawals);
    }

    public function products()
    {
        return Inertia::render('Dashboard/Products');
    }

    public function sales()
    {
        return Inertia::render('Dashboard/Sales');
    }

    public function reports()
    {
        return Inertia::render('Dashboard/Reports');
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
            'user_type' => 'required|in:admin,buyer,seller',
        ]);

        $user->update([
            'email' => $request->email,
            'user_type' => $request->user_type,
        ]);

        return redirect()->back()->with('success', 'ユーザーが正常に更新されました');
    }

    public function deleteUser(User $user)
    {
        // Prevent deleting the current user
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', '自分のアカウントは削除できません。');
        }

        // Delete the user
        $user->delete();

        return redirect()->back()->with('success', 'ユーザーが正常に削除されました');
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'nullable|string|max:255',
            'user_type' => 'required|in:admin,buyer,seller',
        ]);

        // Generate default name if not provided
        $name = $request->name;
        if (!$name) {
            // Get the next user ID to create a unique default name
            $nextId = User::max('id') + 1;
            $name = 'mechapri' . $nextId;
        }

        // Create the user
        $user = User::create([
            'name' => $name,
            'email' => $request->email,
            'user_type' => $request->user_type,
            'password' => bcrypt(Str::random(16)), // Generate random password
            'source' => 'web',
        ]);

        return redirect()->back()->with('success', 'ユーザーが正常に作成されました');
    }
}
