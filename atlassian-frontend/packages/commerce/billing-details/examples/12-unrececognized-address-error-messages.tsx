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
import { FieldContainer } from '@atlassian/commerce-final-form';

import {
  BillingDetails,
  BillingDetailsFieldsList,
  BillingDetailsFormFrame,
  FormErrorMessage,
  useBillingCountriesService,
  useBillingDetailsService,
  useBillingDetailsUpdateService,
  useStatesForBillingDetailsCountryService,
} from '../src';
import {
  invalidBillingDetailsScenariosWithFormMessages,
  successScenariosForDefaultCountries,
} from '../src/mocks';

const Example = () => {
  const { data, refresh } = useBillingDetailsService(TXA_ID);
  const { data: countries } = useBillingCountriesService();
  const { loading: updating, update, error } = useBillingDetailsUpdateService(
    TXA_ID,
  );
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
          <FieldContainer>
            <BillingDetailsFieldsList
              sharedCountryStates={countryStates}
              countries={countries}
            />
            <FormErrorMessage error={error} />
          </FieldContainer>
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
      ...invalidBillingDetailsScenariosWithFormMessages,
      ...successScenariosForDefaultCountries,
    ]}
  >
    <Example />
  </CommerceMockedEnvironment>
);
