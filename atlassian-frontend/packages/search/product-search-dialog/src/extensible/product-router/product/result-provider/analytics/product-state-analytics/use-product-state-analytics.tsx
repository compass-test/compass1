import { useEffect, useRef } from 'react';
import { useAnalytics } from '../../../../../../common/analytics';
import { LimitedGasPayload } from '../../../../../../common/analytics/events';
import { ProductStates } from '../../../../../product-state-machine';
import { SearchItems } from '../../../result-types';
import { Product, useProductContext } from '../../../..';
import { useSessionUserInput } from '../../../../../user-input-provider';
import { useDialogExpansionContext } from '../../../../../dialog-expansion-context';
import { preQueryAnalyticsGenerator } from './pre-query-analytics-generator';
import { CommonAttributes } from './product-state-analytics-types';
import { postQueryAnalyticsGenerator } from './post-query-analytics-generator';

export const useProductStateAnalytics = (
  productState: ProductStates,
  preQueryItems: SearchItems,
  postQueryItems: SearchItems,
) => {
  useCommonConditions(productState, preQueryAnalyticsGenerator, preQueryItems);
  useCommonConditions(
    productState,
    postQueryAnalyticsGenerator,
    postQueryItems,
  );
};

const useCommonContext = (): [
  (payload: LimitedGasPayload) => void,
  Product | undefined,
  boolean,
  boolean,
  boolean,
  boolean,
] => {
  const { fireAnalyticsEvent } = useAnalytics();
  const { products, getActiveProduct } = useProductContext();
  const { isExpanded } = useDialogExpansionContext();
  const activeProduct = getActiveProduct();
  const isMultiProduct = products.length > 0;
  const { stickySearchEnabled, isStickyUpdated } = useSessionUserInput();

  return [
    fireAnalyticsEvent,
    activeProduct,
    isExpanded,
    isMultiProduct,
    stickySearchEnabled,
    isStickyUpdated,
  ];
};

export type AnalyticsGenerator = (
  productState: ProductStates,
  commonAttributes: CommonAttributes,
  previousState: ProductStates,
  searchItems: SearchItems,
) => LimitedGasPayload | undefined;

// for testing only
export const useCommonConditions = (
  productState: ProductStates,
  analyticsGenerator: AnalyticsGenerator,
  searchItems: SearchItems,
) => {
  const previousStateOfStateMachine = useRef<ProductStates>();
  const [
    fireAnalyticsEvent,
    activeProduct,
    isExpanded,
    isMultiProduct,
    isSticky,
    isStickyUpdated,
  ] = useCommonContext();

  useEffect(() => {
    if (
      isExpanded &&
      activeProduct &&
      activeProduct.id !== '' &&
      activeProduct.isDisplayed &&
      previousStateOfStateMachine.current
    ) {
      const commonAttributes = {
        activeProduct: activeProduct?.id,
        isMultiProduct,
        isSticky,
        isStickyUpdated,
      };
      const payload = analyticsGenerator(
        productState,
        commonAttributes,
        previousStateOfStateMachine.current,
        searchItems,
      );
      if (payload && Object.keys(payload).length > 0) {
        fireAnalyticsEvent(payload);
      }
    }
    previousStateOfStateMachine.current = productState;
  }, [
    productState,
    isExpanded,
    fireAnalyticsEvent,
    isMultiProduct,
    activeProduct,
    searchItems,
    analyticsGenerator,
    isSticky,
    isStickyUpdated,
  ]);
};
