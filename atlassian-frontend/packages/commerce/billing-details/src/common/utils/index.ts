import { ValueType } from '@atlaskit/select';
import { CountryIsoCode, StateIsoCode } from '@atlassian/commerce-types';

import { AddressFieldsModified, AddressFormField } from '../types';

export const validateRequiredField = (
  value?: string | ValueType<CountryIsoCode | StateIsoCode>,
): string | void => {
  if (!value) {
    return 'Required field';
  }

  return;
};

export const anyFieldModified = (
  filedModified: AddressFieldsModified,
): boolean => {
  return Object.keys(filedModified).some((field) =>
    Boolean(filedModified[field as AddressFormField]),
  );
};
