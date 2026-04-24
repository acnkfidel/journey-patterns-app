import PatternCardGrid from '../components/organisms/PatternCardGrid';
import ComparisonTable from '../components/organisms/ComparisonTable';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">

      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-700 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          React SPA — Journey-Based Page Management
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          4 Journey Patterns,<br />
          <span className="text-indigo-600">One Codebase</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Explore production-grade patterns for rendering different UI across{' '}
          <strong>guest</strong>, <strong>member</strong>, and <strong>admin</strong>{' '}
          journeys — without if/else soup.
        </p>
      </div>

      {/* Organisms */}
      <PatternCardGrid />
      <ComparisonTable />

      {/* Tech Stack */}
      <div className="bg-gray-900 rounded-xl p-6 text-white">
        <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-3">
          {['Vite', 'React 18', 'React Router v6', 'Zustand', 'Tailwind CSS v3', 'Atomic Design'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300 border border-gray-700 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
