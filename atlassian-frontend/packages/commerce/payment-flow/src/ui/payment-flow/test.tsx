/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { render } from '@testing-library/react';

import { BillingDetailsPage } from '@atlassian/commerce-billing-details/page-objects';

import {
  PaymentMethodPage,
  SummaryPage,
} from '../../common/utils/page-objects';

import {
  AddPaymentDetailsFlowForCassie,
  AddPaymentDetailsFlowStripeCardConfirmationError,
  UpdatePaymentDetailsFlow,
  UpdatePaymentDetailsFlowStripeCardConfirmationError,
} from './examples';

const cardDetails = {
  cardNumber: '4242424242424242',
  cardHolder: 'Cristiano Ronaldo',
  expiry: '02/22',
  cvc: '123',
};

describe('Payment flow', () => {
  beforeEach(() => {
    // after we're going back to the payment method page we scroll to the error message
    // scrollIntoView is not implemented by js dom https://github.com/jsdom/jsdom/issues/1695
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  test('All steps should flow', async () => {
    render(<AddPaymentDetailsFlowForCassie />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .fillCardDetails(cardDetails)
      .next();

    await SummaryPage
      //
      .waitTillSettled()
      .acceptPolicy();

    expect(await SummaryPage.subscribeButtonEnabled()).toBeTruthy();
  });

  test('Back button at summary step should display newly added pm in wallet list', async () => {
    render(<AddPaymentDetailsFlowForCassie />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .fillCardDetails(cardDetails)
      .next();

    await SummaryPage
      //
      .waitTillSettled()
      .back();

    await PaymentMethodPage.waitTillSettled().shouldBeAtPage();

    const selectedCard = await PaymentMethodPage.paymentFragment().walletSelectedPaymentMethod();

    expect(selectedCard).toBeTruthy();
    // last four comming from stripeOverride
    expect(selectedCard!.cardNumber).toMatch('1234');
  });

  test('Validate back button transition', async () => {
    render(<AddPaymentDetailsFlowForCassie />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .waitTillSettled()
      .fillCardDetails(cardDetails)
      .next();

    await SummaryPage
      //
      .waitTillSettled()
      .back();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .back();

    await BillingDetailsPage
      //
      .shouldBeAtPage();
  });

  test('Validate payment confirmation error on summary screen moves back to the payment method screen', async () => {
    render(<AddPaymentDetailsFlowStripeCardConfirmationError />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .fillCardDetails(cardDetails)
      .next();

    await SummaryPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .subscribe();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage();

    const errorFragment = PaymentMethodPage.errorFragment();

    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toContain(
      'We are not able to use this credit card.',
    );
  });

  test('Validate payment confirmation error on summary screen moves back to the add payment method screen', async () => {
    render(<UpdatePaymentDetailsFlowStripeCardConfirmationError />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .addPaymentMethod()
      .fillCardDetails(cardDetails)
      .next();

    await SummaryPage
      //
      .waitTillSettled()
      .acceptPolicy()
      .subscribe();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage();

    const errorFragment = PaymentMethodPage.errorFragment();

    expect(await errorFragment.displayed()).toBeTruthy();
    expect(await errorFragment.content()).toContain(
      'We are not able to use this credit card.',
    );
  });

  test('Validate wallet selected payment method is propagated on summary screen', async () => {
    render(<UpdatePaymentDetailsFlow />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit()
      .waitTillSubmitRemoved();

    await PaymentMethodPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .paymentFragment()
      .selectPaymentMethod('4444');

    await PaymentMethodPage.next();

    const cardContent = await SummaryPage
      //
      .waitTillSettled()
      .paymentFragment()
      .cardContent();

    expect(cardContent.cardNumber).toMatch('4444');
  });
});
