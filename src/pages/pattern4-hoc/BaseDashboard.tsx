import { useJourney } from '../../context/JourneyContext';
import PageLayout from '../../components/templates/PageLayout';
import WidgetCard from '../../components/molecules/WidgetCard';
import { ALL_WIDGETS } from '../../config/journeyConfigs';
import type { WithJourneyConfigProps } from './withJourneyConfig';

const EXPLANATION = `Pattern 4 uses a Higher-Order Component (HOC) to inject journey config into a base component.
withJourneyConfig(BaseDashboard, 'member') creates a new component that always passes the member config as a prop.
BaseDashboard never imports journeyConfigs — it's a pure component that only knows about a config prop.
This is the Factory pattern: you produce configured variants from a single base.
Adding a new journey = one line: withJourneyConfig(BaseDashboard, 'newJourney').
The HOC is also the right place to inject memoization, error boundaries, or analytics wrappers.`;

export default function BaseDashboard({ config }: WithJourneyConfigProps) {
  const { journey } = useJourney();

  const hiddenWidgets = ALL_WIDGETS
    .filter((w) => !config.dashboardWidgets.includes(w))
    .map((w) => ({
      name:   w,
      reason: `Not in journeyConfigs.${journey}.dashboardWidgets array`,
    }));

  return (
    <PageLayout
      title="Dashboard"
      pattern="Pattern 4 · HOC / Factory"
      patternNumber={4}
      patternExplanation={EXPLANATION}
      hiddenItems={hiddenWidgets}
    >
      <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 text-xs text-emerald-700 font-mono">
        <strong>BaseDashboard</strong> receives <strong>config</strong> via{' '}
        <strong>withJourneyConfig(BaseDashboard, &apos;{journey}&apos;)</strong> — no direct journeyConfigs import
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700 text-sm">
            Active Widgets ({config.dashboardWidgets.length})
          </h3>
          <span className="text-xs text-gray-400 font-mono">config.dashboardWidgets</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {config.dashboardWidgets.map((name) => (
            <WidgetCard key={name} name={name} active />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-400 text-sm">
            Suppressed Widgets ({ALL_WIDGETS.length - config.dashboardWidgets.length})
          </h3>
          <span className="text-xs text-gray-300 font-mono">not in config</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_WIDGETS.filter((w) => !config.dashboardWidgets.includes(w)).map((name) => (
            <WidgetCard key={name} name={name} active={false} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
