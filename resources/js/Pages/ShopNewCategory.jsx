import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ProductCarousel from '@/Components/ProductCarousel';
import ConfirmationModal from '@/Components/ConfirmationModal';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shoptop/photo4.png';
import photo2 from '@/assets/images/shoptop/photo1.png';
import photo3 from '@/assets/images/shoptop/photo2.png';
import photo4 from '@/assets/images/shoptop/photo3.png';
import pencil from '@/assets/images/pencil.svg';
import recyclebin from '@/assets/images/recyclebin.png';
import default_user from '@/assets/images/default-user.png';
import share from '@/assets/images/share.png';
import arrow_left from '@/assets/images/arrow_left.svg';
import {vwd, vw, responsiveTextD, responsiveText, vwR, responsiveMetricR, responsiveTextR} from '@/lib/utils';



const ShopNewCategory = () => {
    const { productBatches, category, auth } = usePage().props;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleGoBack = () => {
        window.history.back();
    };

    // Check if current user is the category owner
    // Try both user_id and user.id properties
    const categoryOwnerId = category?.user_id || category?.user?.id;
    const isOwner = auth?.user && categoryOwnerId === auth.user.id;
    
    // Debug logging (remove in production)
    // console.log('Debug - auth:', auth);
    // console.log('Debug - category:', category);
    // console.log('Debug - isOwner:', isOwner);
    // console.log('Debug - auth.user.id:', auth?.user?.id);
    // console.log('Debug - category.user_id:', category?.user_id);
    // console.log('Debug - category.user.id:', category?.user?.id);
    // console.log('Debug - categoryOwnerId:', categoryOwnerId);

    // Handle category deletion
    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!category?.id) return;
        
        setIsDeleting(true);
        try {
            await router.delete(`/myshop/category/${category.id}`);
            // The page will automatically refresh with the redirect
        } catch (error) {
            console.error('Delete failed:', error);
            alert('削除に失敗しました。');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    // Handle category editing
    const handleEdit = () => {
        if (category?.id) {
            router.visit(route('myshop.category.edit', { category: category.id }));
        }
    };

    // Handle category sharing
    const handleShare = async () => {
        try {
            // Generate the correct share URL for others to view this category
            const shareUrl = category?.id 
                ? `${window.location.origin}/shop-newcategory/${category.id}`
                : window.location.href;
            
            const shareData = {
                title: category?.title || 'Mechapuri Category',
                text: `${category?.title || 'カテゴリ'} - ${productBatches?.length || 0}点の商品`,
                url: shareUrl,
            };

            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('カテゴリURLをコピーしました！');
            }
        } catch (err) {
            console.error('Failed to share category:', err);
        }
    };
    // Transform productBatches to match the expected format for ProductCarousel
    const transformedProducts = productBatches ? productBatches.map(batch => {
        const totalImages = batch.files ? batch.files.length : 0;
        let badges = [];
        
        // Show badges based on total number of images
        if (totalImages === 1) {
            // 1 image product: show 1 badge (the same image)
            badges = [batch.files[0].url];
        } else if (totalImages === 2) {
            // 2 image product: show 2 badges (both images)
            badges = batch.files.map(file => file.url);
        } else if (totalImages > 2) {
            // More than 2 images: show up to 3 badges (first 3 images)
            badges = batch.files.slice(0, 3).map(file => file.url);
        }
        
        return {
            id: batch.id,
            title: batch.title,
            image: batch.files && batch.files.length > 0 ? batch.files[0].url : photo1,
            badges: badges,
            badgeText: `${batch.image_cnt}枚セット`,
            price: batch.price == 0 ? '無料' : `${batch.price}円`,
            like: 0, // We can add likes later if needed
            badge1: batch.badge1,
            badge2: batch.badge2,
            display_mode: batch.display_mode,
            user: batch.user,
        };
    }) : [];

    return (
        <div className="bg-white">
            <Header />
            <section className="flex flex-col justify-center items-start bg-white" style={{paddingTop: vwR(76, 124), paddingBottom: vwR(32, 80), paddingLeft: vwR(16, 120), paddingRight: vwR(16, 120), gap: vwR(16, 10)}}>
                {/* Frame 11 */}
                <div className="flex flex-row items-center self-stretch" onClick={handleGoBack} style={{gap: vwR(4, 4), paddingTop: vwR(4, 4), paddingBottom: vwR(4, 4)}}>
                    <img src={arrow_left} alt="arrow left" style={{...responsiveMetricR(18.375, 13.125, 18.375, 13.125)}}/>
                    <span style={{...responsiveTextR(14, 18, 'normal', 16, 24, 'normal', 'noto', '#000')}}>一覧に戻る</span>
                </div>
                <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between w-full' style={{gap: vwR(16, 0)}}>
                    <div className='flex flex-row items-center' style={{gap: vwR(8, 16)}}>
                        <img src={category?.user?.image || default_user} alt="user" className='rounded-full' style={{...responsiveMetricR(40, 40, 64, 64)}}/>
                        <span style={{...responsiveTextR(16, 18, 'bold', 21, 32, 'bold', 'noto', '#000')}}>{category?.user?.shop_title || category?.user?.name || 'Shop'}</span>
                    </div>
                    <div className='flex flex-row items-center' style={{gap: vwR(28, 28)}}>
                        {/* Delete Button - Only show for category owner */}
                        {isOwner && (
                            <button 
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className='flex flex-row items-center hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                                style={{gap: vwR(4, 4)}}
                            >
                                <img src={recyclebin} alt="recyclebin" style={{...responsiveMetricR(16, 16, 16, 16)}}/>
                                <span style={{...responsiveTextR(12, 18, 'normal', 12, 18, 'normal', 'noto', '#000')}}>
                                    {isDeleting ? '削除中...' : '削除'}
                                </span>
                            </button>
                        )}
                        
                        {/* Edit Button - Only show for category owner */}
                        {isOwner && (
                            <button 
                                onClick={handleEdit}
                                className='flex flex-row items-center hover:opacity-70 transition-opacity'
                                style={{gap: vwR(4, 4)}}
                            >
                                <img src={pencil} alt="pencil" style={{...responsiveMetricR(16, 16, 16, 16)}}/>
                                <span style={{...responsiveTextR(12, 18, 'normal', 12, 18, 'normal', 'noto', '#000')}}>編集</span>
                            </button>
                        )}
                        
                        {/* Share Button - Available for everyone */}
                        <button 
                            onClick={handleShare}
                            className='flex flex-row items-center hover:opacity-70 transition-opacity'
                            style={{gap: vwR(4, 4)}}
                        >
                            <img src={share} alt="share" style={{...responsiveMetricR(16, 16, 16, 16)}}/>
                            <span style={{...responsiveTextR(12, 18, 'normal', 12, 18, 'normal', 'noto', '#000')}}>シェア</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {/* 211: 最新の出品 + arrow */}
                    <div className="flex flex-row items-center" style={{gap: vwR(12, 12), paddingTop: vwR(25, 25), paddingBottom: vwR(6, 6)}}>
                        <span style={{...responsiveTextR(16, 20, 'bold', 24, 37.8, 'bold', 'noto', '#000')}}>{category?.title || 'カテゴリ'}</span>
                        <span style={{...responsiveTextR(14, 21, 'bold', 16, 24, 'bold', 'noto', '#ACACAC')}}>{productBatches?.length || 0}点</span>
                    </div>
                    {/* 212: Product List */}
                    <ProductCarousel
                        products={transformedProducts}
                        isMobile={isMobile}
                        horizontalScroll={isMobile ? false : true}
                    />
                </div>
            </section>
            {/* </section> */}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="カテゴリの削除"
                message={`「${category?.title}」を削除しますか？${
                    productBatches?.length > 0 
                        ? `\n\nこのカテゴリには${productBatches.length}個の商品が含まれています。削除すると、商品はカテゴリから外されますが、商品自体は削除されません。`
                        : ''
                }`}
                confirmText="削除する"
                cancelText="キャンセル"
                confirmButtonClass="bg-red-500 hover:bg-red-600"
                isLoading={isDeleting}
                loadingText="削除中..."
            />

            <Footer />
        </div>
    );
};

export default ShopNewCategory;