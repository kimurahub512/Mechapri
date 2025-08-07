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
import heart from '@/assets/images/heart.svg';
import arrow_right from '@/assets/images/arrow_right.svg';
import {vwd, vw, responsiveTextD, responsiveMetricD, responsiveText, responsiveMetric, responsivePosition, responsivePositionD} from '@/lib/utils';

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
];

const shoptop = () => {
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
                                {/* 111111: Girl SVG */}
                                <div className="flex justify-center items-center" style={{ width: vw(64), height: vw(64) }}>
                                    <img src={girl} alt="girl" className="rounded-full object-cover" style={{ width: vw(64), height: vw(64) }} />
                                </div>
                            </div>
                            {/* 11112 */}
                            <div className="flex flex-col justify-center items-start" style={{ width: vw(158), paddingRight: vw(62), gap: vw(4) }}>
                                <span style={{ ...responsiveText(18, 18, null, 'bold', 'noto', '#000') }}>anchiy1005</span>
                                {/* 111121 */}
                                <div className="flex flex-col items-start" style={{ gap: vw(4) }}>
                                    <span className='whitespace-nowrap' style={{ ...responsiveText(13, 21, null, 'normal', 'noto', '#000') }}>お気に入り登録者 1000人</span>
                                    <span className='whitespace-nowrap' style={{ ...responsiveText(13, 21, null, 'normal', 'noto', '#000') }}>アイテム数 50</span>
                                </div>
                                {/* 111122 */}
                                <div className="flex items-end" style={{ width: vw(108), height: vw(44), gap: vw(4) }}>
                                    <img src={x} alt="x" className="flex justify-center items-center aspect-square" style={{ width: vw(36), height: vw(36), padding: vw(2.571), paddingLeft: vw(1.286), paddingRight: vw(1.286), paddingBottom: vw(1.286) }} />
                                    <img src={instagram} alt="instagram" className="flex justify-center items-center aspect-square" style={{ width: vw(36), height: vw(36), padding: vw(2.571), paddingLeft: vw(1.286), paddingRight: vw(1.286), paddingBottom: vw(1.286) }} />
                                </div>
                            </div>
                        </div>
                        {/* 1112 */}
                        <div className="flex justify-end items-center self-stretch" style={{ gap: vw(8) }}>
                            <span style={{ ...responsiveText(16, 16, null, 'normal', 'noto', '#000') }}>1000人が登録</span>
                            {/* 11121: Follow button */}
                            <button className="flex items-center rounded-[40px] border border-[#FF2AA1] bg-white" style={{ gap: vw(8), paddingLeft: vw(16), paddingRight: vw(16), paddingTop: vw(7), paddingBottom: vw(7) }}>
                                <img src={favoriteshop} alt="favoriteshop" className="aspect-square opacity-100" style={{ width: vw(20), height: vw(20) }} />
                                <span style={{ ...responsiveText(14, 14, null, 'medium', 'noto', '#FF2AA1') }}>ショップをフォロー</span>
                            </button>
                        </div>
                        {/* 112: Description */}
                        <div className="flex flex-col items-start self-stretch" style={{ maxWidth: vw(1248) }}>
                            <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#000') }}>
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。
                                最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
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
                        products={products} 
                        isMobile={true} 
                    />
                </div>
                {/* Frame 22 */}
                <div className="flex flex-col items-start w-full" style={{ gap: vw(8) }}>
                    {/* 211: 新しいリスト + arrow */}
                    <div className="flex items-center w-full" style={{ paddingTop: vw(12), paddingBottom: vw(6), gap: vw(12) }}>
                        <span style={{ ...responsiveText(16, 16, null, 'bold', 'noto', '#363636') }}>新しいリスト</span>
                        <img src={arrow_right} alt="arrow right" style={{ width: vw(20), height: vw(20) }} />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={products} 
                        isMobile={true} 
                    />
                </div>
            </section>
            {/* Section 1 (Desktop) */}
            <section className="hidden md:flex flex-col justify-center items-center bg-white" style={{ paddingTop: vwd(32), paddingBottom: vwd(32), marginTop: vwd(32) }}>
                {/* Frame 11 */}
                <div className="relative w-full" style={{ height: vwd(254), maxWidth: vwd(1200) }}>
                    {/* 111: Girl SVG */}
                    <div className="absolute top-0 left-0 flex justify-center items-center rounded-full bg-cover bg-center" style={{ width: vwd(162), height: vwd(162), left: vwd(16), backgroundImage: `url(${girl})` }} />
                    {/* 112: anchiy1005 */}
                    <span className="absolute text-[#000] font-noto font-medium" style={{ ...responsiveTextD(24, 24, null, 'medium', 'noto', '#000'), top: vwd(34), left: vwd(191) }}>anchiy1005</span>
                    {/* 113: お気に入り登録者 1000人 アイテム数 50 */}
                    <span className="absolute text-[#000] font-noto font-normal" style={{ ...responsiveTextD(16, 16, null, 'normal', 'noto', '#000'), top: vwd(66), left: vwd(191) }}>お気に入り登録者 1000人 アイテム数 50</span>
                    {/* 114: SNS */}
                    <div className="absolute flex items-start" style={{ width: vwd(108), maxWidth: vwd(1248), top: vwd(100), left: vwd(191), gap: vwd(4), paddingTop: vwd(10) }}>
                        <img src={x} alt="x" className="flex justify-center items-center aspect-square opacity-100" style={{ width: vwd(52), height: vwd(52), padding: vwd(3.714), paddingLeft: vwd(1.857), paddingRight: vwd(1.857), paddingBottom: vwd(1.857) }} />
                        <img src={instagram} alt="instagram" className="flex justify-center items-center aspect-square opacity-100" style={{ width: vwd(52), height: vwd(52), padding: vwd(3.714), paddingLeft: vwd(1.857), paddingRight: vwd(1.857), paddingBottom: vwd(1.857) }} />
                    </div>
                    {/* 115: 1000人が登録 + 1151 */}
                    <div className="absolute inline-flex items-center" style={{ top: vwd(106), right: vwd(16), gap: vwd(8) }}>
                        <span className="text-[#000] font-noto font-normal" style={{ ...responsiveTextD(16, 16, null, 'normal', 'noto', '#000') }}>1000人が登録</span>
                        {/* 1151: Follow button */}
                        <button className="flex items-center rounded-[40px] border border-[#FF2AA1] bg-white" style={{ gap: vwd(8), paddingLeft: vwd(16), paddingRight: vwd(16), paddingTop: vwd(7), paddingBottom: vwd(7) }}>
                            <img src={favoriteshop} alt="favoriteshop" className="aspect-square opacity-100" style={{ width: vwd(20), height: vwd(20) }} />
                            <span style={{ ...responsiveTextD(14, 14, null, 'medium', 'noto', '#FF2AA1') }}>ショップをフォロー</span>
                        </button>
                    </div>
                    {/* 116: Description */}
                    <div className="absolute flex flex-col items-start self-stretch" style={{ top: vwd(194), left: vwd(16), maxWidth: vwd(1248) }}>
                        <div className="flex flex-col items-start self-stretch" style={{ maxWidth: vwd(1248) }}>
                            <span className="text-[#000] font-noto font-normal" style={{ ...responsiveTextD(16, 27, null, 'normal', 'noto', '#000') }}>
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。<br />
                                最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section 2 (Desktop) */}
            <section className="hidden md:flex flex-col items-start w-full bg-white" style={{ paddingTop: vwd(80), paddingBottom: vwd(80), paddingLeft: vwd(120), paddingRight: vwd(120) }}>
                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex items-center" style={{ width: vwd(277), paddingTop: vwd(25), paddingRight: 0, paddingBottom: vwd(6), paddingLeft: 0, gap: vwd(12) }}>
                        <span className="text-[#000] font-noto font-bold" style={{ ...responsiveTextD(24, 24, null, 'bold', 'noto', '#000'), letterSpacing: vwd(1.05) }}>最新の出品</span>
                        <img src={arrow_right} alt="arrow right" style={{ width: vwd(24), height: vwd(24) }} />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={products} 
                        isMobile={false} 
                    />
                </div>
                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                    {/* 211: 新しいリスト + arrow */}
                    <div className="flex items-center" style={{ width: vwd(277), paddingTop: vwd(25), paddingRight: 0, paddingBottom: vwd(6), paddingLeft: 0, gap: vwd(12) }}>
                        <span className="text-[#000] font-noto font-bold" style={{ ...responsiveTextD(24, 24, null, 'bold', 'noto', '#000'), letterSpacing: vwd(1.05) }}>新しいリスト</span>
                        <img src={arrow_right} alt="arrow right" style={{ width: vwd(24), height: vwd(24) }} />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={products} 
                        isMobile={false} 
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default shoptop;