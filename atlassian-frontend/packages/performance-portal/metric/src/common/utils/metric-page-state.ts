import { createHook, createStore } from 'react-sweet-state';

import { GetMetricByEventKeyQuery } from '../../__generated__/graphql';

export interface MetricPageState {
  metric: GetMetricByEventKeyQuery['metricByEventKey'];
}

const initialState: MetricPageState = {
  metric: null,
};
const PageStateStore = createStore({
  initialState,
  actions: {
    setMetric: (metric: GetMetricByEventKeyQuery['metricByEventKey']) => ({
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
