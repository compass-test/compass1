import { MetricsOptions } from '../../common/types';

export interface VisibleMetricsState {
  [MetricsOptions.FMP]: boolean;
  [MetricsOptions.TTI]: boolean;
  [MetricsOptions.SPATransitionRatio]: boolean;
}
