import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { responsiveMetric, responsivePosition, responsiveText } from '@/lib/utils';
import logo from '@/assets/images/mechapuri_logo.png';
import arrow from '@/assets/images/icon-arrow.svg';
import cart from '@/assets/images/icon-cart.svg';
import man from '@/assets/images/icon-man.svg';
import shop from '@/assets/images/Slider_03.svg'
import bell from '@/assets/images/bell.svg'
import '@/../../resources/css/header.css';

const Header = ({ authButton }) => {
  const { auth } = usePage().props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop header (visible on lg and up) */}
      <div className='hidden lg:flex items-center w-full max-w-[1920px] mx-auto border-b border-[#DCDCDC] bg-white'>
        <div className='flex items-center lg:ml-[10%]'>
          <a href='/' className='flex items-center'>
            <img src={logo} className='desktop-header-logo' alt='mechapuri Logo' />
          </a>
          <div className='mobile-header-logo-spacer flex lg:hidden' />
          {/* Desktop nav */}
          <div className='hidden lg:flex items-center'>
            {/* Place your desktop nav items here, e.g. login, shop manage, notifications, etc. */}
          </div>
          {/* Mobile nav removed here to prevent double rendering and overflow */}
        </div>
        <div className='flex-1'></div>
        <div className='flex items-center lg:mr-[7%] lg:mt-5 hidden lg:flex'>
          <div className='flex items-center relative z-40 lg:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 bg-transparent'
              aria-controls='mobile-menu-2'
              aria-expanded={isMobileMenuOpen}
            >
              <span className='sr-only'>Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd'></path></svg>
              ) : (
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
              )}
            </button>
          </div>
          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} absolute lg:relative top-0 left-0 right-0 justify-between items-start w-full lg:flex lg:flex-col lg:w-auto lg:order-1 rounded-tl-2xl bg-navy-sky lg:bg-transparent h-svh lg:h-auto px-4 lg:px-0 pt-4 lg:pt-0`} id='mobile-menu-2'>
            <ul className='hidden lg:flex flex-row lg:ml-auto gap-5 items-center'>
              {/* ログイン: only show if not logged in */}
              {!auth?.user && (
                <li className='inline-block'>
                  <a href='/login' className='flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-col justify-center items-center rounded bg-white text-[#222] font-noto text-xs font-normal leading-[22px] border border-gray-300'>
                    ログイン
                  </a>
                </li>
              )}
              {/* 会員登録 or ショップ管理 */}
              {auth?.user ? (
                <li className='inline-block'>
                  <a href='/shop-management' className={`flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-row items-center rounded bg-white text-[#222] font-noto text-xs font-normal leading-[22px]${window.location.pathname === '/shop-management' ? ' shopmanagement-nav-active-desktop' : ''}`}>
                    <span className='mr-1.5 flex items-center'>
                      <img src={shop} alt="shop" className="w-[22px] h-[18px]" />
                    </span>
                    ショップ管理
                  </a>
                </li>
              ) : (
                <li className='inline-block'>
                  <a href='/register' className='flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-col justify-center items-center rounded bg-white text-[#222] font-noto text-xs font-normal leading-[22px] border border-gray-300'>
                    会員登録
                  </a>
                </li>
              )}
              <li className='inline-block'>
                <a href='/notification' className='flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-col justify-center items-center rounded text-[#222] font-noto text-xs font-normal leading-[22px]'>
                  お知らせ
                </a>
              </li>
              <li className='inline-block'>
                <div className='flex flex-row items-center w-[120px] h-[32px] rounded bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] justify-center px-3'>
                  <img src={arrow} alt="add" className='w-4 h-4 mr-2.5' />
                  <span className='text-white text-center font-noto text-[13px] font-black leading-[19.5px] block w-full'>
                    写真を出品
                  </span>
                </div>
              </li>
            </ul>

            <ul className='flex flex-col justify-between mt-2 font-medium lg:flex-row lg:gap-[20px] lg:mt-0'>
              <li>
                <a href='/' className='inline-block lg:block font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-4 pl-3 text-whitewash bg-transparent'>ホーム</a>
              </li>
              <li>
                <a href='/favoriteproducts' className='inline-block lg:block font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-4 pl-3 text-whitewash bg-transparent'>お気に入り</a>
              </li>
              <li>
                <a href='/purchasehistory' className='inline-block lg:block font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-4 pl-3 text-whitewash bg-transparent'>購入履歴</a>
              </li>
              <li>
                <a href='/cart' className='font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-2 pl-2 text-whitewash bg-transparent flex items-center whitespace-nowrap'>
                  <img src={cart} alt='cart' className='w-4 h-4 mr-2' />
                  カート
                </a>
              </li>
              <li>
                <a href='/accountsetting' className='font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-2 pl-2 text-whitewash bg-transparent flex items-center whitespace-nowrap'>
                  {auth?.user?.image ? (
                    <img
                      src={auth.user.image.startsWith('http') ? auth.user.image : `/storage/${auth.user.image}`}
                      alt='user'
                      className='w-6 h-6 rounded-full object-cover mr-2'
                    />
                  ) : (
                    <img src={man} alt='man' className='w-4 h-4 mr-2' />
                  )}
                  アカウント
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Mobile header (visible below lg) */}
      <div className='md:hidden flex w-full px-2 items-center border-b border-[#DCDCDC] bg-white'>
        {auth?.user ? (
          <div className='flex items-center pt-[7px] pb-[6px] items-center justify-between w-full'>
            <a href='/' className='flex items-center'>
              <img src={logo} alt='shop' style={{...responsiveMetric(104, 27)}} />
            </a>
            <div className='flex flex-row gap-[5px] items-center'>
              <a href='/shop-management' className='flex flex-col items-center text-[#222] font-noto text-[10px] font-medium leading-[15px] px-[6px] py-[1.5px] gap-[6px] whitespace-nowrap' style={{...responsiveText(10, 15, null, 'medium', 'noto', '#222')}}>
                <img src={shop} alt='shop' style={{...responsiveMetric(21, 18)}} />
                ショップ管理
              </a>
              <a href='/notification' className='flex flex-col items-center px-[6px] py-[1.5px] gap-[6px] whitespace-nowrap' style={{...responsiveText(10, 15, null, 'medium', 'noto', '#222')}}>
                <img src={bell} alt='shop' style={{...responsiveMetric(21, 18)}} />
                お知らせ
              </a>
              <div className='flex flex-col items-start justify-center px-[6px] py-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] rounded-[5px]'>
                <a href='/upload' className='flex flex-col items-center gap-[3px] whitespace-nowrap' style={{...responsiveText(10, 19.5, null, 'medium', 'noto', '#FFF')}}>
                  <img src={arrow} alt='shop' style={{...responsiveMetric(19, 19)}} />
                  写真を出品
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center pt-[17px] pb-[19px] items-center justify-between w-full'>
            <a href='/' className='flex items-center'>
              <img src={logo} alt='shop' style={{...responsiveMetric(104, 27)}}/>
            </a>
            <div className='flex flex-row gap-[5px] items-center'>
              <a href='/login' className='flex items-center px-[6px] py-[1.5px] border border-[#E9EEF1] rounded-[3px] whitespace-nowrap' style={{...responsiveText(10, 15, null, 'medium', 'noto', '#222')}}>ログイン</a>
              <a href='/register' className='flex items-center px-[6px] py-[1.5px] border border-[#E9EEF1] rounded-[3px] whitespace-nowrap' style={{...responsiveText(10, 15, null, 'medium', 'noto', '#222')}}>会員登録</a>
              <a href='/notification' className='flex items-center px-[6px] py-[1.5px] border border-[#E9EEF1] rounded-[3px] whitespace-nowrap' style={{...responsiveText(10, 15, null, 'medium', 'noto', '#222')}}>お知らせ</a>
              <a href='/' className='flex items-center px-[6px] py-[1.5px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] rounded-[5px] whitespace-nowrap' style={{...responsiveText(10, 19.5, null, 'medium', 'noto', '#FFF')}}>写真を出品</a>
            </div>
          </div>)
        }
      </div>
    </>
  );
}

export default Header;