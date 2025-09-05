import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import qr from '@/assets/images/productdetails/qr.jpg';

const QRCodeDisplay = ({ 
    product, 
    isMobile = false, 
    onRetry = null,
    onMaintenanceDetected = null,
    initialErrorMessage = null,
    className = "" 
}) => {
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
    const maxRetries = 3;

    // Update errorMessage when initialErrorMessage prop changes
    React.useEffect(() => {
        console.log('QRCodeDisplay initialErrorMessage prop changed:', initialErrorMessage);
        if (initialErrorMessage !== null) {
            setErrorMessage(initialErrorMessage);
            console.log('QRCodeDisplay errorMessage state updated to:', initialErrorMessage);
        }
    }, [initialErrorMessage]);

    // Check if NWPS upload has failed
    const isNWPSFailed = product?.nwps_upload_status === 'failed';
    const isNWPSMaintenance = product?.nwps_upload_status === 'maintenance';
    const hasQRCode = product?.nwps_qr_code_url;
    const hasUserCode = product?.nwps_user_code;
    
    // Only show maintenance message if we've detected it during a retry attempt
    // Check if the error message specifically contains the maintenance message
    const shouldShowMaintenance = isNWPSMaintenance && errorMessage && errorMessage.includes('印刷サーバーがメンテナンス中です');
    
    // Debug logging
    console.log('QRCodeDisplay debug:', {
        isNWPSMaintenance,
        errorMessage,
        shouldShowMaintenance,
        hasQRCode,
        isNWPSFailed
    });

    const handleRetry = async () => {
        if (isRetrying || retryCount >= maxRetries) return;
        
        console.log('QRCodeDisplay handleRetry called for product:', product.id);
        setIsRetrying(true);
        // Don't clear error message if product is in maintenance mode
        if (product?.nwps_upload_status !== 'maintenance') {
            setErrorMessage(null); // Clear previous error message
        }
        setRetryCount(prev => prev + 1);
        
        try {
            console.log('Attempting retry for product:', product.id);
            
            // Use fetch with proper headers like other working API calls
            const response = await fetch('/api/retry-free-product-nwps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json',
                },
                credentials: 'same-origin', // Include cookies for session authentication
                body: JSON.stringify({ product_id: product.id })
            });
            
            console.log('Retry response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Retry failed with status:', response.status, errorData);
                
                // Set appropriate Japanese error message based on status code
                let errorMsg = 'エラーが発生しました。後でもう一度お試しください。';
                if (response.status === 403) {
                    errorMsg = 'アクセス権限がありません。';
                } else if (response.status === 404) {
                    errorMsg = '商品が見つかりません。';
                } else if (response.status === 500) {
                    errorMsg = 'サーバーエラーが発生しました。しばらく時間をおいてからお試しください。';
                } else if (response.status === 503) {
                    console.log('503 error detected in QRCodeDisplay retry');
                    errorMsg = '印刷サーバーがメンテナンス中です。しばらく時間をおいてからお試しください。';
                    setErrorMessage(errorMsg);
                    setIsRetrying(false); // Stop retrying immediately for 503
                    if (onMaintenanceDetected) {
                        console.log('Calling onMaintenanceDetected callback');
                        onMaintenanceDetected();
                    } else {
                        console.log('onMaintenanceDetected callback not provided');
                    }
                    return; // Exit early, don't start polling
                }
                
                setErrorMessage(errorMsg);
                throw new Error(`HTTP ${response.status}: ${errorData.error || 'Unknown error'}`);
            }
            
            const data = await response.json();
            console.log('Retry successful:', data);
            
            // Check if we should start polling by reloading data once first
            // If we're in a modal context (no product prop), we need to handle this differently
            if (onMaintenanceDetected) {
                // We're in a modal context, so we need to poll the purchase data instead
                console.log('Modal context detected, starting polling directly');
                startPolling();
            } else {
                // We're in a product page context, reload product data
                router.reload({ 
                    only: ['product'],
                    onSuccess: (page) => {
                        console.log('Product data after retry:', page.props.product);
                        
                        // Check if product is now in maintenance mode
                        if (page.props.product?.nwps_upload_status === 'maintenance') {
                            console.log('Product is in maintenance mode after retry, stopping');
                            setErrorMessage('印刷サーバーがメンテナンス中です。しばらく時間をおいてからお試しください。');
                            setIsRetrying(false);
                            if (onMaintenanceDetected) {
                                onMaintenanceDetected();
                            }
                            return; // Don't start polling
                        }
                        
                        // Check if we already have a QR code
                        if (page.props.product?.nwps_qr_code_url) {
                            console.log('QR code already available after retry');
                            setIsRetrying(false);
                            return; // Don't start polling
                        }
                        
                        // Start polling for updated product data
                        startPolling();
                    },
                    onError: (errors) => {
                        console.error('Error reloading product data after retry:', errors);
                        setErrorMessage('データの取得に失敗しました。ページを再読み込みしてお試しください。');
                        setIsRetrying(false);
                    }
                });
            }
        } catch (error) {
            console.error('Retry failed:', error);
            if (!errorMessage) { // Only set if not already set by response handling
                setErrorMessage('ネットワークエラーが発生しました。インターネット接続を確認してお試しください。');
            }
            setIsRetrying(false); // Re-enable button on fetch error
        }
        // Note: Removed finally block - setIsRetrying(false) is now handled in specific cases
    };

    const startPolling = () => {
        let pollCount = 0;
        const maxPolls = 7; // Maximum 7 polls (21 seconds)
        
        const pollForUpdate = () => {
            pollCount++;
            console.log(`Polling for update ${pollCount}/${maxPolls}`);
            
            if (onMaintenanceDetected) {
                // We're in a modal context, so we need to poll the purchase data
                // The parent component (PurchaseHistory) will handle the polling
                console.log('Modal context polling - letting parent handle it');
                setIsRetrying(false); // Stop retrying and let parent handle
                return;
            } else {
                // We're in a product page context, reload product data
                router.reload({ 
                    only: ['product'],
                    onSuccess: (page) => {
                        console.log('Product data reloaded:', page.props.product);
                        
                        // Check if product is now in maintenance mode
                        if (page.props.product?.nwps_upload_status === 'maintenance') {
                            console.log('Product is in maintenance mode, stopping polling');
                            setErrorMessage('印刷サーバーがメンテナンス中です。しばらく時間をおいてからお試しください。');
                            setIsRetrying(false); // Stop retrying
                            if (onMaintenanceDetected) {
                                onMaintenanceDetected();
                            }
                            return; // Stop polling
                        }
                        
                        // Check if we have a QR code now
                        if (page.props.product?.nwps_qr_code_url) {
                            console.log('QR code found, stopping polling');
                            setIsRetrying(false); // Re-enable button when QR code is found
                            return; // Stop polling
                        }
                        
                        // Continue polling if no QR code yet and we haven't exceeded max polls
                        if (pollCount < maxPolls) {
                            setTimeout(pollForUpdate, 3000); // Poll every 3 seconds
                        } else {
                            console.log('Max polls reached, stopping');
                            setErrorMessage('QRコードの生成に時間がかかっています。後ほど購入履歴から取得できます。');
                            setIsRetrying(false); // Re-enable button when max polls reached
                        }
                    },
                    onError: (errors) => {
                        console.error('Error reloading product data:', errors);
                        setErrorMessage('データの取得に失敗しました。ページを再読み込みしてお試しください。');
                        setIsRetrying(false); // Re-enable button on error
                    }
                });
            }
        };
        
        // Start polling after a short delay
        setTimeout(pollForUpdate, 3000);
    };

    // Show maintenance message only if detected during retry attempt
    if (shouldShowMaintenance) {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-yellow-600 font-medium font-[12px] md:font-[14px] mb-2">
                        印刷サーバーがメンテナンス中です
                    </div>
                    <div className="text-yellow-500 text-sm mb-3">
                        しばらく時間をおいてからお試しください
                    </div>
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        {isRetrying ? '処理中...' : '再試行'}
                    </button>
                </div>
            </div>
        );
    }

    // Show error message if NWPS failed or is in maintenance (but not from retry attempt)
    if (isNWPSFailed || (isNWPSMaintenance && !shouldShowMaintenance)) {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-red-600 font-medium font-[12px] md:font-[14px] mb-2">
                        QRコードが発行されていません
                    </div>
                    <div className="text-red-500 text-sm mb-3">
                        {errorMessage || '後でもう一度お試しください'}
                    </div>
                    {retryCount < maxRetries && (
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {isRetrying ? '処理中...' : '再試行'}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Show error message if no QR code yet (indicates failure)
    if (!hasQRCode) {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-red-600 font-medium text-[13px] md:text-[16px]  mb-2">
                        QRコードが発行されていません
                    </div>
                    <div className="text-red-500  text-[13px] md:text-[16px] mb-3">
                        {errorMessage || '後でもう一度お試しください'}
                    </div>
                    {retryCount < maxRetries && (
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {isRetrying ? '処理中...' : '再試行'}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Show QR code normally
    const qrSize = isMobile ? "w-[100px] h-[100px]" : "w-[150px] h-[150px]";
    const containerSize = isMobile ? "w-[240px] h-[100px]" : "w-[358px] h-[150px]";
    const userCodeSize = isMobile ? "text-[16px]" : "text-[24px]";
    const userCodePosition = isMobile ? "top-[50px] left-[120px]" : "top-[73.5px] left-[180px]";
    const labelPosition = isMobile ? "top-[30px] left-[150px]" : "top-[44.5px] left-[226px]";
    const labelSize = isMobile ? "text-[12px]" : "text-[14px]";

    return (
        <div className={`relative ${containerSize} mt-[${isMobile ? '8px' : '12px'}] ${className}`}>
            <img
                src={product?.nwps_qr_code_url || qr}
                alt="qr"
                className={`absolute top-0 left-0 ${qrSize}`}
            />
            <span className={`absolute ${labelPosition} text-[#000] font-noto ${labelSize} font-normal leading-[${isMobile ? '16px' : '21px'}]`}>
                ユーザー番号
            </span>
            <span className={`absolute ${userCodePosition} text-[#363636] font-noto ${userCodeSize} font-bold leading-[${isMobile ? '16px' : '24px'}] text-center`}>
                {product?.nwps_user_code || '発行中...'}
            </span>
        </div>
    );
};

export default QRCodeDisplay;
