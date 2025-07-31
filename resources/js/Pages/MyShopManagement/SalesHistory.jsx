import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';


const SalesHistory = () => {
 
    return (
        <>
        <Header/>
        <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
            {/* Sidebar Section */}
            <div className="hidden md:block">
                <ShopSidebar/>
            </div>
            <ShopMobileTopBlock />
            {/* Desktop Main Section */}
            <main className="hidden md:flex flex-col items-center max-w-[928px] p-[50px_0_40px_0] gap-[32px] bg-[#F1F3F4] self-stretch mx-auto">
                {/* Title */}
                <h1 className="w-full text-left text-[#363636] font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\']">販売履歴</h1>
                {/* Frame 1 */}
                <section className="flex flex-col items-start w-[874px] p-[20px_16px] gap-4 rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] self-stretch">
                    {/* Frame 11: List */}
                    <div className="flex flex-col items-start gap-4 w-full">
                        {/* 111, 112, 113: Three identical items */}
                        {[1,2,3].map((_, idx) => (
                            <div key={idx} className="w-[834px] h-[152px] border-b border-[#E9E9E9] relative">
                                {/* Image (frame) */}
                                <div className="absolute top-[16px] left-[16px] flex w-[112px] h-[112px] px-[19.843px] py-[2.205px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                  <img src={photo1} alt="photo" className="w-[72.315px] h-[108.472px] object-cover" />
                                </div>
                                {/* Title & Badge */}
                                <div className="inline-flex items-center gap-2 absolute top-[16px] left-[144px]">
                                    <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-[\'Noto Sans JP\']">郊外のカフェにて</span>
                                    <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[13px] leading-[15px] font-[\'Noto Sans JP\']">3枚セット</span>
                                </div>
                                {/* Date */}
                                <span className="absolute top-[59px] right-[32px] text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">2025/10/05まで</span>
                                {/* Price */}
                                <div className="inline-flex items-start absolute top-[96px] left-[144px]">
                                    <span className="text-[#363636] font-bold text-[24px] leading-[40px] font-[\'Noto Sans JP\']">100</span>
                                    <span className="text-[#363636] font-bold text-[14px] leading-[32px] font-[\'Noto Sans JP\'] ml-[1px]">円</span>
                                </div>
                                {/* 合計 100円 */}
                                <span className="absolute top-[107px] left-[218px] text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">合計 100円</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            {/* Mobile Main Section */}
            <main className="md:hidden inline-flex flex-col items-start gap-4 mt-[32px] mx-4">
                {/* Title */}
                <h1 className="w-full text-left font-bold text-[24px] leading-[24px] text-[#363636] font-[\'Noto Sans JP\']">販売履歴</h1>
                {/* Frame 1 */}
                <section className="flex flex-col items-start w-[343px] p-[20px_16px] gap-4 rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] self-stretch">
                    {/* Frame 11: List */}
                    <div className="flex flex-col items-start w-full">
                        {[1,2,3].map((_, idx) => (
                            <div key={idx} className="h-[139px] w-full border-b border-[#E9E9E9] relative">
                                {/* Image */}
                                <div className="absolute top-[16px] left-[16px] w-[64px] h-[64px] bg-[#F6F6F6] flex items-center justify-center rounded-[4px]">
                                    <img src={photo1} alt="photo" className="w-[41.323px] h-[61.984px] object-cover" />
                                </div>
                                {/* Title */}
                                <span className="absolute top-[16px] left-[96px] w-[200px] text-[#363636] font-normal text-[14px] leading-[21px] font-[\'Noto Sans JP\']">郊外のカフェにて</span>
                                {/* Badge */}
                                <div className="absolute top-[39px] left-[96px] flex items-center gap-1 px-2 py-[2px] rounded-[30px] bg-[#FF2AA1]">
                                    <span className="text-white font-bold text-[12px] leading-[15px] font-[\'Noto Sans JP\']">3枚セット</span>
                                </div>
                                {/* Date */}
                                <span className="absolute top-[105px] left-[96px] text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">2025/10/05まで</span>
                                {/* Price */}
                                <div className="absolute top-[60px] left-[96px] flex items-center">
                                    <span className="text-[#363636] font-bold text-[18px] leading-[20px] font-[\'Noto Sans JP\']">100</span>
                                    <span className="text-[#363636] mt-.5 font-bold text-[12px] leading-[32px] font-[\'Noto Sans JP\'] ml-[1px]">円</span>
                                </div>
                                {/* 合計 100円 */}
                                <span className="absolute top-[67px] left-[149px] text-[#363636] font-medium text-[12px] leading-[18px] font-[\'Noto Sans JP\']">合計 100円</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <ShopMobileTopBlock/>
        </div>
        <Footer/>
        </>
    );
};

export default SalesHistory;