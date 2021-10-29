import React from 'react';

import { PartialShipToDetails } from '../../common/types';
import {
  AddressElement,
  AddressInline,
  AddressPanel,
} from '../../common/ui/address-panel';

export const ShipToDetailsInline: React.FC<{
  shipToDetails: PartialShipToDetails;
}> = ({ shipToDetails: { postalAddress = {}, name } }) => (
  <AddressInline name={name} {...postalAddress} />
);

export const ShipToDetailsElement: React.FC<{
  shipToDetails: PartialShipToDetails;
}> = ({ shipToDetails: { postalAddress = {}, name } }) => (
  <AddressElement name={name} {...postalAddress} />
);

export const ShipToDetailsPanel: React.FC<{
  shipToDetails: PartialShipToDetails;
  onEdit?: () => void;
  testId?: string;
  editLabel?: string;
}> = ({ shipToDetails: { postalAddress = {}, taxId, name }, onEdit }) => (
  <AddressPanel
    name={name}
    taxId={taxId}
    {...postalAddress}
    onEdit={onEdit}
    testId="commerce-billing-details.ship-to-details-panel.edit.button"
    editLabel="Edit shipping details"
  />
);
