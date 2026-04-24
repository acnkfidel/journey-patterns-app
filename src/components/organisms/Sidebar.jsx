import { useJourneyStore } from '../../context/JourneyContext';
import NavItem from '../molecules/NavItem';
import Dot from '../atoms/Dot';

const NAV_GROUPS = [
  {
    id: 'home',
    label: null,
    items: [{ label: 'Overview', path: '/', journey: null, end: true }],
  },
  {
    id: 'pattern1',
    label: 'Pattern 1',
    sublabel: 'Config-Driven',
    color: 'text-violet-400',
    dot: 'violet',
    items: [
      { label: 'Guest Checkout',  path: '/pattern1/guest',  journey: 'guest' },
      { label: 'Member Checkout', path: '/pattern1/member', journey: 'member' },
    ],
  },
  {
    id: 'pattern2',
    label: 'Pattern 2',
    sublabel: 'Slot / Render Props',
    color: 'text-sky-400',
    dot: 'sky',
    items: [
      { label: 'Guest Journey',  path: '/pattern2/guest',  journey: 'guest' },
      { label: 'Member Journey', path: '/pattern2/member', journey: 'member' },
    ],
  },
  {
    id: 'pattern3',
    label: 'Pattern 3',
    sublabel: 'Context Flags',
    color: 'text-amber-400',
    dot: 'amber',
    items: [
      { label: 'Guest Profile',  path: '/pattern3/guest',  journey: 'guest' },
      { label: 'Member Profile', path: '/pattern3/member', journey: 'member' },
      { label: 'Admin Profile',  path: '/pattern3/admin',  journey: 'admin' },
    ],
  },
  {
    id: 'pattern4',
    label: 'Pattern 4',
    sublabel: 'HOC / Factory',
    color: 'text-emerald-400',
    dot: 'emerald',
    items: [
      { label: 'Guest Dashboard',  path: '/pattern4/guest',  journey: 'guest' },
      { label: 'Member Dashboard', path: '/pattern4/member', journey: 'member' },
      { label: 'Admin Dashboard',  path: '/pattern4/admin',  journey: 'admin' },
    ],
  },
];

export default function Sidebar() {
  const activeJourney = useJourneyStore((s) => s.activeJourney);

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 flex flex-col overflow-hidden border-r border-gray-800">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">Journey Patterns</div>
            <div className="text-gray-500 text-xs">React SPA Demo</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="mb-4">
            {group.label && (
              <div className="flex items-center gap-2 px-3 mb-1.5">
                <Dot color={group.dot} size="xs" />
                <span className={`text-xs font-semibold uppercase tracking-wider ${group.color}`}>
                  {group.label}
                </span>
                <span className="text-xs text-gray-600 font-medium">· {group.sublabel}</span>
              </div>
            )}
            {group.items.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-800">
        {activeJourney ? (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
            <Dot journey={activeJourney} size="sm" />
            <span className="text-xs text-gray-400">Active:</span>
            <span className={`text-xs font-semibold capitalize ${
              activeJourney === 'guest'  ? 'text-blue-400' :
              activeJourney === 'member' ? 'text-green-400' :
              'text-red-400'
            }`}>{activeJourney}</span>
          </div>
        ) : (
          <div className="px-3 py-2 text-xs text-gray-600 text-center">
            Select a pattern to explore
          </div>
        )}
      </div>
    </aside>
  );
}
