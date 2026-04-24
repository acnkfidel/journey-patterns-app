import type { ReactNode } from 'react';
import { useJourney } from '../../context/JourneyContext';
import Badge from '../atoms/Badge';
import PatternExplanationPanel from '../organisms/PatternExplanationPanel';
import HiddenItemsPanel from '../organisms/HiddenItemsPanel';
import type { HiddenItem, PatternNumber } from '../../types/journey';

interface BannerStyle {
  bg:     string;
  accent: string;
  num:    string;
}

const BANNER: Record<PatternNumber, BannerStyle> = {
  1: { bg: 'bg-violet-50 border-violet-200',  accent: 'text-violet-700',  num: 'bg-violet-600' },
  2: { bg: 'bg-sky-50 border-sky-200',         accent: 'text-sky-700',     num: 'bg-sky-600' },
  3: { bg: 'bg-amber-50 border-amber-200',     accent: 'text-amber-700',   num: 'bg-amber-600' },
  4: { bg: 'bg-emerald-50 border-emerald-200', accent: 'text-emerald-700', num: 'bg-emerald-600' },
};

interface PageLayoutProps {
  title?:             string;
  pattern:            string;
  patternNumber:      PatternNumber;
  patternExplanation: string;
  hiddenItems?:       HiddenItem[];
  children:           ReactNode;
}

export default function PageLayout({
  title,
  pattern,
  patternNumber,
  patternExplanation,
  hiddenItems = [],
  children,
}: PageLayoutProps) {
  const { journey, config } = useJourney();
  const colors = BANNER[patternNumber];

  return (
    <div className="max-w-3xl mx-auto py-8 px-6 space-y-5">

      <div className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 ${colors.bg}`}>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge journey={journey}>{config.label} Journey</Badge>
          <span className="text-gray-400 text-sm">·</span>
          <span className={`text-sm font-semibold ${colors.accent}`}>{pattern}</span>
          {title && (
            <>
              <span className="text-gray-400 text-sm">·</span>
              <span className="text-sm text-gray-600">{title}</span>
            </>
          )}
        </div>
        <div className={`w-7 h-7 rounded-lg ${colors.num} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-xs font-bold">{patternNumber}</span>
        </div>
      </div>

      <PatternExplanationPanel
        patternNumber={patternNumber}
        explanation={patternExplanation}
      />

      <HiddenItemsPanel items={hiddenItems} />

      <div className="space-y-5">{children}</div>
    </div>
  );
}
