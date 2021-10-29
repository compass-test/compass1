import { BMEventsType, PageLoadStartParams, ReportedTiming } from '../types';

import { BaseMetric, MetricState } from './base-metric';
import { BasePageLoadMetric } from './base-page-load-metric';

export interface MetaPageLoadStartParams extends PageLoadStartParams {
  cancelStarted?: boolean;
}

export class PageLoadMetaMetric extends BasePageLoadMetric {
  private activePageLoadMetric: BasePageLoadMetric | null = null;

  startPageLoad(
    { cancelStarted, ...startPageLoadParams }: MetaPageLoadStartParams = {
      isInitial: false,
      cancelStarted: false,
    },
  ) {
    if (cancelStarted || this.state !== MetricState.STARTED) {
      super.startPageLoad(startPageLoadParams);
    }
  }

  setActive(metric: BasePageLoadMetric) {
    this.activePageLoadMetric = metric;
  }

  setDebug(debug: boolean) {
    this.config.debug = debug;
  }

  isDebugMode() {
    return this.config.debug;
  }

  isInitialLoad() {
    return this.isInitial;
  }

  protected clear() {
    this.activePageLoadMetric && this.activePageLoadMetric.cancel();
    super.clear();
  }

  include(metric: BaseMetric) {
    if (!this.config.include) {
      this.config.include = [metric];
    } else {
      this.config.include.push(metric);
    }
  }

  experimental__addExplicitTiming(name: string, timing: ReportedTiming) {
    if (this.explicitTimings === null) {
      this.explicitTimings = {};
    }
    this.explicitTimings[name] = timing;
  }
}

export const pageLoadMetaMetric = new PageLoadMetaMetric({
  type: BMEventsType.PAGE_LOAD,
  key: 'page_load_meta_metric',
});
