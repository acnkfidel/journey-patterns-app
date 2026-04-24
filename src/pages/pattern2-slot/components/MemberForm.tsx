import FormField from '../../../components/molecules/FormField';
import type { FocusColor } from '../../../components/atoms/Input';

interface FieldDef {
  label:        string;
  placeholder?: string;
  span?:        boolean;
  tag?:         string;
}

const FIELDS: FieldDef[] = [
  { label: 'First Name' },
  { label: 'Last Name' },
  { label: 'Email Address',   span: true },
  { label: 'Membership ID',   placeholder: 'MBR-XXXX-XXXX', tag: '(member only)' },
  { label: 'Phone' },
  { label: 'Points to Redeem', placeholder: '0 pts available', tag: '(member only)' },
  { label: 'Card Number',      placeholder: '•••• •••• •••• ••••', span: true },
  { label: 'Expiry Date',      placeholder: 'MM / YY' },
  { label: 'CVV',              placeholder: '•••' },
  { label: 'Billing Address',  span: true },
];

const FOCUS_COLOR: FocusColor = 'green';

export default function MemberForm() {
  return (
    <div className="space-y-3">
      <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-3">
        <p className="text-xs text-green-700 font-medium">
          Member checkout — loyalty points applied automatically
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <FormField key={f.label} focusColor={FOCUS_COLOR} {...f} />
        ))}
      </div>
    </div>
  );
}
