import { restrictedTimingKeys } from '../constants';
import { logger } from '../logger';
import { visibilityChangeObserver } from '../observer/visibility-change-observer';
import {
  BMEventsType,
  CustomValues,
  PerformanceEventConfigParam,
} from '../types';

export enum MetricState {
  NOT_STARTED = 'not-started',
  STARTED = 'started',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

export enum PageVisibleState {
  VISIBLE = 'visible',
  MIXED = 'mixed',
  HIDDEN = 'hidden',
}

export type OnStopCallback = (data?: BaseMetricStopArguments | null) => void;
export type OnCancelCallback = () => void;

function getPageVisibleState() {
  return document.visibilityState === 'visible'
    ? PageVisibleState.VISIBLE
    : PageVisibleState.HIDDEN;
}
export interface BaseMetricStopArguments {
  customData?: CustomValues | null;
  stopTime?: number;
}

export interface BaseMetricStartArguments {
  startTime?: number;
}

export interface BaseMetricData {
  key: string;
  state: MetricState;
  start: number | null;
  stop: number | null;
  marks: { [key: string]: number };
  custom: CustomValues | null;
  route: string | null;
  submetrics: Array<BaseMetricData>;
  config: PerformanceEventConfigParam;
  pageVisibleState: PageVisibleState;
  type: BMEventsType;
}

export interface BaseMetricMergeData extends BaseMetricData {
  onStopCallbacks: Array<[OnStopCallback, OnCancelCallback]>;
}

export class BaseMetric {
  protected state: MetricState = MetricState.NOT_STARTED;
  protected startTime: number | null = null;
  protected stopTime: number | null = null;
  protected marks: { [key: string]: number } = {};
  protected onStopCallbacks: Array<[OnStopCallback, OnCancelCallback]> = [];
  protected custom: CustomValues | null = null;
  protected config: PerformanceEventConfigParam;
  protected submetrics: BaseMetricData[] = [];
  protected route: string | null = null;
  protected untilOnStopCallback: OnStopCallback | null = null;
  protected pageVisibleState: PageVisibleState = getPageVisibleState();
  readonly key: string;
  readonly type: BMEventsType;

  constructor(config: PerformanceEventConfigParam) {
    this.config = config;
    this.key = config.key.replace(/ /gi, '-');
    this.type = config.type;
    this.config.timings?.forEach((entry) => {
      if (restrictedTimingKeys.includes(entry.key)) {
        // eslint-disable-next-line no-console
        console.warn(
          `Entry ${entry.key} is restricted and has been renamed to custom__${entry.key}`,
        );
        entry.key = `custom__${entry.key}`;
      }
    });
  }
  protected get untilMetrics(): BaseMetric[] {
    const { until } = this.config;
    if (!until) {
      return [];
    } else if (Array.isArray(until)) {
      return until;
    }
    return [until];
  }

  start({
    startTime = window.performance.now(),
  }: BaseMetricStartArguments = {}) {
    this.clear();
    logger.logCond(!!this.config.debug, this.key, startTime);
    this.state = MetricState.STARTED;
    this.startTime = startTime;
    this.pageVisibleState = getPageVisibleState();
    visibilityChangeObserver.subscribe(this.setPageVisibleStateToMixed);
    this.watchUntil();
  }

  stop(stopArguments: BaseMetricStopArguments = {}): boolean {
    const { stopTime = window.performance.now() } = stopArguments;

    if (this.state !== MetricState.STARTED || this.startTime === null) {
      logger.log(
        `metric ${this.config.key} has been stopped while not being started before; current state: ${this.state}`,
      );
      return false;
    }

    if (stopTime < this.startTime) {
      logger.log(
        `metric ${this.config.key} has been stopped with stopTime lower than startTime; startTime: ${this.startTime}; stopTime: ${stopTime}`,
      );
      return false;
    }

    this.stopTime = stopTime;
    this.state = MetricState.FINISHED;

    this.handleStop(stopArguments);
    visibilityChangeObserver.unsubscribe(this.setPageVisibleStateToMixed);
    return true;
  }

  protected handleStop(stopArguments: BaseMetricStopArguments) {
    const { customData = null } = stopArguments;

    if (customData) {
      this.custom = { ...this.custom, ...customData };
    }

    this.config.include &&
      this.config.include.forEach((metric) => {
        const included = metric.getData();
        if (
          included.state === MetricState.FINISHED &&
          included.start !== null &&
          included.start >= (this.startTime || 0)
        ) {
          this.addSubMetric(metric.getData());
        }
      });

    this.onStopCallbacks.forEach(([success]) => {
      success(stopArguments);
    });

    this.onStopCallbacks = [];
    logger.logCond(
      !!this.config.debug,
      this.key,
      this.config.debug && this.getData(),
    );
  }

  protected setPageVisibleStateToMixed = () => {
    this.pageVisibleState = PageVisibleState.MIXED;
  };

  mark(mark: string, timestamp: number = window.performance.now()) {
    this.marks[mark] = timestamp;
  }

  cancel() {
    if (this.state !== MetricState.STARTED) {
      return;
    }
    this.state = MetricState.CANCELLED;
    this.cancelUntil();

    this.onStopCallbacks.forEach(([, cancel]) => {
      cancel();
    });
    this.onStopCallbacks = [];
    visibilityChangeObserver.unsubscribe(this.setPageVisibleStateToMixed);
  }

  merge(mergeData: BaseMetricMergeData) {
    this.state = mergeData.state;
    this.pageVisibleState = mergeData.pageVisibleState;
    this.startTime = mergeData.start;
    this.stopTime = mergeData.stop;
    this.marks = { ...this.marks, ...mergeData.marks };
    this.submetrics = [...this.submetrics, ...mergeData.submetrics];
    this.onStopCallbacks = [
      ...this.onStopCallbacks,
      ...mergeData.onStopCallbacks,
    ];
  }

  onStop(success: OnStopCallback, cancel: OnStopCallback) {
    this.onStopCallbacks.push([success, cancel]);
  }

  removeOnStopCallback(success: OnStopCallback) {
    const index = this.onStopCallbacks.findIndex(([successCallback]) => {
      return success === successCallback;
    });
    if (index > -1) {
      this.onStopCallbacks.splice(index, 1);
    }
  }

  getData(): BaseMetricData {
    return {
      key: this.key,
      state: this.state,
      start: this.startTime,
      stop: this.stopTime,
      //todo ranges
      // ranges: this.makeRanges()
      marks: this.marks,
      // todo make copy
      custom: this.custom,
      submetrics: this.submetrics,
      config: this.config,
      route: this.route,
      pageVisibleState: this.pageVisibleState,
      type: this.config.type,
    };
  }

  getDataToMerge(): BaseMetricMergeData {
    return {
      ...this.getData(),
      onStopCallbacks: this.onStopCallbacks,
    };
  }

  protected addSubMetric(data: BaseMetricData) {
    this.submetrics.push(data);
  }

  protected isUntilFinished() {
    return this.untilMetrics.every(
      (metric) => metric.state === MetricState.FINISHED,
    );
  }

  protected handleAllUntilFinished() {
    // Order by ascending stop time
    const sorted = [...this.untilMetrics].sort(
      (m1, m2) => m1.stopTime! - m2.stopTime!,
    );

    // Accumulate the custom data from each metric, later metrics take priority
    const accumulatedCustomData = {};
    sorted.forEach((metric) => {
      Object.assign(accumulatedCustomData, metric.getData().custom);
    });

    const latest = sorted[sorted.length - 1].stopTime!;
    this.stop({
      stopTime: latest,
      customData: accumulatedCustomData,
    });
  }

  protected watchUntil() {
    if (!this.untilMetrics.length) {
      return;
    }

    if (this.isUntilFinished()) {
      // Already finished, handle it immediately
      this.handleAllUntilFinished();
      return;
    }

    // If not currently finished, register stop callbacks to re-check
    this.untilOnStopCallback = () => {
      if (this.isUntilFinished()) {
        this.handleAllUntilFinished();
      }
    };
    this.untilMetrics.forEach((metric) => {
      if (metric.state !== MetricState.FINISHED) {
        metric.onStop(this.untilOnStopCallback!, () => this.cancel());
      }
    });
  }

  protected cancelUntil() {
    this.untilMetrics.forEach((metric) => {
      if (metric.state !== MetricState.CANCELLED && this.untilOnStopCallback) {
        metric.removeOnStopCallback(this.untilOnStopCallback);
      }
    });
  }

  protected clear() {
    // todo before clearing - handle cancelling existing onStop / unsubscribe submetrics
    this.cancelUntil();
    this.state = MetricState.NOT_STARTED;
    this.startTime = null;
    this.stopTime = null;
    this.marks = {};
    this.custom = null;
    this.submetrics = [];
    this.route = null;
    this.pageVisibleState = getPageVisibleState();
  }
}
