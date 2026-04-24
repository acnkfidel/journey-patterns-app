import { createBrowserRouter } from 'react-router-dom';
import AppShell from '../components/templates/AppShell';
import { JourneyProvider } from '../context/JourneyContext';

import Home from '../pages/Home';

import Pattern1Entry from '../pages/pattern1-config-driven/index.jsx';

import GuestJourneyPage from '../pages/pattern2-slot/GuestJourneyPage';
import MemberJourneyPage from '../pages/pattern2-slot/MemberJourneyPage';

import Pattern3Entry from '../pages/pattern3-context/index.jsx';

import GuestDashboard from '../pages/pattern4-hoc/GuestDashboard';
import MemberDashboard from '../pages/pattern4-hoc/MemberDashboard';
import AdminDashboard from '../pages/pattern4-hoc/AdminDashboard';

function wrap(Component, journey) {
  return (
    <JourneyProvider journey={journey}>
      <Component />
    </JourneyProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },

      { path: 'pattern1/guest',  element: wrap(Pattern1Entry, 'guest') },
      { path: 'pattern1/member', element: wrap(Pattern1Entry, 'member') },

      { path: 'pattern2/guest',  element: wrap(GuestJourneyPage, 'guest') },
      { path: 'pattern2/member', element: wrap(MemberJourneyPage, 'member') },

      { path: 'pattern3/guest',  element: wrap(Pattern3Entry, 'guest') },
      { path: 'pattern3/member', element: wrap(Pattern3Entry, 'member') },
      { path: 'pattern3/admin',  element: wrap(Pattern3Entry, 'admin') },

      { path: 'pattern4/guest',  element: wrap(GuestDashboard, 'guest') },
      { path: 'pattern4/member', element: wrap(MemberDashboard, 'member') },
      { path: 'pattern4/admin',  element: wrap(AdminDashboard, 'admin') },
    ],
  },
]);
