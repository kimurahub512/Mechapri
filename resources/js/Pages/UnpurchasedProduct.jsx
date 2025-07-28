import React, { useEffect, useState } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import BadgeDisplay from '@/Components/BadgeDisplay';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import girl from '@/assets/images/favoriteshops/girl.svg';
import heart from '@/assets/images/heart_pink.svg';
import share from '@/assets/images/share.svg';
import complex from '@/assets/images/complex.svg';
import complex_black from '@/assets/images/complex_black.svg';
import question_circle from '@/assets/images/question_circle.svg';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import qr from '@/assets/images/productdetails/qr.jpg';
import x from '@/assets/images/x_logo.svg';
import instagram from '@/assets/images/instagram.svg';
import favoriteshops from '@/assets/images/favoriteshop.svg';
import logo from '@/assets/images/logo_white.svg';
import cart from '@/assets/images/icon-cart.svg';
import QuantityControl from '@/Components/QuantityControl';
import photo2 from '@/assets/images/Shoptop/photo1.png';
import photo3 from '@/assets/images/Shoptop/photo2.png';
import photo4 from '@/assets/images/Shoptop/photo3.png';
import purchase_qr from '@/assets/images/purchase_qr.svg';
import print_qr from '@/assets/images/print_qr.svg';


const UnpurchasedProduct = () => {

    const [quantities, setQuantities] = useState({
        item1: 1,
        item2: 1,
        mobileItem1: 1,
        mobileItem2: 1
    });

    const handleQuantityChange = (itemKey, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [itemKey]: newQuantity
        }));
    };
    return (
        <div className='product-details-no-footer-gap bg-[#FFF]'>
            <Header />
            <main className="hidden md:flex flex-col items-center px-[120px] pt-[44px] pb-[176px] w-full bg-[#FFF]">
                {/* Frame 1 */}
                <div className="flex flex-col items-center gap-[41px] w-full max-w-[1200px]">
                    {/* 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-full relative">
                        {/* 112 */}
                        <div className="flex flex-col justify-center items-start h-[66px] w-full relative">
                            {/* 1121 */}
                            <div className="flex items-center w-full">
                                {/* 11211 */}
                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                    {/* 112111 */}
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                    </div>
                                </div>
                                {/* 11212 */}
                                <div className="flex flex-col items-start">
                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                </div>
                            </div>
                            {/* 1122: Edit/Delete buttons */}
                            <div className="flex items-center absolute right-0 top-[15px]">
                                <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1]">
                                    <img src={favoriteshops} alt="favoriteshop" />
                                    <span className="text-[#FF2AA1] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">ショップをフォロー</span>
                                </button>
                            </div>
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full">
                            {/* 1131: Title */}
                            <div className="flex flex-col items-start w-[1200px]">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[36px] font-bold leading-[54px]">郊外のカフェにて</span>
                            </div>
                            {/* 1132: Description and Date */}
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-normal leading-[32.4px]">郊外のカフェです</span>
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[12px] font-normal leading-[18px]">2025/10/05まで販売</span>
                            </div>
                        </div>
                        {/* 114 */}
                        <div className="flex flex-wrap justify-between items-center w-full">
                            {/* 1141 */}
                            <div className="flex items-center gap-[10px]">
                                {/* 11411 */}
                                <div className="flex flex-col items-start gap-[10px] py-[8px]">
                                    {/* 114111: Heart, お気に入り, 1000 */}
                                    <div className="flex items-center gap-[4px] border-[1px] border-solid border-[#FF2AA1] rounded-[6px] p-[8px]">
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                        <span className="text-[#FF2AA1] font-['Noto Sans JP'] text-[14px] font-bold leading-[21px]">お気に入り</span>
                                        <span className="text-[#FF2AA1] font-['Noto Sans JP'] text-[14px] font-bold leading-[21px]">1000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-center pb-[12px] w-full border-b border-[#D1D1D1]">
                            {/* 1142 */}
                            <div className="flex items-center h-[32px] gap-[4px]">
                                {/* 11421 */}
                                <div className="flex flex-col items-start pl-[4px]">
                                    <div className="flex items-center gap-[4px]">
                                        <img src={share} alt="share" className="w-[20px] h-[20px]" />
                                        <span className="text-[#222] font-['Noto Sans JP'] text-[12px] font-normal leading-[13.8px]">シェア</span>
                                    </div>
                                </div>
                                {/* 11422 */}
                                <div className="flex flex-col items-start pl-[24px]">
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center justify-end w-full">
                                            <img src={complex_black} alt="complex" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                            <span className="text-[#767676] text-right font-['Noto Sans JP'] text-[14px] font-bold leading-[21px] ml-[4px]">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section 12 */}
                    <section className="flex flex-col items-start gap-[32px] w-[960px] mt-[60px]">
                        {/* 121 */}
                        <div className="flex flex-col w-full rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] p-[70px_230px_92.5px_226px]">
                            <div className="flex flex-col items-center gap-[24px]">
                                <div className="flex flex-col items-center gap-[16px]">
                                    {/* Blurred image with overlay */}
                                    <div className="flex w-[500px] px-[90px] py-[10px] justify-center items-center rounded-[16px] bg-[#F6F6F6] mx-auto relative">
                                        <div className="flex w-[320px] max-w-[396px] flex-col justify-center items-center flex-shrink-0 relative logo">
                                            <img src={photo1} alt="main" className="h-[480px] max-w-[396px] w-full object-cover rounded-[8px]" />
                                        </div>
                                {/* Blurred image */}
                                        {/* Overlay Area: 12111~12115 */}
                                        <div
                                            className="flex flex-col items-start absolute top-0 left-3 h-full opacity-75"
                                            style={{
                                                width: '474.958px',
                                                // gap: '-150px',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            {/* 12111: Logo row */}
                                            <div
                                                className="flex items-center mt-[30px]"
                                                style={{
                                                    transform: 'rotate(-30deg)',
                                                    gap: '20px',
                                                    alignSelf: 'stretch',
                                                }}
                                            >
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                {/* Add more SVGs here if needed */}
                                            </div>
                                            {/* 12112: Logo row */}
                                            <div
                                                className="flex items-center logo mt-[70px]"
                                                style={{
                                                    transform: 'rotate(-30deg)',
                                                    gap: '20px',
                                                    alignSelf: 'stretch',
                                                }}
                                            >
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                {/* Add more SVGs here if needed */}
                                            </div>
                                            {/* 12113: Logo row */}
                                            <div
                                                className="flex items-center logo mt-[70px]"
                                                style={{
                                                    transform: 'rotate(-30deg)',
                                                    gap: '20px',
                                                    alignSelf: 'stretch',
                                                }}
                                            >
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                {/* Add more SVGs here if needed */}
                                            </div>
                                            {/* 12114: Logo row */}
                                            <div
                                                className="flex items-center logo mt-[70px]"
                                                style={{
                                                    transform: 'rotate(-30deg)',
                                                    gap: '20px',
                                                    alignSelf: 'stretch',
                                                }}
                                            >
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                {/* Add more SVGs here if needed */}
                                            </div>
                                            {/* 12115: Logo row */}
                                            <div
                                                className="flex items-center logo mt-[70px]"
                                                style={{
                                                    transform: 'rotate(-30deg)',
                                                    gap: '20px',
                                                    alignSelf: 'stretch',
                                                }}
                                            >
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                <img src={logo} alt="logo" style={{ width: '146px', height: '26px' }} />
                                                {/* Add more SVGs here if needed */}
                                            </div>
                                        </div>
                                    </div>
                                    <BadgeDisplay
                                        buttonClassName="px-[16px] py-[8px] gap-[4px] rounded-[10px] border-[1px] border-solid border-[#FF2AA1]"
                                        textClassName="text-[#FF2AA1] text-[18px] font-medium leading-[18px]"
                                        images={[
                                            { src: photo2, alt: "badge1" },
                                            { src: photo3, alt: "badge2" },
                                            { src: photo4, alt: "badge3" }
                                        ]}
                                        text="10点を全て表示"
                                        textColor="#E862CB"
                                        borderColor="#FF2AA1"
                                        width="32px"
                                        height="32px"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-[4px]">
                                    <span className="text-black font-['Noto Sans JP'] text-[18px] leading-[32px] ">2025/07/25 まで購入できます</span>
                                    <div className="flex flex-row items-center">
                                        <span className="text-black font-['Noto Sans JP'] font-bold text-[46px] leading-[54px]">300</span>
                                        <span className="text-black font-['Noto Sans JP'] font-bold text-[24px] leading-[24px]">円</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-[16px] w-full">
                                    <div className="flex flex-row items-center px-[24px] w-full">
                                        <div className="mr-auto">
                                            <QuantityControl
                                                quantity={quantities.item1}
                                                onQuantityChange={(newQuantity) => handleQuantityChange('item1', newQuantity)}
                                            />
                            </div>
                                        <button className="flex w-[240px] h-[74px] px-[24px] justify-center items-center gap-[10px] rounded-[10px] bg-[#FF2AA1] ml-auto">
                                            <img src={cart} alt="favoriteshop" style={{ filter: 'brightness(0) invert(1)' }} />
                                            <span className="text-[#FFF] text-center font-bold text-[18px] leading-[20px] font-['Noto Sans JP']">カートに入れる</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-row items-center px-[24px] w-full">
                                        <div className="mr-auto">
                                            <QuantityControl
                                                quantity={quantities.item1}
                                                onQuantityChange={(newQuantity) => handleQuantityChange('item1', newQuantity)}
                                            />
                                        </div>
                                        <button className="flex w-[240px] h-[74px] px-[24px] justify-center items-center rounded-[10px] bg-[#AB31D3] ml-auto">
                                            <span className="text-[#FFF] text-center font-bold text-[18px] leading-[20px] font-['Noto Sans JP'] whitespace-nowrap">すぐにプリントコード購入</span>
                                        </button>
                                    </div>
                                </div>
                                {/*explanation*/}
                                {/* 1211: Explanation Section */}
                                <div
                                    className="flex flex-col justify-center items-center self-stretch border-t"
                                    style={{ borderTop: '1px solid #E9E9E9' }}
                                >
                                    {/* 12111 */}
                                    <div
                                        className="relative h-[243.5px] self-stretch flex"
                                        style={{ borderRadius: '10px 10px 0 0' }}
                                    >
                                        {/* 121111 */}
                                        <div
                                            className="absolute flex justify-center items-center"
                                            style={{ top: 24, left: 127, width: 233 }}
                                        >
                                            {/* 1211111 */}
                                            <div className="flex flex-col items-center px-[18.5px] py-[7px] rounded-[40px] bg-[#363636]">
                                                <span className="text-white text-center font-light font-['Noto Sans JP'] text-[14px] leading-[22px] whitespace-nowrap">
                                                    プリント用コードを購入したら…
                                                </span>
                                            </div>
                                                </div>
                                        {/* 121112 */}
                                        <div
                                            className="absolute flex justify-between items-center"
                                            style={{ top: 78, left: 68, width: 350 }}
                                        >
                                            {/* 1211121 */}
                                            <div className="flex flex-col items-center gap-[4px] w-[172px] flex-shrink-0">
                                                <img src={purchase_qr} alt="QR" />
                                                <span className="text-[#363636] text-center font-normal font-['Noto Sans JP'] text-[14px] leading-[21px]">
                                                    QRや番号などの<br />コードをGET
                                                </span>
                                            </div>
                                            {/* 1211122 */}
                                            <div className="flex flex-col items-center gap-[4px] w-[172px] flex-shrink-0">
                                                <img src={print_qr} alt="Print QR" />
                                                <span className="text-[#363636] text-center font-normal font-['Noto Sans JP'] text-[14px] leading-[21px] whitespace-pre-line">
                                                    コンビニのマルチコピー機{`\n`}にかざしてプリント
                                                </span>
                                            </div>
                                        </div>
                                        <div className=" absolute flex items-center gap-[8px]" style={{ top: 222, left: 142}}>
                                            <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-['Noto Sans JP'] text-[13px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                        </div>
                                    </div>
                                    {/* 12112 */}
                                    <div className="flex min-h-[64px] p-4 justify-center items-center gap-[12px] self-stretch">
                                        {/* 121121 */}
                                        <div className="flex items-center gap-[12px]">
                                            {/* 1211211 */}
                                            <div className="flex items-center gap-[8px]">
                                                <img src={complex} alt="complex" />
                                                <span className="text-[#E862CB] font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">プリント期限</span>
                                            </div>
                                            {/* 1211212 */}
                                            <div className="flex flex-col items-start opacity-70">
                                                <span className="text-[#E862CB] font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">2025/10/05まで</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 122: Ranking */}
                        <div className="flex flex-col items-start w-[960px] px-[66px] py-[32px] gap-[10px] bg-white rounded-[24px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                            {/* 1221: Ranking title and list */}
                            <div className="flex flex-col items-start gap-[16px] w-full">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">ランキング</span>
                                {/* 12211: Ranking list */}
                                <div className="flex flex-col items-start gap-[24px] w-full">
                                    {/* 122111: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[36px] font-bold leading-[54px]">1</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122112: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[28px] font-bold leading-[42px]">2</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122113: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[28px] font-bold leading-[42px]">3</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122114: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#222] font-['Noto Sans JP'] text-[24px] font-bold leading-[24px]">4</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122115: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#222] font-['Noto Sans JP'] text-[24px] font-bold leading-[24px]">5</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* Personal Info Footer (Frame 2) */}
            <section className="hidden md:flex flex-col items-center w-[1440px] pt-[48px] pb-[48px] px-[24px] gap-[24px] bg-[#F6F8FA] mx-auto">
                <div className="flex w-[1248px] justify-between items-start">
                    {/* Left: 21 */}
                    <div className="flex w-[400px] max-w-[1248px] items-start flex-shrink-0">
                        <img src={girl} alt="girl" className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0" />
                        {/* 211 */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy2005</span>
                                <div className="flex pt-[10px] gap-[4px]">
                                    <img src={x} alt="x" className="w-[46.429px] h-[46.429px] opacity-100" />
                                    <img src={instagram} alt="instagram" className="w-[46.429px] h-[46.429px] opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: 22 */}
                    <div className="flex w-[800px] max-w-[1248px] flex-col items-start flex-shrink-0">
                        <div className="flex w-[800px] max-w-[1248px] flex-col items-start flex-shrink-0">
                            <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[27.2px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Mobile Main Section */}
            <div className="flex flex-col gap-[45px]">
                <section className="flex flex-col items-start gap-[24px] px-4 md:hidden w-full pt-[32px] bg-[#FFF] mt-[-12px]">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-[343px]">
                        {/* 112 */}
                        <div className="flex flex-col items-start gap-[24px] w-full">
                            {/* 1121 */}
                            <div className="flex flex-col items-start gap-[12px] w-full">
                                {/* 11211 */}
                                <div className="flex items-center w-full">
                                    {/* 112111 */}
                                    <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                        <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                            <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                </div>
                            </div>
                            <button className="flex p-[7px_16px] items-center gap-[8px] rounded-[40px] border border-[#FF2AA1]">
                                <img src={favoriteshops} alt="favoriteshop" />
                                <span className="text-[#FF2AA1] text-center font-medium text-[14px] leading-[21px] font-['Noto Sans JP']">ショップをフォロー</span>
                            </button>
                            {/* 1122 */}
                            <div className="flex flex-col items-start gap-[10px] w-full">
                                {/* 11221 */}
                                <div className="flex flex-col justify-center items-start gap-[12px] w-full">
                                    <span className="text-[#363636] text-left font-['Noto Sans JP'] text-[24px] font-bold leading-[24px] w-full">郊外のカフェにて</span>
                                </div>
                                {/* 11222 */}
                                <div className="flex flex-col items-start gap-[4px] w-full">
                                    <span className="text-[#363636] font-['Noto Sans JP'] text-[14px] font-bold leading-[14px] w-full">郊外のカフェです</span>
                                    <span className="text-[#363636] font-['Noto Sans JP'] text-[12px] font-normal leading-[18px]">2025/10/05まで販売</span>
                                </div>
                                {/* 1131 */}
                                <div className="flex flex-col items-start gap-[10px] p-[8px] rounded-[6px] border-[1px] border-solid border-[#FF2AA1]">
                                    <div className="flex items-center gap-[4px]">
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                        <span className="text-[#FF2AA1] font-['Noto Sans JP'] text-[12px] font-normal leading-[21px]">お気に入り</span>
                                        <span className="text-[#FF2AA1] font-['Red Hat Display'] text-[14px] font-bold leading-[15px]">1000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full pb-[16px] border-b border-[#D1D1D1]">
                            {/* 1132 */}
                            <div className="flex items-center w-full">
                                {/* 11321: Share */}
                                <div className="flex items-center gap-[4px]">
                                    <img src={share} alt="share" className="w-[20px] h-[20px]" />
                                    <span className="text-[#222] font-['Noto Sans JP'] text-[12px] font-normal leading-[13.8px]">シェア</span>
                                </div>
                                {/* 11322: Print count */}
                                <div className="flex flex-col items-start ml-[16px]">
                                    <div className="flex items-center justify-end w-full">
                                        <img src={complex_black} alt="complex" className="w-[20px] h-[20px]" />
                                        <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                        <span className="w-[12px] text-[#767676] text-right font-['Noto Sans JP'] text-[14px] font-bold leading-[21px] ml-[4px]">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Section 12 */}
                    <section className="flex flex-col items-start gap-[32px] w-full mt-[32px]">
                        {/* 121 */}
                        <div className="flex flex-col w-full rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] px-4 pb-5">
                            {/* 1211: Blurred image with overlay */}
                            <div className="flex w-full px-[16px] py-[10px] justify-center items-center rounded-[10px] bg-[#F6F6F6] mx-auto mt-[24px] relative">
                                {/* Blurred image */}
                                <div className="flex w-full max-w-[200px] flex-col justify-center items-center flex-shrink-0 relative">
                                    <img src={photo1} alt="main" className="h-[298px] w-full object-cover rounded-[6px]" />                                    
                                </div>
                                {/* Overlay Area: Mobile inclined logos */}
                                <div
                                    className="flex flex-col items-start absolute top-0 left-0 h-full opacity-75 px-6 "
                                    style={{
                                        width: '100%',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {/* Mobile 12111: Logo row */}
                                    <div
                                        className="flex items-center mt-[20px]"
                                        style={{
                                            transform: 'rotate(-30deg)',
                                            gap: '12px',
                                            alignSelf: 'stretch',
                                        }}
                                    >
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                    </div>
                                    {/* Mobile 12112: Logo row */}
                                    <div
                                        className="flex items-center mt-[50px]"
                                        style={{
                                            transform: 'rotate(-30deg)',
                                            gap: '12px',
                                            alignSelf: 'stretch',
                                        }}
                                    >
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                    </div>
                                    {/* Mobile 12113: Logo row */}
                                    <div
                                        className="flex items-center mt-[50px]"
                                        style={{
                                            transform: 'rotate(-30deg)',
                                            gap: '12px',
                                            alignSelf: 'stretch',
                                        }}
                                    >
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                    </div>
                                    {/* Mobile 12114: Logo row */}
                                    <div
                                        className="flex items-center mt-[50px]"
                                        style={{
                                            transform: 'rotate(-30deg)',
                                            gap: '12px',
                                            alignSelf: 'stretch',
                                        }}
                                    >
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                    </div>
                                    {/* Mobile 12115: Logo row */}
                                    <div
                                        className="flex items-center mt-[50px]"
                                        style={{
                                            transform: 'rotate(-30deg)',
                                            gap: '12px',
                                            alignSelf: 'stretch',
                                        }}
                                    >
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                        <img src={logo} alt="logo" style={{ width: '80px', height: '14px'}} />
                                    </div>
                                </div>
                            </div>
                            {/* 1212: Badge display */}
                            <div className="flex justify-center w-full mt-[16px]">
                                <BadgeDisplay
                                    buttonClassName="px-[12px] py-[6px] gap-[3px] rounded-[10px] border-[1px] border-solid border-[#E862CB]"
                                    textClassName="text-[#E862CB] text-[18px] font-medium leading-[18px]"
                                    images={[
                                        { src: photo2, alt: "badge1" },
                                        { src: photo3, alt: "badge2" },
                                        { src: photo4, alt: "badge3" }
                                    ]}
                                    text="10点を全て表示"
                                    width="24px"
                                    height="24px"
                                />
                            </div>
                            {/* 1213: Price and purchase info */}
                            <div className="flex flex-col items-center gap-[4px] mt-[24px]">
                                <span className="text-black font-['Noto Sans JP'] text-[16px] leading-[27px]">2025/07/25 まで購入できます</span>
                                <div className="flex flex-row items-center gap-[4px]">
                                    <span className="text-black font-['Noto Sans JP'] font-bold text-[36px] leading-[48px]">300</span>
                                    <span className="text-black font-['Noto Sans JP'] font-bold text-[20px] leading-[23px]">円</span>
                                </div>
                            </div>
                            {/* 1214: Quantity controls and action buttons */}
                            <div className="flex flex-col items-center gap-[16px] w-full mt-[24px] ">
                                <div className="flex flex-row items-center w-full">
                                    <div className="ml-auto">
                                        <QuantityControl
                                            quantity={quantities.mobileItem1}
                                            onQuantityChange={(newQuantity) => handleQuantityChange('mobileItem1', newQuantity)}
                                        />
                                    </div>
                                    <button className="flex w-[160px] h-[40px] px-[24px] justify-center items-center gap-[10px] rounded-[10px] bg-[#FF2AA1] mr-auto">
                                        <img src={cart} alt="cart" style={{ filter: 'brightness(0) invert(1)' }} className="w-[20px] h-[19px]" />
                                        <span className="text-[#FFF] text-center font-bold text-[12px] leading-[12px] font-['Noto Sans JP'] whitespace-nowrap">カートに入れる</span>
                                    </button>
                                </div>
                                <div className="flex flex-row items-center w-full">
                                    <div className="ml-auto">
                                        <QuantityControl
                                            quantity={quantities.mobileItem2}
                                            onQuantityChange={(newQuantity) => handleQuantityChange('mobileItem2', newQuantity)}
                                        />
                                    </div>
                                    <button className="flex w-[160px] h-[40px] px-[16px] justify-center items-center rounded-[10px] bg-[#AB31D3] mr-auto">
                                        <span className="text-[#FFF] text-center font-bold text-[12px] leading-[12px] font-['Noto Sans JP'] whitespace-nowrap">すぐにプリントコード購入</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* 1216: Explanation section */}
                            <div className="flex flex-col justify-center items-center self-stretch border-t mt-[24px]" style={{ borderTop: '1px solid #E9E9E9' }}>
                                {/* 12161 */}
                                <div className="relative h-[229px] self-stretch flex" style={{ borderRadius: '8px 8px 0 0' }}>
                                    {/* 121611 */}
                                    <div className="absolute flex justify-center items-center" style={{ top: 24, left: 38, width: 233 }}>
                                        {/* 1216111 */}
                                        <div className="flex flex-col items-center px-[18.5px] py-[6px] rounded-[30px] bg-[#363636]">
                                            <span className="text-white text-center font-bold font-['Noto Sans JP'] text-[12px] leading-[16px] whitespace-nowrap">
                                                プリント用コードを購入したら…
                                            </span>
                                                </div>
                                            </div>
                                    {/* 121612 */}
                                    <div className="absolute flex justify-between items-center" style={{ top: 78, left: 6, width: 300 }}>
                                        {/* 1216121 */}
                                        <div className="flex flex-col items-center gap-[3px] w-[147px] flex-shrink-0">
                                            <img src={purchase_qr} alt="QR" className="w-[68px] h-[68px]" />
                                            <span className="text-[#363636] text-center font-normal font-['Noto Sans JP'] text-[12px] leading-[18px]">
                                                QRや番号などの<br />コードをGET
                                            </span>
                                            </div>
                                        {/* 1216122 */}
                                        <div className="flex flex-col items-center gap-[3px] w-[147px] flex-shrink-0">
                                            <img src={print_qr} alt="Print QR" className="w-[68px] h-[68px]" />
                                            <span className="text-[#363636] text-center font-normal font-['Noto Sans JP'] text-[12px] leading-[18px]">
                                                コンビニのマルチコピー機{`\n`}にかざしてプリント
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute flex items-center gap-[6px]" style={{ top: 209, left: 45 }}>
                                        <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                        <span className="text-[#767676] font-['Noto Sans JP'] text-[13px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                    </div>
                                </div>
                                {/* 12162 */}
                                <div className="flex min-h-[48px] p-3 justify-center items-center gap-[8px] self-stretch ">
                                    {/* 121621 */}
                                    <div className="flex items-center gap-[12px]  mt-[16px]">
                                        {/* 1216211 */}
                                        <div className="flex items-center gap-[8px]">
                                            <img src={complex} alt="complex" className="w-[20px] h-[20px]" />
                                            <span className="text-[#E862CB] font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">プリント期限</span>
                                        </div>
                                        {/* 1216212 */}
                                        <div className="flex flex-col items-start opacity-70">
                                            <span className="text-[#E862CB] font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">2025/10/05まで</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 122: Ranking */}
                        <div className="flex flex-col items-start w-full px-[16px] py-[24px] gap-[8px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                            {/* 1221: Ranking title and list */}
                            <div className="flex flex-col items-start gap-[12px] w-full">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[18px] font-bold leading-[24px]">ランキング</span>
                                {/* 12211: Ranking list */}
                                <div className="flex flex-col items-start gap-[16px] w-full">
                                    {/* 122111: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[24px] font-bold leading-[32px]">1</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122112: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[20px] font-bold leading-[28px]">2</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122113: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[20px] font-bold leading-[28px]">3</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122114: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#222] font-['Noto Sans JP'] text-[18px] font-bold leading-[24px]">4</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122115: Ranking item example */}
                                    <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[16px]">
                                            <div className="flex flex-col items-center pb-[8px]">
                                                <span className="text-[#222] font-['Noto Sans JP'] text-[18px] font-bold leading-[24px]">5</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                    <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                {/* Mobile Section 2 */}
                <section className="flex md:hidden flex-col items-center py-[24px] px-[16px] gap-[24px] bg-[#F6F8FA] mx-auto">
                    <div className="flex flex-col items-start gap-[24px]">
                        {/* Left: 21 */}
                        <div className="flex items-start flex-shrink-0 ">
                            <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover flex-shrink-0" />
                            {/* 211 */}
                            <div className="flex flex-col pl-[16px] items-start">
                                <div className="flex flex-col items-start gap-[12px]">
                                    <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-18px]">anchiy1005</span>
                                    <div className="flex pt-[10px] gap-[4px]">
                                        <img src={x} alt="x" className="w-[40px] h-[40px] opacity-100" />
                                        <img src={instagram} alt="instagram" className="w-[40px] h-[40px] opacity-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right: 22 */}
                        <div className="flex flex-col items-start flex-shrink-0 ">
                            <div className="flex flex-col items-start flex-shrink-0">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[14px] font-normal leading-[21px]">
                                    こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default UnpurchasedProduct;