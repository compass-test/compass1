import { useLayoutEffect } from 'react';

import { PageLoadMetric } from '@atlassian/browser-metrics';
import {
  UI_BM3_ENABLED,
  UI_BM3_ENABLED_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';

export type SubmitPageLoadMetricsProps = {
  metric: PageLoadMetric;
  data?: { [key: string]: string | boolean | number };
};

export const SubmitPageLoadMetrics = (props: SubmitPageLoadMetricsProps) => {
  const bm3Enabled = useFeatureFlag(
    UI_BM3_ENABLED,
    UI_BM3_ENABLED_DEFAULT_VALUE,
  );
  useLayoutEffect(() => {
    if (!bm3Enabled.loading && bm3Enabled.value) {
      props.metric.stop({ customData: props.data });
    }
  }, [props.metric, bm3Enabled.loading, bm3Enabled.value, props.data]);

  return null;
};
