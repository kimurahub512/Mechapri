
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
import girl from '@/assets/images/favoriteproducts/girl.svg';

const PurchaseHistory = () => {
    const [activeTab, setActiveTab] = useState('favorite'); // or 'follow'
    const [showQrModal, setShowQrModal] = useState(false);

    const handleTabChange = (tabId) => {
        if (tabId === 'follow') {
            router.visit('/favoriteshops');
        } else {
            setActiveTab(tabId);
        }
    };

    const handleQrButtonClick = () => {
        setShowQrModal(true);
    };

    const handleCloseModal = () => {
        setShowQrModal(false);
    };

    return (
        <div className="bg-white">
            <Header />
            {/* Main Section */}
            <main className="hidden md:flex flex-col items-center self-stretch h-[1020px] pb-[60px] bg-white">
                {/* Frame 1 */}
                <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[32px] ">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1]">
                        <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-['Noto Sans JP'] self-stretch">購入履歴</h1>
                    </div>

                    {/* Frame 12 */}
                    <div className="flex flex-col items-start self-stretch">
                        {/* Favorite Products Content */}
                        {/*frame 121, 122, 123 */}
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex pt-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] relative">
                                <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                    <img src={photo1} alt="notification" />
                                </div>
                                {/* Info Block */}
                                <div className="flex flex-col justify-between items-start flex-1 gap-y-2">
                                    {/* 1211: Title&Badge and User Info stacked */}
                                    <div className="flex flex-col pb-[18px]">
                                        {/* Title & Badge */}
                                        <div className="inline-flex items-center gap-2">
                                            <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-['Noto Sans JP']">郊外のカフェにて</span>
                                            <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[13px] leading-[15px] font-['Noto Sans JP']">3枚セット</span>
                                        </div>
                                        {/* 12121: User Info */}
                                        <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                                            <img src={girl} alt="girl" className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                                            <span className="ml-2 text-[#222] font-noto text-[16px] leading-[22px] font-normal">anchly1005</span>
                                        </div>
                                        {/* 12122: User Info */}
                                        <div className="inline-flex pt-[6px] flex-row items-center rounded-[3px]">
                                        <div className="text-[#363636] font-medium text-[14px] leading-[25px] font-['Noto Sans JP']">
                                            <span className="block">枚数：1</span>
                                            <span className="block">購入金額： 300円</span>
                                            <span className="block">印刷番号：2CNM9FX279</span>
                                            <span className="block">印刷期限：2025/10/05まで</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 1213: Date and Favorite */}
                                <div className="inline-flex flex-col items-center gap-[10px] mt-[2px] mr-[62px]">
                                    <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25.2px]">2025/10/05 19:20に購入</span>
                                    <button 
                                        onClick={handleQrButtonClick}
                                        className="inline-flex h-[34px] px-[16px] py-0 items-center gap-[8px] flex-shrink-0 rounded-[5px] border border-[#FF2AA1] bg-white cursor-pointer hover:bg-gray-50"
                                    >
                                        <img src={qr} alt="QR" className="w-[17px] h-[15.867px] flex-shrink-0" />
                                        <span className="text-[#E862CB] mt-[-2px] font-noto font-bold text-[12px] leading-[21px]">QRコードを表示</span>
                                    </button>
                                </div>
                            </div>
                        ))}


                    </div>
                </div >
            </main >
            {/* Mobile Main Section */}
            <main className="flex md:hidden flex-col items-center self-stretch w-full bg-white">
                {/* Title (mobile) */}
                <div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1] w-full">
                    <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">購入履歴</h1>
                </div>
                {/* Purchase History Content (Mobile) */}
                <div className="flex flex-col items-start w-full self-stretch mt-[16px]">
                            {[1, 2, 3].map((_, i) => (
                        <div key={i} className="relative w-[360px] h-[270px] bg-white rounded-[8px] border-b border-[#E9E9E9]">
                            {/* photo1 */}
                            <div className="absolute top-[16px] left-[16px] flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="notification" />
                                    </div>
                            {/* 1211 */}
                            <div className="absolute top-[16px] left-[96px] flex flex-col justify-between items-start">
                                {/* 12111 */}
                                <div className="flex flex-col items-start gap-[2px] w-full">
                                    <span className="text-[#363636] font-medium text-[14px] leading-[21px]">郊外のカフェにて</span>
                                    <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[11px] leading-[15px]">3枚セット</span>
                                    <div className="flex items-center gap-[5px] m-[4px]">
                                                <img src={girl} alt="girl" className="w-[20px] h-[20px] rounded-full object-cover bg-gray-200" />
                                        <span className="text-[#222] font-noto text-[13px] leading-[20px] font-normal">anchly1005</span>
                                    </div>
                                    <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25px] mb-[4px]">2025/10/05 19:20に購入</span>
                                    <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">枚数：1</span>
                                    <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">購入金額： 300円</span>
                                    <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷番号：2CNM9FX279</span>
                                    <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷期限：2025/10/05まで</span>
                                </div>
                                    </div>
                            {/* QR Button with gradient border */}
                            <div className="absolute top-[220px] left-[68px] w-[240px] h-[34px] p-[1px] rounded-[5px] bg-gradient-to-r from-[#FF2AA1] to-[#A770EF]">
                                <button 
                                    onClick={handleQrButtonClick}
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
            {showQrModal && (
                <div 
                    className="fixed top-[60px] md:top-[90px] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-[60px] md:pt-[90px] pb-[40px] overflow-y-auto"
                    onClick={handleCloseModal}
                >
                    <div onClick={(e) => e.stopPropagation()} className="min-h-screen w-full flex justify-center px-[16px]">
                        <QrCodeModal />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;