import React from 'react';
import sub from '@/assets/images/sub.svg';
import add from '@/assets/images/add.svg';

const QuantityControl = ({ 
  quantity = 1,
  onQuantityChange,
  addIcon = add,
  subIcon = sub,
  unit = "枚",
  className = ""
}) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className={`flex p-[0px_4px] justify-center items-center gap-[8px] rounded-[40px] border border-[#E9E9E9] bg-white ${className}`}>
      {/* Sub SVG */}
      <img 
        src={subIcon} 
        alt="sub" 
        className="w-[32px] h-[32px] flex-shrink-0 opacity-100 cursor-pointer" 
        onClick={() => handleQuantityChange(quantity - 1)}
      />
      {/* Number input */}
      <div className="flex items-center gap-[4px]">
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-[44px] text-[#222] text-center font-['Red Hat Display'] font-bold text-[16px] leading-[23px] border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-[#222] font-noto font-bold text-[14px] leading-[14px]">{unit}</span>
      </div>
      {/* Add SVG */}
      <img 
        src={addIcon} 
        alt="add" 
        className="w-[32px] h-[32px] flex-shrink-0 opacity-100 cursor-pointer" 
        onClick={() => handleQuantityChange(quantity + 1)}
      />
    </div>
  );
};

export default QuantityControl; 