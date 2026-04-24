import { useState } from 'react';
import type { PatternNumber } from '../../types/journey';

interface PatternExplanationPanelProps {
  patternNumber: PatternNumber;
  explanation:   string;
}

const ACCENT: Record<PatternNumber, string> = {
  1: 'bg-violet-600',
  2: 'bg-sky-600',
  3: 'bg-amber-600',
  4: 'bg-emerald-600',
};

export default function PatternExplanationPanel({ patternNumber, explanation }: PatternExplanationPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-md ${ACCENT[patternNumber]} flex items-center justify-center flex-shrink-0`}>
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="font-semibold text-gray-800 text-sm">Pattern Explanation</span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-mono">
            {open ? 'click to collapse' : 'click to expand'}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 whitespace-pre-line">
          {explanation}
        </div>
      )}
    </div>
  );
}
