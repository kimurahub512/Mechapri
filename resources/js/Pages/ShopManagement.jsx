import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import sm_hero from '@/assets/images/sm_hero.png';
import pen_paper from '@/assets/images/pen_paper.svg';
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
import mountain from '@/assets/images/mountain.svg';
import complex from '@/assets/images/complex.svg';
import '@/../../resources/css/shopmanagement.css';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlocks from '@/Components/ShopMobileTopBlocks';

const ShopManagement = () => {
  return (
    <>
      <Header />
      <div className="shopmanagement-root">
        {/* Sidebar Section */}
        <ShopSidebar />
        {/* Mobile Header and Navigation */}
        <ShopMobileTopBlocks />
        {/* Mobile Main Section */}
        <div className="shopmanagement-mobile-main-section">
          <div className="shopmanagement-mobile-container31">
            <div className="shopmanagement-mobile-main-title">さっそくはじめよう！</div>
            <div className="shopmanagement-mobile-main-card">
              <div className="shopmanagement-mobile-main-card-title">写真を商品登録</div>
              <div className="shopmanagement-mobile-main-card-link-frame">
                <span className="shopmanagement-mobile-main-card-link-text">画像を出品しよう</span>
                <img src={arrow_right} alt="Arrow Right" className="shopmanagement-mobile-main-card-arrow" />
              </div>
              <div className="shopmanagement-mobile-main-card-imgframe-photos" style={{position:'absolute',right:0,bottom:'0.1px',width:'122px',height:'105.841px'}}>
                <img src={sm_photo1} alt="photo1" className="shopmanagement-mobile-main-card-img1" />
                <img src={sm_photo2} alt="photo2" className="shopmanagement-mobile-main-card-img2" />
              </div>
            </div>
            <div className="shopmanagement-mobile-main-card shopmanagement-mobile-main-card--secondary">
              <div className="shopmanagement-mobile-main-card-edit">ショップ情報編集</div>
              <div className="shopmanagement-mobile-main-card-link-frame">
                <span className="shopmanagement-mobile-main-card-link-text shopmanagement-mobile-main-card-link-text--gradient">ショップ設定をしよう</span>
                <img src={arrow_right} alt="Arrow Right" className="shopmanagement-mobile-main-card-arrow" />
              </div>
              <div className="shopmanagement-mobile-main-card-imgframe-shop" style={{position:'absolute',right:0,display:'flex',width:'124.489px',padding:'0px 4.122px 0px 3.297px',justifyContent:'center',alignItems:'center'}}>
                <img src={sm_photo3} alt="shop info" className="shopmanagement-mobile-main-card-img-shop" />
              </div>
            </div>
          </div>
          {/* Mobile Container 32 */}
          <div className="shopmanagement-mobile-container32">
            <div className="shopmanagement-mobile-container32-frame">
              <div className="shopmanagement-mobile-container32-frame321">
                <div className="shopmanagement-mobile-container32-title">出金・売上の概要</div>
                <div className="shopmanagement-mobile-container32-row">
                  <div className="shopmanagement-mobile-container32-listicon">
                    <img src={list_unordered} alt="List" />
                  </div>
                  <span className="shopmanagement-mobile-container32-link">詳細を見る</span>
                  <div className="shopmanagement-mobile-container32-arrow">
                    <img src={arrow_right} alt="Arrow Right" />
                  </div>
                </div>
              </div>
              <div className="shopmanagement-mobile-container32-frame322">
                <div className="shopmanagement-mobile-container32-3221">
                  <div className="shopmanagement-mobile-container32-3221-col">
                    <div className="shopmanagement-mobile-container32-3221-row1">
                      <img src={p_circle} alt="Payout" className="shopmanagement-mobile-container32-3221-icon" />
                      <span className="shopmanagement-mobile-container32-3221-label">収益残高</span>
                    </div>
                    <div className="shopmanagement-mobile-container32-3221-row2">
                      <div className="shopmanagement-mobile-container32-3221-row2-x1">
                      <span className="shopmanagement-mobile-container32-3221-value">0</span>
                        <div className="shopmanagement-mobile-container32-3221-row2-x2">
                      <span className="shopmanagement-mobile-container32-3221-unit">円</span>
                        </div>
                      </div>
                    </div>
                    <div className="shopmanagement-mobile-container32-3221-notes">
                      <div>販売手数料：15％ を差し引いた金額です。</div>
                      <div>合計金額が5000円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                    </div>
                  </div>
                </div>
                {/* 3222: new container for summary stats */}
                <div className="shopmanagement-mobile-container32-3222">
                  {/* 32221: title and stat blocks */}
                  <div className="shopmanagement-mobile-container32-32221">
                    {/* 322211: title row */}
                    <div className="shopmanagement-mobile-container32-322211">
                      <span className="shopmanagement-mobile-container32-322211-title">今月の印刷・販売</span>
                    </div>
                    {/* 322212: stat blocks */}
                    <div className="shopmanagement-mobile-container32-322212">
                      {/* First stat block: 販売売上 */}
                      <div className="shopmanagement-mobile-container32-322212-item">
                        <div className="shopmanagement-mobile-container32-322212-item-row">
                          <img src={money_hand} alt="Money Hand" className="shopmanagement-mobile-container32-322212-item-icon" />
                          <span className="shopmanagement-mobile-container32-322212-item-label">販売売上</span>
                        </div>
                        <div className="shopmanagement-mobile-container32-322212-item-amount">
                          <span className="shopmanagement-mobile-container32-322212-item-value">0</span>
                          <span className="shopmanagement-mobile-container32-322212-item-unit">円</span>
                        </div>
                      </div>
                      {/* Second stat block: 印刷枚数 */}
                      <div className="shopmanagement-mobile-container32-322212-item">
                        <div className="shopmanagement-mobile-container32-322212-item-row">
                          <img src={complex} alt="Complex" className="shopmanagement-mobile-container32-322212-item-icon" />
                          <span className="shopmanagement-mobile-container32-322212-item-label">印刷枚数</span>
                        </div>
                        <div className="shopmanagement-mobile-container32-322212-item-amount">
                          <span className="shopmanagement-mobile-container32-322212-item-value">0</span>
                          <span className="shopmanagement-mobile-container32-322212-item-unit">枚</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shopmanagement-mobile-container32-32221">
                    {/* 322211: title row */}
                    <div className="shopmanagement-mobile-container32-322211">
                      <span className="shopmanagement-mobile-container32-322211-title">累計の印刷・販売</span>
                    </div>
                    {/* 322212: stat blocks */}
                    <div className="shopmanagement-mobile-container32-322212">
                      {/* First stat block: 販売売上 */}
                      <div className="shopmanagement-mobile-container32-322212-item">
                        <div className="shopmanagement-mobile-container32-322212-item-row">
                          <img src={money_hand} alt="Money Hand" className="shopmanagement-mobile-container32-322212-item-icon" />
                          <span className="shopmanagement-mobile-container32-322212-item-label">販売売上</span>
                        </div>
                        <div className="shopmanagement-mobile-container32-322212-item-amount">
                          <span className="shopmanagement-mobile-container32-322212-item-value">0</span>
                          <span className="shopmanagement-mobile-container32-322212-item-unit">円</span>
                        </div>
                      </div>
                      {/* Second stat block: 印刷枚数 */}
                      <div className="shopmanagement-mobile-container32-322212-item">
                        <div className="shopmanagement-mobile-container32-322212-item-row">
                          <img src={complex} alt="Complex" className="shopmanagement-mobile-container32-322212-item-icon" />
                          <span className="shopmanagement-mobile-container32-322212-item-label">印刷枚数</span>
                        </div>
                        <div className="shopmanagement-mobile-container32-322212-item-amount">
                          <span className="shopmanagement-mobile-container32-322212-item-value">0</span>
                          <span className="shopmanagement-mobile-container32-322212-item-unit">枚</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <Footer />
    </>
  );
};

export default ShopManagement;

