import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { vw, responsiveMetric, responsivePosition, responsiveText } from '@/lib/utils';
import { vwd, responsiveMetricD, responsivePositionD, responsiveTextD } from '@/lib/utils';
import logo from '@/assets/images/mechapuri_logo.png';
import arrow from '@/assets/images/icon-arrow.svg';
import cart from '@/assets/images/icon-cart.png';
import man from '@/assets/images/icon-man.svg';
import shop from '@/assets/images/Slider_03.svg'
import bell from '@/assets/images/bell.svg'
import '@/../../resources/css/header.css';

const Header = ({ authButton }) => {
  const { auth, cartCount, unreadNotificationCount } = usePage().props;

  return (
    <>
      {/* Desktop header (visible on lg and up) */}
      <div className='hidden md:flex fixed top-0 left-0 right-0 z-[10000] items-center border-b border-[#DCDCDC] bg-white' style={{ ...responsiveMetricD('full', 98) }}>
        <div className='flex flex-row items-center justify-between py-[16px] w-full' style={{ marginLeft: vwd(110), marginRight: vwd(120) }}>
          <a href='/' className='flex items-center'>
            <img src={logo} alt='mechapuri Logo' style={{ ...responsiveMetricD(224, 58) }} />
          </a>
          {auth?.user?.user_type === 'admin' && (
          <a href='/dashboard' className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </a>
          )}
          <div className='flex flex-col items-end' style={{ width: vwd(666) }}>
            <div className='flex flex-row items-center justify-end' style={{ width: vwd(366), gap: vwd(20) }}>
              {/* ログイン: only show if not logged in */}
              {!auth?.user && (
                <li className='inline-block'>
                  <a href='/login' className='flex justify-center items-center rounded-[3px] bg-white border border-gray-300 whitespace-nowrap' style={{ height: vwd(26), ...responsiveTextD(12, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(6), paddingRight: vwd(6), paddingTop: vwd(1.5), paddingBottom: vwd(2.5) }}>
                    ログイン
                  </a>
                </li>
              )}
              {/* 会員登録 or ショップ管理 */}
              {auth?.user ? (
                <li className='inline-block'>
                  <a href='/shop-management' className={`flex flex-row items-center rounded bg-white ${window.location.pathname === '/shop-management' ? ' shopmanagement-nav-active-desktop' : ''}`} style={{ height: vwd(26), ...responsiveTextD(12, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(6), paddingRight: vwd(6), paddingTop: vwd(1.5), paddingBottom: vwd(2.5) }}>
                    <span className='mr-1.5 flex items-center'>
                      <img src={shop} alt="shop" className="w-[22px] h-[18px]" />
                    </span>
                    ショップ管理
                  </a>
                </li>
              ) : (
                <a href='/register' className='flex flex-col justify-center items-center rounded bg-white border border-gray-300 whitespace-nowrap' style={{ height: vwd(26), ...responsiveTextD(12, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(6), paddingRight: vwd(6), paddingTop: vwd(1.5), paddingBottom: vwd(2.5) }}>
                  会員登録
                </a>
              )}
              <a href='/notification' className='flex flex-col justify-center items-center whitespace-nowrap relative' style={{ height: vwd(26), ...responsiveTextD(12, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(6), paddingRight: vwd(6), paddingTop: vwd(1.5), paddingBottom: vwd(2.5) }}>
                お知らせ
                {unreadNotificationCount > 0 && (
                  <div className='absolute -top-2 -right-2 flex items-center justify-center' style={{ ...responsiveMetricD(18, 18), borderRadius: vwd(9), background: '#FF2AA1' }}>
                    <span style={{ ...responsiveTextD(10, 10, null, 'medium', 'noto', '#FFF') }}>{unreadNotificationCount}</span>
                  </div>
                )}
              </a>
              <li className='inline-block'>
                <a href='/myshop/registerproduct' className='flex flex-row items-center rounded bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] justify-center' style={{ ...responsiveMetricD(120, 32), paddingLeft: vwd(12), paddingRight: vwd(12) }}>
                  <img src={arrow} alt="add" className='mr-2.5' style={{ ...responsiveMetricD(16, 16) }} />
                  <span className='text-center block w-full' style={{ ...responsiveTextD(13, 19.5, null, 'black', 'noto', '#FFF') }}>
                    写真を出品
                  </span>
                </a>
              </li>
            </div>
            <ul className='flex flex-row w-full justify-end' style={{ gap: vwd(26) }}>
              <li>
                <a href='/' className='align-middle text-whitewash bg-transparent' style={{ ...responsiveTextD(15, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(7), paddingRight: vwd(7), paddingTop: vwd(5), paddingBottom: vwd(5) }}>ホーム</a>
              </li>
              <li>
                <a href='/favoriteproducts' className='align-middle text-whitewash bg-transparent' style={{ ...responsiveTextD(15, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(7), paddingRight: vwd(7), paddingTop: vwd(5), paddingBottom: vwd(5) }}>お気に入り</a>
              </li>
              <li>
                <a href='/purchasehistory' className='align-middle text-whitewash bg-transparent' style={{ ...responsiveTextD(15, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(7), paddingRight: vwd(7), paddingTop: vwd(5), paddingBottom: vwd(5) }}>購入履歴</a>
              </li>
              <li>
                <a href='/cart' className='align-middle text-whitewash bg-transparent flex items-center whitespace-nowrap relative' style={{ ...responsiveTextD(15, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(7), paddingRight: vwd(7), paddingTop: vwd(5), paddingBottom: vwd(5) }}>
                  <img src={cart} alt='cart' className='mr-2' style={{ ...responsiveMetricD(16, 16) }} />
                  カート
                  {cartCount > 0 && (<div className='flex items-center justify-center' style={{ ...responsiveMetricD(18, 18), borderRadius: vwd(4), background: '#FF2AA1' }}>
                    <span style={{ ...responsiveTextD(10, 10, null, 'medium', 'noto', '#FFF') }}>{cartCount}</span>
                  </div>)}
                </a>
              </li>
              <li>
                <a href='/accountsetting' className='align-middle text-whitewash bg-transparent flex items-center whitespace-nowrap' style={{ ...responsiveTextD(15, 22, null, 'normal', 'noto', '#222'), paddingLeft: vwd(7), paddingRight: vwd(7), paddingTop: vwd(5), paddingBottom: vwd(5) }}>
                  {auth?.user?.image ? (
                    <img
                      src={auth.user.image}
                      alt='user'
                      className='rounded-full object-cover mr-2'
                      style={{ ...responsiveMetricD(24, 24) }}
                    />
                  ) : (
                    <img src={man} alt='man' className='mr-2' style={{ ...responsiveMetricD(16, 16) }} />
                  )}
                  アカウント
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Mobile header (visible below lg) */}
      <div className='md:hidden fixed top-0 left-0 right-0 z-[10000] flex w-full px-2 items-center border-b border-[#DCDCDC] bg-white'>
        {auth?.user ? (
          <div className='flex items-center pt-[7px] pb-[6px] items-center justify-between w-full'>
            <a href='/' className='flex items-center'>
              <img src={logo} alt='shop' style={{ ...responsiveMetric(104, 27) }} />
            </a>
            <div className='flex flex-row gap-[5px] items-center'>
              <a href='/shop-management' className='flex flex-col items-center text-[#222] font-noto text-[10px] font-medium leading-[15px] px-[6px] py-[1.5px] gap-[6px] whitespace-nowrap' style={{ ...responsiveText(10, 15, null, 'medium', 'noto', '#222') }}>
                <img src={shop} alt='shop' style={{ ...responsiveMetric(21, 18) }} />
                ショップ管理
              </a>
              <a href='/notification' className='flex flex-col items-center px-[6px] py-[1.5px] gap-[6px] whitespace-nowrap relative' style={{ ...responsiveText(10, 15, null, 'medium', 'noto', '#222') }}>
                <img src={bell} alt='shop' style={{ ...responsiveMetric(21, 18) }} />
                お知らせ
                {unreadNotificationCount > 0 && (
                  <div className='absolute -top-1 -right-0 flex items-center justify-center' style={{ ...responsiveMetric(16, 18), borderRadius: vw(3), background: '#FF2AA1' }}>
                    <span style={{ ...responsiveText(13, 10, null, 'medium', 'noto', '#FFF') }}>{unreadNotificationCount}</span>
                  </div>
                )}
              </a>
              <div className='flex flex-col items-start justify-center px-[6px] py-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] rounded-[5px]'>
                <a href='/myshop/registerproduct' className='flex flex-col items-center gap-[3px] whitespace-nowrap' style={{ ...responsiveText(10, 19.5, null, 'medium', 'noto', '#FFF') }}>
                  <img src={arrow} alt='shop' style={{ ...responsiveMetric(19, 19) }} />
                  写真を出品
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center pt-[17px] pb-[19px] items-center justify-between w-full'>
            <a href='/' className='flex items-center'>
              <img src={logo} alt='shop' style={{ ...responsiveMetric(104, 27) }} />
            </a>
            <div className='flex flex-row gap-[5px] items-center'>
              <a href='/login' className='flex items-center px-[6px] py-[1.5px] border border-[#E9EEF1] rounded-[3px] whitespace-nowrap' style={{ ...responsiveText(10, 15, null, 'medium', 'noto', '#222') }}>ログイン</a>
              <a href='/register' className='flex items-center px-[6px] py-[1.5px] border border-[#E9EEF1] rounded-[3px] whitespace-nowrap' style={{ ...responsiveText(10, 15, null, 'medium', 'noto', '#222') }}>会員登録</a>
              <a href='/notification' className='flex items-center px-[6px] py-[1.5px] border border-[#E9EEF1] rounded-[3px] whitespace-nowrap' style={{ ...responsiveText(10, 15, null, 'medium', 'noto', '#222') }}>お知らせ</a>
              <a href='/' className='flex items-center px-[6px] py-[1.5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] rounded-[5px] whitespace-nowrap' style={{ ...responsiveText(10, 19.5, null, 'medium', 'noto', '#FFF') }}>写真を出品</a>
            </div>
          </div>)
        }
      </div>
    </>
  );
}

export default Header;