import { SSRGetDoneMark } from './helper/ssr-get-done-mark';
import { logger } from './logger';
import { pageLoadMetaMetric } from './metric/page-load-meta-metric';
import { visibilityChangeObserver } from './observer/visibility-change-observer';
import { webVitalsObserver } from './observer/web-vitals-observer';
import { Route } from './route';
import { submitter } from './submitter/submitter';
import {
  BMEventsType,
  BrowserMetricsConfig,
  PageLoadStartParams,
} from './types';

const makeBrowserMetrics = () => {
  const bm = {
    init(config: BrowserMetricsConfig) {
      visibilityChangeObserver.start();
      if (config.events[BMEventsType.WEB_VITALS]?.enabled) {
        webVitalsObserver.start();
      }
      if (config.debug) {
        logger.enable();
        submitter.setDebug(true);
        pageLoadMetaMetric.setDebug(true);
      }
      submitter.configure(config);
      if (config.ssr?.getDoneMark) {
        SSRGetDoneMark.setGetDoneMark(config.ssr.getDoneMark);
      }
    },

    setRoute(newRoute: string) {
      Route.setRoute(newRoute);
    },

    startPageLoad(params?: PageLoadStartParams) {
      pageLoadMetaMetric.startPageLoad({
        isInitial: false,
        cancelStarted: true,
        ...params,
      });
    },
    getPageLoadMetric() {
      return pageLoadMetaMetric;
    },
    experimental__addPageLoadTimingFromPerformanceMarks(
      name: string,
      startMark: string,
      stopMark: string,
      initialOnly: boolean = true,
    ) {
      if (initialOnly && !pageLoadMetaMetric.isInitialLoad()) {
        return;
      }
      const start = performance.getEntriesByName(startMark);
      const stop = performance.getEntriesByName(stopMark);
      if (start.length > 0 && stop.length > 0) {
        if (pageLoadMetaMetric.isDebugMode()) {
          try {
            performance.measure(name, startMark, stopMark);
          } catch (e) {}
        }
        const pageLoadData = pageLoadMetaMetric.getData();
        if (pageLoadData.start !== null) {
          const startMark = start[start.length - 1];
          const timing = {
            startTime: Math.round(startMark.startTime - pageLoadData.start),
            duration: Math.round(
              stop[stop.length - 1].startTime - startMark.startTime,
            ),
          };
          pageLoadMetaMetric.experimental__addExplicitTiming(name, timing);
        }
      }
    },
  };

  return bm;
};

export const browserMetrics = makeBrowserMetrics();
