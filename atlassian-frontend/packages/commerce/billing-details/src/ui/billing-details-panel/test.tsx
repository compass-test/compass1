import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, pageActions } from '@atlassian/commerce-test-library';

import { BillingDetailsPanel } from './index';

describe(BillingDetailsPanel.name, () => {
  it('onEdit gets called when passed in', async () => {
    const mockedFn = jest.fn();
    render(<BillingDetailsPanel billingDetails={{}} onEdit={mockedFn} />);
    await pageActions.click(
      byTestId('commerce-billing-details.billing-details-panel.edit.button'),
    );
    expect(mockedFn).toBeCalled();
  });
});
