
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.png';
import recyclebin from '@/assets/images/recyclebin.svg';
import sub from '@/assets/images/sub.svg';
import add from '@/assets/images/add.svg';
import applepay from '@/assets/images/apple_pay.svg';
import googlepay from '@/assets/images/google_pay.svg';
import jcb from '@/assets/images/jcb.svg';
import visa from '@/assets/images/visa.svg';
import mastercard from '@/assets/images/master_card.svg';
import diners from '@/assets/images/diners_pay.svg';
import discover from '@/assets/images/discover_pay.svg';
import express from '@/assets/images/express.svg';
import stripe from '@/assets/images/stripe.svg';

const Shoptop = () => {
    return (
        <div className="bg-white">
            <Header />
            
            <Footer />
        </div >
    );
};

export default Shoptop;