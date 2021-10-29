import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import HomeButton from './index';

describe('<HomeButton />', () => {
  it('should render home button', () => {
    const { getByText } = render(
      <IntlProvider locale="en">
        <HomeButton onClick={jest.fn()} />
      </IntlProvider>,
    );
    expect(getByText('Migration Assistant home')).toBeInTheDocument();
  });
});
