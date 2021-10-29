/* eslint-disable import/no-extraneous-dependencies */
import {
  byRole,
  byTestId,
  createPageObject,
  ErrorFragment,
  getElement,
} from '@atlassian/commerce-test-library';

import { PaymentFragment } from './payment-fragment';
import { StripeFragment } from './stripe-fragment';

export const PaymentMethodPage = createPageObject({
  scope: 'paymentMethodRendered',
  selectors: {
    header: byRole('heading', {
      level: 1,
      name: /(Add|Update|Choose) your payment method/i,
    }),
    paymentMethodRendered: byTestId(
      /commerce-payment-flow.flow--(display|add)/i,
    ),
    next: byTestId('commerce.payment-flow.submit-button'),
    back: byRole('button', { name: /back/i }),
    addPaymentMethod: byRole('button', { name: /add payment method/i }),
  },
  actions: (page, scheduleCallBack, then, selectors) => ({
    then,

    waitTillSettled() {
      scheduleCallBack(async () => {
        await page.waitTillPresent('next');
      });

      return this;
    },

    shouldBeAtPage() {
      scheduleCallBack(async () => {
        await page.waitTillPresent('header');
      });

      return this;
    },

    fillCardDetails(cardDetails: {
      cardNumber: string;
      cardHolder: string;
      expiry: string;
      cvc: string;
    }) {
      scheduleCallBack(async () => {
        const scope = (await page.html()) as HTMLElement;
        await StripeFragment(scope).fillCardDetails(cardDetails);
      });

      return this;
    },

    next() {
      scheduleCallBack(async () => {
        await page.click('next');
      });

      return this;
    },

    back() {
      scheduleCallBack(async () => {
        await page.click('back');
      });

      return this;
    },

    addPaymentMethod() {
      scheduleCallBack(async () => {
        await page.click('addPaymentMethod');
      });

      return this;
    },

    errorFragment() {
      const scope = getElement(selectors.paymentMethodRendered);
      return ErrorFragment(scope!);
    },

    paymentFragment() {
      const scope = getElement(selectors.paymentMethodRendered);
      return PaymentFragment(scope!);
    },
  }),
});
