import { useScopedNavigate } from '../../../router/ScopedJourneyRouter';
import { useJourney } from '../../../context/JourneyContext';
import SectionBlock from '../../../components/molecules/SectionBlock';
import SummaryRow from '../../../components/molecules/SummaryRow';
import Button from '../../../components/atoms/Button';

interface CartItem {
  name:  string;
  qty:   number;
  price: string;
}

const ITEMS: CartItem[] = [
  { name: 'Wireless Headphones', qty: 1, price: '₱1,200.00' },
  { name: 'Phone Case',          qty: 2, price: '₱480.00' },
];

export default function CartReviewStep() {
  const navigate    = useScopedNavigate(); // state-based — does NOT change window.location
  const { journey } = useJourney();        // JourneyContext — unaffected by ScopedJourneyRouter

  return (
    <SectionBlock
      title="Step 1 — Cart Review"
      subtitle="useScopedNavigate() updates in-memory state only — browser URL will not change on Next"
    >
      <div className="space-y-4">
        <div className="divide-y divide-gray-100">
          {ITEMS.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.qty}</p>
              </div>
              <span className="text-sm font-semibold text-gray-700">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-3 space-y-1.5">
          <SummaryRow label="Subtotal" value="₱1,680.00" />
          {journey === 'member' && (
            <SummaryRow label="Member Discount (10%)" value="-₱168.00" highlight="green" />
          )}
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 text-xs text-rose-600 font-mono">
          navigate(&apos;/step2&apos;) → setState → scoped path changes, browser stays on{' '}
          <span className="font-bold">{window.location.pathname}</span>
        </div>

        <Button variant="primary" className="w-full justify-center" onClick={() => navigate('/step2')}>
          Proceed to Details →
        </Button>
      </div>
    </SectionBlock>
  );
}
