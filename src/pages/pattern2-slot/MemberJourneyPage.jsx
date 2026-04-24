import { useJourney } from '../../context/JourneyContext';
import PageLayout from '../../components/templates/PageLayout';
import CheckoutShell from './CheckoutShell';
import MemberForm from './components/MemberForm';
import MemberSummary from './components/MemberSummary';

const EXPLANATION = `Pattern 2 passes entire components as props (slots) into a dumb shell.
MemberJourneyPage is the ONLY file that knows MemberForm and MemberSummary belong together.
CheckoutShell.jsx has zero journey logic — it renders whatever is injected into its slots.
Compare this file to GuestJourneyPage: the shell import is identical, only the slot values differ.
The pattern elegantly separates layout structure (shell) from content choice (journey page).
Adding a new journey requires only a new journey page file — the shell never changes.`;

const HIDDEN_ITEMS = [
  { name: 'GuestForm',    reason: 'Member journey injects MemberForm into formSlot instead' },
  { name: 'GuestSummary', reason: 'Member journey injects MemberSummary into summarySlot instead' },
];

export default function MemberJourneyPage() {
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
        <strong>MemberJourneyPage</strong> → injects MemberForm + MemberSummary into CheckoutShell slots
      </div>

      <CheckoutShell
        journey={journey}
        headerSlot={
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">Member Checkout</h2>
              <p className="text-sm text-gray-500 mt-0.5">Welcome back! Your loyalty discount is applied.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-semibold text-green-700">Member Mode</span>
            </div>
          </div>
        }
        formSlot={<MemberForm />}
        summarySlot={<MemberSummary />}
      />
    </PageLayout>
  );
}
