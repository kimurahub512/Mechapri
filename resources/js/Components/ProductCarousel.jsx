import React from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products = [], isMobile = false, haveAccount = false, rowCnt = 1, horizontalScroll = false, currentUserId = null }) => {
    // Ensure products is always an array
    const safeProducts = Array.isArray(products) ? products : [];
    
    // If no products, return empty state
    if (safeProducts.length === 0) {
        return (
            <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">商品がありません</p>
            </div>
        );
    }
    // For mobile, display in 2-column grid or horizontal scroll based on prop
    if (isMobile) {
        if (horizontalScroll) {
            console.log('Mobile horizontal scroll mode, products count:', safeProducts.length);
            // Calculate total width needed for all products
            const totalWidth = safeProducts.length * 160 + (safeProducts.length - 1) * 23; // 160px per card + 23px gap
            console.log('Total width needed:', totalWidth, 'px');
            return (
                <div className="flex flex-col w-full p-[0px_0_17.416px_0] justify-end items-center">
                    {/* Product Cards (horizontal scroll) */}
                    <div className="flex flex-nowrap gap-[23px] w-full rounded-[7.839px] py-[16px] overflow-x-auto scrollbar-hide" style={{ width: '100%' }}>
                        {safeProducts.map((product) => (
                                                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                isMobile={isMobile} 
                                haveAccount={haveAccount}
                                rowCnt={rowCnt}
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col w-full p-[0px_0_17.416px_0] justify-end items-center">
                    {/* Product Cards (carousel) */}
                    <div className="grid grid-cols-2 gap-[23px] w-full rounded-[7.839px] py-[16px]">
                        {safeProducts.map((product) => (
                                                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                isMobile={isMobile} 
                                haveAccount={haveAccount}
                                rowCnt={rowCnt}
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    }

    // Desktop version with horizontal scroll or 4xn grid layout
    if (horizontalScroll) {
        console.log('Horizontal scroll mode, products count:', safeProducts.length);
        // Calculate total width needed for all products
        const totalWidth = safeProducts.length * 274 + (safeProducts.length - 1) * 24; // 274px per card + 24px gap
        console.log('Total width needed:', totalWidth, 'px');
        return (
            <div className="flex items-center gap-[16px] self-stretch py-[16px]">
                {/* Product Cards (horizontal scroll) */}
                <div className="flex flex-nowrap gap-[24px] w-full rounded-[10px] overflow-x-auto p-[16px]" style={{ width: '100%' }}>
                    {safeProducts.map((product) => (
                                                        <ProductCard 
                                key={product.id} 
                                product={product} 
                                isMobile={isMobile} 
                                haveAccount={haveAccount}
                                rowCnt={rowCnt}
                                currentUserId={currentUserId}
                            />
                    ))}
                </div>
            </div>
        );
    } else {
        // Original 4xn grid layout
        const productsPerRow = 4; // Fixed 4 products per row
        
        // Split products into rows of 4
        const productRows = [];
        for (let i = 0; i < safeProducts.length; i += productsPerRow) {
            productRows.push(safeProducts.slice(i, i + productsPerRow));
        }

        return (
            <div className="flex items-center gap-[16px] self-stretch py-[16px]">
                {/* Product Cards (carousel) */}
                <div className="flex flex-col gap-[24px] w-full rounded-[10px] overflow-x-auto scrollbar-hide p-[16px]">
                    {productRows.map((rowProducts, rowIndex) => (
                        <div key={rowIndex} className="flex flex-nowrap items-start gap-[24px]">
                            {rowProducts.map((product) => (
                                                                <ProductCard 
                                key={product.id} 
                                product={product} 
                                isMobile={isMobile} 
                                haveAccount={haveAccount}
                                rowCnt={rowCnt}
                                currentUserId={currentUserId}
                            />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default ProductCarousel; 