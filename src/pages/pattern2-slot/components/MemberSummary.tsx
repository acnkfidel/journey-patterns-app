import SummaryRow from '../../../components/molecules/SummaryRow';
import Button from '../../../components/atoms/Button';

export default function MemberSummary() {
  return (
    <div className="space-y-3">
      <SummaryRow label="Subtotal"         value="₱1,200.00" />
      <SummaryRow label="Loyalty Discount" value="-₱120.00" highlight="green" />
      <SummaryRow label="Shipping"         value="₱150.00" />
      <SummaryRow label="Tax"              value="₱153.60" />
      <SummaryRow label="Total"            value="₱1,383.60" divider />

      <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        <p className="text-xs text-green-700 font-medium">You saved ₱120.00 with your member discount!</p>
        <p className="text-xs text-green-600 mt-0.5">+120 loyalty points will be credited after delivery.</p>
      </div>

      <Button variant="success" className="w-full justify-center">
        Confirm Member Order
      </Button>
    </div>
  );
}
