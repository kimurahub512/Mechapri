<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPurchasedProduct;
use App\Models\ProductBatch;
use App\Services\NWPSService;
use Carbon\Carbon;

class ShopStatisticsController extends Controller
{
    protected NWPSService $nwpsService;

    public function __construct(NWPSService $nwpsService)
    {
        $this->nwpsService = $nwpsService;
    }

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
        
        // Calculate total sales revenue (all time)
        $totalSalesRevenue = $allPurchases->sum(function($purchase) {
            return $purchase->price * $purchase->cnt;
        });
        
        // Fetch print counts from NWPS API
        $currentMonthPrintCount = $this->getPrintCountFromNWPS($currentMonthPurchases);
        $totalPrintCount = $this->getPrintCountFromNWPS($allPurchases);
        
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

    /**
     * Get print count from NWPS API for a collection of purchases
     */
    private function getPrintCountFromNWPS($purchases)
    {
        $totalPrintCount = 0;
        
        foreach ($purchases as $purchase) {
            // Skip if no NWPS file ID
            if (!$purchase->nwps_file_id) {
                continue;
            }
            
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
                \Illuminate\Support\Facades\Log::error('Failed to fetch NWPS print count', [
                    'purchase_id' => $purchase->id,
                    'file_id' => $purchase->nwps_file_id,
                    'error' => $e->getMessage()
                ]);
            }
        }
        
        return $totalPrintCount;
    }
}
