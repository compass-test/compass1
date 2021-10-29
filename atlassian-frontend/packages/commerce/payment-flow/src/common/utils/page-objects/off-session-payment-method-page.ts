/* eslint-disable import/no-extraneous-dependencies */

import {
  byRole,
  byTestId,
  createPageObject,
  getElement,
  waitUntil,
} from '@atlassian/commerce-test-library';

import { StripeFragment } from './stripe-fragment';

export const OffSessionPaymentMethodPage = createPageObject({
  scope: 'flowDisplayed',
  selectors: {
    payNow: byTestId(
      'commerce.offsession-payment-method-confirm.submit-button',
    ),
    policyCheckbox: byRole('checkbox', { name: /I agree/i }),
    success: byRole('heading', { level: 1, name: /Success/i }),
    flowDisplayed: byTestId(/commerce-off-session-payment-flow.flow--display/i),
    updatePaymentMethod: byTestId(
      'commerce-payment-flow.offsession-update-payment-method',
    ),
  },
  actions: (page, scheduleCallBack, then, selectors) => ({
    then,

    waitTillSettled() {
      scheduleCallBack(async () => {
        await page.waitForElementToBeSettled('payNow');
      });

      return this;
    },

    payNow() {
      scheduleCallBack(async () => {
        await page.click('payNow');
      });

      return this;
    },

    acceptPolicy() {
      scheduleCallBack(async () => {
        await page.click('policyCheckbox');
        await waitUntil(() => {
          expect(
            page.getElement('policyCheckbox').getAttribute('aria-checked'),
          ).toEqual('true');
        });
      });

      return this;
    },

    stripeFragment() {
      const scope = getElement(selectors.updatePaymentMethod);
      return StripeFragment(scope);
    },
  }),
});
