
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';



const Notification = () => {

    return (
        <>
            <Header />
            {/* Desktop Main Section */}
            <main className="hidden md:flex flex-col w-full bg-white">
                {/* Title */}
                <h1 className="text-[#363636] font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\'] text-center">商品登録</h1>
                {/* Frame 1 */}
                <section className="flex flex-col w-[850px] max-w-[880px] p-[32px_24px_49px_24px] gap-[10px]  shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] items-start">
                    {/* Image Section (Frame 11) */}
                    <div className="flex p-[64px_300px_40px_316px] justify-end items-center self-stretch rounded-[2px] border-2 border-dashed border-[#ACACAC] bg-[#F1F3F4] w-full">                        
                    </div>
                    {/* Frame 12 */}
                    <div className="flex flex-col items-start self-stretch w-full">
                        {/* Frame 121 */}
                        <div className="flex items-start gap-[16px] self-stretch">
                            <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">ファイル数 &nbsp;0/10</span>
                            <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">容量25MBまで &nbsp;0/25</span>
                        </div>
                        {/* Frame 122 */}
                        <div className="flex flex-col items-start gap-[4px] self-stretch w-full">
                            {/* Frame 1221 */}
                            <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                                <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">タイトル</span>
                                <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">0/30</span>
                            </div>
                            {/* Frame 1222 */}
                            <div className="flex flex-col items-start pb-[6.57px] self-stretch w-full">
                                <input
                                    type="text"
                                    className="w-[800px] h-[48px] px-[11px] py-[1px] rounded-[10px] border border-[#FF2AA1] bg-[#FFEFF8] shadow-[0_4px_4px_0_rgba(255,42,161,0.10)] text-[#C9177A] font-medium text-[16px] font-[\'Noto Sans JP\'] focus:outline-none"
                                    placeholder="郊外のカフェにて"
                                />
                            </div>
                        </div>
                    </div>                    
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Notification;