/* eslint-disable import/no-extraneous-dependencies */

import {
  byRole,
  byTestId,
  createPageObject,
  ErrorFragment,
  getElement,
} from '@atlassian/commerce-test-library';

import { PaymentFragment } from './payment-fragment';

export const SummaryPage = createPageObject({
  scope: 'summaryStepDisplayed',
  selectors: {
    header: byRole('heading', {
      level: 1,
      name: /Confirm your billing details/i,
    }),
    summaryStepDisplayed: byTestId(
      'commerce.payment-flow.summary-step--display',
    ),
    policyCheckbox: byRole('checkbox', { name: /I agree/ }),
    subscribe: byTestId('commerce-payment-flow.src.ui.submit-button'),
    back: byRole(`button`, { name: /back/i }),
  },
  actions: (page, scheduleCallBack, then, selectors) => ({
    then,

    waitTillSettled() {
      scheduleCallBack(async () => {
        await page.waitTillPresent('header');
        await page.waitForElementToBeSettled('subscribe');
      });

      return this;
    },

    subscribe() {
      scheduleCallBack(async () => {
        await page.click('subscribe');
      });

      return this;
    },

    acceptPolicy() {
      scheduleCallBack(async () => {
        await page.click('policyCheckbox');
      });

      return this;
    },

    back() {
      scheduleCallBack(async () => {
        page.click('back');
      });

      return this;
    },

    errorFragment() {
      const scope = getElement(selectors.summaryStepDisplayed);
      return ErrorFragment(scope);
    },

    paymentFragment() {
      const scope = getElement(selectors.summaryStepDisplayed);
      return PaymentFragment(scope);
    },

    async subscribeButtonEnabled() {
      return !(await page.hasAttribute('subscribe', 'disabled'));
    },
  }),
});
