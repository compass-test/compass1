import React from 'react';

import { PartialBillingDetails } from '../../common/types';
import {
  AddressElement,
  AddressInline,
  AddressPanel,
} from '../../common/ui/address-panel';

export const BillingDetailsInline: React.FC<{
  billingDetails: PartialBillingDetails;
}> = ({ billingDetails: { postalAddress = {}, name } }) => (
  <AddressInline name={name} {...postalAddress} />
);

/**
 * @deprecated use {@link BillingDetailsInline}
 */
export const BillingAddressDetails: React.FC<PartialBillingDetails> = ({
  postalAddress = {},
  name,
}) => <AddressInline name={name} {...postalAddress} />;

export const BillingDetailsElement: React.FC<{
  billingDetails: PartialBillingDetails;
}> = ({ billingDetails: { postalAddress = {}, name } }) => (
  <AddressElement name={name} {...postalAddress} />
);

export const BillingDetailsPanel: React.FC<{
  billingDetails: PartialBillingDetails;
  onEdit?(): void;
  testId?: string;
  editLabel?: string;
}> = ({ billingDetails: { postalAddress = {}, name, taxId }, onEdit }) => (
  <AddressPanel
    name={name}
    {...postalAddress}
    onEdit={onEdit}
    testId="commerce-billing-details.billing-details-panel.edit.button"
    taxId={taxId}
    editLabel="Edit billing details"
  />
);
