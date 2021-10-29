import React from 'react';
import { render } from '@testing-library/react';
import { ProductStates } from '../../../../../product-state-machine';
import { GetDefaultFooter } from '../default-footer';

jest.mock('../../../../../advanced-search-footer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="advanced-search-footer" />,
  };
});

describe('Default Footer', () => {
  test.each`
    state
    ${ProductStates.PreQueryNoResult}
    ${ProductStates.PreQueryError}
    ${ProductStates.PostQueryError}
    ${ProductStates.PostQueryNoResult}
  `('should render a filler for $state', ({ state }) => {
    const { queryByTestId } = render(
      <GetDefaultFooter
        productState={state}
        urlGeneratorForNoResultsScreen={jest.fn()}
      />,
    );

    expect(queryByTestId('fault-screen-footer')).toBeInTheDocument();
    expect(queryByTestId('advanced-search-footer')).not.toBeInTheDocument();
  });

  test.each`
    state
    ${ProductStates.PostQuerySuccess}
    ${ProductStates.PreQuerySuccess}
    ${ProductStates.PostQueryLoading}
    ${ProductStates.PreQueryLoading}
  `('should render the advanced search footer for $state', ({ state }) => {
    const { queryByTestId } = render(
      <GetDefaultFooter
        productState={state}
        urlGeneratorForNoResultsScreen={jest.fn()}
      />,
    );

    expect(queryByTestId('fault-screen-footer')).not.toBeInTheDocument();
    expect(queryByTestId('advanced-search-footer')).toBeInTheDocument();
  });
});
