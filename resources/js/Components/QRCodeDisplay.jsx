import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import qr from '@/assets/images/productdetails/qr.jpg';

const QRCodeDisplay = ({ 
    product, 
    isMobile = false, 
    onRetry = null,
    className = "" 
}) => {
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    // Check if NWPS upload has failed
    const isNWPSFailed = product?.nwps_upload_status === 'failed';
    const hasQRCode = product?.nwps_qr_code_url;
    const hasUserCode = product?.nwps_user_code;

    const handleRetry = async () => {
        if (isRetrying || retryCount >= maxRetries) return;
        
        setIsRetrying(true);
        setRetryCount(prev => prev + 1);
        
        try {
            // Trigger retry by dispatching the appropriate job
            if (product?.price === 0) {
                // Free product - retry ProcessFreeProductNWPSJob
                await fetch('/api/retry-free-product-nwps', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ product_id: product.id })
                });
            } else {
                // Paid product - retry UploadToNWPSJob (if we have purchase info)
                if (onRetry) {
                    await onRetry();
                }
            }
            
            // Refresh the page after a short delay to get updated data
            setTimeout(() => {
                router.reload({ only: ['product'] });
            }, 2000);
        } catch (error) {
            console.error('Retry failed:', error);
        } finally {
            setIsRetrying(false);
        }
    };

    // Show error message if NWPS failed
    if (isNWPSFailed) {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-red-600 font-medium mb-2">
                        QRコードが発行されていません
                    </div>
                    <div className="text-red-500 text-sm mb-3">
                        後でもう一度お試しください
                    </div>
                    {retryCount < maxRetries && (
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {isRetrying ? '再試行中...' : '再試行'}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Show loading state if no QR code yet
    if (!hasQRCode) {
        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-yellow-600 font-medium mb-2">
                        QRコードを生成中...
                    </div>
                    <div className="text-yellow-500 text-sm">
                        しばらくお待ちください
                    </div>
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
