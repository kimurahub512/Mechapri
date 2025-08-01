
import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import { vw, vwd, responsiveText, responsivePosition, responsiveMetric } from '@/lib/utils';
import logo_group from '@/assets/images/homepage/logo_group.png';
import header_image from '@/assets/images/homepage/hero.png';
import hero_m1 from '@/assets/images/homepage/hero_m1.png';
import hero_m2 from '@/assets/images/homepage/hero_m2.png';
import header_image_3 from '@/assets/images/homepage/hero_3.png';
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

export default function Home() {

  return (

    <div className='product-details-no-footer-gap bg-[#FFF]'>
      <Header />
      {/*desktop version*/}
      <div className='hidden md:flex flex-col items-center w-full gap-[32px]'>
        {/*hero section*/}
        <div className='flex flex-col items-center w-full relative px-[120px] pt-[66px] pb-[150px]'>
          <div className='flex flex-col items-start w-full gap-5'>
            <div className='flex flex-row items-start'>
              <span className="text-[#363636] font-noto text-[80px] font-black leading-[104px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                めちゃプリ
              </span>
              <span className="text-[#363636] font-noto text-[64px] font-black leading-[104px]">
                であなたの写真を
              </span>
            </div>
            <div className='flex flex-col items-starttext-[16px]'>
              <span className="font-mplus text-[88px] font-black leading-[94px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                "公式グッズ"
              </span>
              <div className='flex flex-row items-start'>
                <span className="text-[#363636] font-mplus text-[64px] font-black leading-[94px]">
                  として
                </span>
                <span className="font-mplus text-[80px] font-black leading-[94px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                  販売
                </span>
              </div>
            </div>
            <span className="text-[#222] font-noto text-[18px] font-bold leading-[27px] w-[643px] mt-[36px]text-[16px]">
              写真をアップするだけで、全国のコンビニががあなたのグッズ販売ブースに。
              めちゃプリであなたの写真を"公式グッズ"として販売 しましょう！
            </span>
            <div className='flex flex-row items-center w-[546px] px-[42px] py-[12px]'>
              <div className='flex flex-row items-start gap-[22px]'>
                <span className='text-[#222] font-noto text-[18px] font-bold leading-[27px] whitespace-nowrap'>
                  対象コンビニ
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="60" viewBox="0 0 2 60" fill="none">
                  <path d="M1 0.25V59.75" stroke="#222222" />
                </svg>
                <img src={logo_group} alt="logo_group" className='w-[303px] h-[62px]' />
              </div>
            </div>
            <button className='flex flex-col items-center justify-center w-[494px] h-[64px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]'>
              <span className='text-[#FFF] font-noto text-[14px] font-bold leading-[21px]'>
                １分で無料
              </span>
              <span className='text-[#FFF] font-noto text-[18px] font-black leading-[21px]'>
                今すぐ出品する
              </span>
            </button>
          </div>
          <img src={header_image} alt="header_image" className='w-[656px] h-[677px] absolute top-[93px] right-0' />
        </div>
        {/*section2*/}
        <div className='relative w-full'>
          <img src={section2_image} alt="section2_image" className='w-[100%] h-[100%] overflow-hidden relative' />
          <div className='absolute inset-0 w-full h-full opacity-50 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mix-blend-overlay'></div>
          <div className='absolute inset-0 w-full h-full opacity-75 bg-gradient-to-l from-[#FF285E] to-[#AB31D3]'></div>
          <img src={section2_phones} alt="section2_image" className='w-[505px] h-[674px] overflow-hidden absolute top-[44px] left-[22.5px]' />
          <div className='absolute top-[115px] right-[116px] flex flex-col items-start w-[720px] py-[40px] px-[80px] gap-[20px] rounded-[26px] bg-white'>
            <div className='flex flex-col items-start justify-center'>
              <span className='text-[#222] font-noto text-[24px] font-bold leading-normal'>
                使い方
              </span>
              <span className='text-[#222] font-noto text-[16px] font-semibold leading-normal bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent'>
                How to use
              </span>
            </div>
            <span className="text-[#222] font-mplus text-[58px] font-black leading-[72px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
              スマホ1つで<br />
              “公式グッズ”が販売<br />
              できる
            </span>
            <span className="text-[#363636] font-noto text-[18px] font-normal leading-[32.76px]">スマホ1つで公式グッズを簡単に販売できます。写真をアップするだけで在庫管理や発送作業も一切不要。ファンの手元に写真がすぐに届きます。</span>
          </div>
        </div>
        {/*section3 シークレット販売でファンの*/}
        <div className='flex flex-col items-center w-full pb-[64px]'>
          <div className='flex flex-col items-center w-[831.6px]'>
            <div className='flex flex-row items-center justify-center w-full gap-[8px]'>
              <span className='text-[#222] font-noto text-[24px] font-bold leading-normal'>
                活用事例
              </span>
              <span className='text-[#222] font-noto text-[16px] font-semibold leading-normal bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent'>
                Use case
              </span>
            </div>
            <div className='flex flex-col items-center w-full mt-[6px]'>
              <div className='flex flex-row items-center'>
                <span className="font-mplus text-[60px] font-black leading-[84px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap">
                  シークレット販売
                </span>
                <span className="text-[#363636] font-mplus text-[60px] font-black leading-[84px]">
                  で
                </span>
                <span className="font-mplus text-[60px] font-black leading-[84px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap">
                  ファンの
                </span>
              </div>
              <span className="font-mplus text-[60px] font-black leading-[84px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap">
                ドキドキが倍増！
              </span>
            </div>
            <div className='flex flex-row items-center w-full mt-[19px]'>
              <span className="text-[#E862CB] font-noto text-[18px] font-black leading-[32px]">
                「開けてみるまで分からない」
              </span>
              <span className="text-[#222] font-noto text-[18px] font-normal leading-[32px]">
                楽しさで、
              </span>
              <span className="text-[#E862CB] font-noto text-[18px] font-black leading-[32px]">
                "見えない魅力"
              </span>
              <span className="text-[#222] font-noto text-[18px] font-normal leading-[32px]">
                を仕掛けられます。活用次第で
              </span>
              <span className="text-[#E862CB] font-noto text-[18px] font-black leading-[32px]">
                収益爆上げ！
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center w-[1021px] mt-[42.9px] gap-[48px]'>
            {/*step 1*/}
            <div className='flex w-full h-[362px] relative'>
              {/*image frame*/}
              <div className='absolute top-0 right-[20px] w-[692px] h-[362px] rounded-[26px] border-[4px] border-[#AB31D380] overflow-hidden'>
                <img src={section3_1} className='w-full h-full object-cover shadow-[0_4px_4px_0_rgba(0,0,0,0.13)]' />
              </div>
              <div className='absolute top-0 right-[20px] w-[230px] h-[362px] rounded-r-[26px] opacity-75 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]'>
              </div>
              <div className='absolute top-[142px] right-[86px] w-[76px] h-[95px] flex-col'>
                <img src={bubble} alt="bubble" className='w-[60px] h-[60px]' />
                <span className="text-[#FFF] font-noto text-[24px] font-black leading-normal">
                  Gacha
                </span>
              </div>
              <div className='absolute top-[112px] left-[0px] w-[380px] h-[203px] flex-col'>
                <div className='w-full h-[194px] rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9px]'>
                </div>
                <div className='flex flex-col items-start gap-[17px] -mt-[202px] mx-[30px]'>
                  <span className="text-[#E862CB] font-['General_Sans'] text-[26px] italic font-bold leading-[18px]">01</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span className="text-[#222] font-noto text-[18px] font-bold leading-[18px]">
                      ガチャ方式での販売に対応
                    </span>
                  </div>
                  <span className="text-[#222] font-noto text-[16px] font-normal leading-[27px]">
                    購入するまでどの写真が当たるかわからないガチャ商品です。<br />
                    複数の写真の中からどれが当たるかは買ってみてのお楽しみ！
                  </span>
                </div>
              </div>
            </div>
            {/*step 2*/}
            <div className='flex w-full h-[384px] relative'>
              <div className='absolute top-0 left-0 w-[692px] h-[362px] rounded-[26px] overflow-hidden'>
                <img src={section3_2} className='w-full h-full  rounded-[26px]' />
                <img src={section3_2_half} className='absolute top-0 right-0 w-[352px] h-full  rounded-r-[26px]' />
              </div>
              <div className='absolute bottom-[0px] right-[0px] w-[380px] h-[203px] flex-col'>
                <div className='w-full h-[194px] rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9px]'>
                </div>
                <div className='flex flex-col items-start gap-[17px] -mt-[202px] mx-[30px]'>
                  <span className="text-[#E862CB] font-['General_Sans'] text-[26px] italic font-bold leading-[18px]">02</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span className="text-[#222] font-noto text-[18px] font-bold leading-[18px]">
                      ぼかしフィルター機能に対応
                    </span>
                  </div>
                  <span className="text-[#222] font-noto text-[16px] font-normal leading-[27px]">
                    購入前は写真にぼかしフィルターがかかっていて中身がわかりません。<br />購入して初めて見えるドキドキ感を演出できます。
                  </span>
                </div>
              </div>
            </div>
            {/*step 3*/}
            <div className='flex w-full h-[362px] relative'>
              <div className='absolute top-0 right-0 w-[692px] h-[362px] rounded-[26px] overflow-hidden'>
                <img src={section3_3} className='w-[682] h-[382px] overflow-hidden object-cover' />
                <div className='absolute top-0 right-0 w-full h-full rounded-r-[18px] bg-[#586B88] opacity-65'></div>
                <div className='absolute top-[101px] right-[223.5px] flex flex-col items-center justify-center'>
                  <img src={lock} alt="lock" className='w-[120px] h-[120px]' />
                  <span className="text-[#FFF] font-noto text-[32px] font-black leading-normal">Set a password</span>
                </div>
              </div>
              <div className='absolute bottom-[0px] left-[0px] w-[380px] h-[203px] flex-col'>
                <div className='w-full h-[194px] rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9px]'>
                </div>
                <div className='flex flex-col items-start gap-[17px] -mt-[202px] mx-[30px]'>
                  <span className="text-[#E862CB] font-['General_Sans'] text-[26px] italic font-bold leading-[18px]">03</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span className="text-[#222] font-noto text-[18px] font-bold leading-[18px]">
                      写真にパスワードを設定
                    </span>
                  </div>
                  <span className="text-[#222] font-noto text-[16px] font-normal leading-[27px]">
                    パスワードを知っているファンだけが購入できます。<br />ライブ配信やライブイベントでパスワードを発表すれば集客にも繋がります！
                  </span>
                </div>
              </div>
            </div>
            {/*step 4*/}
            <div className='flex w-full h-[362px] relative'>
              <div className='absolute top-0 left-0 w-[692px] h-[362px] rounded-[26px] overflow-hidden'>
                <img src={section3_4} className='w-full h-full  rounded-[26px]' />
              </div>
              <div className='absolute bottom-[0px] right-[0px] w-[380px] h-[203px] flex-col'>
                <div className='w-full h-[194px] rounded-[26px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9px]'>
                </div>
                <div className='flex flex-col items-start gap-[17px] -mt-[202px] mx-[30px]'>
                  <span className="text-[#E862CB] font-['General_Sans'] text-[26px] italic font-bold leading-[18px]">04</span>
                  <div className='flex flex-col items-start justify-center py-[6px] border-b-[2px] border-[#FF2AA1]'>
                    <span className="text-[#222] font-noto text-[18px] font-bold leading-[18px]">
                      数量・期間限定販売に対応
                    </span>
                  </div>
                  <span className="text-[#222] font-noto text-[16px] font-normal leading-[27px]">
                    「今しか買えない」「もう手に入らない」──そんな特別な写真を届けたい人に。<br />数量・期間限定設定でレア感を演出できます。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*section4*/}
        <div className='flex flex-col gap-[24px] py-[16px] items-center justify-center w-full'>
          <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">全国のコンビニがであなたのグッズを販売しましょう！</span>
          <div className='flex flex-col items-center justify-center w-[494px] h-[80px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]'>
            <div className='flex flex-col items-center justify-center'>
              <span className="text-[#FFF] font-noto text-[16px] font-normal leading-[21px]">１分で無料</span>
              <span className="text-[#FFF] font-noto text-[21px] font-black leading-[21px]">今すぐ出品する</span>
            </div>
          </div>
        </div>
        {/*section5*/}
        <div className='flex flex-col items-center w-full h-[720px] relative'>
          <div className='absolute top-[89px] left-[90px] w-[1080px] h-[540px] bg-white rounded-[24px]'>
            <img src={section5_2} alt="section5_2" className='w-full h-full object-cover rounded-[24px]' />
            <div className='absolute top-0 right-0 w-full h-full rounded-[24px] opacity-75 bg-gradient-to-l from-[#FF285E] to-[#AB31D3]'></div>
            <div className='absolute top-[56px] left-[80px] flex flex-col w-[522px] gap-[20px] items-start'>
              <div className='flex flex-col items-start'>
                <span className="text-[#FFF] font-[Mplus_1p] text-[24px] font-bold leading-[26px]">マネタイズ</span>
                <span className="text-[#FFF] font-['General_Sans'] text-[18px] font-semibold leading-[20px]">Monetization</span>
              </div>
              <span className="text-[#FFF] font-mplus text-[58px] font-black leading-[72px]">
                <span className="underline">売れるたびに収益</span>が入り、収益管理も<br />
                <span className="underline">カンタン</span>
              </span>
              <span className="text-[#FFF] font-noto text-[18px] font-bold leading-[32px]">1枚売れるごとに報酬が入る新しいマネタイズ手段。販売データや履歴もマイページで管理可能。</span>
            </div>
          </div>
          <img src={section5_1} alt="section5_1" className="absolute top-[20px] right-0 w-[707px] h-[457px] object-cover" />
        </div>
        {/*section6*/}
        <div className='flex flex-col items-center w-full h-[720px] relative'>
          <img src={section6_2} alt="section6_2" className='absolute top-[50px] left-[190px] w-[740px] h-[540px] object-cover' />
          <img src={section6_1} alt="section6_1" className='absolute top-[70px] left-[0px] w-[670px] h-[529px] object-cover' />
          <img src={section6_3} alt="section6_3" className='absolute top-[198px] left-[72px] w-[650px] h-[520px] object-cover' />
          <div className='absolute top-[155px] right-[125px] flex flex-col w-[580px] gap-[20px] items-start'>
            <div className='flex flex-col items-start'>
              <span className="text-[#222] font-[Mplus_1p] text-[24px] font-bold leading-[26px]">クオリティー</span>
              <span className="text-[#FF2AA1] font-['General_Sans'] text-[18px] font-semibold leading-[20px]">Quality</span>
            </div>
            <span className="text-[#363636] font-mplus text-[58px] font-black leading-[72px]">
              <span className="font-mplus text-[58px] font-black leading-[72px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">L判／2L判</span>に対応<br />
              写真としての仕上がりも
              <span className="font-mplus text-[58px] font-black leading-[72px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">高品質</span>
            </span>
            <span className="text-[#363636] font-noto text-[18px] font-bold leading-[32px]">高品質写真用紙・シール紙に対応。推しの1枚が“実物”としてファンの手元に届きます。</span>
          </div>
        </div>
        {/*section7*/}
        <div className='flex flex-col gap-[24px] py-[16px] items-center justify-center w-full'>
          <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">全国のコンビニがであなたのグッズを販売しましょう！</span>
          <div className='flex flex-col items-center justify-center w-[494px] h-[80px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]'>
            <div className='flex flex-col items-center justify-center'>
              <span className="text-[#FFF] font-noto text-[16px] font-normal leading-[21px]">１分で無料</span>
              <span className="text-[#FFF] font-noto text-[21px] font-black leading-[21px]">今すぐ出品する</span>
            </div>
          </div>
        </div>
        {/*section8*/}
        <div className='flex flex-col items-center w-full h-[530px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mt-[128px] relative'>
          <span className="absolute top-[96px] right-[137px] font-general text-[80px] italic font-bold leading-[84px] tracking-[6px] uppercase opacity-50" style={{ WebkitTextStroke: '2px #FFF', color: 'transparent' }}>List your photos</span>
          <span className="absolute top-[440px] right-[-10px] font-general text-[140px] italic font-bold leading-[84px] tracking-[6px] uppercase opacity-50" style={{ WebkitTextStroke: '2px #FFF', color: 'transparent' }}>right now</span>
          <span className="absolute top-[352px] left-[-326px] font-general text-[110px] italic font-bold leading-[84px] tracking-[6px] uppercase opacity-50 rotate-[90deg]" style={{ WebkitTextStroke: '2px #FFF', color: 'transparent' }}>mechapuri</span>
          <img src={section8} alt="section8" className='absolute top-[-110px] right-[236px] w-[300px] h-[614px] object-cover' />
          <div className='absolute top-[164px] left-[215px] flex flex-col max-w-[591px] items-start gap-[12px]'>
            <span className="text-[#FFF] font-mplus text-[18px] font-bold leading-[25px]">1分でカンタン登録完了！</span>
            <span className="text-[#FFF] font-mplus text-[60px] font-black leading-[81px]">めちゃプリで今すぐ写真を出品する</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="54" viewBox="0 0 75 54" fill="none">
              <path d="M47.1143 1.31641L72.7607 26.9649L47.1143 52.6134" stroke="white" strokeWidth="2" />
              <path d="M72.7601 26.9648H0.75293" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      {/*mobile version*/}
      <div className="md:hidden flex flex-col items-center w-full mt-[60px] gap-[40px]">
        {/* section 1*/}
        <div className='flex flex-col items-center w-full  px-[32px] gap-[24px]'>
          {/*hero section*/}
          <div className='flex flex-col items-center w-full h-[350px] relative'>
            <img src={hero_m2} alt="header_image" className='w-[178px] h-[291px] absolute top-[4px] right-[36px]' />
            <img src={hero_m1} alt="header_image" className='w-[472px] h-[394px] object-cover absolute top-[0px] left-[-28px]' style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              filter: 'blur(0.5px)',
              transform: 'scale(1.02)'
            }} />
            <img src={header_image_3} alt="header_image" className='absolute top-[103px] right-[-10px] w-[227px] h-[238px]' />
          </div>
          <div className='flex flex-col items-center w-full relative'>
            <div className='flex flex-col items-start w-full gap-[8px]'>
              <div className='flex flex-col items-start text-center'>
                <div className='flex flex-row items-center justify-center'>
                  <span className="text-[#363636] font-noto text-[40px] font-black leading-[56px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                    めちゃプリ
                  </span>
                  <span className="text-[#363636] font-noto text-[40px] font-black leading-[56px]">
                    で
                  </span>
                </div>
                <span className="text-[#363636] font-noto text-[40px] font-black leading-[56px]">
                  あなたの写真を
                </span>
              </div>
              <div className='flex flex-col items-start text-center'>
                <span className="font-mplus text-[40px] font-black leading-[56px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                  "公式グッズ"
                </span>
                <div className='flex flex-row items-center justify-center'>
                  <span className="text-[#363636] font-mplus text-[40px] font-black leading-[56px]">
                    として
                  </span>
                  <span className="font-mplus text-[40px] font-black leading-[56px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                    販売
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-[#222] font-noto text-[16px] font-bold leading-[24px] text-center w-full">
            写真をアップするだけで、全国のコンビニががあなたのグッズ販売ブースに。<br />
            めちゃプリであなたの写真を"公式グッズ"として販売 しましょう！
          </span>
          <div className='flex flex-col items-center w-full px-[30px] py-[6px]'>
            <div className='flex flex-col items-center w-full gap-[10px]'>
              <span className='text-[#222] font-noto text-[16px] font-bold leading-[27px]'>
                対象コンビニ
              </span>
              <div className='w-full border-[#222] border-b-[1px]' />
              <img src={logo_group} alt="logo_group" className='w-full h-full' />
            </div>
          </div>
          <button className='flex flex-col items-center justify-center w-full max-w-[311px] h-[64px] rounded-[4px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]'>
            <span className='text-[#FFF] font-noto text-[14px] font-normal leading-[21px]'>
              １分で無料
            </span>
            <span className='text-[#FFF] font-noto text-[18px] font-black leading-[21px]'>
              今すぐ出品する
            </span>
          </button>
        </div>
        {/* section 2*/}
        <div className='flex flex-col items-center w-full h-[768px] relative'>
          <img src={section2_image_m} alt="section2_image" className='w-full h-full object-cover' />
          <img src={section2_phones_m} alt="section2_image" className='absolute top-[46px] right-[20px] w-[311px] h-[505px] ' />
          <div className='absolute bottom-[24px] right-[32px] flex flex-col items-start w-[311px] py-[24px] px-[24px] gap-[12px] rounded-[26px] bg-white'>
            <div className='flex flex-row items-start justify-center gap-4'>
              <span className='text-[#222] font-mplus text-[16px] font-bold leading-[20px]'>
                使い方
              </span>
              <span className='text-[#222] font-general text-[14px] font-semibold leading-[20px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent'>
                How to use
              </span>
            </div>
            <span className="text-[#222] font-mplus text-[32px] font-black leading-[44px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
              スマホ1つで<br />
              “公式グッズ”が販<br />
              売できる
            </span>
            <span className="text-[#363636] font-noto text-[16px] font-normal leading-[24px]">スマホ1つで公式グッズを簡単に販売できます。写真をアップするだけで在庫管理や発送作業も一切不要。ファンの手元に写真がすぐに届きます。</span>
          </div>
        </div>
        {/* use cases*/}
        <div className='flex flex-col items-center w-full gap-[32px] px-[32px]'>
          <div className='flex flex-col items-center gap-[16px] w-full'>
            <div className='flex flex-row items-center justify-center w-full gap-[8px]'>
              <span className='text-[#222] font-mplus text-[16px] font-bold leading-[20px]'>
                活用事例
              </span>
              <span className='text-[#222] font-general text-[14px] font-semibold leading-[20px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent'>
                Use case
              </span>
            </div>
            <div className='flex flex-col items-center w-full'>
              <div className='flex flex-row items-center'>
                <span className="font-mplus text-[32px] font-black leading-[44px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                  シークレット販売
                </span>
                <span className="text-[#363636] font-mplus text-[32px] font-black leading-[44px]">
                  で
                </span>
              </div>
              <span className="font-mplus text-[32px] font-black leading-[44px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent">
                ファンの
              </span>
              <span className="font-mplus text-[32px] font-black leading-[44px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] bg-clip-text text-transparent whitespace-nowrap">
                ドキドキが倍増！
              </span>
            </div>
            <div className='flex flex-col items-center w-full'>
              <div className='flex flex-row items-center justify-center'>
                <span className="text-[#E862CB] font-noto text-[16px] font-black leading-[24px] whitespace-nowrap">
                  「開けてみるまで分からない」
                </span>
                <span className="text-[#222] font-noto text-[16px] font-normal leading-[24px] whitespace-nowrap">
                  楽しさ、
                </span>
              </div>
              <div className='flex flex-row items-center justify-center'>
                <span className="text-[#222] font-noto text-[16px] font-normal leading-[24px] whitespace-nowrap">で</span>
                <span className="text-[#E862CB] font-noto text-[16px] font-black leading-[24px] whitespace-nowrap">
                  "見えない魅力"
                </span>
                <span className="text-[#222] font-noto text-[16px] font-normal leading-[24px] whitespace-nowrap">を仕掛けられます。</span>
              </div>
              <div className='flex flex-row items-center justify-center'>
                <span className="text-[#222] font-noto text-[16px] font-normal leading-[24px]">
                  活用次第で
                </span>
                <span className="text-[#E862CB] font-noto text-[16px] font-black leading-[24px]">
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
              <div className='w-full h-[172] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9]' style={{ height: vw(172), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `-${vw(9)}` }}>
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
              <div className='w-full h-[172] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9]' style={{ height: vw(172), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `-${vw(9)}` }}>
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
              <div className='w-full h-[188] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9]' style={{ height: vw(188), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `-${vw(9)}` }}>
                  <span className="text-[#E862CB] font-['General_Sans'] italic font-bold" style={{ fontSize: vw(32), lineHeight: vw(18) }}>03</span>
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
              <div className='w-full h-[172] rounded-[18px] bg-[#FFF] shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] mt-[9]' style={{ height: vw(172), marginTop: vw(9) }}>
                <div className='flex flex-col items-start gap-[17px] mx-[16px]' style={{ marginTop: `-${vw(9)}` }}>
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
          <span className="text-[#363636] text-center font-noto text-[18px] font-bold leading-[27px]">全国のコンビニがであなたのグッズを販売しましょう！</span>
          <div className='flex flex-col items-center justify-center w-full rounded-[4] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' style={{ height: vw(64), borderRadius: vw(4) }}>
            <div className='flex flex-col items-center justify-center'>
              <span className="text-[#FFF] font-noto text-[14px] font-normal leading-[21px]">１分で無料</span>
              <span className="text-[#FFF] font-noto text-[18px] font-black leading-[21px]">今すぐ出品する！</span>
            </div>
          </div>
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
          <span className="text-center" style={{...responsiveText(18, 27, null, 'bold', 'noto', '#363636')}}>全国のコンビニがであなたのグッズを販売しましょう！</span>
          <div className='flex flex-col items-center justify-center w-full rounded-[4] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' style={{...responsiveMetric(null, 64), borderRadius: vw(4) }}>
            <div className='flex flex-col items-center justify-center'>
              <span style={{...responsiveText(14, 21, null, 'normal', 'noto', '#FFF')}}>１分で無料</span>
              <span style={{...responsiveText(18, 21, null, 'black', 'noto', '#FFF')}}>今すぐ出品する！</span>
            </div>
          </div>
        </div>
        {/*section8*/}
        <div className='flex flex-col items-center bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] mt-[97px] relative' style={{...responsiveMetric('full', 920)}}>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 54" fill="none" style={{ ...responsiveMetric(75, 54) }}>
              <path d="M47.1143 1.31641L72.7607 26.9649L47.1143 52.6134" stroke="white" strokeWidth="2" />
              <path d="M72.7601 26.9648H0.75293" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 