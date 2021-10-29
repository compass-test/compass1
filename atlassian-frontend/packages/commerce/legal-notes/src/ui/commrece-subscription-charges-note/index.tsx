import React from 'react';

import { LegalNoteBlack } from '../../common/ui/commerce-legal-notes/styled';

export const CommerceSubscriptionChargeNote: React.FC = () => (
  <LegalNoteBlack>
    You won't be charged immediately. You will be charged for your subscription
    on the first day of each billing period using the payment method you've
    specified above. Atlassian will keep you payment info securely on file.
  </LegalNoteBlack>
);
