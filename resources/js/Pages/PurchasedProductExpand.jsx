import React, { useState } from 'react';
import { router, usePage, Head } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import girl from '@/assets/images/favoriteshops/girl.svg';
import pen from '@/assets/images/pencil_line_black.svg';
import recyclebin from '@/assets/images/recyclebin.svg';
import heart from '@/assets/images/heart_pink.svg';
import share from '@/assets/images/share.png';
import complex from '@/assets/images/complex_black.png';
import complex_white from '@/assets/images/complex_white.png';
import question from '@/assets/images/question.svg';
import question_circle from '@/assets/images/question_circle.svg';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import qr from '@/assets/images/productdetails/qr.jpg';
import x from '@/assets/images/x_logo.svg';
import instagram from '@/assets/images/instagram.svg';
import favoriteshops from '@/assets/images/favoriteshop.svg';
import favoriteshops_follow from '@/assets/images/favoriteshop_white.svg';
import default_user from '@/assets/images/default-user.png';
import bubble from '@/assets/images/bubble.svg';
import question_cloud from '@/assets/images/question_cloud.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';
import BadgeDisplay from '@/Components/BadgeDisplay';


const PurchasedProductExpand = ({ product }) => {
    const { auth } = usePage().props;
    const [cushionRevealed, setCushionRevealed] = useState(false);

    return (
        <div className='product-details-no-footer-gap bg-[#FFF]'>
            <Head title="めちゃプリ" />
            <Header />
            <main className="hidden md:flex flex-col items-center px-[120px] pt-[140px] pb-[176px] w-full bg-[#FFF]">
                {/* Frame 1 */}
                <div className="flex flex-col items-center gap-[41px] w-full max-w-[1200px]">
                    {/* 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-full relative">
                        {/* 112 */}
                        <div className="flex flex-col justify-center items-start h-[66px] w-full relative">
                            {/* 1121 */}
                            <div className="flex items-center w-full">
                                {/* 11211 */}
                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                    {/* 112111 */}
                                    <div 
                                        className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => router.visit(`/${product.user.id}`)}
                                    >
                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[64px] h-[64px] rounded-full object-cover" />
                                    </div>
                                </div>
                                {/* 11212 */}
                                <div 
                                    className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => router.visit(`/${product.user.id}`)}
                                >
                                    <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{product.user.name}</span>
                                </div>
                            </div>
                            {/* 1122: Edit/Delete buttons */}
                            <div className="flex items-center absolute right-0 top-[15px]">
                                <button
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(route('favoriteshops.toggle'), {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                },
                                                body: JSON.stringify({ shop_user_id: product.user.id }),
                                            });
                                            const data = await response.json();
                                            if (data.success) {
                                                router.reload();
                                            }
                                        } catch (error) {
                                            console.error('Error toggling shop follow:', error);
                                            console.error('Error details:', {
                                                error,
                                                csrf: document.querySelector('meta[name="csrf-token"]')?.content,
                                                productUserId: product.user.id,
                                                authUserId: auth.user.id
                                            });
                                        }
                                    }}
                                    disabled={auth.user.id === product.user.id}
                                    className={`flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border transition-opacity ${
                                        auth.user.id === product.user.id
                                            ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                            : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.user.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                    }`}
                                >
                                    <img
                                        src={product.user.is_followed_by_current_user ? favoriteshops_follow : favoriteshops}
                                        alt="favoriteshop"
                                    />
                                    <span className={`text-center font-medium text-[14px] leading-[21px] font-noto ${
                                        auth.user.id === product.user.id
                                            ? 'text-[#767676]'
                                            : product.user.is_followed_by_current_user ? 'text-white' : 'text-[#FF2AA1]'
                                    }`}>
                                        {product.user.is_followed_by_current_user ? 'フォロー中' : 'ショップをフォロー'}
                                    </span>
                                </button>
                            </div>
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full">
                            {/* 1131: Title */}
                            <div className="flex flex-col items-start w-[1200px]">
                                <span className="text-[#363636] font-noto text-[36px] font-bold leading-[54px]">{product.title}</span>
                            </div>
                            {/* 1132: Description and Date */}
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-noto text-[18px] font-normal leading-[32.4px]">{product.description}</span>
                                <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">{product.sales_deadline}まで販売</span>
                            </div>
                        </div>
                        {/* 114 */}
                        <div className="flex flex-wrap justify-between items-center w-full">
                            {/* 1141 */}
                            <div className="flex items-center gap-[10px]">
                                {/* 11411 */}
                                <div className="flex flex-col items-start gap-[10px] py-[8px]">
                                    {/* Favorite button */}
                                    <button
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(route('favoriteproducts.toggle'), {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                    },
                                                    body: JSON.stringify({ product_id: product.id }),
                                                });
                                                const data = await response.json();
                                                if (data.success) {
                                                    router.reload();
                                                }
                                            } catch (error) {
                                                console.error('Error toggling favorite:', error);
                                            }
                                        }}
                                        disabled={auth.user.id === product.user.id}
                                        className={`flex items-center gap-[4px] border-[1px] border-solid rounded-[6px] p-[8px] transition-opacity ${
                                            auth.user.id === product.user.id
                                                ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                                : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.is_favorited ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                        }`}
                                    >
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                        <span className={`font-noto text-[14px] font-bold leading-[21px] ${
                                            product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                        }`}>
                                            {product.is_favorited ? 'お気に入り中' : 'お気に入り'}
                                        </span>
                                        <span className={`font-noto text-[14px] font-bold leading-[21px] ${
                                            product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                        }`}>
                                            {product.favorite_count}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-center pb-[12px] w-full border-b border-[#D1D1D1]">
                            {/* 1142 */}
                            <div className="flex items-center h-[32px] gap-[4px]">
                                {/* 11421 */}
                                <div className="flex flex-col items-start pl-[4px]">
                                    <div className="flex items-center gap-[4px]">
                                        <img src={share} alt="share" className="w-[20px] h-[20px]" />
                                        <span className="text-[#222] font-noto text-[12px] font-normal leading-[13.8px]">シェア</span>
                                    </div>
                                </div>
                                {/* 11422 */}
                                <div className="flex flex-col items-start pl-[24px]">
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center justify-end w-full">
                                            <img src={complex} alt="complex" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                            <span className="text-[#767676] text-right font-noto text-[14px] font-bold leading-[21px] ml-[4px]">{product?.printed_count || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section 12 */}
                    <section className="flex flex-col items-start gap-[32px] w-[960px] mt-[60px]">
                        {/* 121 */}
                        <div className="flex flex-col w-full rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] p-0 pb-[60px]">
                            {/* 1211: Image carousel */}
                            <div className="flex flex-col items-center gap-[24px] p-[70px_70px_92.5px_70px]">
                                <div className={`grid gap-[32px] w-full ${product.images.length >= 3 ? 'max-w-[1200px] grid-cols-3 justify-items-center' : product.images.length === 1 ? 'max-w-[360px] grid-cols-1 justify-items-center' : 'max-w-[752px] grid-cols-2 justify-items-center'}`}>
                                    {product.images.map((image, index) => (
                                        <div key={index} className="flex w-[360px] h-[362.835px] px-[63.78px] py-[7.087px] flex-col justify-center items-center rounded-[14.173px] bg-[#F6F6F6] relative">
                                            <div className="flex w-[232.441px] h-[348.661px] flex-col justify-center items-center flex-shrink-0 relative">
                                                <div className="flex w-[232.441px] h-[348.661px] flex-col justify-center items-center flex-shrink-0 rounded-[8px] bg-[#F6F6F6]">
                                                    <img src={image} alt={product.title} className="w-[232.441px] h-[348.661px] object-cover rounded-[8px]" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 1212: Print info blocks */}
                            <div className="inline-flex flex-col items-start w-[500px] mt-[40px] mx-auto">
                                {/* 12121: Gradient header */}
                                <div className="flex px-[140px] py-[13.649px] pr-[137px] rounded-t-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] items-center gap-[10px] w-full whitespace-nowrap">
                                    <div className="flex items-center gap-[8px] ">
                                        <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px] ">プリント期限</span>
                                    </div>
                                    <div className="flex flex-col items-start ml-[24px]">
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px]">{product.print_deadline}まで</span>
                                    </div>
                                </div>
                                {/* 12122: Print options */}
                                <div className="flex flex-col items-center gap-[20px] w-full bg-[#F6F6F6] rounded-b-[16px] p-[12px]">
                                    {/* 121221: Famima/Lawson/Ministop */}
                                    <div className="flex w-[480px] px-[24px] justify-between items-center rounded-[10px] bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] ">
                                        <div className="flex flex-col items-center flex-1">
                                            <div className="flex h-[74px] py-[30px] justify-between items-center w-full ">
                                                <span className="w-[201px] font-noto text-[18px] font-bold leading-[20.7px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">ファミマ・ローソン・<br />ミニストップで印刷する</span>
                                                <div className="flex items-center gap-[12px] ml-[16px]">
                                                    <img src={shop1} alt="printshop" className="w-[64.863px] h-[48px]" />
                                                    <img src={shop2} alt="lawson" className="w-[64.863px] h-[48px]" />
                                                    <img src={shop3} alt="ministop" className="w-[64.863px] h-[48px]" />
                                                </div>
                                            </div>
                                            {/*12122112*/}
                                            <div className="relative w-[358px] h-[150px] mt-[12px]">
                                                <img 
                                                    src={product?.nwps_qr_code_url || qr} 
                                                    alt="qr" 
                                                    className="absolute top-0 left-0 w-[150px] h-[150px] " 
                                                />
                                                <span className="absolute top-[44.5px] left-[226px] text-[#000] font-noto text-[14px] font-normal leading-[21px]">ユーザー番号</span>
                                                <span className="absolute top-[73.5px] left-[180px] text-[#363636] font-noto text-[24px] font-bold leading-[24px] text-center">
                                                    {product?.nwps_user_code || '発行中...'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 121222: Seven Eleven */}
                                    {/* <div className="flex w-[480px] h-[74px] px-[24px] justify-between items-center rounded-[10px] border border-[#D1D1D1] bg-white bg-opacity-50 ">
                                        <div className="flex items-center w-[425px] h-[74px] py-[30px] justify-between">
                                            <span className="font-noto text-[18px] font-bold leading-[20.7px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">セブンイレブンで印刷する</span>
                                            <img src={eleven} alt="eleven" className="w-[59px] h-[59px] rounded-full object-cover ml-[16px]" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            {/* 1213: Help link */}
                            <div className="flex flex-col items-center w-[386px] h-[20px] mt-[24px] ml-[287px]">
                                <div className="flex items-center gap-[8px]">
                                    <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                    <span className="text-[#767676] font-noto text-[14px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                </div>
                            </div>
                        </div>
                        {/* 122: Ranking */}
                        <div className="flex flex-col items-start w-[960px] px-[66px] py-[32px] gap-[10px] bg-white rounded-[24px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                            {/* 1221: Ranking title and list */}
                            <div className="flex flex-col items-start gap-[16px] w-full">
                                <span className="text-[#000] font-noto text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">ランキング</span>
                                {/* 12211: Ranking list */}
                                <div className="flex flex-col items-start gap-[24px] w-full">
                                    {product.top_buyers && product.top_buyers.map((buyer, index) => (
                                        <div key={index} className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                            <div className="flex items-center gap-[24px]">
                                                <div className="flex flex-col items-center pb-[12px]">
                                                    <span className={`font-noto font-bold ${index === 0 ? 'text-[36px] leading-[54px]' : index <= 2 ? 'text-[28px] leading-[42px]' : 'text-[24px] leading-[24px]'} ${index <= 2 ? 'text-[#AB31D3]' : 'text-[#222]'}`}>{index + 1}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                        <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                            <img src={buyer.user.image || default_user} alt={buyer.user.name} className="w-[64px] h-[64px] rounded-full object-cover" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                        <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{buyer.user.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* Personal Info Footer (Frame 2) */}
            <section className="hidden md:flex flex-col items-center py-[48px] px-[96px] w-full bg-[#F6F8FA]">
                <div className="flex justify-between items-start w-full">
                    {/* Left: 21 */}
                    <div className="flex items-start flex-shrink-0">
                        <div 
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => router.visit(`/${product.user.id}`)}
                        >
                            <img src={product.user.image || default_user} alt={product.user.name} className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0" />
                        </div>
                        {/* 211 */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span 
                                    className="text-[#000] font-noto text-[21px] font-bold leading-[32px] cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => router.visit(`/${product.user.id}`)}
                                >{product.user.name}</span>
                                <div className="flex pt-[10px] gap-[4px]">
                                    <img src={x} alt="x" className="w-[46.429px] h-[46.429px] opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: 22 */}
                    <div className="flex flex-col w-[55%] items-start flex-shrink-0">
                            <span className="text-[#000] font-noto text-[16px] font-normal leading-[27.2px]">
                                {product.user.description}
                            </span>
                    </div>
                </div>
            </section>
            {/* Mobile Main Section */}
            <div className="flex flex-col gap-[45px] pt-[84px]">
                <section className="flex flex-col items-start gap-[24px] px-4 md:hidden w-full pt-[32px] bg-[#FFF] mt-[-12px]">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-[343px]">
                        {/* 112 */}
                        <div className="flex flex-col items-start gap-[24px] w-full">
                            {/* 1121 */}
                            <div className="flex flex-col items-start gap-[12px] w-full">
                                {/* 11211 */}
                                <div className="flex items-center w-full">
                                    {/* 112111 */}
                                    <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                        <div 
                                            className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => router.visit(`/${product.user.id}`)}
                                        >
                                            <img src={product.user.image || default_user} alt={product.user.name} className="w-[64px] h-[64px] rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <span 
                                        className="text-[#000] font-noto text-[21px] font-bold leading-[32px] cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => router.visit(`/${product.user.id}`)}
                                    >{product.user.name}</span>
                                </div>
                            </div>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                        const response = await fetch(route('favoriteshops.toggle'), {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                            },
                                            body: JSON.stringify({ shop_user_id: product.user.id }),
                                        });
                                        const data = await response.json();
                                        if (data.success) {
                                            router.reload();
                                        }
                                    } catch (error) {
                                        console.error('Error toggling shop follow:', error);
                                    }
                                }}
                                disabled={auth.user.id === product.user.id}
                                className={`flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border transition-opacity ${
                                    auth.user.id === product.user.id
                                        ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                        : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.user.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                }`}
                            >
                                <img
                                    src={product.user.is_followed_by_current_user ? favoriteshops_follow : favoriteshops}
                                    alt="favoriteshop"
                                />
                                <span className={`text-center font-medium text-[14px] leading-[21px] font-noto ${
                                    auth.user.id === product.user.id
                                        ? 'text-[#767676]'
                                        : product.user.is_followed_by_current_user ? 'text-white' : 'text-[#FF2AA1]'
                                }`}>
                                    {product.user.is_followed_by_current_user ? 'フォロー中' : 'ショップをフォロー'}
                                </span>
                            </button>
                            {/* 1122 */}
                            <div className="flex flex-col items-start gap-[10px] w-full">
                                {/* 11221 */}
                                <div className="flex flex-col justify-center items-start gap-[12px] w-full">
                                    <span className="text-[#363636] text-left font-noto text-[24px] font-bold leading-[24px] w-full">{product.title}</span>
                                </div>
                                {/* 11222 */}
                                <div className="flex flex-col items-start gap-[4px] w-full">
                                    <span className="text-[#363636] font-noto text-[14px] font-bold leading-[14px] w-full">{product.description}</span>
                                    <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">{product.sales_deadline}まで販売</span>
                                </div>
                                {/* 1131 */}
                                                                    <button
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(route('favoriteproducts.toggle'), {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                },
                                                body: JSON.stringify({ product_id: product.id }),
                                            });
                                            const data = await response.json();
                                            if (data.success) {
                                                router.reload();
                                            }
                                        } catch (error) {
                                            console.error('Error toggling favorite:', error);
                                        }
                                    }}
                                    disabled={auth.user.id === product.user.id}
                                    className={`flex items-center gap-[4px] border-[1px] border-solid rounded-[6px] p-[8px] transition-opacity ${
                                        auth.user.id === product.user.id
                                            ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                            : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.is_favorited ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                    }`}
                                >
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                    <span className={`font-noto text-[12px] font-normal leading-[21px] ${
                                        product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                    }`}>
                                        {product.is_favorited ? 'お気に入り中' : 'お気に入り'}
                                    </span>
                                    <span className={`font-noto text-[14px] font-bold leading-[15px] ${
                                        product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                    }`}>
                                        {product.favorite_count}
                                    </span>
                                </button>
                            </div>
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full pb-[16px] border-b border-[#D1D1D1]">
                            {/* 1132 */}
                            <div className="flex items-center w-full">
                                {/* 11321: Share */}
                                <div className="flex items-center gap-[4px]">
                                    <img src={share} alt="share" className="w-[20px] h-[20px]" />
                                    <span className="text-[#222] font-noto text-[12px] font-normal leading-[13.8px]">シェア</span>
                                </div>
                                {/* 11322: Print count */}
                                <div className="flex flex-col items-start ml-[16px]">
                                    <div className="flex items-center justify-end w-full">
                                        <img src={complex} alt="complex" className="w-[20px] h-[20px]" />
                                        <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                        <span className="w-[12px] text-[#767676] text-right font-noto text-[14px] font-bold leading-[21px] ml-[4px]">{product?.printed_count || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Section 12 */}
                    <section className="flex flex-col items-start gap-[32px] w-full mt-[32px]">
                        {/* 121 */}
                        <div className="flex flex-col w-full rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] px-4 pb-5">
                            {/* 1211: Mobile image carousel */}
                            <div className="flex flex-wrap justify-center gap-[7px] py-[16px]">
                                {product.images.map((image, index) => (
                                    <div key={index} className="flex w-[152px] h-[153.197px] px-[26.93px] py-[2.992px] flex-col justify-center items-center rounded-[5.984px] bg-[#F6F6F6] relative">
                                        <div className="flex w-[98.142px] h-[147.213px] flex-col justify-center items-center flex-shrink-0 relative">
                                            <div className="flex w-[98.142px] h-[147.213px] flex-col justify-center items-center flex-shrink-0 rounded-[6px] bg-[#F6F6F6]">
                                                <img src={image} alt={product.title} className="w-[98.142px] h-[147.213px] object-cover rounded-[6px]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 1212: Print info blocks */}
                            <div className="inline-flex flex-col items-start w-full mt-[24px] mx-auto">
                                {/* 12121: Gradient header */}
                                <div className="flex px-[44px] py-[13.5px] rounded-t-[16px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] items-center gap-[8px] w-full whitespace-nowrap">
                                    <div className="flex items-center gap-[6px]">
                                        <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px]">プリント期限</span>
                                    </div>
                                    <div className="flex flex-col items-start ml-[16px]">
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px]">{product.print_deadline}まで</span>
                                    </div>
                                </div>
                                {/* 12122: Print options */}
                                <div className="flex flex-col items-center gap-[16px] w-full bg-[#F6F6F6] rounded-b-[16px] p-[12px]">
                                    {/* 121221: Famima/Lawson/Ministop */}
                                    <div className="flex w-full px-[16px] justify-between items-center rounded-[10px] bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]">
                                        <div className="flex flex-col items-center flex-1">
                                            <div className="flex h-[60px] py-[20px] justify-between items-center w-full">
                                                <span className="w-[160px] font-noto text-[12px] font-bold leading-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent whitespace-nowrap">ファミマ・ローソン・<br />ミニストップで印刷する</span>
                                                <div className="flex items-center gap-[8px] ml-[12px]">
                                                    <img src={shop1} alt="printshop" className="w-[33.2px] h-[24.5px]" />
                                                    <img src={shop2} alt="lawson" className="w-[33.2px] h-[24.4px]" />
                                                    <img src={shop3} alt="ministop" className="w-[33.2px] h-[24.4px]" />
                                                </div>
                                            </div>
                                            {/*12122112*/}
                                            <div className="relative w-[240px] h-[100px] mt-[8px]">
                                                <img 
                                                    src={product?.nwps_qr_code_url || qr} 
                                                    alt="qr" 
                                                    className="absolute top-0 left-0 w-[100px] h-[100px]" 
                                                />
                                                <span className="absolute top-[30px] left-[150px] text-[#000] font-noto text-[12px] font-normal leading-[16px]">ユーザー番号</span>
                                                <span className="absolute top-[50px] left-[120px] text-[#363636] font-noto text-[16px] font-bold leading-[16px] text-center">
                                                    {product?.nwps_user_code || '発行中...'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 121222: Seven Eleven */}
                                    {/* <div className="flex w-full h-[60px] px-[16px] justify-between items-center rounded-[10px] border border-[#D1D1D1] bg-white bg-opacity-50">
                                        <div className="flex items-center w-full h-[60px] py-[20px] justify-between">
                                            <span className="font-noto text-[12px] font-bold leading-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">セブンイレブンで印刷する</span>
                                            <img src={eleven} alt="eleven" className="w-[40px] h-[40px] rounded-full object-cover ml-[12px]" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            {/* 1213: Help link */}
                            <div className="flex flex-col items-center w-full h-[20px] mt-[32px] px-[16px]">
                                <div className="flex items-center gap-[6px]">
                                    <img src={question_circle} alt="question_circle" className="w-[16px] h-[16px]" />
                                    <span className="text-[#767676] font-noto text-[12px] font-normal leading-[16px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                </div>
                            </div>
                        </div>
                        {/* 122: Ranking */}
                        <div className="flex flex-col items-start w-full px-[16px] py-[24px] gap-[8px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                            {/* 1221: Ranking title and list */}
                            <div className="flex flex-col items-start gap-[12px] w-full">
                                <span className="text-[#000] font-noto text-[18px] font-bold leading-[24px]">ランキング</span>
                                {/* 12211: Ranking list */}
                                <div className="flex flex-col items-start gap-[16px] w-full">
                                    {product.top_buyers && product.top_buyers.map((buyer, index) => (
                                        <div key={index} className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                            <div className="flex items-center gap-[16px]">
                                                <div className="flex flex-col items-center pb-[8px]">
                                                    <span className={`font-noto font-bold ${index === 0 ? 'text-[24px] leading-[32px] text-[#AB31D3]' : index <= 2 ? 'text-[20px] leading-[28px] text-[#AB31D3]' : 'text-[18px] leading-[24px] text-[#222]'}`}>{index + 1}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                        <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                            <img src={buyer.user.image || default_user} alt={buyer.user.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                        <span className="text-[#000] font-noto text-[16px] font-bold leading-[24px]">{buyer.user.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[#767676] font-noto text-[14px] font-bold leading-[21px]">{buyer.total_quantity}点</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                {/* Mobile Section 2 */}
                <section className="flex md:hidden flex-col items-start py-[24px] px-[16px] gap-[24px] bg-[#F6F8FA] w-full">
                    <div className="flex flex-col items-start gap-[24px]">
                        {/* Left: 21 */}
                        <div className="flex items-start flex-shrink-0 ">
                            <div 
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => router.visit(`/${product.user.id}`)}
                            >
                                <img src={product.user.image || default_user} alt={product.user.name} className="w-[64px] h-[64px] rounded-full object-cover flex-shrink-0" />
                            </div>
                            {/* 211 */}
                            <div className="flex flex-col pl-[16px] items-start">
                                <div className="flex flex-col items-start gap-[12px]">
                                    <span 
                                        className="text-[#000] font-noto text-[16px] font-bold leading-[18px] cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => router.visit(`/${product.user.id}`)}
                                    >{product.user.name}</span>
                                    <div className="flex pt-[10px] gap-[4px]">
                                        <img src={x} alt="x" className="w-[40px] h-[40px] opacity-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right: 22 */}
                        <div className="flex flex-col items-start flex-shrink-0 ">
                            <div className="flex flex-col items-start flex-shrink-0">
                                <span className="text-[#000] font-noto text-[14px] font-normal leading-[21px]">
                                    {product.user.description}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default PurchasedProductExpand;