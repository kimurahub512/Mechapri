<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPurchasedProduct;
use App\Models\ProductBatch;
use Carbon\Carbon;

class ShopStatisticsController extends Controller
{
    public function getShopStatistics()
    {
        $user = Auth::user();
        
        // Get all product batches created by the current user
        $userProductBatchIds = ProductBatch::where('user_id', $user->id)->pluck('id');
        
        // Get current month start and end dates
        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();
        
        // Get all purchases of the user's products
        $allPurchases = UserPurchasedProduct::whereIn('batch_id', $userProductBatchIds)
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
        
        // Calculate current month print count (total quantity sold)
        $currentMonthPrintCount = $currentMonthPurchases->sum('cnt');
        
        // Calculate total sales revenue (all time)
        $totalSalesRevenue = $allPurchases->sum(function($purchase) {
            return $purchase->price * $purchase->cnt;
        });
        
        // Calculate total print count (all time)
        $totalPrintCount = $allPurchases->sum('cnt');
        
        // Calculate balance (after 15% commission)
        $commissionRate = 0.15; // 15%
        $currentMonthBalance = $currentMonthSalesRevenue * (1 - $commissionRate);
        $totalBalance = $totalSalesRevenue * (1 - $commissionRate);
        
        return response()->json([
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
        ]);
    }
}
