import { useJourneyFeature } from '../../../hooks/useJourneyFeature';
import SectionBlock from '../../../components/molecules/SectionBlock';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';

export default function PromoSection() {
  const show = useJourneyFeature('showPromoCode');

  if (!show) return <SectionBlock title="PromoSection" hidden />;

  return (
    <SectionBlock title="PromoSection" subtitle="useJourneyFeature('showPromoCode') returned true">
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input placeholder="Enter promo code" focusColor="amber" />
          <Button variant="warning">Apply</Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['MEMBER20', 'GOLD15', 'WELCOME10', 'LOYALTY25'].map((code) => (
            <div
              key={code}
              className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span className="text-xs font-mono font-semibold text-amber-800">{code}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}
