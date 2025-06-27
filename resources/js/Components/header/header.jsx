import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import logo from '@/assets/images/mechapuri-logo.svg';
import arrow from '@/assets/images/icon-arrow.svg';
import cart from '@/assets/images/icon-cart.svg';
import man from '@/assets/images/icon-man.svg';

const Header = ({ authButton }) => {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  
    
    return (
      <>
        <header className='flex flex-col relative'>
          <div className='w-full bg-transparent'>
            <div className='flex items-center w-full max-w-[1920px] mx-auto'>
              <div className='flex items-center lg:ml-[10%]'>
                <a href='/' className='flex items-center'>
                  <img src={logo} className='w-[202.849px] h-[36px] flex-shrink-0' alt='mechapuri Logo' />
                </a>
              </div>
              <div className='flex-1'></div>
              <div className='flex items-center lg:mr-[7%] lg:mt-5'>
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
                      <li className='inline-block'>
                        <div className='flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-col justify-center items-center rounded bg-white text-[#222] font-noto text-xs font-normal leading-[22px]'>
                          ログイン
                        </div>
                      </li>
                    <li className='inline-block'>
                      <div className='flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-col justify-center items-center rounded bg-white text-[#222] font-noto text-xs font-normal leading-[22px]'>
                        会員登録
                      </div>
                    </li>                    
                    <li className='inline-block'>
                      <div className='flex h-[26px] px-[6px] py-[1.5px] pb-[2.5px] flex-col justify-center items-center rounded text-[#222] font-noto text-xs font-normal leading-[22px]'>
                        お知らせ
                      </div>
                    </li>
                    <li className='inline-block'>
                      <div className='flex flex-row items-center w-[120px] h-[32px] rounded bg-gradient-to-r from-[#FF8D4E] to-[#EA2CE2] justify-center px-3'>
                        <img src={arrow} alt="arrow" className='w-4 h-4 mr-2.5' />
                        <span className='text-white text-center font-noto text-[13px] font-black leading-[19.5px] block w-full'>
                          写真を出品
                        </span>
                      </div>
                    </li>
                  </ul>
        
                  <ul className='flex flex-col justify-between mt-2 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                    <li>
                      <a href='/' className='inline-block lg:block font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-4 pl-3 text-whitewash bg-transparent'>ホーム</a>
                    </li>
                    <li>
                      <a href='how-it-works' className='inline-block lg:block font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-4 pl-3 text-whitewash font-semibold bg-transparent uppercase' aria-current='page'>お気に入り</a>
                    </li>
                    <li>
                      <a href='/about' className='inline-block lg:block font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-4 pl-3 text-whitewash font-semibold bg-transparent uppercase'>購入履歴</a>
                    </li>
                    <li>
                      <a href='/about' className='font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-2 pl-2 text-whitewash bg-transparent flex items-center w-[120px] justify-end whitespace-nowrap'>
                        <img src={cart} alt='cart' className='w-4 h-4 mr-2' />
                        カート
                      </a>
                    </li>
                    <li>
                      <a href='/about' className='font-1 font-normal text-[15px] leading-[22px] tracking-normal align-middle py-4 lg:py-2 pr-2 pl-2 text-whitewash bg-transparent flex items-center w-[120px] justify-end whitespace-nowrap'>
                        <img src={man} alt='man' className='w-4 h-4 mr-2' />
                        アカウント
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
  
  export default Header;