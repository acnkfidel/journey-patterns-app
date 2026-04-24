import type { ChangeEventHandler } from 'react';

export type FocusColor = 'indigo' | 'blue' | 'green' | 'amber';

interface InputProps {
  id?:          string;
  type?:        string;
  placeholder?: string;
  value?:       string;
  onChange?:    ChangeEventHandler<HTMLInputElement>;
  readOnly?:    boolean;
  focusColor?:  FocusColor;
  className?:   string;
}

const RING_CLASS: Record<FocusColor, string> = {
  indigo: 'focus:ring-indigo-400',
  blue:   'focus:ring-blue-400',
  green:  'focus:ring-green-400',
  amber:  'focus:ring-amber-400',
};

export default function Input({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  readOnly = false,
  focusColor = 'indigo',
  className = '',
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`
        w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg
        focus:outline-none focus:ring-2 focus:border-transparent
        placeholder-gray-300 transition-shadow
        ${RING_CLASS[focusColor]}
        ${readOnly ? 'cursor-default' : ''}
        ${className}
      `}
    />
  );
}
