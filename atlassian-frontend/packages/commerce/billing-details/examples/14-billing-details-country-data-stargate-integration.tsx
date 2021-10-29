import React, { useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { FormFooter } from '@atlaskit/form';
import { StargateProxyStgCookieCheck } from '@atlassian/commerce-environment/mocks';

import {
  BillingDetailsFields,
  BillingDetailsFormFrame,
  useBillingCountriesService,
} from '../src';

const Example = () => {
  const [countryStates] = useState({});
  const { data: countries } = useBillingCountriesService();

  if (!countries) {
    return <span>loading...</span>;
  }
  return (
    <>
      <div style={{ width: '400px' }}>
        <BillingDetailsFormFrame
          onSubmit={async (values) => {
            alert(JSON.stringify(values, null, 4));
          }}
        >
          <BillingDetailsFields
            sharedCountryStates={countryStates}
            countries={countries}
          />
          <FormFooter>
            <ButtonGroup>
              <Button type="submit">Submit</Button>
            </ButtonGroup>
          </FormFooter>
        </BillingDetailsFormFrame>
      </div>
    </>
  );
};

export default () => (
  <StargateProxyStgCookieCheck>
    <Example />
  </StargateProxyStgCookieCheck>
);
