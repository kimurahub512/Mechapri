import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import ConfirmationModal from '@/Components/ConfirmationModal';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import radio from '@/assets/images/beginner_radio.svg';
import add from '@/assets/images/add.svg';
import close from '@/assets/images/close.svg';
import lock from '@/assets/images/lock.svg';
import {vwR,  responsiveTextR, responsiveMetricR, responsivePositionR} from '@/lib/utils';


const CategoryEdit = () => {
    const { auth, editMode, category, productBatches } = usePage().props;
    console.log(productBatches);
    // Form state
    const [title, setTitle] = useState(editMode && category ? category.title : '');
    const [description, setDescription] = useState(editMode && category ? category.description : '');
    const [isPublic, setIsPublic] = useState(editMode && category ? category.is_public : true);
    
    // Character counters
    const [titleCount, setTitleCount] = useState(0);
    const [descriptionCount, setDescriptionCount] = useState(0);
    
    // Product selection state
    const [showProductSelection, setShowProductSelection] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(editMode && category ? category.product_batches || [] : []);
    
    // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Confirmation modal state
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    // Error state
    const [error, setError] = useState(null);
        
    // Alternative: You can also use vwResponsive directly for one-off calculations
    // const modalPadding = vwResponsive(16);
    // const modalWidth = vwResponsive(400);
    
    // Update character counters when form values change
    useEffect(() => {
        setTitleCount(title.length);
        setDescriptionCount(description.length);
    }, [title, description]);
    
    const scrollToTop = () => {
        console.log('Scrolling to top...');
        
        try {
            // Method 1: Scroll to top of page
            window.scrollTo(0, 0);
            console.log('Method 1: Scrolled to top of page');
            
            // Method 2: Scroll the main container
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.scrollTop = 0;
                console.log('Method 2: Scrolled main container');
            }
            
            // Method 3: Scroll to error element
            setTimeout(() => {
                const errorElement = document.querySelector('.error-message');
                console.log('Error element found:', errorElement);
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log('Method 3: Scrolled to error element');
                }
            }, 100);
            
        } catch (error) {
            console.error('Scroll error:', error);
        }
    };
    
    // Initialize selected products from category if in edit mode
    useEffect(() => {
        if (editMode && category && category.product_batches) {
            setSelectedProducts(category.product_batches);
        }
    }, [editMode, category]);
    
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setTitle(value);
        }
    };
    
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setDescription(value);
        }
    };
    
    const handleSubmit = () => {
        // Reset error state
        setError(null);
        
        if (!title.trim()) {
            setError('カテゴリ名を入力してください。');
            setTimeout(() => scrollToTop(), 100);
            return;
        }
        
        setShowConfirmModal(true);
    };
    
    const confirmSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            const formData = {
                title: title.trim(),
                description: description.trim(),
                is_public: isPublic,
                product_batch_ids: selectedProducts.map(p => p.id)
            };
            
            if (editMode) {
                await router.put(`/myshop/category/${category.id}`, formData);
            } else {
                await router.post('/myshop/category', formData);
            }
        } catch (error) {
            console.error('Error submitting category:', error);
            setIsSubmitting(false);
        }
    };
    
    const cancelSubmit = () => {
        setShowConfirmModal(false);
    };
    
    const handleProductSelection = (product) => {
        const isSelected = selectedProducts.some(p => p.id === product.id);
        
        if (isSelected) {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };
    
    const removeProduct = (productId) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    };
    
    const isProductSelected = (productId) => {
        return selectedProducts.some(p => p.id === productId);
    };
    
    const getDisplayModeIcon = (displayMode) => {
        switch (displayMode) {
            case 'gacha':
                return '🎰';
            case 'blur':
                return '🔒';
            case 'password':
                return '🔑';
            case 'cushion':
                return '🛡️';
            default:
                return '📄';
        }
    };
    
    const getDisplayModeText = (displayMode) => {
        switch (displayMode) {
            case 'gacha':
                return 'ガチャ';
            case 'blur':
                return 'ぼかしフィルター';
            case 'password':
                return 'パスワード';
            case 'cushion':
                return 'ワンクッション';
            default:
                return '設定しない';
        }
    };



    // Product Selection Modal Component
    const ProductSelectionModal = () => {
        if (!showProductSelection) return null;
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{padding: vwR(16, 64)}}>
                <div className="bg-white rounded-[16px] w-full overflow-y-auto" style={{
                    height: vwR(400, 700)
                }}>
                    <div className="p-6" style={{padding: vwR(16, 32)}}>
                        <div className="flex justify-between items-center" style={{marginBottom: vwR(16, 32)}}>
                            <h2 style={responsiveTextR(24, 24, 'bold', 32, 32, 'bold', 'noto', '#363636')}>
                                商品を選択
                            </h2>
                            <button 
                                onClick={() => setShowProductSelection(false)}
                                className="text-[#ACACAC] hover:text-[#363636]"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {productBatches && productBatches.length > 0 ? (
                            <div className="grid grid-cols-3 mb-6" style={{gap: vwR(16, 32), marginBottom: vwR(16, 32)}}>
                                {productBatches.map((product) => (
                                    <div 
                                        key={product.id}
                                        className={`relative cursor-pointer rounded-[16px] border-2 transition-all ${
                                            isProductSelected(product.id) 
                                                ? 'border-[#FF2AA1] bg-[#FFF0F8]' 
                                                : 'border-[#E9E9E9] bg-white hover:border-[#FF2AA1]'
                                        }`}
                                        onClick={() => handleProductSelection(product)}
                                    >
                                        <div className="flex flex-col items-center rounded-[16px] w-full bg-white relative" >
                                            <div className="flex w-full h-full px-2 flex-col items-center justify-center rounded-[9.141px] bg-[#F6F6F6]">
                                                {product.files && product.files.length > 0 ? (
                                                    <img 
                                                        src={product.files[0].url} 
                                                        alt={product.title}
                                                        className="object-cover rounded-[8px]"
                                                        style={{height: vwR(120, 190), width: vwR(120, 190)}} 
                                                    />
                                                ) : (
                                                    <div className="bg-[#E9E9E9] rounded-[8px] flex items-center justify-center" style={{height: vwR(120, 200), width: vwR(120, 200)}}>
                                                        <span className="text-[#ACACAC] text-xs md:text-sm">製品なし</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-center" style={responsiveTextR(12, 24, 'normal', 24, 32, 'normal', 'noto', '#363636')}>
                                                {product.title}
                                            </span>
                                            
                                            {isProductSelected(product.id) && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" style={{...responsivePositionR(6, null, null, 6, 8, null, null, 8), ...responsiveMetricR(16, 16, 32, 32)}}>
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-[#ACACAC]" style={{paddingTop: vwR(16, 32), paddingBottom: vwR(16, 32)}}>
                                商品がありません
                            </div>
                        )}
                        
                        <div className="flex flex-col md:flex-row justify-between items-center" style={{gap: vwR(16, 32)}}>
                            <div style={responsiveTextR(12, 24, 'normal', 18, 24, 'normal', 'noto', '#363636')}>
                                選択済み: {selectedProducts.length}件
                            </div>
                            <div className="flex" style={{gap: vwR(16, 32)}}>
                                <button 
                                    onClick={() => setShowProductSelection(false)}
                                    className="border border-[#E9E9E9] rounded-[8px] text-[#363636] hover:bg-[#F6F6F6]"
                                    style={{padding: vwR(16, 16)}}
                                >
                                    キャンセル
                                </button>
                                <button 
                                    onClick={() => setShowProductSelection(false)}
                                    className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] text-white rounded-[8px] hover:opacity-90"
                                    style={{padding: vwR(16, 16)}}
                                >
                                    保存 ({selectedProducts.length})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
                <div className="flex flex-col items-start" style={{paddingRight: vwR(16, 15), paddingLeft: vwR(16, 15), paddingTop: vwR(240, 40), paddingBottom: vwR(80, 40), marginRight: vwR(0, 169), marginLeft: vwR(0, 109), gap: vwR(16, 22)}}>
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 style={{...responsiveTextR(24, 24, 'bold', 36, 54, 'bold', 'noto', '#363636')}}>
                            {editMode ? '商品カテゴリ編集' : '商品カテゴリ作成'}
                        </h1>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="error-message w-full bg-red-50 border border-red-200 rounded-lg" style={{padding: vwR(16, 16), marginBottom: vwR(16, 16)}}>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{...responsiveMetricR(20, 20, 20, 20), marginRight: vwR(8, 8)}}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-800 font-'noto'">{error}</span>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-col items-start bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch" style={{padding: vwR(16, 24), paddingTop: vwR(16, 32), paddingBottom: vwR(16, 32), gap: vwR(16, 16), borderRadius: vwR(16, 16)}}>
                        {/* Category Name */}
                        <div className="flex flex-col items-start w-full" style={{gap: vwR(4, 7.2), paddingTop: vwR(0, 13.44)}}>
                            <div className="flex flex-col items-start w-full" style={{gap: vwR(4, 4)}}>
                                <div className="flex flex-row items-center" style={{gap: vwR(12, 12), paddingTop: vwR(12, 25), paddingBottom: vwR(6, 6)}}>
                                    <span style={{...responsiveTextR(14, 14, 'bold', 21, 27, 'bold', 'noto', '#363636')}}>カテゴリ名</span>
                                    <span style={{...responsiveTextR(14, 21, 'normal', 21, 27, 'normal', 'noto', '#ACACAC')}}>{titleCount}/200</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:font-normal placeholder:leading-normal" 
                                    style={{
                                        height: vwR(46, 46),
                                        padding: vwR(12, 12), borderRadius: vwR(5.71, 5.71), fontSize: vwR(14, 14)}}
                                    placeholder="カテゴリ名を入力してください" 
                                />
                            </div>
                        </div>

                        {/* Category Description */}
                        <div className="flex flex-col items-start w-full" style={{gap: vwR(4, 7.2), paddingTop: vwR(0, 13.44)}}>
                            <div className="flex flex-col items-start w-full" style={{gap: vwR(4, 4)}}>
                                <div className="flex flex-row items-center" style={{gap: vwR(12, 12), paddingTop: vwR(12, 25), paddingBottom: vwR(6, 6)}}>
                                    <span style={{...responsiveTextR(14, 14, 'bold', 21, 27, 'bold', 'noto', '#363636')}}>カテゴリ説明文</span>
                                    <span style={{...responsiveTextR(14, 21, 'normal', 21, 27, 'normal', 'noto', '#ACACAC')}}>{titleCount}/200</span>
                                </div>
                                <textarea 
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="w-full border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:font-normal placeholder:leading-[25px] resize-none" 
                                    style={{
                                        height: vwR(128, 90),
                                        padding: vwR(12.5, 12.5), borderRadius: vwR(5.71, 5.71), fontSize: vwR(14, 14)}}
                                    placeholder="カテゴリの説明文を入力してください" 
                                />
                                        </div>
                                    </div>

                        {/* Public Settings */}
                        <div className="flex flex-col items-start w-full" style={{gap: vwR(20, 20)}}>
                            <div className="flex flex-row items-center w-full border-b border-[#E9E9E9]" style={{gap: vwR(12, 12), paddingTop: vwR(12, 25), paddingBottom: vwR(6, 6)}}>
                                <span style={{...responsiveTextR(14, 14, 'bold', 21, 27, 'bold', 'noto', '#363636')}}>公開設定</span>
                                <span style={{...responsiveTextR(14, 21, 'normal', 16, 24, 'normal', 'noto', '#ACACAC')}}>いずれかを選択</span>
                            </div>
                            <div className="flex flex-col items-start w-full" style={{gap: vwR(8, 8)}}>
                                <div className="flex items-center cursor-pointer" onClick={() => setIsPublic(true)}>
                                    <img src={radio} alt="radio" className={`${isPublic ? '' : 'opacity-50'}`} style={{...responsiveMetricR(20, 20, 20, 20), marginRight: vwR(10, 10)}} />
                                    <span style={{...responsiveTextR(14, 24, 'normal', 18, 24, 'normal', 'noto', '#363636')}}>公開</span>
                                </div>
                                <span style={{...responsiveTextR(13, 19.5, 'medium', 16, 24, 'medium', 'noto', '#87969F'), marginLeft: vwR(30, 0)}}>誰でも商品ページを見ることができます</span>
                            </div>
                            <div className="flex flex-col items-start w-full" style={{gap: vwR(8, 8)}}>
                                <div className="flex items-center cursor-pointer" onClick={() => setIsPublic(false)}>
                                    <span className={`flex w-[20px] h-[20px] flex-shrink-0 rounded-full border mr-[10px] ${isPublic ? 'border-[#D1D1D1] bg-[#F8F8F8]' : 'border-[#FF2AA1] bg-[#FF2AA1]'}`} />
                                    <span style={{...responsiveTextR(14, 24, 'normal', 18, 24, 'normal', 'noto', '#363636')}}>非公開</span>
                                </div>
                                <span style={{...responsiveTextR(13, 19.5, 'medium', 16, 24, 'medium', 'noto', '#87969F'), marginLeft: vwR(30, 0)}}>自分だけが商品ページを見ることができます</span>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="flex flex-col items-start w-full" style={{gap: vwR(4, 4)}}>
                            <div className="flex flex-row items-center w-full" style={{gap: vwR(12, 12), paddingTop: vwR(12, 25), paddingBottom: vwR(6, 6)}}>
                                <span style={{...responsiveTextR(14, 14, 'bold', 21, 27, 'bold', 'noto', '#363636')}}>商品</span>
                                <span style={{...responsiveTextR(14, 21, 'normal', 16, 24, 'normal', 'noto', '#ACACAC')}}>いずれかを選択</span>
                            </div>
                            
                            <div className="flex items-start border-[2px] border-dashed border-[#ACACAC] bg-[#F1F3F4]" style={{padding: vwR(12, 30), paddingTop: vwR(7, 19), paddingBottom: vwR(8, 20), borderRadius: vwR(2, 2)}}>
                                <div className="grid grid-cols-3 w-full" style={{gap: vwR(6.2, 16)}}>
                                    {/* Add card */}
                                    <div 
                                        className="flex flex-col items-center border-[0.388px] border-[#ACACAC] bg-[#F6F6F6] cursor-pointer hover:bg-[#E9E9E9] transition-colors"
                                        style={{...responsiveMetricR(91, 105, 234, 272), paddingBottom: vwR(14, 38), borderRadius: vwR(6.2, 16)}}
                                        onClick={() => setShowProductSelection(true)}
                                    >
                                        <div className="flex justify-center items-center aspect-square" style={{...responsiveMetricR(91, 91, 234, 234), borderRadius: vwR(6.2, 16)}}>
                                            <div className="flex flex-col items-center justify-center " style={{...responsiveMetricR(64, 64, 165, 165), gap: vwR(3, 7.65)}}>
                                                <div className="flex justify-center items-center" style={{...responsiveMetricR(19, 19, 48, 48)}}>
                                                    <img src={add} alt="add" style={{...responsiveMetricR(19, 19, 48, 48)}} />
                                                </div>
                                                <div className="flex flex-col items-center gap-[1px] self-stretch" style={{gap: vwR(1, 2)}}>
                                                    <span style={{...responsiveTextR(7, 9, 'bold', 18, 23, 'bold', 'noto', '#586B88')}}>カテゴリに</span>
                                                    <span style={{...responsiveTextR(7, 9, 'bold', 18, 23, 'bold', 'noto', '#586B88')}}>商品を追加</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Selected products */}
                                    {selectedProducts.map((product) => (
                                        <div key={product.id} className="flex flex-col items-center bg-white relative" style={{...responsiveMetricR(91, 105, 234, 272), borderRadius: vwR(6.2, 16)}}>
                                            <div className="flex flex-col items-center bg-[#F6F6F6]" style={{...responsiveMetricR(91, 91, 234, 234), padding: vwR(2, 8), paddingRight: vwR(16, 8), paddingLeft: vwR(17, 8), borderRadius: vwR(3.54, 9)}}>
                                                {product.files && product.files.length > 0 ? (
                                                    <img src={product.files[0].url} alt={product.title} className="object-cover" style={{...responsiveMetricR(58, 87, 200, 200), borderRadius: vwR(3, 8)}} />
                                                ) : (
                                                    <div className="bg-[#E9E9E9] flex items-center justify-center" style={{...responsiveMetricR(58, 58, 200, 200), borderRadius: vwR(3, 8)}}>
                                                        <span className="text-[#ACACAC] text-xm">No Image</span>
                                        </div>
                                                )}
                                        </div>
                                            <span className="truncate w-full text-center px-1" style={{...responsiveTextR(6, 12, 'normal', 16, 24, 'normal', 'noto', '#363636')}}>
                                                {product.title}
                                            </span>
                                            <div 
                                                className="cursor-pointer"
                                                style={{...responsivePositionR(3, null, null, 4, 8, null, null, 8)}}
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <img src={close} alt="close" style={{...responsiveMetricR(12, 12, 32, 32)}} />
                                            </div>
                                        </div>
                                    ))}
                                </div>                                
                            </div>
                            
                            <div className="flex flex-row items-start w-full" style={{gap: vwR(16, 16)}}>
                                <div className="flex flex-row items-center" style={{gap: vwR(6, 6)}}>
                                    <span style={{...responsiveTextR(14, 21, 'normal', 16, 24, 'normal', 'noto', '#ACACAC')}}>選択済み商品</span>
                                    <span style={{...responsiveTextR(14, 21, 'normal', 16, 24, 'normal', 'noto', '#ACACAC')}}>{selectedProducts.length}件</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex flex-col items-center w-full" style={{gap: vwR(10, 10), paddingTop: vwR(32, 32)}}>
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex w-full flex-col justify-center items-center  bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{borderRadius: vwR(8, 8), padding: vwR(14, 15)}}
                            >
                                <span className="text-white text-center font-noto text-[18px] font-bold leading-[14px]" style={{...responsiveTextR(16, 18, 'bold', 18, 18, 'bold', 'noto', '#FFFFFF')}}>
                                    {isSubmitting ? (editMode ? '保存中...' : '登録中...') : (editMode ? '保存' : '登録する')}
                                </span>
                            </button>
                            <span style={{...responsiveTextR(12, 18, 'normal', 16, 24, 'normal', 'noto', '#87969F')}}>
                                ※ 登録後は商品ファイルの変更はできません。
                            </span>
                        </div>
                    </div>
                </div>
                
            </div>
            
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={cancelSubmit}
                onConfirm={confirmSubmit}
                title={editMode ? 'カテゴリの更新' : 'カテゴリの作成'}
                message={
                    <>
                        {editMode ? 'カテゴリを更新しますか？' : 'カテゴリを作成しますか？'}
                    </>
                }
                confirmText={editMode ? '保存する' : '登録する'}
                cancelText="キャンセル"
                confirmButtonClass="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]"
                isLoading={isSubmitting}
                loadingText={editMode ? '保存中...' : '登録中...'}
            />
            
            {/* Product Selection Modal */}
            <ProductSelectionModal />
            
            <Footer />
        </>
    );
};

export default CategoryEdit;