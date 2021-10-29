import { TargetType } from '@atlassiansox/cross-flow-api-internals';
import { ProductKeys } from '@atlassiansox/product-store-react';

export const toCrossFlowTarget = (targetProduct: TargetType): ProductKeys => {
  return targetProduct as ProductKeys;
};
