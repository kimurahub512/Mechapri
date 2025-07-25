import React, { useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/productdetails/photo1.jpg';
import girl from '@/assets/images/favoriteshops/girl.svg';
import pen from '@/assets/images/pencil_line_black.svg';
import recyclebin from '@/assets/images/recyclebin.svg';
import heart from '@/assets/images/heart.svg';
import share from '@/assets/images/share.svg';
import complex from '@/assets/images/complex_black.svg';
import complex_white from '@/assets/images/complex_white.svg';
import question from '@/assets/images/question.svg';
import question_circle from '@/assets/images/question_circle.svg';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import qr from '@/assets/images/productdetails/qr.jpg';
import x from '@/assets/images/x_logo.svg';
import instagram from '@/assets/images/instagram.svg';


const ProductDetailsFree = () => {
    return (
        <div className='product-details-no-footer-gap bg-[#F6F8FA]'>
            <Header />
            <main className="hidden md:flex flex-col items-center px-[120px] pt-[44px] pb-[176px] w-full bg-[#F6F8FA]">
                {/* Frame 1 */}
                <div className="flex flex-col items-center gap-[41px] w-full max-w-[1200px]">
                    {/* 11 */}
                    <div className="flex flex-col items-start gap-[24px] w-full relative">
                        {/* 111: 非公開中の作品です */}
                        <div className="flex flex-col items-center w-full p-[8px_9px] border border-[#FF8D4E] bg-[#FF2AA1] rounded">
                            <span className="text-white text-center font-['Noto Sans JP'] text-[14px] font-bold leading-[22px]">非公開中の作品です</span>
                        </div>
                        {/* 112 */}
                        <div className="flex flex-col justify-center items-start h-[66px] w-full relative">
                            {/* 1121 */}
                            <div className="flex items-center w-full">
                                {/* 11211 */}
                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                    {/* 112111 */}
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                    </div>
                                </div>
                                {/* 11212 */}
                                <div className="flex flex-col items-start">
                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                </div>
                            </div>
                            {/* 1122: Edit/Delete buttons */}
                            <div className="flex items-center gap-[8px] absolute right-0 top-[15px]">
                                {/* 11221: Edit */}
                                <button className="flex items-center gap-[8px] w-[90px] h-[34px] px-[16px] rounded-[5px] bg-[#E9E9E9]">
                                    <img src={pen} alt="edit" className="w-[20px] h-[20px]" />
                                    <span className="text-[#767676] font-['Noto Sans JP'] text-[12px] font-bold leading-[18px]">編集</span>
                                </button>
                                {/* 11222: Delete */}
                                <button className="flex items-center gap-[8px] w-[90px] h-[34px] px-[16px] rounded-[5px] bg-[#E9E9E9]">
                                    <img src={recyclebin} alt="delete" className="w-[20px] h-[20px]" />
                                    <span className="text-[#767676] font-['Noto Sans JP'] text-[12px] font-bold leading-[18px]">削除</span>
                                </button>
                            </div>
                        </div>
                        {/* 113 */}
                        <div className="flex flex-col items-start gap-[8px] w-full">
                            {/* 1131: Title */}
                            <div className="flex flex-col items-start w-[1200px]">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[36px] font-bold leading-[54px]">郊外のカフェにて</span>
                            </div>
                            {/* 1132: Description and Date */}
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[18px] font-normal leading-[32.4px]">郊外のカフェです</span>
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[12px] font-normal leading-[18px]">2025/10/05まで販売</span>
                            </div>
                        </div>
                        {/* 114 */}
                        <div className="flex flex-wrap justify-between items-center pb-[12px] w-full border-b border-[#D1D1D1]">
                            {/* 1141 */}
                            <div className="flex items-center gap-[10px]">
                                {/* 11411 */}
                                <div className="flex flex-col items-start gap-[10px] p-[8px]">
                                    {/* 114111: Heart, お気に入り, 1000 */}
                                    <div className="flex items-center gap-[4px]">
                                        <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                        <span className="text-[#222] font-['Noto Sans JP'] text-[14px] font-bold leading-[21px]">お気に入り</span>
                                        <span className="text-[#222] font-['Noto Sans JP'] text-[14px] font-bold leading-[21px]">1000</span>
                                    </div>
                                </div>
                            </div>
                            {/* 1142 */}
                            <div className="flex items-center h-[32px] gap-[4px]">
                                {/* 11421 */}
                                <div className="flex flex-col items-start pl-[4px]">
                                    <div className="flex items-center gap-[4px]">
                                        <img src={share} alt="share" className="w-[20px] h-[20px]" />
                                        <span className="text-[#222] font-['Noto Sans JP'] text-[12px] font-normal leading-[13.8px]">シェア</span>
                                    </div>
                                </div>
                                {/* 11422 */}
                                <div className="flex flex-col items-start pl-[24px]">
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center justify-end w-full">
                                            <img src={complex} alt="complex" className="w-[20px] h-[20px]" />
                                            <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                            <span className="text-[#767676] text-right font-['Noto Sans JP'] text-[14px] font-bold leading-[21px] ml-[4px]">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section 12 */}
                    <section className="flex flex-col items-start gap-[32px] w-[960px] mt-[60px]">
                        {/* 121 */}
                        <div className="flex flex-col h-[1070px] w-full rounded-[40px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] p-0">
                            {/* 1211: Blurred image with overlay */}
                            <div className="flex w-[500px] px-[90px] py-[10px] justify-center items-center rounded-[16px] bg-[#F6F6F6] mx-auto mt-[40px] relative">
                                {/* Blurred image */}
                                <div className="flex w-[320px] max-w-[396px] flex-col justify-center items-center flex-shrink-0 relative">
                                    <img src={photo1} alt="main" className="h-[480px] max-w-[396px] w-full object-cover rounded-[8px] filter blur-[4px]" />
                                    {/* Overlay 121111 */}
                                    <div className="flex flex-col justify-center items-center w-[320px] h-[480px] max-w-[320px] absolute right-[0px] top-0 rounded-[8px] bg-black bg-opacity-40">
                                        <div className="flex flex-col justify-center items-center w-[194.61px] h-[156px]">
                                            <img src={question} alt="question" className="w-[80px] h-[80px] mb-[8px]" />
                                            <span className="flex w-[128.262px] h-[24px] justify-center items-center text-white text-center font-['Hiragino Sans'] text-[16px] font-normal leading-[24px]">ぼかしフィルター</span>
                                            <span className="flex w-[128.262px] h-[24px] justify-center items-center text-white text-center font-['Hiragino Sans'] text-[16px] font-normal leading-[24px] whitespace-nowrap">コンビニに行って確認しよう!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 1212: Print info blocks */}
                            <div className="inline-flex flex-col items-start w-[500px] mt-[40px] mx-auto">
                                {/* 12121: Gradient header */}
                                <div className="flex px-[140px] py-[13.649px] pr-[137px] rounded-t-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] items-center gap-[10px] w-full whitespace-nowrap">
                                    <div className="flex items-center gap-[8px] ">
                                        <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                        <span className="text-white font-['Noto Sans JP'] text-[14px] font-bold leading-[14px] ">プリント期限</span>
                                    </div>
                                    <div className="flex flex-col items-start ml-[24px]">
                                        <span className="text-white font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">2025/10/05まで</span>
                                    </div>
                                </div>
                                {/* 12122: Print options */}
                                <div className="flex flex-col items-center gap-[20px] w-full bg-[#F6F6F6] rounded-b-[16px] p-[12px]">
                                    {/* 121221: Famima/Lawson/Ministop */}
                                    <div className="flex w-[480px] px-[24px] justify-between items-center rounded-[10px] bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] ">
                                        <div className="flex flex-col items-center flex-1">
                                            <div className="flex h-[74px] py-[30px] justify-between items-center w-full ">
                                                <span className="w-[201px] font-['Noto Sans JP'] text-[18px] font-bold leading-[20.7px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">ファミマ・ローソン・<br />ミニストップで印刷する</span>
                                                <div className="flex items-center gap-[12px] ml-[16px]">
                                                    <img src={shop1} alt="printshop" className="w-[64.863px] h-[48px]" />
                                                    <img src={shop2} alt="lawson" className="w-[64.863px] h-[48px]" />
                                                    <img src={shop3} alt="ministop" className="w-[64.863px] h-[48px]" />
                                                </div>
                                            </div>
                                            {/*12122112*/}
                                            <div className="relative w-[358px] h-[150px] mt-[12px]">
                                                <img src={qr} alt="qr" className="absolute top-0 left-0 w-[150px] h-[150px] " />
                                                <span className="absolute top-[44.5px] left-[226px] text-[#000] font-['Noto Sans JP'] text-[14px] font-normal leading-[21px]">印刷番号</span>
                                                <span className="absolute top-[73.5px] left-[180px] text-[#363636] font-['Noto Sans JP'] text-[24px] font-bold leading-[24px] text-center">2CNM9FX279</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 121222: Seven Eleven */}
                                    <div className="flex w-[480px] h-[74px] px-[24px] justify-between items-center rounded-[10px] border border-[#D1D1D1] bg-white bg-opacity-50 ">
                                        <div className="flex items-center w-[425px] h-[74px] py-[30px] justify-between">
                                            <span className="font-['Noto Sans JP'] text-[18px] font-bold leading-[20.7px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">セブンイレブンで印刷する</span>
                                            <img src={eleven} alt="eleven" className="w-[59px] h-[59px] rounded-full object-cover ml-[16px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 1213: Help link */}
                            <div className="flex flex-col items-center w-[386px] h-[20px] mt-[24px] ml-[287px]">
                                <div className="flex items-center gap-[8px]">
                                    <img src={question_circle} alt="question_circle" className="w-[20px] h-[20px]" />
                                    <span className="text-[#767676] font-['Noto Sans JP'] text-[14px] font-normal leading-[20px] underline cursor-pointer">プリントの方法が分からない時は</span>
                                </div>
                            </div>
                        </div>
                        {/* 122: Ranking */}
                        <div className="flex flex-col items-start w-[960px] px-[66px] py-[32px] gap-[10px] bg-white rounded-[24px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                            {/* 1221: Ranking title and list */}
                            <div className="flex flex-col items-start gap-[16px] w-full">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">ランキング</span>
                                {/* 12211: Ranking list */}
                                <div className="flex flex-col items-start gap-[24px] w-full">
                                    {/* 122111: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[36px] font-bold leading-[54px]">1</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122112: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[28px] font-bold leading-[42px]">2</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122113: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[28px] font-bold leading-[42px]">3</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122114: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#222] font-['Noto Sans JP'] text-[24px] font-bold leading-[24px]">4</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 122115: Ranking item example */}
                                    <div className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                                        <div className="flex items-center gap-[24px]">
                                            <div className="flex flex-col items-center pb-[12px]">
                                                <span className="text-[#222] font-['Noto Sans JP'] text-[24px] font-bold leading-[24px]">5</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                                    <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* Personal Info Footer (Frame 2) */}
            <section className="hidden md:flex flex-col items-center w-[1440px] pt-[48px] pb-[48px] px-[24px] gap-[24px] bg-[#F6F8FA] mx-auto">
                <div className="flex w-[1248px] justify-between items-start">
                    {/* Left: 21 */}
                    <div className="flex w-[400px] max-w-[1248px] items-start flex-shrink-0">
                        <img src={girl} alt="girl" className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0" />
                        {/* 211 */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy2005</span>
                                <div className="flex pt-[10px] gap-[4px]">
                                    <img src={x} alt="x" className="w-[46.429px] h-[46.429px] opacity-100" />
                                    <img src={instagram} alt="instagram" className="w-[46.429px] h-[46.429px] opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: 22 */}
                    <div className="flex w-[800px] max-w-[1248px] flex-col items-start flex-shrink-0">
                        <div className="flex w-[800px] max-w-[1248px] flex-col items-start flex-shrink-0">
                            <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-normal leading-[27.2px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Mobile Main Section */}
            <div className="flex flex-col gap-[84px]">
            <section className="flex flex-col items-start gap-[24px] px-4 md:hidden w-full pt-[32px] bg-[#F6F8FA] mt-[-12px]">
                {/* Frame 11 */}
                <div className="flex flex-col items-start gap-[24px] w-[343px]">
                    {/* 111: 非公開中の作品です */}
                    <div className="flex flex-col justify-center items-center w-full p-[8px_9px] border border-[#FF8D4E] bg-[#FF2AA1]">
                        <span className="w-full text-white text-center font-['Noto Sans JP'] text-[14px] font-bold leading-[22px]">非公開中の作品です</span>
                    </div>
                    {/* 112 */}
                    <div className="flex flex-col items-start gap-[12px] w-full">
                        {/* 1121 */}
                        <div className="flex flex-col items-start gap-[12px] w-full">
                            {/* 11211 */}
                            <div className="flex items-center w-full">
                                {/* 112111 */}
                                <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                    <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover" />
                                    </div>
                                </div>
                                <span className="text-[#000] font-['Noto Sans JP'] text-[21px] font-bold leading-[32px]">anchiy1005</span>
                            </div>
                        </div>
                        {/* 1122 */}
                        <div className="flex flex-col items-start gap-[10px] w-full">
                            {/* 11221 */}
                            <div className="flex flex-col justify-center items-start gap-[12px] w-full">
                                <span className="text-[#363636] text-left font-['Noto Sans JP'] text-[24px] font-bold leading-[24px] w-full">郊外のカフェにて</span>
                            </div>
                            {/* 11222 */}
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[14px] font-bold leading-[14px] w-full">郊外のカフェです</span>
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[12px] font-normal leading-[18px]">2025/10/05まで販売</span>
                            </div>
                        </div>
                        {/* 1123: Edit/Delete */}
                        <div className="flex items-center gap-[13px] w-full">
                            {/* 11231: Edit */}
                            <button className="flex items-center gap-[8px] bg-[#E9E9E9] rounded-[5px] px-[16px] py-[9px]">
                                <img src={pen} alt="edit" className="w-[20px] h-[20px]" />
                                <span className="text-[#767676] font-['Noto Sans JP'] text-[12px] font-bold leading-[18px]">編集</span>
                            </button>
                            {/* 11232: Delete */}
                            <button className="flex items-center gap-[8px] bg-[#E9E9E9] rounded-[5px]  px-[16px] py-[9px]">
                                <img src={recyclebin} alt="delete" className="w-[20px] h-[20px]" />
                                <span className="text-[#767676] font-['Noto Sans JP'] text-[12px] font-bold leading-[18px]">削除</span>
                            </button>
                        </div>
                    </div>
                    {/* 113 */}
                    <div className="flex flex-col items-start gap-[8px] w-full pb-[16px] border-b border-[#D1D1D1]">
                        {/* 1131 */}
                        <div className="flex flex-col items-start gap-[10px] p-[8px] rounded-[6px]">
                            <div className="flex items-center gap-[4px]">
                                <img src={heart} alt="heart" className="w-[20px] h-[20px]" />
                                <span className="text-[#363636] font-['Noto Sans JP'] text-[12px] font-normal leading-[18px]">お気に入り</span>
                                <span className="text-[#363636] font-['Red Hat Display'] text-[14px] font-bold leading-[21px]">1000</span>
                            </div>
                        </div>
                        {/* 1132 */}
                        <div className="flex items-center w-full">
                            {/* 11321: Share */}
                            <div className="flex items-center gap-[4px]">
                                <img src={share} alt="share" className="w-[20px] h-[20px]" />
                                <span className="text-[#222] font-['Noto Sans JP'] text-[12px] font-normal leading-[13.8px]">シェア</span>
                            </div>
                            {/* 11322: Print count */}
                            <div className="flex flex-col items-start ml-[16px]">
                                <div className="flex items-center justify-end w-full">
                                    <img src={complex} alt="complex" className="w-[20px] h-[20px]" />
                                    <span className="text-[#767676] font-['Hiragino Sans'] text-[14px] font-medium leading-[14px] ml-[4px]">プリント実績</span>
                                    <span className="w-[12px] text-[#767676] text-right font-['Noto Sans JP'] text-[14px] font-bold leading-[21px] ml-[4px]">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile Section 12 */}
                <section className="flex flex-col items-start gap-[32px] w-full mt-[32px]">
                    {/* 121 */}
                    <div className="flex flex-col w-full rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] px-4 pb-5">
                        {/* 1211: Blurred image with overlay */}
                        <div className="flex w-full px-[16px] py-[10px] justify-center items-center rounded-[10px] bg-[#F6F6F6] mx-auto mt-[24px] relative">
                            {/* Blurred image */}
                            <div className="flex w-full max-w-[200px] flex-col justify-center items-center flex-shrink-0 relative">
                                <img src={photo1} alt="main" className="h-[298px] w-full object-cover rounded-[6px] filter blur-[2px]" />
                                {/* Overlay 121111 */}
                                <div className="flex flex-col justify-center items-center w-full h-[298px] absolute right-[0px] top-0 rounded-[8px] bg-black bg-opacity-40">
                                    <div className="flex flex-col justify-center items-center w-[140px] h-[120px]">
                                        <img src={question} alt="question" className="w-[48px] h-[48px] mb-[8px]" />
                                        <span className="flex w-full h-[20px] justify-center items-center text-white text-center font-['Hiragino Sans'] text-[12px] font-normal leading-[15px]">ぼかしフィルター</span>
                                        <span className="flex w-full h-[20px] justify-center items-center text-white text-center font-['Hiragino Sans'] text-[10px] font-normal leading-[13.6px] whitespace-nowrap">コンビニに行って確認しよう!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 1212: Print info blocks */}
                        <div className="inline-flex flex-col items-start w-full mt-[24px] mx-auto">
                            {/* 12121: Gradient header */}
                            <div className="flex px-[44px] py-[13.5px] rounded-t-[16px] bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] items-center gap-[8px] w-full whitespace-nowrap">
                                <div className="flex items-center gap-[6px]">
                                    <img src={complex_white} alt="complex_white" className="w-[20px] h-[20px]" />
                                    <span className="text-white font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">プリント期限</span>
                                </div>
                                <div className="flex flex-col items-start ml-[16px]">
                                    <span className="text-white font-['Noto Sans JP'] text-[14px] font-bold leading-[14px]">2025/10/05まで</span>
                                </div>
                            </div>
                            {/* 12122: Print options */}
                            <div className="flex flex-col items-center gap-[16px] w-full bg-[#F6F6F6] rounded-b-[16px] p-[12px]">
                                {/* 121221: Famima/Lawson/Ministop */}
                                <div className="flex w-full px-[16px] justify-between items-center rounded-[10px] bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]">
                                    <div className="flex flex-col items-center flex-1">
                                        <div className="flex h-[60px] py-[20px] justify-between items-center w-full">
                                            <span className="w-[160px] font-['Noto Sans JP'] text-[12px] font-bold leading-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent whitespace-nowrap">ファミマ・ローソン・<br />ミニストップで印刷する</span>
                                            <div className="flex items-center gap-[8px] ml-[12px]">
                                                <img src={shop1} alt="printshop" className="w-[33.2px] h-[24.5px]" />
                                                <img src={shop2} alt="lawson" className="w-[33.2px] h-[24.4px]" />
                                                <img src={shop3} alt="ministop" className="w-[33.2px] h-[24.4px]" />
                                            </div>
                                        </div>
                                        {/*12122112*/}
                                        <div className="relative w-[240px] h-[100px] mt-[8px]">
                                            <img src={qr} alt="qr" className="absolute top-0 left-0 w-[100px] h-[100px]" />
                                            <span className="absolute top-[30px] left-[150px] text-[#000] font-['Noto Sans JP'] text-[12px] font-normal leading-[16px]">印刷番号</span>
                                            <span className="absolute top-[50px] left-[120px] text-[#363636] font-['Noto Sans JP'] text-[16px] font-bold leading-[16px] text-center">2CNM9FX279</span>
                                        </div>
                                    </div>
                                </div>
                                {/* 121222: Seven Eleven */}
                                <div className="flex w-full h-[60px] px-[16px] justify-between items-center rounded-[10px] border border-[#D1D1D1] bg-white bg-opacity-50">
                                    <div className="flex items-center w-full h-[60px] py-[20px] justify-between">
                                        <span className="font-['Noto Sans JP'] text-[12px] font-bold leading-[16px] bg-gradient-to-l from-[#AB31D3] to-[#FF2AA1] bg-clip-text text-transparent">セブンイレブンで印刷する</span>
                                        <img src={eleven} alt="eleven" className="w-[40px] h-[40px] rounded-full object-cover ml-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 1213: Help link */}
                        <div className="flex flex-col items-center w-full h-[20px] mt-[32px] px-[16px]">
                            <div className="flex items-center gap-[6px]">
                                <img src={question_circle} alt="question_circle" className="w-[16px] h-[16px]" />
                                <span className="text-[#767676] font-['Noto Sans JP'] text-[12px] font-normal leading-[16px] underline cursor-pointer">プリントの方法が分からない時は</span>
                            </div>
                        </div>
                    </div>
                    {/* 122: Ranking */}
                    <div className="flex flex-col items-start w-full px-[16px] py-[24px] gap-[8px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                        {/* 1221: Ranking title and list */}
                        <div className="flex flex-col items-start gap-[12px] w-full">
                            <span className="text-[#000] font-['Noto Sans JP'] text-[18px] font-bold leading-[24px]">ランキング</span>
                            {/* 12211: Ranking list */}
                            <div className="flex flex-col items-start gap-[16px] w-full">
                                {/* 122111: Ranking item example */}
                                <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                    <div className="flex items-center gap-[16px]">
                                        <div className="flex flex-col items-center pb-[8px]">
                                            <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[24px] font-bold leading-[32px]">1</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                    <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 122112: Ranking item example */}
                                <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                    <div className="flex items-center gap-[16px]">
                                        <div className="flex flex-col items-center pb-[8px]">
                                            <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[20px] font-bold leading-[28px]">2</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                    <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 122113: Ranking item example */}
                                <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                    <div className="flex items-center gap-[16px]">
                                        <div className="flex flex-col items-center pb-[8px]">
                                            <span className="text-[#AB31D3] font-['Noto Sans JP'] text-[20px] font-bold leading-[28px]">3</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                    <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 122114: Ranking item example */}
                                <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                    <div className="flex items-center gap-[16px]">
                                        <div className="flex flex-col items-center pb-[8px]">
                                            <span className="text-[#222] font-['Noto Sans JP'] text-[18px] font-bold leading-[24px]">4</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                    <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 122115: Ranking item example */}
                                <div className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                    <div className="flex items-center gap-[16px]">
                                        <div className="flex flex-col items-center pb-[8px]">
                                            <span className="text-[#222] font-['Noto Sans JP'] text-[18px] font-bold leading-[24px]">5</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                                <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                    <img src={girl} alt="girl" className="w-[48px] h-[48px] rounded-full object-cover" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                                <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[24px]">anchiy1005</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            {/* Mobile Section 2 */}
            <section className="flex md:hidden flex-col items-center py-[24px] px-[16px] gap-[24px] bg-[#F6F8FA] mx-auto mt-21 ">
                <div className="flex flex-col items-start gap-[24px]">
                    {/* Left: 21 */}
                    <div className="flex items-start flex-shrink-0 ">
                        <img src={girl} alt="girl" className="w-[64px] h-[64px] rounded-full object-cover flex-shrink-0" />
                        {/* 211 */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span className="text-[#000] font-['Noto Sans JP'] text-[16px] font-bold leading-[18px]">anchiy1005</span>
                                <div className="flex pt-[10px] gap-[4px]">
                                    <img src={x} alt="x" className="w-[40px] h-[40px] opacity-100" />
                                    <img src={instagram} alt="instagram" className="w-[40px] h-[40px] opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: 22 */}
                    <div className="flex flex-col items-start flex-shrink-0 ">
                        <div className="flex flex-col items-start flex-shrink-0">
                            <span className="text-[#000] font-['Noto Sans JP'] text-[14px] font-normal leading-[21px]">
                                こんにちは！私はSUPERGT🏁の17号車のAstemoアンバサダーです。サッカーではSTVV⚽️の初代と2代目シントトロイデンガールズとしても活動しています。最近、日本レースクイーン大賞2023でメディバンネップリ賞を受賞しました🏆。これからも応援よろしくお願いします！
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetailsFree;