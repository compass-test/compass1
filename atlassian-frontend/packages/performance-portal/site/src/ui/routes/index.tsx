import React from 'react';

import { Redirect } from 'react-resource-router';

import { routes as catalogRoutes } from '@atlassian/performance-portal-catalog';
import { routes as metricRoutes } from '@atlassian/performance-portal-metric';
import { routes as metricPageWithRelayRoutes } from '@atlassian/performance-portal-metric-page-relay';
import { routes as reportRoutes } from '@atlassian/performance-portal-reports';

export const getRoutes = (isMetricPageWithRealyEnabled: boolean) => [
  ...Object.values(catalogRoutes),
  ...Object.values(
    isMetricPageWithRealyEnabled ? metricPageWithRelayRoutes : metricRoutes,
  ),
  ...Object.values(reportRoutes),
  {
    name: 'REDIRECT_TO_CATALOG',
    path: '/',
    component: () => <Redirect to="/catalog" />,
  },
];
