import { useJourneyFeature } from '../../../hooks/useJourneyFeature';
import SectionBlock from '../../../components/molecules/SectionBlock';

const ACTIONS = [
  'User Management',
  'Audit Logs',
  'System Config',
  'Analytics',
  'Feature Flags',
  'Role Management',
];

export default function AdminPanel() {
  const show = useJourneyFeature('showAdminPanel');

  if (!show) return <SectionBlock title="AdminPanel" hidden />;

  return (
    <SectionBlock title="AdminPanel" subtitle="useJourneyFeature('showAdminPanel') returned true">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Admin Access
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors text-left"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {action}
            </button>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}
