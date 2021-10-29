import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
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
  emptyBillingDetailsScenarios,
  successScenariosForDefaultCountries,
} from '../src/mocks';

const Example = () => {
  const { data, refresh } = useBillingDetailsService(TXA_ID);
  const { loading: updating, update } = useBillingDetailsUpdateService(TXA_ID);
  const { data: countries } = useBillingCountriesService();
  const {
    data: countryStates = {},
    loading: loadingCountryStates,
  } = useStatesForBillingDetailsCountryService(data);

  if (!countries || loadingCountryStates) {
    return <span>loading...</span>;
  }
  return (
    <>
      <div style={{ width: '400px' }}>
        <CommerceMockedEnvironment
          scenarios={successScenariosForDefaultCountries}
        >
          <BillingDetailsFormFrame
            initialValues={data}
            onSubmit={async (values) => {
              await update(values);
              refresh();
            }}
          >
            <BillingDetailsFields
              sharedCountryStates={countryStates}
              countries={countries}
            />
            <FormFooter>
              <ButtonGroup>
                <Button type="submit" isDisabled={updating}>
                  Submit
                </Button>
              </ButtonGroup>
            </FormFooter>
          </BillingDetailsFormFrame>
        </CommerceMockedEnvironment>
      </div>
    </>
  );
};

export default () => (
  <CommerceMockedEnvironment scenarios={emptyBillingDetailsScenarios}>
    <Example />
  </CommerceMockedEnvironment>
);
