<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\UserPurchasedProduct;
use App\Models\ProductBatch;
use App\Models\Withdrawal;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Calculate current balance (total sales - total withdrawals)
        $totalSales = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->sum(DB::raw('price * cnt'));
        
        // Calculate total withdrawals (including pending ones)
        $totalWithdrawals = Withdrawal::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'approved', 'completed'])
            ->sum('amount');
        $currentBalance = $totalSales - $totalWithdrawals;
        
        // Get monthly transaction data for the last 6 months
        $monthlyData = [];
        for ($i = 0; $i < 6; $i++) {
            $date = Carbon::now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();
            
            // Get sales for this month
            $monthlySales = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
                ->whereBetween('purchase_time', [$startOfMonth, $endOfMonth])
                ->get();
            
            $monthlyTotal = $monthlySales->sum(function($sale) {
                return $sale->price * $sale->cnt;
            });
            
            // Get withdrawals for this month
            $monthlyWithdrawals = Withdrawal::where('user_id', $user->id)
                ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->whereIn('status', ['pending', 'approved', 'completed'])
                ->sum('amount');
            
            $monthlyData[] = [
                'month' => $date->format('Y年n月分'),
                'month_key' => $date->format('Y-m'),
                'estimated_month' => $date->copy()->subMonth()->format('Y/n'),
                'final_balance' => $monthlyTotal,
                'sales_amount' => $monthlyTotal,
                'withdrawal_amount' => $monthlyWithdrawals,
                'starting_balance' => 0, // This would be calculated based on previous months
                'transaction_count' => $monthlySales->count(),
                'is_current_month' => $i === 0,
            ];
        }
        
        // Calculate starting balances for each month
        $runningBalance = 0;
        foreach (array_reverse($monthlyData) as &$monthData) {
            $monthData['starting_balance'] = $runningBalance;
            $runningBalance += $monthData['sales_amount'] - $monthData['withdrawal_amount'];
        }
        
        // Get recent transactions (last 10)
        $recentTransactions = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->with(['productBatch', 'user'])
            ->orderBy('purchase_time', 'desc')
            ->limit(10)
            ->get()
            ->map(function($purchase) {
                return [
                    'id' => $purchase->id,
                    'product_title' => $purchase->productBatch->title,
                    'buyer_name' => $purchase->user->name,
                    'amount' => (int)($purchase->price * $purchase->cnt),
                    'quantity' => $purchase->cnt,
                    'purchase_time' => $purchase->purchase_time->format('Y/m/d H:i'),
                    'status' => 'completed',
                ];
            });
        
        return Inertia::render('MyShopManagement/Transaction', [
            'currentBalance' => (int)$currentBalance,
            'monthlyData' => $monthlyData,
            'recentTransactions' => $recentTransactions,
            'paymentThreshold' => 5000, // Minimum amount for payment processing
        ]);
    }

    public function requestWithdrawal(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1000',
        ]);

        $user = Auth::user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Calculate current balance
        $totalSales = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->sum(DB::raw('price * cnt'));
        $totalWithdrawals = Withdrawal::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'approved', 'completed'])
            ->sum('amount');
        $currentBalance = $totalSales - $totalWithdrawals;
        
        if ($request->amount > $currentBalance) {
            return response()->json([
                'success' => false,
                'message' => '出金申請額が残高を超えています。'
            ], 400);
        }
        
        if ($request->amount < 1000) {
            return response()->json([
                'success' => false,
                'message' => '出金申請額は1,000円以上である必要があります。'
            ], 400);
        }
        
        // Create withdrawal record
        Withdrawal::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'status' => 'pending',
            'notes' => '出金申請',
        ]);

        return response()->json([
            'success' => true,
            'message' => '出金申請を受け付けました。処理には3-5営業日かかります。',
            'requested_amount' => $request->amount,
        ]);
    }

    public function getTransactionDetails(Request $request, $monthKey)
    {
        $user = Auth::user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Parse the month key (e.g., "2025-01")
        $date = Carbon::createFromFormat('Y-m', $monthKey);
        $startOfMonth = $date->copy()->startOfMonth();
        $endOfMonth = $date->copy()->endOfMonth();
        
        // Get detailed transactions for this month
        $transactions = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->whereBetween('purchase_time', [$startOfMonth, $endOfMonth])
            ->with(['productBatch', 'user'])
            ->orderBy('purchase_time', 'desc')
            ->get()
            ->map(function($purchase) {
                return [
                    'id' => $purchase->id,
                    'product_title' => $purchase->productBatch->title,
                    'buyer_name' => $purchase->user->name,
                    'buyer_image' => $purchase->user->image,
                    'amount' => (int)($purchase->price * $purchase->cnt),
                    'unit_price' => (int)$purchase->price,
                    'quantity' => $purchase->cnt,
                    'purchase_time' => $purchase->purchase_time->format('Y/m/d H:i'),
                    'status' => 'completed',
                ];
            });
        
        return response()->json([
            'success' => true,
            'month' => $date->format('Y年n月分'),
            'transactions' => $transactions,
            'total_amount' => $transactions->sum('amount'),
            'total_count' => $transactions->count(),
        ]);
    }
}
