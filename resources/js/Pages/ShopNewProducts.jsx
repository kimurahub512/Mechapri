import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ProductCarousel from '@/Components/ProductCarousel';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/Shoptop/photo4.png';
import photo2 from '@/assets/images/Shoptop/photo1.png';
import photo3 from '@/assets/images/Shoptop/photo2.png';
import photo4 from '@/assets/images/Shoptop/photo3.png';
import girl from '@/assets/images/favoriteshops/girl.svg';
import instagram from '@/assets/images/instagram.svg';
import x from '@/assets/images/x_logo.svg';
import favoriteshop from '@/assets/images/favoriteshop.svg';
import heart from '@/assets/images/heart.svg';
import arrow_right from '@/assets/images/arrow_right.svg';
import arrow_left from '@/assets/images/arrow_left.svg';

// Add this above the return statement in the Shoptop component
const products = [
    {
        id: 1,
        title: 'Gウェルネス💪疲れ知らず',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '3枚セット',
        price: '無料',
        like: 0,
        badge1: '1日',
        badge2: '以内',
    },
    {
        id: 2,
        title: 'リラックスセット',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '2枚セット',
        price: '500円',
        like: 12,
        badge1: '2日',
        badge2: '以内',
    },
    {
        id: 3,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 4,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 5,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 6,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 7,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 8,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 9,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 10,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 11,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 12,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 13,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
    {
        id: 14,
        title: 'エナジードリンク',
        image: photo1,
        badges: [photo2, photo3, photo4],
        badgeText: '1枚セット',
        price: '100円',
        like: 5,
        badge1: '3日',
        badge2: '以内',
    },
];

const ShopNewProducts = () => {
    return (
        <div className="bg-white">
            <Header />
            {/* Section 1 (Mobile) */}
            <section className="flex flex-col items-start py-[32px] px-[16px] gap-[16px] w-full bg-white md:hidden ">
                <div className="flex flex-row items-center gap-[4px] py-[4px] self-stretch">
                    <div className="flex flex-row items-center justify-center w-[20px] h-[15px] p-[1.25px_1px_0.625px_0.625px]">
                        <img src={arrow_left} alt="arrow left" className="w-[18.375px] h-[13.125px]" />
                    </div>
                    <span className="text-[#000] font-['Noto Sans JP'] text-[14px] font-medium leading-[18px]">ショップに戻る</span>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex pt-[12px] pb-[6px] items-center w-full">
                        <span className="text-[#363636] font-['Noto Sans JP'] font-bold text-[16px] leading-[20px]">最新の出品</span>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={products}
                        isMobile={true}
                    />
                </div>
                
            </section>
            {/* Section 1 (Desktop) */}
            <section className="hidden md:flex flex-col justify-center items-start pt-[32px] pb-[80px] px-[120px] gap-[10px] bg-white ">
                {/* Frame 11 */}
                <div className="flex flex-row items-center gap-[4px] py-[4px] self-stretch">
                    <div className="flex flex-row items-center justify-center w-[20px] h-[15px] p-[1.25px_1px_0.625px_0.625px]">
                        <img src={arrow_left} alt="arrow left" className="w-[18.375px] h-[13.125px]" />
                    </div>
                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[24px]">ショップに戻る</span>
                </div>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex w-[277px] py-[25px] pr-0 pb-[6px] pl-0 items-center gap-[12px]">
                        <span className="text-[#000] font-['Noto Sans JP'] text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">最新の出品</span>
                        <img src={arrow_right} alt="arrow right" className="w-[24px] h-[24px]" />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={products}
                        isMobile={false}
                        rowCnt={3}
                    />
                </div>
            </section>
            {/* </section> */}

            <Footer />
        </div>
    );
};

export default ShopNewProducts;