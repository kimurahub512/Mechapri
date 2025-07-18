import React from 'react';
import sm_hero from '@/assets/images/sm_hero.png';
import mountain from '@/assets/images/mountain.svg';
import list_unordered from '@/assets/images/list_unordered.svg';
import p_circle from '@/assets/images/p_circle.svg';
import clock from '@/assets/images/clock.svg';
import pen_paper from '@/assets/images/pen_paper.svg';

const ShopMobileTopBlocks = () => {
  const isEditPage = window.location.pathname === '/myshop/edit';
  const isMyContents = window.location.pathname === '/myshop/contents';
  const isTransaction = window.location.pathname === '/myshop/transaction';
  const isSalesHistory = window.location.pathname === '/myshop/saleshistory';
  
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
            <div
              className="shopmanagement-mobile-nav-item-content"
              style={isMyContents ? {
                display: 'flex',
                height: '48px',
                padding: '12px 8px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                background: '#FFEFF8'
              } : {}}
            >
              <img src={mountain} alt="mountain" className="shopmanagement-mobile-nav-icon" />
              <a 
                href="/myshop/contents" 
                className="shopmanagement-mobile-nav-text"
                style={isMyContents ? {
                  textDecoration: 'none',
                  fontFamily: 'Noto Sans JP',
                  fontSize: '9px',
                  fontWeight: 400,
                  lineHeight: '10px',
                  background: 'linear-gradient(270deg, #FF2AA1 0%, #AB31D3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                } : { textDecoration: 'none' }}
              >
                商品管理
              </a>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div className="shopmanagement-mobile-nav-item-content">
              <img src={list_unordered} alt="Category" className="shopmanagement-mobile-nav-icon" />
              <span className="shopmanagement-mobile-nav-text">商品カテゴリ</span>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div
              className="shopmanagement-mobile-nav-item-content"
              style={isTransaction ? {
                display: 'flex',
                height: '48px',
                padding: '12px 8px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                background: '#FFEFF8'
              } : {}}
            >
              <img src={p_circle} alt="Payout" className="shopmanagement-mobile-nav-icon" />
              <a 
                href="/myshop/transaction" 
                className="shopmanagement-mobile-nav-text"
                style={isTransaction ? {
                  textDecoration: 'none',
                  fontFamily: 'Noto Sans JP',
                  fontSize: '9px',
                  fontWeight: 400,
                  lineHeight: '10px',
                  background: 'linear-gradient(270deg, #FF2AA1 0%, #AB31D3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                } : { textDecoration: 'none' }}
              >
                出金・売上
              </a>
            </div>
          </div>
          <div className="shopmanagement-mobile-nav-item">
            <div
              className="shopmanagement-mobile-nav-item-content"
              style={isSalesHistory ? {
                display: 'flex',
                height: '48px',
                padding: '12px 8px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                background: '#FFEFF8'
              } : {}}
            >
              <img src={clock} alt="History" className="shopmanagement-mobile-nav-icon" style={isSalesHistory ? { filter: 'brightness(0) saturate(100%) invert(36%) sepia(99%) saturate(7492%) hue-rotate(292deg) brightness(101%) contrast(101%)' } : {}} />
              <a 
                href="/myshop/saleshistory" 
                className="shopmanagement-mobile-nav-text"
                style={isSalesHistory ? {
                  textDecoration: 'none',
                  fontFamily: 'Noto Sans JP',
                  fontSize: '9px',
                  fontWeight: 400,
                  lineHeight: '10px',
                  background: 'linear-gradient(270deg, #FF2AA1 0%, #AB31D3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                } : { textDecoration: 'none' }}
              >
                販売履歴
              </a>
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