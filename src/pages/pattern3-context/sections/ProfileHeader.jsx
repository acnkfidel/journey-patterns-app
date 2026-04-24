import { useJourneyFeature } from '../../../hooks/useJourneyFeature';
import { useJourney } from '../../../context/JourneyContext';
import SectionBlock from '../../../components/molecules/SectionBlock';

export default function ProfileHeader() {
  const showAvatar        = useJourneyFeature('showAvatar');
  const showWelcomeBanner = useJourneyFeature('showWelcomeBanner');
  const { config }        = useJourney();

  return (
    <SectionBlock title="ProfileHeader" subtitle="useJourneyFeature('showAvatar') — avatar shows only when true">
      <div className="flex items-center gap-4">
        {showAvatar ? (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
            {config.label[0]}
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-800">{config.label} User</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${showAvatar ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
              Avatar: {showAvatar ? 'shown' : 'hidden'}
            </span>
          </div>
          {showWelcomeBanner && (
            <p className="text-sm text-green-600 mt-0.5 font-medium">
              Welcome back! You have new offers waiting.
            </p>
          )}
          {!showWelcomeBanner && (
            <p className="text-xs text-gray-400 mt-0.5 italic">
              (showWelcomeBanner = false — no banner shown)
            </p>
          )}
        </div>
      </div>
    </SectionBlock>
  );
}
