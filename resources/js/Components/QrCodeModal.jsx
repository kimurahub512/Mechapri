import React from 'react';

import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import qr from '@/assets/images/productdetails/qr.jpg';
import girl from '@/assets/images/favoriteproducts/girl.svg';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import question_circle from '@/assets/images/question_circle.svg';
import default_user from '@/assets/images/default-user.png';
import complex_white from '@/assets/images/complex_white.svg';
import close from '@/assets/images/close_gray.svg';

const QrCodeModal = ({ onClose, purchase }) => {
    // Debug logging to see what data we're getting
    console.log('QrCodeModal purchase data:', purchase);
    console.log('QR Code URL:', purchase?.nwps_qr_code_url);
    console.log('Product NWPS QR Code URL:', purchase?.product?.nwps_qr_code_url);

    // Handle escape key to close
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                console.log('Escape key pressed');
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleCloseClick = () => {
        console.log('Close button clicked');
        if (onClose) {
            onClose();
        } else {
            console.error('onClose prop is not provided');
        }
    };

    return (
        <div className="bg-white rounded-[40px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
            {/* Desktop version */}
            <section className="hidden md:flex flex-col w-[960px] h-[820px] flex-shrink-0 rounded-[40px] bg-white relative">
                {/* Header Section */}
                <div className="flex w-[960px] h-[98px] p-[20px_0_1px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px]">
                    <h1 className="text-[#363636] text-center font-noto text-[36px] font-bold leading-[54px]">QRコード発行完了</h1>
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
                        <img
                            src={purchase?.product?.files?.[0]?.url || photo1}
                            alt="product"
                            className="w-full h-full object-cover rounded-[4.409px]"
                        />
                    </div>
                    {/* Info Block */}
                    <div className="flex flex-col justify-between items-start gap-y-2">
                        {/* 1211: Title&Badge and User Info stacked */}
                        <div className="flex flex-col pb-[18px]">
                            {/* Title & Badge */}
                            <div className="inline-flex items-center gap-2">
                                <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-noto">{purchase?.product?.title || '商品'}</span>
                            </div>
                            {/* 12121: User Info */}
                            <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                                <img src={purchase?.product?.user?.image || default_user} alt="default_user" className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                                <span className="ml-2 text-[#222] font-noto text-[16px] leading-[22px] font-normal">{purchase?.product?.user?.name || ''}</span>
                            </div>
                            {/* 12122: User Info */}
                            <div className="inline-flex pt-[6px] flex-row items-center rounded-[3px]">
                                <div className="text-[#363636] font-medium text-[14px] leading-[25px] font-noto">
                                    <span className="block">枚数：{purchase?.cnt ?? 1}</span>
                                    <span className="block">購入金額： {purchase?.price ?? ''}円</span>
                                    <span className="block">印刷番号：{purchase?.product?.sn || '発行中...'}</span>
                                    <span className="block">印刷期限：{purchase?.print_expires_at || ''}まで</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="flex pt-[12px] items-start gap-[16px] self-stretch mx-[226px] mt-[23px] relative">
                    {/* 12122: Print options */}
                    <div className="flex flex-col items-center gap-[20px] w-full bg-[#F6F6F6] rounded-[16px] p-[12px]">
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
                                        src={purchase?.nwps_qr_code_url || purchase?.product?.nwps_qr_code_url || qr}
                                        alt="qr"
                                        className="absolute top-0 left-0 w-[150px] h-[150px] "
                                    />
                                    <div className="absolute top-[44.5px] left-[226px]  flex flex-col items-center">
                                        <span className="text-[#000] font-noto text-[14px] font-normal leading-[21px]">印刷番号</span>
                                        <span className="text-[#363636] font-noto text-[24px] font-bold leading-[24px] text-center">{purchase?.product?.sn || '発行中...'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 121222: Seven Eleven */}
                        <div className="flex w-[480px] h-[74px] px-[24px] justify-between items-center rounded-[10px] border border-[#D1D1D1] bg-white bg-opacity-50 ">
                            <div className="flex items-center w-[425px] h-[74px] py-[30px] justify-between">
                                <span className="font-noto text-[18px] font-bold leading-[20.7px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">セブンイレブンで印刷する</span>
                                <img src={eleven} alt="eleven" className="w-[59px] h-[59px] rounded-full object-cover ml-[16px]" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 1213: Help link */}
                <div className="flex flex-col items-center w-[386px] h-[20px] mt-[23px] mx-[287px]">
                    <div className="flex items-center gap-[8px]">
                        <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                        <a href='/howtoprint' className="text-[#767676] font-noto text-[14px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</a>
                    </div>
                </div>
            </section>
            {/* mobile version */}
            <section className="flex md:hidden flex-col w-full flex-shrink-0 rounded-[16px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] pb-[40px] relative">
                <div className="flex w-full p-[20px_0_20px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px]">
                    <h1 className="text-[#363636] text-center font-noto text-[24px] font-bold leading-[24px]">QRコード発行完了</h1>
                </div>
                <button
                    onClick={handleCloseClick}
                    className="absolute top-[22px] right-[16px] w-[20px] h-[20px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-gray-100 hover:bg-gray-200 rounded-full z-50"
                >
                    <img src={close} alt="close" className="w-[20px] h-[20px]" />
                </button>
                <div className="flex flex-row pt-[16px] pb-[40px] pl-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] mx-[14px] mt-[16px] relative">
                    {/* photo1 */}
                    <div className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                        <img
                            src={purchase?.product?.files?.[0]?.url || photo1}
                            alt="product"
                            className="w-full h-full object-cover rounded-[2.52px]"
                        />
                    </div>
                    {/* 1211 */}
                    <div className="flex flex-col justify-between items-start">
                        {/* 12111 */}
                        <div className="flex flex-col items-start gap-[2px] w-full">
                            <span className="text-[#363636] font-medium text-[14px] leading-[21px]">{purchase?.product?.title || '商品'}</span>
                            <div className="flex items-center gap-[5px] m-[4px]">
                                <img src={purchase?.product?.user?.image || default_user} alt="default_user" className="w-[20px] h-[20px] rounded-full object-cover bg-gray-200" />
                                <span className="text-[#222] font-noto text-[13px] leading-[20px] font-normal">{purchase?.product?.user?.name || ''}</span>
                            </div>
                            <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25px] mb-[4px]">{purchase?.purchase_time || ''}に購入</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">枚数：{purchase?.cnt ?? 1}</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">購入金額： {purchase?.price ?? ''}円</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷番号：{purchase?.product?.sn || '発行中...'}</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷期限：{purchase?.print_expires_at || ''}まで</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full gap-[24px] mt-[24px] px-[16px]">
                    {/* 1212: Print info blocks */}
                    <div className="inline-flex flex-col items-start w-full">
                        {/* 12121: Gradient header */}
                        <div className="flex px-[44px] py-[13.5px] rounded-t-[16px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] items-center gap-[8px] w-full whitespace-nowrap">
                            <div className="flex items-center gap-[6px]">
                                <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                <span className="text-white font-noto text-[14px] font-bold leading-[14px]">プリント期限</span>
                            </div>
                            <div className="flex flex-col items-start ml-[16px]">
                                <span className="text-white font-noto text-[14px] font-bold leading-[14px]">{purchase?.print_expires_at || ''}まで</span>
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
                                            src={purchase?.nwps_qr_code_url || purchase?.product?.nwps_qr_code_url || qr}
                                            alt="qr"
                                            className="absolute top-0 left-0 w-[100px] h-[100px]"
                                        />
                                        <div className="absolute top-[30px] left-[150px] flex flex-col items-center">
                                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[16px]">印刷番号</span>
                                            <span className="text-[#363636] font-noto text-[16px] font-bold leading-[16px] text-center">{purchase?.product?.sn || '発行中...'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 121222: Seven Eleven */}
                            <div className="flex w-full h-[60px] px-[16px] justify-between items-center rounded-[10px] border border-[#D1D1D1] bg-white bg-opacity-50">
                                <div className="flex items-center w-full h-[60px] py-[20px] justify-between">
                                    <span className="font-noto text-[12px] font-bold leading-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">セブンイレブンで印刷する</span>
                                    <img src={eleven} alt="eleven" className="w-[40px] h-[40px] rounded-full object-cover ml-[12px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 1213: Help link */}
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center gap-[6px]">
                            <img src={question_circle} alt="question_circle" className="w-[16px] h-[16px]" />
                            <a href='/howtoprint' className="text-[#767676] font-noto text-[12px] font-normal leading-[16px] underline cursor-pointer">プリントの方法が分からない時は</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QrCodeModal;