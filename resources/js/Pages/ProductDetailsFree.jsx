import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import RankingSection from '@/Components/RankingSection';
import ConfirmationModal from '@/Components/ConfirmationModal';
import BadgeDisplay from '@/Components/BadgeDisplay';
import PersonalInfoSection from '@/Components/PersonalInfoSection';
import QRCodeDisplay from '@/Components/QRCodeDisplay';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/productdetails/photo1.jpg';
import favoriteshop from '@/assets/images/favoriteshop.svg';
import favoriteshop_white from '@/assets/images/favoriteshop_white.svg';
import pen from '@/assets/images/pencil_line_black.svg';
import recyclebin from '@/assets/images/recyclebin.png';
import heart from '@/assets/images/heart_pink.svg';
import heart_gray from '@/assets/images/heart.png';
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
import defaultUser from '@/assets/images/default-user.png';
import bubble from '@/assets/images/bubble.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';


const ProductDetailsFree = () => {
    const { product, auth } = usePage().props;

    // Check if current user is the product owner
    const isOwner = product?.is_owner || false;
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(route('product-batches.destroy', { productBatch: product?.id }), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                const ownerId = auth?.user?.id || product?.user?.id;
                router.visit(`/${ownerId}`);
            } else {
                console.error(data.message || '削除に失敗しました');
                setIsConfirmOpen(false);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setIsConfirmOpen(false);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleShare = async () => {
        try {
            // Generate the correct share URL for others to view this product
            const ownerUserId = product?.user?.id ?? product?.user_id;
            const shareUrl = ownerUserId 
                ? `${window.location.origin}/user/${ownerUserId}/purchasedproduct/${product.id}`
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
        } catch (err) {
            // Ignore cancel/errors
        }
    };

    const toggleFollow = async () => {
        // Check if user is authenticated
        if (!auth?.user) {
            // Redirect to login page
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
    };

    const toggleFavoriteProduct = async () => {
        // Check if user is authenticated
        if (!auth?.user) {
            // Redirect to login page
            router.visit('/login');
            return;
        }

        // Check if CSRF token is available
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        if (!csrfToken) {
            console.error('CSRF token not found');
            return;
        }

        try {
            const response = await fetch(route('favoriteproducts.toggle'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
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
    };

    return (
        <div className='product-details-no-footer-gap bg-[#F6F8FA]'>
            <Header />
            <main className="hidden md:flex flex-col items-center px-[120px] pt-[134px] pb-[176px] w-full bg-[#F6F8FA]">
                {/* Frame 1 */}
                <div className="flex flex-col items-center gap-[41px] w-full max-w-[1200px]">
                    {/* 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-full relative">
                        {/* 111: 非公開中の作品です */}
                        {isOwner && (<div className="flex flex-col items-center w-full p-[8px_9px] border border-[#FF8D4E] bg-[#FF2AA1] rounded">
                            <span className="text-white text-center font-noto text-[14px] font-bold leading-[22px]">{product?.is_public ? '' : '非'}公開中の作品です</span>
                        </div>)}
                        {/* 112 */}
                        <div className="flex flex-col justify-center items-start h-[66px] w-full relative">
                            {/* 1121 */}
                            <div className="flex items-center w-full">
                                {/* 11211 */}
                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                    {/* 112111 */}
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={product?.user?.image || defaultUser} alt="user" className="w-[64px] h-[64px] rounded-full object-cover" />
                                    </div>
                                </div>
                                {/* 11212 */}
                                <div className="flex flex-col items-start">
                                    <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{product?.user?.name || 'User'}</span>
                                </div>
                            </div>
                            {/* 1122: Edit/Delete buttons or Follow/Favorite buttons */}
                            <div className="flex items-center gap-[8px] absolute right-0 top-[15px]">
                                {isOwner ? (
                                    <>
                                        {/* 11221: Edit */}
                                        <button onClick={() => router.visit(`/myshop/registerproduct/${product?.id}/edit`)} className="flex items-center gap-[8px] w-[90px] h-[34px] px-[16px] rounded-[5px] bg-[#E9E9E9]">
                                            <img src={pen} alt="edit" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-noto text-[12px] font-bold leading-[18px]">編集</span>
                                        </button>
                                        {/* 11222: Delete */}
                                        <button onClick={() => setIsConfirmOpen(true)} className="flex items-center gap-[8px] w-[90px] h-[34px] px-[16px] rounded-[5px] bg-[#E9E9E9]">
                                            <img src={recyclebin} alt="delete" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-noto text-[12px] font-bold leading-[18px]">削除</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Follow button */}
                                        <button onClick={toggleFollow} className={`flex items-center gap-[8px] h-[34px] px-[16px] rounded-[8px] bg-[#F6F8FA]  border-[1px] border-[#FF2AA1] hover:opacity-80 transition-opacity ${product?.user?.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-[#F6F8FA]'}`}>
                                            <img src={product?.user?.is_followed_by_current_user ? favoriteshop_white : favoriteshop} alt="follow" className="w-[20px] h-[20px]" />
                                            <span className={`font-noto text-[12px] font-bold leading-[18px] whitespace-nowrap ${product?.user?.is_followed_by_current_user ? 'text-white' : 'text-[#FF2AA1]'}`}>
                                                {product?.user?.is_followed_by_current_user ? 'フォロー中' : 'フォロー'}
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full">
                            {/* 1131: Title */}
                            <div className="flex flex-col items-start w-[1200px]">
                                <span className="text-[#363636] font-noto text-[36px] font-bold leading-[54px]">{product?.title || ''}</span>
                            </div>
                            {/* 1132: Description and Date */}
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-noto text-[18px] font-normal leading-[32.4px]">{product?.description || ''}</span>
                                <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">
                                    {product?.sales_deadline ? `${product.sales_deadline}まで販売` : '販売期限なし'}
                                </span>
                            </div>
                        </div>
                        {/* 114 */}
                        <div className="flex flex-wrap justify-between items-center pb-[12px] w-full border-b border-[#D1D1D1]">
                            {/* 1141 */}
                            <div className="flex items-center gap-[10px]">
                                {/* 11411 */}
                                <div className="flex flex-col items-start gap-[10px]">
                                    {/* 114111: Heart, お気に入り, 1000 */}
                                    {isOwner ? (
                                        <div className="flex items-center gap-[4px]">
                                            <img src={heart_gray} alt="heart" className="w-[20px] h-[20px]" />
                                            <span className="text-[#363636] font-noto text-[14px] font-normal leading-[21px]">お気に入り</span>
                                            <span className="text-[#363636] font-noto text-[14px] font-normal leading-[21px]">{product?.favorite_count || 0}</span>
                                        </div>
                                    ) : (
                                        auth?.user ? (
                                            <button onClick={toggleFavoriteProduct} className={`flex items-center gap-[4px] border-[1px] border-[#FF2AA1] rounded-[8px] p-[8px] hover:opacity-80 transition-opacity ${product?.is_favorited ? 'bg-[#FF2AA1]' : 'bg-[#F6F8FA]'}`}>
                                                <img src={heart} alt="heart" className={`w-[20px] h-[20px] ${product?.is_favorited ? 'invert brightness-0' : ''}`} />
                                                <span className={`font-noto text-[14px] font-normal leading-[21px] ${product?.is_favorited ? 'text-white' : 'text-[#FF2AA1]'}`}>お気に入り</span>
                                                <span className={`font-noto text-[14px] font-normal leading-[21px] ${product?.is_favorited ? 'text-white' : 'text-[#FF2AA1]'}`}>{product?.favorite_count || 0}</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => router.visit('/login')} className="flex items-center gap-[4px] border-[1px] border-[#FF2AA1] rounded-[8px] p-[8px] hover:opacity-80 transition-opacity bg-[#F6F8FA]">
                                                <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                                <span className="font-noto text-[14px] font-normal leading-[21px] text-[#FF2AA1]">ログインして</span>
                                                <span className="font-noto text-[14px] font-normal leading-[21px] text-[#FF2AA1]">{product?.favorite_count || 0}</span>
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* 1142 */}
                            <div className="flex items-center h-[32px] gap-[4px]">
                                {/* 11421 */}
                                <div className="flex flex-col items-start pl-[4px]">
                                    <div className="flex items-center gap-[4px] cursor-pointer hover:opacity-80" onClick={handleShare}>
                                        <img src={share} alt="share" className="w-[16px] h-[16px]" />
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
                        <div className="flex flex-col h-[1070px] w-full rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] p-0">
                            {/* 1211: Blurred image with overlay */}
                            <div className="flex w-[500px] px-[90px] py-[10px] justify-center items-center rounded-[16px] bg-[#F6F6F6] mx-auto mt-[40px] relative">
                                {/* Blurred image */}
                                <div className="flex w-[320px] max-w-[396px] flex-col justify-center items-center flex-shrink-0 relative">
                                    <div className={`flex h-[480px] max-w-[396px] w-full flex-col justify-center items-center flex-shrink-0 rounded-[8px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                                        {product.display_mode === 'normal' ? (
                                            <img src={product?.image || photo1} alt={product?.title || 'main'} className="h-full w-full object-cover rounded-[8px]" />
                                        ) : product.display_mode === 'gacha' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                <img src={product?.image || photo1} alt="ガチャ" className="h-full w-full object-cover filter blur-[4px] rounded-[8px]" />
                                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px] rounded-[8px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[5px]">
                                                    <img src={bubble} alt="bubble" className="w-[42px] h-[42px]" />
                                                    <span className="text-white text-[15px] font-bold">ガチャ</span>
                                                    <span className="text-white text-[13px]">ランダムで1枚選定されます</span>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'blur' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[8px]">
                                                <img src={product?.image || photo1} alt="ぼかしフィルター" className="h-full w-full object-cover filter blur-[4px] rounded-[8px]" />
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
                                                <img src={product?.image || photo1} alt={product?.title || 'main'} className="h-full w-full object-cover rounded-[8px]" />
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
                                            <img src={product?.image || photo1} alt={product?.title || 'main'} className="h-full w-full object-cover rounded-[8px]" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* BadgeDisplay for multiple images */}
                            {product.images && product.images.length > 1 && (product.display_mode !== 'password' || isUnlocked) && (
                                <div className="flex justify-center w-full mt-[16px]">
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
                                            router.visit(route('product.details.free.expand', {
                                                id: product.id
                                            }));
                                        }}
                                    />
                                </div>
                            )}
                            {/* 1212: Print info blocks */}
                            <div className="inline-flex flex-col items-start w-[500px] mt-[40px] mx-auto">
                                {/* 12121: Gradient header */}
                                <div className="flex px-[140px] py-[13.649px] pr-[137px] rounded-t-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] items-center gap-[10px] w-full whitespace-nowrap">
                                    <div className="flex items-center gap-[8px] ">
                                        <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px] ">プリント期限</span>
                                    </div>
                                    <div className="flex flex-col items-start ml-[24px]">
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px]">{product?.print_deadline || '2025/10/05'}まで</span>
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
                                            <QRCodeDisplay 
                                                product={product} 
                                                isMobile={false}
                                                className="w-[358px] h-[150px] mt-[12px]"
                                            />
                                        </div>
                                    </div>
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
                        <RankingSection topBuyers={product?.top_buyers} isMobile={false} />
                    </section>
                </div>
            </main>
            {/* Mobile Main Section */}
            <div className="flex flex-col gap-[84px] pt-[74px]">
                <section className="flex flex-col items-start gap-[24px] px-4 md:hidden w-full pt-[32px] bg-[#F6F8FA] mt-[-12px]">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-[343px]">
                        {/* 111: 非公開中の作品です */}
                        {isOwner && (
                            <div className="flex flex-col justify-center items-center w-full p-[8px_9px] border border-[#FF8D4E] bg-[#FF2AA1]">
                                <span className="w-full text-white text-center font-noto text-[14px] font-bold leading-[22px]">{product?.is_public ? '' : '非'}公開中の作品です</span>
                            </div>)}
                        {/* 112 */}
                        <div className="flex flex-col items-start gap-[24px] w-full">
                            {/* 1121 */}
                            <div className="flex flex-col items-start gap-[12px] w-full">
                                {/* 11211 */}
                                <div className="flex items-center w-full">
                                    {/* 112111 */}
                                    <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                        <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                            <img src={product?.user?.image || defaultUser} alt="user" className="w-[64px] h-[64px] rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="text-[#000] font-noto text-[21px] font-bold leading-[32px]">{product?.user?.name || 'User'}</span>
                                </div>
                            </div>
                            {!isOwner && (
                                <>
                                    {/* Follow button (match desktop style) */}
                                    <button onClick={toggleFollow} className={`flex items-center gap-[8px] rounded-[40px] border border-[#FF2AA1] px-[16px] py-[9px] ${product?.user?.is_followed_by_current_user ? 'bg-[#FF2AA1]' : 'bg-[#F6F8FA]'}`}>
                                        <img src={product?.user?.is_followed_by_current_user ? favoriteshop_white : favoriteshop} alt="follow" className="w-[20px] h-[20px]" />
                                        <span className={`font-noto text-[12px] font-bold leading-[18px] ${product?.user?.is_followed_by_current_user ? 'text-white' : 'text-[#FF2AA1]'}`}>
                                            {product?.user?.is_followed_by_current_user ? 'フォロー中' : 'ショップをフォロー'}
                                        </span>
                                    </button>
                                </>
                            )}
                            <div className="flex flex-col items-start gap-[2px] w-full">
                                {/* 11221 */}
                                <div className="flex flex-col justify-center items-start gap-[12px] w-full">
                                    <span className="text-[#363636] text-left font-noto text-[24px] font-bold leading-[24px] w-full">{product?.title || ''}</span>
                                </div>
                                {/* 11222 */}
                                <div className="flex flex-col items-start gap-[4px] w-full">
                                    <span className="text-[#363636] font-noto text-[14px] font-bold leading-[14px] w-full">{product?.description || ''}</span>
                                    <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">
                                        {product?.sales_deadline ? `${product.sales_deadline}まで販売` : '販売期限なし'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start gap-[10px] mt-[10px]">
                                    {isOwner ? (
                                        <div className="flex items-center gap-[4px]">
                                            <img src={heart_gray} alt="heart" className="w-[20px] h-[20px]" />
                                            <span className="text-[#363636] font-noto text-[12px] font-normal leading-[18px]">お気に入り</span>
                                            <span className="text-[#363636] font-['Red Hat Display'] text-[14px] font-bold leading-[21px]">{product?.favorite_count || 0}</span>
                                        </div>
                                    ) : (
                                        auth?.user ? (
                                            <button onClick={toggleFavoriteProduct} className={`flex items-center gap-[4px] border-[1px] border-[#FF2AA1] rounded-[5px] p-[8px] ${product?.is_favorited ? 'bg-[#FF2AA1]' : 'bg-[#F6F8FA]'}`}>
                                                <img src={heart} alt="heart" className={`w-[20px] h-[20px] ${product?.is_favorited ? 'invert brightness-0' : ''}`} />
                                                <span className={`font-noto text-[12px] font-normal leading-[18px] ${product?.is_favorited ? 'text-white' : 'text-[#FF2AA1]'}`}>お気に入り</span>
                                                <span className={`font-['Red Hat Display'] text-[14px] font-bold leading-[21px] ${product?.is_favorited ? 'text-white' : 'text-[#FF2AA1]'}`}>{product?.favorite_count || 0}</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => router.visit('/login')} className="flex items-center gap-[4px] border-[1px] border-[#FF2AA1] rounded-[5px] p-[8px] bg-[#F6F8FA]">
                                                <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                                <span className="font-noto text-[12px] font-normal leading-[18px] text-[#FF2AA1]">ログインして</span>
                                                <span className="font-['Red Hat Display'] text-[14px] font-bold leading-[21px] text-[#FF2AA1]">{product?.favorite_count || 0}</span>
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* 1123: Edit/Delete or Follow (favorite is in the info block below to match desktop) */}
                            {isOwner && (
                                <div className="flex items-center gap-[13px] w-full">
                                    <>
                                        {/* 11231: Edit */}
                                        <button onClick={() => router.visit(`/myshop/registerproduct/${product?.id}/edit`)} className="flex items-center gap-[8px] bg-[#E9E9E9] rounded-[5px] px-[16px] py-[9px]">
                                            <img src={pen} alt="edit" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-noto text-[12px] font-bold leading-[18px]">編集</span>
                                        </button>
                                        {/* 11232: Delete */}
                                        <button onClick={() => setIsConfirmOpen(true)} className="flex items-center gap-[8px] bg-[#E9E9E9] rounded-[5px]  px-[16px] py-[9px]">
                                            <img src={recyclebin} alt="delete" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-noto text-[12px] font-bold leading-[18px]">削除</span>
                                        </button>
                                    </>
                                </div>
                            )}
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full pb-[16px] border-b border-[#D1D1D1]">
                            {/* 1132 */}
                            <div className="flex items-center w-full">
                                {/* 11321: Share */}
                                <div className="flex items-center gap-[4px] cursor-pointer hover:opacity-80" onClick={handleShare}>
                                    <img src={share} alt="share" className="w-[16px] h-[16px]" />
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
                            {/* 1211: Blurred image with overlay */}
                            <div className="flex w-full px-[16px] py-[10px] justify-center items-center rounded-[10px] bg-[#F6F6F6] mx-auto mt-[24px] relative">
                                {/* Blurred image */}
                                <div className="flex w-full max-w-[200px] flex-col justify-center items-center flex-shrink-0 relative">
                                    <div className={`flex h-[298px] w-full flex-col justify-center items-center flex-shrink-0 rounded-[6px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                                        {product.display_mode === 'normal' ? (
                                            <img src={product?.image || photo1} alt={product?.title || 'main'} className="h-full w-full object-cover rounded-[6px]" />
                                        ) : product.display_mode === 'gacha' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <img src={product?.image || photo1} alt="ガチャ" className="h-full w-full object-cover filter blur-[2px] rounded-[6px]" />
                                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[2px] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[3px]">
                                                    <img src={bubble} alt="bubble" className="w-[32px] h-[32px]" />
                                                    <span className="text-white text-[12px] font-bold">ガチャ</span>
                                                    <span className="text-white text-[10px]">ランダムで1枚選定されます</span>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'blur' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <img src={product?.image || photo1} alt="ぼかしフィルター" className="h-full w-full object-cover filter blur-[2px] rounded-[6px]" />
                                                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 filter blur-[2px] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[3px]">
                                                    <img src={question} alt="question" className="w-[32px] h-[32px]" />
                                                    <span className="text-white text-[12px] font-bold">ぼかしフィルター</span>
                                                    <span className="text-white text-[10px]">印刷して確認しよう！</span>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'password' && !isUnlocked ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <div className="absolute top-0 left-0 w-full h-full bg-[#586B88] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[3px]">
                                                    <img src={lock} alt="lock" className="w-[32px] h-[32px]" />
                                                    <span className="text-[#CDD9EC] text-[12px] font-bold">パスワード</span>
                                                    <span className="text-[#CDD9EC] text-[10px]">PWを入れて印刷しよう</span>
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
                                                            className="mt-2 px-3 py-1.5 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]  text-white rounded-md hover:bg-opacity-90 transition-all text-[12px]"
                                                        >
                                                            確認
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        ) : product.display_mode === 'password' && isUnlocked ? (
                                            <img src={product?.image || photo1} alt={product?.title || 'main'} className="h-full w-full object-cover rounded-[6px]" />
                                        ) : product.display_mode === 'cushion' ? (
                                            <div className="flex relative overflow-hidden h-full w-full rounded-[6px]">
                                                <div className="absolute top-0 left-0 w-full h-full bg-[#A0A5AC] rounded-[6px]" />
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[3px]">
                                                    <img src={warning} alt="warning" className="w-[32px] h-[32px]" />
                                                    <span className="text-[#464F5D] text-[12px] font-bold">WARNING</span>
                                                    <span className="text-[#464F5D] text-[10px]">クリックして内容を確認</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <img src={product?.image || photo1} alt={product?.title || 'main'} className="h-full w-full object-cover rounded-[6px]" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* BadgeDisplay for multiple images */}
                            {product.images && product.images.length > 1 && (product.display_mode !== 'password' || isUnlocked) && (
                                <div className="flex justify-center w-full mt-[16px]">
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
                                            router.visit(route('product.details.free.expand', {
                                                id: product.id
                                            }));
                                        }}
                                    />
                                </div>
                            )}
                            {/* 1212: Print info blocks */}
                            <div className="inline-flex flex-col items-start w-full mt-[24px] mx-auto">
                                {/* 12121: Gradient header */}
                                <div className="flex px-[44px] py-[13.5px] rounded-t-[16px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] items-center gap-[8px] w-full whitespace-nowrap">
                                    <div className="flex items-center gap-[6px]">
                                        <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px]">プリント期限</span>
                                    </div>
                                    <div className="flex flex-col items-start ml-[16px]">
                                        <span className="text-white font-noto text-[14px] font-bold leading-[14px]">2025/10/05まで</span>
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
                                            <QRCodeDisplay 
                                                product={product} 
                                                isMobile={true}
                                                className="w-[240px] h-[100px] mt-[8px]"
                                            />
                                        </div>
                                    </div>
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
                        <RankingSection topBuyers={product?.top_buyers} isMobile={true} />
                    </section>
                </section>
            </div>
            {/* Personal Info Footer */}
            <PersonalInfoSection user={product.user} defaultUserImage={defaultUser} />
            <Footer />
            {/* Delete confirmation modal */}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="商品を削除しますか？"
                message="この操作は取り消せません。"
                confirmText="削除する"
                cancelText="キャンセル"
                confirmButtonClass="bg-red-500 hover:bg-red-600"
                isLoading={isDeleting}
                loadingText="削除中..."
            />
        </div>
    );
};

export default ProductDetailsFree;