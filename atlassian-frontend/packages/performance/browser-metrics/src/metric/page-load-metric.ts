import { SSRGetDoneMark } from '../helper/ssr-get-done-mark';
import { logger } from '../logger';
import { Route } from '../route';
import { submitter } from '../submitter/submitter';
import { BMEventsType, PageLoadStartParams } from '../types';

import { BaseMetricStopArguments } from './base-metric';
import {
  BasePageLoadMetric,
  BasePageLoadMetricData,
} from './base-page-load-metric';
import { pageLoadMetaMetric } from './page-load-meta-metric';
import { WebVitalsMetric } from './web-vitals-metric';

export class PageLoadMetric extends BasePageLoadMetric {
  startPageLoad(params: PageLoadStartParams = { isInitial: false }) {
    pageLoadMetaMetric.startPageLoad({
      ...params,
      cancelStarted: 'startTime' in params,
    });
    this.watchUntil();
  }

  stop(params: BaseMetricStopArguments = {}) {
    const stopTime = params.stopTime || window.performance.now();

    const pageLoadData = pageLoadMetaMetric.getDataToMerge();
    const metaMetricStopped = pageLoadMetaMetric.stop(params);
    if (!metaMetricStopped) {
      return false;
    }

    if (pageLoadData.isInitial && this.config.ssr?.doneAsFmp) {
      if (!this.marks[BasePageLoadMetric.FMP]) {
        const mark = SSRGetDoneMark.getDoneMark();
        if (mark) {
          pageLoadMetaMetric.markFMP(mark);
        }
      } else {
        pageLoadMetaMetric.markFMP(this.marks[BasePageLoadMetric.FMP]);
      }
    }

    this.route = Route.getRoute();
    const metricStopped = this.stopPageLoad(pageLoadData, {
      ...params,
      stopTime,
    });
    if (!metricStopped) {
      return false;
    }

    const data = this.getData();
    if (!this.config.virtual) {
      submitter.queue(data);
    }
    logger.logCond(!!this.config.debug, 'page-load', 'stop', this.getData);

    this.enqueueWebVitals();

    return true;
  }

  mark(mark: string, timestamp: number = window.performance.now()) {
    pageLoadMetaMetric.mark(mark, timestamp);
  }

  markFMP(timestamp?: number) {
    pageLoadMetaMetric.markFMP(timestamp);
  }

  getData(): BasePageLoadMetricData {
    const pageLoadMetaData = pageLoadMetaMetric.getData();
    return {
      ...super.getData(),
      // marks and explicitTimings are available only in pageLoadMeta
      marks: pageLoadMetaData.marks,
      explicitTimings: pageLoadMetaData.explicitTimings,
    };
  }

  private async enqueueWebVitals() {
    if (this.config.virtual || !this.isInitial) {
      return false;
    }

    const configChunk = await submitter.config.configChunk;
    if (!configChunk?.[BMEventsType.WEB_VITALS].webVitals?.enabled) {
      return false;
    }

    const webVitalMetric = new WebVitalsMetric({
      key: this.config.key,
      route: this.route,
      startTime: this.startTime,
      stopTime: this.stopTime,
      pageVisibleState: this.pageVisibleState,
    });
    submitter.queue(webVitalMetric.getData());
    logger.logCond(!!this.config.debug, 'web-vitals', webVitalMetric.getData);

    return true;
  }
}
