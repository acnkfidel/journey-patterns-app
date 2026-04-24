export default function HiddenItemsPanel({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
        <span className="font-semibold text-amber-800 text-sm">
          What&apos;s Hidden &amp; Why
        </span>
        <span className="ml-auto text-xs text-amber-600 font-mono">{items.length} suppressed</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-start gap-2 text-sm">
            <code className="text-amber-700 font-mono bg-amber-100 px-1.5 py-0.5 rounded text-xs shrink-0">
              ⊘ {item.name}
            </code>
            <span className="text-amber-700">{item.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
