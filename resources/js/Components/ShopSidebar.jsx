import React from 'react';
import default_user from '@/assets/images/default-user.png';
import pen_paper from '@/assets/images/pen_paper.svg';
import shop from '@/assets/images/Slider_03.svg';
import select_multiple from '@/assets/images/select_multiple.svg';
import cart2 from '@/assets/images/cart2.svg';
import p_circle from '@/assets/images/p_circle.svg';
import clock_pink from '@/assets/images/clock_pink.svg';
import file_add from '@/assets/images/file_add.svg';
import { vwd, responsiveTextD, responsiveMetricD, responsivePositionD } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

const ShopSidebar = () => {
  const { auth } = usePage().props;
  console.log(auth);
  const isShopManagement = window.location.pathname === '/shop-management';
  const isMyShopEdit = window.location.pathname === '/myshop/edit';
  const isMyContents = window.location.pathname === '/myshop/contents';
  const isTransaction = window.location.pathname === '/myshop/transaction';
  const isSalesHistory = window.location.pathname === '/myshop/salpeshistory';
  const isCategory = window.location.pathname === '/myshop/category';
  return (
    <aside className="hidden md:flex flex-col border-r border-[#E9E9E9]" style={{ width: vwd(300), paddingTop: vwd(170) }}>
      <div className="flex flex-col rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)]" style={{ padding: vwd(32), width: vwd(232), marginLeft: vwd(68) }}>
        <div className="flex flex-col items-center border-b-[0.999px] border-[#E9E9E9]" style={{ gap: vwd(16), paddingBottom: vwd(16) }}>
          <img
            style={{ ...responsiveMetricD(96, 96), borderRadius: vwd(76), objectFit: 'cover' }}
            src={auth?.user?.image || default_user}
            alt="Shop Hero"
          />
          <div style={{ ...responsiveTextD(21, 24), fontWeight: 700, color: '#222', textAlign: 'center' }}>{auth?.user?.name}’s SHOP</div>
          <a href="/shoptop" className="flex items-center justify-center w-full border-[1px] border-[#FF8D4E] text-center" style={{ ...responsiveTextD(12, 18, null, 'bold', 'noto', '#E358A6'), height: vwd(34), borderRadius: vwd(5) }}>自分のショップを見る</a>
          <div className="w-full" style={{ gap: vwd(10) }}>
            <a href="/myshop/edit"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: vwd(10),
                width: '100%',
                paddingTop: vwd(12),
                paddingBottom: vwd(12),
                paddingLeft: vwd(12),
                paddingRight: vwd(12),
                borderRadius: vwd(8),
                background: isMyShopEdit ? '#FFEFF8' : 'transparent'
              }}
            >
              <img src={pen_paper} alt="Edit" style={{ ...responsiveMetricD(16, 16), filter: !isMyShopEdit ? 'brightness(0) saturate(100%) invert(0)' : '' }} />
              <span style={{
                fontWeight: 500,
                fontSize: vwd(13),
                lineHeight: vwd(19.5),
                color: isMyShopEdit ? '#E358A6' : '#222',
                whiteSpace: 'nowrap'
              }}>ショップ情報編集</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col" style={{paddingTop: vwd(24), paddingBottom: vwd(24)}}>
        <a href="/shop-management" >
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: vwd(10),
              width: '100%',
              paddingTop: vwd(12),
              paddingBottom: vwd(12),
              paddingLeft: vwd(12),
              paddingRight: vwd(12),
              borderRadius: vwd(8),
              background: isShopManagement ? '#FF2AA1' : 'transparent'
            }}>
              <svg viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                color: isShopManagement ? '#FFF' : '#E358A6',
                ...responsiveMetricD(16, 16)
              }}>
                <path d="M8.77279 15.0004H17.9395M2.93945 15.0004H5.43945M5.43945 15.0004V16.6671M5.43945 15.0004V13.3337M17.1061 10.0004H17.9395M2.93945 10.0004H13.7728M13.7728 10.0004V11.6671M13.7728 10.0004V8.33374M12.1061 5.00041H17.9395M2.93945 5.00041H8.77279M8.77279 5.00041V6.66707M8.77279 5.00041V3.33374" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{
                fontWeight: 500,
                fontSize: vwd(13),
                lineHeight: vwd(19.5),
                color: isShopManagement ? '#FFF' : '#222',
                whiteSpace: 'nowrap'
              }}>ショップ管理トップ</span>
            </div>
          </a>
          <a href="/myshop/contents" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: vwd(10),
              width: '100%',
              paddingTop: vwd(12),
              paddingBottom: vwd(12),
              paddingLeft: vwd(12),
              paddingRight: vwd(12),
              borderRadius: vwd(8),
              background: isMyContents ? '#FF2AA1' : 'transparent'
            }}>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  ...responsiveMetricD(16, 16),
                  filter: isMyContents ? 'brightness(0) invert(1)' : ''
                }}
              >
                <mask id="mask0" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                  <g clipPath="url(#clip0)">
                    <g clipPath="url(#clip1)">
                      <mask id="mask1" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                        <path
                          d="M2 6.94141V13.8747C2 14.2481 2 14.4347 2.07266 14.5773C2.13658 14.7027 2.23849 14.8049 2.36393 14.8688C2.5064 14.9414 2.693 14.9414 3.06564 14.9414H10.0001M11.3333 6.27474L8.66667 8.94141L7.33333 7.60807M4.66667 10.1415V5.07487C4.66667 4.32813 4.66667 3.95449 4.81199 3.66927C4.93982 3.41839 5.14365 3.21456 5.39453 3.08673C5.67975 2.94141 6.05339 2.94141 6.80013 2.94141H11.8668C12.6135 2.94141 12.9867 2.94141 13.2719 3.08673C13.5228 3.21456 13.727 3.41839 13.8548 3.66927C14.0001 3.95448 14.0001 4.32787 14.0001 5.07459L14.0001 10.1413C14.0001 10.888 14.0001 11.2614 13.8548 11.5466C13.727 11.7975 13.5228 12.0017 13.2719 12.1296C12.987 12.2747 12.6143 12.2747 11.869 12.2747H6.79794C6.05266 12.2747 5.67947 12.2747 5.39453 12.1296C5.14365 12.0017 4.93982 11.7975 4.81199 11.5467C4.66667 11.2614 4.66667 10.8883 4.66667 10.1415Z"
                          stroke={isMyContents ? "#fff" : "#FF2AA1"}
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask1)">
                        <rect y="0.941406" width="16" height="16" fill={isMyContents ? "#fff" : "url(#paint0_linear)"} />
                      </g>
                    </g>
                  </g>
                </mask>
                <g mask="url(#mask0)">
                  <rect y="0.941406" width="16" height="16" fill={isMyContents ? "#fff" : "url(#paint1_linear)"} />
                </g>
                <defs>
                  <linearGradient id="paint0_linear" x1="16" y1="8.86934" x2="0" y2="8.86934" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1" />
                    <stop offset="1" stopColor="#AB31D3" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="0" y1="0.941406" x2="16" y2="16.9414" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF8D4E" />
                    <stop offset="1" stopColor="#EA2CE2" />
                  </linearGradient>
                  <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.941406)" />
                  </clipPath>
                  <clipPath id="clip1">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.941406)" />
                  </clipPath>
                </defs>
              </svg>
              <span style={{
                fontWeight: 500,
                fontSize: vwd(13),
                lineHeight: vwd(19.5),
                color: isMyContents ? '#fff' : '#222',
                whiteSpace: 'nowrap'
              }}>商品管理</span>
            </div>
          </a>
          <a href="/myshop/category" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: vwd(10),
              width: '100%',
              paddingTop: vwd(12),
              paddingBottom: vwd(12),
              paddingLeft: vwd(12),
              paddingRight: vwd(12),
              borderRadius: vwd(8),
              background: isCategory ? '#FF2AA1' : 'transparent'
            }}>
              <img src={cart2} alt="Category" style={{ 
                ...responsiveMetricD(16, 16),
                filter: isCategory ? 'brightness(0) invert(1)' : ''
              }} />
              <span style={{
                fontWeight: 500,
                fontSize: vwd(13),
                lineHeight: vwd(19.5),
                color: isCategory ? '#fff' : '#222',
                whiteSpace: 'nowrap'
              }}>商品カテゴリ</span>
            </div>
          </a>
          <a href="/myshop/transaction" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: vwd(10),
              width: '100%',
              paddingTop: vwd(12),
              paddingBottom: vwd(12),
              paddingLeft: vwd(12),
              paddingRight: vwd(12),
              borderRadius: vwd(8),
              background: isTransaction ? '#FF2AA1' : 'transparent'
            }}>
              <img src={p_circle} alt="Payout" style={{ 
                ...responsiveMetricD(16, 16),
                filter: isTransaction ? 'brightness(0) invert(1)' : ''
              }} />
              <span style={{
                fontWeight: 500,
                fontSize: vwd(13),
                lineHeight: vwd(19.5),
                color: isTransaction ? '#fff' : '#222',
                whiteSpace: 'nowrap'
              }}>出金・売上</span>
            </div>
          </a>
          <a href="/myshop/saleshistory" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: vwd(10),
              width: '100%',
              paddingTop: vwd(12),
              paddingBottom: vwd(12),
              paddingLeft: vwd(12),
              paddingRight: vwd(12),
              borderRadius: vwd(8),
              background: isSalesHistory ? '#FF2AA1' : 'transparent'
            }}>
              <img src={clock_pink} alt="History" style={{ 
                ...responsiveMetricD(16, 16),
                filter: isSalesHistory ? 'brightness(0) invert(1)' : ''
              }} />
              <span style={{
                fontWeight: 500,
                fontSize: vwd(13),
                lineHeight: vwd(19.5),
                color: isSalesHistory ? '#fff' : '#222',
                whiteSpace: 'nowrap'
              }}>販売履歴</span>
            </div>
          </a>
          <a href="/myshop/registerproduct" className="flex flex-row items-center justify-center bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]" style={{...responsiveMetricD('full', 35), gap: vwd(10), borderRadius: vwd(8)}}>
            <img src={file_add} alt="Add" style={{...responsiveMetricD(16, 16)}} />
            <span style={{...responsiveTextD(13, 19.5, null, 'black', 'noto', '#fff')}}>写真を商品登録</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar; 