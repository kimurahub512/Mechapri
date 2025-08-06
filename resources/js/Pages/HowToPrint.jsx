import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import girl from '@/assets/images/favoriteshops/girl.svg';
import pen from '@/assets/images/pencil_line_black.svg';
import recyclebin from '@/assets/images/recyclebin.svg';
import heart from '@/assets/images/heart_pink.svg';
import share from '@/assets/images/share.svg';
import complex from '@/assets/images/complex_black.svg';
import complex_white from '@/assets/images/complex_white.svg';
import question from '@/assets/images/question.svg';
import question_circle from '@/assets/images/question_circle.svg';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import qr from '@/assets/images/productdetails/qr.jpg';
import x from '@/assets/images/x_logo.svg';
import instagram from '@/assets/images/instagram.svg';
import hero from '@/assets/images/beginner_hero.png';
import favoriteshops_follow from '@/assets/images/favoriteshop_white.svg';
import familymart from '@/assets/images/familymart.svg';
import ministop from '@/assets/images/ministop.svg';
import lawson from '@/assets/images/productdetails/lawson.svg';


const HowToPrint = () => {
    return (
        <div className='product-details-no-footer-gap bg-[#FFF]'>
            <Header />
            {/* Desktop Main Section */}
            <main className="hidden md:flex flex-col items-center pl-[261px] pt-[48px] pb-[88px] pr-[219px] w-full ">
                <div className="flex flex-col items-center pb-[32px] gap-[25px] w-full">
                    <div className="relative flex w-[960px] h-[180px] rounded-[16px]">
                        <img src={hero} alt="hero" className="w-full h-full object-cover object-[50%_32%] rounded-[16px]" />
                        <div className="absolute inset-0 flex-shrink-0 opacity-25 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] rounded-[16px]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white text-center font-noto text-[32px] font-bold leading-[22px]">
                                ネットワークプリントの使い方
                            </h1>
                        </div>
                    </div>
                    <span className="text-center text-[#363636] font-noto text-[18px] font-normal leading-[32px]">ご利用のコンビニエンスストアを選択してください</span>
                </div>
                <div className="flex flex-row items-center gap-[10px] w-full">
                    <div className="flex flex-col items-center px-[24px] w-full shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] rounded-[10px]">
                        <div className="flex py-[30px] justify-between items-center self-stretch">
                            <img src={familymart} alt="familymart" className="w-[120px] h-[120px]" />
                            <img src={lawson} alt="familymart" className="w-[120px] h-[120px]" />
                            <img src={ministop} alt="familymart" className="w-[120px] h-[120px]" />
                        </div>
                        <div className="flex items-center py-[30px] h-[74px]">
                            <span className="text-[#363636] font-noto text-[16px] font-bold leading-[27px] text-center">
                                ファミマ・ローソン・ミニストップで
                                <br />
                                印刷する
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center px-[24px] w-full shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] rounded-[10px]">
                        <div className="flex py-[30px] justify-center items-center self-stretch">
                            <img src={eleven} alt="familymart" className="w-[120px] h-[120px]" />
                        </div>
                        <div className="flex items-center py-[30px] h-[74px]">
                            <span className="text-[#363636] font-noto text-[16px] font-bold leading-[27px] text-center">
                                セブンイレブンで印刷する
                            </span>
                        </div>
                    </div>
                </div>
            </main>
            {/* Mobile Main Section */}
            <main className="md:hidden flex flex-col items-center py-[32px] px-[16px] w-full">
                <div className="flex flex-col items-center pb-[16px] gap-[16px] w-full mx-[16px]">
                    <div className="relative flex h-[64px] w-full rounded-[7px]">
                        <img src={hero} alt="hero" className="w-full h-full object-cover object-[50%_32%] rounded-[7px]" />
                        <div className="absolute inset-0 flex-shrink-0 opacity-25 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] rounded-[7px]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white text-center font-noto text-[14px] font-bold leading-[15px]">
                                ネットワークプリントの使い方
                            </h1>
                        </div>
                    </div>
                    <span className="text-center text-[#363636] font-noto text-[14px] font-normal leading-[21px]">ご利用のコンビニエンスストアを選択してください</span>
                </div>
                
                <div className="flex flex-col items-center gap-[10px] w-full mb-[48px]">
                    <div className="flex flex-col items-center px-[24px] w-full shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] rounded-[10px]">
                        <div className="flex py-[30px] justify-between items-center self-stretch">
                            <img src={familymart} alt="familymart" className="w-[90px] h-[90px]" />
                            <img src={lawson} alt="familymart" className="w-[90px] h-[90px]" />
                            <img src={ministop} alt="familymart" className="w-[90px] h-[90px]" />
                        </div>
                        <div className="flex items-center py-[30px] h-[48px]">
                            <span className="text-[#363636] font-noto text-[14px] font-bold leading-[18px] text-center">
                                ファミマ・ローソン・ミニストップで
                                <br />
                                印刷する
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center px-[24px] w-full shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] rounded-[10px]">
                        <div className="flex py-[30px] justify-center items-center self-stretch">
                            <img src={eleven} alt="familymart" className="w-[90px] h-[90px]" />
                        </div>
                        <div className="flex items-center py-[30px] h-[48px]">
                            <span className="text-[#363636] font-noto text-[14px] font-bold leading-[18px] text-center">
                                セブンイレブンで印刷する
                            </span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowToPrint;