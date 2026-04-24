import { useJourney } from '../../context/JourneyContext';
import PageLayout from '../../components/templates/PageLayout';
import ProfileHeader from './sections/ProfileHeader';
import LoyaltyPointsSection from './sections/LoyaltyPointsSection';
import PromoSection from './sections/PromoSection';
import AdminPanel from './sections/AdminPanel';
import type { JourneyFeatures } from '../../types/journey';

const EXPLANATION = `Pattern 3 uses feature flags stored in JourneyContext. Each section component
independently calls useJourneyFeature(key) and decides for itself whether to render or return null.
ProfilePage.tsx renders ALL four sections unconditionally — it has zero if/else logic.
The visibility logic lives entirely inside each section. This means:
• You can add new sections without touching ProfilePage
• Sections self-document their feature dependency
• The same page file works for guest, member, and admin
Trade-off: to understand what renders for a given journey, you must open each section file.`;

export default function ProfilePage() {
  const { config, journey } = useJourney();

  const hiddenFeatures = (Object.entries(config.features) as [keyof JourneyFeatures, boolean][])
    .filter(([, value]) => !value)
    .map(([key]) => ({
      name:   key,
      reason: `journeyConfigs.${journey}.features.${key} = false — section returns null`,
    }));

  return (
    <PageLayout
      title="Profile"
      pattern="Pattern 3 · Context / Feature Flags"
      patternNumber={3}
      patternExplanation={EXPLANATION}
      hiddenItems={hiddenFeatures}
    >
      <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 text-xs text-amber-700 font-mono">
        <strong>ProfilePage</strong> renders all 4 sections unconditionally — each section self-manages visibility via{' '}
        <code>useJourneyFeature(key)</code>
      </div>

      <div className="space-y-5">
        <ProfileHeader />
        <LoyaltyPointsSection />
        <PromoSection />
        <AdminPanel />
      </div>
    </PageLayout>
  );
}
