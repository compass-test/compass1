/* eslint-disable import/no-extraneous-dependencies */

import {
  byTestId,
  createPageObject,
  ErrorFragment,
} from '@atlassian/commerce-test-library';

import { AddressDetailsFragment } from './address-details-fragment';

export const ShipToDetailsPage = createPageObject({
  selectors: {
    stateFieldRenderComplete: byTestId(/state-field--complete/i),
    submit: byTestId('commerce.ship-to-details.submit-button'),
    checkbox: byTestId(
      'commerce.billing-details.ship-to-details-form.checkbox--checkbox-label',
    ),
  },
  actions: (page, scheduleCallBack, then) => ({
    then,

    waitTillSettled() {
      scheduleCallBack(async () => {
        await page.waitTillPresent('stateFieldRenderComplete');
      });

      return this;
    },

    addressForm(scope: HTMLElement) {
      return AddressDetailsFragment(scope);
    },

    errorFragment() {
      const scope = page.getElement('submit').closest('form');
      return ErrorFragment(scope!);
    },

    submit() {
      scheduleCallBack(async () => {
        await page.click('submit');
      });

      return this;
    },

    clickBillToCheckbox() {
      scheduleCallBack(async () => {
        await page.click('checkbox');
      });

      return this;
    },
  }),
});
