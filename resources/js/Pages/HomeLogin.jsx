import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ProductCarousel from '@/Components/ProductCarousel';
import '@/../../resources/css/shopmanagement.css';
import list from '@/assets/images/list_unordered.svg';
import arrow from '@/assets/images/arrow_right.svg';


const HomeLogin = ({ 
    favoriteShopsNewProducts = [], 
    purchaseHistory = [], 
    recommendedProducts = [] 
}) => {
    const handleProductClick = (product) => {
        router.visit(`/user/${product.user.id}/unpurchasedproduct/${product.id}`);
    };

    const handleViewAll = (section) => {
        switch (section) {
            case 'recommended':
                // Navigate to recommended products page or show all
                break;
            case 'favoriteShops':
                // Navigate to favorite shops page
                router.visit('/favoriteshops');
                break;
            case 'purchaseHistory':
                // Navigate to purchase history page
                router.visit('/purchasehistory');
                break;
            default:
                break;
        }
    };
    return (
        <div className='product-details-no-footer-gap bg-[#FFF]'>
            <Header />
            {/* Desktop Main Section */}
            <main className="hidden md:flex flex-col items-center px-[120px] py-[32px] w-full">
                <div className="flex flex-row items-center justify-between p-[10px] w-full border-b border-solid border-[#DCDCDC]">
                    <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">
                        おすすめ写真
                    </span>
                    <div 
                        className="flex flex-row items-center p-[12px] gap-[4px] cursor-pointer"
                        onClick={() => handleViewAll('recommended')}
                    >
                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                            詳細を見る
                        </span>
                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                    </div>
                </div>
                <div className="flex p-[16px] items-center gap-[16px] self-stretch">
                    <ProductCarousel
                        products={recommendedProducts}
                        isMobile={false}
                        haveAccount={true}
                    />
                </div>
                <div className="flex flex-row items-center justify-between p-[10px] w-full border-b border-solid border-[#DCDCDC]">
                    <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">
                        お気に入りショップの新着写真
                    </span>
                    <div 
                        className="flex flex-row items-center p-[12px] gap-[4px] cursor-pointer"
                        onClick={() => handleViewAll('favoriteShops')}
                    >
                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                            詳細を見る
                        </span>
                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                    </div>
                </div>
                <div className="flex p-[16px] items-center gap-[16px] self-stretch">
                    <ProductCarousel
                        products={favoriteShopsNewProducts}
                        isMobile={false}
                        haveAccount={true}
                    />
                </div>
                <div className="flex flex-row items-center justify-between p-[10px] w-full border-b border-solid border-[#DCDCDC]">
                    <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">
                        購入履歴
                    </span>
                    <div 
                        className="flex flex-row items-center p-[12px] gap-[4px] cursor-pointer"
                        onClick={() => handleViewAll('purchaseHistory')}
                    >
                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                            詳細を見る
                        </span>
                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                    </div>
                </div>
                {purchaseHistory.length === 0 ? (
                    <div className="text-center py-12 w-full">
                        <p className="text-[#363636] text-lg">購入履歴がありません</p>
                    </div>
                ) : (
                    purchaseHistory.map((purchase) => (
                        <div key={purchase.id} className="flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] relative">
                            <div 
                                className="flex w-[228px] h-[228px] p-[4.488px_40.394px_2.693px_40.394px] justify-center items-center rounded-[8.976px] bg-[#F6F6F6] cursor-pointer"
                                onClick={() => handleProductClick(purchase)}
                            >
                                <img 
                                    src={purchase.files?.[0]?.url ? `/storage/${purchase.files[0].file_path}` : '/default-product-image.jpg'} 
                                    alt={purchase.title}
                                    className="w-full h-full object-cover rounded-[8.976px]"
                                />
                            </div>
                            {/* Info Block */}
                            <div 
                                className="flex flex-col h-[118px] pr-[32px] justify-between items-start flex-1 cursor-pointer"
                                onClick={() => handleProductClick(purchase)}
                            >
                                {/* 1211: Title&Badge and User Info stacked */}
                                <div className="flex flex-col ">
                                    {/* Title & Badge */}
                                    <div className="inline-flex items-center gap-2">
                                        <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-noto">{purchase.title}</span>
                                        <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[13px] leading-[15px] font-noto">{purchase.image_cnt}枚セット</span>
                                    </div>

                                    <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px] mt-[32px]">
                                        <span className="mt-[14px] text-[#222] font-noto text-[20px] leading-[23px] font-bold">¥</span>
                                        <span className="ml-[6px] text-[#222] font-noto text-[32px] leading-[48px] font-bold">{purchase.total_price}</span>
                                        <span className="mt-[14px] ml-[10px] text-[#222] font-noto text-[14px] leading-[22px] font-normal">¥{purchase.price}x{purchase.quantity}枚</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
            {/* Mobile Main Section */}
            <section className="flex flex-col items-start py-[24px] px-[16px] w-full bg-white md:hidden">
                <div className="md:hidden flex flex-col items-start gap-[8px] w-full">
                    <div className="flex flex-col items-left pt-[12px] gap-[6px] w-full border-b border-solid border-[#DCDCDC]">
                        <span className="text-[#363636] font-noto text-[14px] font-bold leading-[14px]">
                            おすすめ写真
                        </span>
                        <div 
                            className="flex flex-row items-center py-[12px] gap-[4px] cursor-pointer"
                            onClick={() => handleViewAll('recommended')}
                        >
                            <img src={list} alt="list" className="w-[16px] h-[16px]" />
                            <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                詳細を見る
                            </span>
                            <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                        </div>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={recommendedProducts}
                        isMobile={true}
                    />
                </div>
                <div className="md:hidden flex flex-col items-start gap-[8px] w-full">
                    <div className="flex flex-col items-left pt-[12px] gap-[6px] w-full border-b border-solid border-[#DCDCDC]">
                        <span className="text-[#363636] font-noto text-[14px] font-bold leading-[14px]">
                            お気に入りショップの新着写真
                        </span>
                        <div 
                            className="flex flex-row items-center py-[12px] gap-[4px] cursor-pointer"
                            onClick={() => handleViewAll('favoriteShops')}
                        >
                            <img src={list} alt="list" className="w-[16px] h-[16px]" />
                            <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                詳細を見る
                            </span>
                            <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                        </div>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={favoriteShopsNewProducts}
                        isMobile={true}
                    />
                </div>

                <div className="md:hidden flex flex-col items-start gap-[8px] w-full">
                    <div className="flex flex-col items-left pt-[12px] gap-[6px] w-full border-b border-solid border-[#DCDCDC]">
                        <span className="text-[#363636] font-noto text-[14px] font-bold leading-[14px]">
                            購入履歴
                        </span>
                        <div 
                            className="flex flex-row items-center py-[12px] gap-[4px] cursor-pointer"
                            onClick={() => handleViewAll('purchaseHistory')}
                        >
                            <img src={list} alt="list" className="w-[16px] h-[16px]" />
                            <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                詳細を見る
                            </span>
                            <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                        </div>
                    </div>
                    {purchaseHistory.length === 0 ? (
                        <div className="text-center py-8 w-full">
                            <p className="text-[#363636] text-base">購入履歴がありません</p>
                        </div>
                    ) : (
                        purchaseHistory.map((purchase) => (
                            <div key={purchase.id} className="flex p-[16px_16px_40px_0] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] relative">
                                <div className="flex flex-row gap-[16px]">
                                    <div 
                                        className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6] cursor-pointer"
                                        onClick={() => handleProductClick(purchase)}
                                    >
                                        <img 
                                            src={purchase.files?.[0]?.url ? `/storage/${purchase.files[0].file_path}` : '/default-product-image.jpg'} 
                                            alt={purchase.title}
                                            className="w-full h-full object-cover rounded-[2.52px]"
                                        />
                                    </div>
                                    {/* Title & Badge */}
                                    <div 
                                        className="flex flex-col items-start gap-[2px] cursor-pointer"
                                        onClick={() => handleProductClick(purchase)}
                                    >
                                        <span className="text-[#363636] font-normal text-[14px] leading-[21px] font-noto">{purchase.title}</span>
                                        <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[12px] leading-[15px] font-noto">{purchase.image_cnt}枚セット</span>
                                        <div className="inline-flex flex-row items-center flex-shrink-0 rounded-[3px]">
                                            <span className="ml-[6px] text-[#222] font-noto text-[18px] leading-[20px] font-bold">{purchase.total_price}</span>
                                            <span className="mt-[4px] text-[#222] font-noto text-[12px] leading-[12px] font-bold">円</span>
                                            <span className="mt-[4px] ml-[10px] text-[#222] font-noto text-[12px] leading-[12px] font-medium">¥{purchase.price}x{purchase.quantity}枚</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomeLogin;