/* eslint-disable import/no-extraneous-dependencies */

import {
  byLabelText,
  byTestId,
  createPageObject,
} from '@atlassian/commerce-test-library';

export const AddressDetailsFragment = (scope: HTMLElement) =>
  createPageObject({
    scope: scope,
    selectors: {
      company: byLabelText('Company name', { selector: 'input' }),
      country: byTestId('commerce-billing-details.src.ui.from.country-field'),
      city: byLabelText('City', { selector: 'input' }),
      address1: byLabelText('Address 1', { selector: 'input' }),
      address2: byLabelText('Address 2', { selector: 'input' }),
      state: byTestId('commerce-billing-details.state-select'),
      postCode: byLabelText('Postal code', { selector: 'input' }),
      taxId: byLabelText(/ABN|Tax ID/i, { selector: 'input' }),
    },
    actions: (page, scheduleCallBack, then) => ({
      then,

      fillCompany(company: string) {
        scheduleCallBack(async () => {
          await page.type('company', company);
          expect(await page.attributeValue('company', 'value')).toEqual(
            company,
          );
        });

        return this;
      },

      fillCity(city: string) {
        scheduleCallBack(async () => {
          await page.type('city', city);
          expect(await page.attributeValue('city', 'value')).toEqual(city);
        });

        return this;
      },

      selectCountry(state: string) {
        scheduleCallBack(async () => {
          await page.select('country', state);
        });

        return this;
      },

      selectState(state: string) {
        scheduleCallBack(async () => {
          await page.select('state', state);
        });

        return this;
      },

      fillLine1Address(address1: string) {
        scheduleCallBack(async () => {
          await page.type('address1', address1);
          expect(await page.attributeValue('address1', 'value')).toEqual(
            address1,
          );
        });

        return this;
      },

      fillLine2Address(address2: string) {
        scheduleCallBack(async () => {
          await page.type('address2', address2);
          expect(await page.attributeValue('address2', 'value')).toEqual(
            address2,
          );
        });

        return this;
      },

      fillPostalCode(postCode: string) {
        scheduleCallBack(async () => {
          await page.type('postCode', postCode);
          expect(await page.attributeValue('postCode', 'value')).toEqual(
            postCode,
          );
        });

        return this;
      },

      fillTaxId(taxId: string) {
        scheduleCallBack(async () => {
          await page.type('taxId', taxId);
          expect(await page.attributeValue('taxId', 'value')).toEqual(taxId);
        });

        return this;
      },

      fieldError(label: string) {
        return page.fieldError(label);
      },
    }),
  });
