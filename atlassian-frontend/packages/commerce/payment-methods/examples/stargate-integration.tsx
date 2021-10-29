import React, { useState } from 'react';

import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import {
  PaymentMethod,
  PaymentMethodId,
  PaymentMethodPanel,
  useDefaultPaymentMethodService,
  useDefaultPaymentMethodUpdateService,
  useDefaultTransactionAccountPaymentMethodUpdateService,
  usePaymentMethodsService,
  useReplacePaymentMethodService,
} from '../src';

const PaymentMethodSelect: React.FC<{
  value?: PaymentMethodId;
  paymentMethods: PaymentMethod[];
  onUpdate: (id: PaymentMethodId) => void;
}> = ({ value, paymentMethods, onUpdate }) => (
  <select
    value={value}
    onChange={(event) => onUpdate(event.target.value as PaymentMethodId)}
  >
    {paymentMethods.map((it) => (
      <option value={it.id}>{it.id}</option>
    ))}
  </select>
);

const UpdatePaymentMethodForTxaExample: React.FC<{
  txaId: TransactionAccountId;
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod?: PaymentMethod;
  refresh: () => void;
}> = ({ paymentMethods, defaultPaymentMethod, txaId, refresh }) => {
  const {
    loading: updating,
    update,
    error: updatingError,
  } = useDefaultTransactionAccountPaymentMethodUpdateService(txaId);
  const [newDefault, setNewDefault] = useState(defaultPaymentMethod?.id);

  if (updatingError) {
    return <span>Updating error: {JSON.stringify(updatingError)}</span>;
  }
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (newDefault) {
            update(newDefault).then(refresh);
          } else {
            alert('new default payment method is not selected');
          }
        }}
      >
        <PaymentMethodSelect
          paymentMethods={paymentMethods}
          onUpdate={setNewDefault}
          value={newDefault}
        />
        <input type="submit" disabled={updating} />
      </form>
    </>
  );
};

const UpdatePaymentMethodExample: React.FC<{
  txaId: TransactionAccountId;
  invoiceGroupId: InvoiceGroupId;
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod?: PaymentMethod;
  refresh: () => void;
}> = ({
  paymentMethods,
  defaultPaymentMethod,
  txaId,
  invoiceGroupId,
  refresh,
}) => {
  const {
    loading: updating,
    update,
    error: updatingError,
  } = useDefaultPaymentMethodUpdateService(txaId, invoiceGroupId);
  const [newDefault, setNewDefault] = useState(defaultPaymentMethod?.id);

  if (updatingError) {
    return <span>Updating error: {JSON.stringify(updatingError)}</span>;
  }
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (newDefault) {
            update(newDefault).then(refresh);
          } else {
            alert('new default payment method is not selected');
          }
        }}
      >
        <PaymentMethodSelect
          paymentMethods={paymentMethods}
          onUpdate={setNewDefault}
          value={newDefault}
        />
        <input type="submit" disabled={updating} />
      </form>
    </>
  );
};

const ReplacePaymentMethodExample: React.FC<{
  txaId: TransactionAccountId;
  paymentMethods: PaymentMethod[];
  refresh: () => void;
}> = ({ paymentMethods, txaId, refresh }) => {
  const [oldPaymentMethod, setOldPaymentMethod] = useState<PaymentMethodId>(
    paymentMethods[0].id,
  );
  const [newPaymentMethod, setNewPaymentMethod] = useState<PaymentMethodId>();
  const {
    update: replace,
    loading: replacing,
    error: replacingError,
  } = useReplacePaymentMethodService(txaId, oldPaymentMethod);

  if (replacingError) {
    return <span>Replacing error: {JSON.stringify(replacingError)}</span>;
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (newPaymentMethod) {
            replace(newPaymentMethod).then(() => refresh());
          } else {
            alert('new payment method is not selected');
          }
        }}
      >
        <label>Old payment method</label>
        <PaymentMethodSelect
          paymentMethods={paymentMethods}
          onUpdate={setOldPaymentMethod}
          value={oldPaymentMethod}
        />
        <label>New payment method</label>
        <PaymentMethodSelect
          paymentMethods={paymentMethods}
          onUpdate={setNewPaymentMethod}
          value={newPaymentMethod}
        />
        <input type="submit" disabled={replacing} />
      </form>
    </>
  );
};

const Example = ({
  txaId,
  invoiceGroupId,
}: {
  txaId: TransactionAccountId;
  invoiceGroupId: InvoiceGroupId;
}) => {
  const { data: list, loading, refresh } = usePaymentMethodsService(txaId);
  const {
    data: defaultPaymentMethod,
    refresh: refreshDefault,
    loading: loadingDefault,
  } = useDefaultPaymentMethodService(txaId, invoiceGroupId);

  if (loading || list === undefined || loadingDefault) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <h2>Default payment method for transaction account</h2>
      {
        <pre>
          {JSON.stringify(
            list.filter((it) => it.default).map((it) => it.id),
            null,
            4,
          )}
        </pre>
      }
      <UpdatePaymentMethodForTxaExample
        txaId={txaId}
        paymentMethods={list}
        refresh={refresh}
      />
      <h2>Default payment method for invoice group</h2>
      {defaultPaymentMethod ? (
        <PaymentMethodPanel paymentMethod={defaultPaymentMethod} />
      ) : (
        <p>No default payment method is set on this account</p>
      )}
      <UpdatePaymentMethodExample
        txaId={txaId}
        paymentMethods={list}
        invoiceGroupId={invoiceGroupId}
        defaultPaymentMethod={defaultPaymentMethod}
        refresh={refreshDefault}
      />

      <h2>Replace payment method</h2>
      <ReplacePaymentMethodExample
        txaId={txaId}
        paymentMethods={list}
        refresh={() => {
          refresh();
          refreshDefault();
        }}
      />

      <h2>Payment method list</h2>
      <p>
        Note that the <code>default</code>flag on a payment method indicates if
        the payment method is default for transactional account, not for the
        invoice group.
      </p>
      <pre>{JSON.stringify(list, null, 4)}</pre>
    </>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa: TransactionAccountId, ig: InvoiceGroupId) => (
      <Example txaId={txa} invoiceGroupId={ig} />
    )}
  </CommerceStartgateProxy>
);
