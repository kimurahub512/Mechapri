import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function for viewport-based calculations
export const vw = (value) => `calc(100vw * (${value}/375))`;

export const vwd = (value) => `calc(100vw * (${value}/1440))`;

// Alternative function for different base viewport widths
export const vwCustom = (value, baseWidth = 375) => `calc(100vw * (${value}/${baseWidth}))`;

// Utility function for responsive font sizes
export const responsiveFontSize = (mobileSize, desktopSize, breakpoint = 768) => {
  return `clamp(${mobileSize}px, ${mobileSize + (desktopSize - mobileSize) * 0.1}vw, ${desktopSize}px)`;
};

// Utility function for responsive spacing
export const responsiveSpacing = (mobileSpacing, desktopSpacing) => {
  return `clamp(${mobileSpacing}px, ${mobileSpacing + (desktopSpacing - mobileSpacing) * 0.1}vw, ${desktopSpacing}px)`;
};

// Responsive text helper function
export const responsiveText = (fontSize, lineHeight, letterSpacing = null, fontWeight = 'bold', fontFamily = 'noto', color = null) => {
  const style = {
    fontSize: vw(fontSize),
    lineHeight: vw(lineHeight),
    fontWeight
  };
  
  if (letterSpacing) {
    style.letterSpacing = vw(letterSpacing);
  }
  
  // Map font family names to actual CSS values
  const fontFamilyMap = {
    'noto': 'Noto Sans JP, sans-serif',
    'mplus': 'M PLUS 1p, sans-serif',
    'general': 'General Sans, sans-serif'
  };
  
  if (fontFamily && fontFamilyMap[fontFamily]) {
    style.fontFamily = fontFamilyMap[fontFamily];
  }
  
  if (color !== null) {
    style.color = color;
  }
  
  return style;
};

// Responsive absolute positioning helper function
export const responsivePosition = (top, left = null, right = null) => {
  const style = {
    position: 'absolute'
  };
  
  if (top !== null) style.top = vw(top);
  if (left !== null) style.left = vw(left);
  if (right !== null) style.right = vw(right);
  return style;
}; 


// Responsive metric helper function
export const responsiveMetric = (width = null, height = null) => {
  const style = {
  };
  
  if (width === 'full') style.width = '100%';
  if (width !== null && width !== 'full') style.width = vw(width);
  if (height === 'full') style.height = '100%';
  if (height !== null && height !== 'full') style.height = vw(height);

  return style;
}; 