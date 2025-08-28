import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import QuantityControl from '@/Components/QuantityControl';
import '@/../../resources/css/shopmanagement.css';
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

const Cart = ({ cartItems = [] }) => {
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => ({
            ...acc,
            [item.id]: item.quantity
        }), {})
    );

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const response = await fetch(route('cart.update', itemId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            const data = await response.json();
            if (data.success) {
                setQuantities(prev => ({
                    ...prev,
                    [itemId]: newQuantity
                }));
                // Refresh the page to update cart count in header
                router.reload();
            } else {
                console.error('Failed to update quantity:', data.message);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(route('cart.remove', itemId), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });
            const data = await response.json();
            if (data.success) {
                router.reload();
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div className="bg-white">
            <Header />
            {/* Main Section */}
            <main className="hidden md:flex flex-col items-center self-stretch pb-[60px] bg-white">
                {/* Frame 1 */}
                <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[24px] ">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1] bg-white ">
                        <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-noto self-stretch">カート</h1>
                    </div>
                    {/* Frame 12 */}
                    <div className="flex flex-col items-start self-stretch gap-[16px]">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12 w-full">
                                <p className="text-[#363636] text-lg">カートは空です</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex pb-[16px] flex-col items-start border-b border-[#D9D9D9] relative w-full">
                                    {/* Image of the product */}
                                    <div className="flex w-[228px] h-[228px] max-w-[241.913px] p-[4.488px_40.394px_2.693px_40.394px] justify-center items-center rounded-[8.976px] bg-[#F6F6F6] ml-0">
                                        <img 
                                            src={`/storage/${item.product_batch.files?.[0]?.file_path}`} 
                                            alt={item.product_batch.title} 
                                            className="w-[147.213px] h-[220.819px] flex-shrink-0 aspect-[147.21/220.82] object-cover" 
                                        />
                                    </div>
                                    {/* name of the product */}
                                    <span className="text-[#363636] font-noto font-medium text-[21px] leading-[31.5px] absolute top-[1px] left-[244px]">
                                        {item.product_batch.title}
                                    </span>
                                    {/* Frame 1211 */}
                                    <div className="flex w-[636px] p-[16px_0px] items-start absolute right-0 top-[74px] ">
                                        {/* 12111 */}
                                        <div className="h-[48px] flex-1 flex items-center gap-[8px] relative ">
                                            {/* 121111 */}
                                            <div className="flex ml-[300px] gap-0  relative w-[80px] h-[48px]">
                                                <span className="text-[#222] font-noto font-bold text-[16px] leading-[25.6px] tracking-[0.8px] absolute left-[11px] top-[-17px] whitespace-nowrap">合計金額</span>
                                                <span className="absolute left-0 top-[17px] flex w-[9.64px] h-[24px] flex-col justify-center flex-shrink-0 text-[#222] text-center font-noto font-bold text-[20px] leading-[23px]">¥</span>
                                                <span className="text-[#AB31D3] font-noto font-bold text-[36px] leading-[54px] absolute left-[15px] top-[-3px] whitespace-nowrap">
                                                    {(item.product_batch.price * quantities[item.id]).toLocaleString()}
                                                </span>
                                            </div>
                                            {/* 121112 */}
                                            <div className="flex w-[306px] justify-end items-center gap-[16px]  relative ml-[-56px] ">
                                                <span className="text-[#222] font-noto font-bold text-[16px] leading-[25.6px] tracking-[0.8px]">数量</span>
                                                {/* 121121 */}
                                                <QuantityControl 
                                                    quantity={quantities[item.id]}
                                                    onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                                                    addIcon={add}
                                                    subIcon={sub}
                                                    unit="枚"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Frame 1212 */}
                                    <div className="flex w-[636px] h-[60px] justify-between items-center absolute right-0 bottom-[32px]">
                                        {/* 12121 */}
                                        <div 
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="flex w-[167px] p-[12px] flex-row items-center flex-shrink-0 rounded-[8px] gap-[10px] cursor-pointer"
                                        >
                                            <img src={recyclebin} alt="recyclebin" className="w-[24px] h-[24px]" />
                                            <span className="text-[#767676] font-noto font-normal text-[12px] leading-[19.2px]">カートから削除</span>
                                        </div>
                                        {/* Purchase button */}
                                        <button 
                                            onClick={() => router.visit(`/payment/checkout/${item.product_batch.id}/${item.id}`)}
                                            className="flex w-[240px] h-[60px] px-[12px] justify-between items-center flex-shrink-0 rounded-[10px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]"
                                        >
                                            <span className="text-white text-center font-noto font-bold text-[18px] leading-[20.7px] whitespace-nowrap">すぐにプリントコード購入</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Payment Info Section */}
                        <div className="flex flex-col items-start self-stretch gap-[50px] mt-[48px]">
                            <div className="flex flex-col items-start self-stretch gap-[18px]">
                                <div className="flex flex-col items-start self-stretch gap-[16px]">
                                    <span className="text-left text-[#363636] font-noto font-medium text-[21px] leading-[32px]">お支払いについて</span>
                                    <div className="flex flex-col items-start self-stretch">
                                        <span className="text-left text-[#363636] font-noto font-medium text-[18px] leading-[32px]">
                                            めちゃプリはお客様のセキュリティ保護のため、決済システム <img src={stripe} alt="stripe" className="inline h-[18px] w-auto" /> を利用しています。
                                        </span>
                                        <span className="text-left text-[#363636] font-noto font-medium text-[18px] leading-[32px]">
                                            クレジットカード等のお支払い情報は当社には伝わらずに暗号化された状態でstripeで処理され、より安全にご利用いただけます。
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start self-stretch gap-[18px]">
                                <span className="text-left text-[#363636] font-noto font-medium text-[21px] leading-[32px]">ご利用可能なお支払方法</span>
                                <span className="text-left text-[#363636] font-noto font-medium text-[18px] leading-[32px]">各種クレジットカード、Google Pay、Apple Pay</span>
                                <div className="flex h-[40px] max-w-[880px] flex-col items-start self-stretch">
                                    <div className="flex w-[880px] h-[40px] px-[166px] flex-col justify-center items-center flex-shrink-0">
                                        <div className="flex w-[548px] h-[40px] pr-[0.272px] justify-center items-start gap-[10.667px] flex-shrink-0">
                                            <img src={jcb} alt="jcb" className="h-[40px] w-auto" />
                                            <img src={visa} alt="visa" className="h-[40px] w-auto" />
                                            <img src={mastercard} alt="mastercard" className="h-[40px] w-auto" />
                                            <img src={discover} alt="discover" className="h-[40px] w-auto" />
                                            <img src={diners} alt="diners" className="h-[40px] w-auto" />
                                            <img src={express} alt="express" className="h-[40px] w-auto" />
                                            <img src={googlepay} alt="googlepay" className="h-[40px] w-auto" />
                                            <img src={applepay} alt="applepay" className="h-[40px] w-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Main Section */}
            <main className="flex md:hidden flex-col items-center self-stretch bg-white pt-[80px]">
                {/* Frame 11 */}
                <div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1]">
                    <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">カート</h1>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-start w-full">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 w-full">
                            <p className="text-[#363636] text-lg">カートは空です</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex flex-col self-stretch border-b border-[#E9E9E9] relative w-full p-[16px]">
                                {/* photo1 */}
                                <div className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6] flex-shrink-0">
                                    <img 
                                        src={`/storage/${item.product_batch.files?.[0]?.file_path}`}
                                        alt={item.product_batch.title}
                                        className="w-[41.323px] h-[61.984px] flex-shrink-0 aspect-[41.32/61.98] object-cover"
                                    />
                                </div>
                                {/* Frame 1211 */}
                                <div className="flex w-[233px] flex-col items-start gap-[4px] absolute top-[16px] left-[96px] ">
                                    <span className="text-[#000] font-noto font-normal text-[14px] leading-[21px]">{item.product_batch.title}</span>
                                    {/* Frame 12111 */}
                                    <div className="w-[44px] h-[36px] relative ">
                                        <span className="text-[#222] font-noto font-bold text-[10px] leading-normal tracking-[0.8px] whitespace-nowrap absolute top-0 left-0">合計金額</span>
                                        <span className="flex w-[9.64px] h-[24px] flex-col justify-center flex-shrink-0 text-[#222] text-center font-noto font-bold text-[14px] leading-[23px] absolute top-[12px] left-0">¥</span>
                                        <span className="text-[#AB31D3] font-noto font-bold text-[18px] leading-normal absolute top-[9px] left-[11.44px]">
                                            {(item.product_batch.price * quantities[item.id]).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                {/* Frame 1212 */}
                                <div className="inline-flex justify-end items-center gap-[16px] mt-[16px]">
                                    <span className="text-[#222] font-noto font-bold text-[12px] leading-[18px]">数量</span>
                                    {/* Frame 12121 */}
                                    <QuantityControl 
                                        quantity={quantities[item.id]}
                                        onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                                        addIcon={add}
                                        subIcon={sub}
                                        unit="枚"
                                    />
                                </div>
                                {/* Purchase button */}
                                <button 
                                    onClick={() => router.visit(`/payment/checkout/${item.product_batch.id}/${item.id}`)}
                                    className="flex w-[240px] h-[40px] px-[24px] justify-between items-center flex-shrink-0 rounded-[10px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mt-[16px] mx-auto"
                                >
                                    <span className="text-white text-center font-noto font-bold text-[12px] leading-[12px]">すぐにプリントコード購入</span>
                                </button>
                                {/* Frame 1213 */}
                                <div 
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="flex w-[167px] p-[12px_12px_0_12px] flex-col items-start mt-[8px] mx-auto cursor-pointer"
                                >
                                    {/* Frame 12131 */}
                                    <div className="flex items-center gap-[10px] self-stretch">
                                        <img src={recyclebin} alt="recyclebin" className="w-[24px] h-[24px]" />
                                        <span className="text-[#767676] font-noto font-normal text-[12px] leading-[19.2px]">カートから削除</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {/* 123 (Payment Info) */}
                    <div className="flex flex-col mt-[16px] p-[16px] gap-[50px] items-start self-stretch">
                        {/* 1231 */}
                        <div className="flex flex-col gap-[12px] items-start self-stretch">
                            <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">お支払いについて</span>
                            {/* 12311 */}
                            <div className="flex flex-col gap-[5px] items-start justify-end self-stretch">
                                <span className="text-[#363636] font-noto text-[13px] leading-[24px] font-normal">
                                    めちゃプリはお客様のセキュリティ保護のため、決済システム <img src={stripe} alt="stripe" className="inline h-[18px] w-auto" /> を利用しています。
                                </span>
                                <span className="text-[#363636] font-noto text-[13px] leading-[24px] font-normal">
                                    クレジットカード等のお支払い情報は当社には伝わらずに暗号化された状態でstripeで処理され、より安全にご利用いただけます。
                                </span>
                            </div>
                        </div>
                        {/* 1232 */}
                        <div className="flex flex-col gap-[12px] items-start self-stretch ">
                            <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">ご利用可能なお支払方法</span>
                            <span className="text-[#363636] font-noto text-[13px] leading-[24px] font-normal">
                                各種クレジットカード、Google Pay、Apple Pay
                            </span>
                            {/* 12321 */}
                            <div className="flex w-[343px] h-[25.036px] pr-[0.17px] justify-center items-start gap-[6.677px] flex-shrink-0">
                                <img src={jcb} alt="jcb" className="h-[25.036px] w-auto" />
                                <img src={visa} alt="visa" className="h-[25.036px] w-auto" />
                                <img src={mastercard} alt="mastercard" className="h-[25.036px] w-auto" />
                                <img src={discover} alt="discover" className="h-[25.036px] w-auto" />
                                <img src={diners} alt="diners" className="h-[25.036px] w-auto" />
                                <img src={express} alt="express" className="h-[25.036px] w-auto" />
                                <img src={googlepay} alt="googlepay" className="h-[25.036px] w-auto" />
                                <img src={applepay} alt="applepay" className="h-[25.036px] w-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cart;