import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { FormFooter } from '@atlaskit/form';
// eslint-disable-next-line import/no-extraneous-dependencies
import Spinner from '@atlaskit/spinner';
import {
  CommerceMockedEnvironment,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import {
  BillingDetails,
  BillingDetailsFields,
  BillingDetailsFormFrame,
  FormErrorMessage,
  useBillingCountriesService,
  useBillingDetailsService,
  useBillingDetailsUpdateService,
  useStatesForBillingDetailsCountryService,
} from '../src';
import {
  billingDetailsGenericFailureScenarios,
  successScenariosForDefaultCountries,
} from '../src/mocks';

const Example = () => {
  const { data, refresh } = useBillingDetailsService(TXA_ID);
  const { data: countries } = useBillingCountriesService();
  const {
    data: countryStates = {},
    loading: loadingCountryStates,
  } = useStatesForBillingDetailsCountryService(data);
  const { loading: updating, update, error } = useBillingDetailsUpdateService(
    TXA_ID,
  );

  if (!data || !countries || loadingCountryStates) {
    return <span>loading...</span>;
  }

  const submitFlowHandler = async (values: BillingDetails) => {
    await update(values);
    refresh();
  };

  return (
    <>
      <div style={{ width: '400px' }}>
        {updating ? <Spinner size="medium" /> : null}

        <BillingDetailsFormFrame
          initialValues={data}
          onSubmit={submitFlowHandler}
        >
          <BillingDetailsFields
            sharedCountryStates={countryStates}
            countries={countries}
          />
          <FormErrorMessage error={error} />
          <FormFooter>
            <ButtonGroup>
              <Button
                testId="commerce.billing-details.submit-button"
                type="submit"
                isDisabled={updating}
              >
                Update
              </Button>
            </ButtonGroup>
          </FormFooter>
        </BillingDetailsFormFrame>
      </div>
    </>
  );
};

export default () => (
  <CommerceMockedEnvironment
    scenarios={[
      ...billingDetailsGenericFailureScenarios,
      ...successScenariosForDefaultCountries,
    ]}
  >
    <Example />
  </CommerceMockedEnvironment>
);
