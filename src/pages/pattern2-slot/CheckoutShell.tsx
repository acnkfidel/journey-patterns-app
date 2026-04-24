import type { ReactNode } from 'react';
import SectionBlock from '../../components/molecules/SectionBlock';
import type { JourneyKey } from '../../types/journey';

interface CheckoutShellProps {
  headerSlot:  ReactNode;
  formSlot:    ReactNode;
  summarySlot: ReactNode;
  journey:     JourneyKey;
}

export default function CheckoutShell({ headerSlot, formSlot, summarySlot }: CheckoutShellProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-3">
        <SectionBlock title="headerSlot" subtitle="Injected by the journey page — CheckoutShell is unaware of the content">
          {headerSlot}
        </SectionBlock>
      </div>
      <div className="lg:col-span-2">
        <SectionBlock title="formSlot" subtitle="Injected by the journey page — could be GuestForm or MemberForm">
          {formSlot}
        </SectionBlock>
      </div>
      <div className="lg:col-span-1">
        <SectionBlock title="summarySlot" subtitle="Injected by the journey page — could be GuestSummary or MemberSummary">
          {summarySlot}
        </SectionBlock>
      </div>
    </div>
  );
}
