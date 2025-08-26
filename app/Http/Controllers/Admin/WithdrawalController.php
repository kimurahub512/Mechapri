<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function index()
    {
        $withdrawals = Withdrawal::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($withdrawal) {
                return [
                    'id' => $withdrawal->id,
                    'user_name' => $withdrawal->user->name,
                    'user_email' => $withdrawal->user->email,
                    'amount' => (int)$withdrawal->amount,
                    'status' => $withdrawal->status,
                    'notes' => $withdrawal->notes,
                    'created_at' => $withdrawal->created_at->format('Y/m/d H:i'),
                    'processed_at' => $withdrawal->processed_at ? $withdrawal->processed_at->format('Y/m/d H:i') : null,
                ];
            });

        return Inertia::render('Admin/Withdrawals', [
            'withdrawals' => $withdrawals
        ]);
    }

    public function updateStatus(Request $request, Withdrawal $withdrawal)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected,completed',
            'notes' => 'nullable|string',
        ]);

        $withdrawal->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'processed_at' => $request->status !== 'pending' ? now() : null,
        ]);

        return response()->json([
            'success' => true,
            'message' => '出金申請のステータスを更新しました。',
        ]);
    }
}
