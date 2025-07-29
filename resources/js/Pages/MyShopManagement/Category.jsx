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


const Category = () => {

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
                {/* MOBILE: custom layout, DESKTOP: keep as is */}
                {/* MOBILE ONLY */}
                <div className="block md:hidden mx-4 mt-[160px] flex flex-col items-start gap-8">
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">商品のカテゴリ</h1>
                        <span className="text-[#363636] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">0/200</span>
                    </div>
                    {/* Frame 1 */}
                    <div className="flex flex-col gap-2 item-start  w-full">
                        <div className="flex flex-row gap-2 item-center">
                            <div className="flex w-[120px] h-[34px] flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white my-[7px]">
                                <span className="text-center font-['Noto Sans JP'] text-[12px] font-bold leading-[18px] bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent">カテゴリの並び替え</span>
                            </div>
                            <div className="flex w-[120px] h-[34px] flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white my-[7px]">
                                <span className="text-center font-['Noto Sans JP'] text-[12px] font-bold leading-[18px] bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent">カテゴリを追加</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 self-stretch">
                            <div className="flex flex-col items-start py-5 px-4 gap-2 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                                <div className="flex flex-col items-start justify-between w-full">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">最新の出品</span>
                                    <div className="flex flex-row items-center py-[12px] gap-[4px]">
                                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                            詳細を見る
                                        </span>
                                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                                    </div>
                                </div>
                                {/* 1212: 4点 */}
                                <div className="flex px-2 items-end self-stretch">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[40px]">
                                        4
                                    </span>
                                    <span className="text-black font-['Noto Sans JP'] text-[12px] font-normal leading-[32px] tracking-[0.9px] px-[1px]">
                                        点
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start py-5 px-[16px] gap-2 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                                <div className="flex flex-col items-start justify-between w-full">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">新しいリスト</span>
                                    <div className="flex flex-row items-center py-[12px] gap-[4px]">
                                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                            詳細を見る
                                        </span>
                                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                                    </div>
                                </div>
                                {/* 1212: 4点 */}
                                <div className="flex px-2 items-end self-stretch">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[40px]">
                                        4
                                    </span>
                                    <span className="text-black font-['Noto Sans JP'] text-[12px] font-normal leading-[32px] tracking-[0.9px] px-[1px]">
                                        点
                                    </span>
                                </div>
                                {/* 1213: 編集/削除 */}
                                <div className="flex flex-row items-start justify-between self-stretch">
                                    {/* 12131: add button */}
                                    <div className="flex w-[120px] h-[35px] flex-col justify-center items-start rounded-[5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]">
                                        <div className="flex w-[120px] h-[35px] justify-center items-center gap-[10px] flex-shrink-0">
                                            <div className="flex w-[16px] h-[16px] justify-center items-center flex-shrink-0">
                                                <img src={file_add} alt="file_add" className="w-[16px] h-[16px]" />
                                            </div>
                                            <span className="text-white text-center font-['Noto Sans JP'] text-[13px] font-black leading-[19.5px]">商品登録</span>
                                        </div>
                                    </div>

                                    {/* 12132: 編集/削除 */}
                                    <div className="inline-flex items-center gap-2">
                                        <div className="flex items-center gap-2 w-[80px] h-[32px] px-3 rounded-[5px] bg-[#E9E9E9]">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">編集</span>
                                        </div>
                                        <div className="flex items-center gap-2 w-[80px] h-[32px] px-3 rounded-[5px] bg-[#E9E9E9]">
                                            <img src={recyclebin} alt="delete" className="w-5 h-5" />
                                            <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">削除</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <main
                    className="hidden md:flex flex-col items-left gap-[32px] max-w-[928px] py-[50px] pb-[40px] w-full md:ml-[79px]"
                >
                    {/* DESKTOP: keep original layout */}
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[36px] font-bold leading-[54px]">商品のカテゴリ</h1>
                        <span className="text-[#363636] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">0/200</span>
                    </div>
                    {/* Frame 1 */}
                    <div className="flex flex-col gap-4 item-start">
                        <div className="flex flex-row gap-6 item-center">
                            <div className="flex w-[165px] h-[34px] flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white my-[7px]">
                                <span className="text-center font-['Noto Sans JP'] text-[14px] font-bold leading-[22px] bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent">カテゴリの並び替え</span>
                            </div>
                            <div className="flex w-[165px] h-[34px] flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white my-[7px]">
                                <span className="text-center font-['Noto Sans JP'] text-[14px] font-bold leading-[22px] bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent">カテゴリを追加</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 self-stretch">
                            <div className="flex flex-col items-start py-5 px-[50px] gap-4 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                                <div className="flex flex-row items-start justify-between w-full">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-medium leading-[37.8px]">最新の出品</span>
                                    <div className="flex flex-row items-center p-[12px] gap-[4px]">
                                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                            詳細を見る
                                        </span>
                                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                                    </div>
                                </div>
                                {/* 1212: 4点 */}
                                <div className="flex px-2 items-end self-stretch">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[46px] font-bold leading-[40.5px]">
                                        4
                                    </span>
                                    <span className="text-black font-['Noto Sans JP'] text-[18px] font-normal leading-[18px] tracking-[0.9px] px-[1px]">
                                        点
                                    </span>
                                </div>

                            </div>
                            <div className="flex flex-col items-start py-5 px-[50px] gap-4 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                                <div className="flex flex-row items-start justify-between w-full">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-medium leading-[37.8px]">新しいリスト</span>
                                    <div className="flex flex-row items-center p-[12px] gap-[4px]">
                                        <img src={list} alt="list" className="w-[16px] h-[16px]" />
                                        <span className="text-[#363636] font-noto text-[14px] font-medium leading-[10px]">
                                            詳細を見る
                                        </span>
                                        <img src={arrow} alt="arrow" className="w-[16px] h-[16px] " />
                                    </div>
                                </div>
                                {/* 1212: 4点 */}
                                <div className="flex px-2 items-end self-stretch">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[46px] font-bold leading-[40.5px]">
                                        4
                                    </span>
                                    <span className="text-black font-['Noto Sans JP'] text-[18px] font-normal leading-[18px] tracking-[0.9px] px-[1px]">
                                        点
                                    </span>
                                </div>
                                {/* 1213: 編集/削除 */}
                                <div className="flex flex-row items-start justify-between self-stretch">
                                    {/* 12131: add button */}
                                    <div className="flex w-[160px] h-[35px] flex-col justify-center items-start rounded-[5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]">
                                        <div className="flex w-[165px] h-[35px] justify-center items-center gap-[10px] flex-shrink-0">
                                            <div className="flex w-[16px] h-[16px] justify-center items-center flex-shrink-0">
                                                <img src={file_add} alt="file_add" className="w-[16px] h-[16px]" />
                                            </div>
                                            <span className="text-white text-center font-['Noto Sans JP'] text-[13px] font-black leading-[19.5px]">写真を商品登録</span>
                                        </div>
                                    </div>

                                    {/* 12132: 編集/削除 */}
                                    <div className="inline-flex items-center gap-2">
                                        <div className="flex items-center gap-2 w-[80px] h-[32px] px-3 rounded-[5px] bg-[#E9E9E9]">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">編集</span>
                                        </div>
                                        <div className="flex items-center gap-2 w-[80px] h-[32px] px-3 rounded-[5px] bg-[#E9E9E9]">
                                            <img src={recyclebin} alt="delete" className="w-5 h-5" />
                                            <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">削除</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Category;