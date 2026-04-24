import PageLayout from '../../components/templates/PageLayout';
import ScopedJourneyRouter, {
  ScopedRoute,
  useScopedLocation,
} from '../../router/ScopedJourneyRouter';
import StepProgress from './StepProgress';
import CartReviewStep from './steps/CartReviewStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import PaymentStep from './steps/PaymentStep';
import ConfirmationStep from './steps/ConfirmationStep';

const EXPLANATION = `Pattern 5 isolates a multi-step flow from the main browser router.
Step navigation (/step1 → /step2 → /step3 → /step4) is driven by a lightweight
React Context + useState pair — no nested Router, no browser history entries.

Why not MemoryRouter?
React Router v6's data-router API (createBrowserRouter + RouterProvider) forbids
nesting another <Router> inside it. ScopedJourneyRouter solves this by providing
the same API surface — useScopedNavigate() and useScopedLocation() — backed by
React state instead of a Router context.

What stays isolated:
• window.location — never changes; users cannot deep-link into step 3
• Browser back button — exits the flow entirely, not back to step 2
• Browser history — no entries added; the flow is invisible to the stack

What still works inside:
• useJourney() — JourneyProvider is in the outer tree, unaffected
• useAppSelector() — Redux Provider is in the outer tree, unaffected
• All atoms, molecules, and organisms — none of them care about routing`;

function ScopedFlowInner() {
  const { pathname: scopedPath } = useScopedLocation(); // in-memory path, never window.location
  const browserPath = window.location.pathname;         // real browser URL, never changes

  return (
    <div className="space-y-5">
      {/* URL isolation proof */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-400 font-mono mb-1.5">
            Browser URL — never changes
          </p>
          <p className="text-sm text-green-400 font-mono break-all">{browserPath}</p>
        </div>
        <div className="bg-rose-950 rounded-lg px-4 py-3">
          <p className="text-xs text-rose-300 font-mono mb-1.5">
            Scoped path — changes per step
          </p>
          <p className="text-sm text-rose-200 font-mono">{scopedPath}</p>
        </div>
      </div>

      {/* Step indicator — driven by useScopedLocation() */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
        <StepProgress />
      </div>

      {/* Step content — ScopedRoute renders only the matching path */}
      <ScopedRoute path="/step1" element={<CartReviewStep />} />
      <ScopedRoute path="/step2" element={<PersonalDetailsStep />} />
      <ScopedRoute path="/step3" element={<PaymentStep />} />
      <ScopedRoute path="/step4" element={<ConfirmationStep />} />
    </div>
  );
}

export default function ScopedCheckoutFlow() {
  return (
    <PageLayout
      title="Checkout"
      pattern="Pattern 5 · Scoped Routes"
      patternNumber={5}
      patternExplanation={EXPLANATION}
    >
      <div className="bg-rose-50 border border-rose-100 rounded-lg px-4 py-3 text-xs text-rose-700 font-mono">
        <strong>ScopedJourneyRouter</strong> (state-based) wraps this flow —
        navigate between steps without touching window.location
      </div>

      <ScopedJourneyRouter initialPath="/step1">
        <ScopedFlowInner />
      </ScopedJourneyRouter>
    </PageLayout>
  );
}
