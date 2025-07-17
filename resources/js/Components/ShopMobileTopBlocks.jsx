import React from 'react';
import sm_hero from '@/assets/images/sm_hero.png';
import mountain from '@/assets/images/mountain.svg';
import select_multiple from '@/assets/images/select_multiple.svg';
import p_circle from '@/assets/images/p_circle.svg';
import clock from '@/assets/images/clock.svg';
import pen_paper from '@/assets/images/pen_paper.svg';

const ShopMobileTopBlocks = () => {
  const isEditPage = window.location.pathname === '/myshop/edit';
  
  return (
    <>
      {/* Mobile Header */}
      <div className="shopmanagement-mobile-header">
        <div className="shopmanagement-mobile-header-frame">
          <div className="shopmanagement-mobile-header-left">
            <img
              className="shopmanagement-mobile-hero"
              src={sm_hero}
              alt="Shop Hero"
            />
            <span className="shopmanagement-mobile-title">anchiy15P</span>
          </div>
          <div className="shopmanagement-mobile-shop-btn">自分のショップ</div>
        </div>
      </div>
      {/* Mobile Navigation Block */}
      <div className="shopmanagement-mobile-nav">
        <div className="shopmanagement-mobile-nav-list">
          <div className="shopmanagement-mobile-nav-item">
            <div className="shopmanagement-mobile-nav-item-content">
              <img src={mountain} alt="mountain" className="shopmanagement-mobile-nav-icon" />
              <span className="shopmanagement-mobile-nav-text">商品管理</span>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div className="shopmanagement-mobile-nav-item-content">
              <img src={select_multiple} alt="Category" className="shopmanagement-mobile-nav-icon" />
              <span className="shopmanagement-mobile-nav-text">商品カテゴリ</span>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div className="shopmanagement-mobile-nav-item-content">
              <img src={p_circle} alt="Payout" className="shopmanagement-mobile-nav-icon" />
              <span className="shopmanagement-mobile-nav-text">出金・売上</span>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div className="shopmanagement-mobile-nav-item-content">
              <img src={clock} alt="History" className="shopmanagement-mobile-nav-icon" />
              <span className="shopmanagement-mobile-nav-text">販売履歴</span>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div 
              className="shopmanagement-mobile-nav-item-content"
              style={isEditPage ? {
                display: 'flex',
                height: '48px',
                padding: '12px 4px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                background: '#FFEFF8'
              } : {}}
            >
              <img src={pen_paper} alt="Edit" className="shopmanagement-mobile-nav-icon" />
              <a href="/myshop/edit" className="shopmanagement-mobile-nav-text" style={{textDecoration: 'none'}}>ショップ編集</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopMobileTopBlocks; 