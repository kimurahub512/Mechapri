
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';


const Transaction = () => {
 
    return (
        <>
        <Header/>
        <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
            {/* Sidebar Section */}
            <div className="hidden md:block">
                <ShopSidebar/>
            </div>
            <ShopMobileTopBlock/>            
        </div>
        <Footer/>
        </>
    );
};

export default Transaction;