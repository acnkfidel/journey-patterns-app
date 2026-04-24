import { NavLink } from 'react-router-dom';
import type { JourneyKey } from '../../types/journey';
import Dot from '../atoms/Dot';

interface NavItemProps {
  label:    string;
  path:     string;
  journey?: JourneyKey;
  end?:     boolean;
}

const JOURNEY_PILL: Record<JourneyKey, string> = {
  guest:  'bg-blue-900/40 text-blue-300 border border-blue-700/50',
  member: 'bg-green-900/40 text-green-300 border border-green-700/50',
  admin:  'bg-red-900/40 text-red-300 border border-red-700/50',
};

export default function NavItem({ label, path, journey, end = false }: NavItemProps) {
  return (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) =>
        `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
      }
    >
      {journey ? (
        <>
          <Dot journey={journey} size="sm" />
          <span>{label}</span>
          <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-mono ${JOURNEY_PILL[journey]}`}>
            {journey}
          </span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
