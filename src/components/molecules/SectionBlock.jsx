export default function SectionBlock({ title, subtitle, hidden = false, children, className = '' }) {
  if (hidden) {
    return (
      <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-5 bg-gray-50/60">
        <div className="absolute -top-3 left-4 px-2 bg-gray-50">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{title}</span>
          <span className="ml-2 text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-mono">hidden</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-6 text-gray-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
          <span className="text-sm italic">Not rendered for this journey</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative border-2 border-indigo-200 rounded-xl p-5 bg-white ${className}`}>
      <div className="absolute -top-3 left-4 px-2 bg-white">
        <span className="text-xs font-mono text-indigo-600 uppercase tracking-wider font-semibold">{title}</span>
        <span className="ml-2 text-xs bg-indigo-50 text-indigo-500 px-1.5 py-0.5 rounded font-mono">rendered</span>
      </div>
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      {children}
    </div>
  );
}
