import { useMemo } from 'react';

import { useRouter } from 'react-resource-router';

import { browserMetrics } from '@atlassian/browser-metrics';
import {
  UI_BM3_ENABLED,
  UI_BM3_ENABLED_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';

let isInitial = true;

export const RouteListener = () => {
  const [routerState] = useRouter();
  const bm3Enabled = useFeatureFlag(
    UI_BM3_ENABLED,
    UI_BM3_ENABLED_DEFAULT_VALUE,
  );

  useMemo(() => {
    if (bm3Enabled.loading || !bm3Enabled.value) {
      return;
    }
    browserMetrics.startPageLoad({ isInitial });
    isInitial = false;
    // otherwise these conditions are removed
    // eslint-disable-next-line
  }, [
    routerState.route.name,
    routerState.match.params.componentType,
    routerState.match.params.componentId,
    routerState.match.params.extensionId,
    bm3Enabled.value,
    bm3Enabled.loading,
  ]);
  return null;
};
