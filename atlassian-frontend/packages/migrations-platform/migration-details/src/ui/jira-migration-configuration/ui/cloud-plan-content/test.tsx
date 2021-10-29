import React from 'react';

import { render } from '@testing-library/react';

import { BasicCloudPlanContent } from './examples';
import * as utils from './utils';

describe('<CloudPlanContent />', () => {
  it('should display correctly with multiple products', () => {
    const { getByText } = render(<BasicCloudPlanContent />);
    expect(
      getByText('Jira Work Management Cloud Free plan'),
    ).toBeInTheDocument();
    expect(getByText('Jira Software Cloud Standard plan')).toBeInTheDocument();
    expect(
      getByText('Jira Service Management Cloud Premium plan'),
    ).toBeInTheDocument();
  });

  it('should not re-render if the props unchanged', () => {
    const destinationCloudProducts = [
      {
        edition: 'free' as const,
        productKey: 'jira-core.ondemand' as const,
      },
    ];
    const spy = jest.spyOn(utils, 'getSupportedProductNamesAndEditions');
    const { rerender } = render(
      <BasicCloudPlanContent
        destinationCloudProducts={destinationCloudProducts}
      />,
    );

    // Re-render with the same props instance
    rerender(
      <BasicCloudPlanContent
        destinationCloudProducts={destinationCloudProducts}
      />,
    );
    expect(spy).toBeCalledTimes(1);
    spy.mockRestore();
  });
});
