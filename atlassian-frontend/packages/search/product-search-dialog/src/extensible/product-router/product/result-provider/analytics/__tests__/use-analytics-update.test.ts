import { renderHook } from '@testing-library/react-hooks';
import { useAnalyticsUpdate } from '../use-analytics-update';
import { ProductStates } from '../../../../../product-state-machine/product-state-machine-types';

const mockSetAdditionalAnalyticsContext = jest.fn();

jest.mock('../../../../../query-context', () => ({
  useQuery: jest.fn(() => ({
    setAdditionalAnalyticsContext: mockSetAdditionalAnalyticsContext,
  })),
}));

const expectMap = {
  [ProductStates.PreQueryLoading]: true,
  [ProductStates.PostQueryLoading]: true,
  [ProductStates.PreQuerySuccess]: false,
  [ProductStates.PostQuerySuccess]: false,
  [ProductStates.PreQueryError]: false,
  [ProductStates.PostQueryError]: false,
  [ProductStates.PreQueryNoResult]: false,
  [ProductStates.PostQueryNoResult]: false,
};

describe('useAnalyticsUpdate', () => {
  for (const [productState, expectedIsLoading] of Object.entries(expectMap)) {
    it(`should set isLoading correctly for the state ${productState}`, () => {
      renderHook(() => useAnalyticsUpdate(productState as ProductStates));

      expect(mockSetAdditionalAnalyticsContext).toHaveBeenCalledTimes(1);
      expect(mockSetAdditionalAnalyticsContext).toBeCalledWith({
        type: 'isLoading',
        value: expectedIsLoading,
      });

      jest.clearAllMocks();
    });
  }
});
