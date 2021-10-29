import React from 'react';

import { render } from '@testing-library/react';

import { BillingDetailsPage } from '@atlassian/commerce-billing-details/page-objects';
import { checkA11y } from '@atlassian/commerce-test-library';

import { AddPaymentDetailsWithCancelFlowExample } from '../examples/02-add-payment-details-inc-cancel-vr';
import {
  PaymentMethodPage,
  SummaryPage,
} from '../src/common/utils/page-objects';

const cardDetails = {
  cardNumber: '4242424242424242',
  cardHolder: 'Cristiano Ronaldo',
  expiry: '02/22',
  cvc: '123',
};

describe('aXe audit', () => {
  test('Billing details page should not fail an aXe audit', async () => {
    const { container } = render(<AddPaymentDetailsWithCancelFlowExample />);

    await BillingDetailsPage.waitTillSettled();
    await checkA11y(container);
  });

  test('Payment page should not fail an aXe audit', async () => {
    const { container } = render(<AddPaymentDetailsWithCancelFlowExample />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    await PaymentMethodPage
      //
      .shouldBeAtPage()
      .waitTillSettled();

    await checkA11y(container);
  });

  test('Summary page should not fail an aXe audit', async () => {
    const { container } = render(<AddPaymentDetailsWithCancelFlowExample />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .submit();

    await PaymentMethodPage
      //
      .shouldBeAtPage()
      .waitTillSettled()
      .fillCardDetails(cardDetails)
      .next();

    await SummaryPage
      //
      .waitTillSettled();

    await checkA11y(container);
  });
});
