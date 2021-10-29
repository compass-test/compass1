import { renderHook } from '@testing-library/react-hooks';
import { ProductStates } from '../../../../../../product-state-machine';
import { EMPTY_SEARCH_ITEMS } from '../../../result-provider-types';
import {
  AnalyticsGenerator,
  useCommonConditions,
  useProductStateAnalytics,
} from '../use-product-state-analytics';
import { POST_QUERY_ITEMS } from '../../../../../__mocks__/results';

const mockFireAnalyticsEvent = jest.fn();
let mockGetActiveProduct = jest.fn();

jest.mock('../../../../../../../common/analytics', () => {
  return {
    ...(jest.requireActual('../../../../../../../common/analytics') as Object),
    useAnalytics: () => ({
      fireAnalyticsEvent: mockFireAnalyticsEvent,
    }),
  };
});

jest.mock('../../../../..', () => ({
  useProductContext: () => ({
    getActiveProduct: mockGetActiveProduct,
    products: () => Array.from({ length: 2 }),
  }),
}));

jest.mock('../../../../../../dialog-expansion-context', () => ({
  useDialogExpansionContext: jest.fn(),
}));

import { useDialogExpansionContext } from '../../../../../../dialog-expansion-context';
import { SearchItems } from '../../../../result-types';

describe('useCommonConditions', () => {
  const getRenderAndAnalyticsGenerator = (
    analyticsGenerator = jest
      .fn()
      .mockReturnValue({ test: 'val' }) as AnalyticsGenerator,
  ) => {
    const defaultProps: [ProductStates, AnalyticsGenerator, SearchItems] = [
      ProductStates.PostQueryLoading,
      analyticsGenerator,
      EMPTY_SEARCH_ITEMS,
    ];

    const { rerender } = renderHook(
      (props: [ProductStates, AnalyticsGenerator, SearchItems]) =>
        useCommonConditions(...props),
      {
        initialProps: defaultProps,
      },
    );

    return { rerender, analyticsGenerator };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDialogExpansionContext as jest.Mock).mockImplementation(() => ({
      isExpanded: true,
    }));
    mockGetActiveProduct = jest.fn(() => ({
      id: 'product',
      isDisplayed: true,
    }));
  });
  it('should fire events if attributes are returned.', () => {
    const { rerender, analyticsGenerator } = getRenderAndAnalyticsGenerator();

    rerender([
      ProductStates.PostQuerySuccess,
      analyticsGenerator,
      POST_QUERY_ITEMS,
    ]);

    expect(analyticsGenerator).toBeCalledTimes(1);
    expect(mockFireAnalyticsEvent).toBeCalledTimes(1);
    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({ test: 'val' });
  });

  it('should not fire events if attributes are not returned.', () => {
    const { rerender, analyticsGenerator } = getRenderAndAnalyticsGenerator(
      jest.fn().mockReturnValue(undefined),
    );

    rerender([
      ProductStates.PostQuerySuccess,
      analyticsGenerator,
      POST_QUERY_ITEMS,
    ]);

    expect(analyticsGenerator).toBeCalledTimes(1);
    expect(mockFireAnalyticsEvent).toBeCalledTimes(0);
  });

  it('should not fire events if empty object is returned', () => {
    const { rerender, analyticsGenerator } = getRenderAndAnalyticsGenerator(
      jest.fn().mockReturnValue({}),
    );

    rerender([
      ProductStates.PostQuerySuccess,
      analyticsGenerator,
      POST_QUERY_ITEMS,
    ]);

    expect(analyticsGenerator).toBeCalledTimes(1);
    expect(mockFireAnalyticsEvent).toBeCalledTimes(0);
  });

  it('should not fire events for direct state setting', () => {
    const { analyticsGenerator } = getRenderAndAnalyticsGenerator();

    renderHook(() =>
      useProductStateAnalytics(
        ProductStates.PostQuerySuccess,
        EMPTY_SEARCH_ITEMS,
        EMPTY_SEARCH_ITEMS,
      ),
    );

    expect(analyticsGenerator).toBeCalledTimes(0);
    expect(mockFireAnalyticsEvent).toBeCalledTimes(0);
  });

  it('should not fire events if dialog is not expanded', () => {
    (useDialogExpansionContext as jest.Mock).mockImplementation(() => ({
      isExpanded: false,
    }));

    const { rerender, analyticsGenerator } = getRenderAndAnalyticsGenerator();

    rerender([
      ProductStates.PostQuerySuccess,
      analyticsGenerator,
      POST_QUERY_ITEMS,
    ]);

    expect(analyticsGenerator).toBeCalledTimes(0);
    expect(mockFireAnalyticsEvent).toBeCalledTimes(0);
  });

  it('should not fire events if product is not visible', () => {
    mockGetActiveProduct = jest.fn(() => ({
      id: 'product',
      isDisplayed: false,
    }));

    const { rerender, analyticsGenerator } = getRenderAndAnalyticsGenerator();

    rerender([
      ProductStates.PostQuerySuccess,
      analyticsGenerator,
      POST_QUERY_ITEMS,
    ]);

    expect(analyticsGenerator).toBeCalledTimes(0);
    expect(mockFireAnalyticsEvent).toBeCalledTimes(0);
  });
});
