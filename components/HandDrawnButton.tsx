
import React from 'react';
import { RADIUS, COLORS } from '../constants.tsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

const HandDrawnButton: React.FC<Props> = ({ variant = 'primary', children, className, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return `bg-[#ff4d4d] text-white hover:bg-[#ff4d4d]/90`;
      case 'secondary':
        return `bg-[#e5e0d8] text-[#2d2d2d] hover:bg-[#2d5da1] hover:text-white`;
      default:
        return `bg-white text-[#2d2d2d] hover:bg-[#ff4d4d] hover:text-white`;
    }
  };

  return (
    <button
      {...props}
      style={{ borderRadius: RADIUS.wobblyButton }}
      className={`
        wobbly-border hard-shadow active-press
        px-6 py-2 text-xl transition-all duration-100
        ${getVariantStyles()}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default HandDrawnButton;
