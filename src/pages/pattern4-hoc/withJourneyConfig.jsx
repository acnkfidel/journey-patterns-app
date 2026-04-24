import { journeyConfigs } from '../../config/journeyConfigs';

export default function withJourneyConfig(BaseComponent, journeyKey) {
  const config = journeyConfigs[journeyKey];

  function WrappedComponent(props) {
    return <BaseComponent {...props} config={config} />;
  }

  WrappedComponent.displayName = `${config.label}Dashboard`;
  return WrappedComponent;
}
