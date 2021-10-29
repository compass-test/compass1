import React from 'react';

import { render } from '@testing-library/react';

import LoadingInlineValue from './index';

describe('LoadingInlineValue', () => {
  it('should render Spinner with loading transition at first', () => {
    const { getByText } = render(
      <LoadingInlineValue isLoading>fake value</LoadingInlineValue>,
    );
    expect(getByText('fake value')).toBeInTheDocument();
  });
});
