import React, { FC } from 'react';

import { LegalNote } from '../../common/ui/commerce-legal-notes/styled';

export const CommerceBasePolicyAgreementSubscriptionGeneric: FC = () => (
  <LegalNote data-testid="commerce-legal-notes.legal-note">
    Atlassian will also use these credit card details to automatically renew
    your subscription going forward.
  </LegalNote>
);

export const CommercePolicyAgreementSubscriptionGeneric: FC = () => (
  <>
    <CommerceBasePolicyAgreementSubscriptionGeneric />
    <LegalNote data-testid="commerce-legal-notes.tax-and-promotions">
      Promotions or tax benefits are reflected in your final invoice if they are
      applicable for your subscription.
    </LegalNote>
  </>
);
