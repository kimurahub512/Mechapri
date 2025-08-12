import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from 'react'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function for viewport-based calculations
export const vw = (value) => `calc(100vw * (${value}/375))`;

export const vwd = (value) => `calc(100vw * (${value}/1440))`;

// Responsive viewport function that automatically chooses vw or vwd based on screen size
export const vwR = (vwValue = 0, vwdValue = 0) => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768 ? vw(vwValue) : vwd(vwdValue);
  }
  return vw(vwValue); // Default to mobile for SSR
};


export const responsiveMetricR = (vwWidth = null, vwHeight = null, vwdWidth = null, vwdHeight = null) => {
  const style = {
  };
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      if (vwWidth === 'full') style.width = '100%';
      if (vwWidth !== null && vwWidth !== 'full') style.width = vw(vwWidth);
      if (vwHeight === 'full') style.height = '100%';
      if (vwHeight !== null && vwHeight !== 'full') style.height = vw(vwHeight);
    } else {
      if (vwdWidth === 'full') style.width = '100%';
      if (vwdWidth !== null && vwdWidth !== 'full') style.width = vwd(vwdWidth);
      if (vwdHeight === 'full') style.height = '100%';
      if (vwdHeight !== null && vwdHeight !== 'full') style.height = vwd(vwdHeight);
    }
  }

  return style;
};

export const responsiveTextR = (fontSize, lineHeight, fontWeight = 'bold', fontSizeD, lineHeightD, fontWeightD = 'bold', fontFamily = 'noto', color = null) => {
  const style = {
  };

  // Map font weight values to valid CSS values
  const fontWeightMap = {
    'normal': 400,
    'bold': 700,
    'black': 900,
    'light': 300,
    'medium': 500,
    'semibold': 600
  };

  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      style.fontSize = vw(fontSize);
      style.lineHeight = vw(lineHeight);
      if (fontWeight && fontWeightMap[fontWeight]) {
        style.fontWeight = fontWeightMap[fontWeight];
      } else if (fontWeight) {
        style.fontWeight = fontWeight;
      }
    } else {
      style.fontSize = vwd(fontSizeD);
      style.lineHeight = vwd(lineHeightD);
      if (fontWeightD && fontWeightMap[fontWeightD]) {
        style.fontWeight = fontWeightMap[fontWeightD];
      } else if (fontWeightD) {
        style.fontWeight = fontWeightD;
      }
    }
  } 

  // Map font family names to actual CSS values
  const fontFamilyMap = {
    'noto': '"Noto Sans JP", sans-serif',
    'mplus': '"M PLUS 1p", sans-serif',
    'general': '"General Sans", sans-serif'
  };

  if (fontFamily && fontFamilyMap[fontFamily]) {
    style.fontFamily = fontFamilyMap[fontFamily];
  }

  if (color !== null) {
    style.color = color;
  }

  return style;
};

export const responsivePositionR = (vwTop = null, vwBottom = null, vwLeft = null, vwRight = null, vwdTop = null, vwdBottom = null, vwdLeft = null, vwdRight = null) => {
  const style = {
    position: 'absolute'
  };

  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) {
      if (vwTop !== null) style.top = vw(vwTop);
      if (vwBottom !== null) style.bottom = vw(vwBottom);
      if (vwLeft !== null) style.left = vw(vwLeft);
      if (vwRight !== null) style.right = vw(vwRight);
    } else {
      if (vwdTop !== null) style.top = vwd(vwdTop);
      if (vwdBottom !== null) style.bottom = vwd(vwdBottom);
      if (vwdLeft !== null) style.left = vwd(vwdLeft);
      if (vwdRight !== null) style.right = vwd(vwdRight);
    }
  }

  return style;
};
// React hook for responsive viewport calculations
export const useVwResponsive = (vwValue = 0, vwdValue = 0) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (value) => isMobile ? vw(value) : vwd(value);
};


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
    lineHeight: vw(lineHeight)
  };

  // Map font weight values to valid CSS values
  const fontWeightMap = {
    'normal': 400,
    'bold': 700,
    'black': 900,
    'light': 300,
    'medium': 500,
    'semibold': 600
  };

  if (fontWeight && fontWeightMap[fontWeight]) {
    style.fontWeight = fontWeightMap[fontWeight];
  } else if (fontWeight) {
    style.fontWeight = fontWeight;
  }

  if (letterSpacing) {
    style.letterSpacing = vw(letterSpacing);
  }

  // Map font family names to actual CSS values
  const fontFamilyMap = {
    'noto': '"Noto Sans JP", sans-serif',
    'mplus': '"M PLUS 1p", sans-serif',
    'general': '"General Sans", sans-serif'
  };

  if (fontFamily && fontFamilyMap[fontFamily]) {
    style.fontFamily = fontFamilyMap[fontFamily];
  }

  if (color !== null) {
    style.color = color;
  }

  return style;
};

export const responsiveTextD = (fontSize, lineHeight, letterSpacing = null, fontWeight = 'bold', fontFamily = 'noto', color = null) => {
  const style = {
    fontSize: vwd(fontSize),
    lineHeight: vwd(lineHeight)
  };

  // Map font weight values to valid CSS values
  const fontWeightMap = {
    'normal': 400,
    'bold': 700,
    'black': 900,
    'light': 300,
    'medium': 500,
    'semibold': 600
  };

  if (fontWeight && fontWeightMap[fontWeight]) {
    style.fontWeight = fontWeightMap[fontWeight];
  } else if (fontWeight) {
    style.fontWeight = fontWeight;
  }

  if (letterSpacing) {
    style.letterSpacing = vwd(letterSpacing);
  }

  // Map font family names to actual CSS values
  const fontFamilyMap = {
    'noto': '"Noto Sans JP", sans-serif',
    'mplus': '"M PLUS 1p", sans-serif',
    'general': '"General Sans", sans-serif'
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

export const responsivePositionD = (top, left = null, right = null) => {
  const style = {
    position: 'absolute'
  };

  if (top !== null) style.top = vwd(top);
  if (left !== null) style.left = vwd(left);
  if (right !== null) style.right = vwd(right);
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


export const responsiveMetricD = (width = null, height = null) => {
  const style = {
  };

  if (width === 'full') style.width = '100%';
  if (width !== null && width !== 'full') style.width = vwd(width);
  if (height === 'full') style.height = '100%';
  if (height !== null && height !== 'full') style.height = vwd(height);

  return style;
}; 