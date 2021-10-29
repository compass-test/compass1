import { logger } from '../logger';
import {
  PageLoadPerformanceEventConfig,
  PageLoadStartParams,
  ReportedTimings,
} from '../types';

import {
  BaseMetric,
  BaseMetricData,
  BaseMetricMergeData,
  BaseMetricStartArguments,
  BaseMetricStopArguments,
  MetricState,
} from './base-metric';

export interface BasePageLoadMetricData extends BaseMetricData {
  isInitial: boolean;
  explicitTimings: ReportedTimings | null;
}

export interface BasePageLoadMetricMergeData extends BaseMetricMergeData {
  isInitial: boolean;
  explicitTimings: ReportedTimings | null;
}

export class BasePageLoadMetric extends BaseMetric {
  protected isInitial: boolean = true;
  protected explicitTimings: ReportedTimings | null = null;
  protected config: PageLoadPerformanceEventConfig;
  static FMP = 'fmp';

  constructor(args: PageLoadPerformanceEventConfig) {
    super(args);
    this.config = args;
  }

  start({
    startTime = window.performance.now(),
  }: BaseMetricStartArguments = {}) {
    // please use startPageLoad
    return;
  }

  startPageLoad(params: PageLoadStartParams = { isInitial: false }): void {
    // todo this should update meta page load metric
    this.isInitial = params.isInitial;
    if (params.isInitial) {
      super.start({ startTime: 0 });
    } else {
      super.start(params);
    }
    logger.logCond(!!this.config.debug, this.key, this.startTime);
  }

  stopPageLoad(
    pageLoadMetaMetricData: BasePageLoadMetricMergeData,
    stopArguments: BaseMetricStopArguments = {
      stopTime: window.performance.now(),
    },
  ): boolean {
    if (
      pageLoadMetaMetricData.state !== MetricState.STARTED ||
      pageLoadMetaMetricData.start === null ||
      stopArguments.stopTime === undefined
    ) {
      logger.log(
        `meta metric has been stopped while not being started before; current state: ${this.state}`,
      );
      return false;
    }

    if (stopArguments.stopTime < pageLoadMetaMetricData.start) {
      logger.log(
        `metric ${this.config.key} has been stopped with stopTime lower than startTime; startTime: ${pageLoadMetaMetricData.start}; stopTime: ${stopArguments.stopTime}`,
      );
      return false;
    }

    this.merge(pageLoadMetaMetricData);
    this.stopTime = stopArguments.stopTime;
    this.state = MetricState.FINISHED;
    this.handleStop(stopArguments);
    return true;
  }

  protected handleStop(stopArguments: BaseMetricStopArguments) {
    const { until } = this.config;
    const fmpWasMarked = BasePageLoadMetric.FMP in this.marks;

    if (!fmpWasMarked && until) {
      // Extract the maximum FMP value from the until metrics
      const untilArr: BaseMetric[] = Array.isArray(until) ? until : [until];

      const untilFmpMarks = untilArr.map((metric) => {
        const { marks } = metric.getData();
        return marks[BasePageLoadMetric.FMP] ?? null;
      });

      if (untilFmpMarks.every(Number.isFinite)) {
        this.markFMP(Math.max(...untilFmpMarks));
      }
    }

    super.handleStop(stopArguments);
  }

  mark(mark: string, timestamp: number = window.performance.now()) {
    if (mark === BasePageLoadMetric.FMP) {
      return;
    }
    super.mark(mark, timestamp);
  }

  merge(mergeData: BasePageLoadMetricMergeData) {
    super.merge(mergeData);
    this.isInitial = mergeData.isInitial;
    this.explicitTimings =
      this.explicitTimings || mergeData.explicitTimings
        ? {
            ...mergeData.explicitTimings,
            ...this.explicitTimings,
          }
        : null;
  }

  markFMP(timestamp?: number) {
    super.mark(BasePageLoadMetric.FMP, timestamp);
  }

  private getPageLoadData() {
    return {
      isInitial: this.isInitial,
      explicitTimings: this.explicitTimings,
    };
  }

  getData(): BasePageLoadMetricData {
    return {
      ...super.getData(),
      ...this.getPageLoadData(),
    };
  }

  getDataToMerge(): BasePageLoadMetricMergeData {
    return {
      ...super.getDataToMerge(),
      ...this.getPageLoadData(),
    };
  }

  protected clear() {
    this.explicitTimings = null;
    super.clear();
  }
}
