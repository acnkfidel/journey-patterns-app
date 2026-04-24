import { useContext } from 'react';
import { JourneyContext } from '../context/JourneyContext';
import type { JourneyFeatures } from '../types/journey';

export function useJourneyFeature(featureKey: keyof JourneyFeatures): boolean {
  const ctx = useContext(JourneyContext);
  if (!ctx) return false;
  return ctx.config.features[featureKey];
}
