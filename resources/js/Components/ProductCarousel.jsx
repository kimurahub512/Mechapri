import React from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products, isMobile = false, haveAccount = false }) => {
    return (
        <div className={`flex items-center gap-[16px] self-stretch ${isMobile ? 'flex-col w-full p-[0px_0_17.416px_0] justify-end items-center' : 'p-[16px]'}`}>
            {/* Product Cards (carousel) */}
            <div className={`${isMobile ? 'grid grid-cols-2 gap-[23px] w-full rounded-[5.839px]' : 'flex flex-nowrap items-start w-full overflow-x-auto scrollbar-hide gap-[24px] rounded-[10px]'} p-[16px]`}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} isMobile={isMobile} haveAccount={haveAccount} />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel; 