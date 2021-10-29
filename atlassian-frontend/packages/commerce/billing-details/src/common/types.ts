import { Dispatch, SetStateAction } from 'react';

import { Mutator } from '@atlassian/commerce-final-form';
import {
  CountryIsoCode,
  Currency,
  Opaque,
  StateIsoCode,
} from '@atlassian/commerce-types';

export type BillingCountryState = {
  isoCode: StateIsoCode;
  name: string;
  localTaxId?: LocalTaxId;
};

export type BillingCountryStateLookup = Record<string, BillingCountryState[]>;

export type LocalTaxId = {
  displayName: string;
  description?: string;
  vat: boolean;
};

export type BillingCountry = {
  isoCode: CountryIsoCode;
  name: string;
  currency: Currency;
  localTaxId?: LocalTaxId;
  states: BillingCountryState[];
};

export type PostalAddress = {
  country: CountryIsoCode;
  state?: StateIsoCode;
  city: string;
  line1: string;
  line2?: string;
  postcode?: string;
};

export type BillingDetails = {
  postalAddress: PostalAddress;
  name: string;
  taxId?: string;
};

export type PartialBillingDetails = {
  postalAddress?: Partial<PostalAddress>;
  name?: string;
  taxId?: string;
};

export type ShipToDetailsId = Opaque<string>;
export type ShipToDetails = BillingDetails;
export type ShipToDetailsWithId = {
  id: ShipToDetailsId;
} & ShipToDetails;

export type PartialShipToDetails = PartialBillingDetails;

export type AddressFormValues = {
  organization: string;
  country: CountryIsoCode;
  'address-level2': string;
  'address-line1': string;
  'address-line2'?: string;
  'postal-code'?: string;
  'address-level1'?: StateIsoCode;
  'tax-id'?: string;
};
export type AddressFormField = keyof AddressFormValues;

export type AddressFieldErrorMessages = Partial<
  Record<AddressFormField, string>
>;
export type AddressFieldsModified = Partial<Record<AddressFormField, boolean>>;

export type ContextData = {
  displayCheckbox: Boolean;
  copyBillingAdressChecked: boolean;
  setCopyBillingAdressChecked: Dispatch<SetStateAction<boolean>>;
};

export type ValuesMutator = Mutator<
  AddressFormValues,
  Partial<AddressFormValues>
>;
