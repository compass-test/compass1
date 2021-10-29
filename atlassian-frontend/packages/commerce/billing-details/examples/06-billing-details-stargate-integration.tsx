import React, { useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { FormFooter } from '@atlaskit/form';
import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import { TransactionAccountId } from '@atlassian/commerce-types';

import {
  BillingDetailsFields,
  BillingDetailsFormFrame,
  useBillingCountriesService,
  useBillingDetailsService,
  useBillingDetailsUpdateService,
} from '../src';

const Example = ({ txa }: { txa: TransactionAccountId }) => {
  const [countryStates] = useState({});

  const { data, loading, refresh } = useBillingDetailsService(txa);
  const { loading: updating, update } = useBillingDetailsUpdateService(txa);
  const { data: countries } = useBillingCountriesService();

  if (loading || !countries) {
    return <span>loading...</span>;
  }
  return (
    <>
      <div style={{ width: '400px' }}>
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
      </div>
    </>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa) => <Example txa={txa} />}
  </CommerceStartgateProxy>
);
