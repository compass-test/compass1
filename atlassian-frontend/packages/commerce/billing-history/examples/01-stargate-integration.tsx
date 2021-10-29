import React from 'react';

import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { Wrapper } from '../common/ui/storybook-wrapper/styled';
import { BillingHistory, useInvoicesService } from '../src';

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
    <Wrapper>
      <h2>Invoices</h2>
      <BillingHistory invoiceData={list && list.data} />
    </Wrapper>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa, ig) => <Example txaId={txa} invoiceGroupId={ig} />}
  </CommerceStartgateProxy>
);
