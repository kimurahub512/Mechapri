
import React, { useState } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import mountain_down from '@/assets/images/mountain_down.svg';
import radio from '@/assets/images/beginner_radio.svg';
import photo1 from '@/assets/images/saleshistory/photo1.png';
import photo2 from '@/assets/images/saleshistory/photo2.png';
import photo3 from '@/assets/images/saleshistory/photo3.png';
import photo4 from '@/assets/images/saleshistory/photo4.png';
import overlay from '@/assets/images/saleshistory/overlay.png';
import photo1_m from '@/assets/images/saleshistory/photo1_m.png';
import photo2_m from '@/assets/images/saleshistory/photo2_m.png';
import photo3_m from '@/assets/images/saleshistory/photo3_m.png';
import photo4_m from '@/assets/images/saleshistory/photo4_m.png';
import overlay_m from '@/assets/images/saleshistory/overlay_m.png';
import PostRegistrationModal from '@/Components/PostRegistrationModal';


const RegisterProduct = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
        // Scroll to top of the page when modal opens
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Header />
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar />
                </div>
                <ShopMobileTopBlock />
                {/* Desktop Main Section */}
                <main className="hidden md:flex flex-col mx-20 w-[880px] min-w-[640px] max-w-[880px] p-[40px_15px] gap-[22px] items-start">
                    {/* Title */}
                    <h1 className="text-[#363636] font-bold text-[36px] leading-[54px] font-[\'Noto Sans JP\'] text-left">商品登録</h1>
                    {/* Frame 1 */}
                    <section className="flex flex-col w-[850px] max-w-[880px] p-[32px_24px_49px_24px] gap-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] items-start">
                        {/* Image Section (Frame 11) */}
                        <div className="flex p-[64px_300px_40px_316px] justify-end items-center self-stretch rounded-[2px] border-2 border-dashed border-[#ACACAC] bg-[#F1F3F4] w-full">
                            {/* Image Area 111 */}
                            <div className="flex w-[802px] flex-col items-start">
                                {/* Overlay Area 112 */}
                                <div className="flex flex-col justify-center items-center text-center w-full">
                                    {/* mountain_down SVG */}
                                    <div className="flex w-[56px] h-[36px] max-w-[792px] pb-[6px] flex-col items-center mx-auto">
                                        <img src={mountain_down} alt="upload" className="w-[56px] h-[36px] mx-auto" />
                                    </div>
                                    {/* Frame 1121 */}
                                    <div className="flex flex-col items-center gap-[4px] w-full">
                                        <span className="text-[#ACACAC] text-center font-bold text-[16px] leading-[12px] font-[\'Noto Sans JP\'] w-full">ファイルを選択</span>
                                        <span className="text-[#ACACAC] text-center font-medium text-[12px] leading-[12px] font-[\'Noto Sans JP\'] w-full">サイズ:6000px*6000px以内</span>
                                        {/* Frame 11211 */}
                                        <div className="flex flex-row items-center gap-[8px] w-full justify-center">
                                            <span className="text-[#ACACAC] text-center font-medium text-[12px] leading-[12px] font-[\'Noto Sans JP\'] whitespace-nowrap">対応フォーマット:</span>
                                            <span className="flex w-[26px] h-[16px] px-[2px] items-center justify-center rounded-[4px] bg-white text-[#87969F] text-center font-normal text-[9px] leading-[10px] font-[\'Noto Sans JP\'] ml-[2px]">JPG</span>
                                            <span className="flex w-[26px] h-[16px] px-[2px] items-center justify-center rounded-[4px] bg-white text-[#87969F] text-center font-normal text-[9px] leading-[10px] font-[\'Noto Sans JP\'] ml-[2px]">PNG</span>
                                            <span className="flex w-[26px] h-[16px] px-[2px] items-center justify-center rounded-[4px] bg-white text-[#87969F] text-center font-normal text-[9px] leading-[10px] font-[\'Noto Sans JP\'] ml-[2px]">PDF</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Frame 12 */}
                        <div className="flex flex-col items-start self-stretch w-full">
                            {/* Frame 121 */}
                            <div className="flex items-start gap-[16px] self-stretch">
                                <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">ファイル数 &nbsp;0/10</span>
                                <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">容量25MBまで &nbsp;0/25</span>
                            </div>
                            {/* Frame 122 */}
                            <div className="flex flex-col items-start gap-[4px] self-stretch w-full">
                                {/* Frame 1221 */}
                                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                                    <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">タイトル</span>
                                    <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">0/30</span>
                                </div>
                                {/* Frame 1222 */}
                                <div className="flex flex-col items-start pb-[6.57px] self-stretch w-full">
                                    <input
                                        type="text"
                                        className="w-[800px] h-[48px] px-[11px] py-[1px] rounded-[10px] border border-[#FF2AA1] bg-[#FFEFF8] shadow-[0_4px_4px_0_rgba(255,42,161,0.10)] text-[#C9177A] font-medium text-[16px] font-[\'Noto Sans JP\'] focus:outline-none"
                                        placeholder="郊外のカフェにて"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Frame 123 */}
                        <div className="flex flex-col items-start pt-[13.44px] gap-[7.2px] self-stretch w-full">
                            {/* Frame 1231 */}
                            <div className="flex flex-col items-start w-[802px] h-[164.85px] gap-[4px]">
                                {/* Frame 12311 */}
                                <div className="flex items-center h-[58px] flex-shrink-0 self-stretch">
                                    <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">説明文</span>
                                    <span className="flex w-[44.756px] h-[24px] flex-col justify-center flex-shrink-0 text-[#ACACAC] font-normal text-[16px] leading-[24px] font-noto ml-[12px]">0/200</span>
                                </div>
                                {/* Frame 12312 */}
                                <div className="flex flex-col items-start pb-[12.85px] self-stretch w-full">
                                    {/* Frame 123121 */}
                                    <div className="flex flex-col items-start w-[801.99px] min-h-[90px]">
                                        <textarea
                                            className="flex min-h-[90px] w-full p-[10.37px_11.99px_53.21px_11.99px] rounded-[5.71px] bg-white shadow-[0_0_0_1.143px_#E9E9E9_inset] text-[#ACACAC] font-normal text-[14px] font-[\'Noto Sans JP\'] resize-none"
                                            placeholder="商品の説明文"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Frame 1232 */}
                            <div className="flex flex-col items-start gap-[4px] self-stretch w-full">
                                {/* Frame 12321 */}
                                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                                    <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">印刷期限</span>
                                    <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">最大180日後まで</span>
                                </div>
                                {/* Frame 12322 */}
                                <div className="flex flex-col items-start pb-[8px] self-stretch w-full">
                                    <input
                                        type="text"
                                        className="flex w-[802px] h-[45.99px] p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white shadow-[0_0_0_1.143px_#E9E9E9_inset] text-[#ACACAC] font-normal text-[14px] font-[\'Noto Sans JP\'] focus:outline-none"
                                        placeholder="2025/11/24"
                                    />
                                </div>
                            </div>
                            {/* Frame 1233 */}
                            <div className="flex flex-col items-start w-[802px] h-[404px] self-stretch">
                                {/* Frame 12331 */}
                                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch border-b border-[#E9E9E9] mb-5">
                                    <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">販売価格</span>
                                    <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">いずれかを選択</span>
                                </div>
                                {/* Frame 12332: Radio + 有料 */}
                                <div className="flex w-[802px] pr-[413.97px] pb-[8px] items-start">
                                    <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">有料</span>
                                </div>
                                {/* Frame 12333: Price input + note */}
                                <div className="inline-flex items-center pl-[30px] pr-[452px] mb-5">
                                    <input
                                        type="text"
                                        className="flex h-[48px] w-[159px] pr-[5px] text-right text-[#363636] font-normal text-[20px] font-[\'Noto Sans JP\'] rounded-[5.71px] border border-[#E9E9E9] focus:outline-none"
                                        placeholder="1000"
                                    />
                                    <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-[\'Noto Sans JP\'] ml-[8px]">円</span>
                                    <span className="text-[#87969F] font-normal text-[17px] leading-[20px] font-[\'Noto Sans JP\'] whitespace-nowrap ml-[18px]">100~100000円まで</span>
                                </div>
                                {/* Frame 12334: 販売数 */}
                                <div className="flex w-[772px] items-start gap-[15px] pl-[30px] mb-5">
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">販売数</span>
                                </div>
                                {/* Frame 12335: Circle + 無制限 */}
                                <div className="flex w-[802px] h-[29px] px-[30px] pr-[718px] items-start flex-shrink-0 mb-5">
                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">無制限</span>
                                </div>
                                {/* Frame 12336: Radio + 販売数を指定 */}
                                <div className="flex w-[802px] h-[29px] px-[30px] pr-[664px] items-start flex-shrink-0 mb-5">
                                    <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\'] whitespace-nowrap">販売数を指定</span>
                                </div>
                                {/* Frame 12337: Input for sales count */}
                                <div className="flex w-[802px] h-[48px] px-[30px] pr-[638px] items-center flex-shrink-0 mb-5">
                                    <input
                                        type="text"
                                        className="flex h-[48px] w-[159px] pr-[5px] text-right text-[#363636] font-normal text-[20px] font-[\'Noto Sans JP\'] rounded-[5.71px] border border-[#E9E9E9] focus:outline-none"
                                        placeholder="1000"
                                    />
                                </div>
                                {/* Frame 12338: Circle + 無料 */}
                                <div className="flex w-[802px]  pr-[736px] pb-[8px] items-start whitespace-nowrap">
                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                    <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">無料</span>
                                </div>
                            </div>
                        </div>
                        {/* Frame 1234 */}
                        <div className="flex flex-col items-start pt-[12.81px] gap-[4px] self-stretch w-full">
                            {/* Frame 12341 */}
                            <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch border-b border-[#E9E9E9]">
                                <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">表示設定</span>
                                <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\']">どれか１つを選択</span>
                            </div>
                            {/* Frame 12342 */}
                            <div className="flex flex-col items-start w-[802px] self-stretch">
                                {/* 123421: 3 photo options, aligned */}
                                <div className="flex flex-row justify-center items-start gap-[14px] w-full">
                                    {/* 1234211: 設定しない */}
                                    <div className="flex flex-col items-start gap-[5px] w-[148px] h-[220px]">
                                        <img src={photo1} alt="設定しない" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                        <div className="flex items-center gap-[10px] w-full">
                                            <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                            <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-noto">設定しない</span>
                                        </div>
                                    </div>
                                    {/* 1234212: ガチャ */}
                                    <div className="flex flex-col items-start gap-[5px] w-[148px] h-[220px]">
                                        <img src={photo2} alt="ガチャ" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                        <div className="flex items-center gap-[10px] w-full">
                                            <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                            <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-noto">ガチャ</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <span className="text-[#87969F] font-medium text-[12px] leading-[19.5px] font-noto">複数の写真の中からランダムで1枚だけ印刷されます。アップ画像が2枚以上で選択できます。</span>
                                        </div>
                                    </div>
                                    {/* 1234213: ぼかしフィルター */}
                                    <div className="flex flex-col items-end gap-[5px] w-[258.25px] p-[10px_0_52.44px_0]">
                                        <img src={photo3} alt="ぼかしフィルター" className="w-[258.25px] h-[106.56px] rounded-[12px] object-cover" />
                                        <div className="flex items-center gap-[10px] w-full">
                                            <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                            <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-[\'Noto Sans JP\']">ぼかしフィルター</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full min-h-[80px]">
                                            <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">購入するまで写真をぼかしフィルターで隠せます</span>
                                        </div>
                                    </div>
                                </div>
                                {/* 123422: 2 options, stacked below */}
                                <div className="flex flex-row justify-left items-start gap-[14px] w-full">
                                    {/* 1234221: パスワード */}
                                    <div className="flex flex-col items-start gap-[5px] w-[148px] h-[220px]">
                                        <img src={photo4} alt="パスワード" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                        <div className="flex items-center gap-[10px] w-full">
                                            <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                            <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-noto">パスワード</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <span className="text-[#87969F] font-medium text-[12px] leading-[19.5px] font-noto">写真は非公開。パスワードを知っている人だけに公開します。</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="flex h-[45.99px] w-full rounded-[5.71px] bg-white border border-[#E9E9E9] text-[#ACACAC] font-normal text-[14px] font-noto focus:outline-none mt-2"
                                            placeholder="半角英数16文字まで"
                                        />
                                    </div>
                                    {/* 1234222: ワンクッション with overlay */}
                                    <div className="flex flex-col items-end gap-[5px] w-[258.25px] p-[4px_0]">
                                        <div className="relative w-[258.25px] h-[106.56px] rounded-[12px] bg-[#A0A5AC] flex items-center justify-center">

                                            {/* Overlay image/label */}
                                            <img src={overlay} alt="overlay" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                        <div className="flex items-center gap-[10px] w-full">
                                            <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                            <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-[\'Noto Sans JP\']">ワンクッション</span>
                                        </div>
                                        <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">閲覧注意を促しワンタップして写真を公開します。</span>
                                    </div>
                                </div>
                            </div>
                            {/* Frame 12343 */}
                            <div className="flex flex-col items-start w-[802px] gap-[20px]">
                                {/* Frame 123431 */}
                                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\']">商品カテゴリに追加</span>
                                </div>
                                {/* Frame 123432 */}
                                <div className="flex flex-col items-start gap-[8px] self-stretch">
                                    <div className="flex items-center gap-[10px]">
                                        <span className="flex w-[20px] h-[20px] rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">追加しない</span>
                                    </div>
                                </div>
                                {/* Frame 123433 */}
                                <div className="flex flex-col items-start gap-[8px] self-stretch">
                                    {/* 1234331 */}
                                    <div className="flex items-center gap-[10px]">
                                        <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">商品カテゴリに追加</span>
                                    </div>
                                    {/* 1234332 */}
                                    <div className="flex flex-col items-start self-stretch">
                                        <span className="pl-[20px] text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">複数選択可能</span>
                                    </div>
                                </div>
                                {/* Frame 123434 */}
                                <div className="flex justify-center items-start gap-[14px] w-full">
                                    <div className="flex w-[258px] h-[60px] px-[2px] items-center justify-center rounded-[8px] border border-[#FF2AA1] bg-white">
                                        <span className="text-[#FF2AA1] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト1</span>
                                    </div>
                                    <div className="flex w-[258px] h-[60px] px-[2px] items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white">
                                        <span className="text-[#363636] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト2</span>
                                    </div>
                                    <div className="flex w-[258px] h-[60px] px-[2px] items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white">
                                        <span className="text-[#363636] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト3</span>
                                    </div>
                                </div>
                            </div>
                            {/* Frame 12344 */}
                            <div className="flex flex-col items-start gap-[20px] self-stretch w-[802px]">
                                {/* Frame 123441 */}
                                <div className="flex items-center p-[0_512px_1px_0] self-stretch border-b border-[#E9E9E9]">
                                    <div className="flex items-center gap-[10px] p-[25px_0_6px_0]">
                                        <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-[\'Noto Sans JP\'] whitespace-nowrap">シリアル番号設定</span>
                                        <span className="flex w-[112px] h-[27px] flex-col justify-center text-[#ACACAC] font-normal text-[16px] leading-[24px] font-[\'Noto Sans JP\'] ml-[10px]">いずれかを選択</span>
                                    </div>
                                </div>
                                {/* Frame 123442 */}
                                <div className="flex flex-col items-start gap-[8px] self-stretch">
                                    {/* 1234421 */}
                                    <div className="flex items-center gap-[10px] self-stretch">
                                        <img src={radio} alt="radio" className="w-[20px] h-[20px] m-0" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">印字する</span>
                                    </div>
                                    {/* 1234422, 1234423, 1234424: Indented */}
                                    <div className="flex flex-col items-start self-stretch pl-[30px] gap-[8px]">
                                        {/* 1234422 */}
                                        <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">プリントする時にシリアル番号を印字することができます</span>
                                        {/* 1234423 */}
                                        <div className="flex items-center gap-[15px] w-[772px]">
                                            <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                            <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">発行枚数を表示</span>
                                            <span className="text-[#ACACAC] font-normal text-[17px] leading-[24px] font-[\'Noto Sans JP\']">例：000001,000002</span>
                                        </div>
                                        {/* 1234424 */}
                                        <div className="flex items-center gap-[15px] w-[772px]">
                                            <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                            <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">乱数6文字で表示</span>
                                            <span className="text-[#ACACAC] font-normal text-[17px] leading-[24px] font-[\'Noto Sans JP\']">例：736593,918482</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Frame 123443 */}
                                <div className="flex flex-col items-start gap-[8px] self-stretch">
                                    <div className="flex items-center gap-[10px]">
                                        <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-[\'Noto Sans JP\']">印字しない</span>
                                    </div>
                                    <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">プリントする時にシリアル番号は印字されません</span>
                                </div>
                            </div>
                            {/* Frame 12345 */}
                            <div className="flex flex-col items-start gap-[20px] self-stretch">
                                {/* 123451 */}
                                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch border-b border-[#E9E9E9]">
                                    <span className="text-[#363636] font-bold text-[21px] leading-[27px] font-noto">公開設定</span>
                                    <span className="text-[#ACACAC] font-normal text-[16px] leading-[24px] font-noto">いずれかを選択</span>
                                </div>
                                {/* 123452 */}
                                <div className="flex flex-col items-start gap-[8px] self-stretch">
                                    {/* 1234521 */}
                                    <div className="flex items-start gap-[10px] self-stretch">
                                        <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-noto">公開</span>
                                    </div>
                                    {/* 1234522 */}
                                    <span className="self-stretch text-[#87969F] font-medium text-[13px] leading-[19.5px] font-noto">誰でも商品ページを見ることができます</span>
                                </div>
                                {/* 123453 */}
                                <div className="flex flex-col items-start gap-[8px] self-stretch">
                                    {/* 1234531 */}
                                    <div className="flex items-start gap-[10px] self-stretch">
                                        <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-noto">非公開</span>
                                    </div>
                                    {/* 1234532 */}
                                    <span className="self-stretch text-[#87969F] font-medium text-[13px] leading-[19.5px] font-noto">自分だけが商品ページを見ることができます</span>
                                </div>
                            </div>
                        </div>
                        {/* Frame 1235 */}
                        <div className="flex flex-col items-start gap-[10px] self-stretch h-[104.8px] pt-[32.8px]">
                            {/* 12351: Button */}
                            <button
                                className="flex flex-col justify-center items-center w-[802px] px-[36px] py-[15px] rounded-[8px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] shadow-[0_4px_8px_0_rgba(255,42,161,0.20)]"
                                type="button"
                                onClick={handleShowModal}
                            >
                                <span className="text-white text-center font-bold text-[18px] leading-[14px] font-noto">登録する</span>
                            </button>
                            {/* 12352: Note */}
                            <span className="self-stretch text-[#87969F] text-center font-normal text-[12px] leading-[18px] font-noto">
                                ※ 登録後は商品ファイルの変更はできません。
                            </span>
                        </div>
                    </section>
                </main>
                {/* Show modal on all screen sizes */}
                {showModal && (
                    <div
                        className="fixed top-[60px] md:top-[90px] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-start justify-center z-[1000] pt-[60px] md:pt-[90px] pb-[40px] overflow-y-auto mr-[16px] md:mr-[0px]"
                        onClick={() => setShowModal(false)}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="flex justify-center px-[16px]">
                            <PostRegistrationModal onClose={() => setShowModal(false)} />
                        </div>
                    </div>
                )}

                {/* Mobile Main Section */}
                <main className="flex md:hidden flex-col items-start gap-[16px] mt-[32px] mx-[16px]">
                    {/* Title */}
                    <h1 className="w-full text-left text-[#363636] font-bold text-[24px] leading-[24px] font-noto">商品登録</h1>
                    {/* Frame 1 */}
                    <section className="flex flex-col items-start p-[20px_16px] gap-[16px] self-stretch rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
                        {/* Frame 11 */}
                        <div className="flex justify-center items-center p-[18px_63px_14px_62px] rounded-[2px] border-2 border-dashed border-[#ACACAC] bg-[#F1F3F4] w-full">
                            {/* Frame 112 */}
                            <div className="flex flex-col justify-center items-center w-full">
                                {/* mountain svg */}
                                <div className="flex w-[56px] h-[36px] max-w-[792px] pb-[6px] flex-col items-start">
                                    <img src={mountain_down} alt="upload" className="w-[56px] h-[36px]" />
                                </div>
                                {/* 1121 */}
                                <div className="flex flex-col items-start gap-[4px] self-stretch">
                                    <span className="w-full text-center text-[#ACACAC] font-bold text-[16px] leading-[12px] font-noto">ファイルを選択</span>
                                    <span className="w-full text-center text-[#ACACAC] font-medium text-[12px] leading-[12px] font-noto">サイズ:6000px*6000px以内</span>
                                    {/* 11211 */}
                                    <div className="flex flex-row items-center gap-[4px] w-full pt-[4px]">
                                        <span className="text-[#ACACAC] font-medium text-[12px] leading-[12px] font-noto whitespace-nowrap">対応フォーマット:</span>
                                        <span className="flex w-[26px] h-[16px] px-[2px] items-center justify-center rounded-[4px] bg-white text-[#87969F] text-center font-normal text-[9px] leading-[10px] font-noto">JPG</span>
                                        <span className="flex w-[26px] h-[16px] px-[2px] items-center justify-center rounded-[4px] bg-white text-[#87969F] text-center font-normal text-[9px] leading-[10px] font-noto">PNG</span>
                                        <span className="flex w-[26px] h-[16px] px-[2px] items-center justify-center rounded-[4px] bg-white text-[#87969F] text-center font-normal text-[9px] leading-[10px] font-noto">PDF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Frame 12 (Mobile) */}
                        <div className="flex flex-col items-start self-stretch">
                            {/* 121 */}
                            <div className="flex items-start gap-[16px] self-stretch">
                                <span className="text-[#ACACAC] font-normal text-[14px] leading-[21px] tracking-[0.7px] font-noto">
                                    ファイル数&nbsp;0/10
                                </span>
                                <span className="text-[#ACACAC] font-normal text-[14px] leading-[21px] tracking-[0.7px] font-noto">
                                    容量25MBまで&nbsp;0/25
                                </span>
                            </div>
                            {/* 122 */}
                            <div className="flex flex-col items-start gap-[4px] self-stretch mt-2">
                                <div className="flex items-center gap-[12px] pt-[12px] self-stretch">
                                    <span className="text-[#363636] font-bold text-[14px] leading-[14px] font-noto">タイトル</span>
                                    <span className="text-[#ACACAC] font-normal text-[14px] leading-[21px] tracking-[0.7px] font-noto">0/30</span>
                                </div>
                                <div className="flex flex-col items-start pb-[6.57px] self-stretch w-full">
                                    <input
                                        type="text"
                                        className="w-[311px] h-[48px] px-[11px] py-[1px] rounded-[10px] border-1 border-[#FF2AA1] bg-[#FFEFF8] text-[#C9177A] font-medium text-[16px] font-noto focus:outline-none"
                                        placeholder="郊外のカフェにて"
                                    />
                                </div>
                            </div>

                            {/* Frame 123 (Mobile) */}
                            <div className="flex flex-col items-start pt-[13.44px] gap-[7.2px] self-stretch">
                                {/* 1231: 説明文 */}
                                <div className="flex flex-col items-start h-[164.85px] gap-[4px]">
                                    {/* 12311 */}
                                    <div className="flex items-center gap-[12px] py-[12px] self-stretch">
                                        <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">説明文</span>
                                        <span className="text-[#ACACAC] font-noto font-normal text-[14px] leading-[21px] tracking-[0.7px]">0/200</span>
                                    </div>
                                    {/* 12312 */}
                                    <div className="flex flex-col items-start pb-[12.85px] self-stretch">
                                        {/* 123121 */}
                                        <div className="flex flex-col items-start w-[311px] h-[128px]">
                                            <textarea
                                                className="flex w-full h-full p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] text-[#ACACAC] font-noto font-normal text-[14px] leading-[25.66px] resize-none"
                                                placeholder="商品の説明文"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* 1232: 印刷期限 */}
                                <div className="flex flex-col items-start gap-[4px] self-stretch">
                                    {/* 12321 */}
                                    <div className="flex items-center gap-[12px] py-[12px] self-stretch">
                                        <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">印刷期限</span>
                                        <span className="text-[#ACACAC] font-noto font-normal text-[14px] leading-[21px]">最大180日後まで</span>
                                    </div>
                                    {/* 12322 */}
                                    <div className="flex flex-col items-start pb-[8px] self-stretch">
                                        <input
                                            type="text"
                                            className="flex w-[311px] h-[45.99px] p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] text-[#ACACAC] font-noto font-normal text-[14px] focus:outline-none"
                                            placeholder="2025/11/24"
                                        />
                                    </div>
                                </div>
                                {/* 1233: 販売価格 */}
                                <div className="flex flex-col items-start w-[311px]">
                                    {/* 12331 */}
                                    <div className="flex items-center gap-[12px] py-[12px] self-stretch border-b border-[#E9E9E9] mb-3">
                                        <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">販売価格</span>
                                        <span className="text-[#ACACAC] font-noto font-normal text-[14px] leading-[21px]">いずれかを選択</span>
                                    </div>
                                    {/* 12332: Radio + 有料 */}
                                    <div className="flex items-center gap-[8px] mt-[4.19px]  mb-[8px]">
                                        <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                        <span className="flex w-[42.2px] h-[24px] items-center text-[#363636] font-noto font-normal text-[14px] leading-[24px]">有料</span>
                                    </div>
                                    {/* 12333: Price input + note */}
                                    <div className="inline-flex items-center gap-[8px] ml-[30px] mr-[23px] mb-[8px]">
                                        <input
                                            type="text"
                                            className="flex w-[120px] h-[48px] px-[11px] py-[1px] rounded-[4px] border border-[#C6C6C6] text-[#363636] font-noto font-normal text-[20px] text-right"
                                            placeholder="1000"
                                        />
                                        <span className="text-[#363636] font-noto font-medium text-[14px] leading-[25px]">円</span>
                                        <span className="text-[#87969F] font-noto font-normal text-[12px] leading-[18px]">100~100000円まで</span>
                                    </div>
                                    {/* 12334: 販売数 */}
                                    <div className="flex items-start gap-[15px] w-[281px] mt-3 ml-[30px] mb-[8px]">
                                        <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">販売数</span>
                                    </div>
                                    {/* 12335: Circle + 無制限 */}
                                    <div className="flex items-center w-[281px] h-[29px] ml-[30px] mb-[16px]">
                                        <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                        <span className="text-[#363636] font-noto font-normal text-[14px] leading-[24px] whitespace-nowrap">無制限</span>
                                    </div>
                                    {/* 12336: Radio + 販売数を指定 */}
                                    <div className="flex items-center w-[281px] h-[29px] ml-[30px] mb-[8px]">
                                        <img src={radio} alt="radio" className="w-[20px] h-[20px] mr-[10px]" />
                                        <span className="text-[#363636] font-noto font-normal text-[14px] leading-[24px] whitespace-nowrap">販売数を指定</span>
                                    </div>
                                    {/* 12337: Input for sales count */}
                                    <div className="inline-flex items-center gap-[8px] ml-[30px] mb-[8px]">
                                        <input
                                            type="text"
                                            className="flex w-[120px] h-[48px] px-[11px] py-[1px] rounded-[4px] border border-[#C6C6C6] text-[#363636] font-noto font-normal text-[20px] text-right"
                                            placeholder="1000"
                                        />
                                    </div>
                                    {/* 12338: Circle + 無料 */}
                                    <div className="flex items-center w-[311px]">
                                        <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8] mr-[10px]" />
                                        <span className="text-[#363636] font-noto font-normal text-[14px] leading-[24px]">無料</span>
                                    </div>
                                </div>
                                {/* Frame 1234 */}
                                <div className="flex flex-col items-start pt-[12.81px] gap-[4px] self-stretch w-full">
                                    {/* Frame 12341 */}
                                    <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch border-b border-[#E9E9E9]">
                                        <span className="text-[#363636] font-noto font-bold text-[14px] leading-[14px]">表示設定</span>
                                        <span className="text-[#ACACAC] font-noto font-normal text-[14px] leading-[21px]">どれか１つを選択</span>
                                    </div>
                                    {/* Frame 12342 */}
                                    <div className="flex flex-col items-start self-stretch">
                                        {/* 123421: 2 photo options, aligned */}
                                        <div className="flex flex-row justify-center items-start gap-[14px] w-full">
                                            {/* 1234211: 設定しない */}
                                            <div className="flex flex-col items-start gap-[5px] w-[148px] h-[220px]">
                                                <img src={photo1_m} alt="設定しない" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                                <div className="flex items-center gap-[10px] w-full">
                                                    <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                                    <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-noto">設定しない</span>
                                                </div>
                                            </div>
                                            {/* 1234212: ガチャ */}
                                            <div className="flex flex-col items-start gap-[5px] w-[148px] h-[220px]">
                                                <img src={photo2_m} alt="ガチャ" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                                <div className="flex items-center gap-[10px] w-full">
                                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                    <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-noto">ガチャ</span>
                                                </div>
                                                <div className="flex flex-col items-start w-full">
                                                    <span className="text-[#87969F] font-medium text-[12px] leading-[19.5px] font-noto">複数の写真の中からランダムで1枚だけ印刷されます。アップ画像が2枚以上で選択できます。</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 123422: 2 options, aligned */}
                                        <div className="flex flex-row justify-left items-start gap-[14px] w-full">

                                            {/* 1234213: ぼかしフィルター */}
                                            <div className="flex flex-col items-end gap-[5px]  w-[148px] h-[250px] pt-2.5">
                                                <img src={photo3_m} alt="ぼかしフィルター" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                                <div className="flex items-center gap-[10px] w-full pt-2.5">
                                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                    <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-[\'Noto Sans JP\']">ぼかしフィルター</span>
                                                </div>
                                                <div className="flex flex-col items-start w-full min-h-[80px]">
                                                    <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">購入するまで写真をぼかしフィルターで隠せます</span>
                                                </div>
                                            </div>
                                            {/* 1234221: パスワード */}
                                            <div className="flex flex-col items-start gap-[5px] w-[148px] h-[262px] pt-2.5">
                                                <img src={photo4_m} alt="パスワード" className="w-[148px] h-[88px] rounded-[12px] object-cover" />
                                                <div className="flex items-center gap-[10px] w-full pt-2.5">
                                                    <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                                    <span className="text-[#363636] font-normal text-[14px] leading-[22px] font-noto">パスワード</span>
                                                </div>
                                                <div className="flex flex-col items-start w-full">
                                                    <span className="text-[#87969F] font-medium text-[12px] leading-[19.5px] font-noto">写真は非公開。パスワードを知っている人だけに公開します。</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="flex h-[45.99px] w-full rounded-[5.71px] bg-white border border-[#E9E9E9] text-[#ACACAC] font-normal text-[14px] font-noto focus:outline-none mt-2"
                                                    placeholder="半角英数16文字まで"
                                                />
                                            </div>
                                        </div>
                                        {/* 1234213: warning */}
                                        <div className="flex flex-col items-end gap-[5px]  w-[148px] h-[220px] pt-2.5">
                                            <div className="relative w-[148px] h-[88px] rounded-[12px] bg-[#A0A5AC] flex items-center justify-center mt-5">
                                                {/* Overlay image/label */}
                                                <img src={overlay_m} alt="overlay" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                            </div>
                                            <div className="flex items-center gap-[10px] w-full mt-3">
                                                <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[19.5px] font-[\'Noto Sans JP\']">ワンクッション</span>
                                            </div>
                                            <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-noto mt-2">閲覧注意を促しワンタップして写真を公開します。</span>
                                        </div>
                                    </div>
                                    {/* Frame 12343 */}
                                    <div className="flex flex-col items-start w-[802px] gap-[20px]">
                                        {/* Frame 123431 */}
                                        <div className="flex items-center gap-[12px] p-[20px_0_0_0] self-stretch border-b border-[#E9E9E9]">
                                            <span className="text-[#363636] font-bold text-[14px] leading-[20px] font-[\'Noto Sans JP\']">商品カテゴリに追加</span>
                                        </div>
                                        {/* Frame 123432 */}
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            <div className="flex items-center gap-[10px]">
                                                <span className="flex w-[20px] h-[20px] rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">追加しない</span>
                                            </div>
                                            <div className="flex flex-col items-start self-stretch">
                                                <span className="pl-[30px] text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">誰でも商品ページを見ることができます</span>
                                            </div>
                                        </div>
                                        {/* Frame 123433 */}
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            {/* 1234331 */}
                                            <div className="flex items-center gap-[10px]">
                                                <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">商品カテゴリに追加</span>
                                            </div>
                                            {/* 1234332 */}
                                            <div className="flex flex-col items-start self-stretch">
                                                <span className="pl-[30px] text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">複数選択可能</span>
                                            </div>
                                        </div>
                                        {/* Frame 123434 */}
                                        <div className="flex justify-center items-start gap-[14px] ">
                                            <div className="flex w-[148px] h-[48px] px-[2px] items-center justify-center rounded-[8px] border border-[#FF2AA1] bg-white">
                                                <span className="text-[#FF2AA1] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト1</span>
                                            </div>
                                            <div className="flex w-[148px] h-[48px] px-[2px] items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white">
                                                <span className="text-[#363636] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト2</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-start gap-[14px] ">
                                            <div className="flex w-[148px] h-[48px] px-[2px] items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white">
                                                <span className="text-[#363636] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト4</span>
                                            </div>
                                            <div className="flex w-[148px] h-[48px] px-[2px] items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white">
                                                <span className="text-[#363636] font-normal text-[16px] leading-[21px] font-[\'Noto Sans JP\'] text-center">新しいリスト4</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Frame 12344 */}
                                    <div className="flex flex-col items-start gap-[20px] self-stretch">
                                        {/* Frame 123441 */}
                                        <div className="flex items-center p-[0_512px_1px_0] self-stretch border-b border-[#E9E9E9]">
                                            <div className="flex items-center gap-[10px] p-[25px_0_6px_0]">
                                                <span className="text-[#363636] font-bold text-[14px] leading-[14px] font-[\'Noto Sans JP\'] whitespace-nowrap">シリアル番号設定</span>
                                                <span className="flex w-[112px] h-[27px] flex-col justify-center text-[#ACACAC] font-normal text-[14px] leading-[14px] font-[\'Noto Sans JP\'] ml-[10px]">いずれかを選択</span>
                                            </div>
                                        </div>
                                        {/* Frame 123442 */}
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            {/* 1234421 */}
                                            <div className="flex items-center gap-[10px] self-stretch">
                                                <img src={radio} alt="radio" className="w-[20px] h-[20px] m-0" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">印字する</span>
                                            </div>
                                            {/* 1234422, 1234423, 1234424: Indented */}
                                            <div className="flex flex-col items-start self-stretch pl-[30px] gap-[8px]">
                                                {/* 1234422 */}
                                                <span className="text-[#87969F] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\']">プリントする時にシリアル番号を印字することができます</span>
                                                {/* 1234423 */}
                                                <div className="flex items-center gap-[15px] w-[772px]">
                                                    <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">発行枚数を表示</span>
                                                    <span className="text-[#ACACAC] font-normal text-[12px] leading-[18px] font-[\'Noto Sans JP\']">例：000001,000002</span>
                                                </div>
                                                {/* 1234424 */}
                                                <div className="flex items-center gap-[15px] w-[772px]">
                                                    <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">乱数6文字で表示</span>
                                                    <span className="text-[#ACACAC] font-normal text-[12px] leading-[18px] font-[\'Noto Sans JP\']">例：736593,918482</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Frame 123443 */}
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            <div className="flex items-center gap-[10px]">
                                                <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-[\'Noto Sans JP\']">印字しない</span>
                                            </div>
                                            <span className="text-[#87969F] pl-[30px] font-medium text-[13px] leading-[19.5px] font-[\'Noto Sans JP\'] whitespace-nowrap ">プリントする時にシリアル番号は印字されません</span>
                                        </div>
                                    </div>
                                    {/* Frame 12345 */}
                                    <div className="flex flex-col items-start gap-[20px] self-stretch">
                                        {/* 123451 */}
                                        <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch border-b border-[#E9E9E9]">
                                            <span className="text-[#363636] font-bold text-[14px] leading-[27px] font-noto">公開設定</span>
                                            <span className="text-[#ACACAC] font-normal text-[14px] leading-[24px] font-noto">いずれかを選択</span>
                                        </div>
                                        {/* 123452 */}
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            {/* 1234521 */}
                                            <div className="flex items-start gap-[10px] self-stretch">
                                                <img src={radio} alt="radio" className="w-[20px] h-[20px]" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-noto">公開</span>
                                            </div>
                                            {/* 1234522 */}
                                            <span className="self-stretch text-[#87969F] pl-[30px] font-medium text-[13px] leading-[19.5px] font-noto">誰でも商品ページを見ることができます</span>
                                        </div>
                                        {/* 123453 */}
                                        <div className="flex flex-col items-start gap-[8px] self-stretch">
                                            {/* 1234531 */}
                                            <div className="flex items-start gap-[10px] self-stretch">
                                                <span className="flex w-[20px] h-[20px] flex-shrink-0 rounded-full border border-[#D1D1D1] bg-[#F8F8F8]" />
                                                <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-noto">非公開</span>
                                            </div>
                                            {/* 1234532 */}
                                            <span className="self-stretch text-[#87969F] pl-[30px] font-medium text-[13px] leading-[19.5px] font-noto">自分だけが商品ページを見ることができます</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Frame 1235 */}
                                <div className="flex flex-col items-start gap-[10px] self-stretch h-[104.8px] pt-[32.8px]">
                                    {/* 12351: Button */}
                                    <button
                                        className="flex flex-col justify-center items-center w-[311px] px-[36px] py-[15px] rounded-[8px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] shadow-[0_4px_8px_0_rgba(255,42,161,0.20)]"
                                        type="button"
                                        onClick={handleShowModal}
                                    >
                                        <span className="text-white text-center font-bold text-[18px] leading-[14px] font-noto">登録する</span>
                                    </button>
                                    {/* 12352: Note */}
                                    <span className="self-stretch text-[#87969F] text-center font-normal text-[12px] leading-[18px] font-noto">
                                        ※ 登録後は商品ファイルの変更はできません。
                                    </span>
                                </div>
                            </div>
                        </div>

                    </section>
                </main>
            </div >
            <Footer />
        </>
    );
};

export default RegisterProduct;