const ROWS = [
  {
    pattern: '1. Config-Driven',   color: 'violet',
    complexity: 'Low',
    bestFor: 'Dynamic section lists from a config array',
    isolation: 'High — config drives everything',
    scalability: 'High — add config keys, not code',
  },
  {
    pattern: '2. Slot Props',      color: 'sky',
    complexity: 'Medium',
    bestFor: 'Shell layouts with swappable inner components',
    isolation: 'High — shell knows nothing about journeys',
    scalability: 'Medium — one file per journey variant',
  },
  {
    pattern: '3. Context Flags',   color: 'amber',
    complexity: 'Medium',
    bestFor: 'Sections that self-show/hide without page logic',
    isolation: 'Medium — sections self-manage visibility',
    scalability: 'Very High — add features, sections react',
  },
  {
    pattern: '4. HOC / Factory',   color: 'emerald',
    complexity: 'Medium-High',
    bestFor: 'Reusable base components with injected configs',
    isolation: 'Very High — base never touches journey logic',
    scalability: 'High — one withJourneyConfig call per variant',
  },
];

const BADGE = {
  violet:  'bg-violet-100 text-violet-700',
  sky:     'bg-sky-100 text-sky-700',
  amber:   'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export default function ComparisonTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 text-base">Pattern Comparison</h2>
        <p className="text-sm text-gray-500 mt-0.5">Side-by-side tradeoff analysis</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Pattern', 'Complexity', 'Best For', 'Journey Isolation', 'Scalability'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-gray-600 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.pattern} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${BADGE[row.color]}`}>
                    {row.pattern}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{row.complexity}</td>
                <td className="px-5 py-3.5 text-gray-600">{row.bestFor}</td>
                <td className="px-5 py-3.5 text-gray-600">{row.isolation}</td>
                <td className="px-5 py-3.5 text-gray-600">{row.scalability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
