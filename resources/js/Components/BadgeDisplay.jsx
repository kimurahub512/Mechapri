import React from 'react';
import bubble from '@/assets/images/bubble.svg';
import question from '@/assets/images/question_cloud.svg';
import lock from '@/assets/images/lock.svg';
import warning from '@/assets/images/warning.svg';

const BadgeDisplay = ({ 
  images = [], 
  text = "10点を全て表示", 
  buttonClassName = "",
  textClassName = "",
  width = "24px",
  height = "24px",
  displayMode = "normal",
  isUnlocked = false,
  onClick
}) => {
  const renderBadgeImage = (image, index) => {
    const imageStyle = {
      width: width,
      height: height,
    };

    if (displayMode === 'normal') {
      return (
        <img 
          key={index}
          src={image.src} 
          alt={image.alt || `badge${index + 1}`} 
          style={imageStyle}
          className={`rounded-full object-cover ${index > 0 ? '-ml-[7px]' : ''}`}
        />
      );
    }

    if (displayMode === 'cushion') {
      return (
        <div 
          key={index}
          style={imageStyle}
          className={`rounded-full bg-gray-400 ${index > 0 ? '-ml-[7px]' : ''}`}
        />
      );
    }

    if (displayMode === 'gacha') {
      return (
        <div 
          key={index}
          style={imageStyle}
          className={`rounded-full bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] flex items-center justify-center ${index > 0 ? '-ml-[7px]' : ''}`}
        >
          <img src={bubble} alt="bubble" className="w-3 h-3" />
        </div>
      );
    }

    if (displayMode === 'blur') {
      return (
        <img 
          key={index}
          src={image.src} 
          alt={image.alt || `badge${index + 1}`} 
          style={imageStyle}
          className={`rounded-full object-cover filter blur-[2px] ${index > 0 ? '-ml-[7px]' : ''}`}
        />
      );
    }

    if (displayMode === 'password') {
      if (isUnlocked) {
        return (
          <img 
            key={index}
            src={image.src} 
            alt={image.alt || `badge${index + 1}`} 
            style={imageStyle}
            className={`rounded-full object-cover ${index > 0 ? '-ml-[7px]' : ''}`}
          />
        );
      } else {
        return (
          <div 
            key={index}
            style={imageStyle}
            className={`rounded-full bg-[#586B88] flex items-center justify-center ${index > 0 ? '-ml-[7px]' : ''}`}
          >
            <img src={lock} alt="lock" className="w-3 h-3" />
          </div>
        );
      }
    }

    // Default fallback
    return (
      <img 
        key={index}
        src={image.src} 
        alt={image.alt || `badge${index + 1}`} 
        style={imageStyle}
        className={`rounded-full object-cover ${index > 0 ? '-ml-[7px]' : ''}`}
      />
    );
  };

  return (
    <button 
      type="button"
      onClick={onClick}
      className={`flex items-center ${buttonClassName}`}>
      {/* Images */}
      <div className="flex items-center">
        {images.map((image, index) => renderBadgeImage(image, index))}
      </div>
      <span 
        className={`font-noto ${textClassName}`}
      >
        {text}
      </span>
    </button>
  );
};

export default BadgeDisplay; 