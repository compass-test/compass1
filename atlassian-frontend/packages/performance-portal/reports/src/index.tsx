import React from 'react';

import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';

import { Loading } from '@atlassian/performance-portal-common';

const LazyComponent = lazyForPaint(
  () => import(/* webpackChunkName: "performance-portal-reports" */ './main'),
);

export const routes = {
  reportsPage: {
    name: 'REPORTS',
    path: '/reports/:product?',
    exact: true,
    component: () => (
      <LazySuspense fallback={<Loading />}>
        <LazyComponent />
      </LazySuspense>
    ),
  },
};
