import { useContext } from 'react';
import { JourneyContext } from '../context/JourneyContext';

export function useJourneyFeature(featureKey) {
  const ctx = useContext(JourneyContext);
  if (!ctx) return false;
  return ctx.config?.features?.[featureKey] ?? false;
}
