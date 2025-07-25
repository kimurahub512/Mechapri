
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import TabButtons from '@/Components/TabButtons';
import TabButtonsDesktop from '@/Components/TabButtonsDesktop';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import girl from '@/assets/images/favoriteshops/girl.svg';
import favoriteshops from '@/assets/images/favoriteshop.svg';
import favoriteshops_follow from '@/assets/images/favoriteshop_white.svg';

const FavoriteShops = () => {
    const [activeTab, setActiveTab] = useState('follow'); // Default to follow tab

    const handleTabChange = (tabId) => {
        if (tabId === 'favorite') {
            router.visit('/favoriteproducts');
        } else {
            setActiveTab(tabId);
        }
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
                        <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-['Noto Sans JP'] self-stretch">お気に入り</h1>
                    </div>
                    {/*frame 13*/}
                    <TabButtonsDesktop 
                        activeTab={activeTab}
                        setActiveTab={handleTabChange}
                        tabs={[
                            {
                                id: 'follow',
                                label: 'フォロー中ショップ',
                                textSize: 'text-[14px] leading-[24px]'
                            },
                            {
                                id: 'favorite',
                                label: 'お気に入り商品',
                                textSize: 'text-[14px] leading-[16.1px]'
                            }
                        ]}
                    />
                    {/* Frame 12 */}
                    <div className="flex flex-col items-start self-stretch">
                        {/* Favorite Shops Content three blocks */}

                        <div className="flex p-[16px_8px] items-center gap-[32px] self-stretch border-b border-[#E9E9E9]">
                            {/* 121 */}
                            <div className="flex items-start flex-1">
                                {/* 1211 */}
                                <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start">
                                    {/* 12111 */}
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={girl} alt="girl" />
                                    </div>
                                </div>
                                {/* 1212 */}
                                <div className="flex flex-col justify-center items-start flex-1">
                                    <span className="text-[#000] font-bold text-[21px] leading-[32px] font-['Noto Sans JP']">anchiy1005</span>
                                    <span className="self-stretch text-[#000] font-normal text-[14px] leading-[21px] font-['Noto Sans JP'] mt-[8px]">こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！</span>
                                </div>
                            </div>
                            {/* 1213 */}
                            <div className="flex h-[48px] justify-end items-center">
                                {/* 12131 */}
                                <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] bg-white">
                                    <img src={favoriteshops} alt="favoriteshop" />
                                    <span className="text-[#FF2AA1] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">ショップをフォロー</span>
                                </button>
                                        </div>
                                                </div>
                        <div className="flex p-[16px_8px] items-center gap-[32px] self-stretch border-b border-[#E9E9E9]">
                            {/* 121 */}
                            <div className="flex items-start flex-1">
                                {/* 1211 */}
                                <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start">
                                    {/* 12111 */}
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={girl} alt="girl" />
                                                </div>
                                            </div>
                                {/* 1212 */}
                                <div className="flex flex-col justify-center items-start flex-1">
                                    <span className="text-[#000] font-bold text-[21px] leading-[32px] font-['Noto Sans JP']">anchiy1005</span>
                                    <span className="self-stretch text-[#000] font-normal text-[14px] leading-[21px] font-['Noto Sans JP'] mt-[8px]">こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！</span>
                                            </div>
                                        </div>
                            {/* 1213 */}
                            <div className="flex h-[48px] justify-end items-center">
                                {/* 12131 */}
                                <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] bg-[#FF2AA1]">
                                    <img src={favoriteshops_follow} alt="favoriteshop" />
                                    <span className="text-[#fff] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">フォロー中</span>
                                </button>
                                            </div>
                                        </div>
                        <div className="flex p-[16px_8px] items-center gap-[32px] self-stretch border-b border-[#E9E9E9]">
                            {/* 121 */}
                            <div className="flex items-start flex-1">
                                {/* 1211 */}
                                <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start">
                                    {/* 12111 */}
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={girl} alt="girl" />
                                    </div>
                                        </div>
                                {/* 1212 */}
                                <div className="flex flex-col justify-center items-start flex-1">
                                    <span className="text-[#000] font-bold text-[21px] leading-[32px] font-['Noto Sans JP']">anchiy1005</span>
                                    <span className="self-stretch text-[#000] font-normal text-[14px] leading-[21px] font-['Noto Sans JP'] mt-[8px]">こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！</span>
                                            </div>
                                        </div>
                            {/* 1213 */}
                            <div className="flex h-[48px] justify-end items-center">
                                {/* 12131 */}
                                <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] bg-white">
                                    <img src={favoriteshops} alt="favoriteshop" />
                                    <span className="text-[#FF2AA1] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">ショップをフォロー</span>
                                            </button>
                                        </div>
                                    </div>
                    </div>
                </div >
            </main >
            {/* Mobile Main Section */}
            <main className="flex md:hidden flex-col items-center self-stretch w-full bg-white">
                {/* Title (mobile) */}
                <div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1] w-full">
                    <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">お気に入り</h1>
                </div>
                {/* Frame 13 (mobile) */}
                <TabButtons 
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                    tabs={[
                        {
                            id: 'follow',
                            label: 'フォロー中ショップ',
                            textSize: 'text-[14px] leading-[24px]',
                            whitespace: 'whitespace-nowrap'
                        },
                        {
                            id: 'favorite',
                            label: 'お気に入り商品',
                            textSize: 'text-[12px] leading-[16.1px]'
                        }
                    ]}
                    className="mt-[24px]"
                />
                {/* Frame 12 (mobile) */}
                <div className="flex flex-col items-start w-full self-stretch mt-[16px]">
                    {/* Favorite Shops Content (Mobile) */}
                    <div className="flex p-[16px_16px] items-center gap-[32px] w-full border-b border-[#E9E9E9] ">
                        {/* 121 */}
                        <div className="flex items-start flex-1">
                            {/* 1211 */}
                            <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start ">
                                {/* 12111 */}
                                <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                    <img src={girl} alt="girl" />
                              </div>
                            </div>
                            {/* 1212 */}
                            <div className="flex flex-col justify-center items-start flex-1">
                                <span className="text-[#000] font-bold text-[16px] leading-[20px] font-['Noto Sans JP']">anchiy1005</span>
                                <span className="self-stretch text-[#000] font-normal text-[12px] leading-[18px] font-['Noto Sans JP'] mt-[8px]">こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！</span>
                                {/* 1213 */}
                                <div className="flex h-[48px] justify-end items-center">
                                    {/* 12131 */}
                                    <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] bg-white">
                                        <img src={favoriteshops} alt="favoriteshop" />
                                        <span className="text-[#FF2AA1] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">ショップをフォロー</span>
                                    </button>
                              </div>
                            </div>
                          </div>
                        </div>
                    <div className="flex p-[16px_16px] items-center gap-[32px] w-full border-b border-[#E9E9E9]">
                        {/* 121 */}
                        <div className="flex items-start flex-1">
                            {/* 1211 */}
                            <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start">
                                {/* 12111 */}
                                <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                    <img src={girl} alt="girl" />
                              </div>
                            </div>
                            {/* 1212 */}
                            <div className="flex flex-col justify-center items-start flex-1">
                                <span className="text-[#000] font-bold text-[16px] leading-[20px] font-['Noto Sans JP']">anchiy1005</span>
                                <span className="self-stretch text-[#000] font-normal text-[12px] leading-[18px] font-['Noto Sans JP'] mt-[8px]">こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！</span>
                            </div>
                            {/* 1213 */}
                            <div className="flex h-[48px] justify-end items-center">
                                {/* 12131 */}
                                <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] bg-[#FF2AA1]">
                                    <img src={favoriteshops_follow} alt="favoriteshop" />
                                    <span className="text-[#fff] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">フォロー中</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-[16px_16px] items-center gap-[32px] w-full border-b border-[#E9E9E9]">
                        {/* 121 */}
                        <div className="flex items-start flex-1">
                            {/* 1211 */}
                            <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start">
                                {/* 12111 */}
                                <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                    <img src={girl} alt="girl" />
                                </div>
                            </div>
                            {/* 1212 */}
                            <div className="flex flex-col justify-center items-start flex-1">
                                <span className="text-[#000] font-bold text-[16px] leading-[20px] font-['Noto Sans JP']">anchiy1005</span>
                                <span className="self-stretch text-[#000] font-normal text-[12px] leading-[18px] font-['Noto Sans JP'] mt-[8px]">こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！</span>
                                {/* 1213 */}
                                <div className="flex h-[48px] justify-end items-center">
                                    {/* 12131 */}
                                    <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] bg-white">
                                        <img src={favoriteshops} alt="favoriteshop" />
                                        <span className="text-[#FF2AA1] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">ショップをフォロー</span>
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {/* Mobile Main Section */}
        </div >
    );
};

export default FavoriteShops;