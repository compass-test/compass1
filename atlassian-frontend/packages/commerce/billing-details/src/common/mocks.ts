import { CountryIsoCode, StateIsoCode } from '@atlassian/commerce-types';

import { PostalAddress } from './types';

export const minimalPostalAddress: PostalAddress = {
  country: 'AU' as CountryIsoCode,
  city: 'Sydney',
  line1: '341 George St',
};

export const partialPostalAddress: Partial<PostalAddress> = {
  city: 'Sydney',
};

export const fullPostalAddress: PostalAddress = {
  country: 'AU' as CountryIsoCode,
  city: 'Sydney',
  line1: 'Level 6',
  line2: '341 George St',
  state: 'NSW' as StateIsoCode,
  postcode: '2000',
};

export const fullPostalAddress2: PostalAddress = {
  country: 'AU' as CountryIsoCode,
  city: 'Brisbane',
  line1: '22',
  line2: '341 Brissy St',
  state: 'QLD' as StateIsoCode,
  postcode: '3000',
};
