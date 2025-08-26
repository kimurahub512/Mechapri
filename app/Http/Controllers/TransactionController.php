<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\UserPurchasedProduct;
use App\Models\ProductBatch;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Get all purchases of the user's products
        $allPurchases = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
            ->with(['productBatch'])
            ->get();
        
        // Calculate current balance (after 15% commission)
        $commissionRate = 0.15; // 15%
        $totalSalesRevenue = $allPurchases->sum(function($purchase) {
            return $purchase->price * $purchase->cnt;
        });
        $currentBalance = $totalSalesRevenue * (1 - $commissionRate);
        
        // Get monthly transaction data for the last 6 months
        $monthlyData = [];
        for ($i = 0; $i < 6; $i++) {
            $monthStart = Carbon::now()->subMonths($i)->startOfMonth();
            $monthEnd = Carbon::now()->subMonths($i)->endOfMonth();
            $monthName = $monthStart->format('Y年n月分');
            $estimateDate = $monthStart->copy()->subMonth()->format('Y/m');
            
            // Get purchases for this month
            $monthPurchases = $allPurchases->filter(function($purchase) use ($monthStart, $monthEnd) {
                return $purchase->purchase_time >= $monthStart && $purchase->purchase_time <= $monthEnd;
            });
            
            // Calculate monthly statistics
            $monthlySalesRevenue = $monthPurchases->sum(function($purchase) {
                return $purchase->price * $purchase->cnt;
            });
            
            $monthlyCommission = $monthlySalesRevenue * $commissionRate;
            $monthlyWithdrawal = 0; // For now, no withdrawal system implemented
            $monthlyBalance = $monthlySalesRevenue - $monthlyCommission - $monthlyWithdrawal;
            
            // Calculate starting balance (this would be the ending balance of previous month)
            $startingBalance = 0; // For now, simplified calculation - in a real system this would be cumulative
            
            $monthlyData[] = [
                'month' => $monthName,
                'estimate_date' => $estimateDate,
                'final_balance' => (int)$monthlyBalance,
                'sales_revenue' => (int)$monthlySalesRevenue,
                'commission' => (int)$monthlyCommission,
                'withdrawal' => (int)$monthlyWithdrawal,
                'starting_balance' => (int)$startingBalance,
            ];
        }
        
        // Bank account information (mock data for now)
        $bankAccount = [
            'account_type' => '普通',
            'account_number' => '****84',
            'bank_name' => 'ｵｰﾊﾞｰｴｯｸｽ(ｶ',
        ];
        
        return Inertia::render('MyShopManagement/Transaction', [
            'currentBalance' => (int)$currentBalance,
            'monthlyData' => $monthlyData,
            'bankAccount' => $bankAccount,
            'paymentThreshold' => 5000, // 5000円
        ]);
    }
}
