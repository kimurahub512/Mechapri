import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import TabButtons from '@/Components/TabButtons';
import TabButtonsDesktop from '@/Components/TabButtonsDesktop';
import FavoriteShopButton from '@/Components/FavoriteShopButton';
import '@/../../resources/css/shopmanagement.css';
import girl from '@/assets/images/favoriteshops/girl.svg';

const FavoriteShops = ({ favoriteShops }) => {
    const [activeTab, setActiveTab] = useState('follow'); // Default to follow tab

    const handleTabChange = (tabId) => {
        if (tabId === 'favorite') {
            router.visit('/favoriteproducts');
        } else {
            setActiveTab(tabId);
        }
    };

    const renderShopItem = (shop, isMobile = false) => {
        return (
            <div key={shop.id} className={`flex p-[16px_${isMobile ? '16px' : '8px'}] items-center gap-[32px] ${isMobile ? 'w-full' : 'self-stretch'} border-b border-[#E9E9E9]`}>
                <div className="flex flex-1">
                    <Link 
                        href={`/${shop.id}`} 
                        className="flex items-start flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="flex w-[82px] h-[66px] pr-[16px] flex-col items-start">
                            <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                <img 
                                    src={shop.image || girl} 
                                    alt={shop.name} 
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start flex-1">
                            <span className={`text-[#000] font-bold ${isMobile ? 'text-[16px] leading-[20px]' : 'text-[21px] leading-[32px]'} font-noto`}>
                                {shop.name}
                            </span>
                            <span className={`self-stretch text-[#000] font-normal ${isMobile ? 'text-[12px] leading-[18px]' : 'text-[14px] leading-[21px]'} font-noto mt-[8px]`}>
                                {shop.shop_description || `${shop.name}'s shop`}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex h-[48px] justify-end items-center">
                    <FavoriteShopButton
                        shopUserId={shop.id}
                        initialIsFavorited={true}
                        isMobile={isMobile}
                        refreshOnToggle={false}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white">
            <Header />
            {/* Desktop Main Section */}
            <main className="hidden md:flex flex-col items-center self-stretch min-h-[1020px] pb-[60px] bg-white pt-[98px]">
                <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[32px]">
                    <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1]">
                        <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-noto self-stretch">お気に入り</h1>
                    </div>
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
                    <div className="flex flex-col items-start self-stretch">
                        {favoriteShops.length > 0 ? (
                            favoriteShops.map(shop => renderShopItem(shop))
                        ) : (
                            <div className="flex justify-center items-center w-full p-8">
                                <span className="text-gray-500 text-lg">フォロー中のショップはありません</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Main Section */}
            <main className="flex md:hidden flex-col items-center self-stretch w-full bg-white pt-[80px]">
                <div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1] w-full">
                    <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">お気に入り</h1>
                </div>
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
                <div className="flex flex-col items-start w-full self-stretch mt-[16px]">
                    {favoriteShops.length > 0 ? (
                        favoriteShops.map(shop => renderShopItem(shop, true))
                    ) : (
                        <div className="flex justify-center items-center w-full p-8">
                            <span className="text-gray-500 text-base">フォロー中のショップはありません</span>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FavoriteShops;