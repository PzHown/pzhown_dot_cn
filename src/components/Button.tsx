import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const buttonDefalutClass = `px-4 py-2 rounded-xl  border border-black/20 font-bold
  backdrop-filter backdrop-blur-xl backdrop-saturate-200 backdrop-contrast-200
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/0 focus:ring-indigo-300/40
  `;


const BaseButton: React.FC<ButtonProps> = ({ onClick, disabled, className, style, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonDefalutClass} ${className}`}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const baseButtonClass = `text-indigo-900/90 bg-white/70`;
const Button: React.FC<ButtonProps> = ({ onClick, disabled, className, style, children }) => {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className={`${baseButtonClass} ${className}`}
      style={style}
    >
      {children}
    </BaseButton>
  );
}

const primaryButtonClass = `text-white/90 bg-indigo-600/60 border`;
const PrimaryButton: React.FC<ButtonProps> = ({ onClick, disabled, className, style, children }) => {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className={`${primaryButtonClass} ${className}`}
      style={style}
    >
      {children}
    </BaseButton>
  );
};

export {Button, PrimaryButton};