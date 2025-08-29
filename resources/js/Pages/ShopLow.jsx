import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ProductCarousel from '@/Components/ProductCarousel';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shoptop/photo4.png';
import photo2 from '@/assets/images/shoptop/photo1.png';
import photo3 from '@/assets/images/shoptop/photo2.png';
import photo4 from '@/assets/images/shoptop/photo3.png';
import girl from '@/assets/images/favoriteshops/girl.svg';
import instagram from '@/assets/images/instagram.svg';
import x from '@/assets/images/x_logo.svg';
import favoriteshop from '@/assets/images/favoriteshop.svg';
import heart from '@/assets/images/heart.png';
import arrow_right from '@/assets/images/arrow_right.svg';
import arrow_left from '@/assets/images/arrow_left.svg';
import recyclebin from '@/assets/images/recyclebin.svg';
import pencil_line_black from '@/assets/images/pencil_line_black.svg';
import share from '@/assets/images/share.svg';

// Add this above the return statement in the shoptop component
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

const ShopLow = () => {
    return (
        <div className="bg-white">
            <Header />
            {/* Section 1 (Mobile) */}
            <section className="flex flex-col items-start py-[32px] px-[16px] gap-[16px] w-full bg-white md:hidden ">
                <div className="flex flex-row items-center gap-[4px] py-[4px] self-stretch">
                    <div className="flex flex-row items-center justify-center w-[20px] h-[15px] p-[1.25px_1px_0.625px_0.625px]">
                        <img src={arrow_left} alt="arrow left" className="w-[18.375px] h-[13.125px]" />
                    </div>
                    <span className="text-[#000] font-noto text-[14px] font-medium leading-[18px]">ショップに戻る</span>
                </div>
                <div className="flex flex-col items-start self-stretch w-full gap-[8px]">
                    <div className="inline-flex h-[40px] flex-row items-center">
                        <img src={girl} alt="girl" className="w-[40px] h-[40px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                        <span className="ml-2 text-[#222] font-noto text-[16px] leading-[18px] font-bold">anchly1005</span>
                    </div>
                    <div className="flex flex-row items-center gap-[4px] self-stretch">
                        <div className="flex flex-row items-center gap-[4px] pr-[24px] self-stretch">
                            <img src={recyclebin} alt="recyclebin" className="w-[16px] h-[16px]" />
                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[18px]">削除</span>
                        </div>
                        <div className="flex flex-row items-center gap-[4px] pr-[24px] self-stretch">
                            <img src={pencil_line_black} alt="pencil_line_black" className="w-[16px] h-[16px]" />
                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[18px]">編集</span>
                        </div>
                        <div className="flex flex-row items-center gap-[4px] pr-[24px] self-stretch">
                            <img src={share} alt="share" className="w-[16px] h-[16px]" />
                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[18px]">シェア</span>
                        </div>
                    </div>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex pt-[12px] pb-[6px] gap-[12px] items-center w-full">
                        <span className="text-[#363636] font-noto font-bold text-[16px] leading-[20px]">新しいリスト</span>
                        <span className="text-[#ACACAC] font-noto text-[16px] font-normal leading-[24px]">16点</span> 
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
                    <span className="text-[#000] font-noto text-[16px] font-normal leading-[24px]">一覧に戻る</span>
                </div>
                
                <div className="flex flex-row items-start justify-between self-stretch w-full">
                    <div className="inline-flex h-[64px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                        <img src={girl} alt="girl" className="w-[64px] h-[64px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                        <span className="ml-2 text-[#222] font-noto text-[21px] leading-[32px] font-bold">anchly1005</span>
                    </div>
                    <div className="flex flex-row items-center gap-[4px] self-stretch">
                        <div className="flex flex-row items-center gap-[4px] pl-[24px] self-stretch">
                            <img src={recyclebin} alt="recyclebin" className="w-[16px] h-[16px]" />
                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[18px]">削除</span>
                        </div>
                        <div className="flex flex-row items-center gap-[4px] pl-[24px] self-stretch">
                            <img src={pencil_line_black} alt="pencil_line_black" className="w-[16px] h-[16px]" />
                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[18px]">編集</span>
                        </div>
                        <div className="flex flex-row items-center gap-[4px] pl-[24px] self-stretch">
                            <img src={share} alt="share" className="w-[16px] h-[16px]" />
                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[18px]">シェア</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex w-[277px] py-[25px] pr-0 pb-[6px] pl-0 items-center gap-[12px]">
                        <span className="text-[#000] font-noto text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">新しいリスト</span>
                        <span className="text-[#ACACAC] font-noto text-[16px] font-normal leading-[24px]">16点</span>                        
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

export default ShopLow;