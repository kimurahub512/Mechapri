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
import pencil from '@/assets/images/pencil.svg';
import recyclebin from '@/assets/images/recyclebin.svg';
import girl from '@/assets/images/favoriteshops/girl.svg';
import share from '@/assets/images/share.svg';
import arrow_left from '@/assets/images/arrow_left.svg';
import {vwd, vw, responsiveTextD, responsiveText, vwR, responsiveMetricR, responsiveTextR} from '@/lib/utils';



const ShopNewCategory = () => {
    const { productBatches, category } = usePage().props;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
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
        display_mode: batch.display_mode,
        user: batch.user,
    })) : [];

    return (
        <div className="bg-white">
            <Header />
            <section className="flex flex-col justify-center items-start bg-white" style={{paddingTop: vwR(32, 32), paddingBottom: vwR(32, 80), paddingLeft: vwR(16, 120), paddingRight: vwR(16, 120), gap: vwR(16, 10)}}>
                {/* Frame 11 */}
                <a href="/shoptop" className="flex flex-row items-center self-stretch" style={{gap: vwR(4, 4), paddingTop: vwR(4, 4), paddingBottom: vwR(4, 4)}}>
                    <img src={arrow_left} alt="arrow left" style={{...responsiveMetricR(18.375, 13.125, 18.375, 13.125)}}/>
                    <span style={{...responsiveTextR(14, 18, 'normal', 16, 24, 'normal', 'noto', '#000')}}>一覧に戻る</span>
                </a>
                <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between w-full' style={{gap: vwR(16, 0)}}>
                    <div className='flex flex-row items-center' style={{gap: vwR(8, 16)}}>
                        <img src={category?.user?.image || girl} alt="user" className='rounded-full' style={{...responsiveMetricR(40, 40, 64, 64)}}/>
                        <span style={{...responsiveTextR(16, 18, 'bold', 21, 32, 'bold', 'noto', '#000')}}>{category?.user?.shop_title || category?.user?.name || 'Shop'}</span>
                    </div>
                    <div className='flex flex-row items-center' style={{gap: vwR(28, 28)}}>
                        <div className='flex flex-row items-center' style={{gap: vwR(4, 4)}}>
                            <img src={recyclebin} alt="recyclebin" style={{...responsiveMetricR(16, 16, 16, 16)}}/>
                            <span style={{...responsiveTextR(12, 18, 'normal', 12, 18, 'normal', 'noto', '#000')}}>削除</span>
                        </div>
                        <div className='flex flex-row items-center' style={{gap: vwR(4, 4)}}>
                            <img src={pencil} alt="pencil" style={{...responsiveMetricR(16, 16, 16, 16)}}/>
                            <span style={{...responsiveTextR(12, 18, 'normal', 12, 18, 'normal', 'noto', '#000')}}>編集</span>
                        </div>
                        <div className='flex flex-row items-center' style={{gap: vwR(4, 4)}}>
                            <img src={share} alt="share" style={{...responsiveMetricR(16, 16, 16, 16)}}/>
                            <span style={{...responsiveTextR(12, 18, 'normal', 12, 18, 'normal', 'noto', '#000')}}>シェア</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex flex-row items-center" style={{gap: vwR(12, 12), paddingTop: vwR(25, 25), paddingBottom: vwR(6, 6)}}>
                        <span style={{...responsiveTextR(16, 20, 'bold', 24, 37.8, 'bold', 'noto', '#000')}}>{category?.title || 'カテゴリ'}</span>
                        <span style={{...responsiveTextR(14, 21, 'bold', 16, 24, 'bold', 'noto', '#ACACAC')}}>{productBatches?.length || 0}点</span>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={transformedProducts}
                        isMobile={isMobile}
                        horizontalScroll={isMobile ? false : true}
                    />
                </div>
            </section>
            {/* </section> */}

            <Footer />
        </div>
    );
};

export default ShopNewCategory;