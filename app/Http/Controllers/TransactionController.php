<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\UserPurchasedProduct;
use App\Models\ProductBatch;
use App\Models\Payment;
use App\Models\Withdrawal;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Calculate total earned from successful payments for products sold by this user
        $totalEarned = Payment::where('status', 'succeeded')
            ->whereHas('productBatch', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->sum('amount');
        
        // Calculate total withdrawn
        $totalWithdrawn = Withdrawal::where('seller_id', $user->id)
            ->sum('amount');
        
        // Calculate commission (15%)
        $commission = $totalEarned * 0.15;
        
        // Calculate remaining balance after commission
        $remainingBalance = $totalEarned - $commission;
        
        // Calculate current balance (remaining balance minus already withdrawn)
        $currentBalance = $remainingBalance - $totalWithdrawn;
        
        // Get monthly transaction data starting from the user's registration month (up to last 12 months)
        $monthlyData = [];
        $registrationMonthStart = Carbon::parse($user->created_at)->startOfMonth();
        for ($i = 0; $i < 12; $i++) {
            $monthStart = Carbon::now()->subMonths($i)->startOfMonth();
            $monthEnd = Carbon::now()->subMonths($i)->endOfMonth();
            // Skip months before the user registration month
            if ($monthEnd->lt($registrationMonthStart)) {
                continue;
            }
            $monthName = $monthStart->format('Y年n月分');
            $estimateDate = $monthStart->copy()->subMonth()->format('Y/m');
            
            // Get payments for this month
            $monthPayments = Payment::where('status', 'succeeded')
                ->whereHas('productBatch', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->whereBetween('paid_at', [$monthStart->copy(), $monthEnd->copy()])
                ->get();
            
            // Calculate monthly statistics
            $monthlySalesRevenue = $monthPayments->sum('amount');
            $monthlyCommission = $monthlySalesRevenue * 0.15;
            
            // Get withdrawals for this month
            $monthlyWithdrawal = Withdrawal::where('seller_id', $user->id)
                ->whereBetween('withdrawal_date', [$monthStart->copy(), $monthEnd->copy()])
                ->sum('amount');
            
            // Calculate monthly balance
            $monthlyBalance = $monthlySalesRevenue - $monthlyCommission - $monthlyWithdrawal;
            
            // Calculate starting balance (this would be the ending balance of previous month)
            // For now, we'll calculate it as cumulative up to the previous month
            $previousMonthEnd = $monthStart->copy()->subDay();
            $previousPayments = Payment::where('status', 'succeeded')
                ->whereHas('productBatch', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->whereBetween('paid_at', [$registrationMonthStart, $previousMonthEnd])
                ->sum('amount');
            
            $previousCommission = $previousPayments * 0.15;
            $previousWithdrawals = Withdrawal::where('seller_id', $user->id)
                ->whereBetween('withdrawal_date', [$registrationMonthStart, $previousMonthEnd])
                ->sum('amount');
            
            $startingBalance = $previousPayments - $previousCommission - $previousWithdrawals;
            
            $monthlyData[] = [
                'month' => $monthName,
                'estimate_date' => $estimateDate,
                'final_balance' => (int)($startingBalance + $monthlyBalance),
                'sales_revenue' => (int)$monthlySalesRevenue,
                'commission' => (int)$monthlyCommission,
                'withdrawal' => (int)$monthlyWithdrawal,
                'starting_balance' => (int)$startingBalance,
                'previous_month_end_balance' => (int)$startingBalance, // 前月末最終残高
            ];
        }
        
        // Get bank account information
        $bankAccount = $user->bankAccount()->first();
        
        if (!$bankAccount) {
            $bankAccount = [
                'account_type' => '',
                'account_number' => '未設定',
                'bank_name' => '',
                'account_holder_sei' => '',
                'account_holder_mei' => '',
            ];
        } else {
            // Ensure all fields are available
            $bankAccount = [
                'account_type' => $bankAccount->account_type ?? '',
                'account_number' => $bankAccount->account_number ?? '未設定',
                'bank_name' => $bankAccount->bank_name ?? '',
                'account_holder_sei' => $bankAccount->account_holder_sei ?? '',
                'account_holder_mei' => $bankAccount->account_holder_mei ?? '',
            ];
        }
        
        return Inertia::render('MyShopManagement/Transaction', [
            'currentBalance' => (int)$currentBalance,
            'monthlyData' => $monthlyData,
            'bankAccount' => $bankAccount,
            'paymentThreshold' => 5000, // 5000円
        ]);
    }
}
