import { useEffect } from 'react';
import { useQuery } from '../../../../query-context';
import { ProductStates } from '../../../../product-state-machine/product-state-machine-types';

/**
 * Updates the analytics contexts which depend on the current product state.
 */
export const useAnalyticsUpdate = (productState: ProductStates) => {
  const { setAdditionalAnalyticsContext } = useQuery();

  useEffect(() => {
    const isLoading =
      productState === ProductStates.PreQueryLoading ||
      productState === ProductStates.PostQueryLoading;

    setAdditionalAnalyticsContext({ type: 'isLoading', value: isLoading });
  }, [productState, setAdditionalAnalyticsContext]);
};
