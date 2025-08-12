import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
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
import heart from '@/assets/images/heart.svg';
import arrow_right from '@/assets/images/arrow_right.svg';
import arrow_left from '@/assets/images/arrow_left.svg';



const ShopNewProducts = () => {
    const { productBatches } = usePage().props;

    // Transform productBatches to match the expected format for ProductCarousel
    const transformedProducts = productBatches ? productBatches.map(batch => ({
        id: batch.id,
        title: batch.title,
        image: batch.files && batch.files.length > 0 ? batch.files[0].url : photo1,
        badges: batch.files && batch.files.length > 1 ? batch.files.slice(1, 4).map(file => file.url) : [photo2, photo3, photo4],
        badgeText: `${batch.image_cnt}枚セット`,
        price: batch.price == 0 ? '無料' : `${batch.price}円`,
        like: 0, // We can add likes later if needed
        badge1: batch.badge1,
        badge2: batch.badge2,
        user: batch.user,
    })) : [];

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
                {/* Frame 12 */}
                <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex pt-[12px] pb-[6px] items-center w-full">
                        <span className="text-[#363636] font-noto font-bold text-[16px] leading-[20px]">最新の出品</span>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={transformedProducts}
                        isMobile={true}
                    />
                </div>
                
            </section>
            {/* Section 1 (Desktop) */}
            <section className="hidden md:flex flex-col justify-center items-start pt-[32px] pb-[80px] px-[120px] gap-[10px] bg-white ">
                {/* Frame 11 */}
                <a href="/myshop/category" className="flex flex-row items-center gap-[4px] py-[4px] self-stretch">
                    <div className="flex flex-row items-center justify-center w-[20px] h-[15px] p-[1.25px_1px_0.625px_0.625px]">
                        <img src={arrow_left} alt="arrow left" className="w-[18.375px] h-[13.125px]" />
                    </div>
                    <span className="text-[#000] font-noto text-[16px] font-normal leading-[24px]">ショップに戻る</span>
                </a>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex w-[277px] py-[25px] pr-0 pb-[6px] pl-0 items-center gap-[12px]">
                        <span className="text-[#000] font-noto text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">最新の出品</span>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={transformedProducts}
                        isMobile={false}
                    />
                </div>
            </section>
            {/* </section> */}

            <Footer />
        </div>
    );
};

export default ShopNewProducts;