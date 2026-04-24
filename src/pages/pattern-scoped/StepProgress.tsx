import { useScopedLocation } from '../../router/ScopedJourneyRouter';

interface Step {
  path:  string;
  label: string;
}

export const STEP_ROUTES: Step[] = [
  { path: '/step1', label: 'Cart Review' },
  { path: '/step2', label: 'Details' },
  { path: '/step3', label: 'Payment' },
  { path: '/step4', label: 'Confirmed' },
];

export default function StepProgress() {
  const { pathname } = useScopedLocation(); // reads from ScopedJourneyRouter — never the browser URL
  const currentIndex = STEP_ROUTES.findIndex((s) => s.path === pathname);

  return (
    <div className="flex items-start justify-center py-2">
      {STEP_ROUTES.map((step, i) => {
        const done    = i < currentIndex;
        const current = i === currentIndex;
        return (
          <div key={step.path} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                done    ? 'bg-rose-600 text-white' :
                current ? 'bg-rose-600 text-white ring-4 ring-rose-100' :
                          'bg-gray-100 text-gray-400'
              }`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${
                current ? 'text-rose-700' :
                done    ? 'text-gray-500' :
                          'text-gray-300'
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEP_ROUTES.length - 1 && (
              <div className={`w-14 h-0.5 mx-1 mb-5 transition-colors ${
                i < currentIndex ? 'bg-rose-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
