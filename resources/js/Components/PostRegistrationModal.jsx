import React from 'react';

import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import qr from '@/assets/images/productdetails/qr.jpg';
import girl from '@/assets/images/favoriteproducts/girl.svg';
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

const PostRegistrationModal = () => {

    return (
        <>
            {/* Desktop version */}
            <section className="hidden md:flex flex-col w-[960px] h-[820px] flex-shrink-0 rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] relative">
                {/* Header Section */}
                <div className="flex h-[98px] p-[20px_0_1px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px]">
                    <h1 className="text-[#363636] text-center font-['Noto Sans JP'] text-[36px] font-bold leading-[54px]">商品登録完了</h1>
                </div>
                <img src={close} alt="close" className="absolute top-[34px] right-[32px] w-[40px] h-[40px]" />

                <div className="flex pt-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] mx-[226px] mt-[32px] relative">
                    {/* <div className="flex items-center gap-[16px]"> */}
                    <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                        <img src={photo1} alt="notification" />
                    </div>
                    {/* Info Block */}
                    <div className="flex flex-col justify-between items-start gap-y-2">
                        {/* 1211: Title&Badge and User Info stacked */}
                        <div className="flex flex-col pb-[18px]">
                            {/* Title & Badge */}
                            <div className="inline-flex items-center gap-2">
                                <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-['Noto Sans JP']">郊外のカフェにて</span>
                            </div>
                            {/* 12121: User Info */}
                            <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                                <img src={girl} alt="girl" className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                                <span className="ml-2 text-[#222] font-noto text-[16px] leading-[22px] font-normal">anchly1005</span>
                            </div>
                            {/* 12122: User Info */}
                            <div className="inline-flex pt-[6px] flex-row items-center rounded-[3px]">
                                <div className="text-[#363636] font-medium text-[14px] leading-[25px] font-['Noto Sans JP']">
                                    <span className="block">枚数：1</span>
                                    <span className="block">購入金額： 300円</span>
                                    <span className="block">印刷番号：2CNM9FX279</span>
                                    <span className="block">印刷期限：2025/10/05まで</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="flex flex-col items-start gap-[24px] self-stretch mx-[226px] mt-[23px] relative">
                    <div className="flex flex-col items-start w-full gap-[18px]">
                        <span className="text-[#363636] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">
                            商品を共有しましょう!
                        </span>
                        <span className="text-[#363636] font-['Noto Sans JP'] text-[16px] font-normal leading-[24px]">
                            登録した商品を共有することで、多くの方に素晴らしいアイデアやお得な情報を分かち合えます。新しい発見を楽しむことができ、購入の参考にもなります。ぜひ、あなたのおすすめ商品を周りの人とシェアしてみてください！
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-full gap-[16px]">
                        <div className="flex items-start w-full">
                            <span className="text-[#363636] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">
                                メールアドレスを入力
                            </span>
                        </div>
                        <div className="flex flex-row items-center w-full gap-[16px] justify-center">
                            <img src={face} alt="face" className="w-[48px] h-[48px]" />
                            <img src={line} alt="line" className="w-[48px] h-[48px]" />
                            <img src={x} alt="x" className="w-[48px] h-[48px]" />
                            <img src={instagram} alt="instagram" className="w-[48px] h-[48px]" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full gap-[6px]">
                        <span className="text-[#363636] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">
                            共有用URL
                        </span>
                        <div className="flex flex-row items-start w-full rounded-[5.71px] border border-[#E9E9E9] relative">
                            <input type="text" className="w-full h-[50px] px-[12px] py-[14px] border-none bg-transparent rounded-[5.71px] placeholder-[#ACACAC] placeholder:font-['Noto Sans JP'] placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="example@email.com" />
                            
                            <div className="absolute right-[8px] top-[6px] px-3 py-[6px] rounded-[5.71px] bg-[#D1D1D1]">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[14px] font-normal leading-[26px]">URLをコピー</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* mobile version */}
            <section className="flex md:hidden flex-col w-full flex-shrink-0 rounded-[16px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] pb-[40px] relative">

                {/* Header Section */}
                <div className="flex h-[64px] p-[20px_0_1px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px]">
                    <h1 className="text-[#363636] text-center font-['Noto Sans JP'] text-[24px] font-bold leading-[24px]">商品登録完了</h1>
                </div>

                <img src={close} alt="close" className="absolute top-[16px] right-[12px] w-[32px] h-[32px]" />

                <div className="flex flex-row pt-[16px] pb-[40px] pl-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] mx-[14px] mt-[16px] relative">
                    {/* photo1 */}
                    <div className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                        <img src={photo1} alt="notification" />
                    </div>
                    {/* 1211 */}
                    <div className="flex flex-col justify-between items-start">
                        {/* 12111 */}
                        <div className="flex flex-col items-start gap-[2px] w-full">
                            <span className="text-[#363636] font-medium text-[14px] leading-[21px]">郊外のカフェにて</span>
                            <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[11px] leading-[15px]">3枚セット</span>
                            <div className="flex items-center gap-[5px] m-[4px]">
                                <img src={girl} alt="girl" className="w-[20px] h-[20px] rounded-full object-cover bg-gray-200" />
                                <span className="text-[#222] font-noto text-[13px] leading-[20px] font-normal">anchly1005</span>
                            </div>
                            <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25px] mb-[4px]">2025/10/05 19:20に購入</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">枚数：1</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">購入金額： 300円</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷番号：2CNM9FX279</span>
                            <span className="block text-[#363636] font-medium text-[12px] leading-[20px]">印刷期限：2025/10/05まで</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-[24px] self-stretch mx-[16px] mt-[24px] relative">
                    <div className="flex flex-col items-start w-full gap-[18px]">
                        <span className="text-[#363636] font-['Noto Sans JP'] text-[16px] font-bold leading-[25px]">
                            商品を共有しましょう!
                        </span>
                        <span className="text-[#363636] font-['Noto Sans JP'] text-[13px] font-normal leading-[24px]">
                            登録した商品を共有することで、多くの方に素晴らしいアイデアやお得な情報を分かち合えます。新しい発見を楽しむことができ、購入の参考にもなります。ぜひ、あなたのおすすめ商品を周りの人とシェアしてみてください！
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-full gap-[16px]">
                        <div className="flex items-start w-full">
                            <span className="text-[#363636] font-['Noto Sans JP'] text-[16px] font-bold leading-[25px]">
                                メールアドレスを入力
                            </span>
                        </div>
                        <div className="flex flex-row items-center w-full gap-[16px] justify-center">
                            <img src={face} alt="face" className="w-[48px] h-[48px]" />
                            <img src={line} alt="line" className="w-[48px] h-[48px]" />
                            <img src={x} alt="x" className="w-[48px] h-[48px]" />
                            <img src={instagram} alt="instagram" className="w-[48px] h-[48px]" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full gap-[6px]">
                        <span className="text-[#363636] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">
                            共有用URL
                        </span>
                        <div className="flex flex-row items-start w-full rounded-[5.71px] border border-[#E9E9E9] relative">
                            <input type="text" className="w-full h-[50px] px-[12px] py-[14px] border-none bg-transparent rounded-[5.71px] placeholder-[#363636] placeholder:font-['Noto Sans JP'] placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="example@email.com" />
                            
                            <div className="absolute right-[8px] top-[6px] px-3 py-[6px] rounded-[5.71px] bg-[#D1D1D1]">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[14px] font-normal leading-[26px]">URLをコピー</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PostRegistrationModal;