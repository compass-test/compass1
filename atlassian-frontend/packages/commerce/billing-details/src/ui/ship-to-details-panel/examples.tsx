import React from 'react';

import {
  fullShipToDetails,
  minimalShipToDetails,
} from '../../services/ship-to-details/mocks';

import {
  ShipToDetailsElement,
  ShipToDetailsInline,
  ShipToDetailsPanel,
} from './index';

export const FullShipToDetailsInline = () => (
  <ShipToDetailsInline shipToDetails={fullShipToDetails} />
);

export const MinimalShipToDetailsInline = () => (
  <ShipToDetailsInline shipToDetails={minimalShipToDetails} />
);

export const EmptyShipToDetailsInline = () => (
  <ShipToDetailsInline shipToDetails={{}} />
);

export const FullShipToDetailsElement = () => (
  <ShipToDetailsElement shipToDetails={fullShipToDetails} />
);

export const MinimalShipToDetailsElement = () => (
  <ShipToDetailsElement shipToDetails={minimalShipToDetails} />
);

export const EmptyShipToDetailsElement = () => (
  <ShipToDetailsElement shipToDetails={{}} />
);

export const FullShipToDetailsPanel = () => (
  <ShipToDetailsPanel shipToDetails={fullShipToDetails} />
);

export const MinimalShipToDetailsPanel = () => (
  <ShipToDetailsPanel shipToDetails={minimalShipToDetails} />
);

export const EmptyShipToDetailsPanel = () => (
  <ShipToDetailsPanel shipToDetails={{}} />
);

export const EditableShippingDetailsPanel = () => (
  <ShipToDetailsPanel
    shipToDetails={minimalShipToDetails}
    onEdit={() => {
      alert('editing!!!');
    }}
  />
);
