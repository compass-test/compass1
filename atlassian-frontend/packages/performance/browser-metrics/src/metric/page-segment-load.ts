import { SSRGetDoneMark } from '../helper/ssr-get-done-mark';
import {
  PageSegmentLoadPerformanceEventConfig,
  PageSegmentPageLoadMetricsOptions,
} from '../types';

import {
  BaseMetricData,
  BaseMetricMergeData,
  BaseMetricStopArguments,
  MetricState,
} from './base-metric';
import { Metric } from './metric';
import { pageLoadMetaMetric } from './page-load-meta-metric';

export interface BasePageSegmentLoadMetricData extends BaseMetricData {
  isInitial: boolean;
}

export interface BasePageSegmentLoadMetricMergeData
  extends BaseMetricMergeData {
  isInitial: boolean;
}

export class PageSegmentLoadMetric extends Metric {
  protected isInitial: boolean = true;
  protected config: PageSegmentLoadPerformanceEventConfig;
  static FMP = 'fmp';

  constructor(config: PageSegmentLoadPerformanceEventConfig) {
    super(config);
    this.config = config;
  }

  startFromPageLoad() {
    const pageLoadMetaData = pageLoadMetaMetric.getData();
    this.start({ startTime: pageLoadMetaData.start ?? undefined });
    this.isInitial = pageLoadMetaData.isInitial;
    this.pageVisibleState = pageLoadMetaData.pageVisibleState;
  }

  mark(mark: string, timestamp: number = window.performance.now()) {
    if (mark === PageSegmentLoadMetric.FMP) {
      return;
    }
    super.mark(mark, timestamp);
  }

  markFMP(timestamp?: number) {
    super.mark(PageSegmentLoadMetric.FMP, timestamp);
  }

  private getPageSegmentLoadData() {
    return {
      isInitial: this.isInitial,
    };
  }

  getData(): BasePageSegmentLoadMetricData {
    return {
      ...super.getData(),
      ...this.getPageSegmentLoadData(),
    };
  }

  getDataToMerge(): BasePageSegmentLoadMetricMergeData {
    return {
      ...super.getDataToMerge(),
      ...this.getPageSegmentLoadData(),
    };
  }

  merge(mergeData: BasePageSegmentLoadMetricMergeData) {
    super.merge(mergeData);
    this.isInitial = mergeData.isInitial;
  }

  stop(params: BaseMetricStopArguments = {}): boolean {
    const pageLoadData = pageLoadMetaMetric.getData();

    if (pageLoadData.isInitial && this.config.ssr?.doneAsFmp) {
      if (!this.marks[PageSegmentLoadMetric.FMP]) {
        const mark = SSRGetDoneMark.getDoneMark();
        if (mark) {
          this.markFMP(mark);
        }
      }
    }

    if (
      this.config.includePageLoadTimings !==
        PageSegmentPageLoadMetricsOptions.WAIT_UNTIL_PRESENT ||
      pageLoadData.state === MetricState.FINISHED
    ) {
      return super.stop(params);
    }
    const now = performance.now();
    if (pageLoadData.state === MetricState.STARTED) {
      pageLoadMetaMetric.onStop(
        () => {
          super.stop({ ...params, stopTime: params.stopTime || now });
        },
        () => {
          this.cancel();
        },
      );
    }
    return true;
  }
}
