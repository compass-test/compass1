import React, { FC } from 'react';

import {
  CommerceLegalNoteStatement,
  CommerceSubscriptionChargeNote,
  CommerceVisaLegalNote,
  LegalNoteBlack,
} from '@atlassian/commerce-legal-notes';
import { getLinkTo } from '@atlassian/commerce-links';
import { PaymentMethod } from '@atlassian/commerce-payment-methods';

export const LegalNoteSelector: FC<{ paymentMethod?: PaymentMethod }> = ({
  paymentMethod,
}) => {
  if (paymentMethod?.type === 'DEFERRED') {
    return (
      <>
        <LegalNoteBlack>
          Need to change your payment method?{' '}
          <a
            aria-label="Contact us"
            target="blank"
            href={getLinkTo('support', 'en')}
          >
            Contact us
          </a>
        </LegalNoteBlack>
        <CommerceSubscriptionChargeNote />
        <CommerceLegalNoteStatement style="gray" />
      </>
    );
  }
  return (
    <>
      <CommerceSubscriptionChargeNote />
      <CommerceVisaLegalNote />
    </>
  );
};
