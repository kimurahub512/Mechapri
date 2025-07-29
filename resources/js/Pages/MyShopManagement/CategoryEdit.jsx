import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import recyclebin from '@/assets/images/recyclebin.svg';
import list from '@/assets/images/list_unordered.svg';
import arrow from '@/assets/images/arrow_right.svg';
import file_add from '@/assets/images/File_Add.svg';
import radio from '@/assets/images/beginner_radio.svg';
import add from '@/assets/images/add.svg';
import close from '@/assets/images/close.svg';
import lock from '@/assets/images/lock.svg';


const CategoryEdit = () => {

    return (
        <>
            <Header />
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar />
                </div>
                <ShopMobileTopBlock />
                {/* Main Section */}
                {/* MOBILE ONLY */}
                <div className="block md:hidden px-[16px] mt-[160px] flex flex-col items-start gap-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">商品カテゴリ編集</h1>
                    </div>
                    <div className="flex flex-col items-start px-[16px] py-[20px] gap-4 rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">カテゴリ名</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">0/200</span>
                                </div>
                                <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-['Noto Sans JP'] placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="2025/11/24" />
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">カテゴリ説明文</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">0/200</span>
                                </div>
                                <textarea className="w-full min-h-[128px] p-[12.5px_12px_12.5px_12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-['Noto Sans JP'] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[25px] resize-none" placeholder="商品の説明文" />
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[20px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px] w-full border-b border-[#E9E9E9]">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">公開設定</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">いずれかを選択</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start">
                                    <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px] ml-[30px]">誰でも商品ページを見ることができます</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start flex-shrink-0">
                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">非公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px] ml-[30px]">自分だけが商品ページを見ることができます</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">商品</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">いずれかを選択</span>
                            </div>
                            <div className="flex items-start p-[7px_14px_8px_11px] w-full rounded-[2px] border-[2px] border-dashed border-[#ACACAC] bg-[#F1F3F4]">
                                {/* 1214: 商品追加 */}
                                <div className="flex flex-row items-center gap-[6.2px] w-full">
                                    {/* first item 1 */}
                                    <div className="flex w-[91px] h-[105px] pb-[14px] flex-col items-center rounded-[6.2px] border-[0.388px] border-[#ACACAC] bg-[#F6F6F6]">
                                        {/* 11 */}
                                        <div className="flex w-[91px] h-[91px] justify-center items-center aspect-square rounded-[6.2px]">
                                            {/* 1111 */}
                                            <div className="flex w-[64px] flex-col items-center justify-center gap-[3px]">
                                                {/* add svg */}
                                                <div className="flex w-[19px] h-[19px] justify-center items-center">
                                                    <img src={add} alt="add" className="w-[19px] h-[19px]" />
                                                </div>
                                                {/* 11111 */}
                                                <div className="flex flex-col items-center gap-[1px] self-stretch">
                                                    <span className="text-[#586B88] text-center font-['Noto Sans JP'] text-[7px] font-bold leading-[9px]">カテゴリに</span>
                                                    <span className="text-[#586B88] text-center font-['Noto Sans JP'] text-[7px] font-bold leading-[9px]">商品を追加</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*2nd item 2 */}
                                    <div className="flex flex-col items-center rounded-[6.2px] w-[91px] h-[105px] bg-white relative">
                                        <div className="flex w-[91px] p-[2px_16px_2px_17px] flex-col items-center rounded-[3.54px] bg-[#F6F6F6]">
                                            <img src={photo1} alt="notification w-[58px] h-[225px]" />
                                        </div>
                                        <span className="text-[#363636] font-['Noto_Sans_JP'] text-[6px] font-normal leading-[12px]">Gウェルネス💪疲れ知らず</span>
                                        <div className="absolute top-[3px] right-[4px]">
                                            <img src={close} alt="close" className="w-[12px] h-[12px]" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center rounded-[6.204px] w-[91px] h-[105px] bg-white relative">
                                        <div className="flex w-[91px] p-[27px_7px_18px_8px] flex-col items-center rounded-[6.2px] bg-[#586B88]">
                                            <div className="flex flex-col items-center gap-[3px] self-stretch">
                                                <img src={lock} alt="close" className="w-[26px] h-[26px]" />
                                                <div className="flex flex-col items-center gap-[2px] self-stretch">
                                                    <span className="text-[#CDD9EC] font-['Noto_Sans_JP'] text-[7px] font-bold leading-[6px]">パスワード</span>
                                                    <span className="text-[#CDD9EC] font-['Noto_Sans_JP'] text-[5px] font-normal leading-[9px]">PWを入れて印刷しよう</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[#363636] font-['Noto_Sans_JP'] text-[6px] font-normal leading-[12px]">Gウェルネス💪疲れ知らず</span>
                                        <div className="absolute top-[3px] right-[4px]">
                                            <img src={close} alt="close" className="w-[12px] h-[12px]" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-row items-start gap-[16px] w-full">
                                <div className="flex flex-row items-center gap-[6px]">
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">ファイル数</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">0/10</span>
                                </div>
                                <div className="flex flex-row items-center gap-[6px]">
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">容量25MBまで</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">0/25</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-[10px] pt-[32px] w-full">
                            <div className="flex w-full py-[15px] flex-col justify-center items-center rounded-[8px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]">
                                <span className="text-white text-center font-['Noto Sans JP'] text-[18px] font-bold leading-[14px]">登録する</span>
                            </div>
                            <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[18px]">※ 登録後は商品ファイルの変更はできません。</span>
                        </div>
                    </div>
                </div>
                <main
                    className="hidden md:flex flex-col items-left gap-[22px] max-w-[928px] py-[40px] px-[15px] w-full ml-[109px] mr-[169px]"
                >
                    {/* DESKTOP: keep original layout */}
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[36px] font-bold leading-[54px]">商品カテゴリ編集</h1>
                    </div>
                    <div className="flex flex-col items-start py-[32px] px-[24px] gap-4 rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        <div className="flex flex-col items-start pt-[13.44px] gap-[7.2px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">カテゴリ名</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">0/200</span>
                                </div>
                                <input type="text" className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-['Noto Sans JP'] placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" placeholder="2025/11/24" />
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">カテゴリ説明文</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">0/200</span>
                                </div>
                                <textarea className="w-full min-h-[90px] p-[12.5px_12px_12.5px_12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-['Noto Sans JP'] placeholder:text-[14px] placeholder:font-normal placeholder:leading-[25px] resize-none" placeholder="商品の説明文" />
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[20px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px] w-full border-b border-[#E9E9E9]">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">公開設定</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">いずれかを選択</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex pb-[8px] items-start">
                                    <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px]">誰でも商品ページを見ることができます</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start flex-shrink-0">
                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">非公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px]">自分だけが商品ページを見ることができます</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[10px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">商品</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">いずれかを選択</span>
                            </div>
                            <div className="flex items-start p-[19.12px_38px_20.88px_30px] w-full rounded-[2px] border-[2px] border-dashed border-[#ACACAC] bg-[#F1F3F4]">
                                {/* 1214: 商品追加 */}
                                <div className="flex flex-row items-center gap-[16px] w-full  border-2 border-dashed border-red-500">
                                    {/* first item 1 */}
                                    <div className="flex w-[234px] h-[272px] pb-[38px] flex-col items-center rounded-[16px] border border-[#ACACAC] bg-[#F6F6F6]">
                                        {/* 11 */}
                                        <div className="flex w-[234px] h-[234px] justify-center items-center aspect-square rounded-[16px]">
                                            {/* 1111 */}
                                            <div className="flex w-[165.742px] flex-col items-center gap-[7.655px]">
                                                {/* add svg */}
                                                <div className="flex w-[48px] h-[48px] justify-center items-center">
                                                    <img src={add} alt="add" className="w-[48px] h-[48px]" />
                                                </div>
                                                {/* 11111 */}
                                                <div className="flex flex-col items-center gap-[2px] self-stretch">
                                                    <span className="text-[#586B88] text-center font-['Noto Sans JP'] text-[18px] font-bold leading-[22.966px]">カテゴリに</span>
                                                    <span className="text-[#586B88] text-center font-['Noto Sans JP'] text-[18px] font-bold leading-[22.966px]">商品を追加</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*2nd item 2 */}
                                    <div className="flex flex-col items-center rounded-[16px] w-[234px] h-[272px] bg-white relative">
                                        <div className="flex w-[234px] p-[4.57px_42.961px_4.57px_41.133px] flex-col items-center rounded-[9.141px] bg-[#F6F6F6]">
                                            <img src={photo1} alt="notification w-[150px] h-[225px]" />
                                        </div>
                                        <span className="text-[#363636] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">Gウェルネス💪疲れ知らず</span>
                                        <div className="absolute top-2 right-2">
                                            <img src={close} alt="close" className="w-[32px] h-[32px]" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center rounded-[16px] w-[234px] h-[272px] bg-white relative">
                                        <div className="flex w-[234px] p-[69px_19px_47px_19px] flex-col items-center rounded-[9.141px] bg-[#586B88]">
                                            <div className="flex flex-col items-center gap-[9px] self-stretch">
                                                <img src={lock} alt="close" className="w-[68px] h-[68px]" />
                                                <div className="flex flex-col items-center gap-[4px] self-stretch">
                                                    <span className="text-[#CDD9EC] font-['Noto_Sans_JP'] text-[18px] font-bold leading-[15px]">パスワード</span>
                                                    <span className="text-[#CDD9EC] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[13.6px]">PWを入れて印刷しよう</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[#363636] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">Gウェルネス💪疲れ知らず</span>
                                        <div className="absolute top-2 right-2">
                                            <img src={close} alt="close" className="w-[32px] h-[32px]" />
                                        </div>
                                    </div>                                    
                                </div>                                
                            </div>
                            <div className="flex flex-row items-start gap-[16px] w-full">
                                <div className="flex flex-row items-center gap-[6px]">
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">ファイル数</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">0/10</span>
                                </div>
                                <div className="flex flex-row items-center gap-[6px]">
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">容量25MBまで</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">0/25</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-[10px] pt-[32px] w-full">
                            <div className="flex w-full py-[15px] flex-col justify-center items-center rounded-[8px] shadow-[0px_4px_8px_0px_rgba(255, 42, 161, 0.20)] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]">
                                <span className="text-white text-center font-['Noto Sans JP'] text-[18px] font-bold leading-[14px]">登録する</span>
                            </div>
                            <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[18px]">※ 登録後は商品ファイルの変更はできません。</span>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default CategoryEdit;