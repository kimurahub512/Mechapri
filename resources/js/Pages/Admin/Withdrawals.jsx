import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

const Withdrawals = ({ withdrawals }) => {
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [status, setStatus] = useState('pending');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleStatusUpdate = async () => {
        if (!selectedWithdrawal) return;

        setLoading(true);
        try {
            const response = await fetch(route('admin.withdrawals.update-status', { withdrawal: selectedWithdrawal.id }), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ status, notes }),
            });

            const data = await response.json();
            
            if (data.success) {
                setMessage(data.message);
                setShowStatusModal(false);
                setSelectedWithdrawal(null);
                setStatus('pending');
                setNotes('');
                // Reload the page to update the list
                window.location.reload();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('エラーが発生しました。もう一度お試しください。');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-blue-100 text-blue-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return '審査中';
            case 'approved': return '承認済み';
            case 'rejected': return '却下';
            case 'completed': return '完了';
            default: return status;
        }
    };

    const StatusModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold mb-4">ステータス更新</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">ステータス</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="pending">審査中</option>
                        <option value="approved">承認済み</option>
                        <option value="rejected">却下</option>
                        <option value="completed">完了</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">備考</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        rows="3"
                        placeholder="備考を入力してください"
                    />
                </div>
                {message && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                        {message}
                    </div>
                )}
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setShowStatusModal(false);
                            setSelectedWithdrawal(null);
                            setStatus('pending');
                            setNotes('');
                            setMessage('');
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded"
                        disabled={loading}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleStatusUpdate}
                        className="flex-1 px-4 py-2 bg-[#FF2AA1] text-white rounded"
                        disabled={loading}
                    >
                        {loading ? '処理中...' : '更新'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white">
            <Head title="出金申請管理 - めちゃプリ" />
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">出金申請管理</h1>
                    
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {withdrawals.length > 0 ? (
                                withdrawals.map((withdrawal) => (
                                    <li key={withdrawal.id} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">
                                                            {withdrawal.user_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {withdrawal.user_email}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">
                                                            {withdrawal.amount.toLocaleString()}円
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {withdrawal.created_at}
                                                        </p>
                                                    </div>
                                                </div>
                                                {withdrawal.notes && (
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        備考: {withdrawal.notes}
                                                    </p>
                                                )}
                                                {withdrawal.processed_at && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        処理日時: {withdrawal.processed_at}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="ml-4 flex items-center gap-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                                                    {getStatusText(withdrawal.status)}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        setSelectedWithdrawal(withdrawal);
                                                        setStatus(withdrawal.status);
                                                        setNotes(withdrawal.notes || '');
                                                        setShowStatusModal(true);
                                                    }}
                                                    className="bg-[#FF2AA1] text-white px-3 py-1 rounded text-sm hover:bg-[#E61E8B] transition-colors"
                                                >
                                                    ステータス更新
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="px-6 py-8 text-center text-gray-500">
                                    出金申請がありません
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
            
            {/* Status Update Modal */}
            {showStatusModal && <StatusModal />}
        </div>
    );
};

export default Withdrawals;
