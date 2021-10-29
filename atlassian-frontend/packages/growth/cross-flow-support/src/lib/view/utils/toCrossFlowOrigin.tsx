import { OriginType } from '../../types';
import { CrossFlowOriginProduct } from '@atlassiansox/cross-flow-react';

export const toCrossFlowOrigin = (
  originProduct: OriginType,
): CrossFlowOriginProduct => {
  return originProduct as CrossFlowOriginProduct;
};
