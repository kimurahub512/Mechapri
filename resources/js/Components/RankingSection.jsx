import React from 'react';
import default_user from '@/assets/images/default-user.png';
import { vw, vwd, responsiveText, responsiveTextD } from '@/lib/utils';

const RankingSection = ({ topBuyers, isMobile = false }) => {
    if (!topBuyers || topBuyers.length === 0) {
        return null;
    }

    if (isMobile) {
        return (
            <div className="flex flex-col items-start w-full px-[16px] py-[24px] gap-[8px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
                {/* Mobile Ranking Title */}
                <div className="flex flex-col items-start gap-[12px] w-full">
                    <span className="text-[#000] font-noto text-[18px] font-bold leading-[24px]">ランキング</span>
                    {/* Mobile Ranking List */}
                    <div className="flex flex-col items-start gap-[16px] w-full">
                        {topBuyers.map((buyer, index) => (
                            <div key={index} className="flex w-full pb-[12px] justify-between items-center border-b border-[#D1D1D1]">
                                <div className="flex items-center gap-[16px]">
                                    <div className="flex flex-col items-center pb-[8px]">
                                        <span className={`font-noto font-bold ${index === 0 ? 'text-[24px] leading-[32px] text-[#AB31D3]' : index <= 2 ? 'text-[20px] leading-[28px] text-[#AB31D3]' : 'text-[18px] leading-[24px] text-[#222]'}`}>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex flex-col items-start pr-[12px] w-[60px] h-[50px] min-w-[48px] min-h-[36px]">
                                            <div className="flex w-[48px] h-[48px] justify-center items-center flex-shrink-0">
                                                <img 
                                                    src={buyer.user.image || default_user} 
                                                    alt={buyer.user.name} 
                                                    className="w-[48px] h-[48px] rounded-full object-cover" 
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start w-[120px] pr-[40px]">
                                            <span className="text-[#000] font-noto text-[14px] font-bold leading-[18px] whitespace-nowrap">
                                                {buyer.user.name}
                                            </span>
                                            <span className="text-[#000] font-noto text-[12px] font-normal leading-[16px] whitespace-nowrap">
                                                {buyer.total_quantity}枚
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="flex flex-col items-end">
                                    <span className="text-[#000] font-noto text-[14px] font-bold leading-[18px]">
                                        PT {buyer.pt_score || 0}
                                    </span>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div className="flex flex-col items-start w-full px-[40px] py-[40px] gap-[8px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]">
            {/* Desktop Ranking Title */}
            <div className="flex flex-col items-start gap-[16px] w-full">
                <span className="text-[#000] font-noto text-[24px] font-bold leading-[37.8px] tracking-[1.05px]">ランキング</span>
                {/* Desktop Ranking List */}
                <div className="flex flex-col items-start gap-[24px] w-full">
                    {topBuyers.map((buyer, index) => (
                        <div key={index} className="flex w-[784px] pb-[16px] justify-between items-center border-b border-[#D1D1D1]">
                            <div className="flex items-center gap-[24px]">
                                <div className="flex flex-col items-center pb-[12px]">
                                    <span className={`font-noto font-bold ${index === 0 ? 'text-[36px] leading-[54px]' : index <= 2 ? 'text-[28px] leading-[42px]' : 'text-[24px] leading-[24px]'} ${index <= 2 ? 'text-[#AB31D3]' : 'text-[#222]'}`}>
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-start pr-[16px] w-[82px] h-[66px] min-w-[64px] min-h-[48px]">
                                        <div className="flex w-[64px] h-[64px] justify-center items-center flex-shrink-0">
                                            <img 
                                                src={buyer.user.image || default_user} 
                                                alt={buyer.user.name} 
                                                className="w-[64px] h-[64px] rounded-full object-cover" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start w-[158px] pr-[62px]">
                                        <span className="text-[#000] font-noto text-[18px] font-bold leading-[24px] whitespace-nowrap">
                                            {buyer.user.name}
                                        </span>
                                        <span className="text-[#000] font-noto text-[14px] font-normal leading-[20px] whitespace-nowrap">
                                            {buyer.total_quantity}枚
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col items-end">
                                <span className="text-[#000] font-noto text-[18px] font-bold leading-[24px]">
                                    PT {buyer.pt_score || 0}
                                </span>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RankingSection;


