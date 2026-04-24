import { createContext, useContext, useEffect, type ReactNode, type ReactElement } from 'react';
import { journeyConfigs } from '../config/journeyConfigs';
import { setActiveJourney } from '../store/journeySlice';
import { useAppDispatch } from '../store/hooks';
import type { JourneyKey, JourneyConfig, JourneyFeatures } from '../types/journey';

// ─── Context shape ─────────────────────────────────────────────────────────────

interface JourneyContextValue {
  journey: JourneyKey;
  config: JourneyConfig;
}

export const JourneyContext = createContext<JourneyContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────

interface JourneyProviderProps {
  journey: JourneyKey;
  children: ReactNode;
}

export function JourneyProvider({ journey, children }: JourneyProviderProps): ReactElement {
  const config = journeyConfigs[journey];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveJourney(journey));
    return () => { dispatch(setActiveJourney(null)); };
  }, [journey, dispatch]);

  return (
    <JourneyContext.Provider value={{ journey, config }}>
      {children}
    </JourneyContext.Provider>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────────────────────

export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within a JourneyProvider');
  return ctx;
}

export function useJourneyFeature(featureKey: keyof JourneyFeatures): boolean {
  const ctx = useContext(JourneyContext);
  if (!ctx) return false;
  return ctx.config.features[featureKey];
}
