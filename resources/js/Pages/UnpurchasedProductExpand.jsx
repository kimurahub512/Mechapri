import React, { useEffect, useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import default_user from '@/assets/images/default-user.png';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import heart from '@/assets/images/heart_pink.svg';
import share from '@/assets/images/share.svg';
import complex from '@/assets/images/complex.svg';
import complex_black from '@/assets/images/complex_black.svg';
import question_circle from '@/assets/images/question_circle.svg';
import x from '@/assets/images/x_logo.svg';
import instagram from '@/assets/images/instagram.svg';
import favoriteshops from '@/assets/images/favoriteshop.svg';
import favoriteshops_follow from '@/assets/images/favoriteshop_white.svg';
import cart from '@/assets/images/icon-cart.svg';
import QuantityControl from '@/Components/QuantityControl';
import purchase_qr from '@/assets/images/purchase_qr.svg';
import print_qr from '@/assets/images/print_qr.svg';
import question from '@/assets/images/question_cloud.svg';
import bubble from '@/assets/images/bubble.svg';
import logo from '@/assets/images/logo_white.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';

const UnpurchasedProductExpand = ({ product }) => {
    const { auth } = usePage().props;
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const checkPassword = async () => {
            try {
                const response = await fetch(route('product.check.password.status'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                    body: JSON.stringify({ product_id: product.id }),
                });
                const data = await response.json();
                setIsUnlocked(data.isUnlocked);
            } catch (error) {
                console.error('Error checking password status:', error);
            }
        };

        if (product.display_mode === 'password') {
            checkPassword();
        }
    }, [product.id, product.display_mode]);

    const [quantities, setQuantities] = useState({
        cart: 1,
        direct: 1
    });

    const handleQuantityChange = (itemKey, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [itemKey]: newQuantity
        }));
    };

    return (
        <div className='product-details-no-footer-gap bg-[#FFF]'>
            <Head title="めちゃプリ" />
            <Header />
            <main className="hidden md:flex flex-col items-center px-[120px] pt-[44px] pb-[176px] w-full bg-[#FFF]">
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
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[64px] h-[64px] rounded-full object-cover" />
                                    </div>
                                </div>
                                {/* 11212 */}
                                <div className="flex flex-col items-start">
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
                                        }
                                    }}
                                    disabled={auth.user.id === product.user.id}
                                    className={`flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border transition-opacity ${auth.user.id === product.user.id
                                            ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                            : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.user.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                        }`}
                                >
                                    <img
                                        src={product.user.is_followed_by_current_user ? favoriteshops_follow : favoriteshops}
                                        alt="favoriteshop"
                                    />
                                    <span className={`text-center font-medium text-[14px] leading-[21px] font-noto ${auth.user.id === product.user.id
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
                            </div>
                        </div>
                        {/* 114 */}
                        <div className="flex flex-wrap justify-between items-center w-full">
                            {/* 1141 */}
                            <div className="flex items-center gap-[10px]">
                                {/* 11411 */}
                                <div className="flex flex-col items-start gap-[10px] py-[8px]">
                                    {/* 114111: Heart, お気に入り, 1000 */}
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
                                        className={`flex items-center gap-[4px] border-[1px] border-solid rounded-[6px] p-[8px] transition-opacity ${auth.user.id === product.user.id
                                                ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                                : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.is_favorited ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                            }`}
                                    >
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                        <span className={`font-noto text-[14px] font-bold leading-[21px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                            }`}>
                                            {product.is_favorited ? 'お気に入り中' : 'お気に入り'}
                                        </span>
                                        <span className={`font-noto text-[14px] font-bold leading-[21px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
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
                                            <img src={complex_black} alt="complex" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                            <span className="text-[#767676] text-right font-noto text-[14px] font-bold leading-[21px] ml-[4px]">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section 12 */}
                    <section className="flex flex-col items-start gap-[32px] w-[1200px] mt-[60px]">
                        {/* 121 */}
                        <div className="flex flex-col w-full rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] p-[70px_70px_92.5px_70px] ">
                            <div className="flex flex-col items-center gap-[24px]">
                                <div className="grid grid-cols-2 gap-6 w-full max-w-[496px] justify-items-center">
                                    {product.images.map((image, index) => (
                                        <div key={index} className="flex justify-center items-center rounded-[14px] bg-[#F6F6F6] relative">
                                            <div className="flex h-[348px] w-[232px] flex-col justify-center items-center relative">
                                                <div className={`flex h-[348px] w-[232px] flex-col justify-center items-center flex-shrink-0 rounded-[8px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                                                    {product.display_mode === 'normal' ? (
                                                        <img src={image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />
                                                    ) : product.display_mode === 'gacha' ? (
                                                        <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                            <img src={image} alt="ガチャ" className="h-full w-full object-cover filter blur-[4px] rounded-[8px]" />
                                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] rounded-[8px]" />
                                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                                <img src={bubble} alt="bubble" className="w-[42px] h-[42px]" />
                                                                <span className="text-white text-[15px] font-bold">ガチャ</span>
                                                                <span className="text-white text-[13px]">ランダムで1枚選定されます</span>
                                                            </div>
                                                            {/* Watermark Overlay for Gacha */}
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                <div className="absolute inset-0 opacity-30">
                                                                    <div className="absolute top-[20%] left-[-15%] transform -rotate-45 flex gap-6">
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                    </div>
                                                                    <div className="absolute top-[60%] left-[-10%] transform -rotate-45 flex gap-6">
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : product.display_mode === 'blur' ? (
                                                        <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                            <img src={image} alt="ぼかしフィルター" className="h-full w-full object-cover filter blur-[4px] rounded-[8px]" />
                                                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 filter blur-[4px] rounded-[8px]" />
                                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                                <img src={question} alt="question" className="w-[42px] h-[42px]" />
                                                                <span className="text-white text-[15px] font-bold">ぼかしフィルター</span>
                                                                <span className="text-white text-[13px]">印刷して確認しよう！</span>
                                                            </div>
                                                        </div>
                                                    ) : product.display_mode === 'password' && !isUnlocked ? (
                                                        <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                            <div className="absolute top-0 left-0 w-full h-full bg-[#586B88] rounded-[8px]" />
                                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                                <img src={lock} alt="lock" className="w-[42px] h-[42px]" />
                                                                <span className="text-[#CDD9EC] text-[15px] font-bold">パスワード</span>
                                                                <span className="text-[#CDD9EC] text-[13px]">PWを入れて印刷しよう</span>
                                                            </div>
                                                        </div>
                                                    ) : product.display_mode === 'password' && isUnlocked ? (
                                                        <div className="relative h-full w-full">
                                                            <img src={image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />
                                                            {/* Watermark Overlay for Password (unlocked) */}
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                <div className="absolute inset-0 opacity-30">
                                                                    <div className="absolute top-[15%] left-[-20%] transform -rotate-45 flex gap-6">
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                    </div>
                                                                    <div className="absolute top-[55%] left-[-15%] transform -rotate-45 flex gap-6">
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                        <img src={logo} alt="watermark" className="w-20 h-3 opacity-50" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : product.display_mode === 'cushion' ? (
                                                        <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                            <div className="absolute top-0 left-0 w-full h-full bg-[#A0A5AC] rounded-[8px]" />
                                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                                <img src={warning} alt="warning" className="w-[42px] h-[42px]" />
                                                                <span className="text-[#464F5D] text-[15px] font-bold">WARNING</span>
                                                                <span className="text-[#464F5D] text-[13px]">クリックして内容を確認</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative h-full w-full">
                                                            <img src={image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />
                                                            {/* Watermark Overlay - Always show for unpurchased products */}
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                <div className="absolute inset-0 opacity-40">
                                                                    <div className="absolute top-[10%] left-[-20%] transform -rotate-45 flex gap-8">
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                    </div>
                                                                    <div className="absolute top-[30%] left-[-10%] transform -rotate-45 flex gap-8">
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                    </div>
                                                                    <div className="absolute top-[50%] left-[-5%] transform -rotate-45 flex gap-8">
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                    </div>
                                                                    <div className="absolute top-[70%] left-[-15%] transform -rotate-45 flex gap-8">
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                    </div>
                                                                    <div className="absolute top-[90%] left-[-25%] transform -rotate-45 flex gap-8">
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                        <img src={logo} alt="watermark" className="w-24 h-4 opacity-60" />
                                                                    </div>
                                                                </div>
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-black bg-opacity-30 rounded-lg px-4 py-2">
                                                                        <span className="text-white text-sm font-bold">めちゃプリ</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center gap-[4px] mt-[36px]">
                                    <span className="text-black font-noto text-[18px] leading-[32px] ">{product.sales_deadline} まで購入できます</span>
                                    <div className="flex flex-row items-center">
                                        <span className="text-black font-noto font-bold text-[46px] leading-[54px]">{product.price}</span>
                                        <span className="text-black font-noto font-bold text-[24px] leading-[24px]">円</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-[24px] w-[504px]">
                                    <div className="flex flex-col items-center gap-[16px] w-full">
                                        <div className="flex flex-row items-center px-[24px] w-full">
                                            <div className="mr-auto">
                                                <QuantityControl
                                                    quantity={quantities.cart}
                                                    onQuantityChange={(newQuantity) => handleQuantityChange('cart', newQuantity)}
                                                />
                                            </div>
                                            <button className="flex w-[240px] h-[74px] px-[24px] justify-center items-center gap-[10px] rounded-[10px] bg-[#FF2AA1] ml-auto">
                                                <img src={cart} alt="favoriteshop" style={{ filter: 'brightness(0) invert(1)' }} />
                                                <span className="text-[#FFF] text-center font-bold text-[18px] leading-[20px] font-noto">カートに入れる</span>
                                            </button>
                                        </div>
                                        <div className="flex flex-row items-center px-[24px] w-full">
                                            <div className="mr-auto">
                                                <QuantityControl
                                                    quantity={quantities.direct}
                                                    onQuantityChange={(newQuantity) => handleQuantityChange('direct', newQuantity)}
                                                />
                                            </div>
                                            <button className="flex w-[240px] h-[74px] px-[24px] justify-center items-center rounded-[10px] bg-[#AB31D3] ml-auto">
                                                <span className="text-[#FFF] text-center font-bold text-[18px] leading-[20px] font-noto whitespace-nowrap">すぐにプリントコード購入</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/*explanation*/}
                                    {/* 1211: Explanation Section */}
                                    <div
                                        className="flex flex-col justify-center items-center self-stretch border-t"
                                        style={{ borderTop: '1px solid #E9E9E9' }}
                                    >
                                        {/* 12111 */}
                                        <div
                                            className="relative h-[243.5px] self-stretch flex"
                                            style={{ borderRadius: '10px 10px 0 0' }}
                                        >
                                            {/* 121111 */}
                                            <div
                                                className="absolute flex justify-center items-center"
                                                style={{ top: 24, left: 127, width: 233 }}
                                            >
                                                {/* 1211111 */}
                                                <div className="flex flex-col items-center px-[18.5px] py-[7px] rounded-[40px] bg-[#363636]">
                                                    <span className="text-white text-center font-light font-noto text-[14px] leading-[22px] whitespace-nowrap">
                                                        プリント用コードを購入したら…
                                                    </span>
                                                </div>
                                            </div>
                                            {/* 121112 */}
                                            <div
                                                className="absolute flex justify-between items-center"
                                                style={{ top: 78, left: 68, width: 350 }}
                                            >
                                                {/* 1211121 */}
                                                <div className="flex flex-col items-center gap-[4px] w-[172px] flex-shrink-0">
                                                    <img src={purchase_qr} alt="QR" />
                                                    <span className="text-[#363636] text-center font-normal font-noto text-[14px] leading-[21px]">
                                                        QRや番号などの<br />コードをGET
                                                    </span>
                                                </div>
                                                {/* 1211122 */}
                                                <div className="flex flex-col items-center gap-[4px] w-[172px] flex-shrink-0">
                                                    <img src={print_qr} alt="Print QR" />
                                                    <span className="text-[#363636] text-center font-normal font-noto text-[14px] leading-[21px] whitespace-pre-line">
                                                        コンビニのマルチコピー機{`\n`}にかざしてプリント
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" absolute flex items-center gap-[8px]" style={{ top: 222, left: 142 }}>
                                                <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                                <span className="text-[#767676] font-noto text-[13px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                            </div>
                                        </div>
                                        {/* 12112 */}
                                        <div className="flex min-h-[64px] p-4 justify-center items-center gap-[12px] self-stretch">
                                            {/* 121121 */}
                                            <div className="flex items-center gap-[12px]">
                                                {/* 1211211 */}
                                                <div className="flex items-center gap-[8px]">
                                                    <img src={complex} alt="complex" />
                                                    <span className="text-[#E862CB] font-noto text-[14px] font-bold leading-[14px]">プリント期限</span>
                                                </div>
                                                {/* 1211212 */}
                                                <div className="flex flex-col items-start opacity-70">
                                                    <span className="text-[#E862CB] font-noto text-[14px] font-bold leading-[14px]">{product.print_deadline}まで</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* Personal Info Footer (Frame 2) */}
            <section className="hidden md:flex flex-col items-center w-[1440px] pt-[48px] pb-[48px] px-[24px] gap-[24px] bg-[#F6F8FA] mx-auto">
                <div className="flex w-[1248px] justify-between items-start">
                    {/* Left: 21 */}
                    <div className="flex w-[400px] max-w-[1248px] items-start flex-shrink-0">
                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0" />
                        {/* 211 */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{product.user.name}</span>
                                <div className="flex pt-[10px] gap-[4px]">
                                    <img src={x} alt="x" className="w-[46.429px] h-[46.429px] opacity-100" />
                                    <img src={instagram} alt="instagram" className="w-[46.429px] h-[46.429px] opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: 22 */}
                    <div className="flex w-[800px] max-w-[1248px] flex-col items-start flex-shrink-0">
                        <div className="flex w-[800px] max-w-[1248px] flex-col items-start flex-shrink-0">
                            <span className="text-[#000] font-noto text-[16px] font-normal leading-[27.2px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Mobile Main Section */}
            <div className="flex flex-col gap-[45px]">
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
                                        <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                            <img src={product.user.image || default_user} alt={product.user.name} className="w-[64px] h-[64px] rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{product.user.name}</span>
                                </div>
                            </div>
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
                                    }
                                }}
                                disabled={auth.user.id === product.user.id}
                                className={`flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border transition-opacity ${auth.user.id === product.user.id
                                    ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                    : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.user.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                    }`}
                            >
                                <img
                                    src={product.user.is_followed_by_current_user ? favoriteshops_follow : favoriteshops}
                                    alt="favoriteshop"
                                />
                                <span className={`text-center font-medium text-[14px] leading-[21px] font-noto ${auth.user.id === product.user.id
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
                                    className={`flex flex-col items-start gap-[10px] p-[8px] rounded-[6px] border-[1px] border-solid transition-opacity ${auth.user.id === product.user.id
                                        ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                        : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.is_favorited ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                        }`}
                                >
                                    <div className="flex items-center gap-[4px]">
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                        <span className={`font-noto text-[12px] font-normal leading-[21px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'}`}>
                                            {product.is_favorited ? 'お気に入り中' : 'お気に入り'}
                                        </span>
                                        <span className={`font-['Red Hat Display'] text-[14px] font-bold leading-[15px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'}`}>
                                            {product.favorite_count}
                                        </span>
                                    </div>
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
                                        <img src={complex_black} alt="complex" className="w-[20px] h-[20px]" />
                                        <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                        <span className="w-[12px] text-[#767676] text-right font-noto text-[14px] font-bold leading-[21px] ml-[4px]">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Section 12 */}
                    <section className="flex flex-col items-start gap-[25px] w-full">
                        {/* 121 */}
                        <div className="flex flex-col w-full rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] px-4 py-4">
                            {/* 1211: Mobile image carousel */}
                            <div className="flex flex-wrap justify-center gap-4 py-[16px]">
                                {product.images.map((image, index) => (
                                    <div key={index} className="flex justify-center items-center rounded-[6px] bg-[#F6F6F6] relative">
                                        <div className="flex h-[147px] w-[98px] flex-col justify-center items-center flex-shrink-0 relative">
                                            <div className={`flex h-[147px] w-[98px] flex-col justify-center items-center flex-shrink-0 rounded-[6px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                                                {product.display_mode === 'normal' ? (
                                                    <img src={image} alt={product.title} className="h-[147px] w-[98px] object-cover rounded-[6px]" />
                                                ) : product.display_mode === 'gacha' ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                        <img src={image} alt="ガチャ" className="h-full w-full object-cover filter blur-[4px] rounded-[6px]" />
                                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] rounded-[6px]" />
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                            <img src={bubble} alt="bubble" className="w-[32px] h-[32px]" />
                                                            <span className="text-white text-[12px] font-bold">ガチャ</span>
                                                            <span className="text-white text-[10px]">ランダムで1枚選定されます</span>
                                                        </div>
                                                    </div>
                                                ) : product.display_mode === 'blur' ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                        <img src={image} alt="ぼかしフィルター" className="h-full w-full object-cover filter blur-[4px] rounded-[6px]" />
                                                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 filter blur-[4px] rounded-[6px]" />
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                            <img src={question} alt="question" className="w-[32px] h-[32px]" />
                                                            <span className="text-white text-[12px] font-bold">ぼかしフィルター</span>
                                                            <span className="text-white text-[10px]">印刷して確認しよう！</span>
                                                        </div>
                                                    </div>
                                                ) : product.display_mode === 'password' && !isUnlocked ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                        <div className="absolute top-0 left-0 w-full h-full bg-[#586B88] rounded-[6px]" />
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                            <img src={lock} alt="lock" className="w-[32px] h-[32px]" />
                                                            <span className="text-[#CDD9EC] text-[12px] font-bold">パスワード</span>
                                                            <span className="text-[#CDD9EC] text-[10px]">PWを入れて印刷しよう</span>
                                                        </div>
                                                    </div>
                                                ) : product.display_mode === 'password' && isUnlocked ? (
                                                    <img src={image} alt={product.title} className="h-[147px] w-[98px] object-cover rounded-[6px]" />
                                                ) : product.display_mode === 'cushion' ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                        <div className="absolute top-0 left-0 w-full h-full bg-[#A0A5AC] rounded-[6px]" />
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                            <img src={warning} alt="warning" className="w-[32px] h-[32px]" />
                                                            <span className="text-[#464F5D] text-[12px] font-bold">WARNING</span>
                                                            <span className="text-[#464F5D] text-[10px]">クリックして内容を確認</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={image} alt={product.title} className="h-[147px] w-[98px] object-cover rounded-[6px]" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 1213: Price and purchase info */}
                            <div className="flex flex-col items-center gap-[4px] mt-[24px]">
                                <span className="text-black font-noto text-[16px] leading-[27px]">{product.sales_deadline} まで購入できます</span>
                                <div className="flex flex-row items-center gap-[4px]">
                                    <span className="text-[#363636] font-noto font-bold text-[36px] leading-[48px]">{product.price}</span>
                                    <span className="text-[#363636] font-noto font-bold text-[20px] leading-[23px]">円</span>
                                </div>
                            </div>
                            {/* 1214: Quantity controls and action buttons */}
                            <div className="flex flex-col items-center gap-[16px] w-full mt-[24px] ">
                                <div className="flex flex-row items-center w-full">
                                    <div className="ml-auto">
                                        <QuantityControl
                                            quantity={quantities.cart}
                                            onQuantityChange={(newQuantity) => handleQuantityChange('cart', newQuantity)}
                                        />
                                    </div>
                                    <button className="flex w-[160px] h-[40px] px-[24px] justify-center items-center gap-[10px] rounded-[10px] bg-[#FF2AA1] mr-auto">
                                        <img src={cart} alt="cart" style={{ filter: 'brightness(0) invert(1)' }} className="w-[20px] h-[19px]" />
                                        <span className="text-[#FFF] text-center font-bold text-[12px] leading-[12px] font-noto whitespace-nowrap">カートに入れる</span>
                                    </button>
                                </div>
                                <div className="flex flex-row items-center w-full">
                                    <div className="ml-auto">
                                        <QuantityControl
                                            quantity={quantities.direct}
                                            onQuantityChange={(newQuantity) => handleQuantityChange('direct', newQuantity)}
                                        />
                                    </div>
                                    <button className="flex w-[160px] h-[40px] px-[16px] justify-center items-center rounded-[10px] bg-[#AB31D3] mr-auto">
                                        <span className="text-[#FFF] text-center font-bold text-[12px] leading-[12px] font-noto whitespace-nowrap">すぐにプリントコード購入</span>
                                    </button>
                                </div>
                            </div>

                            {/* 1216: Explanation section */}
                            <div className="flex flex-col justify-center items-center self-stretch border-t mt-[24px]" style={{ borderTop: '1px solid #E9E9E9' }}>
                                {/* 12161 */}
                                <div className="relative h-[229px] self-stretch flex" style={{ borderRadius: '8px 8px 0 0' }}>
                                    {/* 121611 */}
                                    <div className="absolute flex justify-center items-center" style={{ top: 24, left: 38, width: 233 }}>
                                        {/* 1216111 */}
                                        <div className="flex flex-col items-center px-[18.5px] py-[6px] rounded-[30px] bg-[#363636]">
                                            <span className="text-white text-center font-bold font-noto text-[12px] leading-[16px] whitespace-nowrap">
                                                プリント用コードを購入したら…
                                            </span>
                                        </div>
                                    </div>
                                    {/* 121612 */}
                                    <div className="absolute flex justify-between items-center" style={{ top: 78, left: 6, width: 300 }}>
                                        {/* 1216121 */}
                                        <div className="flex flex-col items-center gap-[3px] w-[147px] flex-shrink-0">
                                            <img src={purchase_qr} alt="QR" className="w-[68px] h-[68px]" />
                                            <span className="text-[#363636] text-center font-normal font-noto text-[12px] leading-[18px]">
                                                QRや番号などの<br />コードをGET
                                            </span>
                                        </div>
                                        {/* 1216122 */}
                                        <div className="flex flex-col items-center gap-[3px] w-[147px] flex-shrink-0">
                                            <img src={print_qr} alt="Print QR" className="w-[68px] h-[68px]" />
                                            <span className="text-[#363636] text-center font-normal font-noto text-[12px] leading-[18px]">
                                                コンビニのマルチコピー機{`\n`}にかざしてプリント
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute flex items-center gap-[6px]" style={{ top: 209, left: 45 }}>
                                        <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                        <span className="text-[#767676] font-noto text-[13px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                    </div>
                                </div>
                                {/* 12162 */}
                                <div className="flex min-h-[48px] p-3 justify-center items-center gap-[8px] self-stretch ">
                                    {/* 121621 */}
                                    <div className="flex items-center gap-[12px]  mt-[16px]">
                                        {/* 1216211 */}
                                        <div className="flex items-center gap-[8px]">
                                            <img src={complex} alt="complex" className="w-[20px] h-[20px]" />
                                            <span className="text-[#E862CB] font-noto text-[14px] font-bold leading-[14px]">プリント期限</span>
                                        </div>
                                        {/* 1216212 */}
                                        <div className="flex flex-col items-start opacity-70">
                                            <span className="text-[#E862CB] font-noto text-[14px] font-bold leading-[14px]">{product.print_deadline}まで</span>
                                        </div>
                                    </div>
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
                                    {/* 122111: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#AB31D3] font-noto text-[24px] font-bold leading-[32px]">1</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-noto text-[16px] font-bold leading-[24px]">{product.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122112: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#AB31D3] font-noto text-[20px] font-bold leading-[28px]">2</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-noto text-[16px] font-bold leading-[24px]">{product.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122113: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#AB31D3] font-noto text-[20px] font-bold leading-[28px]">3</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-noto text-[16px] font-bold leading-[24px]">{product.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122114: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#222] font-noto text-[18px] font-bold leading-[24px]">4</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-noto text-[16px] font-bold leading-[24px]">{product.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122115: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#222] font-noto text-[18px] font-bold leading-[24px]">5</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={product.user.image || default_user} alt={product.user.name} className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-noto text-[16px] font-bold leading-[24px]">{product.user.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                {/* Mobile Section 2 */}
                <section className="flex md:hidden flex-col items-center py-[24px] px-[16px] gap-[24px] bg-[#F6F8FA] mx-auto">
                    <div className="flex flex-col items-start gap-[24px]">
                        {/* Left: 21 */}
                        <div className="flex items-start flex-shrink-0 ">
                            <img src={product.user.image || default_user} alt={product.user.name} className="w-[64px] h-[64px] rounded-full object-cover flex-shrink-0" />
                            {/* 211 */}
                            <div className="flex flex-col pl-[16px] items-start">
                                <div className="flex flex-col items-start gap-[12px]">
                                    <span className="text-[#000] font-noto text-[16px] font-bold leading-[18px]">{product.user.name}</span>
                                    <div className="flex pt-[10px] gap-[4px]">
                                        <img src={x} alt="x" className="w-[40px] h-[40px] opacity-100" />
                                        <img src={instagram} alt="instagram" className="w-[40px] h-[40px] opacity-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right: 22 */}
                        <div className="flex flex-col items-start flex-shrink-0 ">
                            <div className="flex flex-col items-start flex-shrink-0">
                                <span className="text-[#000] font-noto text-[14px] font-normal leading-[21px]">
                                    こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
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

export default UnpurchasedProductExpand;
