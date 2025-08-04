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
import { vw, responsiveText, responsiveMetric } from '@/lib/utils';


import '@/../../resources/css/footer.css';

const Footer = () => {
  return (
    <footer className="mechapuri-footer">
      <div className="mechapuri-footer-main-container">
        <div className="mechapuri-footer-content-frame">
          <img
            src={logo}
            alt="Mechapuri Logo"
            className="mechapuri-footer-logo"
          />
          <div className="mechapuri-footer-social">
            <img
              src={xLogo}
              alt="X Logo"
              className="mechapuri-footer-x-logo"
            />
            <img
              src={footerSvg2}
              alt="Footer SVG"
              className="mechapuri-footer-svg2"
            />
          </div>
          <div className="mechapuri-footer-text-section-1">
            <div className="mechapuri-footer-text-bold">出品をはじめる</div>
            <div className="mechapuri-footer-text-bold">おすすめショップ</div>
            <div className="mechapuri-footer-text-bold">プライベート印刷</div>
          </div>
          <div className="mechapuri-footer-text-section-2">
            <div className="mechapuri-footer-text-title">
              ご利用について
            </div>
            <div className="mechapuri-footer-text-item">
              ネットワークプリントの使い方
            </div>
            <div className="mechapuri-footer-text-item">
              X連携の権限について
            </div>
            <div className="mechapuri-footer-copy-section">
              <img
                src={copy}
                alt="Copy"
                className="mechapuri-footer-copy-icon"
              />
              <div className="mechapuri-footer-text-medium">
                お問い合わせ
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="mechapuri-footer-divider" />
          {/* List Frame */}
          <div className="mechapuri-footer-list-frame">
            {/* First item */}
            <div className="mechapuri-footer-list-item">
              <img
                src={copy}
                alt="Copy"
                className="mechapuri-footer-copy-icon-small"
              />
              <div className="mechapuri-footer-list-text">
                運営企業
              </div>
            </div>
            {/* Second item */}
            <div className="mechapuri-footer-list-item">
              <img
                src={copy}
                alt="Copy"
                className="mechapuri-footer-copy-icon-small"
              />
              <div className="mechapuri-footer-list-text">
                特定商取引法に基づく表示
              </div>
            </div>
            {/* Third item */}
            <div className="mechapuri-footer-list-text">
              プライバシーポリシー
            </div>
            {/* Fourth item */}
            <div className="mechapuri-footer-list-text">
              利用規約
            </div>
            {/* Fifth item */}
            <div className="mechapuri-footer-list-text">
              ガイドライン
            </div>
            {/* Spacer */}
            <div className="mechapuri-footer-spacer" />
            {/* Copyright */}
            <div className="mechapuri-footer-copyright">
              © 2025 Companey Inc.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Section */}
      <div className='flex flex-row justify-between p-[8px_16px_12px_16px] bg-[#FFF]'>
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
