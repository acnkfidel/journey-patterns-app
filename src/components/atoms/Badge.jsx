import Dot from './Dot';

const JOURNEY_STYLES = {
  guest:  'bg-blue-100 text-blue-800 border border-blue-300',
  member: 'bg-green-100 text-green-800 border border-green-300',
  admin:  'bg-red-100 text-red-800 border border-red-300',
};

const PATTERN_STYLES = {
  1: 'bg-violet-100 text-violet-800 border border-violet-300',
  2: 'bg-sky-100 text-sky-800 border border-sky-300',
  3: 'bg-amber-100 text-amber-800 border border-amber-300',
  4: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
};

export default function Badge({ journey, pattern, children, className = '' }) {
  const style =
    (journey && JOURNEY_STYLES[journey]) ||
    (pattern && PATTERN_STYLES[pattern]) ||
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
