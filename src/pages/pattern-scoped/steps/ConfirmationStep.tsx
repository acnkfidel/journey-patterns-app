import { useJourney } from '../../../context/JourneyContext';
import SectionBlock from '../../../components/molecules/SectionBlock';
import SummaryRow from '../../../components/molecules/SummaryRow';

export default function ConfirmationStep() {
  const { journey, config } = useJourney();

  return (
    <SectionBlock
      title="Step 4 — Order Confirmed"
      subtitle="Flow complete — the browser URL never left the entry route"
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center py-4 gap-2">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 text-base">Order Placed Successfully</h3>
          <p className="text-sm text-gray-500 text-center">
            {journey === 'member'
              ? `Thanks ${config.label}! +168 loyalty points have been queued.`
              : 'Your guest order has been confirmed. Create an account to earn points next time.'}
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-lg divide-y divide-gray-100">
          <SummaryRow label="Order #" value="ORD-20240001" />
          <SummaryRow label="Journey" value={`${config.label} (${journey})`} />
          <SummaryRow label="Total"   value={journey === 'member' ? '₱1,662.00' : '₱1,830.00'} />
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-lg px-4 py-3 space-y-1">
          <p className="text-xs text-rose-700 font-semibold">Scoped Route — what happened:</p>
          <p className="text-xs text-rose-600">
            4 steps navigated via state · Browser URL stayed at{' '}
            <span className="font-mono font-semibold">{window.location.pathname}</span> the entire time
          </p>
          <p className="text-xs text-rose-600">
            Pressing browser ← back exits the flow entirely, not back to step 3
          </p>
        </div>

        {/* Plain anchor — exits the ScopedJourneyRouter context via real browser navigation */}
        <a
          href="/"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          ← Return to Home
        </a>
      </div>
    </SectionBlock>
  );
}
