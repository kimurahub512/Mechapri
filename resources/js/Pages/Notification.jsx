
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.png';

const Notification = () => {
    return (
        <div className="bg-white">
            <Header />
            {/* Main Section */}
            <main className="hidden md:flex flex-col items-center self-stretch h-[1020px] pb-[60px] bg-white">
                {/* Frame 1 */}
                <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[24px] ">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1] bg-white ">
                        <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-noto self-stretch">通知</h1>
                    </div>
                    {/* Frame 12 */}
                    <div className="flex flex-col items-start self-stretch">
                        {[1, 2, 3].map((_, i) => (                        
                        < div key={i} className="flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9]" >
                            <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                <img src={photo1} alt="notification" />
                            </div>
                            {/* Frame 1211 */}
                            < div className="flex flex-col h-[118px] pr-[32px] justify-between items-start flex-1" >
                                <span className="text-black font-normal text-[14px] leading-[21px] font-noto self-stretch">anchiy1005さんが「郊外のカフェにて」を投稿しました</span>
                                <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-noto">2025/10/05まで</span>
                            </div>
                        </div>
                    ))}
                    </div>
                </div >
            </main >
            {/* Mobile Main Section */}
            < main className="flex md:hidden flex-col items-center self-stretch bg-white" >
                {/* Title */}
                < div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1]" >
                    <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">通知</h1>
                </div >
                {/* Frame 12 */}
                < div className="flex flex-col items-start w-[375px] self-stretch" >
                {[1, 2, 3].map((_, i) => ( 
                    < div key={i} className="flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9]" >
                        {/* Image */}
                        < div className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]" >
                            <img src={photo1} alt="notification" />
                        </div >
                        {/* 1211 */}
                        < div className="flex flex-col h-[88px] pr-[32px] justify-between items-start flex-1" >
                            <span className="self-stretch text-black font-noto font-normal text-[14px] leading-[21px]">anchiy1005さんが「郊外のカフェにて」を投稿しました</span>
                            <span className="self-stretch text-[#363636] font-noto font-medium text-[14px] leading-[25.2px]">2025/10/05まで</span>
                        </div >
                    </div >
                ))}
                </div >
            </main >
            <Footer />
        </div >
    );
};

export default Notification;