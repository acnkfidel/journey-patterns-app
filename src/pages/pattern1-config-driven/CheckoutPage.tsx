import type { ComponentType } from 'react';
import { useJourney } from '../../context/JourneyContext';
import PageLayout from '../../components/templates/PageLayout';
import SectionBlock from '../../components/molecules/SectionBlock';
import PersonalDetailsSection from './sections/PersonalDetailsSection';
import LoyaltySection from './sections/LoyaltySection';
import PaymentFormSection from './sections/PaymentFormSection';
import { ALL_SECTIONS } from '../../config/journeyConfigs';

interface SectionProps {
  fields: string[];
}

const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  PersonalDetails: PersonalDetailsSection,
  Loyalty:         LoyaltySection,
  PaymentForm:     PaymentFormSection,
};

const EXPLANATION = `Pattern 1 reads config.sections (an ordered array of string keys) and maps over it.
A sectionRegistry object resolves each key to its React component. The fields prop for each section
is pulled from config.fields[sectionKey]. CheckoutPage.tsx contains zero if/else journey checks —
the config object is the sole source of truth about what renders and in what order.
Adding a new section requires only: (a) a new component, (b) a registry entry, and (c) adding the key
to the relevant journey's sections array. No page code changes needed.`;

export default function CheckoutPage() {
  const { journey, config } = useJourney();

  const hiddenSections = ALL_SECTIONS
    .filter((s) => !config.sections.includes(s))
    .map((s) => ({
      name:   s,
      reason: `Not present in journeyConfigs.${journey}.sections array`,
    }));

  return (
    <PageLayout
      title="Checkout"
      pattern="Pattern 1 · Config-Driven"
      patternNumber={1}
      patternExplanation={EXPLANATION}
      hiddenItems={hiddenSections}
    >
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3">
        <p className="text-xs text-indigo-600 font-mono">
          <strong>config.sections</strong> = [{config.sections.map((s) => `"${s}"`).join(', ')}]
        </p>
        <p className="text-xs text-indigo-500 mt-1">
          CheckoutPage loops this array → resolves each key via sectionRegistry → renders
        </p>
      </div>

      <div className="space-y-5">
        {config.sections.map((sectionKey) => {
          const SectionComponent = sectionRegistry[sectionKey];
          const fields = (config.fields?.[sectionKey] ?? []) as string[];
          return (
            <SectionBlock key={sectionKey} title={sectionKey}>
              <SectionComponent fields={fields} />
            </SectionBlock>
          );
        })}
      </div>
    </PageLayout>
  );
}
