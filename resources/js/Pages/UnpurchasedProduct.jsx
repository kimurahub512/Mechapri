import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import BadgeDisplay from '@/Components/BadgeDisplay';
import RankingSection from '@/Components/RankingSection';
import PersonalInfoSection from '@/Components/PersonalInfoSection';
import '@/../../resources/css/shopmanagement.css';
import heart from '@/assets/images/heart_pink.svg';
import share from '@/assets/images/share.png';
import complex from '@/assets/images/complex.svg';
import complex_black from '@/assets/images/complex_black.png';
import question_circle from '@/assets/images/question_circle.svg';
import x from '@/assets/images/x_logo.svg';
import instagram from '@/assets/images/instagram.svg';
import favoriteshops from '@/assets/images/favoriteshop.svg';
import favoriteshops_follow from '@/assets/images/favoriteshop_white.svg';
import cart from '@/assets/images/cart_white.png';
import QuantityControl from '@/Components/QuantityControl';

import purchase_qr from '@/assets/images/purchase_qr.svg';
import print_qr from '@/assets/images/print_qr.svg';
import default_user from '@/assets/images/default-user.png';
import bubble from '@/assets/images/bubble.svg';
import question from '@/assets/images/question_cloud.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';


const UnpurchasedProduct = ({ product }) => {
    const { auth } = usePage().props;
    const [password, setPassword] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [cushionRevealed, setCushionRevealed] = useState(false);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(route('product.verify.password'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    password: password
                }),
            });
            const data = await response.json();
            if (data.success) {
                setIsUnlocked(true);
                setPasswordError(false);
            } else {
                setPasswordError(true);
            }
        } catch (error) {
            console.error('Error verifying password:', error);
            setPasswordError(true);
        }
    };

    const [quantities, setQuantities] = useState({
        cart: 1,
        direct: 1,
        mobileCart: 1,
        mobileDirect: 1
    });

    const handleQuantityChange = (itemKey, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [itemKey]: newQuantity
        }));
    };
    return (
        <div className='product-details-no-footer-gap bg-[#FFF]'>
            <Header />
            <main className="hidden md:flex flex-col items-center px-[120px] pt-[164px] pb-[176px] w-full bg-[#FFF]">
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
                                    <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{product.user.title}</span>
                                </div>
                            </div>
                            {/* 1122: Edit/Delete buttons */}
                            <div className="flex items-center absolute right-0 top-[15px]">
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        
                                        // Check if user is authenticated
                                        if (!auth?.user) {
                                            router.visit('/login');
                                            return;
                                        }
                                        
                                        try {
                                            const response = await fetch(route('favoriteshops.toggle'), {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                },
                                                body: JSON.stringify({ shop_user_id: product.user.id }),
                                            });
                                            
                                            if (!response.ok) {
                                                if (response.status === 401) {
                                                    // Unauthorized - redirect to login
                                                    router.visit('/login');
                                                    return;
                                                }
                                                throw new Error(`HTTP error! status: ${response.status}`);
                                            }
                                            
                                            const data = await response.json();
                                            if (data.success) {
                                                router.reload();
                                            }
                                        } catch (error) {
                                            console.error('Error toggling shop follow:', error);
                                        }
                                    }}
                                    disabled={auth?.user && auth.user.id === product.user.id}
                                    className={`flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border transition-opacity ${!auth?.user || auth.user.id === product.user.id
                                            ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                            : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.user.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                        }`}
                                >
                                    <img
                                        src={product.user.is_followed_by_current_user ? favoriteshops_follow : favoriteshops}
                                        alt="favoriteshop"
                                    />
                                    <span className={`text-center font-bold text-[14px] leading-[21px] font-noto ${product.user.is_followed_by_current_user ? 'text-white' : 'text-[#FF2AA1]'
                                        }`}>
                                        {!auth?.user ? 'ログインして' : (product.user.is_followed_by_current_user ? 'フォロー中' : 'ショップをフォロー')}
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
                                {/* <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">{product.sales_deadline}まで販売</span> */}
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
                                            // Check if user is authenticated
                                            if (!auth?.user) {
                                                router.visit('/login');
                                                return;
                                            }
                                            
                                            try {
                                                const response = await fetch(route('favoriteproducts.toggle'), {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                    },
                                                    body: JSON.stringify({ product_id: product.id }),
                                                });
                                                
                                                if (!response.ok) {
                                                    if (response.status === 401) {
                                                        // Unauthorized - redirect to login
                                                        router.visit('/login');
                                                        return;
                                                    }
                                                    throw new Error(`HTTP error! status: ${response.status}`);
                                                }
                                                
                                                const data = await response.json();
                                                if (data.success) {
                                                    router.reload();
                                                }
                                            } catch (error) {
                                                console.error('Error toggling favorite:', error);
                                            }
                                        }}
                                        disabled={auth?.user && auth.user.id === product.user.id}
                                        className={`flex items-center gap-[4px] border-[1px] border-solid rounded-[6px] p-[8px] transition-opacity ${!auth?.user || auth.user.id === product.user.id
                                                ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                                : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.is_favorited ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                            }`}
                                    >
                                        <img src={heart} alt="heart" className={`w-[20px] h-[20px] ${product.is_favorited ? 'invert brightness-0' : ''}`} />
                                        <span className={`font-noto text-[14px] font-bold leading-[21px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                            }`}>
                                            {!auth?.user ? 'ログインして' : 'お気に入り'}
                                        </span>
                                        <span className={`font-noto text-[14px] font-bold leading-[21px] ${ product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
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
                                    <div className="flex items-center gap-[4px] cursor-pointer hover:opacity-80" onClick={async () => {
                                        try {
                                            // Generate the correct share URL for others to view this product
                                            const ownerUserId = product?.user?.id ?? product?.user_id;
                                            const shareUrl = ownerUserId 
                                                ? `${window.location.origin}/user/${ownerUserId}/unpurchasedproduct/${product.id}`
                                                : window.location.href;
                                            
                                            const shareData = {
                                                title: product?.title || 'Mechapuri',
                                                text: product?.description || '',
                                                url: shareUrl,
                                            };
                                            if (navigator.share) {
                                                await navigator.share(shareData);
                                            } else {
                                                await navigator.clipboard.writeText(shareData.url);
                                                alert('リンクをコピーしました');
                                            }
                                        } catch (e) {}
                                    }}>
                                        <img src={share} alt="share" className="w-[16px] h-[16px]" />
                                        <span className="text-[#222] font-noto text-[12px] font-normal leading-[13.8px]">シェア</span>
                                    </div>
                                </div>
                                {/* 11422 */}
                                <div className="flex flex-col items-start pl-[24px]">
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center justify-end w-full">
                                            <img src={complex_black} alt="complex" className="w-[20px] h-[20px]" />
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
                        <div className="flex flex-col w-full rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] p-[70px_230px_92.5px_226px]">
                            <div className="flex flex-col items-center gap-[24px]">
                                <div className="flex flex-col items-center gap-[16px]">
                                    {/* Blurred image with overlay */}
                                    <div className="flex w-[500px] px-[90px] py-[10px] justify-center items-center rounded-[16px] bg-[#F6F6F6] mx-auto relative">
                                        <div className="flex w-[320px] max-w-[396px] flex-col justify-center items-center flex-shrink-0 relative">
                                            <div className={`flex h-[480px] max-w-[396px] w-full flex-col justify-center items-center flex-shrink-0 rounded-[8px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                                                {product.display_mode === 'normal' ? (
                                                    <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />
                                                ) : product.display_mode === 'gacha' ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                        <img src={product.image} alt="ガチャ" className="h-full w-full object-cover filter blur-[4px] rounded-[8px]" />
                                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] rounded-[8px]" />
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                            <img src={bubble} alt="bubble" className="w-[42px] h-[42px]" />
                                                            <span className="text-white text-[15px] font-bold">ガチャ</span>
                                                            <span className="text-white text-[13px]">ランダムで1枚選定されます</span>
                                        </div>

                                            </div>
                                                ) : product.display_mode === 'blur' ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                        <img src={product.image} alt="ぼかしフィルター" className="h-full w-full object-cover filter blur-[4px] rounded-[8px]" />
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
                                                            <form onSubmit={handlePasswordSubmit} className="mt-4 flex flex-col items-center gap-2">
                                                                <input
                                                                    type="password"
                                                                    value={password}
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    className={`w-[200px] px-4 py-2 rounded-md border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#586B88]`}
                                                                    placeholder="パスワードを入力"
                                                                />
                                                                {passwordError && (
                                                                    <span className="text-red-500 text-[12px]">パスワードが正しくありません</span>
                                                                )}
                                                                <button
                                                                    type="submit"
                                                                    className="mt-2 px-4 py-2 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] text-white rounded-md hover:bg-opacity-90 transition-all"
                                                                >
                                                                    確認
                                                                </button>
                                                            </form>
                                            </div>

                                            </div>
                                                ) : product.display_mode === 'password' && isUnlocked ? (
                                                    <div className="relative h-full w-full">
                                                        <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />

                                        </div>
                                                ) : product.display_mode === 'cushion' ? (
                                                    <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                        {!cushionRevealed ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => setCushionRevealed(true)}
                                                                className="absolute top-0 left-0 w-full h-full bg-[#A0A5AC] rounded-[8px] cursor-pointer z-10"
                                                            >
                                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                                    <img src={warning} alt="warning" className="w-[42px] h-[42px]" />
                                                                    <span className="text-[#464F5D] text-[15px] font-bold">WARNING</span>
                                                                    <span className="text-[#464F5D] text-[13px]">クリックして内容を確認</span>
                                                                </div>
                                                            </button>
                                                        ) : null}
                                                        <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />
                                                    </div>
                                                ) : (
                                                    <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[8px]" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {product.images.length > 1 && (product.display_mode !== 'password' || isUnlocked) && (
                                    <BadgeDisplay
                                        buttonClassName="px-[16px] py-[8px] gap-[4px] rounded-[10px] border-[1px] border-solid border-[#FF2AA1]"
                                        textClassName="text-[#FF2AA1] text-[18px] font-medium leading-[18px]"
                                            images={product.images.slice(0, 3).map((url, index) => ({
                                                src: url,
                                                alt: `${product.title} image ${index + 1}`
                                            }))}
                                            text={`${product.images.length}点を全て表示`}
                                        textColor="#E862CB"
                                        borderColor="#FF2AA1"
                                        width="32px"
                                        height="32px"
                                        displayMode={product.display_mode}
                                        isUnlocked={isUnlocked}
                                            onClick={() => {
                                                const pathParts = window.location.pathname.split('/');
                                                const isOnUserShopPage = pathParts.length > 0 && /^\d+$/.test(pathParts[1]);

                                                if (isOnUserShopPage) {
                                                    const shopUserId = Number(pathParts[1]);
                                                    router.visit(route('user.product.unpurchased.expand', {
                                                        user_id: shopUserId,
                                                        id: product.id
                                                    }));
                                                } else {
                                                    router.visit(route('product.unpurchased.expand', {
                                                        id: product.id
                                                    }));
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col items-center gap-[4px]">
                                    <span className="text-black font-noto text-[18px] leading-[32px] ">{product.sales_deadline} まで購入できます</span>
                                    <div className="flex flex-row items-center">
                                        <span className="text-black font-noto font-bold text-[46px] leading-[54px]">{product.price}</span>
                                        <span className="text-black font-noto font-bold text-[24px] leading-[24px]">円</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-[16px] w-full">
                                    {product.display_mode !== 'password' || isUnlocked ? (
                                        <div className="flex flex-row items-center px-[24px] w-full">
                                            <div className="mr-auto">
                                                <QuantityControl
                                                        quantity={quantities.cart}
                                                        onQuantityChange={(newQuantity) => handleQuantityChange('cart', newQuantity)}
                                                />
                                </div>
                                            <button 
                                                onClick={async () => {
                                                    // Check if user is authenticated
                                                    if (!auth?.user) {
                                                        router.visit('/login');
                                                        return;
                                                    }
                                                    
                                                    try {
                                                        const response = await fetch(route('cart.add'), {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                            },
                                                            body: JSON.stringify({
                                                                product_batch_id: product.id,
                                                                quantity: quantities.cart
                                                            }),
                                                        });
                                                        
                                                        if (!response.ok) {
                                                            if (response.status === 401) {
                                                                // Unauthorized - redirect to login
                                                                router.visit('/login');
                                                                return;
                                                            }
                                                            throw new Error(`HTTP error! status: ${response.status}`);
                                                        }
                                                        
                                                        const data = await response.json();
                                                        if (data.success) {
                                                            // Show success message or redirect to cart
                                                            router.visit(route('cart.index'));
                                                        }
                                                    } catch (error) {
                                                        console.error('Error adding to cart:', error);
                                                    }
                                                }}
                                                className="flex w-[240px] h-[74px] px-[24px] justify-center items-center gap-[10px] rounded-[10px] bg-[#FF2AA1] ml-auto hover:opacity-90 transition-opacity"
                                            >
                                                <img src={cart} alt="cart" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]" />
                                                <span className="text-[#FFF] text-center font-bold text-[14px] sm:text-[16px] lg:text-[18px] leading-[16px] sm:leading-[18px] lg:leading-[20px] font-noto">カートに入れる</span>
                                            </button>
                                            
                                        </div>
                                    ) : null}
                                    {product.display_mode !== 'password' || isUnlocked ? (
                                        <div className="flex flex-row items-center px-[24px] w-full">
                                            <div className="mr-auto">
                                                <QuantityControl
                                                        quantity={quantities.direct}
                                                        onQuantityChange={(newQuantity) => handleQuantityChange('direct', newQuantity)}
                                                />
                                            </div>
                                            {/* <button className="flex w-[240px] h-[74px] px-[24px] justify-center items-center rounded-[10px] bg-[#AB31D3] 
                                            ml-auto">
                                                <span className="text-[#FFF] text-center font-bold text-[18px] leading-[20px] font-noto 
                                                whitespace-nowrap">すぐにプリントコード購入</span>
                                            </button> */}
                                            <button
                                                onClick={() => {
                                                    // Check if user is authenticated
                                                    if (!auth?.user) {
                                                        router.visit('/login');
                                                        return;
                                                    }
                                                    
                                                    router.visit(route('payment.checkout', { product: product.id }), {
                                                        data: { quantity: quantities.direct }
                                                    });
                                                }}
                                                className="flex w-[240px] h-[74px] px-[24px] justify-center items-center rounded-[10px] bg-[#AB31D3] ml-auto hover:bg-opacity-90 transition-all"
                                            >
                                                <span className="text-[#FFF] text-center font-bold text-[18px] leading-[20px] font-noto whitespace-nowrap">すぐにプリントコード購入</span>
                                            </button>
                                        </div>
                                    ) : null}
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
                                        <a href='/howtoprint' className=" absolute flex items-center gap-[8px]" style={{ top: 222, left: 142 }}>
                                            <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-noto text-[13px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                        </a>
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
                        {/* 122: Ranking */}
                        <RankingSection topBuyers={product.top_buyers} isMobile={false} />
                    </section>
                </div>
            </main>
            {/* Mobile Main Section */}
            <div className="flex flex-col pt-[74px] gap-[45px]">
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
                                        console.log('Toggling shop follow...');
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
                                            authUserId: auth?.user?.id
                                        });
                                    }
                                }}
                                disabled={!auth?.user || auth.user.id === product.user.id}
                                className={`flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border transition-opacity ${!auth?.user || auth.user.id === product.user.id
                                        ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                        : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.user.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                    }`}
                            >
                                <img
                                    src={product.user.is_followed_by_current_user ? favoriteshops_follow : favoriteshops}
                                    alt="favoriteshop"
                                />
                                <span className={`text-center font-medium text-[14px] leading-[21px] font-noto ${!auth?.user || auth.user.id === product.user.id
                                        ? 'text-[#767676]'
                                        : product.user.is_followed_by_current_user ? 'text-white' : 'text-[#FF2AA1]'
                                    }`}>
                                    {!auth?.user ? 'ログインして' : (product.user.is_followed_by_current_user ? 'フォロー中' : 'ショップをフォロー')}
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
                                    {/* <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">{product.sales_deadline}まで販売</span> */}
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
                                    disabled={!auth?.user || auth.user.id === product.user.id}
                                    className={`flex items-center gap-[4px] border-[1px] border-solid rounded-[6px] p-[8px] transition-opacity ${!auth?.user || auth.user.id === product.user.id
                                            ? 'border-[#D1D1D1] bg-[#F6F6F6] cursor-not-allowed'
                                            : `border-[#FF2AA1] cursor-pointer hover:opacity-80 ${product.is_favorited ? 'bg-[#FF2AA1]' : 'bg-white'}`
                                        }`}
                                >
                                        <img src={heart} alt="heart" className={`w-[20px] h-[20px] ${product.is_favorited ? 'invert brightness-0' : ''}`} />
                                    <span className={`font-noto text-[12px] font-normal leading-[21px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
                                        }`}>
                                        お気に入り
                                    </span>
                                    <span className={`font-noto text-[14px] font-bold leading-[15px] ${product.is_favorited ? 'text-white' : 'text-[#FF2AA1]'
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
                                    <img src={share} alt="share" className="w-[16px] h-[16px]" />
                                    <span className="text-[#222] font-noto text-[12px] font-normal leading-[13.8px]">シェア</span>
                                </div>
                                {/* 11322: Print count */}
                                <div className="flex flex-col items-start ml-[16px]">
                                    <div className="flex items-center justify-end w-full">
                                        <img src={complex_black} alt="complex" className="w-[20px] h-[20px]" />
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
                            {/* 1211: Blurred image with overlay */}
                            <div className="flex w-full px-[16px] py-[10px] justify-center items-center rounded-[10px] bg-[#F6F6F6] mx-auto mt-[24px] relative">
                                {/* Blurred image */}
                                <div className="flex w-full max-w-[200px] flex-col justify-center items-center flex-shrink-0 relative">
                                    <div className={`flex h-[298px] w-full flex-col justify-center items-center flex-shrink-0 rounded-[6px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                                        {product.display_mode === 'normal' ? (
                                            <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[6px]" />
                                        ) : product.display_mode === 'gacha' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <img src={product.image} alt="ガチャ" className="h-full w-full object-cover filter blur-[4px] rounded-[6px]" />
                                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                    <img src={bubble} alt="bubble" className="w-[24px] h-[24px]" />
                                                    <span className="text-white text-[10px] font-bold">ガチャ</span>
                                                    <span className="text-white text-[8px]">ランダムで1枚選定されます</span>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'blur' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <img src={product.image} alt="ぼかしフィルター" className="h-full w-full object-cover filter blur-[4px] rounded-[6px]" />
                                                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 filter blur-[4px] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                    <img src={question} alt="question" className="w-[24px] h-[24px]" />
                                                    <span className="text-white text-[10px] font-bold">ぼかしフィルター</span>
                                                    <span className="text-white text-[8px]">印刷して確認しよう！</span>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'password' && !isUnlocked ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <div className="absolute top-0 left-0 w-full h-full bg-[#586B88] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                    <img src={lock} alt="lock" className="w-[24px] h-[24px]" />
                                                    <span className="text-[#CDD9EC] text-[10px] font-bold">パスワード</span>
                                                    <span className="text-[#CDD9EC] text-[8px]">PWを入れて印刷しよう</span>
                                                    <form onSubmit={handlePasswordSubmit} className="mt-4 flex flex-col items-center gap-2">
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className={`w-[150px] px-3 py-1.5 rounded-md border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#586B88] text-[12px]`}
                                                            placeholder="パスワードを入力"
                                                        />
                                                        {passwordError && (
                                                            <span className="text-red-500 text-[10px]">パスワードが正しくありません</span>
                                                        )}
                                                        <button
                                                            type="submit"
                                                            className="mt-2 px-3 py-1.5 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] text-white rounded-md hover:bg-opacity-90 transition-all text-[12px]"
                                                        >
                                                            確認
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'password' && isUnlocked ? (
                                            <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[6px]" />
                                        ) : product.display_mode === 'cushion' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                {!cushionRevealed ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setCushionRevealed(true)}
                                                        className="absolute top-0 left-0 w-full h-full bg-[#A0A5AC] rounded-[6px] cursor-pointer z-10"
                                                    >
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                            <img src={warning} alt="warning" className="w-[24px] h-[24px]" />
                                                            <span className="text-[#464F5D] text-[10px] font-bold">WARNING</span>
                                                            <span className="text-[#464F5D] text-[8px]">クリックして内容を確認</span>
                                                        </div>
                                                    </button>
                                                ) : null}
                                                <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[6px]" />
                                            </div>
                                        ) : (
                                            <img src={product.image} alt={product.title} className="h-full w-full object-cover rounded-[6px]" />
                                        )}
                                    </div>
                                </div>
                               
                            </div>
                            {/* 1212: Badge display */}
                            <div className="flex justify-center w-full mt-[16px]">
                                {product.images.length > 1 && (product.display_mode !== 'password' || isUnlocked) && (
                                <BadgeDisplay
                                    buttonClassName="px-[12px] py-[6px] gap-[3px] rounded-[10px] border-[1px] border-solid border-[#E862CB]"
                                    textClassName="text-[#E862CB] text-[18px] font-medium leading-[18px]"
                                        images={product.images.slice(0, 3).map((url, index) => ({
                                            src: url,
                                            alt: `${product.title} image ${index + 1}`
                                        }))}
                                        text={`${product.images.length}点を全て表示`}
                                    width="24px"
                                    height="24px"
                                    displayMode={product.display_mode}
                                    isUnlocked={isUnlocked}
                                        onClick={() => {
                                            const pathParts = window.location.pathname.split('/');
                                            const isOnUserShopPage = pathParts.length > 0 && /^\d+$/.test(pathParts[1]);

                                            if (isOnUserShopPage) {
                                                const shopUserId = Number(pathParts[1]);
                                                router.visit(route('user.product.unpurchased.expand', {
                                                    user_id: shopUserId,
                                                    id: product.id
                                                }));
                                            } else {
                                                router.visit(route('product.unpurchased.expand', {
                                                    id: product.id
                                                }));
                                            }
                                        }}
                                    />
                                )}
                            </div>
                            {/* 1213: Price and purchase info */}
                            <div className="flex flex-col items-center gap-[4px] mt-[24px]">
                                <span className="text-black font-noto text-[16px] leading-[27px]">{product.sales_deadline} まで購入できます</span>
                                <div className="flex flex-row items-center gap-[4px]">
                                    <span className="text-black font-noto font-bold text-[36px] leading-[48px]">{product.price}</span>
                                    <span className="text-black font-noto font-bold text-[20px] leading-[23px]">円</span>
                                </div>
                            </div>
                            {/* 1214: Quantity controls and action buttons */}
                            <div className="flex flex-col items-center gap-[16px] w-full mt-[24px] ">
                                {product.display_mode !== 'password' || isUnlocked ? (
                                    <div className="flex flex-row items-center w-full">
                                        <div className="ml-auto">
                                            <QuantityControl
                                                    quantity={quantities.mobileCart}
                                                    onQuantityChange={(newQuantity) => handleQuantityChange('mobileCart', newQuantity)}
                                            />
                                        </div>
                                        <button 
                                            onClick={async () => {
                                                // Check if user is authenticated
                                                if (!auth?.user) {
                                                    router.visit('/login');
                                                    return;
                                                }
                                                
                                                try {
                                                    const response = await fetch(route('cart.add'), {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                        },
                                                        body: JSON.stringify({
                                                            product_batch_id: product.id,
                                                            quantity: quantities.mobileCart
                                                        }),
                                                    });
                                                    
                                                    if (!response.ok) {
                                                        if (response.status === 401) {
                                                            // Unauthorized - redirect to login
                                                            router.visit('/login');
                                                            return;
                                                        }
                                                        throw new Error(`HTTP error! status: ${response.status}`);
                                                    }
                                                    
                                                    const data = await response.json();
                                                    if (data.success) {
                                                        // Show success message or redirect to cart
                                                        router.visit(route('cart.index'));
                                                    }
                                                } catch (error) {
                                                    console.error('Error adding to cart:', error);
                                                }
                                            }}
                                            className="flex w-[160px] h-[40px] px-[24px] justify-center items-center gap-[10px] rounded-[10px] bg-[#FF2AA1] mr-auto hover:opacity-90 transition-opacity"
                                        >
                                            <img src={cart} alt="cart" className="w-[20px] h-[19px]" />
                                            <span className="text-[#FFF] text-center font-bold text-[12px] leading-[12px] font-noto whitespace-nowrap">カートに入れる</span>
                                        </button>
                                    </div>
                                ) : null}
                                {product.display_mode !== 'password' || isUnlocked ? (
                                    <div className="flex flex-row items-center w-full">
                                        <div className="ml-auto">
                                            <QuantityControl
                                                    quantity={quantities.mobileDirect}
                                                    onQuantityChange={(newQuantity) => handleQuantityChange('mobileDirect', newQuantity)}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                // Check if user is authenticated
                                                if (!auth?.user) {
                                                    router.visit('/login');
                                                    return;
                                                }
                                                
                                                router.visit(route('payment.checkout', { product: product.id }), {
                                                    data: { quantity: quantities.mobileDirect }
                                                });
                                            }}
                                            className="flex w-[160px] h-[40px] px-[16px] justify-center items-center rounded-[10px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mr-auto hover:bg-opacity-90 transition-all"
                                        >
                                            <span className="text-[#FFF] text-center font-bold text-[12px] leading-[12px] font-noto whitespace-nowrap">すぐにプリントコード購入</span>
                                        </button>
                                    </div>
                                ) : null}
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
                                    <a href='/howtoprint' className="absolute flex items-center gap-[6px]" style={{ top: 209, left: 45 }}>
                                        <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                        <span className="text-[#767676] font-noto text-[13px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                    </a>
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
                        <RankingSection topBuyers={product.top_buyers} isMobile={true} />
                    </section>
                </section>
            </div>
            {/* Personal Info Footer */}
            <PersonalInfoSection user={product.user} defaultUserImage={default_user} />
            <Footer />
        </div>
    );
};

export default UnpurchasedProduct;