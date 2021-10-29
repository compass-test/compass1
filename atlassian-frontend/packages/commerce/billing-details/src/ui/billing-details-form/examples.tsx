import React, { useState } from 'react';

import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';

import { BillingDetails } from '../../common/types';
import { australiaStates } from '../../common/utils/billing-country-states/mocks';
import { defaultCountries } from '../../common/utils/billing-country/mocks';
import { successScenariosForDefaultCountries } from '../../mocks';
import {
  fullBillingDetails,
  minimalBillingDetails,
} from '../../services/billing-details/mocks';

import {
  BillingDetailsFields,
  BillingDetailsForm,
  BillingDetailsFormFrame,
} from './index';

const logValues = (values: BillingDetails) => {
  // eslint-disable-next-line no-console
  console.log(values);
};

type EmptyFormExampleProps = {
  onSubmit?: (data: BillingDetails) => void;
};

export const EmptyForm = ({ onSubmit }: EmptyFormExampleProps) => (
  <BillingDetailsForm
    countries={defaultCountries}
    countryStates={{}}
    onSubmit={onSubmit || logValues}
  />
);

export const MinimallyPreFilledForm = () => (
  <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
    <BillingDetailsForm
      initialValues={minimalBillingDetails}
      countryStates={australiaStates}
      countries={defaultCountries}
      onSubmit={logValues}
    />
  </CommerceMockedEnvironment>
);

export const FullyPreFilledForm = ({ onSubmit }: EmptyFormExampleProps) => (
  <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
    <BillingDetailsForm
      initialValues={fullBillingDetails}
      countries={defaultCountries}
      countryStates={australiaStates}
      onSubmit={onSubmit || logValues}
    />
  </CommerceMockedEnvironment>
);

export const ExternallySubmittingForm = () => {
  const [data, setData] = useState<BillingDetails>();
  return (
    <div style={{ width: '400px' }}>
      <BillingDetailsFormFrame
        initialValues={minimalBillingDetails}
        onSubmit={(values: BillingDetails) => setData(values)}
      >
        <BillingDetailsFields
          countries={defaultCountries}
          sharedCountryStates={australiaStates}
        />
      </BillingDetailsFormFrame>
      <pre>{data}</pre>
    </div>
  );
};
