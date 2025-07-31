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