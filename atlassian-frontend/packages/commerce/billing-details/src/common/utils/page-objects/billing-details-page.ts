/* eslint-disable import/no-extraneous-dependencies */

import {
  byLabelText,
  byRole,
  byTestId,
  createPageObject,
  ErrorFragment,
  findElement,
  pageActions,
  waitForLoadingToDisappear,
} from '@atlassian/commerce-test-library';

import { AddressDetailsFragment } from './address-details-fragment';

const countryStateSelect = async () =>
  await findElement(byLabelText('state-select'));

export const BillingDetailsPage = createPageObject({
  selectors: {
    header: byRole('heading', { name: /(Add|Update) your billing address/i }),
    stateFieldRenderComplete: byTestId(/state-field--complete/i),
    submit: byTestId('commerce.billing-details.submit-button'),
  },
  actions: (page, scheduleCallBack, then) => ({
    then,

    waitTillSettled() {
      scheduleCallBack(async () => {
        await page.waitTillPresent('stateFieldRenderComplete');
      });

      return this;
    },

    shouldBeAtPage() {
      scheduleCallBack(async () => {
        await page.waitTillPresent('header');
      });

      return this;
    },

    addressForm(scope?: HTMLElement) {
      const root = scope ? scope : page.getElement('header');
      return AddressDetailsFragment(root);
    },

    errorFragment() {
      const scope = page.getElement('submit').closest('form');
      return ErrorFragment(scope!);
    },

    submit() {
      scheduleCallBack(async () => {
        await page.click('submit');
        await waitForLoadingToDisappear();
      });

      return this;
    },

    waitTillSubmitRemoved() {
      scheduleCallBack(async () => {
        await page.waitTillRemoved('submit');
      });

      return this;
    },

    selectState(state: string) {
      scheduleCallBack(async () => {
        await pageActions.select(await countryStateSelect(), state);
      });

      return this;
    },
  }),
});
