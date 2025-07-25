
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import TabButtons from '@/Components/TabButtons';
import TabButtonsDesktop from '@/Components/TabButtonsDesktop';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import heart from '@/assets/images/heart_pink.svg';
import girl from '@/assets/images/favoriteproducts/girl.svg';

const FavoriteProducts = () => {
  const [activeTab, setActiveTab] = useState('favorite'); // or 'follow'

  const handleTabChange = (tabId) => {
    if (tabId === 'follow') {
      router.visit('/favoriteshops');
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      {/* Main Section */}
      <main className="hidden md:flex flex-col items-center self-stretch h-[1020px] pb-[60px] bg-white ">
        {/* Frame 1 */}
        <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[32px] ">
          {/* Frame 11 */}
          <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1]">
            <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-['Noto Sans JP'] self-stretch">お気に入り</h1>
          </div>
          {/*frame 13*/}
          <TabButtonsDesktop
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            tabs={[
              {
                id: 'follow',
                label: 'フォロー中ショップ',
                textSize: 'text-[14px] leading-[24px]'
              },
              {
                id: 'favorite',
                label: 'お気に入り商品',
                textSize: 'text-[14px] leading-[16.1px]'
              }
            ]}
          />
          {/* Frame 12 */}
          <div className="flex flex-col items-start self-stretch">
            {activeTab === 'favorite' ? (
              /* Favorite Products Content */
              <>
                {/*frame 121, 122, 123 */}
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] relative">
                    <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                      <img src={photo1} alt="notification" />
                    </div>
                    {/* Info Block */}
                    <div className="flex flex-col h-[118px] pr-[32px] justify-between items-start flex-1">
                      {/* 1211: Title&Badge and User Info stacked */}
                      <div className="flex flex-col ">
                        {/* Title & Badge */}
                        <div className="inline-flex items-center gap-2">
                          <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-['Noto Sans JP']">郊外のカフェにて</span>
                          <span className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] text-white font-bold text-[13px] leading-[15px] font-['Noto Sans JP']">3枚セット</span>
                        </div>
                        {/* 12121: User Info */}
                        <div className="inline-flex h-[32px] p-[6px_0] flex-row items-center flex-shrink-0 rounded-[3px]">
                          <img src={girl} alt="girl" className="w-[24px] h-[24px] flex-shrink-0 rounded-full object-cover bg-gray-200" />
                          <span className="ml-2 text-[#222] font-noto text-[16px] leading-[22px] font-normal">anchly1005</span>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="inline-flex items-center gap-[2px] mt-2">
                        <span className="text-[#363636] font-medium text-[24px] leading-[40px] font-['Noto Sans JP'] ">0</span><span className="text-[#363636] font-medium text-[14px] leading-[32px] font-['Noto Sans JP'] mt-[6px]">円</span>
                      </div>
                    </div>
                    {/* 1213: Date and Favorite */}
                    <div className="inline-flex flex-col items-center gap-[10px] mt-[24px] mr-[62px]">
                      <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25.2px]">2025/10/05まで</span>
                      <div className="flex flex-ro items-center gap-[4px] h-[36px] p-[8px] rounded-[6px] border border-[#FF2AA1] bg-white">
                        <img src={heart} alt="heart" className="w-[17px] h-[15.867px] flex-shrink-0" />
                        <span className="text-[#FF2AA1] mt-[-2px] font-noto font-bold text-[12px] leading-[21px]">お気に入り</span>
                        <span className="text-[#FF2AA1] mt-[2px] font-['Red Hat Display'] font-bold text-[14px] leading-[15px]">1000</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* Favorite Shops Content */
              <>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] relative">
                    <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                      <img src={photo1} alt="shop" />
                    </div>
                    {/* Shop Info Block */}
                    <div className="flex flex-col h-[118px] pr-[32px] justify-between items-start flex-1">
                      {/* Shop Name */}
                      <div className="flex flex-col">
                        <span className="text-[#363636] font-medium text-[21px] leading-[31.5px] font-['Noto Sans JP']">カフェ・ド・パリ</span>
                        <span className="text-[#767676] font-noto text-[14px] leading-[22px] mt-[4px]">東京都渋谷区</span>
                      </div>
                      {/* Shop Stats */}
                      <div className="flex items-center gap-[16px] mt-2">
                        <span className="text-[#363636] font-medium text-[16px] leading-[24px] font-['Noto Sans JP']">フォロワー: 1,234</span>
                        <span className="text-[#363636] font-medium text-[16px] leading-[24px] font-['Noto Sans JP']">商品: 56</span>
                      </div>
                    </div>
                    {/* Follow Button */}
                    <div className="inline-flex flex-col items-center gap-[10px] mt-[24px] mr-[62px]">
                      <button className="flex items-center gap-[4px] h-[36px] px-[16px] rounded-[6px] border border-[#FF2AA1] bg-white text-[#FF2AA1] font-noto font-bold text-[12px] leading-[21px]">
                        フォロー中
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div >
      </main >
      {/* Mobile Main Section */}
      <main className="flex md:hidden flex-col items-center self-stretch w-full bg-white">
        {/* Title (mobile) */}
        <div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1] w-full">
          <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">お気に入り</h1>
        </div>
        {/* Frame 13 (mobile) */}
        <TabButtons
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          tabs={[
            {
              id: 'follow',
              label: 'フォロー中ショップ',
              textSize: 'text-[14px] leading-[24px]',
              whitespace: 'whitespace-nowrap'
            },
            {
              id: 'favorite',
              label: 'お気に入り商品',
              textSize: 'text-[12px] leading-[16.1px]'
            }
          ]}
          className="mt-[24px]"
        />
        {/* Frame 12 (mobile) */}
        <div className="flex flex-col items-start w-full self-stretch mt-[16px]">
          {activeTab === 'favorite' ? (
            /* Favorite Products Content (Mobile) */
            <>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4 items-start w-full border-b border-[#E9E9E9] relative pt-[16px]">
                  {/* Image */}
                  <div className="flex w-[74px] h-[74px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6] ml-[16px]">
                    <img src={photo1} alt="notification" />
                  </div>
                  {/* Info Block and 1213 in a column, w-full */}
                  <div className="flex flex-col items-start w-full">
                    {/* Info Block (stacked) */}
                    <div className="flex flex-col items-start flex-1 min-w-0 gap-[4px]">
                      {/* Title */}
                      <span className="self-stretch text-[#000] font-noto text-[14px] font-normal leading-[21px] truncate overflow-hidden text-ellipsis">郊外のカフェにて</span>
                      {/* Badge */}
                      <div className="flex items-center gap-[4px] px-[8px] py-[2px] rounded-[30px] bg-[#FF2AA1]">
                        <span className="text-white font-noto text-[12px] font-bold leading-[15px]">3枚セット</span>
                      </div>
                      {/* User Info */}
                      <div className="flex items-center gap-[8px] mt-[2px]">
                        <img src={girl} alt="girl" className="w-[20px] h-[20px] rounded-full object-cover bg-gray-200" />
                        <span className="text-[#222] font-noto text-[14px] font-normal leading-[22px]">anchly1005</span>
                      </div>
                      {/* Price */}
                      <div className="flex items-center gap-[2px] mt-[2px]">
                        <span className="flex w-[11px] h-[20px] items-center justify-center text-[#363636] font-noto text-[18px] font-bold leading-[40px]">0</span>
                        <span className="text-[#363636] mt-[4px] font-noto text-[12px] font-bold leading-[32px]">円</span>
                      </div>
                    </div>
                    {/* 1213: Date and Favorite */}
                    <div className="flex flex-row items-center mt-[8px] gap-[8px]  mb-[6px]">
                      <span className="text-[#363636] font-noto text-[14px] font-medium leading-[25.2px]">2025/10/05まで</span>
                      {/* 12131: Heart, お気に入り, 1000 */}
                      <div className="flex flex-row items-center gap-[4px] h-[36px] p-[8px] rounded-[6px] border border-[#FF2AA1] bg-white">
                        <img src={heart} alt="heart" className="w-[18px] h-[18px] object-contain" />
                        <span className="text-[#FF2AA1] mt-[-2px] font-noto text-[12px] font-bold leading-[21px]">お気に入り</span>
                        <span className="text-[#FF2AA1] mt-[2px] font-['Red Hat Display'] text-[14px] font-bold leading-[15px]">1000</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* Favorite Shops Content (Mobile) */
            <>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4 items-start w-full border-b border-[#E9E9E9] relative pt-[16px]">
                  {/* Image */}
                  <div className="flex w-[74px] h-[74px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6] ml-[16px]">
                    <img src={photo1} alt="shop" />
                  </div>
                  {/* Shop Info Block */}
                  <div className="flex flex-col items-start w-full">
                    {/* Shop Info (stacked) */}
                    <div className="flex flex-col items-start flex-1 min-w-0 gap-[4px]">
                      {/* Shop Name */}
                      <span className="self-stretch text-[#000] font-noto text-[14px] font-normal leading-[21px] truncate overflow-hidden text-ellipsis">カフェ・ド・パリ</span>
                      {/* Location */}
                      <span className="text-[#767676] font-noto text-[12px] leading-[18px]">東京都渋谷区</span>
                      {/* Shop Stats */}
                      <div className="flex items-center gap-[12px] mt-[2px]">
                        <span className="text-[#363636] font-noto text-[12px] leading-[18px]">フォロワー: 1,234</span>
                        <span className="text-[#363636] font-noto text-[12px] leading-[18px]">商品: 56</span>
                      </div>
                    </div>
                    {/* Follow Button */}
                    <div className="flex flex-row items-center mt-[8px] gap-[8px] mb-[6px]">
                      <button className="flex items-center gap-[4px] h-[36px] px-[16px] rounded-[6px] border border-[#FF2AA1] bg-white text-[#FF2AA1] font-noto font-bold text-[12px] leading-[21px]">
                        フォロー中
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
      <Footer />
      {/* Mobile Main Section */}
    </div >
  );
};

export default FavoriteProducts;