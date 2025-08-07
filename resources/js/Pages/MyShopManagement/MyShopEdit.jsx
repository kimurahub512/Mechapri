
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopedit/photo1.png';
import circle_plus from '@/assets/images/shopedit/circle_plus.svg';
import {vwd, vw, responsiveTextD, responsiveMetricD, responsiveText, responsiveMetric, responsivePosition, responsivePositionD} from '@/lib/utils';

const MyShopEdit = () => {
 
    return (
        <>
        <Header/>
        <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
            {/* Sidebar Section */}
            <div className="hidden md:block">
                <ShopSidebar/>
            </div>
            <ShopMobileTopBlock/>
            
            {/* Main Section Frame */}
            <main className="inline-flex flex-col items-start gap-4 mx-4 w-[calc(100vw-32px)] mt-[142px] md:flex md:gap-[22px] md:py-[40px] md:mx-[79px] md:items-start md:self-stretch md:border-none md:bg-transparent md:mt-0 md:w-auto">
                {/* First element: text ショップ情報編集 */}
                <h1 className="text-[#363636] text-left font-['Noto_Sans_JP'] text-[24px] md:text-[36px] font-bold leading-[24px] w-full md:text-left md:leading-[54px]">
                    ショップ情報編集
                </h1>
                
                {/* Second elements frame (frame 2) */}
                <div className="flex flex-col items-center gap-4 px-4 py-5 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch
                    md:flex-row md:w-[874px] md:px-[36px] md:py-[32px] md:justify-center md:items-center md:gap-[10px] md:rounded-none">
                    {/* Inner frame 21 */}
                    <div className="flex flex-col items-center gap-4 w-full md:w-[802px] md:items-start md:gap-[22px] md:flex-shrink-0 ">
                        {/* Frame 211 */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-[802px] md:gap-[4px]">
                            {/* Text and frame 2111 */}
                            <div className="flex flex-row items-end gap-[12px] mt-0 mb-0">
                              <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] pb-2 font-bold leading-[14px] md:text-[21px] md:leading-[27px]">
                                ユーザー画像
                              </span>
                              <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] pb-1 font-normal leading-[21px] tracking-[0.7px] md:text-[16px] md:leading-[24px] md:tracking-normal">
                                (2MBまで)
                              </span>
                            </div>
                            {/* Frame 2111 */}
                            <div className="relative flex flex-col justify-center items-center w-[80px] h-[80px] md:w-[194px] md:h-[194px]">
                              <img
                                src={photo1}
                                alt="User photo"
                                className="w-[80px] h-[80px] object-cover rounded-full opacity-100 md:w-[194px] md:h-[194px] md:rounded-[120px]"
                                style={{
                                  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(' + photo1 + ') lightgray 50% / cover no-repeat'
                                }}
                              />
                              <div className="flex w-[19.794px] h-[19.794px] justify-center items-center absolute right-[30.103px] bottom-[30.103px] opacity-100 md:w-[48px] md:h-[48px] md:left-[73px] md:top-[73px] md:right-auto md:bottom-auto">
                                <img src={circle_plus} alt="Add" className="w-full h-full" />
                              </div>
                            </div>
                          </div>
                        
                        {/* Frame 212 */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-[802px] md:h-[115.99px] md:gap-[4px]">
                            {/* Frame 2121 */}
                            <div className="flex items-center gap-3 pt-3 pb-1.5">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] md:text-[21px] md:leading-[27px]">
                                    ショップのタイトル
                                </span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px] tracking-[0.7px] md:text-[16px] md:leading-[24px] md:tracking-normal">
                                    (20文字まで)
                                </span>
                            </div>
                            {/* Frame 2122 */}
                            <div className="flex flex-col items-start pb-2 w-full">
                                <input
                                    type="text"
                                    placeholder="私のめちゃプリショップ"
                                    className="w-[311px] h-[46px] text-left text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent md:w-[802px] md:h-[45.99px]"
                                />
                            </div>
                        </div>
                        
                        {/* Frame 213 */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-[802px] md:gap-[4px]">
                            {/* Frame 2131 */}
                            <div className="flex items-center gap-3 pt-3 pb-1.5">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] md:text-[21px] md:leading-[27px]">
                                    ショップの紹介文
                                </span>
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px] tracking-[0.7px] md:text-[16px] md:leading-[24px] md:tracking-normal">
                                    (100文字まで)
                                </span>
                            </div>
                            {/* Frame 2132 */}
                            <div className="flex flex-col items-start pb-2 w-full">
                                <textarea
                                    placeholder="入力するとQRコードに表示されてわかりやすくなります"
                                    className="w-[311px] h-[128px] text-left text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal leading-[25.664px] resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent md:w-[802px] md:h-[186px] md:leading-normal"
                                />
                            </div>
                        </div>
                        
                        {/* Frame 214 */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-[802px] md:h-[115.99px] md:gap-[4px]">
                            {/* Frame 2141 */}
                            <div className="flex items-center gap-3 pt-3 pb-1.5">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] md:text-[21px] md:leading-[27px]">
                                    X(旧Twitter)
                                </span>
                            </div>
                            {/* Frame 2142 */}
                            <div className="flex items-center gap-3 w-[311px] pb-2 md:w-[802px] md:gap-[12px] md:pb-[8px]">
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal md:text-[14px]">
                                    @https://x.com/
                                </span>
                                {/* Frame 21423 */}
                                <div className="flex h-[45.99px] flex-col items-start flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="mbneppuri"
                                        className="w-full h-full text-left text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Frame 215 */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-[802px] md:h-[115.99px] md:gap-[4px]">
                            {/* Frame 2151 */}
                            <div className="flex items-center gap-3 pt-3 pb-1.5">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] md:text-[21px] md:leading-[27px]">
                                    Instagram
                                </span>
                            </div>
                            {/* Frame 2152 */}
                            <div className="flex items-center gap-3 w-[311px] pb-2 md:w-[802px] md:gap-[12px] md:pb-[8px]">
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal md:text-[14px]">
                                    @https://instagram.com/
                                </span>
                                {/* Frame 21523 */}
                                <div className="flex h-[45.99px] flex-col items-start flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="mbneppuri"
                                        className="w-full h-full text-left text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Frame 216 */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-[802px] md:h-[115.99px] md:gap-[4px]">
                            {/* Frame 2161 */}
                            <div className="flex items-center gap-3 pt-3 pb-1.5">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] md:text-[21px] md:leading-[27px]">
                                    YouTube
                                </span>
                            </div>
                            {/* Frame 2162 */}
                            <div className="flex items-center gap-3 w-[311px] pb-2 md:w-[802px] md:gap-[12px] md:pb-[8px]">
                                <span className="text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal md:text-[14px]">
                                    @https://youtube.com/
                                </span>
                                {/* Frame 21623 */}
                                <div className="flex h-[45.99px] flex-col items-start flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="mbneppuri"
                                        className="w-full h-full text-left text-[#ACACAC] font-['Noto_Sans_JP'] text-[14px] font-normal border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Frame 217 */}
                        <div className="px-[34px] md:px-0 w-full">
                          <div className="flex w-full h-[60px] p-[2px] justify-center items-center rounded-[8px] bg-[#E9EEF1] md:w-[802px]">
                            <button className="w-full h-full text-[#969696] text-center font-['Noto_Sans_JP'] text-[18px] font-black leading-[21px]">
                              保存する
                            </button>
                          </div>
                        </div>
                        
                        {/* END OF FRAME 21 CONTENT */}
                    </div>
                </div>
            </main>
        </div>
        <Footer/>
        </>
    );
};

export default MyShopEdit;