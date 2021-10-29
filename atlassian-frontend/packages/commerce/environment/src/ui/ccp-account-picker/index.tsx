// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';

import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { useInvoiceGroupService } from '../../services/invoice-groups';
import { useTransactionAccountsService } from '../../services/transaction-accounts';

type Props = {
  children: (
    txaId: TransactionAccountId,
    invoiceGroupId: InvoiceGroupId,
  ) => React.ReactNode;
};

const SelectInvoiceGroup: React.FC<{
  txaId: TransactionAccountId;
  children: (invoiceGroupId: InvoiceGroupId) => React.ReactNode;
}> = ({ children, txaId }) => {
  const [selectedIgId, setIgId] = useState<InvoiceGroupId>();
  const { data: invoiceGroupIds, loading, error } = useInvoiceGroupService(
    txaId,
  );

  if (loading) {
    return <p>loading invoice groups...</p>;
  }

  if (error || invoiceGroupIds === undefined) {
    return (
      <p>
        <b>Error: {error}</b>
      </p>
    );
  }

  if (invoiceGroupIds.length === 0) {
    return (
      <p>
        Looks like your transaction account does not have any invoice groups. Go
        create one an then come back :)
      </p>
    );
  }

  const igId = selectedIgId ? selectedIgId : invoiceGroupIds[0];

  return (
    <>
      <label htmlFor="invoiceGroupId">invoice group id: </label>
      <select
        name="invoiceGroupId"
        value={igId}
        onChange={(event) => setIgId(event.target.value as InvoiceGroupId)}
      >
        {invoiceGroupIds.map((it) => (
          <option value={it}>{it}</option>
        ))}
      </select>
      <br />
      {children(igId)}
    </>
  );
};

// These transactional accounts are broken as they got removed from AR but still are returned because where not removed from PERMS.
const excludedTxa = [
  'd2b69bf9-4bf6-4d79-a09b-26d1ddefd3dc',
  'dfbb0732-eca8-4b7b-a8b9-7f347a16da44',
];

export const CcpAccountPicker: React.FC<Props> = ({ children }: Props) => {
  const [selectedTxaId, setTxaId] = useState<TransactionAccountId>();
  const { loading, data: txaIds, error } = useTransactionAccountsService();

  if (loading) {
    return <p>loading transaction accounts...</p>;
  }

  if (error || txaIds === undefined) {
    return <b>Error: {error}</b>;
  }

  const filteredTxa = txaIds.filter((it) => !excludedTxa.includes(it));

  if (filteredTxa.length === 0) {
    return (
      <p>
        Looks like you are not an billing admin for any transaction account. Ask
        #tintin-bac-squad for the permission to some account.
      </p>
    );
  }

  const txaId = selectedTxaId ? selectedTxaId : filteredTxa[0];

  return (
    <>
      <label htmlFor="transactionAccountId">transaction account id: </label>
      <select
        name="transactionAccountId"
        value={txaId}
        onChange={(event) =>
          setTxaId(event.target.value as TransactionAccountId)
        }
      >
        {filteredTxa.map((it) => (
          <option value={it}>{it}</option>
        ))}
      </select>
      <br />
      {txaId && (
        <SelectInvoiceGroup txaId={txaId}>
          {(ig: InvoiceGroupId) => children(txaId, ig)}
        </SelectInvoiceGroup>
      )}
    </>
  );
};
