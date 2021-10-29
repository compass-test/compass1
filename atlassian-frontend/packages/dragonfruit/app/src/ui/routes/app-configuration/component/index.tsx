import React from 'react';

import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';

import { Loading } from '../../../../common/ui';

const LazyComponent = lazyForPaint(() => import('./main'));

export default () => (
  <LazySuspense fallback={<Loading />}>
    <LazyComponent />
  </LazySuspense>
);
