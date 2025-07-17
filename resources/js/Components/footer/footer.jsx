import React from 'react';
import logo from '@/assets/images/mechapuri-logo.svg';
import footerSvg2 from '@/assets/images/footer_svg2.svg';
import xLogo from '@/assets/images/x_logo.svg';
import copy from '@/assets/images/copy.svg';
import home from '@/assets/images/home.svg';
import heart from '@/assets/images/heart.svg';
import clock from '@/assets/images/clock.svg';
import man_mobile from '@/assets/images/man2.svg';
import cart from '@/assets/images/icon-cart.svg';

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
      <div className="mechapuri-footer-mobile-nav block md:hidden">
        <div className="mechapuri-footer-nav-content">
          {/* Home */}
          <div className="mechapuri-footer-nav-item">
            <img 
              src={home} 
              alt="Home" 
              className="mechapuri-footer-nav-svg"
            />
            <div className="mechapuri-footer-nav-text">ホーム</div>
          </div>
          
          {/* Favorites */}
          <div className="mechapuri-footer-nav-item">
            <img 
              src={heart} 
              alt="Favorites" 
              className="mechapuri-footer-nav-svg heart"
            />
            <div className="mechapuri-footer-nav-text">お気に入り</div>
          </div>
          
          {/* Purchase History */}
          <div className="mechapuri-footer-nav-item">
            <img 
              src={clock} 
              alt="History" 
              className="mechapuri-footer-nav-svg"
            />
            <div className="mechapuri-footer-nav-text">購入履歴</div>
          </div>
          
          {/* Cart */}
          <div className="mechapuri-footer-nav-item">
            <div>
              <img 
                src={cart} 
                alt="Cart" 
                className="mechapuri-footer-nav-svg"
              />
            </div>
            <div className="mechapuri-footer-cart-row">
              <span className="mechapuri-footer-nav-text">カート</span>
              <span className="mechapuri-footer-cart-badge">
                <span className="mechapuri-footer-cart-number">1</span>
              </span>
            </div>
          </div>
          
          {/* Account */}
          <div className="mechapuri-footer-nav-item">
            <img 
              src={man_mobile} 
              alt="Account" 
              className="mechapuri-footer-nav-svg man_mobile"
            />
            <div className="mechapuri-footer-nav-text">アカウント</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
