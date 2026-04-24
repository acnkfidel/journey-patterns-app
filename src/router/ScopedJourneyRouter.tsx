import { createContext, useContext, useState, type ReactNode } from 'react';

// ─── Context types ────────────────────────────────────────────────────────────
interface ScopedLocation { pathname: string; }
type ScopedNavigateFn = (to: string) => void;

interface ScopedRouterContextValue {
  location: ScopedLocation;
  navigate: ScopedNavigateFn;
}

// ─── Internal context (not exported — use the hooks below) ───────────────────
const ScopedRouterContext = createContext<ScopedRouterContextValue | null>(null);

function useScopedRouter(): ScopedRouterContextValue {
  const ctx = useContext(ScopedRouterContext);
  if (!ctx) throw new Error('Component must be rendered inside <ScopedJourneyRouter>');
  return ctx;
}

// ─── Public hooks (mirror React Router's API) ─────────────────────────────────

/** Navigate to a step path inside the scoped flow. Does not change window.location. */
export function useScopedNavigate(): ScopedNavigateFn {
  return useScopedRouter().navigate;
}

/** Read the current in-memory path (/step1, /step2, …). */
export function useScopedLocation(): ScopedLocation {
  return useScopedRouter().location;
}

// ─── ScopedRoute ──────────────────────────────────────────────────────────────

interface ScopedRouteProps {
  path:    string;
  element: ReactNode;
}

/** Renders `element` only when the scoped location matches `path`. */
export function ScopedRoute({ path, element }: ScopedRouteProps) {
  const { location } = useScopedRouter();
  return location.pathname === path ? <>{element}</> : null;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ScopedJourneyRouterProps {
  children:     ReactNode;
  initialPath?: string;
}

/**
 * Provides in-memory step routing without nesting a <Router>.
 *
 * React Router v6 (data-router mode via createBrowserRouter) forbids nested
 * routers, so we use a React Context + useState pair to achieve the same
 * URL-isolation goal: window.location never changes as users move between steps.
 *
 * JourneyProvider and Redux Provider sit outside this component in the tree,
 * so all journey context and store state remain available inside the flow.
 */
export default function ScopedJourneyRouter({
  children,
  initialPath = '/step1',
}: ScopedJourneyRouterProps) {
  const [pathname, setPathname] = useState(initialPath);

  return (
    <ScopedRouterContext.Provider value={{
      location: { pathname },
      navigate: setPathname,
    }}>
      {children}
    </ScopedRouterContext.Provider>
  );
}
