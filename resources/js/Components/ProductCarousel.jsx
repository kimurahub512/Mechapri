import React from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products, isMobile = false, haveAccount = false, rowCnt = 1 }) => {
    // For mobile, always display in 2-column grid regardless of rowCnt
    if (isMobile) {
        return (
            <div className="flex flex-col w-full p-[0px_0_17.416px_0] justify-end items-center">
                {/* Product Cards (carousel) */}
                <div className="grid grid-cols-2 gap-[23px] w-full rounded-[7.839px] py-[16px]">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            isMobile={isMobile} 
                            haveAccount={haveAccount}
                            rowCnt={rowCnt}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Desktop version with row-based layout
    // Calculate how many products to show per row based on rowCnt
    const productsPerRow = Math.ceil(products.length / rowCnt);
    
    // Split products into rows
    const productRows = [];
    for (let i = 0; i < rowCnt; i++) {
        const startIndex = i * productsPerRow;
        const endIndex = startIndex + productsPerRow;
        productRows.push(products.slice(startIndex, endIndex));
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
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel; 