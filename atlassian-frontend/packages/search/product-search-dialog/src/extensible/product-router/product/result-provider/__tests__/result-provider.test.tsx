import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import {
  ResultProvider,
  ResultProviderCompleteProps,
} from '../result-provider';
import { POST_QUERY_ITEMS, PRE_QUERY_ITEMS } from '../../../__mocks__/results';
import { RegisterAnalyticsProps } from '../analytics/register-analytics';
import { ProductStates } from '../../../..';

jest.mock('../../active-product', () => ({
  ActiveProduct: (props: any) => <div {...props} />,
}));

jest.mock('../result-renderer', () => ({
  ResultRenderer: (props: any) => <div {...props} />,
}));

jest.mock('../analytics/register-analytics', () => ({
  __esModule: true,
  default: (props: RegisterAnalyticsProps) => (
    <>
      <div data-testid="product-state">{props.productState}</div>
      <div data-testid="pre-query-items">
        <>size={props.preQueryItems.size}</>
        {JSON.stringify(props.preQueryItems)}
      </div>
      <div data-testid="post-query-items">
        <>size={props.postQueryItems.size}</>
        {JSON.stringify(props.postQueryItems)}
      </div>
    </>
  ),
}));

jest.mock('../../../../query-context', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../../product-router', () => {
  return {
    ...(jest.requireActual('../../../product-router') as Object),
    useProductContext: jest.fn().mockImplementation(() => ({
      getProduct: jest.fn().mockImplementation(() => ({
        isDisplayed: false,
        sectionIds: ['section1'],
      })),
    })),
  };
});

import { useProductContext } from '../../../product-router';
import { useQuery } from '../../../../query-context';

/**
 * IMPORTANT
 * These tests are supposed to be treated as the integration tests of search items and the statemachine.
 * Statemachine affects the search items depending on various conditions. These tests ensure that the
 * product state and the search items are always in sync.
 *
 * None of the state machine code is mocked here.
 * In future mock ONLY the external contexts on which the state machine depends.
 */

describe('ResultProvider', () => {
  let defaultProps: ResultProviderCompleteProps;

  beforeEach(() => {
    defaultProps = {
      preQueryItemSupplier: jest.fn().mockResolvedValueOnce(PRE_QUERY_ITEMS),
      postQueryItemSupplier: jest.fn().mockResolvedValueOnce(POST_QUERY_ITEMS),
      id: 'product',
      onRetry: () => null,
      urlGeneratorForNoResultsScreen: () => '',
    };
  });

  const getComponent = (overrides: Partial<ResultProviderCompleteProps> = {}) =>
    render(<ResultProvider {...defaultProps} {...overrides} />);

  it('should render with Register Analytics with empty results', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({ query: '' }));

    const { getByTestId } = getComponent();
    await screen.findByText(`${ProductStates.PreQueryLoading}`);
    expect(getByTestId('pre-query-items')).toHaveTextContent('size=0');
    expect(getByTestId('post-query-items')).toHaveTextContent('size=0');
  });

  describe('with active product', () => {
    let mockGetProduct = jest.fn().mockImplementation(() => ({
      isDisplayed: true,
      sectionIds: ['section1'],
    }));

    beforeEach(() => {
      (useProductContext as jest.Mock).mockImplementation(() => {
        return {
          getProduct: mockGetProduct,
        };
      });
    });

    describe('for prequery', () => {
      beforeEach(() => {
        (useQuery as jest.Mock).mockImplementation(() => ({ query: '' }));
      });

      it('should render with Register Analytics with pre query results', async () => {
        const { getByTestId } = getComponent();
        await screen.findByText(`${ProductStates.PreQueryLoading}`);
        await screen.findByText(`${ProductStates.PreQuerySuccess}`);
        expect(getByTestId('pre-query-items')).toHaveTextContent('size=10');
        expect(getByTestId('post-query-items')).toHaveTextContent('size=0');
      });
    });

    describe('for postquery', () => {
      beforeEach(() => {
        (useQuery as jest.Mock).mockImplementation(() => ({ query: 'test' }));
      });

      it('should render with Register Analytics with post query results for tab switch', async () => {
        mockGetProduct = jest.fn().mockImplementation(() => ({
          isDisplayed: false,
          sectionIds: ['section1'],
        }));
        const { getByTestId, rerender } = getComponent();

        mockGetProduct = jest.fn().mockImplementation(() => ({
          isDisplayed: true,
          sectionIds: ['section1'],
        }));

        rerender(<ResultProvider {...defaultProps} />);

        await screen.findByText(`${ProductStates.PostQueryLoading}`);
        await screen.findByText(`${ProductStates.PostQuerySuccess}`);
        expect(getByTestId('pre-query-items')).toHaveTextContent('size=0');
        expect(getByTestId('post-query-items')).toHaveTextContent('size=10');
      });
    });
  });
});
