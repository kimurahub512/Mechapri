import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import ConfirmationModal from '@/Components/ConfirmationModal';
import CategoryReorderModal from '@/Components/CategoryReorderModal';
import '@/../../resources/css/shopmanagement.css';
import recyclebin from '@/assets/images/recyclebin.svg';
import list from '@/assets/images/list_unordered.png';
import arrow from '@/assets/images/arrow_right.svg';
import file_add from '@/assets/images/file_add.svg';
import {vw, vwd, responsiveText, responsiveTextD, responsiveMetric, responsiveMetricD} from '@/lib/utils';


const Category = () => {
    const { categories, totalBatches, auth, flash } = usePage().props;

    // Success message state
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Show success message if it exists in flash
    useEffect(() => {
        if (flash?.success) {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }
    }, [flash?.success]);

    // Confirmation modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Reorder modal state
    const [showReorderModal, setShowReorderModal] = useState(false);
    const [isReordering, setIsReordering] = useState(false);

    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        setIsDeleting(true);
        try {
            await router.delete(`/myshop/category/${categoryToDelete.id}`);
            // The page will automatically refresh with the redirect
        } catch (error) {
            console.error('Delete failed:', error);
            alert('削除に失敗しました。');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const handleReorder = () => {
        setShowReorderModal(true);
    };

    const handleReorderSave = async (orderedCategories) => {
        setIsReordering(true);
        try {
            const reorderData = orderedCategories.map((category, index) => ({
                id: category.id,
                sort_order: index
            }));

            await router.post('/myshop/category/reorder', { categories: reorderData });
            setShowReorderModal(false);
            // The page will refresh automatically due to the redirect
        } catch (error) {
            console.error('Reorder failed:', error);
            alert('並び替えに失敗しました。');
        } finally {
            setIsReordering(false);
        }
    };

    const cancelReorder = () => {
        setShowReorderModal(false);
    };
    return (
        <>
            <Header />
            
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-['Noto_Sans_JP']">
                    {flash?.success}
                </div>
            )}
            
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar />
                </div>
                <ShopMobileTopBlock />
                {/* Main Section */}
                {/* MOBILE: custom layout, DESKTOP: keep as is */}
                {/* MOBILE ONLY */}
                <div className="block md:hidden flex flex-col items-start" style={{marginRight: vw(16), marginLeft: vw(16), paddingTop: vw(32), paddingBottom: vw(20), gap: vw(8)}}>
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 style={{...responsiveText(24, 24, null, 'bold', 'noto', '#363636')}}>商品のカテゴリ</h1>
                        <span style={{...responsiveText(16, 16, null, 'normal', 'noto', '#363636')}}>{categories.length || 0}/200</span>
                    </div>
                    {/* Frame 1 */}
                    <div className="flex flex-col item-start  w-full" style={{gap: vw(8)}}>
                        <div className="flex flex-row item-center" style={{gap: vw(8)}}>
                            <button 
                                onClick={handleReorder}
                                className="flex flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                style={{...responsiveMetric(120, 34, null, 'normal', 'noto', '#FF8D4E'), marginTop: vw(7), marginBottom: vw(7)}}
                            >
                                <span className="text-center bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent" style={{...responsiveText(12, 18, null, 'bold', 'noto')}}>カテゴリの並び替え</span>
                            </button>
                            <div className="flex flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white" style={{...responsiveMetric(120, 34, null, 'normal', 'noto', '#FF8D4E'), marginTop: vw(7), marginBottom: vw(7)}}>
                                <a href='/myshop/category/create' className="text-center bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent" style={{...responsiveText(12, 18, null, 'bold', 'noto')}}>カテゴリを追加</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center self-stretch" style={{gap: vw(16)}}>
                            <div className="flex flex-col items-start rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch" style={{gap: vw(8), paddingTop: vw(20), paddingBottom: vw(20), paddingLeft: vw(16), paddingRight: vw(16)}}>
                                <div className="flex flex-col items-start justify-between w-full">
                                    <span style={{...responsiveText(24, 24, null, 'bold', 'noto', '#363636')}}>最新の出品</span>
                                    <div
                                        onClick={() => router.visit('/shop-newproducts')}
                                        className="flex flex-row items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        style={{gap: vw(4), paddingTop: vw(12), paddingBottom: vw(12)}}
                                    >
                                        <img src={list} alt="list" style={{width: vw(16), height: vw(16)}} />
                                        <span style={{...responsiveText(14, 10, null, 'medium', 'noto', '#363636')}}>
                                            詳細を見る
                                        </span>
                                        <img src={arrow} alt="arrow" style={{width: vw(16), height: vw(16)}} />
                                    </div>
                                </div>
                                {/* 1212: batch count */}
                                <div className="flex items-end self-stretch" style={{paddingLeft: vw(8), paddingRight: vw(8)}}>
                                    <span style={{...responsiveText(21, 40, null, 'bold', 'noto', '#363636')}}>
                                        {totalBatches || 0}
                                    </span>
                                    <span style={{...responsiveText(12, 32, null, 'black', 'noto', '#000'), paddingLeft: vw(1), paddingRight: vw(1)}}>
                                        点
                                    </span>
                                </div>
                            </div>
                            {/* <div className="flex flex-col items-start py-5 px-[16px] gap-2 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
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
                                <div className="flex px-2 items-end self-stretch">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[40px]">
                                        4
                                    </span>
                                    <span className="text-black font-noto text-[12px] font-normal leading-[32px] tracking-[0.9px] px-[1px]">
                                        点
                                    </span>
                                        </div>
                                <div className="flex flex-row items-start justify-between self-stretch">
                                    <div className="flex w-[120px] h-[35px] flex-col justify-center items-start rounded-[5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]">
                                        <div className="flex w-[120px] h-[35px] justify-center items-center gap-[10px] flex-shrink-0">
                                            <div className="flex w-[16px] h-[16px] justify-center items-center flex-shrink-0">
                                                <img src={file_add} alt="file_add" className="w-[16px] h-[16px]" />
                                        </div>
                                            <span className="text-white text-center font-noto text-[13px] font-black leading-[19.5px]">商品登録</span>
                                        </div>
                                    </div>

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
                            </div> */}
                        </div>
                    </div>

                    {/* Categories List */}
                    {categories && categories.length > 0 && (
                        <div className="flex flex-col w-full" style={{gap: vw(16)}}>
                            <h2 style={{...responsiveText(20, 24, null, 'bold', 'noto', '#363636')}}>カテゴリ一覧</h2>
                            {categories.map((category) => (
                                <div key={category.id} className="flex flex-col items-start rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch" style={{gap: vw(12), paddingTop: vw(16), paddingBottom: vw(16), paddingLeft: vw(16), paddingRight: vw(16)}}>
                                    <div className="flex flex-row items-start justify-between w-full">
                                        <div className="flex flex-col" style={{gap: vw(8)}}>
                                            <span style={{...responsiveText(18, 24, null, 'bold', 'noto', '#363636')}}>{category.title}</span>

                                            <div className="flex items-end self-stretch" style={{paddingLeft: vw(8), paddingRight: vw(8)}}>
                                                <span style={{...responsiveText(21, 40, null, 'bold', 'noto', '#363636')}}>
                                                    {category.batch_cnt || 0}
                                                </span>
                                                <span style={{...responsiveText(12, 32, null, 'black', 'noto', '#000'), paddingLeft: vw(1), paddingRight: vw(1)}}>
                                                    点
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-start justify-between self-stretch">
                                                <div className="flex flex-col justify-center items-start rounded-[5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]" style={{...responsiveMetric(120, 35, null, 'normal', 'noto', '#FF8D4E')}}>
                                                    <a href='/myshop/registerproduct' className="flex justify-center items-center gap-[10px] flex-shrink-0" style={{...responsiveMetric(120, 35, null, 'normal', 'noto', '#FF8D4E')}}>
                                                        <div className="flex justify-center items-center flex-shrink-0" style={{width: vw(16), height: vw(16)}}>
                                                            <img src={file_add} alt="file_add" style={{width: vw(16), height: vw(16)}} />
                                                        </div>
                                                        <span style={{...responsiveText(13, 19.5, null, 'black', 'noto', '#fff')}}>商品登録</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2" style={{gap: vw(8)}}>
                                            <button
                                                onClick={() => router.visit(`/myshop/category/${category.id}/edit`)}
                                                className="flex items-center rounded-[5px] bg-[#E9E9E9] hover:bg-[#D9D9D9] transition-colors cursor-pointer"
                                                style={{...responsiveMetric(80, 32), paddingLeft: vw(12), paddingRight: vw(12), gap: vw(8)}}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{...responsiveMetric(20, 20)}}>
                                                    <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span style={{...responsiveText(12, 18, null, 'bold', 'noto', '#767676')}}>編集</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                className="flex items-center rounded-[5px] bg-[#E9E9E9] hover:bg-[#D9D9D9] transition-colors cursor-pointer"
                                                style={{gap:vw(8), ...responsiveMetric(80, 32), paddingLeft: vw(12), paddingRight: vw(12)}}
                                            >
                                                <img src={recyclebin} alt="delete" style={{width: vw(20), height: vw(20)}} />
                                                <span style={{...responsiveText(12, 18, null, 'bold', 'noto', '#767676')}}>削除</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <main
                    className="hidden md:flex flex-col items-left" style={{marginLeft: vwd(79), gap: vwd(32), width: vwd(928), paddingTop: vwd(140), paddingBottom: vwd(40)}}
                >
                    {/* DESKTOP: keep original layout */}
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 style={{...responsiveTextD(36, 54, null, 'bold', 'noto', '#363636')}}>商品のカテゴリ</h1>
                        <span style={{...responsiveTextD(16, 24, null, 'normal', 'noto', '#363636')}}>{categories.length || 0}/200</span>
                    </div>
                    {/* Frame 1 */}
                    <div className="flex flex-col item-start" style={{gap: vwd(16)}}>
                        <div className="flex flex-row item-center" style={{gap: vwd(24)}}>
                            <button 
                                onClick={handleReorder}
                                className="flex flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                style={{...responsiveMetricD(165, 34), marginTop: vwd(7), marginBottom: vwd(7)}}
                            >
                                <span className="text-center bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent" style={{...responsiveTextD(14, 22, null, 'bold', 'noto')}}>カテゴリの並び替え</span>
                            </button>
                            <div className="flex flex-col justify-center items-center rounded-[5px] border border-[#FF8D4E] bg-white" style={{...responsiveMetricD(165, 34), marginTop: vwd(7), marginBottom: vwd(7)}}>
                                <a href='/myshop/category/create' className="text-center bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] bg-clip-text text-transparent" style={{...responsiveTextD(14, 22, null, 'bold', 'noto')}}>カテゴリを追加</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center self-stretch" style={{gap: vwd(16)}}>
                            <div className="flex flex-col items-start rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch" style={{gap: vwd(16), paddingTop: vwd(20), paddingBottom: vwd(20), paddingLeft: vwd(50), paddingRight: vwd(50)}}>
                                <div className="flex flex-row items-start justify-between w-full">
                                    <span style={{...responsiveTextD(24, 24, null, 'bold', 'noto', '#363636')}}>最新の出品</span>
                                    <div
                                        onClick={() => router.visit('/shop-newproducts')}
                                        className="flex flex-row items-center cursor-pointer hover:opacity-80 transition-opacity"
                                        style={{gap: vwd(4), paddingTop: vwd(12), paddingBottom: vwd(12)}}
                                    >
                                        <img src={list} alt="list" style={{width: vwd(16), height: vwd(16)}} />
                                        <span style={{...responsiveTextD(14, 10, null, 'medium', 'noto', '#363636')}}>
                                            詳細を見る
                                        </span>
                                        <img src={arrow} alt="arrow" style={{...responsiveMetricD(16, 16)}}/>
                                    </div>
                                </div>
                                {/* 1212: batch count */}
                                <div className="flex px-2 items-end self-stretch">
                                    <span style={{...responsiveTextD(46, 40.5, null, 'bold', 'noto', '#363636')}}>
                                        {totalBatches || 0}
                                    </span>
                                    <span style={{...responsiveTextD(18, 18, 0.9, 'black', 'noto', '#000'), paddingLeft: vwd(1), paddingRight: vwd(1)}}>
                                        点
                                    </span>
                                </div>

                            </div>
                            {/* <div className="flex flex-col items-start py-5 px-[50px] gap-4 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
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
                                <div className="flex px-2 items-end self-stretch">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[46px] font-bold leading-[40.5px]">
                                        4
                                    </span>
                                    <span className="text-black font-noto text-[18px] font-normal leading-[18px] tracking-[0.9px] px-[1px]">
                                        点
                                    </span>
                                </div>
                                <div className="flex flex-row items-start justify-between self-stretch">
                                    <div className="flex w-[160px] h-[35px] flex-col justify-center items-start rounded-[5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]">
                                        <div className="flex w-[165px] h-[35px] justify-center items-center gap-[10px] flex-shrink-0">
                                            <div className="flex w-[16px] h-[16px] justify-center items-center flex-shrink-0">
                                                <img src={file_add} alt="file_add" className="w-[16px] h-[16px]" />
                                            </div>
                                            <span className="text-white text-center font-noto text-[13px] font-black leading-[19.5px]">写真を商品登録</span>
                                        </div>
                                    </div>

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
                            </div> */}
                        </div>
                    </div>

                    {/* Categories List - Desktop */}
                    {categories && categories.length > 0 && (
                        <div className="flex flex-col w-full" style={{gap: vwd(24)}}>
                            <h2 style={{...responsiveTextD(28, 36, null, 'bold', 'noto', '#363636')}}>カテゴリ一覧</h2>
                            {categories.map((category) => (
                                <div key={category.id} className="flex flex-col items-start rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch" style={{paddingTop: vwd(24), paddingBottom: vwd(24), paddingLeft: vwd(50), paddingRight: vwd(50), gap: vwd(16)}}>
                                    <div className="flex flex-row items-start justify-between w-full">
                                        <div className="flex flex-col gap-3">
                                            <span style={{...responsiveTextD(24, 32, null, 'bold', 'noto', '#363636')}}>{category.title}</span>
                                            {/* {category.description && (
                                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">{category.description}</span>
                                            )} */}
                                            {/* <div className="flex items-center gap-3">
                                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[20px]">商品数: {category.batch_cnt || 0}件</span>
                                                <span className={`px-3 py-1 rounded text-sm ${category.is_public ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {category.is_public ? '公開' : '非公開'}
                                                </span>
                                            </div> */}
                                            <div className="flex px-2 items-end self-stretch">
                                                <span style={{...responsiveTextD(46, 40.5, null, 'bold', 'noto', '#363636')}}>
                                                    {category.batch_cnt || 0}
                                                </span>
                                                <span style={{...responsiveTextD(18, 18, 0.9, 'black', 'noto', '#000'), paddingLeft: vwd(1), paddingRight: vwd(1)}}>
                                                    点
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-start justify-between self-stretch">
                                                <div className="flex flex-col justify-center items-start rounded-[5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]" style={{...responsiveMetricD(160, 35)}}>
                                                    <a href='/myshop/registerproduct' className="flex justify-center items-center gap-[10px] flex-shrink-0" style={{...responsiveMetricD(165, 35)}}>
                                                        <div className="flex justify-center items-center flex-shrink-0" style={{width: vwd(16), height: vwd(16)}}>
                                                            <img src={file_add} alt="file_add" style={{width: vwd(16), height: vwd(16)}} />
                                                        </div>
                                                        <span style={{...responsiveTextD(13, 19.5, null, 'black', 'noto', '#fff')}}>写真を商品登録</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => router.visit(`/myshop/category/${category.id}/edit`)}
                                                className="flex items-center rounded-[5px] bg-[#E9E9E9] hover:bg-[#D9D9D9] transition-colors cursor-pointer"
                                                style={{...responsiveMetricD(100, 40), paddingLeft: vwd(16), paddingRight: vwd(16), gap: vwd(8)}}
                                            >
                                                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{...responsiveMetricD(20, 20)}}>
                                                    <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span style={{...responsiveTextD(14, 20, null, 'bold', 'noto', '#767676')}}>編集</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                className="flex items-center rounded-[5px] bg-[#E9E9E9] hover:bg-[#D9D9D9] transition-colors cursor-pointer"
                                                style={{...responsiveMetricD(100, 40), paddingLeft: vwd(16), paddingRight: vwd(16), gap: vwd(8)}}
                                            >
                                                <img src={recyclebin} alt="delete" style={{width: vwd(20), height: vwd(20)}} />
                                                <span style={{...responsiveTextD(14, 20, null, 'bold', 'noto', '#767676')}}>削除</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </main>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="カテゴリの削除"
                message={`「${categoryToDelete?.title}」を削除しますか？`}
                confirmText="削除する"
                cancelText="キャンセル"
                confirmButtonClass="bg-red-500 hover:bg-red-600"
                isLoading={isDeleting}
                loadingText="削除中..."
            />

            {/* Category Reorder Modal */}
            <CategoryReorderModal
                isOpen={showReorderModal}
                onClose={cancelReorder}
                onSave={handleReorderSave}
                categories={categories}
                isLoading={isReordering}
            />

            <Footer />
        </>
    );
};

export default Category;