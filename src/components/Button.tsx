import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  /**
   * The type of the button
   * @default 'base'
   */
  type?: 'base' | 'primary' | 'danger' | 'warning' | 'success' | 'info';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const buttonDefalutClass = `px-4 py-2 rounded-lg text-black/60 bg-white/70 border border-gray-300 font-medium
  backdrop-filter backdrop-blur-md
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500
  `;

const Button: React.FC<ButtonProps> = ({ onClick, type = 'base', disabled, className, style, children }) => {
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

export default Button;