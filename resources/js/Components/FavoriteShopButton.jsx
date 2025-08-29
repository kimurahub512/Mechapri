import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import favoriteshop from '@/assets/images/favoriteshop.svg';
import favoriteshop_white from '@/assets/images/favoriteshop_white.svg';
import { vw, vwd, responsiveText, responsiveTextD } from '@/lib/utils';

const FavoriteShopButton = ({ shopUserId, initialIsFavorited = false, isMobile = false, refreshOnToggle = true, disable = false }) => {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFavorite = async () => {
        if (isLoading || disable) return;
        
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/favorite-shops/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    shop_user_id: shopUserId
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setIsFavorited(data.isFavorited);
                // Only refresh if refreshOnToggle is true
                if (refreshOnToggle) {
                    router.reload();
                }
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={toggleFavorite}
            disabled={isLoading || disable}
            className={`flex items-center rounded-[40px] border border-[#FF2AA1] ${isFavorited ? 'bg-[#FF2AA1]' : 'bg-white'}`}
            style={{ 
                gap: isMobile ? vw(8) : vwd(8), 
                paddingLeft: isMobile ? vw(16) : vwd(16), 
                paddingRight: isMobile ? vw(16) : vwd(16), 
                paddingTop: isMobile ? vw(7) : vwd(7), 
                paddingBottom: isMobile ? vw(7) : vwd(7),
                opacity: isLoading ? 0.6 : 1
            }}
        >
            <img 
                src={isFavorited ? favoriteshop_white : favoriteshop} 
                alt="favoriteshop" 
                className="aspect-square opacity-100" 
                style={{ width: isMobile ? vw(20) : vwd(20), height: isMobile ? vw(20) : vwd(20) }} 
            />
            <span style={isMobile ? 
                { ...responsiveText(14, 14, null, 'medium', 'noto', isFavorited ? '#FFFFFF' : '#FF2AA1') } : 
                { ...responsiveTextD(14, 14, null, 'medium', 'noto', isFavorited ? '#FFFFFF' : '#FF2AA1') }
            }>
                {isFavorited ? 'フォロー中' : 'ショップをフォロー'}
            </span>
        </button>
    );
};

export default FavoriteShopButton;