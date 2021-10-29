import React, { useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import { FormFooter } from '@atlaskit/form';
import {
  CommerceMockedEnvironment,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import {
  BillingDetailsFields,
  BillingDetailsFormFrame,
  useBillingCountriesService,
  useBillingDetailsService,
  useBillingDetailsUpdateService,
  useStatesForBillingDetailsCountryService,
} from '../src';
import {
  billingDetailsSuccessScenarios,
  successScenariosForDefaultCountries,
} from '../src/mocks';

const Example = () => {
  const [countryStatesFallback] = useState({});

  const { data, loading: loadingDetails } = useBillingDetailsService(TXA_ID);
  const { loading: updatingDetails, update } = useBillingDetailsUpdateService(
    TXA_ID,
  );
  const { data: countries } = useBillingCountriesService();
  const {
    data: countryStates,
    loading: loadingCountryStates,
  } = useStatesForBillingDetailsCountryService(data);

  if (
    !data ||
    !countries ||
    updatingDetails ||
    loadingCountryStates ||
    loadingDetails
  ) {
    return <span>loading...</span>;
  }

  return (
    <div style={{ width: '400px' }}>
      <BillingDetailsFormFrame
        initialValues={data}
        onSubmit={async (values) => {
          await update(values);
        }}
      >
        <BillingDetailsFields
          sharedCountryStates={countryStates || countryStatesFallback}
          countries={countries}
        />
        <FormFooter>
          <ButtonGroup>
            <LoadingButton
              type="submit"
              isDisabled={updatingDetails}
              isLoading={updatingDetails}
              testId="commerce.billing-details.submit-button"
            >
              Submit
            </LoadingButton>
          </ButtonGroup>
        </FormFooter>
      </BillingDetailsFormFrame>
    </div>
  );
};

export default () => (
  <CommerceMockedEnvironment
    scenarios={[
      ...billingDetailsSuccessScenarios,
      ...successScenariosForDefaultCountries,
    ]}
  >
    <Example />
  </CommerceMockedEnvironment>
);
