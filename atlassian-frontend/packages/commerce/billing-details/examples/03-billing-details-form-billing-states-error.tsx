import React, { useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { FormFooter } from '@atlaskit/form';
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
} from '../src';
import { billingDetailsSuccessScenarios } from '../src/mocks';

const Example = () => {
  const [countryStates] = useState({});
  const { data, refresh } = useBillingDetailsService(TXA_ID);
  const { loading: updating, update } = useBillingDetailsUpdateService(TXA_ID);
  const { data: countries } = useBillingCountriesService();

  if (!data || !countries) {
    return <span>loading...</span>;
  }
  return (
    <div style={{ width: '400px' }}>
      <BillingDetailsFormFrame
        initialValues={data}
        onSubmit={async (values: BillingDetails) => {
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
    </div>
  );
};

export default () => (
  <CommerceMockedEnvironment scenarios={billingDetailsSuccessScenarios}>
    <Example />
  </CommerceMockedEnvironment>
);
