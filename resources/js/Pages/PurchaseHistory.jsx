
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import TabButtons from '@/Components/TabButtons';
import TabButtonsDesktop from '@/Components/TabButtonsDesktop';
import QrCodeModal from '@/Components/QrCodeModal';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import qr from '@/assets/images/qr.svg';
import defaultUser from '@/assets/images/default-user.png';
import question_cloud from '@/assets/images/question_cloud.svg';
import bubble from '@/assets/images/bubble.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';
import axios from 'axios';

const PurchaseHistory = ({ purchases = [], focusPurchaseId = null }) => {
    const [activeTab, setActiveTab] = useState('favorite'); // or 'follow'
    const [showQrModal, setShowQrModal] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        console.log('focusPurchaseId:', focusPurchaseId);
        console.log('purchases:', purchases);

        if (focusPurchaseId) {
            const p = purchases.find((x) => String(x.id) === String(focusPurchaseId));
            console.log('Found purchase:', p);

            if (p) {
                console.log('Purchase details:', p);
                console.log('nwps_reservation_no:', p.nwps_reservation_no);
                console.log('nwps_upload_status:', p.nwps_upload_status);

                setSelectedPurchase(p);
                
                // Check if NWPS is ready (has QR code URL or status is ready)
                const hasQrCode = p.nwps_qr_code_url && p.nwps_qr_code_url.trim() !== '';
                const isStatusReady = p.nwps_upload_status === 'ready';
                const isReady = isStatusReady || hasQrCode;
                
                // Show overlay if NWPS is processing or not ready yet
                const shouldShowProgress = !isReady && (p.nwps_upload_status === 'processing' || p.nwps_upload_status === 'pending' || !p.nwps_upload_status);
                console.log('shouldShowProgress:', shouldShowProgress);
                console.log('isReady:', isReady, 'hasQrCode:', hasQrCode, 'isStatusReady:', isStatusReady);
                setShowProgress(shouldShowProgress);

                // Only show QR modal if NWPS is ready
                if (!shouldShowProgress) {
                    setShowQrModal(true);
                }
            } else {
                console.log('Purchase not found in purchases array');
            }
        } else {
            console.log('No focusPurchaseId provided');
        }
    }, [focusPurchaseId, purchases]);

    // Poll purchase status if in progress
    useEffect(() => {
        if (!showProgress || !selectedPurchase?.id) return;
        console.log('Starting polling for purchase:', selectedPurchase.id);
        
        let pollCount = 0;
        const maxPolls = 20; // Maximum 20 polls (60 seconds)
        let intervalId = null;
        
        // Set a maximum timeout of 2 minutes as a safety net
        const timeoutId = setTimeout(() => {
            console.log('Polling timeout reached, forcing stop');
            if (intervalId) {
                clearInterval(intervalId);
            }
            setErrorMessage('QRコードの生成に時間がかかっています。後ほど購入履歴から取得できます。');
            setShowProgress(false);
            setShowQrModal(true);
        }, 120000); // 2 minutes
        
        intervalId = setInterval(async () => {
            pollCount++;
            console.log(`Polling attempt ${pollCount}/${maxPolls} for purchase:`, selectedPurchase.id);
            
            try {
                const { data } = await axios.get(`/api/purchasehistory/${selectedPurchase.id}`);
                console.log('Polling result:', data);
                console.log('nwps_upload_status:', data.nwps_upload_status);
                console.log('nwps_qr_code_url:', data.nwps_qr_code_url);
                
                setSelectedPurchase(data);
                
                // Check if NWPS is ready (has QR code URL or status is ready)
                const isReady = data.nwps_upload_status === 'ready' || 
                               (data.nwps_qr_code_url && data.nwps_qr_code_url.trim() !== '');
                
                if (isReady) {
                    console.log('NWPS ready, hiding overlay and showing QR modal');
                    clearTimeout(timeoutId);
                    clearInterval(intervalId);
                    setShowProgress(false);
                    setShowQrModal(true);
                } else if (pollCount >= maxPolls) {
                    console.log('Max polls reached, stopping polling and showing QR modal');
                    clearTimeout(timeoutId);
                    clearInterval(intervalId);
                    setErrorMessage('QRコードの生成に時間がかかっています。後ほど購入履歴から取得できます。');
                    setShowProgress(false);
                    setShowQrModal(true);
                }
            } catch (e) {
                console.error('Polling error:', e);
                // Check if it's a 503 error or MOO1 maintenance error
                if (e.response?.status === 503 || e.response?.data?.error === 'MOO1') {
                    console.log('NWPS server error detected, finishing progress and showing QR modal');
                    clearTimeout(timeoutId);
                    clearInterval(intervalId);
                    setErrorMessage('印刷サービスが応答していません。QRコードは後ほど購入履歴から取得できます。');
                    setShowProgress(false);
                    setShowQrModal(true);
                } else if (pollCount >= maxPolls) {
                    console.log('Max polls reached with errors, stopping polling');
                    clearTimeout(timeoutId);
                    clearInterval(intervalId);
                    setErrorMessage('QRコードの生成に時間がかかっています。後ほど購入履歴から取得できます。');
                    setShowProgress(false);
                    setShowQrModal(true);
                }
            }
        }, 3000);
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            clearTimeout(timeoutId);
        };
    }, [showProgress, selectedPurchase?.id]);

    const handleTabChange = (tabId) => {
        if (tabId === 'follow') {
            router.visit('/favoriteshops');
        } else {
            setActiveTab(tabId);
        }
    };

    const handleQrButtonClick = (purchase) => {
        setSelectedPurchase(purchase);
        setErrorMessage(null);
        setShowQrModal(true);
    };

    const handleCloseModal = () => {
        console.log('handleCloseModal called');
        setShowQrModal(false);
        setErrorMessage(null);
    };

    const handleBackdropClick = (e) => {
        console.log('Backdrop clicked');
        if (e.target === e.currentTarget) {
            console.log('Backdrop click confirmed');
            handleCloseModal();
        }
    };

    return (
        <div className="bg-white ">
            <Header />
            {/* Main Section */}
            <div className="flex flex-col w-full relative">
                <main className="hidden md:flex flex-col items-center self-stretch pb-[60px] bg-white pt-[98px]">
                    {/* Frame 1 */}
                    <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[32px] ">
                        {/* Frame 11 */}
                        <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1]">
                            <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-noto self-stretch">購入履歴</h1>
                        </div>

                        {/* Frame 12 */}
                        <div className="flex flex-col items-start self-stretch">
                            {/*frame 121, 122, 123 */}

                            {purchases.length === 0 ? (
                                <div className="text-center py-12 w-full">
                                    <p className="text-[#363636] text-lg">購入履歴がありません</p>
                                </div>
                            ) : (
                                purchases.map((p) => (
                                    <div key={p.id} className="flex pt-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] relative">
                                        <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                            {p.product.display_mode === 'normal' ? (
                                                <img src={p.product.image} alt="notification" className="w-full h-full object-cover rounded-[4.409px]" />
                                            ) : p.product.display_mode === 'gacha' ? (
                                                <div className="flex relative overflow-hidden w-full h-full rounded-[4.409px]">
                                                    <img src={p.product.image} alt="ガチャ" className="object-cover filter blur-[4px] w-full h-full" />
                                                    <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] w-full h-full" />
                                                    <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <img src={bubble} alt="bubble" className="w-6 h-6" />
                                                        <span className="text-white font-bold text-xs">ガチャ</span>
                                                    </div>
                                                </div>
                                            ) : p.product.display_mode === 'blur' ? (
                                                <div className="flex relative overflow-hidden w-full h-full rounded-[4.409px]">
                                                    <img src={p.product.image} alt="ぼかしフィルター" className="object-cover filter blur-[4px] w-full h-full" />
                                                    <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px] w-full h-full" />
                                                    <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <img src={question_cloud} alt="question" className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            ) : p.product.display_mode === 'password' ? (
                                                <div className="flex relative overflow-hidden w-full h-full rounded-[4.409px]">
                                                    <div className="absolute top-0 left-0 bg-[#586B88] w-full h-full rounded-[4.409px]" />
                                                    <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <img src={lock} alt="lock" className="w-6 h-6" />
                                                        <span className="text-[#CDD9EC] font-bold text-xs">パスワード</span>
                                                        <span className="text-[#CDD9EC] text-xs">PWを入れて印刷しよう</span>
                                                    </div>
                                                </div>
                                            ) : p.product.display_mode === 'cushion' ? (
                                                <div className="flex relative overflow-hidden w-full h-full rounded-[4.409px]">
                                                    <div className="absolute top-0 left-0 bg-[#A0A5AC] w-full h-full rounded-[4.409px]" />
                                                    <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <img src={warning} alt="warning" className="w-6 h-6" />
                                                        <span className="text-[#464F5D] font-bold text-xs">WARNING</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <img src={p.product.image || photo1} alt="notification" className="w-full h-full object-cover rounded-[4.409px]" />
                                            )}
                                        </div>
                                        {/* Info Block */}
                                        <div className="flex flex-col justify-between items-start flex-1 gap-y-2">
                                            {/* 1211: Title&Badge and User Info stacked */}
                                            <div className="flex flex-col pb-[18px]">
                                                {/* Title & Badge */}
                                                <div className="inline-flex items-center gap-2">
                                                    <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-noto">{p.product.title}</span>
                                                    <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[13px] leading-[15px] font-noto">3枚セット</span>
                                                </div>
                                                {/* 12121: User Info */}
                                                <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                                                    <img src={p.product.user.image || defaultUser} alt="user" className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                                                    <span className="ml-2 text-[#222] font-noto text-[16px] leading-[22px] font-normal">{p.product.user.title}</span>
                                                </div>
                                                {/* 12122: User Info */}
                                                <div className="inline-flex pt-[6px] flex-row items-center rounded-[3px]">
                                                    <div className="text-[#363636] font-medium text-[14px] leading-[25px] font-noto">
                                                        <span className="block">枚数：{p.cnt}</span>
                                                        <span className="block">購入金額： {p.price}円</span>
                                                        <span className="block">ユーザー番号：{p.nwps_user_code || p.product.nwps_user_code || '発行中...'}</span>
                                                        <span className="block">印刷期限：{p.print_expires_at || ''}まで</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 1213: Date and Favorite */}
                                        <div className="inline-flex flex-col items-center gap-[10px] mt-[2px] mr-[62px]">
                                            <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25.2px]">{p.purchase_time}に購入</span>
                                            <button
                                                onClick={() => handleQrButtonClick(p)}
                                                className="inline-flex h-[34px] px-[16px] py-0 items-center gap-[8px] flex-shrink-0 rounded-[5px] border border-[#FF2AA1] bg-white cursor-pointer hover:bg-gray-50"
                                            >
                                                <img src={qr} alt="QR" className="w-[17px] h-[15.867px] flex-shrink-0" />
                                                <span className="text-[#E862CB] mt-[-2px] font-noto font-bold text-[12px] leading-[21px]">QRコードを表示</span>
                                            </button>
                                        </div>
                                    </div>
                                )))}


                        </div>
                    </div >
                </main >
                {/* Mobile Main Section */}
                <main className="flex md:hidden flex-col items-center self-stretch w-full bg-white pt-[80px]">
                    {/* Title (mobile) */}
                    <div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1] w-full">
                        <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">購入履歴</h1>
                    </div>
                    {/* Purchase History Content (Mobile) */}
                    <div className="flex flex-col items-start w-full self-stretch mt-[16px]">
                        {purchases.map((p) => (
                            <div key={p.id} className="relative w-[360px] h-[270px] bg-white rounded-[8px] border-b border-[#E9E9E9]">
                                {/* photo1 */}
                                <div className="absolute top-[16px] left-[16px] flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                                    {p.product.display_mode === 'normal' ? (
                                        <img src={p.product.image || photo1} alt="notification" className="w-full h-full object-cover rounded-[2.52px]" />
                                    ) : p.product.display_mode === 'gacha' ? (
                                        <div className="flex relative overflow-hidden w-full h-full rounded-[2.52px]">
                                            <img src={p.product.image} alt="ガチャ" className="object-cover filter blur-[4px] w-full h-full" />
                                            <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] w-full h-full" />
                                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <img src={bubble} alt="bubble" className="w-4 h-4" />
                                                <span className="text-white font-bold text-xs">ガチャ</span>
                                            </div>
                                        </div>
                                    ) : p.product.display_mode === 'blur' ? (
                                        <div className="flex relative overflow-hidden w-full h-full rounded-[2.52px]">
                                            <img src={p.product.image} alt="ぼかしフィルター" className="object-cover filter blur-[4px] w-full h-full" />
                                            <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px] w-full h-full" />
                                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <img src={question_cloud} alt="question" className="w-4 h-4" />
                                            </div>
                                        </div>
                                    ) : p.product.display_mode === 'password' ? (
                                        <div className="flex relative overflow-hidden w-full h-full rounded-[2.52px]">
                                            <div className="absolute top-0 left-0 bg-[#586B88] w-full h-full rounded-[2.52px]" />
                                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <img src={lock} alt="lock" className="w-4 h-4" />
                                                <span className="text-[#CDD9EC] font-bold text-xs">パスワード</span>
                                                <span className="text-[#CDD9EC] text-xs">PWを入れて印刷しよう</span>
                                            </div>
                                        </div>
                                    ) : p.product.display_mode === 'cushion' ? (
                                        <div className="flex relative overflow-hidden w-full h-full rounded-[2.52px]">
                                            <div className="absolute top-0 left-0 bg-[#A0A5AC] w-full h-full rounded-[2.52px]" />
                                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <img src={warning} alt="warning" className="w-4 h-4" />
                                            </div>
                                        </div>
                                    ) : (
                                        <img src={p.product.image || photo1} alt="notification" className="w-full h-full object-cover rounded-[2.52px]" />
                                    )}
                                </div>
                                {/* 1211 */}
                                <div className="absolute top-[16px] left-[96px] flex flex-col justify-between items-start">
                                    {/* 12111 */}
                                    <div className="flex flex-col items-start gap-[2px] w-full">
                                        <span className="text-[#363636] font-medium text-[14px] leading-[21px]">{p.product.title}</span>
                                        <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[11px] leading-[15px]">3枚セット</span>
                                        <div className="flex items-center gap-[5px] m-[4px]">
                                            <img src={p.product.user.image || defaultUser} alt="user" className="w-[20px] h-[20px] rounded-full object-cover bg-gray-200" />
                                            <span className="text-[#222] font-noto text-[13px] leading-[20px] font-normal">{p.product.user.title}</span>
                                        </div>
                                        <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25px] mb-[4px]">{p.purchase_time}に購入</span>
                                        <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">枚数：{p.cnt}</span>
                                        <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">購入金額： {p.price}円</span>
                                        <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">ユーザー番号：{p.nwps_user_code || p.product.nwps_user_code || '発行中...'}</span>
                                        <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷期限：{p.print_expires_at || ''}まで</span>
                                    </div>
                                </div>
                                {/* QR Button with gradient border */}
                                <div className="absolute top-[220px] left-[68px] w-[240px] h-[34px] p-[1px] rounded-[5px] bg-gradient-to-r from-[#FF2AA1] to-[#A770EF]">
                                    <button
                                        onClick={() => handleQrButtonClick(p)}
                                        className="flex w-full h-full px-[16px] py-0 justify-center items-center gap-[8px] flex-shrink-0 rounded-[5px] bg-white cursor-pointer hover:bg-gray-50"
                                    >
                                        <img src={qr} alt="QR" className="flex w-[20px] h-[20px] p-[2px_0_0_2px] justify-end items-center flex-shrink-0 aspect-square opacity-100" />
                                        <span className="text-[#E862CB] font-noto font-bold text-[12px] leading-[18px]">QRコードを表示</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <Footer />

                {/* QR Code Modal Overlay */}
                {showQrModal && selectedPurchase && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-[9999] p-4 overflow-y-auto pt-[110px] md:pt-[170px]"
                        onClick={handleBackdropClick}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="flex justify-center my-8">
                            <QrCodeModal onClose={handleCloseModal} purchase={selectedPurchase} errorMessage={errorMessage} />
                        </div>
                    </div>
                )}
                {/*purchase progress overlay*/}
                {showProgress && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center z-40 gap-6 md:pt-[200px] pt-[150px]">
                        <span className="text-white text-[22px] md:text-[46px] font-bold font-noto">購入が完了しました！</span>
                        <span className="text-white text-[16px] md:text-[24px] font-normal font-noto">QRコード発行していますのでお待ち下さい</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="20"
                            viewBox="0 0 70 20"
                            fill="none"
                        >
                            <style>
                                {`
                                    @keyframes dot1 {
                                        0%, 33%, 100% { opacity: 0.3; }
                                        16.5% { opacity: 1; }
                                    }
                                    @keyframes dot2 {
                                        0%, 33%, 100% { opacity: 0.3; }
                                        50% { opacity: 1; }
                                    }
                                    @keyframes dot3 {
                                        0%, 33%, 100% { opacity: 0.3; }
                                        83.5% { opacity: 1; }
                                    }
                                `}
                            </style>
                            <circle
                                cx="8"
                                cy="10"
                                r="8"
                                fill="white"
                                style={{
                                    animation: 'dot1 1.2s ease-in-out infinite'
                                }}
                            />
                            <circle
                                cx="34"
                                cy="10"
                                r="8"
                                fill="white"
                                style={{
                                    animation: 'dot2 1.2s ease-in-out infinite'
                                }}
                            />
                            <circle
                                cx="60"
                                cy="10"
                                r="8"
                                fill="white"
                                style={{
                                    animation: 'dot3 1.2s ease-in-out infinite'
                                }}
                            />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistory;