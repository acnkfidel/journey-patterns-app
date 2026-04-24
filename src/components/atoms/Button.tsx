import type { ReactNode, MouseEventHandler } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  children:   ReactNode;
  onClick?:   MouseEventHandler<HTMLButtonElement>;
  disabled?:  boolean;
  type?:      'button' | 'submit' | 'reset';
  className?: string;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:   'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm',
  ghost:     'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  danger:    'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  success:   'bg-green-600 hover:bg-green-700 text-white shadow-sm',
  warning:   'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-2.5 text-base rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_CLASS[variant]}
        ${SIZE_CLASS[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
