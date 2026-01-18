
import React from 'react';
import { RADIUS } from '../constants';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  isTextArea?: boolean;
}

const HandDrawnInput: React.FC<Props> = ({ label, isTextArea, className, ...props }) => {
  const Component = isTextArea ? 'textarea' : 'input';
  
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xl font-bold ml-2">{label}</label>}
      <Component
        {...(props as any)}
        className={`
          wobbly-border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#2d5da1]/20 focus:border-[#2d5da1]
          placeholder:text-[#2d2d2d]/40
          ${className}
        `}
        style={{ borderRadius: RADIUS.wobbly }}
      />
    </div>
  );
};

export default HandDrawnInput;
