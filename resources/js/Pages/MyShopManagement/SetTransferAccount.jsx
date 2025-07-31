import React, { useState } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import TransferAccountConfirmModal from '@/Components/TransferAccountConfirmModal';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import recyclebin from '@/assets/images/recyclebin.svg';
import list from '@/assets/images/list_unordered.svg';
import arrow from '@/assets/images/arrow_right.svg';
import file_add from '@/assets/images/File_Add.svg';
import radio from '@/assets/images/beginner_radio.svg';
import add from '@/assets/images/add.svg';
import close from '@/assets/images/close.svg';
import lock from '@/assets/images/lock.svg';


const SetTransferAccount = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Header />
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar />
                </div>
                <ShopMobileTopBlock />
                {/* Main Section */}
                {/* MOBILE ONLY */}
                <div className="block md:hidden px-[16px] mt-[160px] flex flex-col items-start gap-4">

                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">振込先口座の指定</h1>
                    </div>
                    <div className="flex flex-col items-start py-[20px] px-[16px] gap-[10px] rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">銀行</span>
                            <div className="flex flex-row justify-between items-start py-[14px] w-full border-b border-[#E9E9E9]">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[13px] font-normal leading-[24px]">三菱UFJ銀行</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6.5752 1.77637L16.2985 11.4997L6.5752 21.2229" stroke="#363636" stroke-width="2.1" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座種別</span>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start">
                                    <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">普通</span>
                                </div>
                                <div className="flex items-start flex-shrink-0">
                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">当座</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">支店コード</span>
                            <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座番号</span>
                            <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座名義 (セイ)</span>
                            <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座名義 (メイ)</span>
                            <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex items-start">
                                <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px] mx-[8px]">•</span>
                                <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px]">振込先が間違っている場合、再度振込手数料が発生します。</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className="flex w-[240px] p-[17px] flex-col justify-center items-center rounded-[8px] shadow-[0px_4px_8px_0px_rgba(255, 42, 161, 0.20)] bg-[#E9EEF1] cursor-pointer" onClick={() => setShowModal(true)}>
                                <span className="text-[#969696] text-center font-noto text-[18px] font-bold leading-[21px]">登録する</span>
                            </div>
                        </div>
                    </div>
                </div>
                <main
                    className="hidden md:flex flex-col items-left gap-[22px] max-w-[928px] py-[40px] px-[15px] w-full ml-[109px] mr-[169px]"
                >
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[36px] font-bold leading-[54px]">振込先口座の指定</h1>
                    </div>
                    <div className="flex flex-col items-start py-[32px] px-[36px] gap-[10px] rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        <div className="flex flex-col items-start gap-[22px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">銀行</span>
                                <div className="flex flex-row justify-between items-start py-[14px] w-full border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[18px] font-normal leading-[24px]">三菱UFJ銀行</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M6.5752 1.77637L16.2985 11.4997L6.5752 21.2229" stroke="#363636" stroke-width="2.1" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座種別</span>
                                <div className="flex flex-col items-start gap-[8px] w-full">
                                    <div className="flex items-start">
                                        <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">普通</span>
                                    </div>
                                    <div className="flex items-start flex-shrink-0">
                                        <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">当座</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">支店コード</span>
                                <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座番号</span>
                                <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座名義 (セイ)</span>
                                <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座名義 (メイ)</span>
                                <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="私のめちゃプリショップ" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex items-start">
                                    <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px] mx-[8px]">•</span>
                                    <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px]">振込先が間違っている場合、再度振込手数料が発生します。</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full">
                                <div className="flex w-full p-[17px] flex-col justify-center items-center rounded-[8px] shadow-[0px_4px_8px_0px_rgba(255, 42, 161, 0.20)] bg-[#E9EEF1] cursor-pointer" onClick={() => setShowModal(true)}>
                                    <span className="text-[#969696] text-center font-noto text-[18px] font-bold leading-[21px]">登録する</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div 
                    className="fixed top-[60px] md:top-[90px] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-start justify-center z-[1000] pt-[60px] md:pt-[90px] pb-[40px] overflow-y-auto"
                    onClick={() => setShowModal(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="min-h-screen w-full flex justify-center px-[16px]">
                        <TransferAccountConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default SetTransferAccount;