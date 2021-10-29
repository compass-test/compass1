import React, { Suspense } from 'react';
import {
  CrossProductSearchDialogProps,
  InternalProps,
} from './cross-product-search-dialog';
import { ProductSearchInputSkeleton } from '../common/product-search-input-skeleton';
import { withForwardRef } from '../utils/forward-ref';

const AsyncCrossProduct = React.lazy(
  () => import('./cross-product-search-dialog'),
);

export default withForwardRef(
  (props: CrossProductSearchDialogProps & InternalProps) => (
    <Suspense fallback={<ProductSearchInputSkeleton theme={props.theme} />}>
      <AsyncCrossProduct {...props} />
    </Suspense>
  ),
);
