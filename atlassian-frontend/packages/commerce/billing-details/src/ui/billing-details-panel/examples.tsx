import React from 'react';

import {
  bareBonesBillingDetails,
  fullBillingDetails,
  minimalBillingDetails,
} from '../../mocks';

import {
  BillingAddressDetails,
  BillingDetailsElement,
  BillingDetailsInline,
  BillingDetailsPanel,
} from './index';

export const FullBillingAddressDetails = () => (
  <BillingAddressDetails {...fullBillingDetails} />
);
export const FullBillingDetailsInline = () => (
  <BillingDetailsInline billingDetails={fullBillingDetails} />
);

export const MinimalBillingDetailsInline = () => (
  <BillingDetailsInline billingDetails={minimalBillingDetails} />
);

export const BareBonesBillingDetailsInline = () => (
  <BillingDetailsInline billingDetails={bareBonesBillingDetails} />
);

export const EmptyBillingDetailsInline = () => (
  <BillingDetailsInline billingDetails={{}} />
);

export const FullBillingDetailsElement = () => (
  <BillingDetailsElement billingDetails={fullBillingDetails} />
);

export const MinimalBillingDetailsElement = () => (
  <BillingDetailsElement billingDetails={minimalBillingDetails} />
);

export const BareBonesBillingDetailsElement = () => (
  <BillingDetailsElement billingDetails={bareBonesBillingDetails} />
);

export const EmptyBillingDetailsElement = () => (
  <BillingDetailsElement billingDetails={{}} />
);

export const FullBillingDetailsPanel = () => (
  <BillingDetailsPanel billingDetails={fullBillingDetails} />
);

export const MinimalBillingDetailsPanel = () => (
  <BillingDetailsPanel billingDetails={minimalBillingDetails} />
);

export const BareBonesBillingDetailsPanel = () => (
  <BillingDetailsPanel billingDetails={bareBonesBillingDetails} />
);

export const EmptyBillingDetailsPanel = () => (
  <BillingDetailsPanel billingDetails={{}} />
);

export const EditableBillingDetailsPanel = () => (
  <BillingDetailsPanel
    billingDetails={minimalBillingDetails}
    onEdit={() => {
      alert('editing!!!');
    }}
  />
);
