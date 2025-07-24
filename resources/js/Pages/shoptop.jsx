import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
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
const mobileProducts = [
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
        badges: [photo1, photo3, photo4],
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
        badges: [photo1, photo2, photo4],
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
            <section className="flex flex-col items-start py-[32px] w-full bg-white md:hidden 
">
                {/* Frame 11 */}
                <div className="flex flex-col items-start gap-[24px] self-stretch mx-[16px]">
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
                                <span className="text-[#000] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">anchiy1005</span>
                                {/* 111121 */}
                                <div className="flex flex-col items-start gap-[4px]">
                                    <span className="text-[#000] font-['Noto Sans JP'] text-[13px] font-normal leading-[21px] whitespace-nowrap">お気に入り登録者 1000人</span>
                                    <span className="text-[#000] font-['Noto Sans JP'] text-[13px] font-normal leading-[21px]">アイテム数 50</span>
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
                            <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[32px]">1000人が登録</span>
                            {/* 11121: Follow button */}
                            <button className="flex items-center gap-[8px] px-[16px] py-[7px] rounded-[40px] border border-[#FF2AA1] bg-white">
                                <img src={favoriteshop} alt="favoriteshop" className="w-[20px] h-[20px] aspect-square opacity-100" />
                                <span className="text-[#FF2AA1] text-center font-['Noto Sans JP'] text-[14px] font-medium leading-[21px]">ショップをフォロー</span>
                            </button>
                        </div>
                        {/* 112: Description */}
                        <div className="flex flex-col items-start max-w-[1248px] self-stretch">
                            <span className="text-[#000] font-['Noto Sans JP'] text-[14px] font-normal leading-[21px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。<br />
                                最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                    {/* 112: (Add description or other content here if needed) */}
                </div>
            </section>
            {/* Section 2 (Mobile) */}
            <section className="flex flex-col items-start gap-[8px] w-full px-4 py-8 bg-white md:hidden">
                {/* Frame 21 */}
                <div className="flex flex-col items-start gap-[8px] w-full">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex py-[12px] pb-[6px] items-center gap-[12px] w-full">
                        <span className="text-[#363636] font-['Noto Sans JP'] font-bold text-[16px] leading-[20px]">最新の出品</span>
                        <img src={arrow_right} alt="arrow right" className="w-[20px] h-[20px]" />
                    </div>
                    {/* 212: Product List */}
                    <div className="flex flex-col w-full p-[16px_0_17.416px_0] justify-end items-center self-stretch">
                        {/* 2121: Product Cards (swipeable) */}
                        <div className="flex flex-nowrap items-start gap-[8px] w-full overflow-x-auto scrollbar-hide">
                            {mobileProducts.map((product) => (
                                <div key={product.id} className="flex w-[160px] p-[5.839px] flex-col items-start rounded-[5.839px] bg-white shadow-[0_2.336px_21.022px_0_rgba(0,0,0,0.10)] relative flex-shrink-0">
                                    {/* 212111: Image and Badge */}
                                    <div className="flex flex-col items-start h-[228.905px] pb-[45.945px] self-stretch relative">
                                        {/* 2121111: Main Image */}
                                        <div className="flex h-[149.489px] max-w-[157.372px] px-[26.277px] py-[2.919px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[5.839px] bg-[#F6F6F6]">
                                            <img src={product.image} alt="product" className="w-[95.766px] h-[143.65px] flex-shrink-0 object-cover" />
                                        </div>
                                        {/* 2121112: 1日 以内 badge */}
                                        <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                            <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px] whitespace-nowrap">{product.badge1}</span>
                                            <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">{product.badge2}</span>
                                        </div>
                                        {/* 2121113: Info (absolute bottom) */}
                                        <div className="flex flex-col items-start gap-[18.686px] absolute left-[0.584px] bottom-[3.015px] rounded-b-[2.92px]">
                                            {/* 21211131: Title and Badge */}
                                            <div className="flex flex-col items-start gap-[4.672px]">
                                                <span className="flex w-[143.65px] h-[18.686px] items-center text-[#363636] font-['Noto Sans JP'] text-[10.511px] font-bold leading-[10.511px]">{product.title}</span>
                                                {/* 212111311: Badge with images and text */}
                                                <div className="flex px-[4.672px] py-[2.336px] items-center gap-[2.336px] rounded-[17.518px] bg-[#FF2AA1]">
                                                    {/* 2121113111: Images */}
                                                    <div className="flex items-center gap-[-4.088px]">
                                                        {product.badges.map((img, i) => (
                                                            <img key={i} src={img} alt={`badge${i + 1}`} className={`w-[12px] h-[12px] rounded-full${i > 0 ? ' -ml-[4px]' : ''}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-white font-['Noto Sans JP'] text-[7.591px] font-bold leading-[8.759px]">{product.badgeText}</span>
                                                </div>
                                            </div>
                                            {/* 21211132: Price and Like */}
                                            <div className="flex justify-between items-center self-stretch w-full ">
                                                {/* 212111321: 無料 */}
                                                <div className="flex w-[52.216px] flex-col items-start">
                                                    <span className="text-[#363636] font-['Noto Sans JP'] text-[10.511px] font-bold leading-[10.511px]">{product.price}</span>
                                                </div>
                                                {/* 212111322: Like and Count */}
                                                <div className="flex w-[50.838px] h-[10.511px] pb-[0.584px] justify-end items-center gap-[3.504px]">
                                                    <div className="flex w-[10.511px] h-[10.511px]  justify-center items-center aspect-square">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <g clip-path="url(#clip0_667_29383)">
                                                                <path d="M4.99037 2.83415C5.33367 1.74435 6.3128 1.21985 7.2697 1.21985C8.41382 1.21985 9.287 2.16597 9.287 3.30658C9.287 4.68434 8.52805 5.70198 7.74818 6.63743C6.99942 7.5321 4.99037 9.16145 4.99037 9.16145H4.96943C4.96943 9.16145 2.97056 7.5321 2.22241 6.63743C1.44253 5.70198 0.683594 4.68434 0.683594 3.30658C0.683594 2.14464 1.58848 1.21985 2.71103 1.21985C3.65716 1.21985 4.62614 1.74435 4.96943 2.83415H4.99037Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_667_29383">
                                                                    <rect width="9.92701" height="9.26521" fill="white" transform="translate(0.0218506 0.557861)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <span className="text-[#FE7878] font-['Noto Sans JP'] text-[10.511px] font-bold leading-[10.511px] mt-[2px]">{product.like}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Frame 22 */}
                <div className="flex flex-col items-start gap-[8px] w-full">
                    {/* 211: 新しいリスト + arrow */}
                    <div className="flex py-[12px] pb-[6px] items-center gap-[12px] w-full">
                        <span className="text-[#363636] font-['Noto Sans JP'] font-bold text-[16px] leading-[20px]">新しいリスト</span>
                        <img src={arrow_right} alt="arrow right" className="w-[20px] h-[20px]" />
                    </div>
                    {/* 212: Product List */}
                    <div className="flex flex-col w-full p-[16px_0_17.416px_0] justify-end items-center self-stretch">
                        {/* 2121: Product Cards (swipeable) */}
                        <div className="flex flex-nowrap items-start gap-[8px] w-full overflow-x-auto scrollbar-hide">
                            {mobileProducts.map((product) => (
                                <div key={product.id} className="flex w-[160px] p-[5.839px] flex-col items-start rounded-[5.839px] bg-white shadow-[0_2.336px_21.022px_0_rgba(0,0,0,0.10)] relative flex-shrink-0">
                                    {/* 212111: Image and Badge */}
                                    <div className="flex flex-col items-start h-[228.905px] pb-[45.945px] self-stretch relative">
                                        {/* 2121111: Main Image */}
                                        <div className="flex h-[149.489px] max-w-[157.372px] px-[26.277px] py-[2.919px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[5.839px] bg-[#F6F6F6]">
                                            <img src={product.image} alt="product" className="w-[95.766px] h-[143.65px] flex-shrink-0 object-cover" />
                                        </div>
                                        {/* 2121112: 1日 以内 badge */}
                                        <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                            <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px] whitespace-nowrap">{product.badge1}</span>
                                            <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">{product.badge2}</span>
                                        </div>
                                        {/* 2121113: Info (absolute bottom) */}
                                        <div className="flex flex-col items-start gap-[18.686px] absolute left-[0.584px] bottom-[3.015px] rounded-b-[2.92px]">
                                            {/* 21211131: Title and Badge */}
                                            <div className="flex flex-col items-start gap-[4.672px]">
                                                <span className="flex w-[143.65px] h-[18.686px] items-center text-[#363636] font-['Noto Sans JP'] text-[10.511px] font-bold leading-[10.511px]">{product.title}</span>
                                                {/* 212111311: Badge with images and text */}
                                                <div className="flex px-[4.672px] py-[2.336px] items-center gap-[2.336px] rounded-[17.518px] bg-[#FF2AA1]">
                                                    {/* 2121113111: Images */}
                                                    <div className="flex items-center gap-[-4.088px]">
                                                        {product.badges.map((img, i) => (
                                                            <img key={i} src={img} alt={`badge${i + 1}`} className={`w-[12px] h-[12px] rounded-full${i > 0 ? ' -ml-[4px]' : ''}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-white font-['Noto Sans JP'] text-[7.591px] font-bold leading-[8.759px]">{product.badgeText}</span>
                                                </div>
                                            </div>
                                            {/* 21211132: Price and Like */}
                                            <div className="flex justify-between items-center self-stretch w-full ">
                                                {/* 212111321: 無料 */}
                                                <div className="flex w-[52.216px] flex-col items-start">
                                                    <span className="text-[#363636] font-['Noto Sans JP'] text-[10.511px] font-bold leading-[10.511px]">{product.price}</span>
                                                </div>
                                                {/* 212111322: Like and Count */}
                                                <div className="flex w-[50.838px] h-[10.511px] pb-[0.584px] justify-end items-center gap-[3.504px]">
                                                    <div className="flex w-[10.511px] h-[10.511px]  justify-center items-center aspect-square">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <g clip-path="url(#clip0_667_29383)">
                                                                <path d="M4.99037 2.83415C5.33367 1.74435 6.3128 1.21985 7.2697 1.21985C8.41382 1.21985 9.287 2.16597 9.287 3.30658C9.287 4.68434 8.52805 5.70198 7.74818 6.63743C6.99942 7.5321 4.99037 9.16145 4.99037 9.16145H4.96943C4.96943 9.16145 2.97056 7.5321 2.22241 6.63743C1.44253 5.70198 0.683594 4.68434 0.683594 3.30658C0.683594 2.14464 1.58848 1.21985 2.71103 1.21985C3.65716 1.21985 4.62614 1.74435 4.96943 2.83415H4.99037Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_667_29383">
                                                                    <rect width="9.92701" height="9.26521" fill="white" transform="translate(0.0218506 0.557861)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <span className="text-[#FE7878] font-['Noto Sans JP'] text-[10.511px] font-bold leading-[10.511px] mt-[2px]">{product.like}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Section 1 (Desktop) */}
            <section className="hidden md:flex flex-col justify-center items-center py-[32px] bg-white">
                {/* Frame 11 */}
                <div className="relative h-[254px] max-w-[1200px] w-full">
                    {/* 111: Girl SVG */}
                    <div className="absolute top-0 left-[16px] flex w-[162px] h-[162px] justify-center items-center rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${girl})` }} />
                    {/* 112: anchiy1005 */}
                    <span className="absolute top-[34px] left-[191px] text-[#000] font-['Noto Sans JP'] text-[24px] font-medium leading-[32px]">anchiy1005</span>
                    {/* 113: お気に入り登録者 1000人 アイテム数 50 */}
                    <span className="absolute top-[66px] left-[191px] text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[32px]">お気に入り登録者 1000人 アイテム数 50</span>
                    {/* 114: SNS */}
                    <div className="absolute top-[100px] left-[191px] flex w-[108px] max-w-[1248px] pt-[10px] items-start gap-[4px]">
                        <img src={x} alt="x" className="flex w-[52px] h-[52px] p-[3.714px_1.857px_1.857px_3.714px] justify-center items-center aspect-square opacity-100" />
                        <img src={instagram} alt="instagram" className="flex w-[52px] h-[52px] p-[3.714px_1.857px_1.857px_3.714px] justify-center items-center aspect-square opacity-100" />
                    </div>
                    {/* 115: 1000人が登録 + 1151 */}
                    <div className="absolute top-[106px] right-[16px] inline-flex items-center gap-[8px]">
                        <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[32px]">1000人が登録</span>
                        {/* 1151: Follow button */}
                        <button className="flex items-center gap-[8px] px-[16px] py-[7px] rounded-[40px] border border-[#FF2AA1] bg-white">
                            <img src={favoriteshop} alt="favoriteshop" className="w-[20px] h-[20px] aspect-square opacity-100" />
                            <span className="text-[#FF2AA1] text-center font-['Noto Sans JP'] text-[14px] font-medium leading-[21px]">ショップをフォロー</span>
                        </button>
                    </div>
                    {/* 116: Description */}
                    <div className="absolute top-[194px] left-[16px] flex flex-col items-start max-w-[1248px] self-stretch">
                        <div className="flex flex-col items-start max-w-[1248px] self-stretch">
                            <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[27.2px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。<br />
                                最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section 2 (Desktop) */}
            <section className="hidden md:flex flex-col items-start w-[1440px] px-0 py-[80px] pl-[120px] bg-white">
                {/* Frame 21 */}
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex w-[277px] py-[25px] pr-0 pb-[6px] pl-0 items-center gap-[12px]">
                        <span className="text-[#000] font-['Noto Sans JP'] text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">最新の出品</span>
                        <img src={arrow_right} alt="arrow right" className="w-[24px] h-[24px]" />
                    </div>
                    {/* 212: Product List */}
                    <div className="flex p-[16px] items-center gap-[16px] self-stretch">
                        {/* 2121: Product Cards */}
                        <div className="flex items-start gap-[16px]">
                            {/* 21211: Product Card Example */}
                            <div className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                                {/* 212111: Image and Badge */}
                                <div className="flex flex-col items-start h-[392px] pb-[78.68px] self-stretch relative">
                                    {/* 2121111: Main Image */}
                                    <div className="flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                                    </div>
                                    {/* 2121112: 1日 以内 badge */}
                                    <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                        <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px]">1日</span>
                                        <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">以内</span>
                                    </div>
                                    {/* 2121113: Info (absolute bottom) */}
                                    <div className="flex flex-col items-start gap-[32px] absolute left-[1px] bottom-[6px] rounded-b-[5px]">
                                        {/* 21211131: Title and Badge */}
                                        <div className="flex flex-col items-start gap-[8px]">
                                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">Gウェルネス💪疲れ知らず</span>
                                            {/* 212111311: Badge with images and text */}
                                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                                {/* 2121113111: Images */}
                                                <div className="flex items-center">
                                                    <img src={photo2} alt="badge1" className="w-[24px] h-[24px] rounded-full" />
                                                    <img src={photo3} alt="badge2" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                    <img src={photo4} alt="badge3" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                </div>
                                                <span className="text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[15px]">3枚セット</span>
                                            </div>
                                        </div>
                                        {/* 21211132: Price and Like */}
                                        <div className="flex justify-between items-center self-stretch w-full ">
                                            {/* 212111321: 無料 */}
                                            <div className="flex w-[89.42px] flex-col items-start">
                                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">無料</span>
                                            </div>
                                            {/* 212111322: Like and Count */}
                                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <g clip-path="url(#clip0_667_27039)">
                                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_667_27039">
                                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="text-[#FE7878] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px] mt-[4px]">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat 21211 for more products as needed */}
                        </div>
                        {/* 2121: Product Cards */}
                        <div className="flex items-start gap-[16px]">
                            {/* 21211: Product Card Example */}
                            <div className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                                {/* 212111: Image and Badge */}
                                <div className="flex flex-col items-start h-[392px] pb-[78.68px] self-stretch relative">
                                    {/* 2121111: Main Image */}
                                    <div className="flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                                    </div>
                                    {/* 2121112: 1日 以内 badge */}
                                    <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                        <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px]">1日</span>
                                        <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">以内</span>
                                    </div>
                                    {/* 2121113: Info (absolute bottom) */}
                                    <div className="flex flex-col items-start gap-[32px] absolute left-[1px] bottom-[6px] rounded-b-[5px]">
                                        {/* 21211131: Title and Badge */}
                                        <div className="flex flex-col items-start gap-[8px]">
                                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">Gウェルネス💪疲れ知らず</span>
                                            {/* 212111311: Badge with images and text */}
                                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                                {/* 2121113111: Images */}
                                                <div className="flex items-center">
                                                    <img src={photo2} alt="badge1" className="w-[24px] h-[24px] rounded-full" />
                                                    <img src={photo3} alt="badge2" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                    <img src={photo4} alt="badge3" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                </div>
                                                <span className="text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[15px]">3枚セット</span>
                                            </div>
                                        </div>
                                        {/* 21211132: Price and Like */}
                                        <div className="flex justify-between items-center self-stretch w-full ">
                                            {/* 212111321: 無料 */}
                                            <div className="flex w-[89.42px] flex-col items-start">
                                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">無料</span>
                                            </div>
                                            {/* 212111322: Like and Count */}
                                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <g clip-path="url(#clip0_667_27039)">
                                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_667_27039">
                                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="text-[#FE7878] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px] mt-[4px]">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat 21211 for more products as needed */}
                        </div>
                        {/* 2121: Product Cards */}
                        <div className="flex items-start gap-[16px]">
                            {/* 21211: Product Card Example */}
                            <div className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                                {/* 212111: Image and Badge */}
                                <div className="flex flex-col items-start h-[392px] pb-[78.68px] self-stretch relative">
                                    {/* 2121111: Main Image */}
                                    <div className="flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                                    </div>
                                    {/* 2121112: 1日 以内 badge */}
                                    <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                        <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px]">1日</span>
                                        <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">以内</span>
                                    </div>
                                    {/* 2121113: Info (absolute bottom) */}
                                    <div className="flex flex-col items-start gap-[32px] absolute left-[1px] bottom-[6px] rounded-b-[5px]">
                                        {/* 21211131: Title and Badge */}
                                        <div className="flex flex-col items-start gap-[8px]">
                                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">Gウェルネス💪疲れ知らず</span>
                                            {/* 212111311: Badge with images and text */}
                                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                                {/* 2121113111: Images */}
                                                <div className="flex items-center">
                                                    <img src={photo2} alt="badge1" className="w-[24px] h-[24px] rounded-full" />
                                                    <img src={photo3} alt="badge2" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                    <img src={photo4} alt="badge3" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                </div>
                                                <span className="text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[15px]">3枚セット</span>
                                            </div>
                                        </div>
                                        {/* 21211132: Price and Like */}
                                        <div className="flex justify-between items-center self-stretch w-full ">
                                            {/* 212111321: 無料 */}
                                            <div className="flex w-[89.42px] flex-col items-start">
                                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">無料</span>
                                            </div>
                                            {/* 212111322: Like and Count */}
                                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <g clip-path="url(#clip0_667_27039)">
                                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_667_27039">
                                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="text-[#FE7878] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px] mt-[4px]">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat 21211 for more products as needed */}
                        </div>
                        {/* 2121: Product Cards */}
                        <div className="flex items-start gap-[16px]">
                            {/* 21211: Product Card Example */}
                            <div className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                                {/* 212111: Image and Badge */}
                                <div className="flex flex-col items-start h-[392px] pb-[78.68px] self-stretch relative">
                                    {/* 2121111: Main Image */}
                                    <div className="flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                                    </div>
                                    {/* 2121112: 1日 以内 badge */}
                                    <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                        <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px]">1日</span>
                                        <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">以内</span>
                                    </div>
                                    {/* 2121113: Info (absolute bottom) */}
                                    <div className="flex flex-col items-start gap-[32px] absolute left-[1px] bottom-[6px] rounded-b-[5px]">
                                        {/* 21211131: Title and Badge */}
                                        <div className="flex flex-col items-start gap-[8px]">
                                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">Gウェルネス💪疲れ知らず</span>
                                            {/* 212111311: Badge with images and text */}
                                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                                {/* 2121113111: Images */}
                                                <div className="flex items-center">
                                                    <img src={photo2} alt="badge1" className="w-[24px] h-[24px] rounded-full" />
                                                    <img src={photo3} alt="badge2" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                    <img src={photo4} alt="badge3" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                </div>
                                                <span className="text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[15px]">3枚セット</span>
                                            </div>
                                        </div>
                                        {/* 21211132: Price and Like */}
                                        <div className="flex justify-between items-center self-stretch w-full ">
                                            {/* 212111321: 無料 */}
                                            <div className="flex w-[89.42px] flex-col items-start">
                                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">無料</span>
                                            </div>
                                            {/* 212111322: Like and Count */}
                                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <g clip-path="url(#clip0_667_27039)">
                                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_667_27039">
                                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="text-[#FE7878] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px] mt-[4px]">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat 21211 for more products as needed */}
                        </div>
                        {/* 2121: Product Cards */}
                        <div className="flex items-start gap-[16px]">
                            {/* 21211: Product Card Example */}
                            <div className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                                {/* 212111: Image and Badge */}
                                <div className="flex flex-col items-start h-[392px] pb-[78.68px] self-stretch relative">
                                    {/* 2121111: Main Image */}
                                    <div className="flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                                    </div>
                                    {/* 2121112: 1日 以内 badge */}
                                    <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                        <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px]">1日</span>
                                        <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">以内</span>
                                    </div>
                                    {/* 2121113: Info (absolute bottom) */}
                                    <div className="flex flex-col items-start gap-[32px] absolute left-[1px] bottom-[6px] rounded-b-[5px]">
                                        {/* 21211131: Title and Badge */}
                                        <div className="flex flex-col items-start gap-[8px]">
                                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">Gウェルネス💪疲れ知らず</span>
                                            {/* 212111311: Badge with images and text */}
                                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                                {/* 2121113111: Images */}
                                                <div className="flex items-center">
                                                    <img src={photo2} alt="badge1" className="w-[24px] h-[24px] rounded-full" />
                                                    <img src={photo3} alt="badge2" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                    <img src={photo4} alt="badge3" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                </div>
                                                <span className="text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[15px]">3枚セット</span>
                                            </div>
                                        </div>
                                        {/* 21211132: Price and Like */}
                                        <div className="flex justify-between items-center self-stretch w-full ">
                                            {/* 212111321: 無料 */}
                                            <div className="flex w-[89.42px] flex-col items-start">
                                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">無料</span>
                                            </div>
                                            {/* 212111322: Like and Count */}
                                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <g clip-path="url(#clip0_667_27039)">
                                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_667_27039">
                                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="text-[#FE7878] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px] mt-[4px]">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat 21211 for more products as needed */}
                        </div>
                        {/* 2121: Product Cards */}
                        <div className="flex items-start gap-[16px]">
                            {/* 21211: Product Card Example */}
                            <div className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                                {/* 212111: Image and Badge */}
                                <div className="flex flex-col items-start h-[392px] pb-[78.68px] self-stretch relative">
                                    {/* 2121111: Main Image */}
                                    <div className="flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6]">
                                        <img src={photo1} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                                    </div>
                                    {/* 2121112: 1日 以内 badge */}
                                    <div className="flex w-[54px] h-[24px] px-[6.8px] py-[2px] pl-[7px] justify-center items-end gap-[-0.87px] absolute left-[4px] top-[4px] rounded-[15px] bg-[#FF2AA1]">
                                        <span className="flex w-[20.87px] h-[20px] justify-center items-center text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[19.5px]">1日</span>
                                        <span className="flex w-[20.2px] h-[15px] justify-center items-center text-white font-['Noto Sans JP'] text-[10px] font-bold leading-[15px] whitespace-nowrap">以内</span>
                                    </div>
                                    {/* 2121113: Info (absolute bottom) */}
                                    <div className="flex flex-col items-start gap-[32px] absolute left-[1px] bottom-[6px] rounded-b-[5px]">
                                        {/* 21211131: Title and Badge */}
                                        <div className="flex flex-col items-start gap-[8px]">
                                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">Gウェルネス💪疲れ知らず</span>
                                            {/* 212111311: Badge with images and text */}
                                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                                {/* 2121113111: Images */}
                                                <div className="flex items-center">
                                                    <img src={photo2} alt="badge1" className="w-[24px] h-[24px] rounded-full" />
                                                    <img src={photo3} alt="badge2" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                    <img src={photo4} alt="badge3" className="w-[24px] h-[24px] rounded-full -ml-[7px]" />
                                                </div>
                                                <span className="text-white font-['Noto Sans JP'] text-[13px] font-bold leading-[15px]">3枚セット</span>
                                            </div>
                                        </div>
                                        {/* 21211132: Price and Like */}
                                        <div className="flex justify-between items-center self-stretch w-full ">
                                            {/* 212111321: 無料 */}
                                            <div className="flex w-[89.42px] flex-col items-start">
                                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px]">無料</span>
                                            </div>
                                            {/* 212111322: Like and Count */}
                                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <g clip-path="url(#clip0_667_27039)">
                                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_667_27039">
                                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="text-[#FE7878] font-['Noto Sans JP'] text-[18px] font-bold leading-[18px] mt-[4px]">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat 21211 for more products as needed */}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
};

export default Shoptop;