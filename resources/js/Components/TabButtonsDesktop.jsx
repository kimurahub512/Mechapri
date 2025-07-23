import React from 'react';

const TabButtonsDesktop = ({ activeTab, setActiveTab, tabs, className = "" }) => {
    return (
        <div className={`flex p-[8px_12px] justify-center items-start gap-[20px] rounded-[66px] bg-[#F6F6F6] mx-auto ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`flex w-[240px] h-[48px] px-[24px] justify-center items-center rounded-[70px] transition-all duration-150 ${
                        activeTab === tab.id
                            ? 'bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.25)] text-[#FF2AA1] font-bold'
                            : 'text-[#767676] font-medium'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                >
                    <span className={`font-noto ${tab.textSize || 'text-[14px] leading-[24px]'} ${tab.whitespace || ''}`}>
                        {tab.label}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default TabButtonsDesktop; 