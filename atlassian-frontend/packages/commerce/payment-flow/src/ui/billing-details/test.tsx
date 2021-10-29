/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { render } from '@testing-library/react';

import { BillingDetailsPage } from '@atlassian/commerce-billing-details/page-objects';

import { BillingFlowExample } from './examples';

describe('Billing flow', () => {
  test('Steps should flow', async () => {
    let onComplete = jest.fn();
    const savePromise = new Promise((resolve) =>
      onComplete.mockImplementation(resolve),
    );

    render(<BillingFlowExample onComplete={onComplete} />);

    await BillingDetailsPage
      //
      .waitTillSettled()
      .shouldBeAtPage()
      .submit();

    // saving is a little async
    await savePromise;

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        billingDetails: {
          name: expect.any(String),
          postalAddress: {
            country: expect.any(String),
            city: expect.any(String),
            line1: expect.any(String),
            line2: expect.any(String),
            state: expect.any(String),
            postcode: expect.any(String),
          },
          taxId: expect.any(String),
        },
        changed: false,
      }),
    );
  });
});
