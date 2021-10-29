import React from 'react';

import { render } from '@testing-library/react';

import InfoCard from './index';

describe('<InfoCard />', () => {
  it('should renders info card', () => {
    const { getByText } = render(
      <InfoCard title="Test Title" imageUrl="fakeUrl">
        Test Content
      </InfoCard>,
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
