import type { ComponentType } from 'react';
import { journeyConfigs } from '../../config/journeyConfigs';
import type { JourneyKey, JourneyConfig } from '../../types/journey';

export interface WithJourneyConfigProps {
  config: JourneyConfig;
}

export default function withJourneyConfig<P extends WithJourneyConfigProps>(
  BaseComponent: ComponentType<P>,
  journeyKey: JourneyKey,
): ComponentType<Omit<P, 'config'>> {
  const config = journeyConfigs[journeyKey];

  function WrappedComponent(props: Omit<P, 'config'>) {
    return <BaseComponent {...(props as P)} config={config} />;
  }

  WrappedComponent.displayName = `${config.label}Dashboard`;
  return WrappedComponent;
}
