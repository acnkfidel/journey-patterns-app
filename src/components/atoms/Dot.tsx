import type { JourneyKey } from '../../types/journey';

export type DotColor = JourneyKey | 'violet' | 'sky' | 'amber' | 'emerald' | 'gray';
type DotSize  = 'xs' | 'sm' | 'md' | 'lg';

interface DotProps {
  journey?: JourneyKey;
  color?: DotColor;
  size?: DotSize;
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  guest:   'bg-blue-400',
  member:  'bg-green-400',
  admin:   'bg-red-400',
  violet:  'bg-violet-500',
  sky:     'bg-sky-500',
  amber:   'bg-amber-500',
  emerald: 'bg-emerald-500',
  gray:    'bg-gray-400',
};

const SIZE_MAP: Record<DotSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

export default function Dot({ journey, color, size = 'sm', className = '' }: DotProps) {
  const colorClass = COLOR_MAP[journey ?? color ?? 'gray'] ?? 'bg-gray-400';
  const sizeClass  = SIZE_MAP[size];
  return (
    <span className={`rounded-full flex-shrink-0 inline-block ${sizeClass} ${colorClass} ${className}`} />
  );
}
