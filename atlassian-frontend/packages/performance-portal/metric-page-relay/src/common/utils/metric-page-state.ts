import { createHook, createStore } from 'react-sweet-state';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { metricPageQueryResponse } from '../../ui/metric-page/__generated__/metricPageQuery.graphql';

export interface MetricPageState {
  metric: metricPageQueryResponse['metricByEventKey'];
}

const initialState: MetricPageState = {
  metric: null,
};
const PageStateStore = createStore({
  initialState,
  actions: {
    setMetric: (metric: metricPageQueryResponse['metricByEventKey']) => ({
      setState,
    }) => {
      setState({
        metric: metric,
      });
    },
  },
  name: 'metric-page-state',
});

export const useMetricPageState = createHook(PageStateStore);
