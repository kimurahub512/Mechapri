import React from 'react';
import sm_hero from '@/assets/images/sm_hero.png';
import pen_paper from '@/assets/images/pen_paper.svg';
import shop from '@/assets/images/Slider_03.svg';
import select_multiple from '@/assets/images/select_multiple.svg';
import cart2 from '@/assets/images/cart2.svg';
import p_circle from '@/assets/images/p_circle.svg';
import clock from '@/assets/images/clock.svg';
import file_add from '@/assets/images/File_Add.svg';

const ShopSidebar = () => {
  const isShopManagement = window.location.pathname === '/shop-management';
  const isMyShopEdit = window.location.pathname === '/myshop/edit';
  return (
    <aside className="shopmanagement-sidebar-outer">
      <div className="shopmanagement-sidebar-content">
        <img
          className="sm-hero"
          src={sm_hero}
          alt="Shop Hero"
        />
        <div className="sm-shop-title">anchiy1005’s SHOP</div>
        <div className="sm-shop-view-btn">自分のショップを見る</div>
        <div className="sm-shop-edit-frame">
          <a href="/myshop/edit"
            className={`sm-shop-edit-link${isMyShopEdit ? ' sm-shop-edit-link--active' : ''}`}
          >
            <img src={pen_paper} alt="Edit" className="sm-shop-edit-icon" />
            <span className={`sm-shop-edit-text${isMyShopEdit ? ' sm-shop-edit-text--active' : ''}`}>ショップ情報編集</span>
          </a>
        </div>
        <div className="sm-shop-menu-container">
          <a href="/shop-management" style={{ textDecoration: 'none' }}>
            <div className={`sm-shop-menu-item${isShopManagement ? ' sm-shop-menu-item--active' : ''}`}
              style={!isShopManagement ? { background: 'transparent' } : {}}>
              <svg className="sm-shop-menu-icon" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.77279 15.0004H17.9395M2.93945 15.0004H5.43945M5.43945 15.0004V16.6671M5.43945 15.0004V13.3337M17.1061 10.0004H17.9395M2.93945 10.0004H13.7728M13.7728 10.0004V11.6671M13.7728 10.0004V8.33374M12.1061 5.00041H17.9395M2.93945 5.00041H8.77279M8.77279 5.00041V6.66707M8.77279 5.00041V3.33374" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className="sm-shop-menu-text" style={!isShopManagement ? { color: '#222' } : {}}>ショップ管理トップ</span>
            </div>
          </a>
          <div className="sm-shop-menu-item">
            <img src={select_multiple} alt="Product" className="sm-shop-menu-icon sm-shop-menu-icon--gray" />
            <span className="sm-shop-menu-text sm-shop-menu-text--gray">商品管理</span>
          </div>
          <div className="sm-shop-menu-item">
            <img src={cart2} alt="Category" className="sm-shop-menu-icon sm-shop-menu-icon--gray" />
            <span className="sm-shop-menu-text sm-shop-menu-text--gray">商品カテゴリ</span>
          </div>
          <div className="sm-shop-menu-item">
            <img src={p_circle} alt="Payout" className="sm-shop-menu-icon sm-shop-menu-icon--gray" />
            <span className="sm-shop-menu-text sm-shop-menu-text--gray">出金・売上</span>
          </div>
          <div className="sm-shop-menu-item">
            <img src={clock} alt="History" className="sm-shop-menu-icon sm-shop-menu-icon--gray" />
            <span className="sm-shop-menu-text sm-shop-menu-text--gray">販売履歴</span>
          </div>
          <div className="sm-shop-menu-item sm-shop-menu-item--register">
            <img src={file_add} alt="Add" className="sm-shop-menu-icon sm-shop-menu-icon--register" />
            <span className="sm-shop-menu-text sm-shop-menu-text--register">写真を商品登録</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar; 