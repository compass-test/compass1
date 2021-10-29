import React, { useState } from 'react';

import { CreditCardPaymentMethod, PaymentMethod } from '../common/types';
import {
  amexPaymentMethod,
  deferredPaymentMethod,
  longPaymentMethodsList,
  masterPaymentMethod,
  unrecognizedPaymentMethod,
  visaPaymentMethod,
  visaPaymentMethodWithName,
} from '../services/mocks';

import {
  PaymentMethodElement,
  PaymentMethodPanel,
  PaymentMethodsWallet,
} from './index';

export const VisaPaymentMethod = () => (
  <PaymentMethodPanel paymentMethod={visaPaymentMethod} />
);

export const MastercardPaymentMethod = () => (
  <PaymentMethodPanel paymentMethod={masterPaymentMethod} />
);

export const AmexPaymentMethod = () => (
  <PaymentMethodPanel paymentMethod={amexPaymentMethod} />
);

export const NoNamePaymentMethod = () => (
  <PaymentMethodPanel
    paymentMethod={{
      ...visaPaymentMethod,
      card: { ...visaPaymentMethod.card, brand: 'noname' },
    }}
  />
);

export const PaymentMethodWithName = () => (
  <PaymentMethodPanel paymentMethod={visaPaymentMethodWithName} />
);

export const PaymentMethodWithEditButton = () => (
  <PaymentMethodPanel
    paymentMethod={visaPaymentMethod}
    onEdit={() => alert('You editted the thing!')}
  />
);

export const PaymentMethodWithLongName = () => (
  <PaymentMethodPanel
    paymentMethod={{
      ...visaPaymentMethod,
      card: {
        ...visaPaymentMethod.card,
        name: 'Thelongestnameever Thelongestsurnameever',
      },
    }}
  />
);

export const UnrecognizedPaymentMethod = () => (
  <PaymentMethodPanel paymentMethod={unrecognizedPaymentMethod} />
);

export const DeferredPaymentMethod = () => (
  <PaymentMethodPanel paymentMethod={deferredPaymentMethod} />
);

export const BorderlessPaymentMethod = () => (
  <PaymentMethodElement paymentMethod={visaPaymentMethod} />
);

export const WalletExampleWithVisaSelectedMethod = () => {
  const [selectedPaymentMethod, setSelected] = useState<
    CreditCardPaymentMethod | undefined
  >(visaPaymentMethod);
  const [paymentMethodList] = useState<PaymentMethod[]>(longPaymentMethodsList);

  return (
    <PaymentMethodsWallet
      selectedPaymentMethod={selectedPaymentMethod}
      defaultPaymentMethod={visaPaymentMethod}
      paymentMethodsList={paymentMethodList}
      onPaymentMethodSelected={(selectedPaymentMethod) => {
        setSelected(selectedPaymentMethod);
      }}
    />
  );
};

export const WalletExampleWithAmexSelectedMethod = () => {
  const [selectedPaymentMethod, setSelected] = useState<
    CreditCardPaymentMethod | undefined
  >(amexPaymentMethod);
  const [paymentMethodList] = useState<PaymentMethod[]>(longPaymentMethodsList);

  return (
    <PaymentMethodsWallet
      selectedPaymentMethod={selectedPaymentMethod}
      defaultPaymentMethod={visaPaymentMethod}
      paymentMethodsList={paymentMethodList}
      onPaymentMethodSelected={(selectedPaymentMethod) => {
        setSelected(selectedPaymentMethod);
      }}
    />
  );
};

export const WalletExampleWithoutSelectedMethod = () => {
  const [selectedPaymentMethod, setSelected] = useState<
    CreditCardPaymentMethod | undefined
  >();
  const [paymentMethodList] = useState<PaymentMethod[]>(longPaymentMethodsList);

  return (
    <PaymentMethodsWallet
      selectedPaymentMethod={selectedPaymentMethod}
      paymentMethodsList={paymentMethodList}
      onPaymentMethodSelected={(selectedPaymentMethod) => {
        setSelected(selectedPaymentMethod);
      }}
    />
  );
};
