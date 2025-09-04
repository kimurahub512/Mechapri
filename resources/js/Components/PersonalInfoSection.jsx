import React from 'react';
import { router } from '@inertiajs/react';
import x from '@/assets/images/x_logo.svg';
import default_user from '@/assets/images/default-user.png';

const PersonalInfoSection = ({ user, defaultUserImage = default_user }) => {
    const handleXClick = () => {
        // Navigate to the user's X (Twitter) profile
        // Following the same pattern as ShopTop page
        if (user.xlink) {
            window.open(`https://x.com/${user.xlink}`, '_blank');
        }
    };

    return (
        <>
            {/* Desktop Personal Info Section */}
            <section className="hidden md:flex flex-col items-center py-[48px] px-[96px] w-full bg-[#F6F8FA]">
                <div className="flex justify-between items-start w-full">
                    {/* Left: User Info */}
                    <div className="flex items-start flex-shrink-0">
                        <div
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => router.visit(`/${user.id}`)}
                        >
                            <img 
                                src={user.image || defaultUserImage} 
                                alt={user.name} 
                                className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0" 
                            />
                        </div>
                        {/* User Details */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span
                                    className="text-[#000] font-noto text-[21px] font-bold leading-[32px] cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => router.visit(`/${user.id}`)}
                                >
                                    {user.name}
                                </span>
                                <div className="flex pt-[10px] gap-[4px]">
                                    {user.xlink && (
                                        <img 
                                            src={x} 
                                            alt="x" 
                                            className="w-[46.429px] h-[46.429px] opacity-100 cursor-pointer hover:opacity-80 transition-opacity" 
                                            onClick={handleXClick}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: Description */}
                    <div className="flex flex-col w-[55%] items-start flex-shrink-0">
                        <span className="text-[#000] font-noto text-[16px] font-normal leading-[27.2px]">
                            {user.description}
                        </span>
                    </div>
                </div>
            </section>

            {/* Mobile Personal Info Section */}
            <section className="flex md:hidden flex-col items-start py-[24px] px-[16px] gap-[24px] bg-[#F6F8FA] w-full">
                <div className="flex flex-col items-start gap-[24px]">
                    {/* Left: User Info */}
                    <div className="flex items-start flex-shrink-0">
                        <div
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => router.visit(`/${user.id}`)}
                        >
                            <img 
                                src={user.image || defaultUserImage} 
                                alt={user.name} 
                                className="w-[64px] h-[64px] rounded-full object-cover flex-shrink-0" 
                            />
                        </div>
                        {/* User Details */}
                        <div className="flex flex-col pl-[16px] items-start">
                            <div className="flex flex-col items-start gap-[12px]">
                                <span
                                    className="text-[#000] font-noto text-[16px] font-bold leading-[18px] cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => router.visit(`/${user.id}`)}
                                >
                                    {user.name}
                                </span>
                                <div className="flex gap-[4px]">
                                    {user.xlink && (
                                        <img 
                                            src={x} 
                                            alt="x" 
                                            className="w-[40px] h-[40px] opacity-100 cursor-pointer hover:opacity-80 transition-opacity" 
                                            onClick={handleXClick}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right: Description */}
                    <div className="flex flex-col items-start flex-shrink-0">
                        <div className="flex flex-col items-start flex-shrink-0">
                            <span className="text-[#000] font-noto text-[14px] font-normal leading-[21px]">
                                {user.description}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PersonalInfoSection;
