import { BMEventsType, WebVitalsPerformanceEventConfig } from '../types';

import { BaseMetric, MetricState } from './base-metric';

export class WebVitalsMetric extends BaseMetric {
  constructor({
    key,
    route,
    startTime,
    stopTime,
    pageVisibleState,
  }: WebVitalsPerformanceEventConfig) {
    super({
      type: BMEventsType.WEB_VITALS,
      key,
    });
    this.route = route;
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.state = MetricState.FINISHED;
    this.pageVisibleState = pageVisibleState;
  }
}
