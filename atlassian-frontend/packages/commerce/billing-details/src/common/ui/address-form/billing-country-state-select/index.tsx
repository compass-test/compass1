import React, { useMemo } from 'react';

import Select, { OptionType } from '@atlaskit/select';
import { StateIsoCode } from '@atlassian/commerce-types';

import { BillingCountryState } from '../../../../common/types';

const stateToOption = (state: BillingCountryState) => ({
  value: state.isoCode,
  label: state.name,
});

interface Props {
  value?: StateIsoCode;
  name?: string;
  onChange: (value: StateIsoCode | undefined) => void;
  countryStates: BillingCountryState[];
  loading: boolean;
  disabled: boolean;
}
export const BillingCountryStateSelect: React.FC<Props> = ({
  name,
  value,
  onChange,
  countryStates,
  loading,
  disabled,
}) => {
  // As react-select doesn't support providing just values, we need to map them to options
  // https://github.com/JedWatson/react-select/issues/2920
  const statesOptions = useMemo<OptionType[]>(
    () => countryStates.map(stateToOption),
    [countryStates],
  );

  const option = useMemo(
    () => statesOptions.find((it) => it.value === value) ?? null,
    [statesOptions, value],
  );

  return (
    <Select<OptionType>
      id="commerce-billing-details.state-select"
      name={name}
      value={option}
      aria-label="state-select"
      isMulti={false}
      isClearable={false}
      isLoading={loading}
      options={statesOptions}
      onChange={(opt) => onChange((opt as OptionType)?.value as StateIsoCode)}
      isDisabled={disabled || loading}
    />
  );
};
