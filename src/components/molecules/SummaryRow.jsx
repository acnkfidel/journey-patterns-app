export default function SummaryRow({ label, value, highlight, divider = false }) {
  const valueColor =
    highlight === 'green' ? 'text-green-600' :
    divider              ? 'text-gray-900 font-semibold' :
    'text-gray-700';

  return (
    <div className={`flex justify-between text-sm ${divider ? 'border-t border-gray-100 pt-2 font-semibold' : ''}`}>
      <span className="text-gray-500">{label}</span>
      <span className={`font-medium ${valueColor}`}>{value}</span>
    </div>
  );
}
