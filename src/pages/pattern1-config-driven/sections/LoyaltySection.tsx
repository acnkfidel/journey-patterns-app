import FormField from '../../../components/molecules/FormField';

interface LoyaltySectionProps {
  fields?: string[];
}

export default function LoyaltySection({ fields = [] }: LoyaltySectionProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 font-mono mb-3">
        Rendering <strong>{fields.length}</strong> field(s) from{' '}
        <code>config.fields.Loyalty</code>
      </p>
      <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg mb-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-green-800">Loyalty Programme Active</div>
          <div className="text-xs text-green-600">Points Balance: 1,250 pts · Gold Tier</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <FormField key={field} label={field} focusColor="indigo" />
        ))}
      </div>
    </div>
  );
}
