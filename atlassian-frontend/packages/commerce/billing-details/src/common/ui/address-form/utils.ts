import { useField } from '@atlassian/commerce-final-form';

import {
  BillingCountry,
  BillingCountryState,
  ValuesMutator,
} from '../../../common/types';

export const formValuesMutator: ValuesMutator = (
  paramArr,
  formState,
  tools,
) => {
  const [formData] = paramArr;
  // 💡 Quick tip, make sure formData param is the correct shape!!!
  Object.keys(formData).map((key) => {
    tools.changeValue(formState, key, () => formData[key]);
  });
};

export const formValueMutator: ValuesMutator = (
  inputParams,
  formState,
  tools,
) => {
  const [name, value] = inputParams;
  tools.changeValue(formState, name, () => value);
};

export const useTaxLabelLocationObject = (
  countries: BillingCountry[],
  countryStates: BillingCountryState[],
) => {
  const {
    input: { value: selectedCountry },
  } = useField('country');
  const {
    input: { value: selectedCountryState },
  } = useField('address-level1');

  return {
    countryObject: selectedCountry
      ? countries.find((it) => it.isoCode === selectedCountry)
      : undefined,

    stateObject: selectedCountryState
      ? countryStates.find((it) => it.isoCode === selectedCountryState)
      : undefined,
  };
};
