import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Sidebar from '../organisms/Sidebar';
import Dot from '../atoms/Dot';

export default function AppShell() {
  const location      = useLocation();
  const activeJourney = useAppSelector((state) => state.journey.activeJourney);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
          <span className="font-mono text-gray-400 text-xs">{location.pathname}</span>

          {activeJourney && (
            <div className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              activeJourney === 'guest'  ? 'bg-blue-50 text-blue-700 border-blue-200' :
              activeJourney === 'member' ? 'bg-green-50 text-green-700 border-green-200' :
              'bg-red-50 text-red-700 border-red-200'
            }`}>
              <Dot journey={activeJourney} size="xs" />
              <span className="capitalize">{activeJourney} Journey Active</span>
            </div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
