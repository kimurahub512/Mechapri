import React, { useEffect, useState } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import { vw, vwd, responsiveText, responsivePosition, responsiveMetric, responsiveTextD, responsivePositionD, responsiveMetricD } from '@/lib/utils';

const AccountSetting = () => {
    const [notificationSettings, setNotificationSettings] = useState({
        '商品が購入されたら通知を受け取る': true,
        '販売終了した商品の再販リクエスト': true,
        'ユーザーからのフォロー': true,
        'フォロー中のショップの新規出品': true,
        'メディパンネップリからのお知らせ': true
    });

    const handleToggle = (setting) => {
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    return (
        <>
            <Header />
            {/* Main Section (Desktop) */}
            <main className="hidden md:flex justify-center items-start gap-[10px] flex-1 self-stretch p-[32px_0_80px_0]">
              {/* Frame 1 */}
              <div className="flex flex-col items-center gap-[16px]" style={{width: vwd(874)}}>
                {/* Frame 11 */}
                <div className="flex flex-col items-start w-full gap-[8px]">
                  <span style={{...responsiveTextD(36, 54, null, 'bold', 'noto, "#363636"')}}>アカウント</span>
                  <span  style={{...responsiveTextD(18, 32.4, null, 'normal', 'noto, "#363636"')}}>ユーザーID: 123456</span>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-center w-full p-[32px_36px] gap-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                  {/* 121 */}
                  <div className="flex flex-col items-start gap-[25px]" style={{width: vwd(802)}}>
                    {/* 1211 */}
                    <div className="flex flex-col gap-[4px]" style={{...responsiveMetricD(802, 116)}}>
                      {/* 12111 */}
                      <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                        <span style={{...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636')}}>ユーザー名</span>
                        <span style={{...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC')}}>(20文字まで)</span>
                      </div>
                      {/* 12112 */}
                      <div className="flex flex-col pb-[8px] self-stretch">
                        <input
                          type="text"
                          className="p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto"
                          placeholder="入力するとQRコードに表示されてわかりやすくなります"
                          style={{...responsiveMetricD(802, 46), ...responsiveTextD(16, 24, null, 'normal', 'noto', '#363636')}}
                        />
                      </div>
                    </div>
                    {/* 1212 */}
                    <div className="flex flex-col gap-[4px]" style={{...responsiveMetricD(802, 116)}}>
                      {/* 12121 */}
                      <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                        <span style={{...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636')}}>メールアドレス</span>
                        <span style={{...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC')}}>(非公開)</span>
                      </div>
                      {/* 12122 */}
                      <div className="flex items-center gap-[16px] pb-[8px] self-stretch">
                        <input
                          type="text"
                          className="flex-1 p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none"
                          placeholder=""
                          style={{...responsiveMetricD(null, 46)}}
                        />
                        {/* 121222 */}
                        <div className="flex p-[2px] justify-center items-center rounded-[8px] bg-[#E9EEF1]" style={{width: vwd(320)}}>
                          {/* 1212221 */}
                          <div className="flex flex-col items-center flex-1 p-[4.5px_17px_11.5px_17px]">
                            <span className="whitespace-nowrap" style={{...responsiveTextD(14, 21, null, 'normal', 'noto', '#969696')}}>メールアドレス変更にはメール認証が必要です</span>
                            <span style={{...responsiveTextD(18, 21, null, 'black', 'noto', '#969696')}}>認証コードを送る</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 1213 */}
                    <div className="flex flex-col gap-[4px]" style={{width:vwd(809)}}>
                      {/* 12131 */}
                      <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                        <span style={{...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636')}}>メール通知設定</span>
                      </div>
                      {/* 12132 */}
                      <div className="flex flex-col items-start gap-[8px] self-stretch">
                                                 {[
                           '商品が購入されたら通知を受け取る',
                           '販売終了した商品の再販リクエスト',
                           'ユーザーからのフォロー',
                           'フォロー中のショップの新規出品',
                           'メディパンネップリからのお知らせ'
                         ].map((text, idx) => (
                           <div key={idx} className="flex flex-col p-[14px_0] gap-[10px] self-stretch border-b border-[#E9E9E9]">
                             <div className="flex justify-between items-center self-stretch">
                               <div className="flex items-center flex-1" style={{paddingRight: vwd(440), paddingTop: vwd(8)}}>
                                 <span className="whitespace-nowrap" style={{...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636')}}>{text}</span>
                               </div>
                               <div className="flex items-center" style={{height:vwd(32), paddingRight: vwd(16)}}>
                                 <button
                                   onClick={() => handleToggle(text)}
                                   className="rounded-full flex items-center transition-all duration-200 ease-in-out"
                                   style={{
                                     ...responsiveMetricD(62, 32),
                                     backgroundColor: notificationSettings[text] ? '#AB31D3' : '#E9E9E9'
                                   }}
                                 >
                                   <div 
                                     className="rounded-full bg-white transition-all duration-200 ease-in-out"
                                     style={{
                                       ...responsiveMetricD(28, 28),
                                       marginLeft: notificationSettings[text] ? vwd(2) : vwd(32)
                                     }}
                                   ></div>
                                 </button>
                               </div>
                             </div>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                  {/* 1234: 保存する button */}
                  <button className="flex p-[2px] justify-center items-center self-stretch rounded-[8px] bg-[#E9EEF1]" style={{...responsiveMetricD('full', 60), marginTop: vwd(24)}}>
                    <span style={{...responsiveTextD(18, 21, null, 'black', 'noto', '#969696')}}>保存する</span>
                  </button>
                </div>
              </div>
            </main>
            {/* Mobile Main Section */}
            <main className="inline-flex md:hidden flex-col items-start w-full" style={{gap: vw(16)}}>
              {/* Frame 1 */}
              <div className="flex flex-row items-center w-full" style={{gap: vw(16), paddingTop: vw(32), paddingLeft: vw(16), paddingRight: vw(16)}}>
                <span style={{...responsiveText(24, 24, null, 'bold', 'noto', '#363636')}}>アカウント</span>
                <span style={{...responsiveText(18, 32.4, null, 'normal', 'noto', '#363636')}}>ユーザーID: 123456</span>
              </div>
              {/* Frame 12 */}
              <div className="flex flex-col items-center self-stretch rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] mx-auto" style={{gap: vw(16), paddingTop: vw(20), paddingBottom: vw(20), paddingLeft: vw(16), paddingRight: vw(16), width: vw(343)}}>
                {/* 121 */}
                <div className="flex flex-col items-center gap-[16px] w-full">
                  {/* 1211 */}
                  <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 12111 */}
                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                      <span style={{...responsiveText(14, 14, null, 'bold', 'noto', '#363636')}}>ユーザー名</span>
                      <span style={{...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC')}}>(20文字まで)</span>
                    </div>
                    {/* 12112 */}
                    <div className="flex flex-col pb-[8px] self-stretch w-full">
                      <input
                        type="text"
                        className="w-full p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                        placeholder="入力するとQRコードに表示されてわかりやすくなります"
                        style={{...responsiveMetric(null, 46)}}
                      />
                    </div>
                  </div>
                  {/* 1212 */}
                  <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 12121 */}
                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                      <span style={{...responsiveText(14, 14, null, 'bold', 'noto', '#363636')}}>メールアドレス</span>
                      <span style={{...responsiveText(14, 21, null, 'normal', 'noto', '#ACACAC')}}>(非公開)</span>
                    </div>
                    {/* 12122 */}
                    <div className="flex flex-col justify-center items-start gap-[16px] self-stretch w-full">
                      <input
                        type="text"
                        className="w-full p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                        placeholder=""
                        style={{...responsiveMetric(311, 46)}}
                      />
                      {/* 121222 */}
                      <div className="flex p-[2px_0] justify-center items-center rounded-[8px] bg-[#E9EEF1]" style={{width: vw(311)}}>
                        {/* 1212221 */}
                        <div className="flex flex-col items-center p-[4.5px_0_11.5px_0] rounded-[8px]" style={{width: vw(316)}}>
                          <span style={{...responsiveText(12, 20.4, null, 'normal', 'noto', '#969696')}}>メールアドレス変更にはメール認証が必要です</span>
                          <span style={{...responsiveText(18, 21, null, 'black', 'noto', '#969696')}}>認証コードを送る</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 1213 */}
                  <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 12131 */}
                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                      <span style={{...responsiveText(14, 14, null, 'bold', 'noto', '#363636')}}>メール通知設定</span>
                    </div>
                    {/* 12132 */}
                    <div className="flex flex-col items-start gap-[8px] self-stretch w-full">
                                             {[
                         '商品が購入されたら通知を受け取る',
                         '販売終了した商品の再販リクエスト',
                         'ユーザーからのフォロー',
                         'フォロー中のショップの新規出品',
                         'メディパンネップリからのお知らせ'
                       ].map((text, idx) => (
                         <div key={idx} className="flex flex-col p-[14px_0] gap-[10px] self-stretch border-b border-[#E9E9E9]" style={{width: vw(311)}}>
                           <div className="flex justify-between items-center self-stretch">
                             <div className="flex items-center flex-1" style={{paddingRight: vw(25), paddingTop: vw(8)}}>
                               <span className="whitespace-nowrap" style={{...responsiveText(13, 24, null, 'normal', 'noto', '#363636')}}>{text}</span>
                             </div>
                             <div className="flex items-center" style={{height: vw(32), paddingRight: vw(16)}}>
                               <button
                                 onClick={() => handleToggle(text)}
                                 className="rounded-full flex items-center transition-all duration-200 ease-in-out"
                                 style={{
                                   ...responsiveMetric(62, 32),
                                   backgroundColor: notificationSettings[text] ? '#AB31D3' : '#E9E9E9'
                                 }}
                               >
                                 <div 
                                   className="rounded-full bg-white transition-all duration-200 ease-in-out"
                                   style={{
                                     ...responsiveMetric(28, 28),
                                     marginLeft: notificationSettings[text] ? vw(2) : vw(32)
                                   }}
                                 ></div>
                               </button>
                             </div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
                {/* 1234: 保存する button */}
                <button className="flex p-[2px] justify-center items-center rounded-[8px] bg-[#E9EEF1]" style={{...responsiveMetric(240, 48), marginTop: vw(24)}}>
                  <span style={{...responsiveText(18, 21, null, 'black', 'noto', '#969696')}}>保存する</span>
                </button>
              </div>
            </main>
            <Footer />
        </>
    );
};

export default AccountSetting;