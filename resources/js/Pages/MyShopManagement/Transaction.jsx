import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import list_unordered from '@/assets/images/list_unordered.svg';
import money_out from '@/assets/images/money_out.svg';
import money_hand from '@/assets/images/money_hand_filled.svg';
import three_money from '@/assets/images/three_money.svg';
import default_user from '@/assets/images/default-user.png';

const Transaction = ({ currentBalance, monthlyData, recentTransactions, paymentThreshold }) => {
    const { auth } = usePage().props;
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [monthDetails, setMonthDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleWithdrawalRequest = async () => {
        if (!withdrawalAmount || withdrawalAmount < 1000) {
            setMessage('出金申請額は1,000円以上である必要があります。');
            return;
        }

        if (parseInt(withdrawalAmount) > currentBalance) {
            setMessage('出金申請額が残高を超えています。');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(route('transaction.withdrawal-request'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ amount: parseInt(withdrawalAmount) }),
            });

            const data = await response.json();
            
            if (data.success) {
                setMessage(data.message);
                setShowWithdrawalModal(false);
                setWithdrawalAmount('');
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

    const handleMonthClick = async (month) => {
        setSelectedMonth(month);
        setShowDetailsModal(true);
        setLoading(true);

        try {
            const response = await fetch(route('transaction.details', { monthKey: month.month_key }));
            const data = await response.json();
            
            if (data.success) {
                setMonthDetails(data);
            }
        } catch (error) {
            setMessage('詳細の取得に失敗しました。');
        } finally {
            setLoading(false);
        }
    };

    const WithdrawalModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold mb-4">出金申請</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">出金金額</label>
                    <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="1000"
                        min="1000"
                        max={currentBalance}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        利用可能残高: {currentBalance.toLocaleString()}円
                    </p>
                </div>
                {message && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                        {message}
                    </div>
                )}
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setShowWithdrawalModal(false);
                            setWithdrawalAmount('');
                            setMessage('');
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded"
                        disabled={loading}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleWithdrawalRequest}
                        className="flex-1 px-4 py-2 bg-[#FF2AA1] text-white rounded"
                        disabled={loading}
                    >
                        {loading ? '処理中...' : '申請する'}
                    </button>
                </div>
            </div>
        </div>
    );

    const DetailsModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">
                        {selectedMonth?.month} の取引詳細
                    </h3>
                    <button
                        onClick={() => setShowDetailsModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                {loading ? (
                    <div className="text-center py-8">読み込み中...</div>
                ) : monthDetails ? (
                    <div>
                        <div className="mb-4 p-4 bg-gray-50 rounded">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">総取引数:</span> {monthDetails.total_count}件
                                </div>
                                <div>
                                    <span className="font-medium">総金額:</span> {monthDetails.total_amount.toLocaleString()}円
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            {monthDetails.transactions.length > 0 ? (
                                monthDetails.transactions.map((transaction) => (
                                    <div key={transaction.id} className="border border-gray-200 rounded p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={transaction.buyer_image || default_user} 
                                                    alt={transaction.buyer_name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="font-medium">{transaction.product_title}</div>
                                                    <div className="text-sm text-gray-600">{transaction.buyer_name}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">{transaction.amount.toLocaleString()}円</div>
                                                <div className="text-sm text-gray-600">
                                                    {transaction.unit_price.toLocaleString()}円 × {transaction.quantity}個
                                                </div>
                                                <div className="text-xs text-gray-500">{transaction.purchase_time}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    この月の取引はありません
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        詳細を取得できませんでした
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            <Header/>
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar/>
                </div>
                <ShopMobileTopBlock />
                {/* Main Section - Desktop Only */}
                <main className="hidden md:flex flex-col w-[880px] p-[80px_0_50px_0] gap-[22px] mx-20 bg-[#F1F3F4] min-h-screen">
                    {/* Title Section */}
                    <h1 className="text-[#363636] font-bold text-[36px] leading-[54px] font-['Noto Sans JP']">出金・売上</h1>
                    {/* Frame 1 */}
                    <section className="flex flex-col items-center gap-[22px] p-[24px_1px_60px_1px] rounded-[8px] border border-[#E9E9E9] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] w-full max-w-[880px]">
                        {/* Frame 11 */}
                        <div className="flex flex-col items-center w-[836px] p-[8px_1px_16px_1px] gap-[14px] border-b border-[#DCDCDC] bg-white">
                            {/* 収益残高 */}
                            <div className="text-black font-bold text-[24px] leading-[48px] font-['Noto Sans JP']">収益残高</div>
                            {/* Frame 112 */}
                            <div className="flex flex-col items-center">
                                {/* Frame 1121 */}
                                <div className="flex items-center gap-[4px]">
                                    <span className="text-black font-bold text-[36px] leading-[54px] font-['Noto Sans JP']">{currentBalance.toLocaleString()}</span>
                                    <span className="flex items-center w-[24.344px] h-[36px] text-black font-normal text-[24px] leading-[36px] font-['Noto Sans JP']">円</span>
                                </div>
                                {/* 合計金額が5000円以上... */}
                                <div className="text-[#272B2B] font-normal text-[12px] leading-[19.5px] font-['Noto Sans JP'] mt-1">合計金額が{paymentThreshold.toLocaleString()}円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                            </div>
                            {/* Frame 113 */}
                            <div className="flex flex-col items-center w-full">
                                <button
                                    onClick={() => setShowWithdrawalModal(true)}
                                    className="flex items-center gap-[12px] cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <img src={money_out} alt="money_out" className="w-[20px] h-[20px]" />
                                    <span className="text-[#E862CB] font-noto text-[14px] font-bold leading-[14px]">出金申請</span>
                                </button>
                            </div>
                        </div>
                        {/* Frame 12 */}
                        <div className="flex flex-col items-center w-[836px] gap-[22px]">
                            {/* 121: Recent Transactions */}
                            <div className="flex flex-col items-start gap-[16px] w-full">
                                <div className="flex items-center gap-[8px]">
                                    <img src={list_unordered} alt="list_unordered" className="w-[20px] h-[20px]" />
                                    <span className="text-[#363636] font-bold text-[20px] leading-[30px] font-['Noto Sans JP']">最近の取引</span>
                                </div>
                                <div className="flex flex-col items-start gap-[12px] w-full">
                                    {recentTransactions.length > 0 ? (
                                        recentTransactions.map((transaction, index) => (
                                            <div key={transaction.id} className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                                <div className="flex items-center gap-[16px]">
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-[#363636] font-bold text-[16px] leading-[24px] font-['Noto Sans JP']">{transaction.product_title}</span>
                                                        <span className="text-[#767676] font-normal text-[14px] leading-[21px] font-['Noto Sans JP']">{transaction.buyer_name}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-[8px]">
                                                    <span className="text-[#363636] font-bold text-[18px] leading-[27px] font-['Noto Sans JP']">{transaction.amount.toLocaleString()}円</span>
                                                    <span className="text-[#767676] font-normal text-[14px] leading-[21px] font-['Noto Sans JP']">{transaction.purchase_time}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex w-full py-[20px] justify-center items-center">
                                            <span className="text-[#767676] font-normal text-[16px] leading-[24px] font-['Noto Sans JP']">取引履歴がありません</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* 122: Monthly List */}
                            <div className="flex flex-col items-start gap-[22px] w-full">
                                <div className="flex items-center gap-[8px]">
                                    <img src={money_hand} alt="money_hand" className="w-[20px] h-[20px]" />
                                    <span className="text-[#363636] font-bold text-[20px] leading-[30px] font-['Noto Sans JP']">月次取引</span>
                                </div>
                                <div className="flex flex-col items-start gap-[22px] w-full">
                                    {monthlyData.map((month, index) => (
                                        <div 
                                            key={month.month_key} 
                                            className="flex flex-col p-[9px_1px_1px_1px] items-start self-stretch rounded-[8px] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleMonthClick(month)}
                                        >
                                            {/* 12211: Header */}
                                            <div className="flex justify-between items-center self-stretch w-full px-[12px] py-[6px] border-b border-[#E9E9E9]">
                                                <span className="text-[#363636] font-bold text-[28px] leading-[42px] font-['Noto Sans JP']">{month.month}</span>
                                                <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-['Noto Sans JP']">(概算値 {month.estimated_month})</span>
                                            </div>
                                            {/* 12212: 最終残高 */}
                                            <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                                <div className="flex items-start gap-[30px]">
                                                    <img src={three_money} alt="最終残高" className="w-[35.088px] h-[40px]" />
                                                    <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-['Noto Sans JP']">最終残高</span>
                                                </div>
                                                <div className="flex items-center gap-[10px] ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[40px] flex items-center justify-center text-[#363636] font-bold text-[28px] leading-[40px] font-noto">{month.final_balance.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[18px] leading-[32px] font-noto ml-[4px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D]" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* 12213: 売上金額 */}
                                            <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                                <div className="flex items-start gap-[30px]">
                                                    <img src={money_hand} alt="売上金額" className="w-[35.088px] h-[40px]" />
                                                    <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-['Noto Sans JP']">売上金額</span>
                                                </div>
                                                <div className="flex items-center gap-[10px] ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[40px] flex items-center justify-center text-[#363636] font-bold text-[28px] leading-[40px] font-noto">{month.sales_amount.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[18px] leading-[32px] font-noto ml-[4px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D]" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* 12214: 出金金額 */}
                                            <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                                <div className="flex items-start gap-[30px]">
                                                    <img src={money_out} alt="出金金額" className="w-[35.088px] h-[40px]" />
                                                    <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-['Noto Sans JP']">出金金額</span>
                                                </div>
                                                <div className="flex items-center gap-[10px] ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[40px] flex items-center justify-center text-[#363636] font-bold text-[28px] leading-[40px] font-noto">{month.withdrawal_amount.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[18px] leading-[32px] font-noto ml-[4px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D]" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* 12215: 開始残高 */}
                                            <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px]">
                                                <div className="flex items-start gap-[30px]">
                                                    <img src={three_money} alt="開始残高" className="w-[35.088px] h-[40px]" />
                                                    <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-['Noto Sans JP']">開始残高</span>
                                                </div>
                                                <div className="flex items-center gap-[10px] ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[40px] flex items-center justify-center text-[#363636] font-bold text-[28px] leading-[40px] font-noto">{month.starting_balance.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[18px] leading-[32px] font-noto ml-[4px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D]" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                {/* Mobile Main Section */}
                <main className="md:hidden inline-flex flex-col items-start gap-4 mt-[32px] mx-4">
                    {/* Title */}
                    <h1 className="w-full text-left font-bold text-[24px] leading-[24px] text-[#363636] font-['Noto Sans JP']">出金・売上</h1>
                    {/* Frame 1 */}
                    <section className="flex flex-col items-start max-w-[343px] w-full p-[20px_14px] gap-4 rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] mx-auto">
                        {/* Frame 11 */}
                        <div className="flex flex-col items-center w-[311px] p-[8px_1px_16px_1px] gap-[14px] border-b border-[#E9E9E9]">
                            {/* 収益残高 */}
                            <div className="text-black font-bold text-[24px] leading-[48px] font-['Noto Sans JP']">収益残高</div>
                            {/* Frame 112 */}
                            <div className="flex flex-col items-center self-stretch px-4">
                                <div className="flex items-center gap-[4px]">
                                    <span className="text-black font-bold text-[36px] leading-[54px] font-['Noto Sans JP']">{currentBalance.toLocaleString()}</span>
                                    <span className="flex items-center w-[24.344px] h-[36px] text-black font-normal text-[24px] leading-[36px] font-['Noto Sans JP']">円</span>
                                </div>
                                <div className="text-[#272B2B] text-center font-normal text-[12px] leading-[19.5px] font-['Noto Sans JP'] mt-1">合計金額が{paymentThreshold.toLocaleString()}円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                            </div>
                            {/* Frame 1131 */}
                            <div className="flex flex-col items-center justify-center gap-[10px] border-t border-[#E9E9E9] px-[92px] py-2 w-full">
                                <button
                                    onClick={() => setShowWithdrawalModal(true)}
                                    className="flex items-center gap-[12px] cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <img src={money_out} alt="money_out" className="w-[20px] h-[20px]" />
                                    <span className="text-[#E862CB] font-noto text-[14px] font-bold leading-[14px]">出金申請</span>
                                </button>
                            </div>
                        </div>
                        {/* Frame 12 */}
                        <div className="flex flex-col items-center w-[311px] gap-[16px]">
                            {/* 121: Recent Transactions */}
                            <div className="flex flex-col items-start gap-[12px] w-full">
                                <div className="flex items-center gap-[6px]">
                                    <img src={list_unordered} alt="list_unordered" className="w-[16px] h-[16px]" />
                                    <span className="text-[#363636] font-bold text-[16px] leading-[24px] font-['Noto Sans JP']">最近の取引</span>
                                </div>
                                <div className="flex flex-col items-start gap-[8px] w-full">
                                    {recentTransactions.length > 0 ? (
                                        recentTransactions.slice(0, 3).map((transaction) => (
                                            <div key={transaction.id} className="flex w-full pb-[8px] justify-between items-center border-b border-[#D1D1D1]">
                                                <div className="flex flex-col items-start">
                                                    <span className="text-[#363636] font-bold text-[14px] leading-[21px] font-['Noto Sans JP']">{transaction.product_title}</span>
                                                    <span className="text-[#767676] font-normal text-[12px] leading-[18px] font-['Noto Sans JP']">{transaction.buyer_name}</span>
                                                </div>
                                                <div className="flex flex-col items-end gap-[2px]">
                                                    <span className="text-[#363636] font-bold text-[16px] leading-[24px] font-['Noto Sans JP']">{transaction.amount.toLocaleString()}円</span>
                                                    <span className="text-[#767676] font-normal text-[12px] leading-[18px] font-['Noto Sans JP']">{transaction.purchase_time}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex w-full py-[16px] justify-center items-center">
                                            <span className="text-[#767676] font-normal text-[14px] leading-[21px] font-['Noto Sans JP']">取引履歴がありません</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* 122: Monthly List */}
                            <div className="flex flex-col items-start gap-[16px] w-full mt-2">
                                <div className="flex items-center gap-[6px]">
                                    <img src={money_hand} alt="money_hand" className="w-[16px] h-[16px]" />
                                    <span className="text-[#363636] font-bold text-[16px] leading-[24px] font-['Noto Sans JP']">月次取引</span>
                                </div>
                                <div className="flex flex-col items-start gap-2 w-full">
                                    {monthlyData.slice(0, 3).map((month) => (
                                        <div 
                                            key={month.month_key} 
                                            className="flex flex-col p-[9px_1px_1px_1px] items-start rounded-[8px] bg-white w-full cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleMonthClick(month)}
                                        >
                                            {/* 12211: Header */}
                                            <div className="flex w-[311px] px-4 py-[6px] justify-between items-center border-b border-[#E9E9E9]">
                                                <span className="text-[#363636] font-bold text-[14px] leading-[14px] font-['Noto Sans JP']">{month.month}</span>
                                            </div>
                                            {/* 12212: 最終残高 */}
                                            <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                                <div className="flex items-start gap-2">
                                                    <img src={three_money} alt="最終残高" className="w-[35px] h-[30px]" />
                                                    <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-['Hiragino Sans']">最終残高</span>
                                                </div>
                                                <div className="flex items-center ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">{month.final_balance.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* 12213: 売上金額 */}
                                            <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                                <div className="flex items-start gap-2">
                                                    <img src={money_hand} alt="売上金額" className="w-[35px] h-[30px]" />
                                                    <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-['Hiragino Sans']">売上金額</span>
                                                </div>
                                                <div className="flex items-center ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">{month.sales_amount.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* 12214: 出金金額 */}
                                            <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                                <div className="flex items-start gap-2">
                                                    <img src={money_out} alt="出金金額" className="w-[35px] h-[30px]" />
                                                    <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-['Hiragino Sans']">出金金額</span>
                                                </div>
                                                <div className="flex items-center ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">{month.withdrawal_amount.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* 12215: 開始残高 */}
                                            <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px]">
                                                <div className="flex items-start gap-2">
                                                    <img src={three_money} alt="開始残高" className="w-[35px] h-[30px]" />
                                                    <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-['Hiragino Sans']">開始残高</span>
                                                </div>
                                                <div className="flex items-center ml-auto">
                                                    <span className="flex items-center">
                                                        <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">{month.starting_balance.toLocaleString()}</span>
                                                        <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                                    </span>
                                                    <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer/>
            
            {/* Modals */}
            {showWithdrawalModal && <WithdrawalModal />}
            {showDetailsModal && <DetailsModal />}
        </>
    );
};

export default Transaction;