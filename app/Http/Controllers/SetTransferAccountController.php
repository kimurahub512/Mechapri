<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\BankAccount;

class SetTransferAccountController extends Controller
{
    /**
     * Display the set transfer account form.
     */
    public function index()
    {
        $user = Auth::user();
        $bankAccount = $user->bankAccount()->first();

        return Inertia::render('MyShopManagement/SetTransferAccount', [
            'bankAccount' => $bankAccount,
        ]);
    }

    /**
     * Store or update the bank account information.
     */
    public function store(Request $request)
    {
        $request->validate([
            'bank_name' => 'required|string|max:255',
            'account_type' => 'required|in:普通,当座',
            'branch_code' => 'required|string|max:255',
            'account_number' => 'required|string|max:255',
            'account_holder_sei' => 'required|string|max:255',
            'account_holder_mei' => 'required|string|max:255',
        ]);

        $user = Auth::user();
        
        // Update existing bank account or create new one
        $bankAccount = $user->bankAccount()->first();
        
        if ($bankAccount) {
            $bankAccount->update($request->all());
        } else {
            $user->bankAccount()->create($request->all());
        }

        return redirect()->back()->with('success', '振込先口座情報が正常に保存されました。');
    }
}
