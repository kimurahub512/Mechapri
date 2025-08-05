import React from 'react';
import logo from '@/assets/images/mechapuri-logo.svg';
import footerSvg2 from '@/assets/images/instagram.svg';
import xLogo from '@/assets/images/x_logo.svg';
import copy from '@/assets/images/copy.svg';
import home from '@/assets/images/home.svg';
import heart from '@/assets/images/heart.svg';
import clock from '@/assets/images/clock.svg';
import man_mobile from '@/assets/images/man2.svg';
import cart from '@/assets/images/icon-cart.svg';
import { vw, responsiveText, responsiveMetric, responsivePosition, responsiveTextD, responsiveMetricD, vwd, responsivePositionD } from '@/lib/utils';


import '@/../../resources/css/footer.css';

const Footer = () => {
  return (
    <footer className="mechapuri-footer" style={{marginTop: vwd(80)}}>
      {/* Desktop Section */}
      <div className="hidden md:block w-full" style={{height: vwd(443), paddingTop: vwd(99), paddingRight: vwd(141), paddingBottom: vwd(16), paddingLeft: vwd(99)}}>
        <div className="w-full h-full relative">
          <img
            src={logo}
            alt="Mechapuri Logo"
            className='invert'
            style={{...responsiveMetricD(202, 36), ...responsivePositionD(0, 0, null)}}
          />
          <div className="flex flex-row" style={{...responsivePositionD(52, 42), gap: vwd(6)}}>
            <img
              src={xLogo}
              alt="X Logo"
              style={{...responsiveMetricD(28, 28)}}
            />
            <img
              src={footerSvg2}
              alt="Footer SVG"
              style={{...responsiveMetricD(28, 28)}}
            />
          </div>
          <div className="flex flex-col items-start" style={{...responsivePositionD(0, 813), gap: vwd(32)}}>
            <div style={{...responsiveTextD(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>出品をはじめる</div>
            <div style={{...responsiveTextD(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>おすすめショップ</div>
            <div style={{...responsiveTextD(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>プライベート印刷</div>
          </div>
          <div className="flex flex-col items-start" style={{...responsivePositionD(0, 1018), gap: vwd(32)}}>
            <div style={{...responsiveTextD(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>
              ご利用について
            </div>
            <div className="flex flex-col" style={{gap: vwd(12)}}>
              <div className='whitespace-nowrap' style={{...responsiveTextD(13, 20, null, 'semibold', 'noto', '#FFF')}}>
                ネットワークプリントの使い方
              </div>
              <div className='whitespace-nowrap' style={{...responsiveTextD(13, 20, null, 'semibold', 'noto', '#FFF')}}>
                X連携の権限について
              </div>
              <div className="flex flex-row items-center gap-[2px]">
                <img
                  src={copy}
                  alt="Copy"
                  className='invert'
                  style={{...responsiveMetricD(10, 10)}}
                />
                <div style={{...responsiveTextD(13, 20, null, 'semibold', 'noto', '#FFF')}}>
                  お問い合わせ
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#D1D1D1]" style={{...responsivePositionD(237, 0)}} />
          {/* List Frame */}
          <div className="flex flex-row w-full" style={{...responsivePositionD(268, 0, null), gap: vwd(25), paddingTop: vwd(10), paddingBottom: vwd(31)}}>
            {/* First item */}
            <div className="flex flex-row items-center gap-[8px]">
              <img
                src={copy}
                alt="Copy"
                className='invert'
                style={{...responsiveMetricD(10, 10)}}
              />
              <div className='whitespace-nowrap' style={{...responsiveTextD(12, 18, null, 'medium', 'noto', '#FFF')}}>
                運営企業
              </div>
            </div>
            {/* Second item */}
            <div className="flex flex-row items-center gap-[2px]">
              <img
                src={copy}
                alt="Copy"
                className='invert'
                style={{...responsiveMetricD(10, 10)}}
              />
              <a 
                href='https://docs.google.com/document/d/1NyyD2l-rxopttri62aqZ1Ux83WfLozT03O1Ysp4SV0E/edit?usp=sharing' 
                target="_blank" 
                rel="noopener noreferrer"
                className='whitespace-nowrap hover:opacity-80 transition-opacity' 
                style={{...responsiveTextD(12, 18, null, 'medium', 'noto', '#FFF')}}
              >
                特定商取引法に基づく表示
              </a>
            </div>
            {/* Third item */}
            <a 
              href='https://docs.google.com/document/d/16azwWycB-utKgf7qeKc9ONklHXu5gxn2qlqoGS2nDsU/edit?usp=sharing' 
              target="_blank" 
              rel="noopener noreferrer"
              className='whitespace-nowrap hover:opacity-80 transition-opacity' 
              style={{...responsiveTextD(12, 18, null, 'medium', 'noto', '#FFF')}}
            >
              プライバシーポリシー
            </a>
            {/* Fourth item */}
            <a 
              href="https://docs.google.com/document/d/11uB9cboiC-aYAgrsF_i4Qu6W4HGMfLaAahlS5_m0hco/edit?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className='whitespace-nowrap hover:opacity-80 transition-opacity' 
              style={{...responsiveTextD(12, 18, null, 'medium', 'noto', '#FFF')}}
            >
              利用規約
            </a>
            {/* Fifth item */}
            <div className='whitespace-nowrap' style={{...responsiveTextD(12, 18, null, 'medium', 'noto', '#FFF')}}>
              ガイドライン
            </div>
            {/* Spacer */}
            <div style={{...responsiveMetricD(517)}} />
            {/* Copyright */}
            <div className='whitespace-nowrap' style={{...responsiveTextD(12, 18, null, 'medium', 'noto', '#FFF')}}>
              © 2025 Companey Inc.
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Section */}
      <div className="md:hidden w-full" style={{height: vw(518), paddingTop: vw(32), paddingRight: vw(16), paddingBottom: vw(120), paddingLeft: vw(16)}}>
        <div className="w-full h-full relative">
          <img
            src={logo}
            alt="Mechapuri Logo"
            className='invert'
            style={{...responsiveMetric(202, 36), ...responsivePosition(0, 0, null)}}
          />
          <div className="flex flex-row" style={{...responsivePosition(52, 0), gap: vw(6)}}>
            <img
              src={xLogo}
              alt="X Logo"
              style={{...responsiveMetric(28, 28)}}
            />
            <img
              src={footerSvg2}
              alt="Footer SVG"
              style={{...responsiveMetric(28, 28)}}
            />
          </div>
          <div className="flex flex-col items-start" style={{...responsivePosition(96, 9), gap: vw(32)}}>
            <div style={{...responsiveText(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>出品をはじめる</div>
            <div style={{...responsiveText(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>おすすめショップ</div>
            <div style={{...responsiveText(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>プライベート印刷</div>
          </div>
          <div className="flex flex-col items-start" style={{...responsivePosition(96, 183), gap: vw(32), width: vw(152)}}>
            <div style={{...responsiveText(16, 26, 0.8, 'bold', 'noto', '#FFF')}}>
              ご利用について
            </div>
            <div className="flex flex-col" style={{gap: vw(12)}}>
              <div style={{...responsiveText(13, 20, null, 'medium', 'noto', '#FFF')}}>
                ネットワークプリントの使い方
              </div>
              <div className='whitespace-nowrap' style={{...responsiveText(13, 20, null, 'medium', 'noto', '#FFF')}}>
                X連携の権限について
              </div>
              <div className="flex flex-row items-center gap-[2px]">
                <img
                  src={copy}
                  alt="Copy"
                  className='invert'
                  style={{...responsiveMetric(10, 10)}}
                />
                <div style={{...responsiveText(13, 20, null, 'medium', 'noto', '#FFF')}}>
                  お問い合わせ
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#D1D1D1]" style={{...responsivePosition(271, 0)}} />
          {/* List Frame */}
          <div className="flex flex-col" style={{...responsivePosition(296, 0, null), gap: vw(20), paddingTop: vw(10)}}>
            {/* First item */}
            <div className="flex flex-row items-center" style={{gap: vw(25)}}>
              <div className="flex flex-row items-center gap-[8px]">
                <img
                  src={copy}
                  alt="Copy"
                  className='invert'
                  style={{...responsiveMetric(10, 10)}}
                />
                <div style={{...responsiveText(12, 18, null, 'normal', 'noto', '#FFF')}}>
                  運営企業
                </div>
              </div>
              {/* Second item */}
              <div className="flex flex-row items-center gap-[2px]">
                <img
                  src={copy}
                  alt="Copy"
                  className='invert'
                  style={{...responsiveMetric(10, 10)}}
                />
                <a 
                  href='https://docs.google.com/document/d/1NyyD2l-rxopttri62aqZ1Ux83WfLozT03O1Ysp4SV0E/edit?usp=sharing' 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='whitespace-nowrap hover:opacity-80 transition-opacity' 
                  style={{...responsiveText(12, 18, null, 'normal', 'noto', '#FFF')}}
                >
                  特定商取引法に基づく表示
                </a>
              </div>
            </div>
            <div className="flex flex-row" style={{gap: vw(20)}}>
              {/* Third item */}
              <a 
                href='https://docs.google.com/document/d/16azwWycB-utKgf7qeKc9ONklHXu5gxn2qlqoGS2nDsU/edit?usp=sharing' 
                target="_blank" 
                rel="noopener noreferrer"
                className='whitespace-nowrap hover:opacity-80 transition-opacity' 
                style={{...responsiveText(12, 18, null, 'normal', 'noto', '#FFF')}}
              >
                プライバシーポリシー
              </a>
              {/* Fourth item */}
              <a 
                href="https://docs.google.com/document/d/11uB9cboiC-aYAgrsF_i4Qu6W4HGMfLaAahlS5_m0hco/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className='whitespace-nowrap hover:opacity-80 transition-opacity' 
                style={{...responsiveText(12, 18, null, 'normal', 'noto', '#FFF')}}
              >
                利用規約
              </a>
            </div>
            {/* Fifth item */}
            <div className='whitespace-nowrap' style={{...responsiveText(12, 18, null, 'normal', 'noto', '#FFF')}}>
              ガイドライン
            </div>
            {/* Copyright */}
            <div className='whitespace-nowrap' style={{...responsiveText(10, 16, null, 'normal', 'noto', '#FFF')}}>
              © 2025 Companey Inc.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Section */}
      <div className='md:hidden flex flex-row justify-between p-[8px_16px_12px_16px] bg-[#FFF]'>
        <div className='flex flex-col items-center gap-[10px]' style={{...responsiveMetric(60, null)}}>
          {/* Home */}
          <img
            src={home}
            alt="Home"
            style={{ ...responsiveMetric(20, 20) }}
          />
          <div className="text-center" style={{ ...responsiveText(10, 13, null, 'medium', 'noto', '#363636') }}>ホーム</div>
        </div>
        {/* Favorites */}
        <div className='flex flex-col items-center gap-[10px]' style={{...responsiveMetric(60, null)}}>
          <img
            src={heart}
            alt="Favorites"
            style={{ ...responsiveMetric(20, 20) }}
          />
          <a href='/favoriteproducts' style={{ ...responsiveText(10, 13, null, 'medium', 'noto', '#363636') }}>お気に入り</a>
        </div>

        {/* Purchase History */}
        <div className='flex flex-col items-center gap-[10px]'>
          <img
            src={clock}
            alt="History"
            style={{ ...responsiveMetric(20, 20) }}
          />
          <a href='/purchasehistory' style={{ ...responsiveText(10, 13, null, 'medium', 'noto', '#363636') }}>購入履歴</a>
        </div>

        {/* Cart */}
        <div className='flex flex-col items-center gap-[10px]' style={{...responsiveMetric(60, null)}}>
          <a href='/cart'>
            <img
              src={cart}
              alt="Cart"
              style={{ ...responsiveMetric(20, 20) }}
            />
          </a>
          <div className='flex flex-row items-center gap-[2px]'>
            <span style={{ ...responsiveText(10, 13, null, 'medium', 'noto', '#363636') }}>カート</span>
            <div className='flex items-center justify-center p-[2px]' style={{ ...responsiveMetric(16, 18), borderRadius: vw(3), background: '#FF2AA1' }}>
              <span style={{ ...responsiveText(13, 10, null, 'medium', 'noto', '#FFF') }}>1</span>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className='flex flex-col items-center gap-[10px]'>
          <img
            src={man_mobile}
            alt="Account"
            style={{ ...responsiveMetric(20, 20) }}
          />
          <a href='/accountsetting' style={{ ...responsiveText(10, 13, null, 'medium', 'noto', '#363636') }}>アカウント</a>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
