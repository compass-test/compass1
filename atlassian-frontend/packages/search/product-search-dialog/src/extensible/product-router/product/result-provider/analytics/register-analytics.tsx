import React from 'react';
import { ProductStates } from '../../../../product-state-machine';
import { SearchItems } from '../../result-types';
import { useAnalyticsUpdate } from './use-analytics-update';
import { useProductStateAnalytics } from './product-state-analytics';

export interface RegisterAnalyticsProps {
  productState: ProductStates;
  preQueryItems: SearchItems;
  postQueryItems: SearchItems;
}

const RegisterAnalytics: React.FC<RegisterAnalyticsProps> = ({
  productState,
  preQueryItems,
  postQueryItems,
  children,
}) => {
  useAnalyticsUpdate(productState);
  useProductStateAnalytics(productState, preQueryItems, postQueryItems);

  return <>{children}</>;
};

export default RegisterAnalytics;
