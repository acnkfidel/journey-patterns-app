import FormField from '../../../components/molecules/FormField';
import Button from '../../../components/atoms/Button';

const PLACEHOLDERS = {
  'Card Number':              '•••• •••• •••• ••••',
  'Expiry Date':              'MM / YY',
  'CVV':                      '•••',
  'Billing Address':          '123 Main St',
  'Payment Method Override':  'Select method',
};

const WIDE_FIELDS = ['Card Number', 'Billing Address', 'Payment Method Override'];

export default function PaymentFormSection({ fields = [] }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 font-mono mb-3">
        Rendering <strong>{fields.length}</strong> field(s) from{' '}
        <code>config.fields.PaymentForm</code>
      </p>
      <div className="flex items-center gap-2 mb-3">
        {['visa', 'mc', 'amex'].map((card) => (
          <div
            key={card}
            className="w-12 h-8 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-400 uppercase"
          >
            {card}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <FormField
            key={field}
            label={field}
            placeholder={PLACEHOLDERS[field]}
            span={WIDE_FIELDS.includes(field)}
          />
        ))}
      </div>
      <div className="pt-2">
        <Button variant="primary" className="w-full justify-center">
          Place Order
        </Button>
      </div>
    </div>
  );
}
