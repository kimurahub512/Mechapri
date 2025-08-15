import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ProductCarousel from '@/Components/ProductCarousel';
import FavoriteShopButton from '@/Components/FavoriteShopButton';
import '@/../../resources/css/shopmanagement.css';
import default_user from '@/assets/images/default-user.png';
import instagram from '@/assets/images/instagram.svg';
import x from '@/assets/images/x_logo.svg';
import favoriteshop from '@/assets/images/favoriteshop.svg';
import arrow_right from '@/assets/images/arrow_right.svg';
import mountain from '@/assets/images/mountain_gray.svg';
import {vwd, vw, responsiveTextD, responsiveText, vwR, responsiveMetricR, responsiveTextR} from '@/lib/utils';

const shoptop = () => {
    const { shopData, latestProducts, categoryProducts, auth } = usePage().props;
    console.log('categoryProducts', categoryProducts);
    
    // Check if current user has favorited this shop
    const isFavorited = shopData?.is_favorited_by_current_user || false;
    return (
        <div className="bg-white">
            <Header />
            {/* Section 1 (Mobile) */}
            <section className="flex flex-col items-start w-full bg-white md:hidden" style={{ paddingTop: vw(32), paddingBottom: vw(32), paddingLeft: vw(16), paddingRight: vw(16) }}>
                {/* Frame 11 */}
                <div className="flex flex-col items-start self-stretch" style={{ paddingBottom: vw(32), gap: vw(24) }}>
                    {/* 111 */}
                    <div className="flex flex-col items-start self-stretch" style={{ gap: vw(12) }}>
                        {/* 1111 */}
                        <div className="flex items-start self-stretch" style={{ paddingRight: vw(103) }}>
                            {/* 11111 */}
                            <div className="flex flex-col items-start" style={{ width: vw(82), minWidth: vw(64), minHeight: vw(48), paddingRight: vw(16) }}>
                                                            {/* 111111: User Image */}
                            <div className="flex justify-center items-center" style={{ width: vw(64), height: vw(64) }}>
                                <img src={shopData?.image || default_user} alt="user" className="rounded-full object-cover" style={{ width: vw(64), height: vw(64) }} />
                            </div>
                            </div>
                            {/* 11112 */}
                            <div className="flex flex-col justify-center items-start" style={{ width: vw(158), paddingRight: vw(62), gap: vw(4) }}>
                                <span style={{ ...responsiveText(18, 18, null, 'bold', 'noto', '#000') }}>{shopData?.shop_title || 'Shop'}</span>
                                {/* 111121 */}
                                <div className="flex flex-col items-start" style={{ gap: vw(4) }}>
                                    <span className='whitespace-nowrap' style={{ ...responsiveText(13, 21, null, 'normal', 'noto', '#000') }}>お気に入り登録者 {shopData?.follower_count || 0}人</span>
                                    <span className='whitespace-nowrap' style={{ ...responsiveText(13, 21, null, 'normal', 'noto', '#000') }}>アイテム数 {shopData?.product_count || 0}</span>
                                </div>
                                {/* 111122 */}
                                <div className="flex items-end" style={{ width: vw(108), height: vw(44), gap: vw(4) }}>
                                    {shopData?.xlink && (
                                        <a href={`https://x.com/${shopData.xlink}`} target="_blank" rel="noopener noreferrer">
                                            <img src={x} alt="x" className="flex justify-center items-center aspect-square cursor-pointer hover:opacity-80 transition-opacity" style={{ width: vw(36), height: vw(36), padding: vw(2.571), paddingLeft: vw(1.286), paddingRight: vw(1.286), paddingBottom: vw(1.286) }} />
                                        </a>
                                    )}
                                    {shopData?.instagram && (
                                        <a href={`https://instagram.com/${shopData.instagram}`} target="_blank" rel="noopener noreferrer">
                                            <img src={instagram} alt="instagram" className="flex justify-center items-center aspect-square cursor-pointer hover:opacity-80 transition-opacity" style={{ width: vw(36), height: vw(36), padding: vw(2.571), paddingLeft: vw(1.286), paddingRight: vw(1.286), paddingBottom: vw(1.286) }} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* 1112 */}
                        <div className="flex justify-end items-center self-stretch" style={{ gap: vw(8) }}>
                            <span style={{ ...responsiveText(16, 16, null, 'normal', 'noto', '#000') }}>{shopData?.follower_count || 0}人が登録</span>
                            {/* 11121: Follow button */}
                            {auth?.user && auth.user.id !== shopData?.id && (
                                <FavoriteShopButton 
                                    shopUserId={shopData?.id}
                                    initialIsFavorited={isFavorited}
                                    isMobile={true}
                                    refreshOnToggle={true}
                                />
                            )}
                        </div>
                        {/* 112: Description */}
                        <div className="flex flex-col items-start self-stretch" style={{ maxWidth: vw(1248) }}>
                            <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#000') }}>
                                {shopData?.shop_description || 'ショップの説明がありません。'}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-start w-full" style={{ gap: vw(8) }}>
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex items-center w-full" style={{ paddingTop: vw(12), paddingBottom: vw(6), gap: vw(12) }}>
                        <span style={{ ...responsiveText(16, 16, null, 'bold', 'noto', '#363636') }}>最新の出品</span>
                        <img src={arrow_right} alt="arrow right" style={{ width: vw(20), height: vw(20) }} />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={latestProducts || []} 
                        isMobile={true}
                        horizontalScroll={true}
                    />
                </div>
                {/* Category Sections */}
                {categoryProducts.length? (categoryProducts.map((categorySection, index) => (
                    <div key={categorySection.category.id} className="flex flex-col items-start w-full" style={{ gap: vw(8) }}>
                        {/* 211: Category Title + arrow */}
                        <a href={`/shop-newcategory/${categorySection.category.id}`} className="flex items-center w-full cursor-pointer hover:opacity-80 transition-opacity" style={{ paddingTop: vw(12), paddingBottom: vw(6), gap: vw(12) }}>
                            <span style={{ ...responsiveText(16, 16, null, 'bold', 'noto', '#363636') }}>{categorySection.category.title}</span>
                            <img src={arrow_right} alt="arrow right" style={{ width: vw(20), height: vw(20) }} />
                        </a>
                        {/* 212: Product List */}
                        <ProductCarousel 
                            products={categorySection.products || []} 
                            isMobile={true}
                            horizontalScroll={true}
                        />
                    </div>
                ))):(
                    <div className="flex flex-col items-start self-stretch" style={{ gap: vwR(8, 8), paddingTop: vwR(12, 25) }}>
                        <span style={{...responsiveTextR(16, 20, 'bold', 24, 37, 'bold', 'noto', '#000')}}>新しいリスト</span>
                        <div className="flex flex-col items-center justify-center" style={{...responsiveMetricR(343, 320, 1200, 320)}}>
                            <div className="flex flex-col items-center justify-center ">
                                <img src={mountain} alt="add" style={{...responsiveMetricR(24, 24, 24, 24)}} />
                                <span style={{...responsiveTextR(16, 32, 'bold', 16, 32, 'bold', 'noto', '#767676')}}>リストはありません</span>
                                <span style={{...responsiveTextR(12, 24, 'medium', 12, 24, 'medium', 'noto', '#767676')}}>商品をリストに追加しましょう</span>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            {/* Section 1 (Desktop) */}
            <section className="hidden md:flex flex-col justify-center items-center bg-white" style={{ paddingTop: vwd(32), paddingBottom: vwd(32), marginTop: vwd(32) }}>
                {/* Frame 11 */}
                <div className="relative w-full" style={{ height: vwd(254), maxWidth: vwd(1200) }}>
                    {/* 111: User Image */}
                    <div className="absolute top-0 left-0 flex justify-center items-center rounded-full bg-cover bg-center" style={{ width: vwd(162), height: vwd(162), left: vwd(16), backgroundImage: `url(${shopData?.image || default_user})` }} />
                    {/* 112: Shop Title */}
                    <span className="absolute text-[#000] font-noto font-medium" style={{ ...responsiveTextD(24, 24, null, 'medium', 'noto', '#000'), top: vwd(34), left: vwd(191) }}>{shopData?.shop_title || 'Shop'}</span>
                    {/* 113: Follower count and item count */}
                    <span className="absolute text-[#000] font-noto font-normal" style={{ ...responsiveTextD(16, 16, null, 'normal', 'noto', '#000'), top: vwd(66), left: vwd(191) }}>お気に入り登録者 {shopData?.follower_count || 0}人 アイテム数 {shopData?.product_count || 0}</span>
                    {/* 114: SNS */}
                    <div className="absolute flex items-start" style={{ width: vwd(108), maxWidth: vwd(1248), top: vwd(100), left: vwd(191), gap: vwd(4), paddingTop: vwd(10) }}>
                        {shopData?.xlink && (
                            <a href={`https://x.com/${shopData.xlink}`} target="_blank" rel="noopener noreferrer">
                                <img src={x} alt="x" className="flex justify-center items-center aspect-square opacity-100 cursor-pointer hover:opacity-80 transition-opacity" style={{ width: vwd(52), height: vwd(52), padding: vwd(3.714), paddingLeft: vwd(1.857), paddingRight: vwd(1.857), paddingBottom: vwd(1.857) }} />
                            </a>
                        )}
                        {shopData?.instagram && (
                            <a href={`https://instagram.com/${shopData.instagram}`} target="_blank" rel="noopener noreferrer">
                                <img src={instagram} alt="instagram" className="flex justify-center items-center aspect-square opacity-100 cursor-pointer hover:opacity-80 transition-opacity" style={{ width: vwd(52), height: vwd(52), padding: vwd(3.714), paddingLeft: vwd(1.857), paddingRight: vwd(1.857), paddingBottom: vwd(1.857) }} />
                            </a>
                        )}
                    </div>
                    {/* 115: Follower count + 1151 */}
                    <div className="absolute inline-flex items-center" style={{ top: vwd(106), right: vwd(16), gap: vwd(8) }}>
                        <span className="text-[#000] font-noto font-normal" style={{ ...responsiveTextD(16, 16, null, 'normal', 'noto', '#000') }}>{shopData?.follower_count || 0}人が登録</span>
                        {/* 1151: Follow button */}
                        {auth?.user && auth.user.id !== shopData?.id && (
                            <FavoriteShopButton 
                                shopUserId={shopData?.id}
                                initialIsFavorited={isFavorited}
                                isMobile={false}
                                refreshOnToggle={true}
                            />
                        )}
                    </div>
                    {/* 116: Description */}
                    <div className="absolute flex flex-col items-start self-stretch" style={{ top: vwd(194), left: vwd(16), maxWidth: vwd(1248) }}>
                        <div className="flex flex-col items-start self-stretch" style={{ maxWidth: vwd(1248) }}>
                            <span className="text-[#000] font-noto font-normal" style={{ ...responsiveTextD(16, 27, null, 'normal', 'noto', '#000') }}>
                                {shopData?.shop_description || 'ショップの説明がありません。'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section 2 (Desktop) */}
            <section className="hidden md:flex flex-col items-start w-full bg-white" style={{ paddingTop: vwd(80), paddingBottom: vwd(80), paddingLeft: vwd(120), paddingRight: vwd(120) }}>
                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                    {/* 211: 最新の出品 + arrow */}
                    <a href='/shop-newproducts' className="flex items-center" style={{ width: vwd(277), paddingTop: vwd(25), paddingRight: 0, paddingBottom: vwd(6), paddingLeft: 0, gap: vwd(12) }}>
                        <span className="text-[#000] font-noto font-bold" style={{ ...responsiveTextD(24, 24, null, 'bold', 'noto', '#000'), letterSpacing: vwd(1.05) }}>最新の出品</span>
                        <img src={arrow_right} alt="arrow right" style={{ width: vwd(24), height: vwd(24) }} />
                    </a>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={latestProducts || []} 
                        isMobile={false}
                        horizontalScroll={true}
                    />
                </div>
                {/* Category Sections */}
                {categoryProducts?.length > 0 ? (categoryProducts.map((categorySection, index) => (
                    <div key={categorySection.category.id} className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                        {/* 211: Category Title + arrow */}
                        <a href={`/shop-newcategory/${categorySection.category.id}`} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: vwd(277), paddingTop: vwd(25), paddingRight: 0, paddingBottom: vwd(6), paddingLeft: 0, gap: vwd(12) }}>
                            <span className="text-[#000] font-noto font-bold" style={{ ...responsiveTextD(24, 24, null, 'bold', 'noto', '#000'), letterSpacing: vwd(1.05) }}>{categorySection.category.title}</span>
                            <img src={arrow_right} alt="arrow right" style={{ width: vwd(24), height: vwd(24) }} />
                        </a>
                        {/* 212: Product List */}
                        <ProductCarousel 
                            products={categorySection.products || []} 
                            isMobile={false}
                            horizontalScroll={true}
                        />
                    </div>
                ))):
                (
                    <div className="flex flex-col items-start self-stretch" style={{ gap: vwR(8, 8), paddingTop: vwR(12, 25) }}>
                        <span style={{...responsiveTextR(16, 20, 'bold', 24, 37, 'bold', 'noto', '#000')}}>新しいリスト</span>
                        <div className="flex flex-col items-center justify-center" style={{...responsiveMetricR(343, 320, 1200, 320)}}>
                            <div className="flex flex-col items-center justify-center">
                                <img src={mountain} alt="add" style={{...responsiveMetricR(24, 24, 24, 24)}} />
                                <span style={{...responsiveTextR(16, 32, 'bold', 16, 32, 'bold', 'noto', '#767676')}}>リストはありません</span>
                                <span style={{...responsiveTextR(12, 24, 'medium', 12, 24, 'medium', 'noto', '#767676')}}>商品をリストに追加しましょう</span>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default shoptop;