import React from 'react';

import { CommercePolicyAgreementSubscription } from './index';

export const CommercePolicyAgreementSubscriptionDefault = () => (
  <CommercePolicyAgreementSubscription />
);

export const CommercePolicyAgreementSubscriptionWithStartingDate = () => (
  <CommercePolicyAgreementSubscription startingDate={<>Apr 9, 2020</>} />
);

export const CommercePolicyAgreementSubscriptionWithCost = () => (
  <CommercePolicyAgreementSubscription totalCost={<>$100</>} />
);

export const CommercePolicyAgreementMonthlySubscriptionWithStartingDateAndCost = () => (
  <CommercePolicyAgreementSubscription
    startingDate={<>Apr 9, 2020</>}
    totalCost={<>$100</>}
    renewalFrequency="monthly"
  />
);

export const CommercePolicyAgreementAnnualSubscriptionDefault = () => (
  <CommercePolicyAgreementSubscription renewalFrequency="annual" />
);

export const CommercePolicyAgreementAnnualSubscriptionWithStartingDateAndCost = () => (
  <CommercePolicyAgreementSubscription
    startingDate={<>Apr 9, 2020</>}
    totalCost={<>$1200</>}
    renewalFrequency="annual"
  />
);
