import React from 'react';

const BadgeDisplay = ({ 
  images = [], 
  text = "10点を全て表示", 
  buttonClassName = "",
  textClassName = "",
  width = "24px",
  height = "24px"
}) => {
  return (
    <div className={`flex items-center ${buttonClassName}`}>
      {/* Images */}
      <div className="flex items-center">
        {images.map((image, index) => (
          <img 
            key={index}
            src={image.src} 
            alt={image.alt || `badge${index + 1}`} 
            className={`w-[${width}] h-[${height}] rounded-full ${index > 0 ? '-ml-[7px]' : ''}`}
          />
        ))}
      </div>
      <span 
        className={`font-['Noto Sans JP'] ${textClassName}`}
      >
        {text}
      </span>
    </div>
  );
};

export default BadgeDisplay; 