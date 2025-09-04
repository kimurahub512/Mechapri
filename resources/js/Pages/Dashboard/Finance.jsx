import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Finance() {
    const { sellers = [], recentWithdrawals = [], errors, success, error } = usePage().props;
    
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [withdrawalForm, setWithdrawalForm] = useState({
        seller_id: '',
        amount: '',
        withdrawal_date: new Date().toISOString().split('T')[0],
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setWithdrawalForm({ ...withdrawalForm, amount: value });
        
        // Clear amount validation error when user starts typing
        if (validationErrors.amount) {
            setValidationErrors({ ...validationErrors, amount: null });
        }
        
        // Real-time validation feedback
        if (value && parseFloat(value) > selectedSeller?.available_withdrawal) {
            setValidationErrors({ 
                ...validationErrors, 
                amount: `利用可能残高（¥${formatCurrency(selectedSeller?.available_withdrawal || 0)}）を超えています` 
            });
        } else if (value && parseFloat(value) <= selectedSeller?.available_withdrawal) {
            // Clear validation error when value becomes valid
            setValidationErrors({ ...validationErrors, amount: null });
        }
    };

    const handleCreateWithdrawal = () => {
        // Clear previous validation errors
        setValidationErrors({});
        
        // Client-side validation
        const errors = {};
        
        if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) <= 0) {
            errors.amount = '引き出し金額を入力してください';
        } else if (parseFloat(withdrawalForm.amount) > selectedSeller?.available_withdrawal) {
            errors.amount = `利用可能残高（¥${formatCurrency(selectedSeller?.available_withdrawal || 0)}）を超えています`;
        }
        
        if (!withdrawalForm.withdrawal_date) {
            errors.withdrawal_date = '引き出し日を選択してください';
        }
        
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        // Show confirmation dialog
        const confirmed = window.confirm(
            `${selectedSeller?.name} に ¥${formatCurrency(parseFloat(withdrawalForm.amount))} の引き出し記録を作成しますか？\n\n` +
            `引き出し日: ${withdrawalForm.withdrawal_date}\n` +
            `メモ: ${withdrawalForm.notes || 'なし'}`
        );

        if (!confirmed) {
            return;
        }

        setIsSubmitting(true);
        router.post('/dashboard/withdrawals', withdrawalForm, {
            onFinish: () => {
                setIsSubmitting(false);
                setIsWithdrawalModalOpen(false);
                setWithdrawalForm({
                    seller_id: '',
                    amount: '',
                    withdrawal_date: new Date().toISOString().split('T')[0],
                    notes: ''
                });
                setValidationErrors({});
            }
        });
    };

    const openWithdrawalModal = (seller) => {
        setSelectedSeller(seller);
        setWithdrawalForm({
            seller_id: seller.id,
            amount: '',
            withdrawal_date: new Date().toISOString().split('T')[0],
            notes: ''
        });
        setValidationErrors({});
        setIsWithdrawalModalOpen(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(amount);
    };

    return (
        <DashboardLayout activeTab="finance">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">財務管理</h1>
                    <p className="text-gray-600">商品販売者の収益と引き出し管理</p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Sellers Section */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">販売者一覧</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        販売者
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        総販売売上
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        手数料 (15%)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    総支払い
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    現在収益残高
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        前月末最終残高
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        登録日
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sellers.map((seller) => (
                                    <tr key={seller.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                                                <div className="text-sm text-gray-500">{seller.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(seller.total_earned)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(seller.commission)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(seller.total_withdrawn)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm font-medium ${
                                                seller.available_withdrawal > 0 ? 'text-green-600' : 'text-gray-900'
                                            }`}>
                                                {formatCurrency(seller.available_withdrawal)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(seller.previous_month_end_balance || 0)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(seller.registered).toLocaleDateString('ja-JP')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openWithdrawalModal(seller)}
                                                    disabled={seller.available_withdrawal <= 0}
                                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                                        seller.available_withdrawal > 0
                                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    引き出し記録
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (seller.bank_account) {
                                                            alert(`振込口座情報:\n販売者: ${seller.name}\n銀行: ${seller.bank_account.bank_name}\n口座種別: ${seller.bank_account.account_type}\n口座番号: ${seller.bank_account.account_number}\n口座名義: ${seller.bank_account.account_holder_sei} ${seller.bank_account.account_holder_mei}`);
                                                        } else {
                                                            alert(`${seller.name} の振込口座情報は未設定です。`);
                                                        }
                                                    }}
                                                    className="px-3 py-1 rounded-md text-sm font-medium bg-gray-600 text-white hover:bg-gray-700"
                                                >
                                                    振込口座確認
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Withdrawals Section */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">最近の引き出し記録</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        販売者
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        金額
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    支払い日
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        記録者
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        メモ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentWithdrawals.map((withdrawal) => (
                                    <tr key={withdrawal.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {withdrawal.seller_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(withdrawal.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(withdrawal.withdrawal_date).toLocaleDateString('ja-JP')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {withdrawal.manager_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {withdrawal.notes || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Withdrawal Modal */}
                {isWithdrawalModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    引き出し記録作成 - {selectedSeller?.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    利用可能残高: <span className="font-semibold text-green-600">{formatCurrency(selectedSeller?.available_withdrawal || 0)}</span>
                                </p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            引き出し金額 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            max={selectedSeller?.available_withdrawal}
                                            value={withdrawalForm.amount}
                                            onChange={handleAmountChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                validationErrors?.amount ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="0.00"
                                        />
                                        {validationErrors?.amount && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.amount}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            残高: {formatCurrency(selectedSeller?.available_withdrawal || 0)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            引き出し日 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={withdrawalForm.withdrawal_date}
                                            onChange={(e) => setWithdrawalForm({ ...withdrawalForm, withdrawal_date: e.target.value })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                validationErrors?.withdrawal_date ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationErrors?.withdrawal_date && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.withdrawal_date}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            メモ
                                        </label>
                                        <textarea
                                            value={withdrawalForm.notes}
                                            onChange={(e) => setWithdrawalForm({ ...withdrawalForm, notes: e.target.value })}
                                            rows="3"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors?.notes ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="引き出しに関するメモ（任意）"
                                        />
                                        {errors?.notes && (
                                            <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => setIsWithdrawalModalOpen(false)}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        onClick={handleCreateWithdrawal}
                                        disabled={isSubmitting || !withdrawalForm.amount || !withdrawalForm.withdrawal_date || validationErrors.amount || validationErrors.withdrawal_date}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {isSubmitting ? '作成中...' : '作成'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
