import FormField from '../../../components/molecules/FormField';

const FIELDS = [
  { label: 'First Name' },
  { label: 'Last Name' },
  { label: 'Email Address', span: true },
  { label: 'Card Number',   placeholder: '•••• •••• •••• ••••', span: true },
  { label: 'Expiry Date',   placeholder: 'MM / YY' },
  { label: 'CVV',           placeholder: '•••' },
];

export default function GuestForm() {
  return (
    <div className="space-y-3">
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-3">
        <p className="text-xs text-blue-600 font-medium">Guest checkout — no account required</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <FormField key={f.label} focusColor="blue" {...f} />
        ))}
      </div>
    </div>
  );
}
