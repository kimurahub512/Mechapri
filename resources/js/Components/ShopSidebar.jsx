import React from 'react';
import sm_hero from '@/assets/images/sm_hero.png';
import pen_paper from '@/assets/images/pen_paper.svg';
import shop from '@/assets/images/Slider_03.svg';
import select_multiple from '@/assets/images/select_multiple.svg';
import cart2 from '@/assets/images/cart2.svg';
import p_circle from '@/assets/images/p_circle.svg';
import clock from '@/assets/images/clock.svg';
import file_add from '@/assets/images/File_Add.svg';

const ShopSidebar = () => (
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
        <img src={pen_paper} alt="Edit" className="sm-shop-edit-icon" />
        <span className="sm-shop-edit-text">ショップ情報編集</span>
      </div>
      <div className="sm-shop-menu-container">
        <div className="sm-shop-menu-item sm-shop-menu-item--active">
          <img src={shop} alt="Shop" className="sm-shop-menu-icon" />
          <span className="sm-shop-menu-text">ショップ管理トップ</span>
        </div>
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

export default ShopSidebar; 