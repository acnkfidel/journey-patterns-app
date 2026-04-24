import { useJourneyFeature } from '../../../hooks/useJourneyFeature';
import SectionBlock from '../../../components/molecules/SectionBlock';

interface TileData {
  label: string;
  value: string;
  icon:  string;
  color: string;
}

const TILES: TileData[] = [
  { label: 'Points Balance', value: '1,250',   icon: '⭐', color: 'bg-yellow-50 border-yellow-200' },
  { label: 'Tier Status',    value: 'Gold',    icon: '🏆', color: 'bg-orange-50 border-orange-200' },
  { label: 'Next Reward',    value: '250 pts', icon: '🎁', color: 'bg-purple-50 border-purple-200' },
];

export default function LoyaltyPointsSection() {
  const show = useJourneyFeature('showLoyaltyPoints');

  if (!show) return <SectionBlock title="LoyaltyPointsSection" hidden />;

  return (
    <SectionBlock title="LoyaltyPointsSection" subtitle="useJourneyFeature('showLoyaltyPoints') returned true">
      <div className="grid grid-cols-3 gap-3">
        {TILES.map(({ label, value, icon, color }) => (
          <div key={label} className={`rounded-lg border p-3 ${color}`}>
            <div className="text-lg mb-1">{icon}</div>
            <div className="text-sm font-bold text-gray-800">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
