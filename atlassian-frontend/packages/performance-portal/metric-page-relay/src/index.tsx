import React from 'react';

import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';

import { Loading } from '@atlassian/performance-portal-common';

import { metricResource } from './services/resources';

const LazyMetricPageComponent = lazyForPaint(
  () => import(/* webpackChunkName: "performance-portal-metric" */ './main'),
);

export const routes = {
  metricPage: {
    name: 'METRIC',
    path: '/metric/:eventKey',
    component: () => (
      <LazySuspense fallback={<Loading />}>
        <LazyMetricPageComponent />
      </LazySuspense>
    ),
    resources: [metricResource],
  },
};
