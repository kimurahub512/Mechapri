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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-[16px] max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold">
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
                            <div className="grid grid-cols-3 gap-4 mb-6">
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
                                        <div className="flex flex-col items-center rounded-[16px] w-full h-[158px] md:h-[272px] bg-white relative">
                                            <div className="flex w-full h-full p-2 flex-col items-center justify-center rounded-[9.141px] bg-[#F6F6F6]">
                                                {product.files && product.files.length > 0 ? (
                                                    <img 
                                                        src={product.files[0].url} 
                                                        alt={product.title}
                                                        className="w-full h-full max-w-[120px] max-h-[120px] md:max-w-[200px] md:max-h-[200px] object-cover rounded-[8px]"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full max-w-[120px] max-h-[120px] md:max-w-[200px] md:max-h-[200px] bg-[#E9E9E9] rounded-[8px] flex items-center justify-center">
                                                        <span className="text-[#ACACAC] text-xs md:text-sm">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px] truncate w-full text-center px-2 mt-2">
                                                {product.title}
                                            </span>
                                            
                                            {isProductSelected(product.id) && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-[#FF2AA1] rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-[#ACACAC]">
                                商品がありません
                            </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                            <div className="text-[#363636] font-['Noto_Sans_JP'] text-sm">
                                選択済み: {selectedProducts.length}件
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowProductSelection(false)}
                                    className="px-6 py-2 border border-[#E9E9E9] rounded-[8px] text-[#363636] hover:bg-[#F6F6F6]"
                                >
                                    キャンセル
                                </button>
                                <button 
                                    onClick={() => setShowProductSelection(false)}
                                    className="px-6 py-2 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] text-white rounded-[8px] hover:opacity-90"
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
                <div className="block md:hidden px-[16px] mt-[160px] flex flex-col items-start gap-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">
                            {editMode ? '商品カテゴリ編集' : '商品カテゴリ作成'}
                        </h1>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="error-message w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-800 font-['Noto_Sans_JP']">{error}</span>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-col items-start px-[16px] py-[20px] gap-4 rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        {/* Category Name */}
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">カテゴリ名</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">{titleCount}/200</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                    placeholder="カテゴリ名を入力してください" 
                                />
                            </div>
                        </div>

                        {/* Category Description */}
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">カテゴリ説明文</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">{descriptionCount}/200</span>
                                </div>
                                <textarea 
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="w-full min-h-[128px] p-[12.5px_12px_12.5px_12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-[25px] resize-none" 
                                    placeholder="カテゴリの説明文を入力してください" 
                                />
                            </div>
                        </div>
                        
                        {/* Public Settings */}
                        <div className="flex flex-col items-start gap-[20px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px] w-full border-b border-[#E9E9E9]">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">公開設定</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">いずれかを選択</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start cursor-pointer" onClick={() => setIsPublic(true)}>
                                    <img src={radio} alt="radio" className={`w-[20px] h-[20px] mr-[10px] ${isPublic ? '' : 'opacity-50'}`} />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-['Noto_Sans_JP']">公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px] ml-[30px]">誰でも商品ページを見ることができます</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start flex-shrink-0 cursor-pointer" onClick={() => setIsPublic(false)}>
                                    <span className={`flex w-[20px] h-[20px] flex-shrink-0 rounded-full border mr-[10px] ${isPublic ? 'border-[#D1D1D1] bg-[#F8F8F8]' : 'border-[#FF2AA1] bg-[#FF2AA1]'}`} />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-['Noto_Sans_JP'] whitespace-nowrap">非公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px] ml-[30px]">自分だけが商品ページを見ることができます</span>
                            </div>
                        </div>
                        
                        {/* Products Section */}
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[12px] pb-[6px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px]">商品</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">いずれかを選択</span>
                            </div>
                            
                            <div className="flex items-start p-[7px_14px_8px_11px] w-full rounded-[2px] border-[2px] border-dashed border-[#ACACAC] bg-[#F1F3F4]">
                                <div className="grid grid-cols-3 gap-[6.2px] w-full">
                                    {/* Add card */}
                                    <div 
                                        className="flex w-[91px] h-[105px] pb-[14px] flex-col items-center rounded-[6.2px] border-[0.388px] border-[#ACACAC] bg-[#F6F6F6] cursor-pointer hover:bg-[#E9E9E9] transition-colors"
                                        onClick={() => setShowProductSelection(true)}
                                    >
                                        <div className="flex w-[91px] h-[91px] justify-center items-center aspect-square rounded-[6.2px]">
                                            <div className="flex w-[64px] flex-col items-center justify-center gap-[3px]">
                                                <div className="flex w-[19px] h-[19px] justify-center items-center">
                                                    <img src={add} alt="add" className="w-[19px] h-[19px]" />
                                                </div>
                                                <div className="flex flex-col items-center gap-[1px] self-stretch">
                                                    <span className="text-[#586B88] text-center font-noto text-[7px] font-bold leading-[9px]">カテゴリに</span>
                                                    <span className="text-[#586B88] text-center font-noto text-[7px] font-bold leading-[9px]">商品を追加</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Selected products */}
                                    {selectedProducts.map((product) => (
                                        <div key={product.id} className="flex flex-col items-center rounded-[6.2px] w-[91px] h-[105px] bg-white relative">
                                            <div className="flex w-[91px] p-[2px_16px_2px_17px] flex-col items-center rounded-[3.54px] bg-[#F6F6F6]">
                                                {product.files && product.files.length > 0 ? (
                                                    <img src={product.files[0].url} alt={product.title} className="w-[58px] h-[87px] object-cover rounded-[3px]" />
                                                ) : (
                                                    <div className="w-[58px] h-[58px] bg-[#E9E9E9] rounded-[3px] flex items-center justify-center">
                                                        <span className="text-[#ACACAC] text-xs">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[6px] font-normal leading-[12px] truncate w-full text-center px-1">
                                                {product.title}
                                            </span>
                                            <div 
                                                className="absolute top-[3px] right-[4px] cursor-pointer"
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <img src={close} alt="close" className="w-[12px] h-[12px]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-row items-start gap-[16px] w-full">
                                <div className="flex flex-row items-center gap-[6px]">
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">選択済み商品</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">{selectedProducts.length}件</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex flex-col items-center gap-[10px] pt-[32px] w-full">
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex w-full py-[15px] flex-col justify-center items-center rounded-[8px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-white text-center font-noto text-[18px] font-bold leading-[14px]">
                                    {isSubmitting ? (editMode ? '保存中...' : '登録中...') : (editMode ? '保存' : '登録する')}
                                </span>
                            </button>
                            <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[18px]">
                                ※ 登録後は商品ファイルの変更はできません。
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* DESKTOP VERSION */}
                <main className="hidden md:flex flex-col items-left gap-[22px] max-w-[928px] py-[40px] px-[15px] w-full ml-[109px] mr-[169px]">
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[36px] font-bold leading-[54px]">
                            {editMode ? '商品カテゴリ編集' : '商品カテゴリ作成'}
                        </h1>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="error-message w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-800 font-['Noto_Sans_JP']">{error}</span>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-col items-start py-[32px] px-[24px] gap-4 rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        {/* Category Name */}
                        <div className="flex flex-col items-start pt-[13.44px] gap-[7.2px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">カテゴリ名</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">{titleCount}/200</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                    placeholder="カテゴリ名を入力してください" 
                                />
                            </div>
                        </div>

                        {/* Category Description */}
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px]">
                                    <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">カテゴリ説明文</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">{descriptionCount}/200</span>
                                </div>
                                <textarea 
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="w-full min-h-[90px] p-[12.5px_12px_12.5px_12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-[25px] resize-none" 
                                    placeholder="カテゴリの説明文を入力してください" 
                                />
                            </div>
                        </div>
                        
                        {/* Public Settings */}
                        <div className="flex flex-col items-start gap-[20px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px] w-full border-b border-[#E9E9E9]">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">公開設定</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">いずれかを選択</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex pb-[8px] items-start cursor-pointer" onClick={() => setIsPublic(true)}>
                                    <img src={radio} alt="radio" className={`w-[20px] h-[20px] mr-[10px] ${isPublic ? '' : 'opacity-50'}`} />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-['Noto_Sans_JP']">公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px]">誰でも商品ページを見ることができます</span>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start flex-shrink-0 cursor-pointer" onClick={() => setIsPublic(false)}>
                                    <span className={`flex w-[20px] h-[20px] flex-shrink-0 rounded-full border mr-[10px] ${isPublic ? 'border-[#D1D1D1] bg-[#F8F8F8]' : 'border-[#FF2AA1] bg-[#FF2AA1]'}`} />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-['Noto_Sans_JP'] whitespace-nowrap">非公開</span>
                                </div>
                                <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[13px] font-medium leading-[19.5px]">自分だけが商品ページを見ることができます</span>
                            </div>
                        </div>
                        
                        {/* Products Section */}
                        <div className="flex flex-col items-start gap-[10px] w-full">
                            <div className="flex flex-row items-start gap-[12px] pt-[25px] pb-[6px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px]">商品</span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">いずれかを選択</span>
                            </div>
                            
                            <div className="flex items-start p-[19.12px_38px_20.88px_30px] w-full rounded-[2px] border-[2px] border-dashed border-[#ACACAC] bg-[#F1F3F4]">
                                <div className="grid grid-cols-3 gap-[16px] w-full">
                                    {/* Add card */}
                                    <div 
                                        className="flex w-[234px] h-[272px] pb-[38px] flex-col items-center rounded-[16px] border border-[#ACACAC] bg-[#F6F6F6] cursor-pointer hover:bg-[#E9E9E9] transition-colors"
                                        onClick={() => setShowProductSelection(true)}
                                    >
                                        <div className="flex w-[234px] h-[234px] justify-center items-center aspect-square rounded-[16px]">
                                            <div className="flex w-[165.742px] flex-col items-center gap-[7.655px]">
                                                <div className="flex w-[48px] h-[48px] justify-center items-center">
                                                    <img src={add} alt="add" className="w-[48px] h-[48px]" />
                                                </div>
                                                <div className="flex flex-col items-center gap-[2px] self-stretch">
                                                    <span className="text-[#586B88] text-center font-noto text-[18px] font-bold leading-[22.966px]">カテゴリに</span>
                                                    <span className="text-[#586B88] text-center font-noto text-[18px] font-bold leading-[22.966px]">商品を追加</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Selected products */}
                                    {selectedProducts.map((product) => (
                                        <div key={product.id} className="flex flex-col items-center rounded-[16px] w-[234px] h-[272px] bg-white relative">
                                            <div className="flex w-[234px] h-[234px] p-2 flex-col items-center justify-center rounded-[9.141px] bg-[#F6F6F6]">
                                                {product.files && product.files.length > 0 ? (
                                                    <img src={product.files[0].url} alt={product.title} className="w-full h-full max-w-[200px] max-h-[200px] object-cover rounded-[8px]" />
                                                ) : (
                                                    <div className="w-full h-full max-w-[200px] max-h-[200px] bg-[#E9E9E9] rounded-[8px] flex items-center justify-center">
                                                        <span className="text-[#ACACAC] text-sm">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px] truncate w-full text-center px-2">
                                                {product.description}
                                            </span>
                                            <div 
                                                className="absolute top-2 right-2 cursor-pointer"
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <img src={close} alt="close" className="w-[32px] h-[32px]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex flex-row items-start gap-[16px] w-full">
                                <div className="flex flex-row items-center gap-[6px]">
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">選択済み商品</span>
                                    <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[16px] font-normal leading-[24px]">{selectedProducts.length}件</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex flex-col items-center gap-[10px] pt-[32px] w-full">
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex w-full py-[15px] flex-col justify-center items-center rounded-[8px] shadow-[0px_4px_8px_0px_rgba(255, 42, 161, 0.20)] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-white text-center font-noto text-[18px] font-bold leading-[14px]">
                                    {isSubmitting ? (editMode ? '保存中...' : '登録中...') : (editMode ? '保存' : '登録する')}
                                </span>
                            </button>
                            <span className="text-[#87969F] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[18px]">
                                ※ 登録後は商品ファイルの変更はできません。
                            </span>
                        </div>
                    </div>
                </main>
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