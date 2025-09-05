import { React, useState } from 'react';

import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import qr from '@/assets/images/productdetails/qr.jpg';
import default_user from '@/assets/images/default-user.png';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import question_circle from '@/assets/images/question_circle.svg';
import face from '@/assets/images/face_blue.svg';
import line from '@/assets/images/line_green.svg';
import x from '@/assets/images/x_black.svg';
import instagram from '@/assets/images/instagram_black.svg';
import close from '@/assets/images/close_gray.svg';

const PostRegistrationModal = ({ onClose, productData, userData }) => {
    const [email, setEmail] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [shareMessage, setShareMessage] = useState('');

    // Debug: Log the product data
    console.log('PostRegistrationModal received productData:', productData);

    // If no product data is provided, show a loading state or default values
    if (!productData) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">商品情報を読み込み中...</p>
                </div>
            </div>
        );
    }

    const handleCloseClick = () => {
        console.log('PostRegistrationModal close button clicked');
        if (onClose) {
            onClose();
        } else {
            console.error('onClose prop is not provided');
        }
    };

    // Generate share URL
    const getShareUrl = () => {
        const ownerUserId = productData?.user?.id ?? productData?.user_id;
        const isFree = Number(productData?.price) === 0;
        if (!ownerUserId) {
            return `${window.location.origin}`;
        }
        const base = `${window.location.origin}/user/${ownerUserId}`;
        return isFree
            ? `${base}/purchasedproduct/${productData.id}`
            : `${base}/unpurchasedproduct/${productData.id}`;
    };

    // Copy URL to clipboard
    const copyUrlToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setShareMessage('URLをコピーしました！');
            setTimeout(() => setShareMessage(''), 3000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
            setShareMessage('URLのコピーに失敗しました');
            setTimeout(() => setShareMessage(''), 3000);
        }
    };

    // Share via email
    const shareViaEmail = () => {
        if (!email) {
            setShareMessage('メールアドレスを入力してください');
            setTimeout(() => setShareMessage(''), 3000);
            return;
        }

        const subject = encodeURIComponent(`${productData.title} - 商品の共有`);
        const body = encodeURIComponent(`
${productData.title}

商品詳細:
- 価格: ${productData.price ? `${parseInt(productData.price)}円` : '0円'}
- 枚数: ${productData.files_count || 0}枚
- 印刷番号: ${productData.sn || 'N/A'}

商品URL: ${getShareUrl()}

この商品をチェックしてみてくFださい！
        `);

        window.open(`mailto:${email}?subject=${subject}&body=${body}`);
        setShareMessage('メールアプリが開きました');
        setTimeout(() => setShareMessage(''), 3000);
    };

    // Share via social media
    const shareViaSocial = (platform) => {
        const url = getShareUrl();
        const text = `${productData.title} - この商品をチェックしてみてください！`;

        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'line':
                shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
                break;
            case 'instagram':
                // Instagram doesn't support direct sharing via URL, so we'll copy the URL
                copyUrlToClipboard();
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShareMessage(`${platform}でシェアしました`);
        setTimeout(() => setShareMessage(''), 3000);
    };

    return (
        <>
            {/* Desktop version */}
            <section className="hidden md:flex flex-col w-[960px] h-[820px] flex-shrink-0 rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] relative">
                {/* Header Section */}
                <div className="flex h-[98px] p-[20px_0_1px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px]">
                    <h1 className="text-[#363636] text-center font-noto text-[36px] font-bold leading-[54px]">商品登録完了</h1>
                </div>
                <button
                    onClick={handleCloseClick}
                    className="absolute top-[34px] right-[32px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-gray-100 hover:bg-gray-200 rounded-full z-50"
                >
                    <img src={close} alt="close" className="w-[40px] h-[40px]" />
                </button>

                <div className="flex pt-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] mx-[226px] mt-[32px] relative">
                    {/* <div className="flex items-center gap-[16px]"> */}
                    <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                        {productData?.files && productData.files.length > 0 ? (
                            <img
                                src={productData.files[0].url || `/storage/${productData.files[0].file_path}`}
                                alt="product"
                                className="w-full h-full object-cover rounded-[4.409px]"
                                onError={(e) => {
                                    e.target.src = photo1;
                                    e.target.onerror = null;
                                }}
                            />
                        ) : (
                            <img src={photo1} alt="default" />
                        )}
                    </div>
                    {/* Info Block */}
                    <div className="flex flex-col justify-between items-start gap-y-2">
                        {/* 1211: Title&Badge and User Info stacked */}
                        <div className="flex flex-col pb-[18px]">
                            {/* Title & Badge */}
                            <div className="inline-flex items-center gap-2">
                                <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-noto">{productData?.title || '商品タイトル'}</span>
                            </div>
                            {/* 12121: User Info */}
                            <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                                <img
                                    src={productData?.user?.profile_photo_url || default_user}
                                    alt="user"
                                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover bg-gray-200"
                                    onError={(e) => {
                                        e.target.src = default_user;
                                        e.target.onerror = null;
                                    }}
                                />
                                {console.log('userData:', userData)}
                                <span className="ml-2 text-[#222] font-noto text-[16px] leading-[22px] font-normal">{userData?.shop_title || 'ユーザー名'}</span>
                            </div>
                            {/* 12122: User Info */}
                            <div className="inline-flex pt-[6px] flex-row items-center rounded-[3px]">
                                <div className="text-[#363636] font-medium text-[14px] leading-[25px] font-noto">
                                    <span className="block">枚数：{productData?.files_count || 0}</span>
                                    <span className="block">購入金額： {productData?.price ? `${parseInt(productData.price)}円` : '0円'}</span>
                                    {/* <span className="block">印刷番号：{productData?.sn || (productData?.id ? `PB${productData.id.toString().padStart(6, '0')}` : 'N/A')}</span> */}
                                    <span className="block">販売期限：{productData?.sales_deadline ? (() => {
                                        try {
                                            const date = new Date(productData.sales_deadline);
                                            return `${date.toLocaleDateString('ja-JP')}まで`;
                                        } catch (e) {
                                            return '未設定';
                                        }
                                    })() : '未設定'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="flex flex-col items-start gap-[24px] self-stretch mx-[226px] mt-[23px] relative">
                    <div className="flex flex-col items-start w-full gap-[18px]">
                        <span className="text-[#363636] font-noto text-[21px] font-bold leading-[32px]">
                            商品を共有しましょう!
                        </span>
                        <span className="text-[#363636] font-noto text-[16px] font-normal leading-[24px]">
                            登録した商品を共有することで、多くの方に素晴らしいアイデアやお得な情報を分かち合えます。新しい発見を楽しむことができ、購入の参考にもなります。ぜひ、あなたのおすすめ商品を周りの人とシェアしてみてください！
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-full gap-[16px]">
                        <div className="flex items-start w-full">
                            <span className="text-[#363636] font-noto text-[16px] font-bold leading-[24px]">
                                メールアドレスを入力
                            </span>
                        </div>
                        <div className="flex flex-row items-center w-full gap-[8px] justify-center">
                            <input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 h-[40px] px-[12px] py-[8px] border border-[#E9E9E9] rounded-[5px] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px]"
                            />
                            <button
                                onClick={shareViaEmail}
                                className="px-[16px] py-[8px] bg-[#4CAF50] text-white rounded-[5px] font-noto text-[14px] hover:bg-[#45a049] transition-colors"
                            >
                                送信
                            </button>
                        </div>
                        <div className="flex flex-row items-center w-full gap-[16px] justify-center">
                            <button
                                onClick={() => shareViaSocial('facebook')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={face} alt="facebook" className="w-[48px] h-[48px]" />
                            </button>
                            <button
                                onClick={() => shareViaSocial('line')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={line} alt="line" className="w-[48px] h-[48px]" />
                            </button>
                            <button
                                onClick={() => shareViaSocial('twitter')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={x} alt="twitter" className="w-[48px] h-[48px]" />
                            </button>
                            <button
                                onClick={() => shareViaSocial('instagram')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={instagram} alt="instagram" className="w-[48px] h-[48px]" />
                            </button>
                        </div>
                        {shareMessage && (
                            <div className="text-center text-[#4CAF50] font-noto text-[14px]">
                                {shareMessage}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-start w-full gap-[6px]">
                        <span className="text-[#363636] font-noto text-[16px] font-bold leading-[24px]">
                            共有用URL
                        </span>
                        <div className="flex flex-row items-start w-full rounded-[5.71px] border border-[#E9E9E9] relative">
                            <input
                                type="text"
                                value={getShareUrl()}
                                readOnly
                                className="w-full h-[50px] px-[12px] py-[14px] border-none bg-transparent rounded-[5.71px] text-[#363636] font-noto text-[14px] font-normal leading-normal"
                            />

                            <button
                                onClick={copyUrlToClipboard}
                                className="absolute right-[8px] top-[6px] px-3 py-[6px] rounded-[5.71px] bg-[#4CAF50] hover:bg-[#45a049] transition-colors cursor-pointer"
                            >
                                <span className="text-white font-noto text-[14px] font-normal leading-[26px]">URLをコピー</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* mobile version */}
            <section className="flex md:hidden flex-col w-full flex-shrink-0 rounded-[16px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] pb-[40px] relative">

                {/* Header Section */}
                <div className="flex h-[64px] p-[20px_0_1px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px]">
                    <h1 className="text-[#363636] text-center font-noto text-[24px] font-bold leading-[24px]">商品登録完了</h1>
                </div>

                <button
                    onClick={handleCloseClick}
                    className="absolute top-[16px] right-[12px] w-[22px] h-[22px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-gray-100 hover:bg-gray-200 rounded-full z-50"
                >
                    <img src={close} alt="close" className="w-[22px] h-[22px]" />
                </button>

                <div className="flex flex-row pt-[16px] pb-[40px] pl-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] mx-[14px] mt-[16px] relative">
                    {/* photo1 */}
                    <div className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                        {productData?.files && productData.files.length > 0 ? (
                            <img
                                src={productData.files[0].url || `/storage/${productData.files[0].file_path}`}
                                alt="product"
                                className="w-full h-full object-cover rounded-[2.52px]"
                                onError={(e) => {
                                    e.target.src = photo1;
                                    e.target.onerror = null;
                                }}
                            />
                        ) : (
                            <img src={photo1} alt="default" />
                        )}
                    </div>
                    {/* 1211 */}
                    <div className="flex flex-col justify-between items-start">
                        {/* 12111 */}
                        <div className="flex flex-col items-start gap-[2px] w-full">
                            <span className="text-[#363636] font-medium text-[14px] leading-[21px]">{productData?.title || '商品タイトル'}</span>
                            <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[11px] leading-[15px]">{productData?.files_count ? `${productData.files_count}枚セット` : '1枚セット'}</span>
                            <div className="flex items-center gap-[5px] m-[4px]">
                                <img
                                    src={productData?.user?.profile_photo_url || default_user}
                                    alt="user"
                                    className="w-[20px] h-[20px] rounded-full object-cover bg-gray-200"
                                    onError={(e) => {
                                        e.target.src = default_user;
                                        e.target.onerror = null;
                                    }}
                                />
                                <span className="text-[#222] font-noto text-[13px] leading-[20px] font-normal">{userData?.shop_title || 'ユーザー名'}</span>
                            </div>

                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">枚数：{productData?.files_count || 0}</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">購入金額： {productData?.price ? `${parseInt(productData.price)}円` : '0円'}</span>
                            {/* <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷番号：{productData?.sn || (productData?.id ? `PB${productData.id.toString().padStart(6, '0')}` : 'N/A')}</span> */}
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">販売期限：{productData?.sales_deadline ? (() => {
                                try {
                                    const date = new Date(productData.sales_deadline);
                                    return `${date.toLocaleDateString('ja-JP')}まで`;
                                } catch (e) {
                                    return '未設定';
                                }
                            })() : '未設定'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-[24px] self-stretch mx-[16px] mt-[24px] relative">
                    <div className="flex flex-col items-start w-full gap-[18px]">
                        <span className="text-[#363636] font-noto text-[16px] font-bold leading-[25px]">
                            商品を共有しましょう!
                        </span>
                        <span className="text-[#363636] font-noto text-[13px] font-normal leading-[24px]">
                            登録した商品を共有することで、多くの方に素晴らしいアイデアやお得な情報を分かち合えます。新しい発見を楽しむことができ、購入の参考にもなります。ぜひ、あなたのおすすめ商品を周りの人とシェアしてみてください！
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-full gap-[16px]">
                        <div className="flex items-start w-full">
                            <span className="text-[#363636] font-noto text-[16px] font-bold leading-[25px]">
                                メールアドレスを入力
                            </span>
                        </div>
                        <div className="flex flex-row items-center w-full gap-[8px] justify-center">
                            <input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 h-[40px] px-[12px] py-[8px] border border-[#E9E9E9] rounded-[5px] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px]"
                            />
                            <button
                                onClick={shareViaEmail}
                                className="px-[16px] py-[8px] bg-[#4CAF50] text-white rounded-[5px] font-noto text-[14px] hover:bg-[#45a049] transition-colors"
                            >
                                送信
                            </button>
                        </div>
                        <div className="flex flex-row items-center w-full gap-[16px] justify-center">
                            <button
                                onClick={() => shareViaSocial('facebook')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={face} alt="facebook" className="w-[48px] h-[48px]" />
                            </button>
                            <button
                                onClick={() => shareViaSocial('line')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={line} alt="line" className="w-[48px] h-[48px]" />
                            </button>
                            <button
                                onClick={() => shareViaSocial('twitter')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={x} alt="twitter" className="w-[48px] h-[48px]" />
                            </button>
                            <button
                                onClick={() => shareViaSocial('instagram')}
                                className="w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                                <img src={instagram} alt="instagram" className="w-[48px] h-[48px]" />
                            </button>
                        </div>
                        {shareMessage && (
                            <div className="text-center text-[#4CAF50] font-noto text-[14px]">
                                {shareMessage}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-start w-full gap-[6px]">
                        <span className="text-[#363636] font-noto text-[16px] font-bold leading-[24px]">
                            共有用URL
                        </span>
                        <div className="flex flex-row items-start w-full rounded-[5.71px] border border-[#E9E9E9] relative">
                            <input
                                type="text"
                                value={getShareUrl()}
                                readOnly
                                className="w-full h-[50px] px-[12px] py-[14px] border-none bg-transparent rounded-[5.71px] text-[#363636] font-noto text-[14px] font-normal leading-normal"
                            />

                            <button
                                onClick={copyUrlToClipboard}
                                className="absolute right-[8px] top-[6px] px-3 py-[6px] rounded-[5.71px] bg-[#4CAF50] hover:bg-[#45a049] transition-colors cursor-pointer"
                            >
                                <span className="text-white font-noto text-[14px] font-normal leading-[26px]">URLをコピー</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PostRegistrationModal;