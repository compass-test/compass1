// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { CcpAccountPicker } from '../ccp-account-picker';
import { StargateProxyStgCookieCheck } from '../stargate-proxy-check';

type Props = {
  children: (
    txaId: TransactionAccountId,
    invoiceGroupId: InvoiceGroupId,
  ) => React.ReactNode;
};

export const CommerceStartgateProxy: React.FC<Props> = ({
  children,
}: Props) => {
  return (
    <StargateProxyStgCookieCheck>
      <CcpAccountPicker children={children} />
    </StargateProxyStgCookieCheck>
  );
};
