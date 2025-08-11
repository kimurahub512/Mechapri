import React from 'react';

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = '確認', 
    cancelText = 'キャンセル',
    confirmButtonClass = 'bg-red-500 hover:bg-red-600',
    isLoading = false,
    loadingText = '処理中...'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-bold mb-4 text-[#363636] font-['Noto_Sans_JP']">
                    {title}
                </h3>
                <p className="text-gray-600 mb-6 font-['Noto_Sans_JP']">
                    {message}
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-['Noto_Sans_JP'] disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50 font-['Noto_Sans_JP'] ${confirmButtonClass}`}
                    >
                        {isLoading ? loadingText : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
