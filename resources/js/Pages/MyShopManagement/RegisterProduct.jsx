import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import mountain_down from '@/assets/images/mountain_down.svg';
import radio from '@/assets/images/beginner_radio.svg';
import question from '@/assets/images/question.svg';
import bubble from '@/assets/images/bubble.svg';
import warning from '@/assets/images/warning.svg';
import lock from '@/assets/images/lock.svg';
import photo1 from '@/assets/images/saleshistory/photo1.png';
import photo2 from '@/assets/images/saleshistory/photo2.png';
import photo4 from '@/assets/images/saleshistory/photo4.png';
import overlay from '@/assets/images/saleshistory/overlay.png';
import photo1_m from '@/assets/images/saleshistory/photo1_m.png';
import photo2_m from '@/assets/images/saleshistory/photo2_m.png';
import photo3_m from '@/assets/images/saleshistory/photo3_m.png';
import photo4_m from '@/assets/images/saleshistory/photo4_m.png';
import overlay_m from '@/assets/images/saleshistory/overlay_m.png';
import PostRegistrationModal from '@/Components/PostRegistrationModal';
import { vw, vwd, responsiveText, responsivePosition, responsiveMetric, responsiveTextD, responsivePositionD, responsiveMetricD } from '@/lib/utils';



const RegisterProduct = () => {
    const { auth, editMode, productBatch, categories } = usePage().props;
    
    // Get category ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryIdFromUrl = urlParams.get('category');
    const [showModal, setShowModal] = useState(false);
    const [uploadedPhotos, setUploadedPhotos] = useState(() => {
        if (editMode && productBatch && productBatch.files) {
            return productBatch.files.map((file, index) => ({
                id: `existing-${file.id}`,
                file: null, // We don't have the actual file object for existing files
                url: file.url,
                name: file.filename,
                size: 0, // We don't have the actual file size
                isExisting: true,
                fileId: file.id
            }));
        }
        return [];
    });
    const [totalSize, setTotalSize] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState(null);
    const fileInputRef = useRef(null);

    // Calculate max date (180 days from today)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 180);
    const maxDateString = maxDate.toISOString().split('T')[0];

    // Form state
    const [title, setTitle] = useState(editMode && productBatch ? productBatch.title : '');
    const [description, setDescription] = useState(editMode && productBatch ? productBatch.description : '');
    const [price, setPrice] = useState(editMode && productBatch ? parseFloat(productBatch.price) : 0);
    const [salesLimit, setSalesLimit] = useState(editMode && productBatch ? (productBatch.sales_limit ? productBatch.sales_limit.toString() : '') : '');
    const [salesDeadline, setSalesDeadline] = useState(editMode && productBatch ? (productBatch.sales_deadline ? productBatch.sales_deadline : '') : maxDateString);
    const [password, setPassword] = useState(editMode && productBatch ? (productBatch.password || '') : '');

    // Radio button states
    const [isPaid, setIsPaid] = useState(editMode && productBatch ? productBatch.price > 0 : true); // true for 有料, false for 無料
    const [isUnlimited, setIsUnlimited] = useState(editMode && productBatch ? !productBatch.sales_limit : true); // true for 無制限, false for 販売数を指定
    const [displayMode, setDisplayMode] = useState(editMode && productBatch ? productBatch.display_mode : 'normal'); // 'normal', 'gacha', 'blur', 'password', 'cushion'
    const [gachaError, setGachaError] = useState(''); // Error message for gacha validation
    const [addToCategory, setAddToCategory] = useState(editMode && productBatch ? (productBatch.add_category || (productBatch.categories && productBatch.categories.length > 0)) : (categoryIdFromUrl ? true : false)); // true for 商品カテゴリに追加, false for 追加しない
    const [selectedCategories, setSelectedCategories] = useState(() => {
        if (editMode && productBatch && productBatch.categories) {
            return productBatch.categories.map(c => c.id);
        } else if (categoryIdFromUrl) {
            return [parseInt(categoryIdFromUrl)];
        }
        return [];
    }); // Array of selected category IDs
    const [printSerial, setPrintSerial] = useState(editMode && productBatch ? productBatch.sn_print : false); // true for 印字する, false for 印字しない
    const [serialFormat, setSerialFormat] = useState(editMode && productBatch ? productBatch.sn_format : 'number'); // 'number' for 発行枚数を表示, 'random' for 乱数6文字で表示
    const [isPublic, setIsPublic] = useState(editMode && productBatch ? productBatch.is_public : true); // true for 公開, false for 非公開

    const handleShowModal = () => {
        setShowModal(true);
        // Scroll to top of the page when modal opens
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToTop = () => {
        // Try multiple approaches
        try {
            // Method 1: Scroll to error element first (prioritize this)
            setTimeout(() => {
                const errorElement = document.querySelector('.error-message');
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return; // Exit early if we successfully scroll to error
                }
            }, 100);

            // Method 2: If no error element, scroll to top of page
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 200);

            // Method 3: Scroll the main container as fallback
            setTimeout(() => {
                const mainElement = document.querySelector('main');
                if (mainElement) {
                    mainElement.scrollTop = 0;
                }
            }, 300);

        } catch (error) {
            console.error('Scroll error:', error);
        }
    };

    const handleSubmit = async () => {
        // Reset error state
        setError(null);
        setIsSubmitting(true);

        try {
            // Authentication is already handled by Laravel middleware
            // Validate required fields
            if (!title.trim()) {
                setError('商品タイトルは必須です。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (uploadedPhotos.length === 0) {
                setError('最低1枚の画像をアップロードしてください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (displayMode === 'gacha' && uploadedPhotos.length < 2) {
                setError('ガチャ利用する場合は、最低2枚以上画像をアップロードしてください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (isPaid && price <= 0) {
                setError('有料商品の場合、価格を設定してください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (isPaid && (price < 100 || price > 100000)) {
                setError('価格は100円から100,000円の間で設定してください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (displayMode === 'password' && !password.trim()) {
                setError('パスワード設定を選択した場合、パスワードを入力してください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (salesDeadline) {
                const selectedDate = new Date(salesDeadline);
                const maxAllowedDate = new Date();
                maxAllowedDate.setDate(maxAllowedDate.getDate() + 180);
                
                if (selectedDate > maxAllowedDate) {
                    setError('印刷期限は180日以内に設定してください。');
                    setTimeout(() => scrollToTop(), 100);
                    setIsSubmitting(false);
                    return;
                }
            }

            if (printSerial && !serialFormat) {
                setError('シリアル番号印字を選択した場合、印字形式を選択してください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            if (!isUnlimited && salesLimit && (parseInt(salesLimit) < 1 || parseInt(salesLimit) > 999999)) {
                setError('販売数は1から999,999の間で設定してください。');
                setTimeout(() => scrollToTop(), 100);
                setIsSubmitting(false);
                return;
            }

            // Prepare form data
            const formData = new FormData();

            // Add form fields
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image_cnt', uploadedPhotos.length.toString());
            formData.append('price', isPaid ? price.toString() : '0');
            formData.append('display_mode', displayMode);
            formData.append('add_category', addToCategory ? '1' : '0');
            if (addToCategory && selectedCategories.length > 0) {
                formData.append('category_ids', JSON.stringify(selectedCategories));
            }
            formData.append('sn_print', printSerial ? '1' : '0');
            formData.append('sn_format', serialFormat);
            formData.append('is_public', isPublic ? '1' : '0');

            // Add optional fields
            if (salesDeadline) {
                formData.append('sales_deadline', salesDeadline);
            }

            if (!isUnlimited && salesLimit) {
                formData.append('sales_limit', salesLimit);
            }

            if (password) {
                formData.append('password', password);
            }

            // Add files - only new files, not existing ones
            const newFiles = uploadedPhotos.filter(photo => !photo.isExisting);
            newFiles.forEach((photo, index) => {
                formData.append(`files[${index}]`, photo.file);
            });

            // Add existing file IDs to keep
            const existingFiles = uploadedPhotos.filter(photo => photo.isExisting);
            existingFiles.forEach((photo, index) => {
                formData.append(`existing_files[${index}]`, photo.fileId);
            });

            // Submit to backend
            const url = editMode ? `/api/product-batches/${productBatch.id}` : '/api/product-batches';
            const method = editMode ? 'PUT' : 'POST';

            let requestBody;
            let headers = {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json',
            };

            if (editMode) {
                // For edit mode, send as JSON (without files for now)
                const jsonData = {
                    title: title,
                    description: description,
                    image_cnt: uploadedPhotos.length,
                    price: isPaid ? price : 0,
                    display_mode: displayMode,
                    add_category: addToCategory ? '1' : '0',
                    category_ids: addToCategory && selectedCategories.length > 0 ? selectedCategories : [],
                    sn_print: printSerial ? '1' : '0',
                    sn_format: serialFormat,
                    is_public: isPublic ? '1' : '0',
                    existing_files: uploadedPhotos.filter(photo => photo.isExisting).map(photo => photo.fileId),
                };

                // Add optional fields
                if (salesDeadline) {
                    jsonData.sales_deadline = salesDeadline;
                }
                if (!isUnlimited && salesLimit) {
                    jsonData.sales_limit = salesLimit;
                }
                if (password) {
                    jsonData.password = password;
                }

                requestBody = JSON.stringify(jsonData);
                headers['Content-Type'] = 'application/json';
            } else {
                // For create mode, use FormData (with files)
                requestBody = formData;
            }

            const response = await fetch(url, {
                method: method,
                headers: headers,
                credentials: 'same-origin',
                body: requestBody
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');

            if (!contentType || !contentType.includes('application/json')) {
                // Try to get the response text to see what we're actually getting
                const responseText = await response.text();
                console.error('Non-JSON response:', responseText);
                throw new Error(`Expected JSON response but got ${contentType}. Response: ${responseText.substring(0, 200)}`);
            }

            const result = await response.json();

            if (result.success) {
                if (editMode) {
                    // Redirect to ProductDetailsFree after successful edit
                    router.visit(`/product/${productBatch.id}/details`);
                } else {
                    // Store the product data for the modal (only for new products)
                    const productData = result.data;
                    setProductData(productData);

                    // Scroll to top using the same method as validation errors
                    try {
                        // Method 1: Scroll to top of page
                        setTimeout(() => {
                            window.scrollTo(0, 0);
                        }, 100);

                        // Method 2: Scroll the main container as fallback
                        setTimeout(() => {
                            const mainElement = document.querySelector('main');
                            if (mainElement) {
                                mainElement.scrollTop = 0;
                            }
                        }, 200);

                        // Show modal after scroll completes
                        setTimeout(() => {
                            setShowModal(true);
                        }, 400);
                    } catch (error) {
                        console.error('Scroll error:', error);
                        // Show modal even if scroll fails
                        setShowModal(true);
                    }
                    // Reset form
                    setTitle('');
                    setDescription('');
                    setPrice(0);
                    setSalesLimit('');
                    setSalesDeadline(maxDateString);
                    setPassword('');
                    setUploadedPhotos([]);
                    setTotalSize(0);
                    setIsPaid(true);
                    setIsUnlimited(true);
                    setDisplayMode('normal');
                                                        setAddToCategory(false);
                                    setSelectedCategories([]);  // Reset selected categories
                                    setPrintSerial(true);
                                    setSerialFormat('number');
                                    setIsPublic(true);
                }
            } else {
                // Handle validation errors
                if (response.status === 422 && result.errors) {
                    const errorMessages = Object.values(result.errors).flat();
                    setError(errorMessages.join(', '));
                } else {
                    setError(result.message || (editMode ? '商品の更新に失敗しました。' : '商品の登録に失敗しました。'));
                }
                // Scroll to top to show error message with a slight delay to ensure state is updated
                setTimeout(() => {
                    scrollToTop();
                }, 100);
            }
        } catch (error) {
            console.error('Submission error:', error);

            // If it's a fetch error, try to get the response text
            if (error.message && error.message.includes('Expected JSON response')) {
                setError('サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。');
            } else {
                setError('ネットワークエラーが発生しました。しばらく時間をおいて再度お試しください。');
            }
            // Scroll to top to show error message with a slight delay to ensure state is updated
            setTimeout(() => {
                scrollToTop();
            }, 100);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);

        // Check if adding these files would exceed the limit
        if (uploadedPhotos.length + files.length > 10) {
            alert('最大10枚までアップロードできます。');
            return;
        }

        // Check file types and sizes
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(file.type);
            const isValidSize = file.size <= 25 * 1024 * 1024; // 25MB limit
            const newTotalSize = totalSize + file.size;

            if (!isValidType) {
                alert(`${file.name}は対応していないファイル形式です。`);
                return false;
            }

            if (!isValidSize) {
                alert(`${file.name}は25MBを超えています。`);
                return false;
            }

            if (newTotalSize > 25 * 1024 * 1024) {
                alert('合計容量が25MBを超えます。');
                return false;
            }

            return true;
        });

        // Create preview URLs and add to state
        const newPhotos = validFiles.map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            preview: URL.createObjectURL(file),
            size: file.size
        }));

        setUploadedPhotos(prev => [...prev, ...newPhotos]);
        setTotalSize(prev => prev + validFiles.reduce((sum, file) => sum + file.size, 0));
        
        // Clear gacha error if user now has 2 or more photos
        if (uploadedPhotos.length + validFiles.length >= 2) {
            setGachaError('');
        }
        
        // Reset the file input value to allow selecting the same file again
        if (e.target) {
            e.target.value = '';
        }
    };

    const handleUploadClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (editMode) {
            return; // Disable file upload in edit mode
        }
        if (uploadedPhotos.length < 10) {
            fileInputRef.current?.click();
        }
    };

    const removePhoto = (photoId) => {
        if (editMode) {
            return; // Disable photo removal in edit mode
        }
        setUploadedPhotos(prev => {
            const photoToRemove = prev.find(photo => photo.id === photoId);
            if (photoToRemove) {
                setTotalSize(prevSize => prevSize - photoToRemove.size);
                // Only revoke URL if it's a new file (not existing)
                if (photoToRemove.preview && !photoToRemove.isExisting) {
                    URL.revokeObjectURL(photoToRemove.preview);
                }
            }
            const newPhotos = prev.filter(photo => photo.id !== photoId);
            
            // Set gacha error if user now has less than 2 photos and gacha is selected
            if (newPhotos.length < 2 && displayMode === 'gacha') {
                setGachaError('ガチャ利用する場合は、最低2枚以上画像をアップロードしてください。');
            }
            
            return newPhotos;
        });
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const isCategorySelected = (categoryId) => {
        return selectedCategories.includes(categoryId);
    };

    const handleDisplayModeChange = (mode) => {
        if (mode === 'gacha' && uploadedPhotos.length < 2) {
            setGachaError('ガチャ利用する場合は、最低2枚以上画像をアップロードしてください。');
            return; // Don't change the display mode
        }
        setGachaError(''); // Clear error for any display mode change
        setDisplayMode(mode);
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
                {/* Desktop Main Section */}
                <main className="hidden md:flex flex-col min-w-[640px] max-w-[880px] items-start" style={{ ...responsiveMetricD(880), gap: vwd(22), padding: vwd(40), paddingLeft: vwd(15), paddingRight: vwd(15), marginLeft: vwd(130), paddingTop: vwd(140) }}>
                    {/* Title */}
                    <h1 className="text-left" style={{ ...responsiveTextD(36, 54, null, 'bold', 'noto', '#363636') }}>{editMode ? '商品編集' : '商品登録'}</h1>
                    {/* Error Message */}
                    {error && (
                        <div className="error-message w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}
                    {/* Frame 1 */}
                    <section className="flex flex-col w-full max-w-[880px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] items-start" style={{ gap: vwd(10), paddingTop: vwd(32), paddingBottom: vwd(49), paddingLeft: vwd(24), paddingRight: vwd(24), borderRadius: vwd(16) }}>
                        {/* Image Section (Frame 11) */}
                        <div
                            className="flex justify-end items-center self-stretch rounded-[2px] border-2 border-dashed border-[#ACACAC] bg-[#F1F3F4] w-full"
                            style={{
                                paddingTop: uploadedPhotos.length === 0 ? vwd(64) : vwd(20),
                                paddingBottom: uploadedPhotos.length === 0 ? vwd(40) : vwd(20),
                                paddingLeft: uploadedPhotos.length === 0 ? vwd(316) : vwd(16),
                                paddingRight: uploadedPhotos.length === 0 ? vwd(300) : vwd(16)
                            }}
                        >
                            {/* Image Area 111 */}
                            {uploadedPhotos.length === 0 ? (
                                /* Upload Area - Show when no photos uploaded */
                                <div
                                    className="flex flex-col justify-center items-center text-center w-full cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={handleUploadClick}
                                    style={{ width: vwd(802) }}
                                >
                                    {/* mountain_down SVG */}
                                    <div className="flex flex-col items-center mx-auto" style={{ width: vwd(56), height: vwd(36), maxWidth: vwd(792), paddingBottom: vwd(6) }}>
                                        <img src={mountain_down} alt="upload" style={{ width: vwd(56), height: vwd(36) }} />
                                    </div>
                                    {/* Frame 1121 */}
                                    <div className="flex flex-col items-center w-full" style={{ gap: vwd(4) }}>
                                        <span className="text-center w-full" style={{ ...responsiveTextD(16, 12, null, 'bold', 'noto', '#ACACAC') }}>ファイルを選択</span>
                                        <span className="text-center w-full" style={{ ...responsiveTextD(12, 12, null, 'medium', 'noto', '#ACACAC') }}>サイズ:6000px*6000px以内</span>
                                        {/* Frame 11211 */}
                                        <div className="flex flex-row items-center w-full justify-center" style={{ gap: vwd(8) }}>
                                            <span className="text-center whitespace-nowrap" style={{ ...responsiveTextD(12, 12, null, 'medium', 'noto', '#ACACAC') }}>対応フォーマット:</span>
                                            <span className="flex items-center justify-center rounded-[4px] bg-white text-center ml-[2px]" style={{ width: vwd(26), height: vwd(16), paddingLeft: vwd(2), paddingRight: vwd(2), ...responsiveTextD(9, 10, null, 'normal', 'noto', '#87969F') }}>JPG</span>
                                            <span className="flex items-center justify-center rounded-[4px] bg-white text-center ml-[2px]" style={{ width: vwd(26), height: vwd(16), paddingLeft: vwd(2), paddingRight: vwd(2), ...responsiveTextD(9, 10, null, 'normal', 'noto', '#87969F') }}>PNG</span>
                                            <span className="flex items-center justify-center rounded-[4px] bg-white text-center ml-[2px]" style={{ width: vwd(26), height: vwd(16), paddingLeft: vwd(2), paddingRight: vwd(2), ...responsiveTextD(9, 10, null, 'normal', 'noto', '#87969F') }}>PDF</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Photo Grid - Show when photos are uploaded */
                                <div className="w-full">
                                    <div className="grid grid-cols-5 w-full" style={{ gap: vwd(16) }}>
                                        {uploadedPhotos.map((photo, index) => (
                                            <div key={photo.id} className="relative group">
                                                <img
                                                    src={photo.isExisting ? photo.url : photo.preview}
                                                    alt={`Photo ${index + 1}`}
                                                    className="object-cover rounded-lg"
                                                    style={{ ...responsiveMetricD(128, 128) }}
                                                />
                                                <button
                                                    onClick={() => removePhoto(photo.id)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                                    style={{ width: vwd(24), height: vwd(24) }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        {/* Add more button - show if less than 10 photos */}
                                        {uploadedPhotos.length < 10 && !editMode && (
                                            <div
                                                className="border-2 border-dashed border-gray-300 bg-white rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                                                onClick={handleUploadClick}
                                                style={{ ...responsiveMetricD(128, 128) }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-gray-400 mb-2" style={{ ...responsiveTextD(24, 24) }}>+</div>
                                                    <div className="text-gray-500" style={{ ...responsiveTextD(14, 14) }}>追加</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*,.pdf"
                            multiple
                            className="hidden"
                            value=""
                        />
                        {/* Frame 12 */}
                        <div className="flex flex-col items-start self-stretch w-full">
                            {/* Frame 121 */}
                            <div className="flex items-start self-stretch" style={{ gap: vwd(16) }}>
                                <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>ファイル数 &nbsp;{uploadedPhotos.length}/10</span>
                                <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>容量25MBまで &nbsp;{(totalSize / (1024 * 1024)).toFixed(1)}/25</span>
                            </div>
                            {/* Frame 122 */}
                            <div className="flex flex-col items-start self-stretch w-full" style={{ gap: vwd(4) }}>
                                {/* Frame 1221 */}
                                <div className="flex items-center self-stretch" style={{ gap: vwd(12), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>タイトル</span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>{(title || '').length}/30</span>
                                </div>
                                {/* Frame 1222 */}
                                <div className="flex flex-col items-start self-stretch w-full">
                                    <input
                                        type="text"
                                        className="border border-[#E9E9E9] bg-white focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                        placeholder="商品のタイトル"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={30}
                                        style={{ ...responsiveMetricD('full', 48), paddingLeft: vwd(11), paddingRight: vwd(11), paddingTop: vwd(1), paddingBottom: vwd(1), borderRadius: vwd(10), ...responsiveTextD(16, 16, null, 'medium', 'noto') }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Frame 123 */}
                        <div className="flex flex-col items-start self-stretch w-full" style={{ gap: vwd(7.2), paddingTop: vwd(13.44) }}>
                            {/* Frame 1231 */}
                            <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(4) }}>
                                {/* Frame 12311 */}
                                <div className="flex items-center self-stretch" style={{ height: vwd(58), gap: vwd(12) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>説明文</span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>{(description || '').length}/200</span>
                                </div>
                                {/* Frame 12312 */}
                                <div className="flex flex-col items-start self-stretch w-full" style={{ paddingBottom: vwd(12.85) }}>
                                    {/* Frame 123121 */}
                                    <div className="flex flex-col items-start" style={{ ...responsiveMetricD('full', 90) }}>
                                        <textarea
                                            className="flex min-h-[90px] w-full bg-white border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 resize-none placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                            placeholder="商品の説明文"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={200}
                                            style={{ ...responsiveMetricD('full', 90), paddingTop: vwd(10.37), paddingRight: vwd(11.99), paddingBottom: vwd(53.21), paddingLeft: vwd(11.99), borderRadius: vwd(5.71), ...responsiveTextD(14, 14, null, 'normal', 'noto') }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Frame 1232 */}
                            <div className="flex flex-col items-start self-stretch w-full" style={{ gap: vwd(4) }}>
                                {/* Frame 12321 */}
                                <div className="flex items-center self-stretch" style={{ gap: vwd(12), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>印刷期限</span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>最大180日後まで</span>
                                </div>
                                {/* Frame 12322 */}
                                <div className="flex flex-col items-start self-stretch w-full" style={{ paddingBottom: vwd(8) }}>
                                    <input
                                        type="date"
                                        className="flex bg-white border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                        placeholder="2025/11/24"
                                        value={salesDeadline}
                                        onChange={(e) => setSalesDeadline(e.target.value)}
                                                                                                min={new Date().toISOString().split('T')[0]}
                                                        max={maxDateString}
                                                        style={{ ...responsiveMetricD('full', 45.99), paddingLeft: vwd(12.5), paddingRight: vwd(11.99), paddingTop: vwd(12.49), paddingBottom: vwd(11.99), borderRadius: vwd(5.71), ...responsiveTextD(14, 14, null, 'normal', 'noto') }}
                                        disabled={editMode}
                                    />
                                </div>
                            </div>
                            {/* Frame 1233 */}
                            <div className="flex flex-col items-start self-stretch" style={{ ...responsiveMetricD('full', 404) }}>
                                {/* Frame 12331 */}
                                <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ gap: vwd(12), paddingTop: vwd(25), paddingBottom: vwd(6), marginBottom: vwd(21) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>販売価格</span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>いずれかを選択</span>
                                </div>
                                {/* Frame 12332: Radio + 有料 */}
                                <div className={`flex items-center justify-center ${editMode ? 'cursor-not-allowed' : 'cursor-pointer'}`} style={{ gap: vwd(10), paddingBottom: vwd(8), opacity: editMode ? 0.5 : 1 }} onClick={editMode ? undefined : () => setIsPaid(true)}>
                                    {isPaid ? (
                                        <img src={radio} alt="radio" style={{ width: vwd(20), height: vwd(20) }} />
                                    ) : (
                                        <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ width: vwd(20), height: vwd(20) }} />
                                    )}
                                    <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>有料</span>
                                </div>
                                {/* Frame 12333: Price input + note */}
                                <div className="inline-flex items-center" style={{ paddingLeft: vwd(30), marginBottom: vwd(21), opacity: isPaid ? 1 : 0.5 }}>
                                    <input
                                        type="number"
                                        className="flex h-[48px] w-[159px] pr-[5px] text-right rounded-[5.71px] border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                        placeholder="100"
                                        value={price > 0 ? price : ''}
                                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                                        onWheel={(e) => e.target.blur()}
                                        min="100"
                                        max="100000"
                                        style={{ ...responsiveMetricD(159, 48), paddingRight: vwd(5) }}
                                        disabled={!isPaid || editMode}
                                    />
                                    <span style={{ ...responsiveTextD(14, 25.2, null, 'medium', 'noto', '#363636'), marginLeft: vwd(8) }}>円</span>
                                    <span className="whitespace-nowrap" style={{ ...responsiveTextD(17, 20, null, 'normal', 'noto', '#87969F'), marginLeft: vwd(18) }}>100~100000円まで</span>
                                </div>
                                {/* Frame 12334: 販売数 */}
                                <div className="flex items-start" style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636'), paddingLeft: vwd(30), marginBottom: vwd(21), opacity: isPaid ? 1 : 0.5 }}>
                                    販売数
                                </div>
                                {/* Frame 12335: Circle + 無制限 */}
                                <div className="flex items-start" style={{ paddingLeft: vwd(30), paddingRight: vwd(718), marginBottom: vwd(21), opacity: isPaid ? 1 : 0.5, cursor: isPaid && !editMode ? 'pointer' : 'not-allowed' }} onClick={isPaid && !editMode ? () => setIsUnlimited(true) : undefined}>
                                    {isUnlimited ? (
                                        <img src={radio} alt="radio" style={{ width: vwd(20), height: vwd(20), marginRight: vwd(10) }} />
                                    ) : (
                                        <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20), marginRight: vwd(10) }} />
                                    )}
                                    <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636'), whiteSpace: 'nowrap' }}>無制限</span>
                                </div>
                                {/* Frame 12336: Radio + 販売数を指定 */}
                                <div className="flex items-start" style={{ paddingLeft: vwd(30), paddingRight: vwd(664), marginBottom: vwd(21), opacity: isPaid ? 1 : 0.5, cursor: isPaid && !editMode ? 'pointer' : 'not-allowed' }} onClick={isPaid && !editMode ? () => setIsUnlimited(false) : undefined}>
                                    {!isUnlimited ? (
                                        <img src={radio} alt="radio" style={{ width: vwd(20), height: vwd(20), marginRight: vwd(10) }} />
                                    ) : (
                                        <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ width: vwd(20), height: vwd(20), marginRight: vwd(10) }} />
                                    )}
                                    <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636'), whiteSpace: 'nowrap' }}>販売数を指定</span>
                                </div>
                                {/* Frame 12337: Input for sales count */}
                                <div className="flex items-center flex-shrink-0" style={{ paddingLeft: vwd(30), marginBottom: vwd(21), opacity: isPaid ? 1 : 0.5 }}>
                                    <input
                                        type="number"
                                        className="flex text-right rounded-[5.71px] border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                        placeholder="1"
                                        value={salesLimit > 0 ? salesLimit : ''}
                                        onChange={(e) => setSalesLimit(e.target.value)}
                                        onWheel={(e) => e.target.blur()}
                                        min="1"
                                        max="999999"
                                        style={{ ...responsiveMetricD(159, 48), paddingRight: vwd(5), ...responsiveTextD(20, 20, null, 'normal', 'noto') }}
                                        disabled={!isPaid || isUnlimited || editMode}
                                    />
                                    <span className="whitespace-nowrap" style={{ ...responsiveTextD(17, 20, null, 'normal', 'noto', '#87969F'), marginLeft: vwd(18) }}>1~999999まで</span>
                                </div>
                                {/* Frame 12338: Circle + 無料 */}
                                <div className={`flex items-start ${editMode ? 'cursor-not-allowed' : 'cursor-pointer'}`} style={{ paddingBottom: vwd(8), marginBottom: vwd(21), opacity: editMode ? 0.5 : 1 }} onClick={editMode ? undefined : () => setIsPaid(false)}>
                                    {!isPaid ? (
                                        <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20), marginRight: vwd(10) }} />
                                    ) : (
                                        <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20), marginRight: vwd(10) }} />
                                    )}
                                    <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636'), whiteSpace: 'nowrap' }}>無料</span>
                                </div>
                            </div>
                        </div>
                        {/* Frame 1234 */}
                        <div className="flex flex-col items-start self-stretch w-full" style={{ paddingTop: vwd(12.81), gap: vwd(4) }}>
                            {/* Frame 12341 */}
                            <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ paddingTop: vwd(25), paddingBottom: vwd(6), gap: vwd(12), marginBottom: vwd(12) }}>
                                <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>表示設定</span>
                                <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>どれか１つを選択</span>
                            </div>
                            {/* Frame 12342 */}
                            <div className="flex flex-col items-start w-full self-stretch">
                                {/* 123421: 3 photo options, aligned */}
                                <div className="flex flex-row justify-center items-start w-full" style={{ gap: vwd(14) }}>
                                    {/* 1234211: 設定しない */}
                                    <div className={`flex flex-col items-start ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vwd(5), ...responsiveMetricD(258, 250) }} onClick={editMode ? undefined : () => handleDisplayModeChange('normal')}>
                                        <img src={photo1} alt="設定しない" className="object-cover" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12) }} />
                                        <div className="flex items-center w-full" style={{ gap: vwd(10) }}>
                                            {displayMode === 'normal' ? (
                                                <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                            ) : (
                                                <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                            )}
                                            <span style={{ ...responsiveTextD(14, 22, null, 'normal', 'noto', '#363636') }}>設定しない</span>
                                        </div>
                                    </div>
                                    {/* 1234212: ガチャ */}
                                    <div className={`flex flex-col items-start ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vwd(5), ...responsiveMetricD(258, 250) }} onClick={editMode ? undefined : () => handleDisplayModeChange('gacha')}>
                                        <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12), backgroundColor: '#A0A5AC' }}>
                                            <img src={photo1} alt="ガチャ" className="object-cover filter blur-[4px]" style={{ ...responsiveMetricD(256, 106), borderRadius: vwd(4) }} />
                                            <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px]" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12) }} />
                                            <div className="flex" style={{ ...responsiveMetricD(258, 107), borderRadius: vwd(11), ...responsivePositionD(-0.5), border: vwd(4), borderColor: '#D741EB', borderStyle: 'solid' }} />
                                            <div className="flex flex-col items-center" style={{ ...responsivePositionD(21, 85) }}>
                                                <img src={bubble} alt="bubble" style={{ ...responsiveMetricD(36, 36), marginBottom: vwd(5) }} />
                                                <span style={{ ...responsiveTextD(10, 13, null, 'black', 'noto', '#FFF') }}>ガチャ</span>
                                                <span style={{ ...responsiveTextD(7.3, 11, null, 'normal', 'noto', '#FFF') }}>ランダムで1枚選定されます</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full" style={{ gap: vwd(10) }}>
                                            {displayMode === 'gacha' ? (
                                                <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                            ) : (
                                                <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                            )}
                                            <span style={{ ...responsiveTextD(14, 22, null, 'normal', 'noto', '#363636') }}>ガチャ</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>複数の写真の中からランダムで1枚だけ印刷されます。アップ画像が2枚以上で選択できます。</span>
                                        </div>
                                        {gachaError && (
                                            <div className="flex flex-col items-start w-full mt-2">
                                                <span className="text-red-500" style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto') }}>{gachaError}</span>
                                            </div>
                                        )}
                                    </div>
                                    {/* 1234213: ぼかしフィルター */}
                                    <div className={`flex flex-col items-end ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vwd(5), ...responsiveMetricD(258, 250) }} onClick={editMode ? undefined : () => handleDisplayModeChange('blur')}>
                                        <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12), backgroundColor: '#A0A5AC' }}>
                                            <img src={photo1} alt="ぼかしフィルター" className="object-cover filter blur-[4px]" style={{ ...responsiveMetricD(256, 106), borderRadius: vwd(4) }} />
                                            <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px]" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12) }} />
                                            <div className="flex" style={{ ...responsiveMetricD(258, 107), borderRadius: vwd(11), ...responsivePositionD(-0.5), border: vwd(4), borderColor: '#000', borderStyle: 'solid' }} />
                                            <div className="flex flex-col items-center" style={{ ...responsivePositionD(21, 92) }}>
                                                <img src={question} alt="question" style={{ ...responsiveMetricD(36, 36), marginBottom: vwd(5) }} />
                                                <span style={{ ...responsiveTextD(10, 13, null, 'black', 'noto', '#FFF') }}>ぼかしフィルター</span>
                                                <span style={{ ...responsiveTextD(7.3, 11, null, 'normal', 'noto', '#FFF') }}>印刷して確認しよう！</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full" style={{ gap: vwd(10) }}>
                                            {displayMode === 'blur' ? (
                                                <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                            ) : (
                                                <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                            )}
                                            <span style={{ ...responsiveTextD(14, 22, null, 'normal', 'noto', '#363636') }}>ぼかしフィルター</span>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>購入するまで写真をぼかしフィルターで隠せます</span>
                                        </div>
                                    </div>
                                </div>
                                {/* 123422: 2 options, stacked below */}
                                <div className="flex flex-row justify-left items-start w-full" style={{ gap: vwd(14) }}>
                                    {/* 1234221: パスワード */}
                                    <div className={`flex flex-col items-start ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vwd(5), ...responsiveMetricD(258, 250) }} onClick={editMode ? undefined : () => handleDisplayModeChange('password')}>
                                        <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12) }}>
                                            <div className="absolute top-0 left-0 bg-[#586B88]" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12) }} />
                                            <div className="flex flex-col items-center" style={{ ...responsivePositionD(21, 92) }}>
                                                <img src={lock} alt="question" style={{ ...responsiveMetricD(36, 36), marginBottom: vwd(5) }} />
                                                <span style={{ ...responsiveTextD(10, 13, null, 'black', 'noto', '#CDD9EC') }}>パスワード</span>
                                                <span style={{ ...responsiveTextD(7.3, 11, null, 'normal', 'noto', '#CDD9EC') }}>PWを入れて印刷しよう</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full" style={{ gap: vwd(10) }}>
                                            {displayMode === 'password' ? (
                                                <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                            ) : (
                                                <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                            )}
                                            <span style={{ ...responsiveTextD(14, 22, null, 'normal', 'noto', '#363636') }}>パスワード</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>写真は非公開。パスワードを知っている人だけに公開します。</span>
                                        </div>
                                        {displayMode === 'password' && (
                                            <input
                                                type="text"
                                                className="flex h-[45.99px] w-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0"
                                                placeholder="半角英数16文字まで"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                maxLength={16}
                                                style={{ ...responsiveMetricD(258, 45.99), borderRadius: vwd(5.71), ...responsiveTextD(14, 14, null, 'normal', 'noto', '#ACACAC'), marginTop: vwd(2) }}
                                            />
                                        )}
                                    </div>
                                    {/* 1234222: ワンクッション with overlay */}
                                    <div className={`flex flex-col items-end ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vwd(5), ...responsiveMetricD(258, 250) }} onClick={editMode ? undefined : () => handleDisplayModeChange('cushion')}>
                                        <div className="flex relative items-center justify-center bg-[#A0A5AC]" style={{ ...responsiveMetricD(258, 106), borderRadius: vwd(12)}}>
                                            <div className="flex flex-col items-center">
                                                <img src={warning} alt="question" style={{ ...responsiveMetricD(36, 36), marginBottom: vwd(5) }} />
                                                <span style={{ ...responsiveTextD(10, 13, null, 'black', 'noto', '#464F5D') }}>WARNING</span>
                                                <span style={{ ...responsiveTextD(7.3, 11, null, 'normal', 'noto', '#464F5D') }}>クリックして内容を確認</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full" style={{ gap: vwd(10) }}>
                                            {displayMode === 'cushion' ? (
                                                <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                            ) : (
                                                <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                            )}
                                            <span style={{ ...responsiveTextD(14, 22, null, 'normal', 'noto', '#363636') }}>ワンクッション</span>
                                        </div>
                                        <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>閲覧注意を促しワンタップして写真を公開します。</span>
                                    </div>
                                </div>
                            </div>
                            {/* Frame 12343 */}
                            <div className="flex flex-col items-start w-full" style={{ gap: vwd(20) }}>
                                {/* Frame 123431 */}
                                <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ paddingTop: vwd(25), paddingBottom: vwd(6), gap: vwd(12) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>商品カテゴリに追加</span>
                                </div>
                                {/* Frame 123432 */}
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                                    <div className="flex items-center cursor-pointer" style={{ gap: vwd(10) }} onClick={() => setAddToCategory(false)}>
                                        {!addToCategory ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                        )}
                                        <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>追加しない</span>
                                    </div>
                                </div>
                                {/* Frame 123433 */}
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                                    {/* 1234331 */}
                                    <div className="flex items-center cursor-pointer" style={{ gap: vwd(10) }} onClick={() => setAddToCategory(true)}>
                                        {addToCategory ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                        )}
                                        <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>商品カテゴリに追加</span>
                                    </div>
                                    {/* 1234332 */}
                                    <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>複数選択可能</span>
                                </div>
                                {/* Frame 123434 */}
                                <div className="flex justify-center items-start w-full flex-wrap" style={{ gap: vwd(14) }}>
                                    {categories && categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <div
                                                key={category.id}
                                                className={`flex items-center justify-center transition-colors ${!addToCategory ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isCategorySelected(category.id) ? 'border-[#FF2AA1] bg-[#FFEFF8]' : 'border-[#E9E9E9] bg-white'}`}
                                                style={{ ...responsiveMetricD(258, 60), padding: vwd(2), borderRadius: vwd(8), border: '1px solid' }}
                                                onClick={() => addToCategory && toggleCategory(category.id)}
                                            >
                                                <span style={{ ...responsiveTextD(16, 21, null, 'normal', 'noto', isCategorySelected(category.id) ? '#FF2AA1' : '#363636') }}>{category.title}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center" style={{ ...responsiveMetricD(258, 60), padding: vwd(2), borderRadius: vwd(8), border: '1px solid #E9E9E9', backgroundColor: '#FFFFFF' }}>
                                            <span style={{ ...responsiveTextD(16, 21, null, 'normal', 'noto', '#ACACAC') }}>カテゴリがありません</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* print number option */}
                            {/* <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(20) }}>
                                <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ paddingTop: vwd(25), paddingBottom: vwd(6), gap: vwd(12) }}>
                                    <div className="flex items-center" style={{ gap: vwd(10) }}>
                                        <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>シリアル番号設定</span>
                                        <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>いずれかを選択</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                                    <div className="flex items-center cursor-pointer" style={{ gap: vwd(10) }} onClick={() => setPrintSerial(false)}>
                                        {!printSerial ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                        )}
                                        <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>印字しない</span>
                                    </div>
                                    <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>プリントする時にシリアル番号は印字されません</span>
                                </div>
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                                    <div className="flex items-center self-stretch cursor-pointer" style={{ gap: vwd(10) }} onClick={() => setPrintSerial(true)}>
                                        {printSerial ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20), margin: 0 }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20), margin: 0 }} />
                                        )}
                                        <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>印字する</span>
                                    </div>
                                    {printSerial && (
                                        <div className="flex flex-col items-start self-stretch" style={{ paddingLeft: vwd(30), gap: vwd(8) }}>
                                            <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>プリントする時にシリアル番号を印字することができます</span>
                                            <div className="flex items-center cursor-pointer" style={{ gap: vwd(15), ...responsiveMetricD(772, 24) }} onClick={() => setSerialFormat('number')}>
                                                {serialFormat === 'number' ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                                ) : (
                                                    <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>発行枚数を表示</span>
                                                <span style={{ ...responsiveTextD(17, 24, null, 'normal', 'noto', '#ACACAC') }}>例：000001,000002</span>
                                            </div>
                                            <div className="flex items-center cursor-pointer" style={{ gap: vwd(15), ...responsiveMetricD(772, 24) }} onClick={() => setSerialFormat('random')}>
                                                {serialFormat === 'random' ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                                ) : (
                                                    <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>乱数6文字で表示</span>
                                                <span style={{ ...responsiveTextD(17, 24, null, 'normal', 'noto', '#ACACAC') }}>例：736593,918482</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div> */}
                            {/* Frame 12345 */}
                            <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(20) }}>
                                {/* 123451 */}
                                <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ paddingTop: vwd(25), paddingBottom: vwd(6), gap: vwd(12) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>公開設定</span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>いずれかを選択</span>
                                </div>
                                {/* 123452 */}
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                                    {/* 1234521 */}
                                    <div className="flex items-start self-stretch cursor-pointer" style={{ gap: vwd(10) }} onClick={() => setIsPublic(true)}>
                                        {isPublic ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                        )}
                                        <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>公開</span>
                                    </div>
                                    {/* 1234522 */}
                                    <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>誰でも商品ページを見ることができます</span>
                                </div>
                                {/* 123453 */}
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vwd(8) }}>
                                    {/* 1234531 */}
                                    <div className="flex items-start self-stretch cursor-pointer" style={{ gap: vwd(10) }} onClick={() => setIsPublic(false)}>
                                        {!isPublic ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetricD(20, 20) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetricD(20, 20) }} />
                                        )}
                                        <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>非公開</span>
                                    </div>
                                    {/* 1234532 */}
                                    <span style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#87969F') }}>自分だけが商品ページを見ることができます</span>
                                </div>
                            </div>
                        </div>
                        {/* Frame 1235 */}
                        <div className="flex flex-col items-center self-stretch" style={{ gap: vwd(10), ...responsiveMetricD(802, 104.8), paddingTop: vwd(32.8) }}>
                            {/* 12351: Button */}
                            <button
                                className="flex flex-col justify-center items-center"
                                style={{ ...responsiveMetricD(802, 50), padding: vwd(15), borderRadius: vwd(8), background: 'linear-gradient(to right, #AB31D3, #FF2AA1)', boxShadow: '0 4px 8px 0 rgba(255,42,161,0.20)' }}
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <span style={{ ...responsiveTextD(18, 14, null, 'bold', 'noto', '#FFFFFF') }}>
                                    {isSubmitting ? (editMode ? '保存中...' : '登録中...') : (editMode ? '保存' : '登録する')}
                                </span>
                            </button>
                            {/* 12352: Note */}
                            <span style={{ ...responsiveTextD(12, 18, null, 'normal', 'noto', '#87969F') }}>
                                ※公開後は商品ファイルなどの変更はできません。
                            </span>
                        </div>
                    </section>
                </main>
                {/* Show modal on all screen sizes */}
                {showModal && (
                    <div
                        className="fixed top-[60px] md:top-[90px] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-start justify-center z-[10004] pt-[60px] md:top-[90px] pb-[40px] overflow-y-auto mr-[16px] md:mr-[0px]"

                        onClick={() => setShowModal(false)}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="flex justify-center px-[16px]">
                            <PostRegistrationModal onClose={() => setShowModal(false)} productData={productData} />
                        </div>
                    </div>
                )}

                {/* Mobile Main Section */}
                <main className="flex md:hidden flex-col items-start w-full" style={{ gap: vw(16), paddingTop: vw(32), paddingBottom: vw(0), paddingLeft: vw(16), paddingRight: vw(16) }}>
                    {/* Title */}
                    <h1 className="w-full text-left" style={{ ...responsiveText(24, 24, null, 'bold', 'noto', '#363636') }}>{editMode ? '商品編集' : '商品登録'}</h1>
                    {/* Error Message */}
                    {error && (
                        <div className="error-message w-full bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <p className="text-red-600 text-xs">{error}</p>
                        </div>
                    )}
                    {/* Frame 1 */}
                    <section className="flex flex-col items-start self-stretch bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]" style={{ paddingTop: vw(20), paddingLeft: vw(16), paddingRight: vw(16), paddingBottom: vw(20), gap: vw(16), borderRadius: vw(10) }}>
                        {/* Frame 11 */}
                        <div
                            className="flex justify-center items-center rounded-[2px] border-2 border-dashed border-[#ACACAC] bg-[#F1F3F4] w-full cursor-pointer hover:opacity-80 transition-opacity"
                            style={{
                                paddingTop: uploadedPhotos.length === 0 ? vwd(18) : vwd(20),
                                paddingBottom: uploadedPhotos.length === 0 ? vwd(14) : vwd(20),
                                paddingLeft: uploadedPhotos.length === 0 ? vwd(62) : vwd(16),
                                paddingRight: uploadedPhotos.length === 0 ? vwd(63) : vwd(16)
                            }}
                            onClick={handleUploadClick}
                        >
                            {uploadedPhotos.length === 0 ? (
                                /* Upload Area - Show when no photos uploaded */
                                <div className="flex flex-col justify-center items-center w-full">
                                    {/* mountain svg */}
                                    <div className="flex flex-col items-start" style={{ ...responsiveMetric(56, 36), maxWidth: vw(792), paddingBottom: vw(6) }}>
                                        <img src={mountain_down} alt="upload" style={{ ...responsiveMetric(56, 36) }} />
                                    </div>
                                    {/* 1121 */}
                                    <div className="flex flex-col items-start self-stretch" style={{ gap: vw(4) }}>
                                        <span className="w-full text-center" style={{ ...responsiveText(16, 12, null, 'bold', 'noto', '#ACACAC') }}>ファイルを選択</span>
                                        <span className="w-full text-center" style={{ ...responsiveText(12, 12, null, 'medium', 'noto', '#ACACAC') }}>サイズ:6000px*6000px以内</span>
                                        {/* 11211 */}
                                        <div className="flex flex-row items-center w-full" style={{ gap: vw(4), paddingTop: vw(4) }}>
                                            <span className="whitespace-nowrap" style={{ ...responsiveText(12, 12, null, 'medium', 'noto', '#ACACAC') }}>対応フォーマット:</span>
                                            <span className="flex items-center justify-center rounded-[4px] bg-white text-center" style={{ ...responsiveMetric(26, 16), paddingLeft: vw(2), paddingRight: vw(2), ...responsiveText(9, 10, null, 'normal', 'noto', '#87969F') }}>JPG</span>
                                            <span className="flex items-center justify-center rounded-[4px] bg-white text-center" style={{ ...responsiveMetric(26, 16), paddingLeft: vw(2), paddingRight: vw(2), ...responsiveText(9, 10, null, 'normal', 'noto', '#87969F') }}>PNG</span>
                                            <span className="flex items-center justify-center rounded-[4px] bg-white text-center" style={{ ...responsiveMetric(26, 16), paddingLeft: vw(2), paddingRight: vw(2), ...responsiveText(9, 10, null, 'normal', 'noto', '#87969F') }}>PDF</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Photo Grid - Show when photos are uploaded */
                                <div className="w-full">
                                    <div className="grid grid-cols-3 w-full" style={{ gap: vw(8) }}>
                                        {uploadedPhotos.map((photo, index) => (
                                            <div key={photo.id} className="relative group">
                                                <img
                                                    src={photo.isExisting ? photo.url : photo.preview}
                                                    alt={`Photo ${index + 1}`}
                                                    className="object-cover rounded-lg"
                                                    style={{ ...responsiveMetric(88, 88) }}
                                                />
                                                <button
                                                    onClick={() => removePhoto(photo.id)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                                                    style={{ width: vw(20), height: vw(20) }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        {/* Add more button - show if less than 10 photos */}
                                        {uploadedPhotos.length < 10 && !editMode && (
                                            <div
                                                className="border-2 border-dashed border-gray-300 bg-white rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                                                onClick={handleUploadClick}
                                                style={{ ...responsiveMetric(88, 88) }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-gray-400 mb-1" style={{ ...responsiveText(16, 16) }}>+</div>
                                                    <div className="text-gray-500" style={{ ...responsiveText(10, 10) }}>追加</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Frame 12 (Mobile) */}
                        <div className="flex flex-col items-start self-stretch">
                            {/* 121 */}
                            <div className="flex items-start self-stretch" style={{ gap: vw(16) }}>
                                <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>
                                    ファイル数&nbsp;{uploadedPhotos.length}/10
                                </span>
                                <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>
                                    容量25MBまで&nbsp;{(totalSize / (1024 * 1024)).toFixed(1)}/25
                                </span>
                            </div>
                            {/* 122 */}
                            <div className="flex flex-col items-start self-stretch" style={{ gap: vw(4), marginTop: vw(8) }}>
                                <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12) }}>
                                    <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>タイトル</span>
                                                                            <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>{(title || '').length}/30</span>
                                </div>
                                <div className="flex flex-col items-start self-stretch w-full" style={{ paddingBottom: vw(6.57) }}>
                                    <input
                                        type="text"
                                        className="border border-[#E9E9E9] bg-white focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                        placeholder="商品のタイトル"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={30}
                                        style={{ ...responsiveMetric(311, 48), paddingLeft: vw(11), paddingRight: vw(11), paddingTop: vw(1), paddingBottom: vw(1), borderRadius: vw(10), ...responsiveText(16, 16, null, 'medium', 'noto') }}
                                    />
                                </div>
                            </div>

                            {/* Frame 123 (Mobile) */}
                            <div className="flex flex-col items-start self-stretch" style={{ paddingTop: vw(13.44), gap: vw(7.2) }}>
                                {/* 1231: 説明文 */}
                                <div className="flex flex-col items-start" style={{ ...responsiveMetric('auto', 164.85), gap: vw(4) }}>
                                    {/* 12311 */}
                                    <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                        <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>説明文</span>
                                        <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>{(description || '').length}/200</span>
                                    </div>
                                    {/* 12312 */}
                                    <div className="flex flex-col items-start self-stretch" style={{ paddingBottom: vw(12.85) }}>
                                        {/* 123121 */}
                                        <div className="flex flex-col items-start" style={{ ...responsiveMetric(311, 128) }}>
                                            <textarea
                                                className="flex w-full h-full bg-white border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 resize-none placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                                placeholder="商品の説明文"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                maxLength={200}
                                                style={{ paddingTop: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49), borderRadius: vw(5.71), ...responsiveText(14, 25.66, null, 'normal', 'noto') }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* 1232: 印刷期限 */}
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vw(4) }}>
                                    {/* 12321 */}
                                    <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                        <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>印刷期限</span>
                                        <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#ACACAC') }}>最大180日後まで</span>
                                    </div>
                                    {/* 12322 */}
                                    <div className="flex flex-col items-start self-stretch" style={{ paddingBottom: vw(8) }}>
                                        <input
                                            type="date"
                                            className="flex bg-white border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                            placeholder="2025/11/24"
                                            value={salesDeadline}
                                            onChange={(e) => setSalesDeadline(e.target.value)}
                                                                                                        min={new Date().toISOString().split('T')[0]}
                                                            max={maxDateString}
                                                            style={{ ...responsiveMetric(311, 45.99), paddingTop: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49), borderRadius: vw(5.71), ...responsiveText(14, 14, null, 'normal', 'noto') }}
                                            disabled={editMode}
                                        />
                                    </div>
                                </div>
                                {/* 1233: 販売価格 */}
                                <div className="flex flex-col items-start" style={{ ...responsiveMetric(311, 'auto') }}>
                                    {/* 12331 */}
                                    <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(12), marginBottom: vw(12) }}>
                                        <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>販売価格</span>
                                        <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#ACACAC') }}>いずれかを選択</span>
                                    </div>
                                    {/* 12332: Radio + 有料 */}
                                    <div className={`flex items-center ${editMode ? 'cursor-not-allowed' : 'cursor-pointer'}`} style={{ gap: vw(8), marginTop: vw(4.19), marginBottom: vw(8), opacity: editMode ? 0.5 : 1 }} onClick={editMode ? undefined : () => setIsPaid(true)}>
                                        {isPaid ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                        )}
                                        <span className="flex items-center" style={{ ...responsiveMetric(42.2, 24), ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>有料</span>
                                    </div>
                                    {/* 12333: Price input + note */}
                                    <div className="inline-flex items-center" style={{ gap: vw(8), marginLeft: vw(30), marginRight: vw(23), marginBottom: vw(8), opacity: isPaid ? 1 : 0.5 }}>
                                        <input
                                            type="number"
                                            className="flex text-right border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                            placeholder="100"
                                            value={price > 0 ? price : ''}
                                            onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                                            onWheel={(e) => e.target.blur()}
                                            min="100"
                                            max="100000"
                                            style={{ ...responsiveMetric(120, 48), paddingLeft: vw(11), paddingRight: vw(11), paddingTop: vw(1), paddingBottom: vw(1), borderRadius: vw(4), ...responsiveText(20, 20, null, 'normal', 'noto') }}
                                            disabled={!isPaid || editMode}
                                        />
                                        <span style={{ ...responsiveText(14, 25, null, 'medium', 'noto', '#363636') }}>円</span>
                                        <span style={{ ...responsiveText(12, 18, null, 'normal', 'noto', '#87969F') }}>100~100000円まで</span>
                                    </div>
                                    {/* 12334: 販売数 */}
                                    <div className="flex items-start" style={{ gap: vw(15), ...responsiveMetric(281, 'auto'), marginTop: vw(12), marginLeft: vw(30), marginBottom: vw(8), opacity: isPaid ? 1 : 0.5 }}>
                                        <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>販売数</span>
                                    </div>
                                    {/* 12335: Circle + 無制限 */}
                                    <div className="flex items-center" style={{ ...responsiveMetric(281, 29), marginLeft: vw(30), marginBottom: vw(16), opacity: isPaid ? 1 : 0.5, cursor: isPaid && !editMode ? 'pointer' : 'not-allowed' }} onClick={isPaid && !editMode ? () => setIsUnlimited(true) : undefined}>
                                        {isUnlimited ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20), marginRight: vw(10) }} />
                                        ) : (
                                            <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20), marginRight: vw(10) }} />
                                        )}
                                        <span className="whitespace-nowrap" style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>無制限</span>
                                    </div>
                                    {/* 12336: Radio + 販売数を指定 */}
                                    <div className="flex items-center" style={{ ...responsiveMetric(281, 29), marginLeft: vw(30), marginBottom: vw(8), opacity: isPaid ? 1 : 0.5, cursor: isPaid && !editMode ? 'pointer' : 'not-allowed' }} onClick={isPaid && !editMode ? () => setIsUnlimited(false) : undefined}>
                                        {!isUnlimited ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20), marginRight: vw(10) }} />
                                        ) : (
                                            <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20), marginRight: vw(10) }} />
                                        )}
                                        <span className="whitespace-nowrap" style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>販売数を指定</span>
                                    </div>
                                    {/* 12337: Input for sales count */}
                                    <div className="inline-flex items-center" style={{ gap: vw(8), marginLeft: vw(30), marginBottom: vw(8), opacity: isPaid ? 1 : 0.5 }}>
                                        <input
                                            type="number"
                                            className="flex text-right border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                            placeholder="1"
                                            value={salesLimit > 0 ? salesLimit : ''}
                                            onChange={(e) => setSalesLimit(e.target.value)}
                                            onWheel={(e) => e.target.blur()}
                                            min="1"
                                            max="999999"
                                            style={{ ...responsiveMetric(120, 48), paddingLeft: vw(11), paddingRight: vw(11), paddingTop: vw(1), paddingBottom: vw(1), borderRadius: vw(4), ...responsiveText(20, 20, null, 'normal', 'noto') }}
                                            disabled={!isPaid || isUnlimited || editMode}
                                        />
                                        <span style={{ ...responsiveText(12, 18, null, 'normal', 'noto', '#87969F') }}>1~999999まで</span>
                                    </div>
                                    {/* 12338: Circle + 無料 */}
                                    <div className={`flex items-center ${editMode ? 'cursor-not-allowed' : 'cursor-pointer'}`} style={{ ...responsiveMetric(311, 'auto'), opacity: editMode ? 0.5 : 1 }} onClick={editMode ? undefined : () => setIsPaid(false)}>
                                        {!isPaid ? (
                                            <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20), marginRight: vw(10) }} />
                                        ) : (
                                            <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20), marginRight: vw(10) }} />
                                        )}
                                        <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>無料</span>
                                    </div>
                                </div>
                                {/* Frame 1234 */}
                                <div className="flex flex-col items-start self-stretch w-full" style={{ paddingTop: vw(12.81), gap: vw(4) }}>
                                    {/* Frame 12341 */}
                                    <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                        <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>表示設定</span>
                                        <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#ACACAC') }}>どれか１つを選択</span>
                                    </div>
                                    {/* Frame 12342 */}
                                    <div className="flex flex-col items-start self-stretch">
                                        {/* 123421: 2 photo options, aligned */}
                                        <div className="flex flex-row justify-center items-start w-full" style={{ gap: vw(14) }}>
                                            {/* 1234211: 設定しない */}
                                            <div className={`flex flex-col items-start ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vw(5), ...responsiveMetric(148, 220) }} onClick={editMode ? undefined : () => handleDisplayModeChange('normal')}>
                                                <img src={photo1_m} alt="設定しない" className="object-cover" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12) }} />
                                                <div className="flex items-center w-full" style={{ gap: vw(10) }}>
                                                    {displayMode === 'normal' ? (
                                                        <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                    ) : (
                                                        <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                    )}
                                                    <span style={{ ...responsiveText(14, 22, null, 'normal', 'noto', '#363636') }}>設定しない</span>
                                                </div>
                                            </div>
                                            {/* 1234212: ガチャ */}
                                            <div className={`flex flex-col items-start ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vw(5), ...responsiveMetric(148, 220) }} onClick={editMode ? undefined : () => handleDisplayModeChange('gacha')}>
                                                <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12), backgroundColor: '#A0A5AC' }}>
                                                    <img src={photo1} alt="ぼかしフィルター" className="object-cover filter blur-[4px]" style={{ ...responsiveMetric(213, 88), borderRadius: vw(4) }} />
                                                    <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px]" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12) }} />
                                                    <div className="flex" style={{ ...responsiveMetric(148, 88), borderRadius: vw(11), ...responsivePosition(-0.5), border: vw(2), borderColor: '#D741EB', borderStyle: 'solid' }} />
                                                    <div className="flex flex-col items-center" style={{ gap: vw(4), ...responsivePosition(12, 16) }}>
                                                        <img src={bubble} alt="bubble" style={{ ...responsiveMetric(30, 30) }} />
                                                        <span style={{ ...responsiveText(10, 13, null, 'black', 'noto', '#FFF') }}>ガチャ</span>
                                                        <span style={{ ...responsiveText(9, 9.5, null, 'normal', 'noto', '#FFF') }}>ランダムで1枚選定されます</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center w-full" style={{ gap: vw(10) }}>
                                                    {displayMode === 'gacha' ? (
                                                        <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                    ) : (
                                                        <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                    )}
                                                    <span style={{ ...responsiveText(14, 22, null, 'normal', 'noto', '#363636') }}>ガチャ</span>
                                                </div>
                                                <div className="flex flex-col items-start w-full">
                                                    <span style={{ ...responsiveText(12, 19.5, null, 'normal', 'noto', '#87969F') }}>複数の写真の中からランダムで1枚だけ印刷されます。アップ画像が2枚以上で選択できます。</span>
                                                </div>
                                                {gachaError && (
                                                    <div className="flex flex-col items-start w-full mt-2">
                                                        <span className="text-red-500" style={{ ...responsiveText(12, 19.5, null, 'normal', 'noto') }}>{gachaError}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* 123422: 2 options, aligned */}
                                        <div className="flex flex-row justify-left items-start w-full" style={{ gap: vw(14) }}>
                                            {/* 1234213: ぼかしフィルター */}
                                            <div className={`flex flex-col items-end ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vw(5), ...responsiveMetric(148, 250), paddingTop: vw(10) }} onClick={editMode ? undefined : () => handleDisplayModeChange('blur')}>
                                                <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12), backgroundColor: '#A0A5AC' }}>
                                                    <img src={photo1} alt="ぼかしフィルター" className="object-cover filter blur-[4px]" style={{ ...responsiveMetric(213, 88), borderRadius: vw(4) }} />
                                                    <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px]" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12) }} />
                                                    <div className="flex" style={{ ...responsiveMetric(148, 88), borderRadius: vw(11), ...responsivePosition(-0.5), border: vw(2), borderColor: '#000', borderStyle: 'solid' }} />
                                                    <div className="flex flex-col items-center" style={{ gap: vw(4), ...responsivePosition(12, 26) }}>
                                                        <img src={question} alt="question" style={{ ...responsiveMetric(30, 30) }} />
                                                        <span style={{ ...responsiveText(10, 13, null, 'black', 'noto', '#FFF') }}>ぼかしフィルター</span>
                                                        <span style={{ ...responsiveText(9, 9.5, null, 'normal', 'noto', '#FFF') }}>印刷して確認しよう！</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center w-full" style={{ gap: vw(10), paddingTop: vw(10) }}>
                                                    {displayMode === 'blur' ? (
                                                        <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                    ) : (
                                                        <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                    )}
                                                    <span style={{ ...responsiveText(14, 22, null, 'normal', 'noto', '#363636') }}>ぼかしフィルター</span>
                                                </div>
                                                <div className="flex flex-col items-start w-full" style={{ minHeight: vw(80) }}>
                                                    <span style={{ ...responsiveText(12, 19.5, null, 'normal', 'noto', '#87969F') }}>購入するまで写真をぼかしフィルターで隠せます</span>
                                                </div>
                                            </div>
                                            {/* 1234221: パスワード */}
                                            <div className={`flex flex-col items-start ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vw(5), ...responsiveMetric(148, 262), paddingTop: vw(10) }} onClick={editMode ? undefined : () => handleDisplayModeChange('password')}>
                                                <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(148, 88), borderRadius: vw(4) }}>
                                                    <div className="absolute top-0 left-0 bg-[#586B88]" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12) }} />
                                                    <div className="flex flex-col items-center" style={{ gap: vw(4), ...responsivePosition(12, 26) }}>
                                                        <img src={lock} alt="question" style={{ ...responsiveMetric(30, 30) }} />
                                                        <span style={{ ...responsiveText(10, 13, null, 'black', 'noto', '#FFF') }}>パスワード</span>
                                                        <span style={{ ...responsiveText(9, 9.5, null, 'normal', 'noto', '#FFF') }}>PWを入れて印刷しよう</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center w-full" style={{ gap: vw(10), paddingTop: vw(10) }}>
                                                    {displayMode === 'password' ? (
                                                        <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                    ) : (
                                                        <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                    )}
                                                    <span style={{ ...responsiveText(14, 22, null, 'normal', 'noto', '#363636') }}>パスワード</span>
                                                </div>
                                                <div className="flex flex-col items-start w-full">
                                                    <span style={{ ...responsiveText(12, 19.5, null, 'normal', 'noto', '#87969F') }}>写真は非公開。パスワードを知っている人だけに公開します。</span>
                                                </div>
                                                {displayMode === 'password' && (
                                                    <input
                                                        type="text"
                                                        className="flex w-full bg-white border border-[#E9E9E9] focus:border-[#FF2AA1] focus:bg-[#FFEFF8] focus:outline-none focus:ring-0 placeholder-[#ACACAC] text-[#363636] focus:text-[#C9177A]"
                                                        placeholder="半角英数16文字まで"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        maxLength={16}
                                                        style={{ ...responsiveMetric('full', 45.99), borderRadius: vw(5.71), ...responsiveText(13, 14, null, 'normal', 'noto'), marginTop: vw(8) }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {/* 1234213: warning */}
                                        <div className={`flex flex-col items-end ${editMode ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} style={{ gap: vw(5), ...responsiveMetric(148, 220), paddingTop: vw(10) }} onClick={editMode ? undefined : () => handleDisplayModeChange('cushion')}>
                                            <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(148, 88), borderRadius: vw(4) }}>
                                                <div className="absolute top-0 left-0 bg-[#A0A5AC]" style={{ ...responsiveMetric(148, 88), borderRadius: vw(12) }} />
                                                <div className="flex flex-col items-center" style={{ gap: vw(4), ...responsivePosition(12, 26) }}>
                                                    <img src={warning} alt="question" style={{ ...responsiveMetric(30, 30) }} />
                                                    <span style={{ ...responsiveText(10, 13, null, 'black', 'noto', '#464F5D') }}>WARNING</span>
                                                    <span style={{ ...responsiveText(9, 9.5, null, 'normal', 'noto', '#464F5D') }}>クリックして内容を確認</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full" style={{ gap: vw(10), marginTop: vw(12) }}>
                                                {displayMode === 'cushion' ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                ) : (
                                                    <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 19.5, null, 'normal', 'noto', '#363636') }}>ワンクッション</span>
                                            </div>
                                            <span style={{ ...responsiveText(12, 19.5, null, 'normal', 'noto', '#87969F'), marginTop: vw(8) }}>閲覧注意を促しワンタップして写真を公開します。</span>
                                        </div>
                                    </div>
                                    {/* Frame 12343 */}
                                    <div className="flex flex-col items-start w-full" style={{ gap: vw(20) }}>
                                        {/* Frame 123431 */}
                                        <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ gap: vw(12), paddingTop: vw(20) }}>
                                            <span style={{ ...responsiveText(14, 20, null, 'bold', 'noto', '#363636') }}>商品カテゴリに追加</span>
                                        </div>
                                        {/* Frame 123432 */}
                                        <div className="flex flex-col items-start self-stretch" style={{ gap: vw(8) }}>
                                            <div className="flex items-center cursor-pointer" style={{ gap: vw(10) }} onClick={() => setAddToCategory(false)}>
                                                {!addToCategory ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                ) : (
                                                    <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>追加しない</span>
                                            </div>
                                            <div className="flex flex-col items-start self-stretch">
                                                <span style={{ paddingLeft: vw(30), ...responsiveText(12, 19.5, null, 'normal', 'noto', '#87969F') }}>誰でも商品ページを見ることができます</span>
                                            </div>
                                        </div>
                                        {/* Frame 123433 */}
                                        <div className="flex flex-col items-start self-stretch" style={{ gap: vw(8) }}>
                                            {/* 1234331 */}
                                            <div className="flex items-center cursor-pointer" style={{ gap: vw(10) }} onClick={() => setAddToCategory(true)}>
                                                {addToCategory ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                ) : (
                                                    <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>商品カテゴリに追加</span>
                                            </div>
                                            {/* 1234332 */}
                                            <div className="flex flex-col items-start self-stretch">
                                                <span style={{ paddingLeft: vw(30), ...responsiveText(12, 19.5, null, 'normal', 'noto', '#87969F') }}>複数選択可能</span>
                                            </div>
                                        </div>
                                        {/* Frame 123434 */}
                                        <div className="flex justify-center items-center flex-wrap w-full" style={{ gap: vw(14) }}>
                                            {categories && categories.length > 0 ? (
                                                categories.map((category, index) => (
                                                    <div
                                                        key={category.id}
                                                        className={`flex items-center justify-center transition-colors ${!addToCategory ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isCategorySelected(category.id) ? 'border-[#FF2AA1] bg-[#FFEFF8]' : 'border-[#E9E9E9] bg-white'}`}
                                                        style={{ ...responsiveMetric(148, 48), paddingLeft: vw(2), paddingRight: vw(2), borderRadius: vw(8), border: '1px solid' }}
                                                        onClick={() => addToCategory && toggleCategory(category.id)}
                                                    >
                                                        <span className="text-center" style={{ ...responsiveText(16, 21, null, 'normal', 'noto', isCategorySelected(category.id) ? '#FF2AA1' : '#363636') }}>{category.title}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex items-center justify-center border border-[#E9E9E9] bg-white" style={{ ...responsiveMetric(168, 48), paddingLeft: vw(2), paddingRight: vw(2), borderRadius: vw(8) }}>
                                                    <span className="text-center whitespace-nowrap" style={{ ...responsiveText(16, 21, null, 'normal', 'noto', '#ACACAC') }}>カテゴリがありません</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* print serial number option */}
                                    {/* <div className="flex flex-col items-start self-stretch" style={{ gap: vw(20) }}>
                                        <div className="flex items-center self-stretch border-b border-[#E9E9E9]">
                                            <div className="flex items-center" style={{ gap: vw(10), paddingTop: vw(25), paddingBottom: vw(6) }}>
                                                <span className="whitespace-nowrap" style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>シリアル番号設定</span>
                                                <span className="flex flex-col justify-center" style={{ ...responsiveMetric(112, 27), marginLeft: vw(10), ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC') }}>いずれかを選択</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start self-stretch" style={{ gap: vw(8) }}>
                                            <div className="flex items-center cursor-pointer" style={{ gap: vw(10) }} onClick={() => setPrintSerial(false)}>
                                                {!printSerial ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                ) : (
                                                    <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>印字しない</span>
                                            </div>
                                            <span className="whitespace-nowrap" style={{ paddingLeft: vw(30), ...responsiveText(13, 19.5, null, 'medium', 'noto', '#87969F') }}>プリントする時にシリアル番号は印字されません</span>
                                        </div>
                                        <div className="flex flex-col items-start self-stretch" style={{ gap: vw(8) }}>
                                            <div className="flex items-center self-stretch cursor-pointer" style={{ gap: vw(10) }} onClick={() => setPrintSerial(true)}>
                                                {printSerial ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20), margin: 0 }} />
                                                ) : (
                                                    <span className="flex rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20), margin: 0 }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>印字する</span>
                                            </div>
                                            {printSerial && (
                                                <div className="flex flex-col items-start self-stretch" style={{ paddingLeft: vw(30), gap: vw(8) }}>
                                                    <span style={{ ...responsiveText(13, 19.5, null, 'medium', 'noto', '#87969F') }}>プリントする時にシリアル番号を印字することができます</span>
                                                    <div className="flex items-center cursor-pointer" style={{ gap: vw(15), width: '100%' }} onClick={() => setSerialFormat('number')}>
                                                        {serialFormat === 'number' ? (
                                                            <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                        ) : (
                                                            <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                        )}
                                                        <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>発行枚数を表示</span>
                                                        <span style={{ ...responsiveText(12, 18, null, 'normal', 'noto', '#ACACAC') }}>例：000001,000002</span>
                                                    </div>
                                                    <div className="flex items-center cursor-pointer" style={{ gap: vw(15), width: '100%' }} onClick={() => setSerialFormat('random')}>
                                                        {serialFormat === 'random' ? (
                                                            <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                        ) : (
                                                            <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                        )}
                                                        <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>乱数6文字で表示</span>
                                                        <span style={{ ...responsiveText(12, 18, null, 'normal', 'noto', '#ACACAC') }}>例：736593,918482</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div> */}
                                    {/* Frame 12345 */}
                                    <div className="flex flex-col items-start self-stretch" style={{ gap: vw(20) }}>
                                        {/* 123451 */}
                                        <div className="flex items-center self-stretch border-b border-[#E9E9E9]" style={{ gap: vw(12), paddingTop: vw(25), paddingBottom: vw(6) }}>
                                            <span style={{ ...responsiveText(14, 27, null, 'bold', 'noto', '#363636') }}>公開設定</span>
                                            <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#ACACAC') }}>いずれかを選択</span>
                                        </div>
                                        {/* 123452 */}
                                        <div className="flex flex-col items-start self-stretch" style={{ gap: vw(8) }}>
                                            {/* 1234521 */}
                                            <div className="flex items-start self-stretch cursor-pointer" style={{ gap: vw(10) }} onClick={() => setIsPublic(true)}>
                                                {isPublic ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                ) : (
                                                    <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>公開</span>
                                            </div>
                                            {/* 1234522 */}
                                            <span className="self-stretch" style={{ paddingLeft: vw(30), ...responsiveText(13, 19.5, null, 'medium', 'noto', '#87969F') }}>誰でも商品ページを見ることができます</span>
                                        </div>
                                        {/* 123453 */}
                                        <div className="flex flex-col items-start self-stretch" style={{ gap: vw(8) }}>
                                            {/* 1234531 */}
                                            <div className="flex items-start self-stretch cursor-pointer" style={{ gap: vw(10) }} onClick={() => setIsPublic(false)}>
                                                {!isPublic ? (
                                                    <img src={radio} alt="radio" style={{ ...responsiveMetric(20, 20) }} />
                                                ) : (
                                                    <span className="flex flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" style={{ ...responsiveMetric(20, 20) }} />
                                                )}
                                                <span style={{ ...responsiveText(14, 24, null, 'normal', 'noto', '#363636') }}>非公開</span>
                                            </div>
                                            {/* 1234532 */}
                                            <span className="self-stretch" style={{ paddingLeft: vw(30), ...responsiveText(13, 19.5, null, 'medium', 'noto', '#87969F') }}>自分だけが商品ページを見ることができます</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Frame 1235 */}
                                <div className="flex flex-col items-start self-stretch" style={{ gap: vw(10), ...responsiveMetric('auto', 104.8), paddingTop: vw(32.8) }}>
                                    {/* 12351: Button */}
                                                                <button
                                className="relative z-[10] pointer-events-auto flex flex-col justify-center items-center bg-gradient-to-r from-[#AB31D3] to-[#FF2AA1] shadow-[0_4px_8px_0_rgba(255,42,161,0.20)]"
                                type="button"
                                onClick={handleSubmit}
                                onTouchStart={handleSubmit}
                                disabled={isSubmitting}
                                style={{ ...responsiveMetric(311, 'auto'), paddingLeft: vw(36), paddingRight: vw(36), paddingTop: vw(15), paddingBottom: vw(15), borderRadius: vw(8) }}
                            >
                                        <span style={{ ...responsiveText(18, 14, null, 'bold', 'noto', '#FFFFFF') }}>
                                            {isSubmitting ? (editMode ? '保存中...' : '登録中...') : (editMode ? '保存' : '登録する')}
                                        </span>
                                    </button>
                                    {/* 12352: Note */}
                                    <span className="self-stretch text-center" style={{ ...responsiveText(12, 18, null, 'normal', 'noto', '#87969F') }}>
                                        ※公開後は商品ファイルなどの変更はできません。
                                    </span>
                                </div>
                            </div>
                        </div>

                    </section>
                </main>
            </div >
            <Footer />
        </>
    );
};

export default RegisterProduct;