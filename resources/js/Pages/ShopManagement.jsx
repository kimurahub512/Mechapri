import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import sm_hero from '@/assets/images/sm_hero.png';
import pen_paer from '@/assets/images/pen_paper.svg';
import shop from '@/assets/images/Slider_03.svg';
import cart2 from '@/assets/images/cart2.svg';
import clock from '@/assets/images/clock.svg';
import p_circle from '@/assets/images/p_circle.svg';
import select_multiple from '@/assets/images/select_multiple.svg';
import file_add from '@/assets/images/File_Add.svg';
import arrow_right from '@/assets/images/arrow_right.svg';
import sm_photo1 from '@/assets/images/sm_photo1.png';
import sm_photo2 from '@/assets/images/sm_photo2.png';
import sm_photo3 from '@/assets/images/sm_photo3.png';
import list_unordered from '@/assets/images/list_unordered.svg';
import money_hand from '@/assets/images/money_hand.svg';
import complex from '@/assets/images/complex.svg';
import '@/../../resources/css/shopmanagement.css';

const ShopManagement = () => {
  return (
    <>
    <Header/>
    <div className="shopmanagement-root">
      {/* Sidebar Section */}
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
            <img src={pen_paer} alt="Edit" className="sm-shop-edit-icon" />
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
      {/* Main Section */}
      <main className="shopmanagement-main-section">
        <div className="shopmanagement-main-container1">
          <h1 className="shopmanagement-main-heading">さっそくはじめよう！</h1>
          <div className="shopmanagement-main-frame">
            <div className="shopmanagement-main-card">
              <div className="shopmanagement-main-card-title">写真を商品登録</div>
              <div className="shopmanagement-main-card-link-frame">
                <span className="shopmanagement-main-card-link-text">画像を出品しよう</span>
                <img src={arrow_right} alt="Arrow Right" className="shopmanagement-main-card-arrow" />
              </div>
              <div className="frame625774">
                <img src={sm_photo1} alt="photo1" className="frame625774-photo1" />
                <img src={sm_photo2} alt="photo2" className="frame625774-photo2" />
              </div>
            </div>
            {/* Second part of the frame */}
            <div className="shopmanagement-main-card shopmanagement-main-card--secondary">
              <div className="shopmanagement-main-card-edit">ショップ情報編集</div>
              <div className="shopmanagement-main-card-link-frame">
                <span className="shopmanagement-main-card-link-text shopmanagement-main-card-link-text--gradient">ショップ設定をしよう</span>
                <img src={arrow_right} alt="Arrow Right" className="shopmanagement-main-card-arrow" />
              </div>
              <div className="shopmanagement-main-card-imgframe">
                <img src={sm_photo3} alt="shop info" className="shopmanagement-main-card-img" />
              </div>
            </div>
          </div>
        </div>
        {/* Second container2 */}
        <div className="shopmanagement-main-container2">
          <div className="shopmanagement-main-container21">
            <div className="shopmanagement-main-frame21">
              <div className="shopmanagement-main-frame211">
                <span className="shopmanagement-main-frame211-title">出金・売上の概要</span>
                <div className="shopmanagement-main-frame211-component">
                  <div className="shopmanagement-main-frame211-component-left">
                    <img src={list_unordered} alt="List" className="shopmanagement-main-frame211-listicon" />
                    <span className="shopmanagement-main-frame211-link">詳細を見る</span>
                  </div>
                  <div className="shopmanagement-main-frame211-arrow">
                    <img src={arrow_right} alt="Arrow Right" />
                  </div>
                </div>
              </div>
              {/* frame 212 */}
              <div className="shopmanagement-main-frame212">
                <div className="shopmanagement-main-container2121">
                  <div className="shopmanagement-main-container21211">
                    <span className="shopmanagement-main-balance-label">収益残高</span>
                    <div className="shopmanagement-main-frame212111">
                      <div className="shopmanagement-main-balance-amount">
                        <span className="shopmanagement-main-balance-value">0</span>
                        <span className="shopmanagement-main-balance-unit">円</span>
                      </div>
                    </div>
                    <div className="shopmanagement-main-balance-notes">
                      <div>販売手数料：15％ を差し引いた金額です。</div>
                      <div>合計金額が5000円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                    </div>
                  </div>
                </div>
                {/* container 2122 */}
                <div className="shopmanagement-main-container2122">
                  <div className="shopmanagement-main-container21221">
                    <span className="shopmanagement-main-container21221-title">今月の印刷・販売</span>
                    <div className="shopmanagement-main-frame212211">
                      <div className="shopmanagement-main-container2122111">
                        <div className="shopmanagement-main-container2122111-item">
                          <img src={money_hand} alt="Money Hand" className="shopmanagement-main-container2122111-icon" />
                          <span className="shopmanagement-main-container2122111-label">販売売上</span>
                        </div>
                        <div className="shopmanagement-main-container2122111-amount">
                          <span className="shopmanagement-main-container2122111-value">0</span>
                          <span className="shopmanagement-main-container2122111-unit">円</span>
                        </div>
                      </div>
                      <div className="shopmanagement-main-container2122112">
                        <div className="shopmanagement-main-container2122112-item">
                          <img src={complex} alt="Complex" className="shopmanagement-main-container2122112-icon" />
                          <span className="shopmanagement-main-container2122112-label">印刷枚数</span>
                        </div>
                        <div className="shopmanagement-main-container2122112-amount">
                          <span className="shopmanagement-main-container2122112-value">0</span>
                          <span className="shopmanagement-main-container2122112-unit">枚</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shopmanagement-main-container21222">
                    <span className="shopmanagement-main-container21222-title">累計の印刷・販売</span>
                    <div className="shopmanagement-main-frame212221">
                      <div className="shopmanagement-main-container2122211">
                        <div className="shopmanagement-main-container2122211-item">
                          <img src={money_hand} alt="Money Hand" className="shopmanagement-main-container2122211-icon" />
                          <span className="shopmanagement-main-container2122211-label">販売売上</span>
                        </div>
                        <div className="shopmanagement-main-container2122211-amount">
                          <span className="shopmanagement-main-container2122211-value">0</span>
                          <span className="shopmanagement-main-container2122211-unit">円</span>
                        </div>
                      </div>
                      <div className="shopmanagement-main-container2122212">
                        <div className="shopmanagement-main-container2122212-item">
                          <img src={complex} alt="Complex" className="shopmanagement-main-container2122212-icon" />
                          <span className="shopmanagement-main-container2122212-label">印刷枚数</span>
                        </div>
                        <div className="shopmanagement-main-container2122212-amount">
                          <span className="shopmanagement-main-container2122212-value">0</span>
                          <span className="shopmanagement-main-container2122212-unit">枚</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default ShopManagement;

