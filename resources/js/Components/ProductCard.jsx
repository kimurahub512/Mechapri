import React from 'react';
import { router } from '@inertiajs/react';
import girl from '@/assets/images/favoriteshops/girl.svg';
import question from '@/assets/images/question_cloud.svg';
import lock from '@/assets/images/lock.svg';
import bubble from '@/assets/images/bubble.svg';
import warning from '@/assets/images/warning.svg';
import { vwd, vw, responsiveText, responsiveTextD, responsivePosition, responsiveMetric, responsiveMetricD, responsivePositionD } from '@/lib/utils';


const ProductCard = ({ product, isMobile = false, haveAccount = false, rowCnt = 1 }) => {
    const handleClick = () => {
        // Determine which page to show based on product status
        const isPurchased = false; // This should come from your backend
        const isFree = product.price === '無料';
        
        if (isPurchased || isFree) {
            router.visit(`/purchasedproduct/${product.id}`);
        } else {
            router.visit(`/unpurchasedproduct/${product.id}`);
        }
    };
    console.log(product);
    if (isMobile) {
        return (
            <div 
                onClick={handleClick}
                className="flex w-[160px] p-[5.839px] flex-col items-start rounded-[5.839px] bg-white shadow-[0_2.236px_21.022px_0_rgba(0,0,0,0.10)] relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                {/* 212111: Image and Badge */}
                <div className="flex flex-col items-start h-[228.905px] pb-[45.945px] self-stretch relative">
                    {/* 2121111: Main Image */}
                    <div className={`flex h-[149.489px] max-w-[157.372px] px-[26.277px] py-[2.919px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[5.839px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                        {product.display_mode === 'normal' ? (
                            <img src={product.image} alt="product" className="object-cover" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                        ) : product.display_mode === 'gacha' ? (
                            <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }}>
                                <img src={product.image} alt="ガチャ" className="object-cover filter blur-[4px]" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                                <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px]" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                                <div className="flex flex-col items-center" style={{ ...responsivePosition(48, 11), gap: vw(5) }}>
                                    <img src={bubble} alt="bubble" style={{ ...responsiveMetric(24, 24)}} />
                                    <span style={{ ...responsiveText(8, 10, null, 'bold', 'noto', '#FFF') }}>ガチャ</span>
                                    <span style={{ ...responsiveText(6, 8, null, 'normal', 'noto', '#FFF') }}>ランダムで1枚選定されます</span>
                                </div>
                            </div>
                        ) : product.display_mode === 'blur' ? (
                            <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }}>
                                <img src={product.image} alt="ぼかしフィルター" className="object-cover filter blur-[4px]" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                                <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px]" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                                <div className="flex flex-col items-center" style={{ ...responsivePosition(48, 15), gap: vw(5) }}>
                                    <img src={question} alt="question" style={{ ...responsiveMetric(24, 24)}} />
                                    <span style={{ ...responsiveText(8, 10, null, 'bold', 'noto', '#FFF') }}>ぼかしフィルター</span>
                                    <span style={{ ...responsiveText(6, 8, null, 'normal', 'noto', '#FFF') }}>印刷して確認しよう！</span>
                                </div>
                            </div>
                        ) : product.display_mode === 'password' ? (
                            <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }}>
                                <div className="absolute top-0 left-0 bg-[#586B88]" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                                <div className="flex flex-col items-center" style={{ ...responsivePosition(48, 18), gap: vw(5) }}>
                                    <img src={lock} alt="lock" style={{ ...responsiveMetric(24, 24)}} />
                                    <span style={{ ...responsiveText(8, 10, null, 'bold', 'noto', '#CDD9EC') }}>パスワード</span>
                                    <span style={{ ...responsiveText(6, 8, null, 'normal', 'noto', '#CDD9EC') }}>PWを入れて印刷しよう</span>
                                </div>
                            </div>
                        ) : product.display_mode === 'cushion' ? (
                            <div className="flex relative overflow-hidden" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }}>
                                <div className="absolute top-0 left-0 bg-[#A0A5AC]" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                                <div className="flex flex-col items-center" style={{ ...responsivePosition(48, 14), gap: vw(5) }}>
                                    <img src={warning} alt="warning" style={{ ...responsiveMetric(24, 24)}} />
                                    <span style={{ ...responsiveText(8, 10, null, 'bold', 'noto', '#464F5D') }}>WARNING</span>
                                    <span style={{ ...responsiveText(6, 8, null, 'normal', 'noto', '#464F5D') }}>クリックして内容を確認</span>
                                </div>
                            </div>
                        ) : (
                            <img src={product.image} alt="product" className="object-cover" style={{ ...responsiveMetric(95.766, 143.65), borderRadius: vw(4) }} />
                        )}
                    </div>
                    {/* 2121112: Time duration badge */}
                    <div className={`flex w-[31.6px] p-[1.167px_4.884px_1.46px_2.919px] justify-center items-end gap-[-0.117px] absolute left-[2.201px] top-[2.336px] rounded-[8.759px] ${product.badge1?.includes('ヶ月') ? 'bg-[#E862CB]' : 'bg-[#FF2AA1]'}`}>
                        <span className="flex w-[12.18px] h-[11.67px] justify-center items-center text-white font-noto text-[7.6px] font-bold leading-[11.5px] whitespace-nowrap">{product.badge1}</span>
                        <span className="flex w-[11.8px] h-[8.75px] justify-center items-center text-white font-noto text-[5.8px] font-bold leading-[8.75px] whitespace-nowrap">{product.badge2}</span>
                    </div>
                    {/* 2121113: Info (absolute bottom) */}
                    <div className={`flex flex-col items-start ${haveAccount ? 'gap-[18.69px]' : 'gap-[18.69px]'} absolute left-[0.584px] bottom-[3.015px] rounded-b-[2.92px]`}>
                        {/* 21211131: Title and Badge */}
                        <div className="flex flex-col items-start gap-[4.672px]">
                            <span className="flex w-[143.65px] h-[18.686px] items-center text-[#363636] font-noto text-[10.511px] font-bold leading-[10.511px]">{product.title}</span>
                            {/* 212111311: Badge with images and text */}
                            <div className="flex px-[4.672px] py-[2.336px] items-center gap-[2.336px] rounded-[17.518px] bg-[#FF2AA1]">
                                {/* 2121113111: Images */}
                                <div className="flex items-center gap-[-4.088px]">
                                    {product.badges.map((img, i) => (
                                        <img key={i} src={img} alt={`badge${i + 1}`} className={`w-[12px] h-[12px] rounded-full${i > 0 ? ' -ml-[4px]' : ''}`} />
                                    ))}
                                </div>
                                <span className="text-white font-noto text-[7.591px] font-bold leading-[8.759px]">{product.badgeText}</span>
                            </div>
                        </div>
                        {/* 21211132: Price and Like */}
                        <div className="flex justify-between items-center self-stretch w-full ">
                            {/* 212111321: 無料 */}
                            <div className="flex w-[52.216px] flex-col items-start">
                                <span className="text-[#363636] font-noto text-[10.511px] font-bold leading-[10.511px] whitespace-nowrap">{product.price}</span>
                            </div>
                            {/* 212111322: Like and Count */}
                            <div className="flex w-[50.838px] h-[10.511px] pb-[0.584px] justify-end items-center gap-[3.504px]">
                                <div className="flex w-[10.511px] h-[10.511px]  justify-center items-center aspect-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <g clip-path="url(#clip0_667_29383)">
                                            <path d="M4.99037 2.83415C5.33367 1.74435 6.3128 1.21985 7.2697 1.21985C8.41382 1.21985 9.287 2.16597 9.287 3.30658C9.287 4.68434 8.52805 5.70198 7.74818 6.63743C6.99942 7.5321 4.99037 9.16145 4.99037 9.16145H4.96943C4.96943 9.16145 2.97056 7.5321 2.22241 6.63743C1.44253 5.70198 0.683594 4.68434 0.683594 3.30658C0.683594 2.14464 1.58848 1.21985 2.71103 1.21985C3.65716 1.21985 4.62614 1.74435 4.96943 2.83415H4.99037Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_667_29383">
                                                <rect width="9.92701" height="9.26521" fill="white" transform="translate(0.0218506 0.557861)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <span className="text-[#FE7878] font-noto text-[10.511px] font-bold leading-[10.511px] mt-[2px]">{product.like}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div 
            onClick={handleClick}
            className="flex w-[274px] p-[10px] flex-col items-start rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            {/* 212111: Image and Badge */}
            <div className="flex flex-col items-start self-stretch relative">
                {/* 2121111: Main Image */}
                                 <div className={`flex h-[256px] max-w-[269.5px] px-[45px] py-[5px] flex-col justify-center items-center flex-shrink-0 self-stretch rounded-[10px] bg-[#F6F6F6] ${product.display_mode !== 'normal' ? 'overflow-hidden' : ''}`}>
                     {product.display_mode === 'normal' ? (
                         <img src={product.image} alt="product" className="object-cover" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(4) }} />
                     ) : product.display_mode === 'gacha' ? (
                         <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12)}}>
                             <img src={product.image} alt="ガチャ" className="object-cover filter blur-[4px]" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(4) }} />
                             <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px]" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12) }} />
                             <div className="flex flex-col items-center" style={{ ...responsivePositionD(86, 25), gap: vwd(5) }}>
                                 <img src={bubble} alt="bubble" style={{ ...responsiveMetricD(42, 42)}} />
                                 <span style={{ ...responsiveTextD(12, 15, null, 'black', 'noto', '#FFF') }}>ガチャ</span>
                                 <span style={{ ...responsiveTextD(9.5, 13, null, 'normal', 'noto', '#FFF') }}>ランダムで1枚選定されます</span>
                             </div>
                         </div>
                     ) : product.display_mode === 'blur' ? (
                         <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12)}}>
                             <img src={product.image} alt="ぼかしフィルター" className="object-cover filter blur-[4px]" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(4) }} />
                             <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px]" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12) }} />
                             <div className="flex flex-col items-center" style={{ ...responsivePositionD(86, 40), gap: vwd(5) }}>
                                 <img src={question} alt="question" style={{ ...responsiveMetricD(42, 42)}} />
                                 <span style={{ ...responsiveTextD(12, 15, null, 'black', 'noto', '#FFF') }}>ぼかしフィルター</span>
                                 <span style={{ ...responsiveTextD(9.5, 13, null, 'normal', 'noto', '#FFF') }}>印刷して確認しよう！</span>
                             </div>
                         </div>
                     ) : product.display_mode === 'password' ? (
                         <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12)}}>
                             <div className="absolute top-0 left-0 bg-[#586B88]" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12) }} />
                             <div className="flex flex-col items-center" style={{ ...responsivePositionD(86, 32), gap: vwd(5) }}>
                                 <img src={lock} alt="lock" style={{ ...responsiveMetricD(42, 42)}} />
                                 <span style={{ ...responsiveTextD(12, 15, null, 'black', 'noto', '#CDD9EC') }}>パスワード</span>
                                 <span style={{ ...responsiveTextD(9.5, 13, null, 'normal', 'noto', '#CDD9EC') }}>PWを入れて印刷しよう</span>
                             </div>
                         </div>
                     ) : product.display_mode === 'cushion' ? (
                         <div className="flex relative overflow-hidden" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12)}}>
                             <div className="absolute top-0 left-0 bg-[#A0A5AC]" style={{ ...responsiveMetricD(164, 246), borderRadius: vwd(12) }} />
                             <div className="flex flex-col items-center" style={{ ...responsivePositionD(86, 28), gap: vwd(5) }}>
                                 <img src={warning} alt="warning" style={{ ...responsiveMetricD(42, 42)}} />
                                 <span style={{ ...responsiveTextD(12, 15, null, 'black', 'noto', '#464F5D') }}>WARNING</span>
                                 <span style={{ ...responsiveTextD(9.5, 13, null, 'normal', 'noto', '#464F5D') }}>クリックして内容を確認</span>
                             </div>
                    </div>
                     ) : (
                        <img src={product.image} alt="product" className="w-[164px] h-[246px] flex-shrink-0 aspect-[2/3] object-cover" />
                     )}
                 </div>
                {/* 2121112: Time duration badge */}
                <div className={`flex flex-row py-[2px] px-[8.363px] justify-center items-end gap-[2px] absolute left-[3.77px] top-[4px] rounded-[15px] ${product.badge1?.includes('ヶ月') ? 'bg-[#E862CB]' : 'bg-[#FF2AA1]'}`}>
                    <span className="flex justify-center items-center text-white font-noto text-[13px] font-bold leading-[19.5px] whitespace-nowrap" style={{ ...responsiveTextD(13, 19.5, null, 'bold', 'noto', '#fff') }}>{product.badge1}</span>
                    <span className="flex justify-center items-center text-white font-noto text-[10px] font-bold leading-[15px] whitespace-nowrap" style={{ ...responsiveTextD(10, 15, null, 'bold', 'noto', '#fff') }}>{product.badge2}</span>
                    </div>
                    {/* 2121113: Info (absolute bottom) */}
                    <div className={`flex flex-col items-start ${haveAccount ? 'gap-[16px] pt-[8px]' : 'gap-[32px]'} rounded-b-[5px]`}>
                        
                        {/* 21211131: Title and Badge */}
                        <div className="flex flex-col items-start gap-[8px]">
                            {haveAccount && (
                                <div className="flex flex-row items-start gap-[5px] mb-[-8px]">
                                    <img src={girl} alt="girl" className="w-[24px] h-[24px] rounded-full" />
                                    <span className="flex items-center text-[#222] font-noto text-[16px] font-normal leading-[22px]">アカウント</span>
                                </div>
                            )}
                            <span className="flex w-[246px] h-[32px] items-center text-[#363636] font-noto text-[18px] font-bold leading-[18px]">{product.title}</span>
                            
                            {/* 212111311: Badge with images and text */}
                            <div className="flex px-[8px] py-[4px] items-center gap-[4px] rounded-[30px] bg-[#FF2AA1]">
                                {/* 2121113111: Images */}
                                <div className="flex items-center">
                                    {product.badges.map((img, i) => (
                                        <img key={i} src={img} alt={`badge${i + 1}`} className={`w-[24px] h-[24px] rounded-full${i > 0 ? ' -ml-[7px]' : ''}`} />
                                    ))}
                                </div>
                                <span className="text-white font-noto text-[13px] font-bold leading-[15px]">{product.badgeText}</span>
                            </div>
                        </div>
                        {/* 21211132: Price and Like */}
                        <div className="flex justify-between items-center self-stretch w-full ">
                            {/* 212111321: 無料 */}
                            <div className="flex w-[89.42px] flex-col items-start">
                                <span className="text-[#363636] font-noto text-[18px] font-bold leading-[18px] whitespace-nowrap">{product.price}</span>
                            </div>
                            {/* 212111322: Like and Count */}
                            <div className="flex w-[87.06px] h-[18px] pb-[1px] justify-end items-center gap-[6px]">
                                <div className="flex w-[18px] h-[18px] p-[1.5px_0.5px_0.633px_0.5px] justify-center items-center aspect-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                                        <g clip-path="url(#clip0_667_27039)">
                                            <path d="M9.00869 3.89778C9.5966 2.03151 11.2734 1.1333 12.912 1.1333C14.8713 1.1333 16.3667 2.75353 16.3667 4.70683C16.3667 7.06624 15.067 8.80895 13.7314 10.4109C12.4492 11.943 9.00869 14.7333 9.00869 14.7333H8.97283C8.97283 14.7333 5.54976 11.943 4.26856 10.4109C2.93302 8.80895 1.63333 7.06624 1.63333 4.70683C1.63333 2.717 3.18295 1.1333 5.10531 1.1333C6.72556 1.1333 8.38494 2.03151 8.97283 3.89778H9.00869Z" fill="#FE7878" stroke="#FE7878" stroke-width="1.13333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_667_27039">
                                                <rect width="17" height="15.8667" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <span className="text-[#FE7878] font-noto text-[18px] font-bold leading-[18px] mt-[4px]">{product.like}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ProductCard; 