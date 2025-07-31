import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import list_unordered from '@/assets/images/list_unordered.svg';
import money_out from '@/assets/images/money_out.svg';
import money_hand from '@/assets/images/money_hand_filled.svg';
import direct_right from '@/assets/images/direct_right.svg';
import three_money from '@/assets/images/three_money.svg';


const Transaction = () => {
 
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
                <h1 className="text-[#363636] font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\']">出金・売上</h1>
                {/* Frame 1 */}
                <section className="flex flex-col items-center gap-[22px] p-[24px_1px_60px_1px] rounded-[8px] border border-[#E9E9E9] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] w-full max-w-[880px]">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-center w-[836px] p-[8px_1px_16px_1px] gap-[14px] border-b border-[#DCDCDC] bg-white">
                        {/* 収益残高 */}
                        <div className="text-black font-bold text-[24px] leading-[48px] font-[\'Noto Sans JP\']">収益残高</div>
                        {/* Frame 112 */}
                        <div className="flex flex-col items-center">
                            {/* Frame 1121 */}
                            <div className="flex items-center gap-[4px]">
                                <span className="text-black font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\']">10000</span>
                                <span className="flex items-center w-[24.344px] h-[36px] text-black font-normal text-[24px] leading-[36px] font-[\'Noto Sans JP\']">円</span>
                            </div>
                            {/* 合計金額が5000円以上... */}
                            <div className="text-[#272B2B] font-normal text-[12px] leading-[19.5px] font-[\'Noto Sans JP\'] mt-1">合計金額が5000円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                        </div>
                        {/* Frame 113 */}
                        <div className="flex flex-col items-center w-full">
                            {/* Frame 1131 */}
                            <div className="flex flex-col items-center justify-center gap-[10px] border-t border-[#E9E9E9] w-full p-[16px_292px]">
                                {/* Frame 11311 */}
                                <div className="flex items-start gap-[10px]">
                                    <span className="text-[#272B2B] font-medium text-[14px] leading-[21px] font-[\'Noto Sans JP\']">普通 ****84</span>
                                    <span className="text-[#272B2B] font-medium text-[14px] leading-[21px] font-[\'Noto Sans JP\']">ｵｰﾊﾞｰｴｯｸｽ(ｶ</span>
                                </div>
                                {/* 振込先口座の指定 */}
                                <span className="text-[#FF2AA1] font-medium text-[14px] leading-[21px] font-[\'Noto Sans JP\'] cursor-pointer">振込先口座の指定</span>
                            </div>
                        </div>
                    </div>
                    {/* Frame 12 (moved inside Frame 1) */}
                    <section className="hidden md:flex flex-col items-center gap-[8px] self-stretch">
                        {/* 121: Filter Row */}
                        <div className="flex justify-center items-center gap-[10px] self-stretch">
                            {/* 1211: Filter Buttons */}
                            <div className="flex px-[12px] py-[8px] justify-center items-start gap-[20px] rounded-[66px] bg-[#F6F6F6]">
                                {/* 全て (active) */}
                                <div className="flex w-[120px] h-[48px] px-[24px] justify-between items-center rounded-[70px] bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]">
                                    <span className="text-[#FF2AA1] text-center font-bold text-[16px] leading-[16.1px] font-[\'Noto Sans JP\']">全て</span>
                                </div>
                                {/* 売上 */}
                                <div className="flex w-[120px] h-[48px] px-[24px] justify-between items-center rounded-[70px]">
                                    <span className="text-[#767676] font-medium text-[13px] leading-[24px] font-[\'Noto Sans JP\']">売上</span>
                                </div>
                                {/* 出金 */}
                                <div className="flex w-[120px] h-[48px] px-[24px] justify-between items-center rounded-[70px]">
                                    <span className="text-[#767676] font-medium text-[13px] leading-[24px] font-[\'Noto Sans JP\']">出金</span>
                                </div>
                            </div>
                            {/* 1212: Period Selector */}
                            <div className="flex w-[130px] h-[48px] px-[24px] justify-between items-center rounded-[70px] border border-[#D1D1D1] bg-white">
                                <div className="flex items-center gap-[4px]">
                                    <img src={list_unordered} alt="期間" className="w-[24px] h-[24px] opacity-100" />
                                    <span className="text-[#767676] font-medium text-[16px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">指定期間</span>
                                </div>
                            </div>
                        </div>
                        {/* 122: Monthly Summary List */}
                        <div className="flex flex-col w-[836px] items-start gap-[10px]">
                            {/* 1221: Monthly Card - 2025年6月分 */}
                            <div className="flex flex-col p-[9px_1px_1px_1px] items-start self-stretch rounded-[8px] bg-white">
                                {/* 12211: Header */}
                                <div className="flex justify-between items-center self-stretch w-full px-[12px] py-[6px] border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[28px] leading-[42px] font-[\'Noto Sans JP\']">2025年6月分</span>
                                    <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">(概算値 2025/05)</span>
                                </div>
                                {/* 12212: 最終残高 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={three_money} alt="最終残高" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">最終残高</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12213: 販売売上 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_hand} alt="販売売上" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">販売売上</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12214: 販売手数料 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_out} alt="販売手数料" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">販売手数料</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12215: 出金 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_out} alt="出金" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">出金</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12216: 開始残高 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={three_money} alt="開始残高" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">開始残高</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* 1221: Monthly Card - 2025年5月分 */}
                            <div className="flex flex-col p-[9px_1px_1px_1px] items-start self-stretch rounded-[8px] bg-white">
                                {/* 12211: Header */}
                                <div className="flex justify-between items-center self-stretch w-full px-[12px] py-[6px] border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[28px] leading-[42px] font-[\'Noto Sans JP\']">2025年5月分</span>
                                    <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">(概算値 2025/04)</span>
                                </div>
                                {/* 12212: 最終残高 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={three_money} alt="最終残高" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">最終残高</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12213: 販売売上 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_hand} alt="販売売上" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">販売売上</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12214: 販売手数料 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_out} alt="販売手数料" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">販売手数料</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12215: 出金 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_out} alt="出金" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">出金</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12216: 開始残高 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={three_money} alt="開始残高" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">開始残高</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* 1221: Monthly Card - 2025年4月分 */}
                            <div className="flex flex-col p-[9px_1px_1px_1px] items-start self-stretch rounded-[8px] bg-white">
                                {/* 12211: Header */}
                                <div className="flex justify-between items-center self-stretch w-full px-[12px] py-[6px] border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[28px] leading-[42px] font-[\'Noto Sans JP\']">2025年4月分</span>
                                    <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\']">(概算値 2025/03)</span>
                                </div>
                                {/* 12212: 最終残高 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={three_money} alt="最終残高" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">最終残高</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12213: 販売売上 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_hand} alt="販売売上" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">販売売上</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12214: 販売手数料 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_out} alt="販売手数料" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">販売手数料</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12215: 出金 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={money_out} alt="出金" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">出金</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12216: 開始残高 */}
                                <div className="flex w-[834px] h-[98px] px-[16px] pt-[34px] pb-[24px] items-start gap-[20.33px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-[30px]">
                                        <img src={three_money} alt="開始残高" className="w-[35.088px] h-[40px]" />
                                        <span className="text-[#363636] font-medium text-[20px] leading-[23px] font-[\'Noto Sans JP\']">開始残高</span>
                                    </div>
                                    <div className="flex items-center gap-[10px] ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-black" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
            {/* Mobile Main Section */}
            <main className="md:hidden inline-flex flex-col items-start gap-4 mt-[32px] mx-4">
                {/* Title */}
                <h1 className="w-full text-left font-bold text-[24px] leading-[24px] text-[#363636] font-[\'Noto Sans JP\']">出金・売上</h1>
                {/* Frame 1 */}
                <section className="flex flex-col items-start max-w-[343px] w-full p-[20px_14px] gap-4 rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] mx-auto">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-center w-[311px] p-[8px_1px_16px_1px] gap-[14px] border-b border-[#E9E9E9]">
                        {/* 収益残高 */}
                        <div className="text-black font-bold text-[24px] leading-[48px] font-[\'Noto Sans JP\']">収益残高</div>
                        {/* Frame 112 */}
                        <div className="flex flex-col items-center self-stretch px-4">
                            <div className="flex items-center gap-[4px]">
                                <span className="text-black font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\']">10000</span>
                                <span className="flex items-center w-[24.344px] h-[36px] text-black font-normal text-[24px] leading-[36px] font-[\'Noto Sans JP\']">円</span>
                            </div>
                            <div className="text-[#272B2B] text-center font-normal text-[12px] leading-[19.5px] font-[\'Noto Sans JP\'] mt-1">合計金額が5000円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                        </div>
                        {/* Frame 1131 */}
                        <div className="flex flex-col items-center justify-center gap-[10px] border-t border-[#E9E9E9] px-[92px] py-2 w-full">
                            <div className="flex items-start gap-[10px]">
                                <span className="text-[#272B2B] font-medium text-[14px] leading-[21px] font-[\'Noto Sans JP\'] whitespace-nowrap">普通 ****84</span>
                                <span className="text-[#272B2B] font-medium text-[14px] leading-[21px] font-[\'Noto Sans JP\'] whitespace-nowrap">ｵｰﾊﾞｰｴｯｸｽ(ｶ</span>
                            </div>
                            <span className="text-[#FF2AA1] font-medium text-[14px] leading-[21px] font-[\'Noto Sans JP\'] cursor-pointer">振込先口座の指定</span>
                        </div>
                    </div>
                    {/* Frame 12 (mobile only, now inside Frame 1) */}
                    <section className="md:hidden flex flex-col items-center gap-2 mt-4 w-full">
                        {/* 121: Filter Row */}
                        <div className="flex flex-col items-center justify-center gap-2 w-full">
                            {/* 1211: Filter Buttons */}
                            <div className="flex px-3 py-2 justify-center items-start gap-2 rounded-[66px] bg-[#F6F6F6]">
                                {/* 全て (active) */}
                                <div className="flex w-[64px] h-[36px] px-6 justify-center items-center rounded-[70px] bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]">
                                    <span className="text-[#FF2AA1] text-center font-bold text-[13px] leading-[16.1px] font-[\'Noto Sans JP\'] whitespace-nowrap">全て</span>
                                </div>
                                {/* 売上 */}
                                <div className="flex w-[64px] h-[36px] px-6 justify-center items-center rounded-[70px]">
                                    <span className="text-[#767676] font-medium text-[13px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">売上</span>
                                </div>
                                {/* 出金 */}
                                <div className="flex w-[64px] h-[36px] px-6 justify-center items-center rounded-[70px]">
                                    <span className="text-[#767676] font-medium text-[13px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">出金</span>
                                </div>
                            </div>
                            {/* 1212: Period Selector */}
                            <div className="flex w-[108px] h-[36px] px-6 justify-center items-center rounded-[70px] border border-[#D1D1D1] bg-white mt-2">
                                <div className="flex items-center gap-1">
                                    <span className="w-6 h-6 inline-block rounded-full flex items-center justify-center">
                                        <img src={list_unordered} alt="期間" className="w-6 h-6 opacity-100 align-middle" />
                                    </span>
                                    <span className="text-[#767676] font-medium text-[13px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">指定期間</span>
                                </div>
                            </div>
                        </div>
                        {/* 122: Monthly List */}
                        <div className="flex flex-col items-start gap-2 w-full mt-2">
                            {/* 1221: Monthly Card - 2025年6月分 */}
                            <div className="flex flex-col p-[9px_1px_1px_1px] items-start rounded-[8px] bg-white w-full">
                                {/* 12211: Header */}
                                <div className="flex w-[311px] px-4 py-[6px] justify-between items-center border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[14px] leading-[14px] font-[\'Noto Sans JP\']">2025年6月分</span>
                                </div>
                                {/* 12212: 最終残高 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={three_money} alt="最終残高" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">最終残高</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12213: 販売売上 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_hand} alt="販売売上" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">販売売上</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12214: 販売手数料 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_out} alt="販売手数料" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">販売手数料</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12215: 出金 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_out} alt="出金" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">出金</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12216: 開始残高 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px]">
                                    <div className="flex items-start gap-2">
                                        <img src={three_money} alt="開始残高" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">開始残高</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* 1221: Monthly Card - 2025年5月分 */}
                            <div className="flex flex-col p-[9px_1px_1px_1px] items-start rounded-[8px] bg-white w-full">
                                {/* 12211: Header */}
                                <div className="flex w-[311px] px-4 py-[6px] justify-between items-center border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[14px] leading-[14px] font-[\'Noto Sans JP\']">2025年5月分</span>
                                </div>
                                {/* 12212: 最終残高 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={three_money} alt="最終残高" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">最終残高</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12213: 販売売上 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_hand} alt="販売売上" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">販売売上</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12214: 販売手数料 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_out} alt="販売手数料" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">販売手数料</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12215: 出金 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_out} alt="出金" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">出金</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12216: 開始残高 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px]">
                                    <div className="flex items-start gap-2">
                                        <img src={three_money} alt="開始残高" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">開始残高</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* 1221: Monthly Card - 2025年4月分 */}
                            <div className="flex flex-col p-[9px_1px_1px_1px] items-start rounded-[8px] bg-white w-full">
                                {/* 12211: Header */}
                                <div className="flex w-[311px] px-4 py-[6px] justify-between items-center border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[14px] leading-[14px] font-[\'Noto Sans JP\']">2025年4月分</span>
                                </div>
                                {/* 12212: 最終残高 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={three_money} alt="最終残高" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">最終残高</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12213: 販売売上 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_hand} alt="販売売上" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">販売売上</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12214: 販売手数料 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_out} alt="販売手数料" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">販売手数料</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12215: 出金 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px] border-b border-[#E9E9E9]">
                                    <div className="flex items-start gap-2">
                                        <img src={money_out} alt="出金" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">出金</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">-0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                {/* 12216: 開始残高 */}
                                <div className="flex w-[311px] h-[60px] px-4 py-[10px] justify-center items-start gap-[116px]">
                                    <div className="flex items-start gap-2">
                                        <img src={three_money} alt="開始残高" className="w-[35px] h-[30px]" />
                                        <span className="text-[#363636] font-normal text-[16px] leading-[24px] font-[\'Hiragino Sans\']">開始残高</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <span className="flex items-center">
                                            <span className="h-[20px] flex items-center justify-center text-[#363636] font-bold text-[18px] leading-[40px] font-noto">0</span>
                                            <span className="text-[#363636] font-bold text-[12px] leading-[32px] font-noto ml-[1px]">円</span>
                                        </span>
                                        <svg className="w-[20px] h-[24px] text-[#2D2D2D] ml-1" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L15 12L7 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
            {/* Mobile Top Block (not shown on desktop) */}
            <ShopMobileTopBlock/>            
        </div>
        <Footer/>
        </>
    );
};

export default Transaction;