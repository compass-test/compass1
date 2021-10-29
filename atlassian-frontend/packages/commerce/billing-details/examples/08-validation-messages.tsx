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
  useBillingCountriesService,
  useBillingDetailsService,
  useBillingDetailsUpdateService,
  useStatesForBillingDetailsCountryService,
} from '../src';
import {
  invalidBillingDetailsScenarios,
  successScenariosForDefaultCountries,
} from '../src/mocks';

const Example = () => {
  const { data, refresh } = useBillingDetailsService(TXA_ID);
  const { data: countries } = useBillingCountriesService();
  const { loading: updating, update } = useBillingDetailsUpdateService(TXA_ID);
  const {
    data: countryStates = {},
    loading: loadingCountryStates,
  } = useStatesForBillingDetailsCountryService(data);

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
          <FormFooter>
            <ButtonGroup>
              <Button
                type="submit"
                isDisabled={updating}
                testId="commerce.billing-details.submit-button"
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
      ...invalidBillingDetailsScenarios,
      ...successScenariosForDefaultCountries,
    ]}
  >
    <Example />
  </CommerceMockedEnvironment>
);
