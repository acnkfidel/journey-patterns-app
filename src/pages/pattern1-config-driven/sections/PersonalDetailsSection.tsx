import FormField from '../../../components/molecules/FormField';

interface PersonalDetailsSectionProps {
  fields?: string[];
}

export default function PersonalDetailsSection({ fields = [] }: PersonalDetailsSectionProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 font-mono mb-3">
        Rendering <strong>{fields.length}</strong> field(s) from{' '}
        <code>config.fields.PersonalDetails</code>
      </p>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <FormField key={field} label={field} />
        ))}
      </div>
    </div>
  );
}
