
import React from 'react';
import { RADIUS, COLORS } from '../constants.tsx';

interface Props {
  children: React.ReactNode;
  decoration?: 'tape' | 'tack' | 'none';
  variant?: 'white' | 'post-it';
  className?: string;
  tilt?: number;
}

const HandDrawnCard: React.FC<Props> = ({ 
  children, 
  decoration = 'none', 
  variant = 'white', 
  className = '',
  tilt = 0 
}) => {
  const bg = variant === 'post-it' ? COLORS.postIt : 'white';
  
  return (
    <div 
      className={`relative p-8 wobbly-border hard-shadow ${className}`}
      style={{ 
        borderRadius: RADIUS.wobblyMd, 
        backgroundColor: bg,
        transform: `rotate(${tilt}deg)`
      }}
    >
      {decoration === 'tape' && (
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#2d2d2d]/10 mix-blend-multiply rotate-2"
          style={{ borderRadius: '2px' }}
        />
      )}
      {decoration === 'tack' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#ff4d4d] border-2 border-[#2d2d2d] shadow-sm" />
      )}
      {children}
    </div>
  );
};

export default HandDrawnCard;
