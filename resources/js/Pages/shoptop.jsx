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
];

const Shoptop = () => {
    return (
        <div className="bg-white">
            <Header />
            {/* Section 1 (Mobile) */}
            <section className="flex flex-col items-start py-[32px] px-[16px] w-full bg-white md:hidden 
">
                {/* Frame 11 */}
                <div className="flex flex-col items-start pb-[32px] gap-[24px] self-stretch">
                    {/* 111 */}
                    <div className="flex flex-col items-start gap-[12px] self-stretch">
                        {/* 1111 */}
                        <div className="flex pr-[103px] items-start self-stretch">
                            {/* 11111 */}
                            <div className="flex w-[82px] min-w-[64px] min-h-[48px] pr-[16px] flex-col items-start">
                                {/* 111111: Girl SVG */}
                                <div className="flex w-[64px] h-[64px] justify-center items-center">
                                    <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                </div>
                            </div>
                            {/* 11112 */}
                            <div className="flex w-[158px] pr-[62px] flex-col justify-center items-start gap-[4px]">
                                <span className="text-[#000] font-noto text-[18px] font-bold leading-[18px]">anchiy1005</span>
                                {/* 111121 */}
                                <div className="flex flex-col items-start gap-[4px]">
                                    <span className="text-[#000] font-noto text-[13px] font-normal leading-[21px] whitespace-nowrap">お気に入り登録者 1000人</span>
                                    <span className="text-[#000] font-noto text-[13px] font-normal leading-[21px]">アイテム数 50</span>
                                </div>
                                {/* 111122 */}
                                <div className="flex w-[108px] h-[44px] items-end gap-[4px]">
                                    <img src={x} alt="x" className="flex w-[36px] h-[36px] p-[2.571px_1.286px_1.286px_2.571px] justify-center items-center aspect-square" />
                                    <img src={instagram} alt="instagram" className="flex w-[36px] h-[36px] p-[2.571px_1.286px_1.286px_2.571px] justify-center items-center aspect-square" />
                                </div>
                            </div>
                        </div>
                        {/* 1112 */}
                        <div className="flex justify-end items-center gap-[8px] self-stretch">
                            <span className="text-[#000] font-noto text-[16px] font-normal leading-[32px]">1000人が登録</span>
                            {/* 11121: Follow button */}
                            <button className="flex items-center gap-[8px] px-[16px] py-[7px] rounded-[40px] border border-[#FF2AA1] bg-white">
                                <img src={favoriteshop} alt="favoriteshop" className="w-[20px] h-[20px] aspect-square opacity-100" />
                                <span className="text-[#FF2AA1] text-center font-noto text-[14px] font-medium leading-[21px]">ショップをフォロー</span>
                            </button>
                        </div>
                        {/* 112: Description */}
                        <div className="flex flex-col items-start max-w-[1248px] self-stretch">
                            <span className="text-[#000] font-noto text-[14px] font-normal leading-[21px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。
                                最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-start gap-[8px] w-full">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex py-[12px] pb-[6px] items-center gap-[12px] w-full">
                        <span className="text-[#363636] font-noto font-bold text-[16px] leading-[20px]">最新の出品</span>
                        <img src={arrow_right} alt="arrow right" className="w-[20px] h-[20px]" />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={products} 
                        isMobile={true} 
                    />
                </div>
                {/* Frame 22 */}
                <div className="flex flex-col items-start gap-[8px] w-full">
                    {/* 211: 新しいリスト + arrow */}
                    <div className="flex py-[12px] pb-[6px] items-center gap-[12px] w-full">
                        <span className="text-[#363636] font-noto font-bold text-[16px] leading-[20px]">新しいリスト</span>
                        <img src={arrow_right} alt="arrow right" className="w-[20px] h-[20px]" />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={products} 
                        isMobile={true} 
                    />
                </div>
            </section>
            {/* Section 1 (Desktop) */}
            <section className="hidden md:flex flex-col justify-center items-center py-[32px] mt-[32px] bg-white">
                {/* Frame 11 */}
                <div className="relative h-[254px] max-w-[1200px] w-full">
                    {/* 111: Girl SVG */}
                    <div className="absolute top-0 left-[16px] flex w-[162px] h-[162px] justify-center items-center rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${girl})` }} />
                    {/* 112: anchiy1005 */}
                    <span className="absolute top-[34px] left-[191px] text-[#000] font-noto text-[24px] font-medium leading-[32px]">anchiy1005</span>
                    {/* 113: お気に入り登録者 1000人 アイテム数 50 */}
                    <span className="absolute top-[66px] left-[191px] text-[#000] font-noto text-[16px] font-normal leading-[32px]">お気に入り登録者 1000人 アイテム数 50</span>
                    {/* 114: SNS */}
                    <div className="absolute top-[100px] left-[191px] flex w-[108px] max-w-[1248px] pt-[10px] items-start gap-[4px]">
                        <img src={x} alt="x" className="flex w-[52px] h-[52px] p-[3.714px_1.857px_1.857px_3.714px] justify-center items-center aspect-square opacity-100" />
                        <img src={instagram} alt="instagram" className="flex w-[52px] h-[52px] p-[3.714px_1.857px_1.857px_3.714px] justify-center items-center aspect-square opacity-100" />
                    </div>
                    {/* 115: 1000人が登録 + 1151 */}
                    <div className="absolute top-[106px] right-[16px] inline-flex items-center gap-[8px]">
                        <span className="text-[#000] font-noto text-[16px] font-normal leading-[32px]">1000人が登録</span>
                        {/* 1151: Follow button */}
                        <button className="flex items-center gap-[8px] px-[16px] py-[7px] rounded-[40px] border border-[#FF2AA1] bg-white">
                            <img src={favoriteshop} alt="favoriteshop" className="w-[20px] h-[20px] aspect-square opacity-100" />
                            <span className="text-[#FF2AA1] text-center font-noto text-[14px] font-medium leading-[21px]">ショップをフォロー</span>
                        </button>
                    </div>
                    {/* 116: Description */}
                    <div className="absolute top-[194px] left-[16px] flex flex-col items-start max-w-[1248px] self-stretch">
                        <div className="flex flex-col items-start max-w-[1248px] self-stretch">
                            <span className="text-[#000] font-noto text-[16px] font-normal leading-[27.2px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。<br />
                                最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section 2 (Desktop) */}
            <section className="hidden md:flex flex-col items-start py-[80px] px-[120px] w-full bg-white">
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex w-[277px] py-[25px] pr-0 pb-[6px] pl-0 items-center gap-[12px]">
                        <span className="text-[#000] font-noto text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">最新の出品</span>
                        <img src={arrow_right} alt="arrow right" className="w-[24px] h-[24px]" />
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel 
                        products={products} 
                        isMobile={false} 
                    />
                </div>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 新しいリスト + arrow */}
                    <div className="flex w-[277px] py-[25px] pr-0 pb-[6px] pl-0 items-center gap-[12px]">
                        <span className="text-[#000] font-noto text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">新しいリスト</span>
                        <img src={arrow_right} alt="arrow right" className="w-[24px] h-[24px]" />
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

export default Shoptop;