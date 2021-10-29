import React, { PropsWithChildren } from 'react';

import { render } from '@testing-library/react';

import CustomerCentralProvider from '../customer-central-provider';

jest.mock('@apollo/client', () => ({
  __esModule: true,
  ApolloProvider: ({ children }: PropsWithChildren<{}>) => (
    <div data-testid="apollo-provider">{children}</div>
  ),
}));

jest.mock('../../index', () => () => ({
  CustomerCentralGraph: () => () => ({}),
}));

describe('<CustomerCentralProvider />', () => {
  it('should be a wrapper for Apollo Provider', () => {
    const { getByTestId } = render(
      <span>
        <CustomerCentralProvider>
          <div />
        </CustomerCentralProvider>
      </span>,
    );

    expect(getByTestId('apollo-provider')).toBeInTheDocument();
  });
});
