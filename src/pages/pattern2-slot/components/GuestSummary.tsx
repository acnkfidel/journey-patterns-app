import SummaryRow from '../../../components/molecules/SummaryRow';
import Button from '../../../components/atoms/Button';

export default function GuestSummary() {
  return (
    <div className="space-y-3">
      <SummaryRow label="Subtotal" value="₱1,200.00" />
      <SummaryRow label="Shipping" value="₱150.00" />
      <SummaryRow label="Tax"      value="₱168.00" />
      <SummaryRow label="Total"    value="₱1,518.00" divider />

      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-600">
        Create an account to earn loyalty points on this order.
      </div>

      <Button variant="primary" className="w-full justify-center bg-blue-600 hover:bg-blue-700">
        Confirm Guest Order
      </Button>
    </div>
  );
}
