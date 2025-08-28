import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

import p_circle from '@/assets/images/p_circle.svg';
import arrow_right from '@/assets/images/arrow_right.svg';
import sm_photo1 from '@/assets/images/sm_photo1.png';
import sm_photo2 from '@/assets/images/sm_photo2.png';
import sm_photo3 from '@/assets/images/sm_photo3.png';
import list_unordered from '@/assets/images/list_unordered.svg';
import money_hand from '@/assets/images/money_hand.svg';
import complex from '@/assets/images/complex.svg';
import '@/../../resources/css/shopmanagement.css';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlocks from '@/Components/ShopMobileTopBlocks';
import { vwd, vw, responsiveTextD, responsiveMetricD, responsiveText, responsiveMetric, responsivePosition, responsivePositionD } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ShopManagement = ({ statistics: initialStatistics }) => {
  const [statistics, setStatistics] = useState(initialStatistics);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch real print counts from NWPS API after initial load
    const fetchRealPrintCounts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/shop-statistics');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching shop statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if initial print counts are 0 (indicating we need real data)
    if (initialStatistics.current_month.print_count === 0 && initialStatistics.total.print_count === 0) {
      fetchRealPrintCounts();
    }
  }, [initialStatistics]);

  const formatNumber = (num) => {
    return num.toLocaleString('ja-JP');
  };

  return (
    <>
      <Header />
      <div className="shopmanagement-root">
        {/* Sidebar Section */}
        <ShopSidebar />
        {/* Mobile Header and Navigation */}
        <ShopMobileTopBlocks />
        {/* Mobile Main Section */}
        <div className="md:hidden pt-[32px]">
          <div className="flex flex-col items-start" style={{ gap: vw(32), paddingLeft: vw(16), paddingRight: vw(16) }}>
            <div className="flex flex-col items-start w-full" style={{ gap: vw(25) }}>
              <h1 style={{ ...responsiveText(24, 24, null, 'bold', 'noto', '#363636') }}>さっそくはじめよう！</h1>
              {/* First card */}
              <a href='/myshop/registerproduct' className="relative bg-white rounded-[10px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]" style={{ ...responsiveMetric(343, 108), paddingleft: vw(16) }}>
                <div style={{ ...responsiveText(10, 16, null, 'normal', 'noto', '#272B2B'), ...responsivePosition(27, 16) }}>写真を商品登録</div>
                <div className="flex items-center" style={{ gap: vw(8), ...responsivePosition(46, 16) }}>
                  <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(19, 30, null, 'black', 'noto') }}>画像を出品しよう</span>
                  <img src={arrow_right} alt="Arrow Right" style={{ width: vw(16), height: vw(12) }} />
                </div>
                <div className="absolute right-0 bottom-0 overflow-hidden" style={{ ...responsiveMetric(121, 105) }}>
                  <img src={sm_photo1} alt="photo1" style={{ ...responsiveMetric(73, 133), ...responsivePosition(25, 15), width: vw(73), height: vw(133) }} />
                  <img src={sm_photo2} alt="photo2" style={{ ...responsiveMetric(73, 133), ...responsivePosition(11, 34), width: vw(73), height: vw(133) }} />
                </div>
              </a>
              {/* Second card */}
              <div
                className="relative bg-white rounded-[10px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] cursor-pointer hover:shadow-[0_4px_36px_0_rgba(0,0,0,0.15)] transition-shadow"
                style={{ ...responsiveMetric(343, 108), paddingleft: vw(16) }}
                onClick={() => router.visit('/myshop/edit')}
              >
                <div style={{ ...responsiveText(10, 16, null, 'normal', 'noto', '#272B2B'), ...responsivePosition(27, 16) }}>ショップ情報編集</div>
                <div className="flex items-center" style={{ gap: vw(8), ...responsivePosition(46, 16) }}>
                  <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(19, 30, null, 'black', 'noto') }}>ショップ設定をしよう</span>
                  <img src={arrow_right} alt="Arrow Right" style={{ width: vw(16), height: vw(12) }} />
                </div>
                <div className="absolute right-0 bottom-0 overflow-hidden" style={{ ...responsiveMetric(114, 108) }}>
                  <img src={sm_photo3} alt="shop info" style={{ ...responsiveMetric(117, 206), objectFit: 'cover', width: vw(117), height: vw(206) }} />
                </div>
              </div>
            </div>
            {/* Second container2 */}
            <div className="flex flex-col items-start w-full  bg-white rounded-[10px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]" style={{ paddingTop: vw(20), paddingBottom: vw(20), paddingLeft: vw(16), paddingRight: vw(16), gap: vw(16) }}>
              <div className="flex flex-col items-start w-full" style={{ gap: vw(16) }}>
                <span style={{ ...responsiveText(24, 24, null, 'bold', 'noto', '#363636') }}>出金・売上の概要</span>
                <a href='/myshop/transaction' className="flex items-center" style={{ gap: vw(4), paddingTop: vw(12), paddingBottom: vw(12) }}>
                  <img src={list_unordered} alt="List" style={{ ...responsiveMetric(16, 16) }} />
                  <span style={{ ...responsiveText(14, 10, null, 'medium', 'noto', '#222') }}>詳細を見る</span>
                  <img src={arrow_right} alt="Arrow Right" style={{ ...responsiveMetric(20, 15) }} />
                </a>
              </div>
              {/* frame 212 */}
              <div className="flex flex-col items-start w-full" style={{ gap: vw(32) }}>
                <div className="flex flex-col items-start" style={{ gap: vw(8) }}>
                  <span style={{ ...responsiveText(18, 23, null, 'medium', 'noto', '#363636') }}>収益残高</span>
                  <div className="flex items-baseline" style={{ gap: vw(2) }}>
                    <span style={{ ...responsiveText(24, 26, null, 'bold', 'noto', '#363636') }}>{formatNumber(statistics.total.balance)}</span>
                    <span style={{ ...responsiveText(12, 32, null, 'bold', 'noto', '#363636') }}>円</span>
                  </div>
                  <div style={{ ...responsiveText(12, 19, null, 'normal', 'noto', '#272B2B') }}>販売手数料：{statistics.commission_rate}％ を差し引いた金額です。<br />合計金額が{statistics.payment_threshold}円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                </div>
                {/* container 2122 */}
                <div className="flex flex-col items-start w-full" style={{ gap: vw(16), paddingBottom: vw(16) }}>
                  <div className="flex flex-col items-start w-full" style={{ gap: vw(16) }}>
                    <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636'), marginTop: vw(12), marginBottom: vw(6) }}>今月の印刷・販売</span>
                    <div className="flex flex-col items-start w-full" style={{ gap: vw(14) }}>
                      <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6] w-full" style={{ gap: vw(5), paddingRight: vw(16), paddingLeft: vw(16), paddingTop: vw(8), paddingBottom: vw(8) }}>
                        <div className="flex flex-row items-center" style={{ gap: vw(6) }}>
                          <img src={money_hand} alt="Money Hand" style={{ ...responsiveMetric(20, 20) }} />
                          <span style={{ ...responsiveText(16, 32, null, 'bold', 'noto', '#272B2B') }}>販売売上</span>
                        </div>
                        <div className="flex items-baseline" style={{ gap: vw(2) }}>
                          <span style={{ ...responsiveText(18, 40, null, 'bold', 'noto', '#222') }}>{formatNumber(statistics.current_month.sales_revenue)}</span>
                          <span style={{ ...responsiveText(12, 32, null, 'bold', 'noto', '#222') }}>円</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6] w-full" style={{ gap: vw(5), paddingRight: vw(16), paddingLeft: vw(16), paddingTop: vw(8), paddingBottom: vw(8) }}>
                        <div className="flex flex-row items-center" style={{ gap: vw(6) }}>
                          <img src={complex} alt="Complex" style={{ ...responsiveMetric(20, 20) }} />
                          <span style={{ ...responsiveText(16, 32, null, 'bold', 'noto', '#272B2B') }}>印刷枚数</span>
                        </div>
                        <div className="flex items-baseline" style={{ gap: vw(2) }}>
                          <span style={{ ...responsiveText(18, 40, null, 'bold', 'noto', '#222') }}>{loading ? '...' : formatNumber(statistics.current_month.print_count)}</span>
                          <span style={{ ...responsiveText(12, 32, null, 'bold', 'noto', '#222') }}>枚</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full" style={{ gap: vw(16) }}>
                    <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636'), marginTop: vw(12), marginBottom: vw(6) }}>累計の印刷・販売</span>
                    <div className="flex flex-col items-start w-full" style={{ gap: vw(14) }}>
                      <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6] w-full" style={{ gap: vw(5), paddingRight: vw(16), paddingLeft: vw(16), paddingTop: vw(8), paddingBottom: vw(8) }}>
                        <div className="flex flex-row items-center" style={{ gap: vw(6) }}>
                          <img src={money_hand} alt="Money Hand" style={{ ...responsiveMetric(20, 20) }} />
                          <span style={{ ...responsiveText(16, 32, null, 'bold', 'noto', '#272B2B') }}>販売売上</span>
                        </div>
                        <div className="flex items-baseline" style={{ gap: vw(2) }}>
                          <span style={{ ...responsiveText(18, 40, null, 'bold', 'noto', '#222') }}>{formatNumber(statistics.total.sales_revenue)}</span>
                          <span style={{ ...responsiveText(12, 32, null, 'bold', 'noto', '#222') }}>円</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6] w-full" style={{ gap: vw(5), paddingRight: vw(16), paddingLeft: vw(16), paddingTop: vw(8), paddingBottom: vw(8) }}>
                        <div className="flex flex-row items-center" style={{ gap: vw(6) }}>
                          <img src={complex} alt="Complex" style={{ ...responsiveMetric(20, 20) }} />
                          <span style={{ ...responsiveText(16, 32, null, 'bold', 'noto', '#272B2B') }}>印刷枚数</span>
                        </div>
                        <div className="flex items-baseline" style={{ gap: vw(2) }}>
                          <span style={{ ...responsiveText(18, 40, null, 'bold', 'noto', '#222') }}>{loading ? '...' : formatNumber(statistics.total.print_count)}</span>
                          <span style={{ ...responsiveText(12, 32, null, 'bold', 'noto', '#222') }}>枚</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Main Section */}
        <main className="hidden md:flex flex-col items-start justify-center" style={{ paddingTop: vwd(140), paddingBottom: vwd(40), paddingLeft: vwd(40), paddingRight: vwd(40), gap: vwd(32), width: vwd(928), marginLeft: vwd(55), marginRight: vwd(55) }}>
          <div className="flex flex-col items-start w-full" style={{ gap: vwd(26.5) }}>
            <h1 style={{ ...responsiveTextD(36, 54, null, 'bold', 'noto', '#363636') }}>さっそくはじめよう！</h1>
            <div className="flex flex-row items-start justify-between w-full">
              {/* First card */}
              <a href='/myshop/registerproduct' className="relative bg-white rounded-[10px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]" style={{ ...responsiveMetricD(420, 130), paddingleft: vwd(16) }}>
                <div style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#272B2B'), ...responsivePositionD(27, 16) }}>写真を商品登録</div>
                <div className="flex items-center" style={{ gap: vwd(8), ...responsivePositionD(46, 16) }}>
                  <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveTextD(23, 36, null, 'bold', 'noto') }}>画像を出品しよう</span>
                  <img src={arrow_right} alt="Arrow Right" style={{ width: vwd(20), height: vwd(15) }} />
                </div>
                <div className="absolute right-0 bottom-0 overflow-hidden" style={{ ...responsiveMetricD(151, 130) }}>
                  <img src={sm_photo1} alt="photo1" style={{ ...responsiveMetricD(91, 165), ...responsivePositionD(31, 18) }} />
                  <img src={sm_photo2} alt="photo2" style={{ ...responsiveMetricD(91, 165), ...responsivePositionD(14, 42) }} />
                </div>
              </a>
              {/* Second card */}
              <div
                className="relative bg-white rounded-[10px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] cursor-pointer hover:shadow-[0_4px_36px_0_rgba(0,0,0,0.15)] transition-shadow"
                style={{ ...responsiveMetricD(420, 130), paddingleft: vwd(16) }}
                onClick={() => router.visit('/myshop/edit')}
              >
                <div style={{ ...responsiveTextD(13, 19.5, null, 'medium', 'noto', '#272B2B'), ...responsivePositionD(27, 16) }}>ショップ情報編集</div>
                <div className="flex items-center" style={{ gap: vwd(8), ...responsivePositionD(46, 16) }}>
                  <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveTextD(23, 36, null, 'bold', 'noto') }}>ショップ設定をしよう</span>
                  <img src={arrow_right} alt="Arrow Right" style={{ width: vwd(20), height: vwd(15) }} />
                </div>
                <div className="absolute right-0 bottom-0 overflow-hidden" style={{ ...responsiveMetricD(142, 130) }}>
                  <img src={sm_photo3} alt="shop info" style={{ ...responsiveMetricD(142, 250), objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
          {/* Second container2 */}
          <div className="flex flex-col items-start w-full  bg-white rounded-[10px] shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]" style={{ paddingTop: vwd(20), paddingBottom: vwd(20), paddingLeft: vwd(50), paddingRight: vwd(50), gap: vwd(16) }}>
            <div className="flex flex-row items-start w-full justify-between">
              <span style={{ ...responsiveTextD(24, 37, 1.05, 'bold', 'noto', '#000') }}>出金・売上の概要</span>
              <a href='/myshop/transaction' className="flex items-center" style={{ gap: vwd(4), padding: vwd(12), width: vwd(152) }}>
                <img src={list_unordered} alt="List" style={{ ...responsiveMetricD(16, 16) }} />
                <span style={{ ...responsiveTextD(14, 10, null, 'medium', 'noto', '#222') }}>詳細を見る</span>
                <img src={arrow_right} alt="Arrow Right" style={{ ...responsiveMetricD(20, 15) }} />
                </a>
            </div>
            {/* frame 212 */}
            <div className="flex flex-col items-start w-full" style={{ gap: vwd(32) }}>
              <div className="flex flex-col items-start" style={{ gap: vwd(8) }}>
                <span style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>収益残高</span>
                <div className="flex items-baseline" style={{ gap: vwd(2) }}>
                  <span style={{ ...responsiveTextD(46, 40, null, 'bold', 'noto', '#363636') }}>{formatNumber(statistics.total.balance)}</span>
                  <span style={{ ...responsiveTextD(18, 30, null, 'normal', 'noto', '#363636') }}>円</span>
                </div>
                <div className="flex flex-col" style={{ gap: vwd(8) }}>
                  <div style={{ ...responsiveTextD(12, 19, null, 'normal', 'noto', '#272B2B') }}>販売手数料：{statistics.commission_rate}％ を差し引いた金額です。<br />合計金額が{statistics.payment_threshold}円以上（お支払い基準額）の場合に、毎月支払いが行われます。</div>
                </div>
              </div>
              {/* container 2122 */}
              <div className="flex flex-col items-start w-full" style={{ gap: vwd(16), paddingBottom: vwd(16) }}>
                <div className="flex flex-col items-start w-full" style={{ gap: vwd(16) }}>
                  <span style={{ ...responsiveTextD(20, 28, null, 'bold', 'noto', '#363636'), marginTop: vwd(25), marginBottom: vwd(6) }}>今月の印刷・販売</span>
                  <div className="flex flex-row items-start w-full justify-between">
                    <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6]" style={{ gap: vwd(5), paddingRight: vwd(16), paddingLeft: vwd(16), paddingTop: vwd(8), paddingBottom: vwd(8), width: vwd(368) }}>
                      <div className="flex flex-row items-center" style={{ gap: vwd(6) }}>
                        <img src={money_hand} alt="Money Hand" style={{ ...responsiveMetricD(20, 20) }} />
                        <span style={{ ...responsiveTextD(16, 32, null, 'bold', 'noto', '#272B2B') }}>販売売上</span>
                      </div>
                      <div className="flex items-baseline" style={{ gap: vwd(2) }}>
                        <span style={{ ...responsiveTextD(30, 26, null, 'bold', 'noto', '#222') }}>{formatNumber(statistics.current_month.sales_revenue)}</span>
                        <span style={{ ...responsiveTextD(14, 21, 0.7, 'normal', 'noto', '#222') }}>円</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6]" style={{ gap: vwd(5), paddingRight: vwd(16), paddingLeft: vwd(16), paddingTop: vwd(8), paddingBottom: vwd(8), width: vwd(368) }}>
                      <div className="flex flex-row items-center" style={{ gap: vwd(6) }}>
                        <img src={complex} alt="Complex" style={{ ...responsiveMetricD(20, 20) }} />
                        <span style={{ ...responsiveTextD(16, 32, null, 'bold', 'noto', '#272B2B') }}>印刷枚数</span>
                      </div>
                      <div className="flex items-baseline" style={{ gap: vwd(2) }}>
                        <span style={{ ...responsiveTextD(30, 26, null, 'bold', 'noto', '#222') }}>{loading ? '...' : formatNumber(statistics.current_month.print_count)}</span>
                        <span style={{ ...responsiveTextD(14, 21, 0.7, 'normal', 'noto', '#222') }}>枚</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full" style={{ gap: vwd(16) }}>
                  <span style={{ ...responsiveTextD(20, 28, null, 'bold', 'noto', '#363636'), marginTop: vwd(25), marginBottom: vwd(6) }}>累計の印刷・販売</span>
                  <div className="flex flex-row items-start w-full justify-between">
                    <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6]" style={{ gap: vwd(5), paddingRight: vwd(16), paddingLeft: vwd(16), paddingTop: vwd(8), paddingBottom: vwd(8), width: vwd(368) }}>
                      <div className="flex flex-row items-center" style={{ gap: vwd(6) }}>
                        <img src={money_hand} alt="Money Hand" style={{ ...responsiveMetricD(20, 20) }} />
                        <span style={{ ...responsiveTextD(16, 32, null, 'bold', 'noto', '#272B2B') }}>販売売上</span>
                      </div>
                      <div className="flex items-baseline" style={{ gap: vwd(2) }}>
                        <span style={{ ...responsiveTextD(30, 26, null, 'bold', 'noto', '#222') }}>{formatNumber(statistics.total.sales_revenue)}</span>
                        <span style={{ ...responsiveTextD(14, 21, 0.7, 'normal', 'noto', '#222') }}>円</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start rounded-[10px] bg-[#F6F6F6]" style={{ gap: vwd(5), paddingRight: vwd(16), paddingLeft: vwd(16), paddingTop: vwd(8), paddingBottom: vwd(8), width: vwd(368) }}>
                      <div className="flex flex-row items-center" style={{ gap: vwd(6) }}>
                        <img src={complex} alt="Complex" style={{ ...responsiveMetricD(20, 20) }} />
                        <span style={{ ...responsiveTextD(16, 32, null, 'bold', 'noto', '#272B2B') }}>印刷枚数</span>
                      </div>
                      <div className="flex items-baseline" style={{ gap: vwd(2) }}>
                        <span style={{ ...responsiveTextD(30, 26, null, 'bold', 'noto', '#222') }}>{loading ? '...' : formatNumber(statistics.total.print_count)}</span>
                        <span style={{ ...responsiveTextD(14, 21, 0.7, 'normal', 'noto', '#222') }}>枚</span>
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

