import React from 'react';

import { fullPostalAddress, minimalPostalAddress } from '../../mocks';

import { AddressElement, AddressInline, AddressPanel } from './index';

export const EmptyAddressInline = () => <AddressInline />;

export const MinimalAddressInline = () => (
  <AddressInline {...minimalPostalAddress} />
);

export const FullAddressInline = () => (
  <AddressInline name="Company" {...fullPostalAddress} />
);

export const EmptyAddressElement = () => <AddressElement />;

export const MinimalAddressElement = () => (
  <AddressElement {...minimalPostalAddress} />
);

export const FullAddressElement = () => (
  <AddressElement name="Company" {...fullPostalAddress} />
);

export const EmptyAddressPanel = () => <AddressPanel />;

export const MinimalAddressPanel = () => (
  <AddressPanel {...minimalPostalAddress} />
);

export const FullAddressPanel = () => (
  <AddressPanel name="Company" {...fullPostalAddress} />
);
