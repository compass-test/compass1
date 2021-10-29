import React from 'react';

import { lazyForPaint, LazySuspense } from 'react-loosely-lazy';

import { Loading } from '@atlassian/performance-portal-common';

const LazyCatalogPageComponent = lazyForPaint(
  () => import(/* webpackChunkName: "performance-portal-catalog" */ './main'),
);

export const routes = {
  catalogPage: {
    name: 'CATALOG',
    path: '/catalog',
    exact: true,
    component: () => (
      <LazySuspense fallback={<Loading />}>
        <LazyCatalogPageComponent />
      </LazySuspense>
    ),
  },
};
