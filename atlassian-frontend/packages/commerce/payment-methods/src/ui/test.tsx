/* eslint-disable-next-line import/no-extraneous-dependencies */

import React from 'react';

import { render } from '@testing-library/react';

import {
  byTestId,
  pageActions,
  queryElement,
  waitTillPresent,
} from '@atlassian/commerce-test-library';

import {
  amexPaymentMethod,
  deferredPaymentMethod,
  masterPaymentMethod,
  visaPaymentMethod,
} from '../services/mocks';

import {
  VisaPaymentMethod,
  WalletExampleWithVisaSelectedMethod,
} from './examples';

import { PaymentMethodPanel, PaymentMethodsWallet } from './index';

const editButton = byTestId('commerce-payment-methods.src.ui.edit-button');

describe('PaymentMethodPanel', () => {
  test('should not render edit by default', async () => {
    render(<VisaPaymentMethod />);
    expect(queryElement(editButton)).not.toBeInTheDocument();
  });

  test('should render edit button for credit card when callback is defined', async () => {
    const onEditClick = jest.fn();

    render(
      <PaymentMethodPanel
        paymentMethod={visaPaymentMethod}
        onEdit={onEditClick}
      />,
    );

    await pageActions.click(editButton);
    expect(onEditClick).toHaveBeenCalled();
  });

  test('should not render edit for deferred payment method even if callback is defined', async () => {
    render(
      <PaymentMethodPanel
        paymentMethod={deferredPaymentMethod}
        onEdit={() => {}}
      />,
    );
    expect(queryElement(editButton)).not.toBeInTheDocument();
  });
});

describe('Payment methods wallet', () => {
  test('goes into full list mode when clicking view more ', async () => {
    render(<WalletExampleWithVisaSelectedMethod />);
    const viewMoreButton = byTestId(
      /commerce-payment-methods.wallet.view-more/i,
    );
    await pageActions.click(viewMoreButton);

    await waitTillPresent(
      byTestId(/commerce-payment-methods.wallet.payment-list.expanded/i),
    );
  });

  test('Calls provided callback with selected payment method when payment method panel is clicked', async () => {
    const paymentMethodSelected = jest.fn();
    render(
      <PaymentMethodsWallet
        selectedPaymentMethod={visaPaymentMethod}
        paymentMethodsList={[
          visaPaymentMethod,
          amexPaymentMethod,
          masterPaymentMethod,
        ]}
        onPaymentMethodSelected={paymentMethodSelected}
      />,
    );

    const amexCardPanel = byTestId(
      `commerce-payment-methods.wallet.payment-method-list-item-${amexPaymentMethod.id}`,
    );
    await pageActions.click(amexCardPanel);
    expect(paymentMethodSelected).toHaveBeenCalledWith(amexPaymentMethod);
  });
});
