import { useMemo } from 'react';

import { useRouter } from 'react-resource-router';

import { browserMetrics } from '@atlassian/browser-metrics';

let isInitial = true;

export const RouteListener = () => {
  const [routerState] = useRouter();
  useMemo(() => {
    browserMetrics.startPageLoad({ isInitial });
    isInitial = false;
    // otherwise these conditions are removed
    // eslint-disable-next-line
  }, [routerState.route, routerState.match.params.metricKey]);
  return null;
};
