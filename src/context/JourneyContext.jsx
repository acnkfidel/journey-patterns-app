import React, { createContext, useContext, useEffect } from 'react';
import { create } from 'zustand';
import { journeyConfigs } from '../config/journeyConfigs';

// Zustand store — tracks the active journey globally (used by AppShell topbar)
export const useJourneyStore = create((set) => ({
  activeJourney: null,
  activePattern: null,
  setActiveJourney: (journey) => set({ activeJourney: journey }),
  setActivePattern: (pattern) => set({ activePattern: pattern }),
}));

export const JourneyContext = createContext(null);

export function JourneyProvider({ journey, children }) {
  const config = journeyConfigs[journey];
  const setActiveJourney = useJourneyStore((s) => s.setActiveJourney);

  useEffect(() => {
    setActiveJourney(journey);
    return () => setActiveJourney(null);
  }, [journey, setActiveJourney]);

  return (
    <JourneyContext.Provider value={{ journey, config }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within a JourneyProvider');
  return ctx;
}

export function useJourneyFeature(featureKey) {
  const ctx = useContext(JourneyContext);
  if (!ctx) return false;
  return ctx.config?.features?.[featureKey] ?? false;
}
