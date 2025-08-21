import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer'
import fig1_1 from '@/assets/images/beginner_fig1-1.jpg';
import fig1_2 from '@/assets/images/beginner_fig1-2.png';
import fig1_3 from '@/assets/images/beginner_fig1-3.png';
import fig1_4 from '@/assets/images/beginner_fig1-4.png';
import radio from '@/assets/images/beginner_radio.svg';
import bubble from '@/assets/images/bubble.svg';
import question from '@/assets/images/question.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';
import upload_sample from '@/assets/images/upload-sample-img.png';
import beginnerHero from '@/assets/images/beginner_hero.png';
import priceMobile from '@/assets/images/price_mobile.png';

import '@/../../resources/css/Beginner.css';

export default function Beginner() {
    return (
        <>
        <Header />
        <div className="beginner-hero-section">
          <div className="beginner-hero-frame">
            <div
              className="beginner-hero-image"
              style={{
                width: '75.375rem', // 1206px
                height: '75.375rem', // 1206px
                position: 'absolute',
                top: '-20rem', // -320px
                left: '50%',
                transform: 'translateX(-50%)',
                aspectRatio: '1 / 1',
                flexShrink: 0,
                background: `url(${beginnerHero}) lightgray 50% / cover no-repeat`
              }}
            />
            <div className="beginner-hero-gradient" />
            <div className="beginner-hero-center-title">かんたん出品ガイド</div>
          </div>
          <div className="beginner-hero-content">
            <h2 className="beginner-hero-title">めちゃプリとは</h2>
            <div className="beginner-hero-divider">
              <div className="beginner-hero-divider-left" />
            </div>
            <div className="beginner-hero-description">
              スマホ1つで公式グッズを簡単に販売できます。<br />
              写真をアップするだけで在庫管理や発送作業も一切不要。<br />
              ファンの手元に写真がすぐに届くコンビニプリントサービスです。
            </div>
          </div>
          <div className="beginner-upload-frame">
            <div className="beginner-upload-header">
              <svg className="beginner-upload-svg" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <mask id="mask0_2_11362" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
                  <rect x="0.5" y="0.295166" width="43" height="43" fill="white"/>
                </mask>
                <g mask="url(#mask0_2_11362)">
                  <rect x="0.5" y="0.295166" width="43" height="43" rx="21.5" fill="url(#paint0_linear_2_11362)"/>
                </g>
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#FFF" fontFamily="'General Sans', sans-serif" fontSize="20" fontStyle="italic" fontWeight="700" style={{ lineHeight: 18 }}>01</text>
                <defs>
                  <linearGradient id="paint0_linear_2_11362" x1="43.5" y1="21.6015" x2="0.5" y2="21.6015" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1"/>
                    <stop offset="1" stopColor="#AB31D3"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="beginner-upload-title">写真をアップロード</span>
            </div>
            <div className="beginner-image-section">
              <div className="beginner-image-group">
                <div className="beginner-image-subframe beginner-image-subframe-first">
                  <img src={fig1_1} alt="fig1_1" className="beginner-image-photo" />
                  <img src={fig1_2} alt="fig1_2" className="beginner-image-photo" />
                </div>
                <div className="beginner-image-subframe beginner-image-subframe-second">
                  <img src={fig1_3} alt="fig1_3" className="beginner-image-photo" />
                  <img src={fig1_4} alt="fig1_4" className="beginner-image-photo" />
                </div>
              </div>
            </div>
            <div className="beginner-image-note">
              下記の条件に沿って写真をアップロードします。<br />
              画像サイズ：6000*6000以内<br />
              画像容量：25MB以内<br />
              形式：JPG,PNG,PDF<br />
              iPhoneやAndroid端末で撮影した写真もそのままご利用できます。
            </div>
          </div>
          <div className="beginner-productinfo-frame">
            <div className="beginner-productinfo-title-row">
              <svg className="beginner-productinfo-svg" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <mask id="mask0_2_11362_02" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
                  <rect x="0.5" y="0.295166" width="43" height="43" fill="white"/>
                </mask>
                <g mask="url(#mask0_2_11362_02)">
                  <rect x="0.5" y="0.295166" width="43" height="43" rx="21.5" fill="url(#paint0_linear_2_11362_02)"/>
                </g>
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#FFF" fontFamily="'General Sans', sans-serif" fontSize="20" fontStyle="italic" fontWeight="700" style={{ lineHeight: 18 }}>02</text>
                <defs>
                  <linearGradient id="paint0_linear_2_11362_02" x1="43.5" y1="21.6015" x2="0.5" y2="21.6015" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1"/>
                    <stop offset="1" stopColor="#AB31D3"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="beginner-productinfo-title">商品情報を入力</span>
            </div>
            <div className="beginner-fee-input-frame">
              <div className="beginner-fee-input-row">
                <svg className="beginner-fee-radio-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <rect x="0.4" y="0.989844" width="15.2" height="15.2" rx="7.6" fill="white"/>
                  <rect x="0.4" y="0.989844" width="15.2" height="15.2" rx="7.6" stroke="url(#paint0_linear_268_7036)" strokeWidth="0.8"/>
                  <g filter="url(#filter0_d_268_7036)">
                    <rect x="2.40039" y="2.98975" width="11.2" height="11.2" rx="5.6" fill="url(#paint1_linear_268_7036)"/>
                    <rect x="2.80039" y="3.38975" width="10.4" height="10.4" rx="5.2" stroke="#FFD6ED" strokeOpacity="0.25" strokeWidth="0.8"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_268_7036" x="0.800391" y="2.98975" width="14.3992" height="14.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="1.6"/>
                      <feGaussianBlur stdDeviation="0.8"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0.769137 0 0 0 0 0.0446477 0 0 0 0 0.449014 0 0 0 0.15 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_268_7036"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_268_7036" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_268_7036" x1="16" y1="8.51778" x2="-1.84886e-07" y2="8.51778" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF2AA1"/>
                      <stop offset="1" stopColor="#AB31D3"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_268_7036" x1="13.6004" y1="8.5393" x2="2.40039" y2="8.5393" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF2AA1"/>
                      <stop offset="1" stopColor="#AB31D3"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="beginner-fee-text">有料</span>
              </div>
              <div className="beginner-fee-input-form-row">
                <input className="beginner-fee-input-form" type="number" min="100" max="100000" />
                <span className="beginner-fee-yen">円</span>
                <span className="beginner-fee-range">100~100000円まで</span>
              </div>
              <div className="beginner-fee-free-row">
                <span className="beginner-fee-free-circle"></span>
                <span className="beginner-fee-free-text">無料</span>
              </div>
            </div>
            <div className="beginner-productinfo-note">
              <div className="beginner-productinfo-note-line1">
                タイトルや販売価格などを登録します。
              </div>
              <div className="beginner-productinfo-note-line2">
                <span className="beginner-productinfo-note-label">販売価格は</span>
                <span className="beginner-productinfo-note-em">0円〜10万円</span>
                <span className="beginner-productinfo-note-label">まで設定できます。</span>
              </div>
            </div>
          </div>
          <div className="beginner-display-frame">
            <div className="beginner-display-title-row">
              <svg className="beginner-display-svg" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <mask id="mask0_2_11362_03" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
                  <rect x="0.5" y="0.295166" width="43" height="43" fill="white"/>
                </mask>
                <g mask="url(#mask0_2_11362_03)">
                  <rect x="0.5" y="0.295166" width="43" height="43" rx="21.5" fill="url(#paint0_linear_2_11362_03)"/>
                </g>
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#FFF" fontFamily="'General Sans', sans-serif" fontSize="20" fontStyle="italic" fontWeight="700" style={{ lineHeight: 18 }}>03</text>
                <defs>
                  <linearGradient id="paint0_linear_2_11362_03" x1="43.5" y1="21.6015" x2="0.5" y2="21.6015" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1"/>
                    <stop offset="1" stopColor="#AB31D3"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="beginner-display-title">商品の表示方法を設定する</span>
            </div>
            <div className="beginner-display-desc1">
              下記いずれかの設定を追加することができます。
            </div>
            <div className="beginner-display-gacha">
              <div className="beginner-display-gacha-title">ガチャ</div>
              <div className="beginner-display-gacha-desc">複数の写真の中からランダムで1枚だけ印刷されます。</div>
            </div>
            <div className="beginner-display-sample-container" style={{ marginTop: '2rem' }}>
              <div className="beginner-display-sample-image-wrapper">
                <img src={upload_sample} alt="upload sample" className="beginner-display-sample-image" />
                <div className="beginner-display-sample-gradient-overlay" />
                <div className="beginner-display-bubble-wrapper">
                  <img src={bubble} alt="bubble" className="beginner-display-bubble-svg" />
                  <div className="beginner-display-bubble-title">ガチャ</div>
                  <div className="beginner-display-bubble-desc">ランダムで商品が手に入る！</div>
                </div>
              </div>
            </div>
            <div className="beginner-display-filter-section">
              <div className="beginner-display-filter-title">ぼかしフィルター</div>
              <div className="beginner-display-filter-desc">コンビニで印刷するまでどんな写真かわかりません。</div>
            </div>
            <div className="beginner-display-blurred-container">
              <div className="beginner-display-blurred-image-wrapper">
                <img src={upload_sample} alt="upload sample blurred" className="beginner-display-blurred-image" />
                <div className="beginner-display-blurred-overlay">
                  <img src={question} alt="question" className="beginner-display-question-svg" />
                  <div className="beginner-display-question-title">ぼかしフィルター</div>
                  <div className="beginner-display-question-desc">印刷して確認しよう</div>
                </div>
              </div>
            </div>

            <div className="beginner-display-password-section">
              <div className="beginner-display-password-title">パスワード</div>
              <div className="beginner-display-password-desc">パスワードを知っている人だけが印刷できます。</div>
            </div>
            <div className="beginner-display-password-container">
              <div className="beginner-display-password-image-wrapper">
                <div className="beginner-display-password-overlay">
                  <img src={lock} alt="lock" className="beginner-display-lock-svg" />
                  <div className="beginner-display-lock-title">パスワード</div>
                  <div className="beginner-display-lock-desc">PWを入れて印刷しよう</div>
                  <div className="beginner-display-password-form-container">
                    <input 
                      type="password" 
                      placeholder="半角英数16文字まで" 
                      className="beginner-display-password-input" 
                    />
                    <button className="beginner-display-password-submit">送信</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="beginner-display-warning-section">
              <div className="beginner-display-warning-title">ワンクッション</div>
              <div className="beginner-display-warning-desc">写真を表示する前に閲覧注意を促すことができます。</div>
            </div>
            <div className="beginner-display-warning-container">
              <div className="beginner-display-warning-image-wrapper">
                <div className="beginner-display-warning-overlay">
                  <img src={warning} alt="warning" className="beginner-display-warning-svg" />
                  <div className="beginner-display-warning-label">WARNING</div>
                  <div className="beginner-display-warning-text">クリックして内容を確認</div>
                </div>
              </div>
            </div>
          </div>
        <div className="beginner-productinfo-cta-section">
          <div className="beginner-productinfo-cta-title">今すぐめちゃプリを体験！</div>
          <a href="/myshop/registerproduct" className="beginner-productinfo-cta-btn">出品をはじめる</a>
        </div>
        </div>
        {/* Mobile Hero Section */}
        <div className="beginner-hero-mobile-section">
          <div className="beginner-hero-image-mobile">
            <img
              src={beginnerHero}
              alt="beginner hero"
            />
            <span className="beginner-hero-image-mobile-text">
            かんたん出品ガイド
            </span>
          </div>
          <div className="beginner-hero-mobile-subtext">
            ご利用のコンビニエンスストアを選択してください
          </div>
          <div className="beginner-hero-mobile-title">
            めちゃプリとは
          </div>
          <div className="beginner-hero-mobile-divider"></div>
          <div className="beginner-hero-mobile-description">
            スマホ1つで公式グッズを簡単に販売できます。{'\n'}
            写真をアップするだけで在庫管理や発送作業も一切不要。{'\n'}
            ファンの手元に写真がすぐに届くコンビニプリントサービスです。
          </div>
        </div>

        {/* Mobile Section 1: Photo Upload */}
        <div className="beginner-upload-mobile-frame">
          <div className="beginner-upload-mobile-header">
            <div className="beginner-upload-mobile-svg">
              <span className="beginner-upload-mobile-svg-text">01</span>
            </div>
            <span className="beginner-upload-mobile-title">写真をアップロード</span>
          </div>
          <div className="beginner-image-mobile-section">
            <div className="beginner-image-mobile-group">
              <div className="beginner-image-mobile-subframe beginner-image-mobile-subframe-first">
                <img src={fig1_1} alt="fig1_1" className="beginner-image-mobile-photo" />
                <img src={fig1_2} alt="fig1_2" className="beginner-image-mobile-photo" />
              </div>
              <div className="beginner-image-mobile-subframe beginner-image-mobile-subframe-second">
                <img src={fig1_3} alt="fig1_3" className="beginner-image-mobile-photo" />
                <img src={fig1_4} alt="fig1_4" className="beginner-image-mobile-photo" />
              </div>
            </div>
          </div>
          <div className="beginner-image-mobile-note">
            下記の条件に沿って写真をアップロードします。{'\n'}
            画像サイズ：6000*6000以内{'\n'}
            画像容量：25MB以内{'\n'}
            形式：JPG,PNG,PDF{'\n'}
            iPhoneやAndroid端末で撮影した写真もそのままご利用できます。
          </div>
        </div>

        {/* Mobile Section 2: Product Information */}
        <div className="beginner-productinfo-mobile-frame">
          <div className="beginner-productinfo-mobile-title-row">
            <div className="beginner-productinfo-mobile-svg">
              <span className="beginner-productinfo-mobile-svg-text">02</span>
            </div>
            <span className="beginner-productinfo-mobile-title">商品情報を入力</span>
          </div>
          <div
            className="beginner-productinfo-mobile-price-image"
            style={{ backgroundImage: `url(${priceMobile})` }}
          />
          <div className="beginner-fee-mobile-input-frame">
            <div className="beginner-fee-mobile-input-row">
              <svg className="beginner-fee-mobile-radio-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <rect x="0.4" y="0.989844" width="15.2" height="15.2" rx="7.6" fill="white"/>
                <rect x="0.4" y="0.989844" width="15.2" height="15.2" rx="7.6" stroke="url(#paint0_linear_268_7036)" strokeWidth="0.8"/>
                <g filter="url(#filter0_d_268_7036)">
                  <rect x="2.40039" y="2.98975" width="11.2" height="11.2" rx="5.6" fill="url(#paint1_linear_268_7036)"/>
                  <rect x="2.80039" y="3.38975" width="10.4" height="10.4" rx="5.2" stroke="#FFD6ED" strokeOpacity="0.25" strokeWidth="0.8"/>
                </g>
                <defs>
                  <filter id="filter0_d_268_7036" x="0.800391" y="2.98975" width="14.3992" height="14.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1.6"/>
                    <feGaussianBlur stdDeviation="0.8"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.769137 0 0 0 0 0.0446477 0 0 0 0 0.449014 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_268_7036"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_268_7036" result="shape"/>
                  </filter>
                  <linearGradient id="paint0_linear_268_7036" x1="16" y1="8.51778" x2="-1.84886e-07" y2="8.51778" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1"/>
                    <stop offset="1" stopColor="#AB31D3"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_268_7036" x1="13.6004" y1="8.5393" x2="2.40039" y2="8.5393" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2AA1"/>
                    <stop offset="1" stopColor="#AB31D3"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="beginner-fee-mobile-text">有料</span>
            </div>
            <div className="beginner-fee-mobile-input-form-row">
              <input className="beginner-fee-mobile-input-form" type="number" min="100" max="100000" />
              <span className="beginner-fee-mobile-yen">円</span>
              <span className="beginner-fee-mobile-range">100~100000円まで</span>
            </div>
            <div className="beginner-fee-mobile-free-row">
              <span className="beginner-fee-mobile-free-circle"></span>
              <span className="beginner-fee-mobile-free-text">無料</span>
            </div>
          </div>
          <div className="beginner-productinfo-mobile-note">
            <div className="beginner-productinfo-mobile-note-line1">
              タイトルや販売価格などを登録します。
            </div>
            <div className="beginner-productinfo-mobile-note-line2">
              <span className="beginner-productinfo-mobile-note-label">販売価格は</span>
              <span className="beginner-productinfo-mobile-note-em">0円〜10万円</span>
              <span className="beginner-productinfo-mobile-note-label">まで設定できます。</span>
            </div>
          </div>
        </div>

        {/* Mobile Section 3: Display Settings */}
        <div className="beginner-display-mobile-frame">
          <div className="beginner-display-mobile-title-row">
            <div className="beginner-display-mobile-svg">
              <span className="beginner-display-mobile-svg-text">03</span>
            </div>
            <span className="beginner-display-mobile-title">商品の表示方法を設定する</span>
          </div>
          <div className="beginner-display-mobile-desc1">
            下記いずれかの設定を追加することができます。
          </div>
          <div className="beginner-display-mobile-gacha">
            <div className="beginner-display-mobile-gacha-title">ガチャ</div>
            <div className="beginner-display-mobile-gacha-desc">複数の写真の中からランダムで1枚だけ印刷されます。</div>
          </div>
          <div className="beginner-display-mobile-sample-container">
            <div className="beginner-display-mobile-sample-image-wrapper">
              <img src={upload_sample} alt="upload sample" className="beginner-display-mobile-sample-image" />
              <div className="beginner-display-mobile-sample-gradient-overlay" />
              <div className="beginner-display-mobile-bubble-wrapper">
                <img src={bubble} alt="bubble" className="beginner-display-mobile-bubble-svg" />
                <div className="beginner-display-mobile-bubble-title">ガチャ</div>
                <div className="beginner-display-mobile-bubble-desc">ランダムで商品が手に入る！</div>
              </div>
            </div>
          </div>
          <div className="beginner-display-mobile-filter-section">
            <div className="beginner-display-mobile-filter-title">ぼかしフィルター</div>
            <div className="beginner-display-mobile-filter-desc">コンビニで印刷するまでどんな写真かわかりません。</div>
          </div>
          <div className="beginner-display-mobile-blurred-container">
            <div className="beginner-display-mobile-blurred-image-wrapper">
              <img src={upload_sample} alt="upload sample blurred" className="beginner-display-mobile-blurred-image" />
              <div className="beginner-display-mobile-blurred-overlay" />
              <div className="beginner-display-mobile-blurred-content">
                <img src={question} alt="question" className="beginner-display-mobile-question-svg" />
                <div className="beginner-display-mobile-question-title">ぼかしフィルター</div>
                <div className="beginner-display-mobile-question-desc">印刷して確認しよう！</div>
              </div>
            </div>
          </div>
          <div className="beginner-display-mobile-password-section">
            <div className="beginner-display-mobile-password-title">パスワード</div>
            <div className="beginner-display-mobile-password-desc">パスワードを知っている人だけが印刷できます。</div>
          </div>
          <div className="beginner-display-mobile-password-container">
            <div className="beginner-display-mobile-password-image-wrapper">
              <div className="beginner-display-mobile-password-overlay">
                <img src={lock} alt="lock" className="beginner-display-mobile-lock-svg" />
                <div className="beginner-display-mobile-lock-title">パスワード</div>
                <div className="beginner-display-mobile-lock-desc">PWを入れて印刷しよう</div>
                <div className="beginner-display-mobile-password-form-container">
                  <input 
                    type="password" 
                    placeholder="半角英数16文字まで" 
                    className="beginner-display-mobile-password-input" 
                  />
                  <button className="beginner-display-mobile-password-submit">送信</button>
                </div>
              </div>
            </div>
          </div>
          <div className="beginner-display-mobile-warning-section">
            <div className="beginner-display-mobile-warning-title">ワンクッション</div>
            <div className="beginner-display-mobile-warning-desc">写真を表示する前に閲覧注意を促すことができます。</div>
          </div>
          <div className="beginner-display-mobile-warning-container">
            <div className="beginner-display-mobile-warning-image-wrapper">
              <div className="beginner-display-mobile-warning-overlay">
                <img src={warning} alt="warning" className="beginner-display-mobile-warning-svg" />
                <div className="beginner-display-mobile-warning-label">WARNING</div>
                <div className="beginner-display-mobile-warning-text">クリックして内容を確認</div>
              </div>
            </div>
          </div>
        </div>
        <div className="beginner-mobile-cta-section md:hidden" >
          <div className="beginner-mobile-cta-title">今すぐめちゃプリを体験！</div>
          <a href="/myshop/registerproduct" className="beginner-mobile-cta-btn">出品をはじめる</a>
        </div>
        <Footer />
        </>
    )
}