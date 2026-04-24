import { Link } from 'react-router-dom';
import type { JourneyKey } from '../../types/journey';

interface PatternMeta {
  number:      number;
  name:        string;
  color:       string;
  routes:      string[];
  complexity:  string;
  description: string;
  icon:        string;
}

const PATTERNS: PatternMeta[] = [
  { number: 1, name: 'Config-Driven Rendering', color: 'violet',
    routes: ['/pattern1/guest', '/pattern1/member'], complexity: 'Low', icon: '⚙️',
    description: 'The page reads config.sections and maps over it. A sectionRegistry resolves string keys to React components. No if/else inside the page — the config is the source of truth.' },
  { number: 2, name: 'Slot / Render Props', color: 'sky',
    routes: ['/pattern2/guest', '/pattern2/member'], complexity: 'Medium', icon: '🔌',
    description: 'A shell accepts named slot props (headerSlot, formSlot, summarySlot). Each journey page injects its own components. The shell stays dumb and reusable.' },
  { number: 3, name: 'Context / Feature Flags', color: 'amber',
    routes: ['/pattern3/guest', '/pattern3/member', '/pattern3/admin'], complexity: 'Medium', icon: '🚩',
    description: 'Each section independently reads a feature flag from JourneyContext and self-hides. The parent page renders all sections unconditionally — zero journey logic at page level.' },
  { number: 4, name: 'HOC / Factory', color: 'emerald',
    routes: ['/pattern4/guest', '/pattern4/member', '/pattern4/admin'], complexity: 'Medium-High', icon: '🏭',
    description: 'A Higher-Order Component wraps BaseDashboard and injects the journey config as a prop. BaseDashboard is pure — it never imports journeyConfigs. Each variant is one line.' },
  { number: 5, name: 'Scoped Routes', color: 'rose',
    routes: ['/scoped/guest', '/scoped/member'], complexity: 'Medium', icon: '🔒',
    description: 'A MemoryRouter wraps a multi-step flow. The browser URL never changes as the user navigates steps — all routing state lives in memory, isolating the flow from the global browser history.' },
];

const COLOR: Record<string, { card: string; num: string; tag: string }> = {
  violet:  { card: 'border-violet-200 bg-violet-50/40',   num: 'bg-violet-600',  tag: 'bg-violet-50 text-violet-600 border border-violet-200' },
  sky:     { card: 'border-sky-200 bg-sky-50/40',          num: 'bg-sky-600',     tag: 'bg-sky-50 text-sky-600 border border-sky-200' },
  amber:   { card: 'border-amber-200 bg-amber-50/40',      num: 'bg-amber-600',   tag: 'bg-amber-50 text-amber-600 border border-amber-200' },
  emerald: { card: 'border-emerald-200 bg-emerald-50/40',  num: 'bg-emerald-600', tag: 'bg-emerald-50 text-emerald-600 border border-emerald-200' },
  rose:    { card: 'border-rose-200 bg-rose-50/40',        num: 'bg-rose-600',    tag: 'bg-rose-50 text-rose-600 border border-rose-200' },
};

const JOURNEY_LINK: Record<JourneyKey, string> = {
  guest:  'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
  member: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
  admin:  'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
};

const JOURNEY_DOT: Record<JourneyKey, string> = {
  guest:  'bg-blue-500',
  member: 'bg-green-500',
  admin:  'bg-red-500',
};

export default function PatternCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PATTERNS.map((p) => {
        const c = COLOR[p.color];
        return (
          <div key={p.number} className={`rounded-xl border-2 ${c.card} p-5 space-y-3`}>
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl ${c.num} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {p.number}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{p.icon}</span>
                  <h2 className="font-semibold text-gray-900 text-base">{p.name}</h2>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.tag}`}>{p.complexity} complexity</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {p.routes.map((route) => {
                const journey = route.split('/').pop() as JourneyKey;
                return (
                  <Link key={route} to={route}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${JOURNEY_LINK[journey]}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${JOURNEY_DOT[journey]}`} />
                    {journey.charAt(0).toUpperCase() + journey.slice(1)}
                    <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
