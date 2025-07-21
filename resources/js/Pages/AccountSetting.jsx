import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';

const AccountSetting = () => {
    return (
        <>
            <Header />
            {/* Main Section (Desktop) */}
            <main className="hidden md:flex justify-center items-start gap-[10px] flex-1 self-stretch p-[32px_0_80px_0]">
              {/* Frame 1 */}
              <div className="flex flex-col items-center w-[874px] gap-[16px]">
                {/* Frame 11 */}
                <div className="flex flex-col items-start w-full gap-[8px]">
                  <span className="text-[#363636] font-noto font-bold text-[36px] leading-[54px]">アカウント</span>
                  <span className="self-stretch text-[#363636] font-noto text-[18px] leading-[32.4px]">ユーザーID: 123456</span>
                </div>
                {/* Frame 12 */}
                <div className="flex flex-col items-center w-full p-[32px_36px] gap-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                  {/* 121 */}
                  <div className="flex flex-col items-start w-[802px] gap-[25px]">
                    {/* 1211 */}
                    <div className="flex flex-col w-[802px] h-[115.99px] gap-[4px]">
                      {/* 12111 */}
                      <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                        <span className="text-[#363636] font-noto font-bold text-[21px] leading-[27px]">ユーザー名</span>
                        <span className="text-[#ACACAC] font-noto text-[16px] leading-[24px]">(20文字まで)</span>
                      </div>
                      {/* 12112 */}
                      <div className="flex flex-col pb-[8px] self-stretch">
                        <input
                          type="text"
                          className="w-[802px] h-[45.99px] p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white text-[#ACACAC] font-noto text-[14px] font-normal border border-[#E9E9E9] focus:outline-none"
                          placeholder="入力するとQRコードに表示されてわかりやすくなります"
                        />
                      </div>
                    </div>
                    {/* 1212 */}
                    <div className="flex flex-col w-[802px] h-[115.99px] gap-[4px]">
                      {/* 12121 */}
                      <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                        <span className="text-[#363636] font-noto font-bold text-[21px] leading-[27px]">メールアドレス</span>
                        <span className="text-[#ACACAC] font-noto text-[16px] leading-[24px]">(非公開)</span>
                      </div>
                      {/* 12122 */}
                      <div className="flex items-center gap-[16px] pb-[8px] self-stretch">
                        <input
                          type="text"
                          className="flex-1 h-[45.99px] p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none text-[#ACACAC] font-noto text-[14px] font-normal"
                          placeholder=""
                        />
                        {/* 121222 */}
                        <div className="flex w-[320px] p-[2px] justify-center items-center rounded-[8px] bg-[#E9EEF1]">
                          {/* 1212221 */}
                          <div className="flex flex-col items-center flex-1 p-[4.5px_17px_11.5px_17px]">
                            <span className="text-[#969696] text-center font-noto text-[14px] leading-[21px] font-normal whitespace-nowrap">メールアドレス変更にはメール認証が必要です</span>
                            <span className="text-[#969696] text-center font-noto text-[18px] leading-[21px] font-black">認証コードを送る</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 1213 */}
                    <div className="flex flex-col w-[806px] gap-[4px]">
                      {/* 12131 */}
                      <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                        <span className="text-[#363636] font-noto font-bold text-[21px] leading-[27px]">メール通知設定</span>
                      </div>
                      {/* 12132 */}
                      <div className="flex flex-col items-start gap-[8px] self-stretch">
                        {[ // 5 notification settings
                          '商品が購入されたら通知を受け取る',
                          '販売終了した商品の再販リクエスト',
                          'ユーザーからのフォロー',
                          'フォロー中のショップの新規出品',
                          'メディパンネップリからのお知らせ'
                        ].map((text, idx) => (
                          <div key={idx} className="flex flex-col p-[14px_0] gap-[10px] self-stretch border-b border-[#E9E9E9]">
                            <div className="flex justify-between items-center self-stretch">
                              <div className="flex items-center flex-1 p-[8px_440px_0_0]">
                                <span className="text-[#363636] font-noto text-[18px] leading-[24px]">{text}</span>
                              </div>
                              <div className="flex items-center h-[32px] pr-[16px]">
                                <div className="w-[62px] h-[32px] rounded-full bg-[#AB31D3] flex items-center">
                                  <div className="w-[28px] h-[28px] bg-white rounded-full ml-[2px]"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* 1234: 保存する button */}
                  <button className="flex p-[2px] h-[60px] justify-center items-center self-stretch rounded-[8px] bg-[#E9EEF1] w-full mt-[24px]">
                    <span className="text-[#969696] text-center font-noto font-black text-[18px] leading-[21px]">保存する</span>
                  </button>
                </div>
              </div>
            </main>
            {/* Mobile Main Section */}
            <main className="inline-flex md:hidden flex-col items-start gap-[16px] w-full">
              {/* Frame 1 */}
              <div className="flex items-center w-full px-[16px] pt-[32px]">
                <span className="text-[#363636] font-noto font-bold text-[24px] leading-[24px]">アカウント</span>
                <span className="ml-[16px] text-[#363636] font-noto text-[18px] leading-[32.4px]">ユーザーID: 123456</span>
              </div>
              {/* Frame 12 */}
              <div className="flex flex-col items-center w-[343px] p-[20px_16px] gap-[16px] self-stretch rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] mx-auto">
                {/* 121 */}
                <div className="flex flex-col items-center gap-[16px] w-full">
                  {/* 1211 */}
                  <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 12111 */}
                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                      <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">ユーザー名</span>
                      <span className="text-[#ACACAC] font-noto text-[14px] leading-[21px] tracking-[0.7px]">(20文字まで)</span>
                    </div>
                    {/* 12112 */}
                    <div className="flex flex-col pb-[8px] self-stretch w-full">
                      <input
                        type="text"
                        className="w-full h-[45.99px] p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none text-[#ACACAC] font-noto text-[14px] font-normal"
                        placeholder="入力するとQRコードに表示されてわかりやすくなります"
                      />
                    </div>
                  </div>
                  {/* 1212 */}
                  <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 12121 */}
                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                      <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">メールアドレス</span>
                      <span className="text-[#ACACAC] font-noto text-[14px] leading-[21px]">(非公開)</span>
                    </div>
                    {/* 12122 */}
                    <div className="flex flex-col justify-center items-start gap-[16px] self-stretch w-full">
                      <input
                        type="text"
                        className="w-[311px] h-[46px] p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none text-[#ACACAC] font-noto text-[14px] font-normal"
                        placeholder=""
                      />
                      {/* 121222 */}
                      <div className="flex w-[311px] p-[2px_0] justify-center items-center rounded-[8px] bg-[#E9EEF1]">
                        {/* 1212221 */}
                        <div className="flex flex-col items-center w-[316px] p-[4.5px_0_11.5px_0] rounded-[8px]">
                          <span className="text-[#969696] text-center font-noto text-[12px] leading-[20.4px] font-normal">メールアドレス変更にはメール認証が必要です</span>
                          <span className="text-[#969696] text-center font-noto text-[18px] leading-[21px] font-black">認証コードを送る</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 1213 */}
                  <div className="flex flex-col items-start gap-[4px] w-full">
                    {/* 12131 */}
                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                      <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">メール通知設定</span>
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
                        <div key={idx} className="flex flex-col w-[311px] p-[14px_0] gap-[10px] self-stretch border-b border-[#E9E9E9]">
                          <div className="flex justify-between items-center self-stretch">
                            <div className="flex items-center flex-1 p-[8px_25px_0_0]">
                              <span className="text-[#363636] font-noto text-[13px] leading-[24px]">{text}</span>
                            </div>
                            <div className="flex items-center h-[32px] pr-[16px]">
                              <div className="w-[62px] h-[32px] rounded-full bg-[#AB31D3] flex items-center">
                                <div className="w-[28px] h-[28px] bg-white rounded-full ml-[2px]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 1234: 保存する button */}
                <button className="flex w-[240px] h-[48px] p-[2px] justify-center items-center rounded-[8px] bg-[#E9EEF1] mt-[24px]">
                  <span className="text-[#969696] text-center font-noto font-black text-[18px] leading-[21px]">保存する</span>
                </button>
              </div>
            </main>
            <Footer />
        </>
    );
};

export default AccountSetting;