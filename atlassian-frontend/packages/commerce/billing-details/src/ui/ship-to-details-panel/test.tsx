import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, pageActions } from '@atlassian/commerce-test-library';

import { ShipToDetailsPanel } from './index';

describe(ShipToDetailsPanel.name, () => {
  it('onEdit gets called when passed in', async () => {
    const mockedFn = jest.fn();
    render(<ShipToDetailsPanel shipToDetails={{}} onEdit={mockedFn} />);
    await pageActions.click(
      byTestId('commerce-billing-details.ship-to-details-panel.edit.button'),
    );
    expect(mockedFn).toBeCalled();
  });
});
