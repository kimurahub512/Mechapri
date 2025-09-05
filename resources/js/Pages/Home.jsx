
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import { vw, vwd, responsiveText, responsivePosition, responsiveMetric, responsiveTextD, responsivePositionD, responsiveMetricD } from '@/lib/utils';
import logo_group from '@/assets/images/homepage/logo_group.png';
import header_image from '@/assets/images/homepage/hero.png';
import hero_m from '@/assets/images/homepage/hero_m.jpg';
import section2_image from '@/assets/images/homepage/section2.png';
import section2_image_m from '@/assets/images/homepage/section2_image_m.png';
import section2_phones from '@/assets/images/homepage/section2_phones.png';
import section2_phones_m from '@/assets/images/homepage/section2_phones_m.png';
import section3_1 from '@/assets/images/homepage/section3_1.png';
import section3_2 from '@/assets/images/homepage/section3_2.png';
import section3_2_half from '@/assets/images/homepage/section3_2_half.png';
import section3_3 from '@/assets/images/homepage/section3_3.svg';
import section3_4 from '@/assets/images/homepage/section3_4.png';
import section5_1 from '@/assets/images/homepage/section5_1.png';
import section5_1_m from '@/assets/images/homepage/section5_1_m.png';
import section5_2 from '@/assets/images/homepage/section5_2.png';
import section5_2_m from '@/assets/images/homepage/section5_2_m.png';
import section6_1 from '@/assets/images/homepage/section6_1.png';
import section6_2 from '@/assets/images/homepage/section6_2.png';
import section6_3 from '@/assets/images/homepage/section6_3.png';
import section6_m from '@/assets/images/homepage/section6_m.png';
import section8 from '@/assets/images/homepage/section8.png';
import bubble from '@/assets/images/bubble.svg';
import lock from '@/assets/images/lock.svg';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Home() {
  const { auth } = usePage().props;

  const handleListNowClick = () => {
    if (auth?.user) {
      // User is logged in, navigate to register product page
      router.visit('/myshop/registerproduct');
    } else {
      // User is not logged in, navigate to login page
      router.visit('/login');
    }
  };

  return (

    <div className='product-details-no-footer-gap bg-[#FFF]'>
      <Header />
      {/*desktop version*/}
      <div className='hidden md:flex flex-col items-center w-full gap-[32px] pt-[98px]'>
        {/*hero section*/}
        <div className='flex flex-col items-center w-full relative px-[120px] pt-[66px] pb-[150px]'>
          <div className='flex flex-col items-start w-full gap-5'>
            <div className='flex flex-row items-start'>
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={responsiveTextD(80, 104, null, 'black', 'noto')}>
                めちゃプリ
              </span>
              <span style={responsiveTextD(64, 104, null, 'black', 'noto', '#363636')}>
                であなたの写真を
              </span>
            </div>
            <div className='flex flex-col items-starttext-[16px]'>
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={responsiveTextD(88, 94, null, 'black', 'mplus')}>
                "公式グッズ"
              </span>
              <div className='flex flex-row items-start'>
                <span style={responsiveTextD(64, 94, null, 'black', 'mplus', '#363636')}>
                  として
                </span>
                <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={responsiveTextD(80, 94, null, 'black', 'mplus')}>
                  販売
                </span>
              </div>
            </div>
            <span style={{ ...responsiveTextD(18, 27, null, 'bold', 'noto', '#222'), width: vwd(643), marginTop: vwd(36) }}>
              写真をアップするだけで、全国のコンビニががあなたのグッズ販売ブースに。
              めちゃプリであなたの写真を"公式グッズ"として販売 しましょう！
            </span>
            <div className='flex flex-row items-center px-[30px] py-[12px] mt-[49px]' style={responsiveMetricD(546, null)}>
              <div className='flex flex-row items-start gap-[22px]'>
                <span className='whitespace-nowrap' style={responsiveTextD(18, 27, null, 'bold', 'noto', '#222')}>
                  対象コンビニ
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="60" viewBox="0 0 2 60" fill="none" style={responsiveMetricD(2, 60)}>
                  <path d="M1 0.25V59.75" stroke="#222222" />
                </svg>
                <img src={logo_group} alt="logo_group" style={responsiveMetricD(303, 62)} />
              </div>
            </div>
            <button
              onClick={handleListNowClick}
              className='flex flex-col items-center justify-center bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] hover:opacity-90 transition-opacity cursor-pointer'
              style={{
                ...responsiveMetricD(494, 64),
                borderRadius: vwd(4),
              }}
            >
              <span style={responsiveTextD(14, 21, null, 'bold', 'noto', '#FFF')}>
                １分で無料
              </span>
              <span style={responsiveTextD(18, 21, null, 'bold', 'noto', '#FFF')}>
                今すぐ出品する
              </span>
            </button>
          </div>
          <img src={header_image} alt="header_image" style={{ ...responsiveMetricD(656, 677), ...responsivePositionD(99, null, 0) }} />
        </div>
        {/*section2*/}
        <div className='relative w-full'>
          <img src={section2_image} alt="section2_image" className='w-[100%] h-[100%] overflow-hidden relative' />
          <div className='absolute inset-0 w-full h-full opacity-50 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mix-blend-overlay'></div>
          <div className='absolute inset-0 w-full h-full opacity-75 bg-gradient-to-l from-[#FF285E] to-[#AB31D3]'></div>
          <img src={section2_phones} alt="section2_image" className='overflow-hidden' style={{ ...responsiveMetricD(505, 674), ...responsivePositionD(44, 22.5) }} />
          <div className='flex flex-col items-start py-[40px] px-[80px] gap-[20px] rounded-[26px] bg-white' style={{ ...responsiveMetricD(720, null), ...responsivePositionD(115, null, 116), paddingTop: vwd(40), paddingBottom: vwd(40), paddingLeft: vwd(80), paddingRight: vwd(80), gap: vwd(20), borderRadius: vwd(26), }}>
            <div className='flex flex-col items-start justify-center'>
              <span style={responsiveTextD(24, 32, null, 'bold', 'noto', '#222')}>
                使い方
              </span>
              <span className='bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent' style={responsiveTextD(16, 29, null, 'semibold', 'noto')}>
                How to use
              </span>
            </div>
            <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={responsiveTextD(58, 72, null, 'black', 'mplus')}>
              スマホ1つで<br />
              “公式グッズ”が販売<br />
              できる
            </span>
            <span style={responsiveTextD(18, 32.76, null, 'normal', 'noto', '#363636')}>スマホ1つで公式グッズを簡単に販売できます。写真をアップするだけで在庫管理や発送作業も一切不要。ファンの手元に写真がすぐに届きます。</span>
          </div>
        </div>
        {/*section3 シークレット販売でファンの*/}
        <div className='flex flex-col items-center w-full' style={{ paddingBottom: vwd(64) }}>
          <div className='flex flex-col items-center'>
            <div className='flex flex-row items-center justify-center w-full gap-[8px]'>
              <span style={responsiveTextD(24, 32, null, 'bold', 'noto', '#222')}>
                活用事例
              </span>
              <span className='bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent' style={responsiveTextD(16, 24, null, 'semibold', 'noto')}>
                Use cases
              </span>
            </div>
            <div className='flex flex-col items-center w-full mt-[6px]'>
              <div className='flex flex-row items-center'>
                <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap" style={responsiveTextD(60, 84, null, 'black', 'mplus')}>
                  シークレット販売
                </span>
                <span style={responsiveTextD(60, 84, null, 'black', 'mplus', '#363636')}>
                  で
                </span>
                <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap" style={responsiveTextD(60, 84, null, 'black', 'mplus')}>
                  ファンの
                </span>
              </div>
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap" style={responsiveTextD(60, 84, null, 'black', 'mplus')}>
                ドキドキが倍増！
              </span>
            </div>
            <div className='flex flex-row items-center w-full mt-[19px]'>
              <span style={responsiveTextD(18, 32, null, 'black', 'noto', '#E862CB')}>
                「開けてみるまで分からない」
              </span>
              <span style={responsiveTextD(18, 32, null, 'normal', 'noto', '#222')}>
                楽しさで、
              </span>
              <span style={responsiveTextD(18, 32, null, 'black', 'noto', '#E862CB')}>
                "見えない魅力"
              </span>
              <span style={responsiveTextD(18, 32, null, 'normal', 'noto', '#222')}>
                を仕掛けられます。活用次第で
              </span>
              <span style={responsiveTextD(18, 32, null, 'black', 'noto', '#E862CB')}>
                収益爆上げ！
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center' style={{ ...responsiveMetricD(1021, null), marginTop: vwd(42.9), gap: vwd(48) }}>
            {/*step 1*/}
            <div className='flex w-full relative' style={{ ...responsiveMetricD('full', 362) }}>
              {/*image frame*/}
              <div className='rounded-[26px] border-[4px] border-[#AB31D380] overflow-hidden' style={{ ...responsiveMetricD(692, 362), ...responsivePositionD(0, null, 20) }}>
                <img src={section3_1} className='w-full h-full object-cover shadow-[0_4px_4px_0_rgba(0,0,0,0.13)]' />
              </div>
              <div className='rounded-r-[26px] opacity-75 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' style={{ ...responsivePositionD(0, null, 20), ...responsiveMetricD(230, 362) }}>
              </div>
              <div className='flex flex-col items-center justify-center' style={{ ...responsivePositionD(142, null, 100), ...responsiveMetricD(76, 95) }}>
                <img src={bubble} alt="bubble" style={{ ...responsiveMetricD(60, 60) }} />
                <span className="text-[#FFF] font-noto text-[24px] font-black leading-normal" style={responsiveTextD(24, 32, null, 'black', 'noto')}>
                  Gacha
                </span>
              </div>

              <div className='rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ ...responsivePositionD(121, 0), ...responsiveMetricD(380, 194), paddingLeft: vwd(30), paddingRight: vwd(30), }}>
                <div className='flex flex-col items-start' style={{ ...responsiveMetricD('full', 203), marginTop: vwd(-9), gap: vwd(17) }}>
                  <span className="italic" style={responsiveTextD(26, 18, null, 'bold', 'general', '#E862CB')}>01</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span style={responsiveTextD(18, 18, null, 'bold', 'noto')}>
                      ガチャ方式での販売に対応
                    </span>
                  </div>
                  <span style={responsiveTextD(16, 27, null, 'normal', 'noto')}>
                    購入するまでどの写真が当たるかわからないガチャ商品です。<br />
                    複数の写真の中からどれが当たるかは買ってみてのお楽しみ！
                  </span>
                </div>
              </div>
            </div>
            {/*step 2*/}
            <div className='flex w-full relative' style={{ ...responsiveMetricD('full', 384) }}>
              <div className='rounded-[26px] overflow-hidden' style={{ ...responsiveMetricD(692, 362), ...responsivePositionD(0, 0) }}>
                <img src={section3_2} className='w-full h-full  rounded-[26px]' />
                <img src={section3_2_half} className='rounded-r-[26px]' style={{ ...responsiveMetricD(352, 362), ...responsivePositionD(0, null, 0) }} />
              </div>
              <div className='rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ ...responsivePositionD(191, null, 0), ...responsiveMetricD(380, 194), paddingLeft: vwd(30), paddingRight: vwd(30), }}>
                <div className='flex flex-col items-start' style={{ ...responsiveMetricD('full', 203), marginTop: vwd(-9), gap: vwd(17) }}>
                  <span className="italic" style={responsiveTextD(26, 18, null, 'bold', 'general', '#E862CB')}>02</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span style={responsiveTextD(18, 18, null, 'bold', 'noto')}>
                      ぼかしフィルター機能に対応
                    </span>
                  </div>
                  <span style={responsiveTextD(16, 27, null, 'normal', 'noto')}>
                    購入前は写真にぼかしフィルターがかかっていて中身がわかりません。購入して初めて見えるドキドキ感を演出できます。
                  </span>
                </div>
              </div>
            </div>
            {/*step 3*/}
            <div className='relative' style={{ ...responsiveMetricD('full', 362) }}>
              <div className='rounded-[26px] overflow-hidden' style={{ ...responsiveMetricD(692, 362), ...responsivePositionD(0, null, 0) }}>
                <img src={section3_3} className='overflow-hidden object-cover' style={{ ...responsiveMetricD(692, 382) }} />
                <div className='w-full h-full rounded-r-[18px] bg-[#586B88] opacity-65' style={{ ...responsivePositionD(0, null, 0) }}></div>
                <div className='flex flex-col items-center justify-center' style={{ ...responsivePositionD(101, null, 223.5) }}>
                  <img src={lock} alt="lock" style={{ ...responsiveMetricD(120, 120) }} />
                  <span style={responsiveTextD(32, 36, null, 'black', 'noto', '#FFF')}>Set a password</span>
                </div>
              </div>
              <div className='rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ ...responsivePositionD(171, 0), ...responsiveMetricD(380, 194), paddingLeft: vwd(30), paddingRight: vwd(30), }}>
                <div className='flex flex-col items-start' style={{ ...responsiveMetricD('full', 203), marginTop: vwd(-9), gap: vwd(17) }}>
                  <span className="italic" style={responsiveTextD(26, 18, null, 'bold', 'general', '#E862CB')}>03</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span style={responsiveTextD(18, 18, null, 'bold', 'noto')}>
                      写真にパスワードを設定
                    </span>
                  </div>
                  <span style={responsiveTextD(16, 27, null, 'normal', 'noto')}>
                    パスワードを知っているファンだけが購入できます。ライブ配信やライブイベントでパスワードを発表すれば集客にも繋がります！
                  </span>
                </div>
              </div>
            </div>
            {/*step 4*/}
            <div className='relative' style={{ ...responsiveMetricD('full', 362) }}>
              <div className='rounded-[26px] overflow-hidden' style={{ ...responsiveMetricD(692, 362), ...responsivePositionD(0, 0) }}>
                <img src={section3_4} className='object-cover' style={{ ...responsiveMetricD(692, 362) }} />
              </div>
              <div className='rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ ...responsivePositionD(171, null, 0), ...responsiveMetricD(380, 194), paddingLeft: vwd(30), paddingRight: vwd(30), }}>
                <div className='flex flex-col items-start' style={{ ...responsiveMetricD('full', 203), marginTop: vwd(-9), gap: vwd(17) }}>
                  <span className="italic" style={responsiveTextD(26, 18, null, 'bold', 'general', '#E862CB')}>04</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span style={responsiveTextD(18, 18, null, 'bold', 'noto')}>
                      数量・期間限定販売に対応
                    </span>
                  </div>
                  <span style={responsiveTextD(16, 27, null, 'normal', 'noto')}>
                    「今しか買えない」「もう手に入らない」──そんな特別な写真を届けたい人に。数量・期間限定設定でレア感を演出できます。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*section4*/}
        <div className='flex flex-col gap-[24px] py-[16px] items-center justify-center w-full'>
          <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">全国のコンビニであなたのグッズを販売しましょう！</span>
          <button
            onClick={handleListNowClick}
            className='flex flex-col items-center justify-center w-[494px] h-[80px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] hover:opacity-90 transition-opacity cursor-pointer'
          >
            <div className='flex flex-col items-center justify-center'>
              <span className="text-[#FFF] font-noto text-[16px] font-normal leading-[21px]">１分で無料</span>
              <span className="text-[#FFF] font-noto text-[21px] font-black leading-[21px]">今すぐ出品する</span>
            </div>
          </button>
        </div>
        {/*section5*/}
        <div className='flex flex-col items-center relative' style={{ ...responsiveMetricD('full', 720) }}>
          <div className='bg-white rounded-[24px]' style={{ ...responsiveMetricD(1080, 540), ...responsivePositionD(89, 90, null) }}>
            <img src={section5_2} alt="section5_2" className='w-full h-full object-cover rounded-[24px]' />
            <div className='w-full h-full rounded-[24px] opacity-75 bg-gradient-to-l from-[#FF285E] to-[#AB31D3]' style={{ ...responsivePositionD(0, null, 0) }}></div>
            <div className='flex flex-col items-start' style={{ ...responsivePositionD(56, 80, null), ...responsiveMetricD(522), gap: vwd(20) }}>
              <div className='flex flex-col items-start' style={{ marginTop: vwd(-9) }}>
                <span style={responsiveTextD(24, 36, null, 'bold', 'mplus', "#FFF")}>マネタイズ</span>
                <span style={responsiveTextD(18, 24, null, 'semibold', 'general', "#FFF")}>Monetization</span>
              </div>
              <span style={responsiveTextD(58, 72, null, 'black', 'mplus', "#FFF")}>
                <span className="underline">売れるたびに収益</span>が入り、収益管理も<br />
                <span className="underline">カンタン</span>
              </span>
              <span style={responsiveTextD(18, 32, null, 'bold', 'noto', "#FFF")}>1枚売れるごとに報酬が入る新しいマネタイズ手段。販売データや履歴もマイページで管理可能。</span>
            </div>
          </div>
          <img src={section5_1} alt="section5_1" className="object-cover" style={{ ...responsiveMetricD(707, 457), ...responsivePositionD(20, null, 0) }} />
        </div>
        {/*section6*/}
        <div className='flex flex-col items-center w-full h-[720px] relative' style={{ ...responsiveMetricD('full', 720) }}>
          <img src={section6_2} alt="section6_2" className='object-cover' style={{ ...responsiveMetricD(740, 540), ...responsivePositionD(50, 190, null) }} />
          <img src={section6_1} alt="section6_1" className='object-cover' style={{ ...responsiveMetricD(670, 529), ...responsivePositionD(70, 0, null) }} />
          <img src={section6_3} alt="section6_3" className='object-cover' style={{ ...responsiveMetricD(650, 520), ...responsivePositionD(198, 72, null) }} />
          <div className='flex flex-col items-start' style={{ ...responsivePositionD(155, null, 125), ...responsiveMetricD(580), gap: vwd(20) }}>
            <div className='flex flex-col items-start' style={{ marginTop: vwd(-9) }}>
              <span style={responsiveTextD(24, 36, null, 'bold', 'mplus', "#222")}>クオリティー</span>
              <span style={responsiveTextD(18, 24, null, 'semibold', 'general', "#FF2AA1")}>Quality</span>
            </div>
            <span style={{ ...responsiveTextD(58, 72, null, 'black', 'mplus', "#363636") }}>
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveTextD(58, 72, null, 'black', 'mplus') }}>L判／2L判</span>に対応<br />
              写真としての仕上がりも
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveTextD(58, 72, null, 'black', 'mplus') }}>高品質</span>
            </span>
            <span className="text-[#363636] font-noto text-[18px] font-bold leading-[32px]">高品質写真用紙・シール紙に対応。推しの1枚が“実物”としてファンの手元に届きます。</span>
          </div>
        </div>
        {/*section7*/}
        <div className='flex flex-col gap-[24px] py-[16px] items-center justify-center w-full'>
          <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">全国のコンビニであなたのグッズを販売しましょう！</span>
          <button
            onClick={handleListNowClick}
            className='flex flex-col items-center justify-center w-[494px] h-[80px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] hover:opacity-90 transition-opacity cursor-pointer'
          >
            <div className='flex flex-col items-center justify-center'>
              <span className="text-[#FFF] font-noto text-[16px] font-normal leading-[21px]">１分で無料</span>
              <span className="text-[#FFF] font-noto text-[21px] font-black leading-[21px]">今すぐ出品する</span>
            </div>
          </button>
        </div>
        {/*section8*/}
        <div className='flex flex-col items-center bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] relative' style={{ ...responsiveMetricD('full', 530), marginTop: vwd(128) }}>
          <span className="italic uppercase opacity-50" style={{ WebkitTextStroke: '2px #FFF', color: 'transparent', ...responsivePositionD(96, null, 106), ...responsiveTextD(80, 84, 6, 'bold', 'general') }}>List your photos</span>
          <span className="italic uppercase opacity-50" style={{ WebkitTextStroke: '2px #FFF', color: 'transparent', ...responsivePositionD(440, null, -10), ...responsiveTextD(140, 84, 6, 'bold', 'general') }}>right now</span>
          <span className="italic uppercase opacity-50 rotate-[90deg]" style={{ WebkitTextStroke: '2px #FFF', color: 'transparent', ...responsivePositionD(352, -336, null), ...responsiveTextD(110, 84, 6, 'bold', 'general') }}>mechapuri</span>
          <img src={section8} alt="section8" className='object-cover' style={{ ...responsiveMetricD(300, 614), ...responsivePositionD(-110, null, 236) }} />
          <div className='flex flex-col items-start' style={{ ...responsivePositionD(164, 215, null), ...responsiveMetricD(591), gap: vwd(12) }}>
            <span style={{ ...responsiveTextD(18, 25, null, 'bold', 'mplus', '#FFF') }}>1分でカンタン登録完了！</span>
            <span style={{ ...responsiveTextD(60, 81, null, 'black', 'mplus', '#FFF') }}>めちゃプリで今すぐ写真を出品する</span>
            <a href='/myshop/registerproduct'>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="54" viewBox="0 0 75 54" fill="none" style={{ ...responsiveMetricD(75, 54) }}>
              <path d="M47.1143 1.31641L72.7607 26.9649L47.1143 52.6134" stroke="white" strokeWidth="2" />
              <path d="M72.7601 26.9648H0.75293" stroke="white" strokeWidth="2" />
            </svg>
            </a>
          </div>
        </div>
      </div>
      {/*mobile version*/}
      <div className="md:hidden flex flex-col items-center w-full pt-[120px] gap-[40px]">
        {/* section 1*/}
        <div className='flex flex-col items-center w-full  px-[32px] gap-[24px]'>
          {/*hero section*/}
          <img src={hero_m} alt="header_image" className='object-cover ml-[32px]' style={{ ...responsiveMetric('full', 350) }} />
          <div className='flex flex-col items-center w-full relative'>
            <div className='flex flex-col items-start w-full gap-[8px]'>
              <div className='flex flex-col items-start text-center'>
                <div className='flex flex-row items-center justify-center'>
                  <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(40, 56, null, 'black', 'noto') }}>
                    めちゃプリ
                  </span>
                  <span style={{ ...responsiveText(40, 56, null, 'black', 'noto', '#363636') }}>
                    で
                  </span>
                </div>
                <span style={{ ...responsiveText(40, 56, null, 'black', 'noto', '#363636') }}>
                  あなたの写真を
                </span>
              </div>
              <div className='flex flex-col items-start text-center'>
                <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(40, 56, null, 'black', 'mplus') }}>
                  "公式グッズ"
                </span>
                <div className='flex flex-row items-center justify-center'>
                  <span style={{ ...responsiveText(40, 56, null, 'black', 'mplus', '#363636') }}>
                    として
                  </span>
                  <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(40, 56, null, 'black', 'mplus') }}>
                    販売
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span style={{ ...responsiveText(16, 24, null, 'bold', 'noto', '#222') }} className="text-center w-full">
            写真をアップするだけで、全国のコンビニががあなたのグッズ販売ブースに。<br />
            めちゃプリであなたの写真を"公式グッズ"として販売 しましょう！
          </span>
          <div className='flex flex-col items-center w-full px-[30px] py-[6px]'>
            <div className='flex flex-col items-center w-full gap-[10px]'>
              <span style={{ ...responsiveText(16, 27, null, 'bold', 'noto', '#222') }}>
                対象コンビニ
              </span>
              <div className='w-full border-[#222] border-b-[1px]' />
              <img src={logo_group} alt="logo_group" className='w-full h-full' />
            </div>
          </div>
          <button
            onClick={handleListNowClick}
            className='flex flex-col items-center justify-center w-full max-w-[311px] h-[64px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] hover:opacity-90 transition-opacity cursor-pointer'
          >
            <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#FFF') }}>
              １分で無料
            </span>
            <span style={{ ...responsiveText(18, 21, null, 'black', 'noto', '#FFF') }}>
              今すぐ出品する
            </span>
          </button>
        </div>
        {/* section 2*/}
        <div className='flex flex-col items-center relative' style={{ ...responsiveMetric('full', 768) }}>
          <img src={section2_image_m} alt="section2_image" className='w-full h-full object-cover' />
          <img src={section2_phones_m} alt="section2_image" style={{ ...responsivePosition(46, null, 20), ...responsiveMetric(311, 505) }} />
          <div className='flex flex-col items-start py-[24px] px-[24px] gap-[12px] rounded-[26px] bg-white' style={{ ...responsivePosition(394, null, 32), ...responsiveMetric(311) }}>
            <div className='flex flex-row items-start justify-center gap-4'>
              <span style={{ ...responsiveText(16, 20, null, 'bold', 'mplus', '#222') }}>
                使い方
              </span>
              <span className='bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent' style={{ ...responsiveText(14, 20, null, 'semibold', 'general') }}>
                How to use
              </span>
            </div>
            <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(32, 44, null, 'black', 'mplus') }}>
              スマホ1つで<br />
              “公式グッズ”が販<br />
              売できる
            </span>
            <span style={{ ...responsiveText(16, 24, null, 'normal', 'noto', '#363636') }}>スマホ1つで公式グッズを簡単に販売できます。写真をアップするだけで在庫管理や発送作業も一切不要。ファンの手元に写真がすぐに届きます。</span>
          </div>
        </div>
        {/* use cases*/}
        <div className='flex flex-col items-center w-full gap-[32px] px-[32px]'>
          <div className='flex flex-col items-center gap-[16px] w-full'>
            <div className='flex flex-row items-center justify-center w-full gap-[8px]'>
              <span style={{ ...responsiveText(16, 20, null, 'bold', 'mplus', '#222') }}>
                活用事例
              </span>
              <span className='bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent' style={{ ...responsiveText(14, 20, null, 'semibold', 'general') }}>
                Use cases
              </span>
            </div>
            <div className='flex flex-col items-center w-full'>
              <div className='flex flex-row items-center'>
                <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(32, 44, null, 'black', 'mplus') }}>
                  シークレット販売
                </span>
                <span style={{ ...responsiveText(32, 44, null, 'black', 'mplus', '#363636') }}>
                  で
                </span>
              </div>
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(32, 44, null, 'black', 'mplus') }}>
                ファンの
              </span>
              <span className="bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent" style={{ ...responsiveText(32, 44, null, 'black', 'mplus') }}>
                ドキドキが倍増！
              </span>
            </div>
            <div className='flex flex-col items-center w-full'>
              <div className='flex flex-row items-center justify-center'>
                <span className="whitespace-nowrap" style={{ ...responsiveText(16, 24, null, 'black', 'noto', '#E862CB') }}>
                  「開けてみるまで分からない」
                </span>
                <span className="whitespace-nowrap" style={{ ...responsiveText(16, 24, null, 'normal', 'noto', '#222') }}>
                  楽しさ、
                </span>
              </div>
              <div className='flex flex-row items-center justify-center'>
                <span className="whitespace-nowrap" style={{ ...responsiveText(16, 24, null, 'normal', 'noto', '#222') }}>で</span>
                <span className="whitespace-nowrap" style={{ ...responsiveText(16, 24, null, 'black', 'noto', '#E862CB') }}>
                  "見えない魅力"
                </span>
                <span className="whitespace-nowrap" style={{ ...responsiveText(16, 24, null, 'normal', 'noto', '#222') }}>を仕掛けられます。</span>
              </div>
              <div className='flex flex-row items-center justify-center'>
                <span style={{ ...responsiveText(16, 24, null, 'normal', 'noto', '#222') }}>
                  活用次第で
                </span>
                <span style={{ ...responsiveText(16, 24, null, 'black', 'noto', '#E862CB') }}>
                  収益爆上げ！
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center w-full gap-[48px]'>
            {/*step 1*/}
            <div className='flex flex-col w-full gap-[16px]'>
              {/*image frame*/}
              <div className='rounded-[18px] border-[1.8px] border-[#AB31D380] overflow-hidden w-full h-[calc(43.2vw)] relative'>
                <img src={section3_1} className='w-full h-full object-cover shadow-[0_4px_4px_0_rgba(0,0,0,0.13)]' />
                <div className='absolute top-0 right-[0px] w-[33.12%] h-full rounded-r-[5px] flex items-center justify-center'>
                  <div className='absolute inset-0 rounded-r-[5px] opacity-75 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]'></div>
                  <div className='w-[49.51%] h-[31.48%] flex flex-col items-center justify-center relative z-10'>
                    <img src={bubble} alt="bubble" className='w-[52.94%] h-[52.94%]' />
                    <span className="text-[#FFF] font-noto font-black" style={{ fontSize: vw(4.26), lineHeight: vw(6.13) }}>
                      Gacha
                    </span>
                  </div>
                </div>
              </div>
              {/*text frame*/}
              <div className='w-full min-h-[172px] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ height: vw(172), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `${vw(-9)}` }}>
                  <span className="text-[#E862CB] font-['General_Sans'] italic font-bold" style={{ fontSize: vw(32), lineHeight: vw(18) }}>01</span>
                  <div className='flex flex-col items-start justify-center border-b border-[#FF2AA1]' style={{ paddingTop: vw(6), paddingBottom: vw(6), borderBottomWidth: vw(2) }}>
                    <span className="text-[#222] font-noto font-bold" style={{ fontSize: vw(16), lineHeight: vw(18) }}>
                      ガチャ方式での販売に対応
                    </span>
                  </div>
                  <span className="text-[#222] font-noto font-normal" style={{ fontSize: vw(14), lineHeight: vw(27) }}>
                    購入するまでどの写真が当たるかわからないガチャ商品です。
                    複数の写真の中からどれが当たるかは買ってみてのお楽しみ！
                  </span>
                </div>
              </div>
            </div>
            {/*step 2*/}
            <div className='flex flex-col w-full gap-[16px]'>
              <div className='rounded-[18px] border-[1.8px] border-[#AB31D380] overflow-hidden w-full h-[calc(43.2vw)] relative'>
                <img src={section3_2} className='w-full h-full object-cover shadow-[0_4px_4px_0_rgba(0,0,0,0.13)]' />
                <img src={section3_2_half} className='absolute top-0 right-0 w-[51%] h-full rounded-r-[26px]' />
              </div>
              <div className='w-full min-h-[172px] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ height: vw(172), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `${vw(-9)}` }}>
                  <span className="text-[#E862CB] font-['General_Sans'] italic font-bold" style={{ fontSize: vw(32), lineHeight: vw(18) }}>02</span>
                  <div className='flex flex-col items-start justify-center border-b border-[#FF2AA1]' style={{ paddingTop: vw(6), paddingBottom: vw(6), borderBottomWidth: vw(2) }}>
                    <span className="text-[#222] font-noto font-bold" style={{ fontSize: vw(16), lineHeight: vw(18) }}>
                      ぼかしフィルター機能に対応
                    </span>
                  </div>
                  <span className="text-[#222] font-noto font-normal" style={{ fontSize: vw(14), lineHeight: vw(27) }}>
                    購入前は写真にぼかしフィルターがかかっていて中身がわかりません。購入して初めて見えるドキドキ感を演出できます。
                  </span>
                </div>
              </div>
            </div>
            {/*step 3*/}
            <div className='flex flex-col w-full gap-[16px]'>
              <div className='rounded-[18px] border-[1.8px] border-[#AB31D380] overflow-hidden w-full h-[calc(43.2vw)] relative'>
                <img src={section3_3} className='w-[107%] h-[107%] object-cover shadow-[0_4px_4px_0_rgba(0,0,0,0.13)]' />
                <div className='absolute top-0 right-0 w-full h-full rounded-r-[18px] bg-[#586B88] opacity-65'></div>
                <div className='absolute flex flex-col items-center justify-center' style={{ top: vw(40), right: vw(94) }}>
                  <img src={lock} alt="lock" style={{ width: vw(60), height: vw(60) }} />
                  <span className="text-[#FFF] font-noto font-black leading-normal" style={{ fontSize: vw(16) }}>Set a password</span>
                </div>
              </div>
              <div className='w-full min-h-[188] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ height: vw(188), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `-${vw(9)}` }}>
                  <span className="text-[#E862CB] font-['General_Sans'] italic font-bold" style={{ fontSize: vw(32), lineHeight: vw(-9) }}>03</span>
                  <div className='flex flex-col items-start justify-center border-b border-[#FF2AA1]' style={{ paddingTop: vw(6), paddingBottom: vw(6), borderBottomWidth: vw(2) }}>
                    <span className="text-[#222] font-noto font-bold" style={{ fontSize: vw(16), lineHeight: vw(18) }}>
                      写真にパスワードを設定
                    </span>
                  </div>
                  <span className="text-[#222] font-noto font-normal" style={{ fontSize: vw(14), lineHeight: vw(27) }}>
                    パスワードを知っているファンだけが購入できます。ライブ配信やライブイベントでパスワードを発表すれば集客にも繋がります！
                  </span>
                </div>
              </div>
            </div>
            {/*step 4*/}
            <div className='flex flex-col w-full gap-[16px]'>
              <div className='rounded-[18px] border-[1.8px] border-[#AB31D380] overflow-hidden w-full h-[calc(43.2vw)] relative'>
                <img src={section3_4} className='w-full h-full object-cover shadow-[0_4px_4px_0_rgba(0,0,0,0.13)]' />
              </div>
              <div className='w-full  min-h-[172px] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]' style={{ height: vw(172), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `${vw(-9)}` }}>
                  <span className="text-[#E862CB] font-['General_Sans'] italic font-bold" style={{ fontSize: vw(32), lineHeight: vw(18) }}>04</span>
                  <div className='flex flex-col items-start justify-center border-b border-[#FF2AA1]' style={{ paddingTop: vw(6), paddingBottom: vw(6), borderBottomWidth: vw(2) }}>
                    <span className="text-[#222] font-noto font-bold" style={{ fontSize: vw(16), lineHeight: vw(18) }}>
                      数量・期間限定販売に対応
                    </span>
                  </div>
                  <span className="text-[#222] font-noto font-normal" style={{ fontSize: vw(14), lineHeight: vw(27) }}>
                    「今しか買えない」「もう手に入らない」──そんな特別な写真を届けたい人に。数量・期間限定設定でレア感を演出できます。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*section4*/}
        <div className='flex flex-col gap-[16px] py-[16px] px-[32px] items-center justify-center w-full'>
          <span className="text-[#363636] text-center font-noto text-[18px] font-bold leading-[27px]">全国のコンビニであなたのグッズを販売しましょう！</span>
          <button
            onClick={handleListNowClick}
            className='flex flex-col items-center justify-center w-full rounded-[4] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] hover:opacity-90 transition-opacity cursor-pointer'
            style={{ height: vw(64), borderRadius: vw(4) }}
          >
            <div className='flex flex-col items-center justify-center'>
              <span className="text-[#FFF] font-noto text-[14px] font-normal leading-[21px]">１分で無料</span>
              <span className="text-[#FFF] font-noto text-[18px] font-black leading-[21px]">今すぐ出品する！</span>
            </div>
          </button>
        </div>
        {/*section5*/}
        <div className='flex flex-col items-center w-full relative' style={{ height: vw(493) }}>
          <div className='absolute bg-white' style={{
            top: vw(89),
            left: vw(32),
            width: vw(311),
            height: vw(404),
            borderRadius: vw(7)
          }}>
            <img src={section5_2_m} alt="section5_2" className='w-full h-full object-cover' style={{ borderRadius: vw(7) }} />
            <div className='absolute top-0 right-0 w-full h-full opacity-75 bg-gradient-to-l from-[#FF285E] to-[#AB31D3]' style={{ borderRadius: vw(7) }}></div>
            <div className='absolute flex flex-col gap-[16px] items-start' style={{
              top: vw(96),
              left: vw(16),
              width: vw(279)
            }}>
              <div className='flex flex-row items-start'>
                <span className="text-[#FFF] font-[Mplus_1p] text-[16px] font-bold leading-[24px]">マネタイズ</span>
                <span className="text-[#FFF] font-['General_Sans'] text-[14px] font-semibold leading-[19px]">Monetization</span>
              </div>
              <span className="text-[#FFF] font-mplus text-[32px] font-black leading-[44px]">
                <span className="underline">売れるたびに収益</span>が入り、収益管理も                <span className="underline">カンタン</span>
              </span>
              <span className="text-[#FFF] font-noto text-[16px] font-bold leading-[24px]">1枚売れるごとに報酬が入る新しいマネタイズ手段。販売データや履歴もマイページで管理可能。</span>
            </div>
          </div>
          <img src={section5_1_m} alt="section5_1" className="absolute object-cover" style={{
            top: vw(7),
            right: 0,
            width: vw(279),
            height: vw(148)
          }} />
        </div>
        {/*section6*/}
        <div className='flex flex-col items-center w-full gap-[16px] px-[32px]'>
          <img src={section6_m} alt="section6_2" className='w-full object-cover' style={{ height: vw(292.42) }} />
          <div className='flex flex-col w-full gap-[12px] p-6 items-start'>
            <div className='flex flex-row items-start gap-[8px]'>
              <span className="text-[#222] font-[Mplus_1p] text-[16px] font-bold leading-[24px]">クオリティー</span>
              <span className="text-[#FF2AA1] font-['General_Sans'] text-[14px] font-semibold leading-[19px]">Quality</span>
            </div>
            <span className="text-[#363636] font-mplus text-[32px] font-black leading-[44px]">
              <span className="font-mplus text-[32px] font-black leading-[44px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">L判／2L判</span>に対応
              写真としての仕上がりも
              <span className="font-mplus text-[32px] font-black leading-[44px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">高品質</span>
            </span>
            <span className="text-[#363636] font-noto text-[16px] font-normal leading-[24px]">高品質写真用紙・シール紙に対応。推しの1枚が"実物"としてファンの手元に届きます。</span>
          </div>
        </div>
        {/*section7*/}
        <div className='flex flex-col gap-[calc(100vw*16/375)] py-[calc(100vw*16/375)] px-[calc(100vw*32/375)] items-center justify-center w-full'>
          <span className="text-center" style={{ ...responsiveText(18, 27, null, 'bold', 'noto', '#363636') }}>全国のコンビニであなたのグッズを販売しましょう！</span>
          <button
            onClick={handleListNowClick}
            className='flex flex-col items-center justify-center w-full rounded-[4] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] hover:opacity-90 transition-opacity cursor-pointer'
            style={{ ...responsiveMetric(null, 64), borderRadius: vw(4) }}
          >
            <div className='flex flex-col items-center justify-center'>
              <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#FFF') }}>１分で無料</span>
              <span style={{ ...responsiveText(18, 21, null, 'black', 'noto', '#FFF') }}>今すぐ出品する！</span>
            </div>
          </button>
        </div>
        {/*section8*/}
        <div className='flex flex-col items-center bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mt-[97px] relative' style={{ ...responsiveMetric('full', 920) }}>
          <span className="italic uppercase opacity-50" style={{
            WebkitTextStroke: '2px #FFF',
            color: 'transparent',
            ...responsivePosition(102, null),
            ...responsiveMetric(-237, 371),
            ...responsiveText(80, 84, 6, 'bold', 'general')
          }}>List your photos</span>

          <span className="italic uppercase opacity-50 whitespace-nowrap" style={{
            WebkitTextStroke: '2px #FFF',
            color: 'transparent',
            ...responsivePosition(836, 64),
            ...responsiveText(140, 84, 6, 'bold', 'general')
          }}>right now</span>

          <span className="italic uppercase opacity-50 rotate-[90deg] whitespace-nowrap" style={{
            WebkitTextStroke: '2px #FFF',
            color: 'transparent',
            ...responsivePosition(400, -348, null),
            ...responsiveMetric(null, 110),
            ...responsiveText(110, 84, 6, 'bold', 'general')
          }}>mechapuri</span>

          <img src={section8} alt="section8" className='object-cover' style={{ ...responsivePosition(40, null, 67), ...responsiveMetric(240, 490) }} />

          <div className='flex flex-col items-start gap-[16px]' style={{ ...responsivePosition(566, 32), ...responsiveMetric(311) }}>
            <span style={{ ...responsiveText(18, 25, null, 'bold', 'mplus', '#FFF') }}>1分でカンタン登録完了！</span>
            <span style={{ ...responsiveText(40, 48, null, 'black', 'mplus', '#FFF') }}>めちゃプリで今すぐ写真を出品する</span>
            <a href='/myshop/registerproduct'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 54" fill="none" style={{ ...responsiveMetric(75, 54) }}>
                <path d="M47.1143 1.31641L72.7607 26.9649L47.1143 52.6134" stroke="white" strokeWidth="2" />
                <path d="M72.7601 26.9648H0.75293" stroke="white" strokeWidth="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 