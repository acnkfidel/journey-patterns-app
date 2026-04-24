import type { ReactNode } from 'react';
import type { JourneyKey, PatternNumber } from '../../types/journey';
import Dot from './Dot';

interface BadgeProps {
  journey?: JourneyKey;
  pattern?: PatternNumber;
  children: ReactNode;
  className?: string;
}

const JOURNEY_STYLE: Record<JourneyKey, string> = {
  guest:  'bg-blue-100 text-blue-800 border border-blue-300',
  member: 'bg-green-100 text-green-800 border border-green-300',
  admin:  'bg-red-100 text-red-800 border border-red-300',
};

const PATTERN_STYLE: Record<PatternNumber, string> = {
  1: 'bg-violet-100 text-violet-800 border border-violet-300',
  2: 'bg-sky-100 text-sky-800 border border-sky-300',
  3: 'bg-amber-100 text-amber-800 border border-amber-300',
  4: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
};

export default function Badge({ journey, pattern, children, className = '' }: BadgeProps) {
  const style =
    (journey && JOURNEY_STYLE[journey]) ||
    (pattern && PATTERN_STYLE[pattern]) ||
    'bg-gray-100 text-gray-700 border border-gray-300';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${style} ${className}`}
    >
      {journey && <Dot journey={journey} size="xs" />}
      {children}
    </span>
  );
}
