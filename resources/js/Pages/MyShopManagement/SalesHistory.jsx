import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import default_user from '@/assets/images/default-user.png';


const SalesHistory = () => {
    const { salesHistory = [] } = usePage().props;

    return (
        <>
            <Header />
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar />
                </div>
                <ShopMobileTopBlock />
                {/* Desktop Main Section */}
                <main className="hidden md:flex flex-col items-center max-w-[928px] p-[50px_0_40px_0] gap-[32px] bg-[#F1F3F4] self-stretch mx-auto pt-[130px]">
                    {/* Title */}
                    <h1 className="w-full text-left text-[#363636] font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\']">販売履歴</h1>
                    {/* Frame 1 */}
                    <section className="flex flex-col items-start w-[874px] p-[20px_16px] gap-4 rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] self-stretch">
                        {/* Frame 11: List */}
                        <div className="flex flex-col items-start gap-4 w-full">
                            {salesHistory.length === 0 ? (
                                <div className="text-center py-12 w-full">
                                    <p className="text-[#363636] text-lg">販売履歴がありません</p>
                                </div>
                            ) : (
                                salesHistory.map((sale) => (
                                    <div key={sale.id} className="w-[834px] h-[152px] border-b border-[#E9E9E9] relative">
                                        {/* Image (frame) */}
                                        <div className="absolute top-[16px] left-[16px] flex w-[112px] h-[112px] px-[19.843px] py-[2.205px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                            <img src={sale.image || default_user} alt="product" className="w-[72.315px] h-[108.472px] object-cover" />
                                        </div>
                                        {/* Title & Badge */}
                                        <div className="inline-flex items-center gap-2 absolute top-[16px] left-[144px]">
                                            <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-[\'Noto Sans JP\']">{sale.title}</span>
                                            <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[13px] leading-[15px] font-[\'Noto Sans JP\']">{sale.quantity}枚セット</span>
                                        </div>
                                        {/* Date */}
                                        <span className="absolute top-[59px] right-[32px] text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">{sale.sales_deadline}まで</span>
                                        {/* Price */}
                                        <div className="flex justify-baseline items-baseline absolute top-[96px] left-[144px]">
                                            <span className="text-[#363636] font-bold text-[24px] leading-[40px] font-[\'Noto Sans JP\']">{sale.price}</span>
                                            <span className="text-[#363636] font-bold text-[14px] leading-[32px] font-[\'Noto Sans JP\'] ml-[1px]">円</span>
                                        {/* 合計 100円 */}
                                        <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-noto ml-2">合計 {sale.total_amount}円</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </main>
                {/* Mobile Main Section */}
                <main className="md:hidden inline-flex flex-col items-start gap-4 pb-[80px] mx-4 pt-[30px]">
                    {/* Title */}
                    <h1 className="w-full text-left font-bold text-[24px] leading-[24px] text-[#363636] font-[\'Noto Sans JP\']">販売履歴</h1>
                    {/* Frame 1 */}
                    <section className="flex flex-col items-start w-[343px] p-[20px_16px] gap-4 rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] self-stretch">
                        {/* Frame 11: List */}
                        <div className="flex flex-col items-start w-full">
                            {salesHistory.length === 0 ? (
                                <div className="text-center py-12 w-full">
                                    <p className="text-[#363636] text-lg">販売履歴がありません</p>
                                </div>
                            ) : (
                                salesHistory.map((sale) => (
                                    <div key={sale.id} className="h-[139px] w-full border-b border-[#E9E9E9] relative">
                                        {/* Image */}
                                        <div className="absolute top-[16px] left-[16px] w-[64px] h-[64px] bg-[#F6F6F6] flex items-center justify-center rounded-[4px]">
                                            <img src={sale.image || default_user} alt="product" className="w-[41.323px] h-[61.984px] object-cover" />
                                        </div>
                                        {/* Title */}
                                        <span className="absolute top-[16px] left-[96px] w-[200px] text-[#363636] font-normal text-[14px] leading-[21px] font-[\'Noto Sans JP\']">{sale.title}</span>
                                        {/* Badge */}
                                        <div className="absolute top-[39px] left-[96px] flex items-center gap-1 px-2 py-[2px] rounded-[30px] bg-[#FF2AA1]">
                                            <span className="text-white font-bold text-[12px] leading-[15px] font-[\'Noto Sans JP\']">{sale.quantity}枚セット</span>
                                        </div>
                                        {/* Date */}
                                        <span className="absolute top-[105px] left-[96px] text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">{sale.sales_deadline}まで</span>
                                        {/* Price */}
                                        <div className="absolute top-[60px] left-[96px] flex items-center">
                                            <span className="text-[#363636] font-bold text-[18px] leading-[20px] font-[\'Noto Sans JP\']">{sale.price}</span>
                                            <span className="text-[#363636] mt-.5 font-bold text-[12px] leading-[32px] font-[\'Noto Sans JP\'] ml-[1px]">円</span>
                                            <span className="text-[#363636] font-medium text-[12px] leading-[18px] font-[\'Noto Sans JP\'] ml-2">合計 {sale.total_amount}円</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default SalesHistory;