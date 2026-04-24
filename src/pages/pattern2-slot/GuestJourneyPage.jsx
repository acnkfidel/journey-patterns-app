import { useJourney } from '../../context/JourneyContext';
import PageLayout from '../../components/templates/PageLayout';
import CheckoutShell from './CheckoutShell';
import GuestForm from './components/GuestForm';
import GuestSummary from './components/GuestSummary';

const EXPLANATION = `Pattern 2 passes entire components as props (slots) into a dumb shell.
GuestJourneyPage is the ONLY file that knows GuestForm and GuestSummary belong together.
CheckoutShell.jsx has zero journey logic — it only knows about slot props named
headerSlot, formSlot, and summarySlot. This makes the shell infinitely reusable:
swap the props and you get a completely different UI without touching the shell.
This pattern is ideal when you need layout consistency but fully different inner components.`;

const HIDDEN_ITEMS = [
  { name: 'MemberForm',    reason: 'Guest journey injects GuestForm into formSlot instead' },
  { name: 'MemberSummary', reason: 'Guest journey injects GuestSummary into summarySlot instead' },
  { name: 'LoyaltyBlock',  reason: 'Not passed as a slot — guest has no loyalty data' },
];

export default function GuestJourneyPage() {
  const { journey } = useJourney();

  return (
    <PageLayout
      title="Checkout"
      pattern="Pattern 2 · Slot / Render Props"
      patternNumber={2}
      patternExplanation={EXPLANATION}
      hiddenItems={HIDDEN_ITEMS}
    >
      <div className="bg-sky-50 border border-sky-100 rounded-lg px-4 py-3 text-xs text-sky-700 font-mono">
        <strong>GuestJourneyPage</strong> → injects GuestForm + GuestSummary into CheckoutShell slots
      </div>

      <CheckoutShell
        journey={journey}
        headerSlot={
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">Guest Checkout</h2>
              <p className="text-sm text-gray-500 mt-0.5">Fast checkout — no account needed</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold text-blue-700">Guest Mode</span>
            </div>
          </div>
        }
        formSlot={<GuestForm />}
        summarySlot={<GuestSummary />}
      />
    </PageLayout>
  );
}
