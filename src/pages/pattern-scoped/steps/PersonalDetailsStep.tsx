import { useScopedNavigate } from '../../../router/ScopedJourneyRouter';
import { useJourney } from '../../../context/JourneyContext';
import SectionBlock from '../../../components/molecules/SectionBlock';
import FormField from '../../../components/molecules/FormField';
import Button from '../../../components/atoms/Button';

export default function PersonalDetailsStep() {
  const navigate            = useScopedNavigate();
  const { journey, config } = useJourney();

  const fields = config.fields?.PersonalDetails ?? ['First Name', 'Last Name', 'Email Address'];

  return (
    <SectionBlock
      title="Step 2 — Personal Details"
      subtitle="Fields sourced from config.fields.PersonalDetails — journey-aware, no if/else"
    >
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs text-gray-500 font-mono">
          config.fields.PersonalDetails → [{fields.map((f) => `"${f}"`).join(', ')}]
        </div>

        <div className="grid grid-cols-2 gap-3">
          {fields.map((field) => (
            <FormField
              key={field}
              label={field}
              focusColor={journey === 'guest' ? 'blue' : 'green'}
            />
          ))}
        </div>

        {journey === 'member' && (
          <FormField
            label="Membership ID"
            placeholder="MBR-XXXX-XXXX"
            focusColor="green"
          />
        )}

        <div className="flex gap-2 pt-1">
          <Button variant="secondary" className="flex-1 justify-center" onClick={() => navigate('/step1')}>
            ← Back
          </Button>
          <Button variant="primary" className="flex-1 justify-center" onClick={() => navigate('/step3')}>
            Proceed to Payment →
          </Button>
        </div>
      </div>
    </SectionBlock>
  );
}
