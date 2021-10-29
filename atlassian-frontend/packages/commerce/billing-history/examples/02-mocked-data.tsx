import React from 'react';

import {
  CommerceMockedEnvironment,
  IG_ID,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { Wrapper } from '../common/ui/storybook-wrapper/styled';
import { BillingHistory, useInvoicesService } from '../src';
import { invoicesSuccessScenarios } from '../src/mocks';

const Example = ({
  txaId,
}: {
  txaId: TransactionAccountId;
  invoiceGroupId: InvoiceGroupId;
}) => {
  const { loading, data: list, error } = useInvoicesService(txaId);
  if (error) {
    return <>Error</>;
  } else if (loading) {
    return <>Loading...</>;
  }

  return (
    <Wrapper data-testid="mocked-data">
      <h2>Invoices</h2>
      <BillingHistory invoiceData={list && list.data} />
    </Wrapper>
  );
};

export default () => (
  <CommerceMockedEnvironment scenarios={[...invoicesSuccessScenarios]}>
    <Example txaId={TXA_ID} invoiceGroupId={IG_ID} />
  </CommerceMockedEnvironment>
);
