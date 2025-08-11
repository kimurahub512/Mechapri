import React, { useState, useEffect } from 'react';

const CategoryReorderModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    categories = [],
    isLoading = false 
}) => {
    const [orderedCategories, setOrderedCategories] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);

    // Initialize categories when modal opens
    useEffect(() => {
        if (isOpen) {
            setOrderedCategories([...categories]);
        }
    }, [isOpen, categories]);

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (draggedItem === null || draggedItem === dropIndex) return;

        const newOrderedCategories = [...orderedCategories];
        const draggedCategory = newOrderedCategories[draggedItem];
        
        // Remove the dragged item
        newOrderedCategories.splice(draggedItem, 1);
        
        // Insert at the new position
        newOrderedCategories.splice(dropIndex, 0, draggedCategory);
        
        setOrderedCategories(newOrderedCategories);
        setDraggedItem(null);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleSave = () => {
        onSave(orderedCategories);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
                <h3 className="text-lg font-bold mb-4 text-[#363636] font-['Noto_Sans_JP']">
                    カテゴリの並び替え
                </h3>
                
                <div className="flex-1 overflow-y-auto mb-6">
                    <p className="text-gray-600 mb-4 font-['Noto_Sans_JP'] text-sm">
                        ドラッグ＆ドロップでカテゴリの順序を変更できます
                    </p>
                    
                    <div className="space-y-3">
                        {orderedCategories.map((category, index) => (
                            <div
                                key={category.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`p-4 border-2 border-dashed rounded-lg cursor-move transition-all ${
                                    draggedItem === index 
                                        ? 'border-[#FF2AA1] bg-[#FFEFF8] opacity-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#363636] font-['Noto_Sans_JP']">
                                                {category.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 font-['Noto_Sans_JP']">
                                                {category.batch_cnt || 0}件の商品
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-gray-400">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 2V4M7 10V12M7 16V18M13 2V4M13 10V12M13 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-['Noto_Sans_JP'] disabled:opacity-50"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50 font-['Noto_Sans_JP']"
                    >
                        {isLoading ? '保存中...' : '保存'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryReorderModal;
