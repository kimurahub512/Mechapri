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
  const isMyContents = window.location.pathname === '/myshop/contents';
  const isTransaction = window.location.pathname === '/myshop/transaction';
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
          <a href="/myshop/contents" style={{ textDecoration: 'none' }}>
            <div className={`sm-shop-menu-item${isMyContents ? ' sm-shop-menu-item--active' : ''}`}
              style={isMyContents ? {
                display: 'flex',
                width: '168px',
                padding: '12px',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '8px',
                background: '#FF2AA1'
              } : { background: 'transparent' }}>
              <svg
                className="sm-shop-menu-icon"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="mask0" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                  <g clipPath="url(#clip0)">
                    <g clipPath="url(#clip1)">
                      <mask id="mask1" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                        <path
                          d="M2 6.94141V13.8747C2 14.2481 2 14.4347 2.07266 14.5773C2.13658 14.7027 2.23849 14.8049 2.36393 14.8688C2.5064 14.9414 2.693 14.9414 3.06564 14.9414H10.0001M11.3333 6.27474L8.66667 8.94141L7.33333 7.60807M4.66667 10.1415V5.07487C4.66667 4.32813 4.66667 3.95449 4.81199 3.66927C4.93982 3.41839 5.14365 3.21456 5.39453 3.08673C5.67975 2.94141 6.05339 2.94141 6.80013 2.94141H11.8668C12.6135 2.94141 12.9867 2.94141 13.2719 3.08673C13.5228 3.21456 13.727 3.41839 13.8548 3.66927C14.0001 3.95448 14.0001 4.32787 14.0001 5.07459L14.0001 10.1413C14.0001 10.888 14.0001 11.2614 13.8548 11.5466C13.727 11.7975 13.5228 12.0017 13.2719 12.1296C12.987 12.2747 12.6143 12.2747 11.869 12.2747H6.79794C6.05266 12.2747 5.67947 12.2747 5.39453 12.1296C5.14365 12.0017 4.93982 11.7975 4.81199 11.5467C4.66667 11.2614 4.66667 10.8883 4.66667 10.1415Z"
                          stroke={isMyContents ? "#fff" : "#FF2AA1"}
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </mask>
                      <g mask="url(#mask1)">
                        <rect y="0.941406" width="16" height="16" fill={isMyContents ? "#fff" : "url(#paint0_linear)"} />
                      </g>
                    </g>
                  </g>
                </mask>
                <g mask="url(#mask0)">
                  <rect y="0.941406" width="16" height="16" fill={isMyContents ? "#fff" : "url(#paint1_linear)"} />
                </g>
                <defs>
                  <linearGradient id="paint0_linear" x1="16" y1="8.86934" x2="0" y2="8.86934" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1" />
                    <stop offset="1" stopColor="#AB31D3" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="0" y1="0.941406" x2="16" y2="16.9414" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF8D4E" />
                    <stop offset="1" stopColor="#EA2CE2" />
                  </linearGradient>
                  <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.941406)" />
                  </clipPath>
                  <clipPath id="clip1">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.941406)" />
                  </clipPath>
                </defs>
              </svg>
              <span className="sm-shop-menu-text" style={isMyContents ? { color: '#fff' } : { color: '#222' }}>商品管理</span>
            </div>
          </a>
          <div className="sm-shop-menu-item">
            <img src={cart2} alt="Category" className="sm-shop-menu-icon sm-shop-menu-icon--gray" />
            <span className="sm-shop-menu-text sm-shop-menu-text--gray">商品カテゴリ</span>
          </div>
          <a href="/myshop/transaction" style={{ textDecoration: 'none' }}>
            <div className={`sm-shop-menu-item${isTransaction ? ' sm-shop-menu-item--active' : ''}`}
              style={isTransaction ? {
                display: 'flex',
                width: '168px',
                padding: '12px',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '8px',
                background: '#FF2AA1'
              } : { background: 'transparent' }}>
              <img src={p_circle} alt="Payout" className="sm-shop-menu-icon" style={isTransaction ? { filter: 'brightness(0) invert(1)' } : {}} />
              <span className="sm-shop-menu-text" style={isTransaction ? { color: '#fff' } : { color: '#222' }}>出金・売上</span>
            </div>
          </a>
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