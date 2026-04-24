import { useScopedNavigate } from '../../../router/ScopedJourneyRouter';
import { useJourney } from '../../../context/JourneyContext';
import SectionBlock from '../../../components/molecules/SectionBlock';
import FormField from '../../../components/molecules/FormField';
import SummaryRow from '../../../components/molecules/SummaryRow';
import Button from '../../../components/atoms/Button';

export default function PaymentStep() {
  const navigate    = useScopedNavigate();
  const { journey } = useJourney();

  return (
    <SectionBlock
      title="Step 3 — Payment"
      subtitle="Step 3 of 4 — scoped path is /step3, browser URL unchanged"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
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
          <FormField label="Card Number" placeholder="•••• •••• •••• ••••" span focusColor={journey === 'member' ? 'green' : 'blue'} />
          <FormField label="Expiry Date" placeholder="MM / YY"             focusColor={journey === 'member' ? 'green' : 'blue'} />
          <FormField label="CVV"         placeholder="•••"                 focusColor={journey === 'member' ? 'green' : 'blue'} />
        </div>

        <div className="border-t border-gray-100 pt-3 space-y-1.5">
          <SummaryRow label="Subtotal" value="₱1,680.00" />
          {journey === 'member' && (
            <SummaryRow label="Member Discount" value="-₱168.00" highlight="green" />
          )}
          <SummaryRow label="Shipping" value="₱150.00" />
          <SummaryRow
            label="Total"
            value={journey === 'member' ? '₱1,662.00' : '₱1,830.00'}
            divider
          />
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="secondary" className="flex-1 justify-center" onClick={() => navigate('/step2')}>
            ← Back
          </Button>
          <Button variant="primary" className="flex-1 justify-center" onClick={() => navigate('/step4')}>
            Place Order →
          </Button>
        </div>
      </div>
    </SectionBlock>
  );
}
