import { Batcher } from './Batcher';
import { MonitoringClient, Tags } from './MonitoringClient';

export type MetricEvent = {
  // one of https://bitbucket.org/observability/metal-client/src/master/src/metric/types.js
  type: 'timing' | 'gauge' | 'increment' | 'decrement';
  name: string;
  tags: string[];
  value: number;
  /**
   * ISO string
   *
   * @type {string}
   */
  timestamp: string;
  /**
   * Just for consistency with metal-client
   *
   * @type {number}
   */
  sampleRate: number;
};

type TelemetryPayload = {
  // one of https://bitbucket.org/observability/metal-client/src/10948bd43c827deae8cb6177011319c84aa59a17/src/client/types.js#lines-20:26
  type: 'metric' | 'log' | 'error' | 'trace' | 'analytics';
  data: MetricEvent[];
  meta: {
    globalTags: string[];
  };
};

function formatTags(tags: Tags) {
  return Object.entries(tags).map(
    ([tagName, tagValue]) => `${tagName}:${tagValue}`,
  );
}

export class ConfluenceMonitoringClient implements MonitoringClient {
  private batcher: Batcher<MetricEvent>;
  private isWindowUnloading = false;
  private userDefinedGlobalTags: Tags = {};
  private currentTransitionId: number = 0;
  private currentRouteName: string | undefined = undefined;

  // First error occurred in initial load or transition
  private firstErrorInSession = true;

  constructor(private readonly reportingUrl: string) {
    const BATCH_MAX_SIZE = 50;
    const BATCH_FLUSH_INTERVAL_MILLISECONDS = 10000;
    this.batcher = new Batcher(
      BATCH_FLUSH_INTERVAL_MILLISECONDS,
      BATCH_MAX_SIZE,
    );

    this.batcher.onFlush((batch) => {
      this.onBatch(batch);
    });

    const unloadListener = () => {
      this.isWindowUnloading = true;
      this.batcher.forceFlush();
    };
    window.addEventListener('pagehide', unloadListener);
  }

  public captureErrorOccurrence(error: Error, tags: Tags = {}): void {
    let type = 'unknown';
    if (error && typeof error.name === 'string') {
      type = error.name;
    }

    this.incrementCounter('jsErrors', {
      ...tags,
      type,
      firstInSession: String(this.firstErrorInSession),
    });
    this.firstErrorInSession = false;
  }

  public submitPerformanceMetric(
    name: string,
    duration: number,
    tags: Tags = {},
  ): void {
    this.batcher.add(
      this.createMetric({
        type: 'timing',
        value: Math.floor(duration),
        name: `${name}.performance`,
        tags,
      }),
    );
  }

  public updateGlobalTags(tags: Tags | ((current: Tags) => Tags)): void {
    if (typeof tags === 'function') {
      this.userDefinedGlobalTags = tags(this.globalTags);
    } else {
      this.userDefinedGlobalTags = {
        ...this.userDefinedGlobalTags,
        ...tags,
      };
    }
  }

  public captureTransition(routeName: string) {
    this.incrementCounter('session', {
      type: this.currentTransitionId === 0 ? 'initial' : 'transition',
    });
    this.currentTransitionId++;

    // Next error will be first in the session when there is a initial load (transition id = 0) or a SPA transition.
    this.firstErrorInSession = true;

    if (this.currentRouteName !== routeName) {
      // since the route name changed, all the events in the current batch were done
      // under an old route name. Hence we force-flush the batch, and only then set the new context.
      if (this.currentRouteName !== undefined) {
        // skip force-flush if that's the first time we set route name (i.e. initial navigation)
        this.batcher.forceFlush();
      }
    }

    this.currentRouteName = routeName;
  }

  public incrementCounter(counterName: string, tags?: Tags): void {
    this.batcher.add(
      this.createMetric({
        type: 'increment',
        name: counterName,
        value: 1,
        tags,
      }),
    );
  }

  private get globalTags(): Tags {
    return {
      ...this.userDefinedGlobalTags,
      ...(this.currentRouteName ? { page: this.currentRouteName } : {}),
    };
  }

  private onBatch(batch: MetricEvent[]): void {
    this.send({
      type: 'metric',
      meta: {
        globalTags: formatTags(this.globalTags),
      },
      data: batch,
    });
  }

  private send(telemetryPayload: TelemetryPayload): void {
    try {
      const data = JSON.stringify(telemetryPayload);
      let isSentViaBeacon: boolean = false;

      // eslint-disable-next-line compat/compat
      if (typeof navigator.sendBeacon === 'function') {
        // eslint-disable-next-line compat/compat
        isSentViaBeacon = navigator.sendBeacon(this.reportingUrl, data);
      }

      if (!isSentViaBeacon) {
        // resorting to XMLHttpRequest instead of fetch here so that we can submit these events *synchronously* when
        // the page unloads (`fetch` can't do that)
        const client = new XMLHttpRequest();
        const shouldBeSync = this.isWindowUnloading;
        client.open('POST', this.reportingUrl, !shouldBeSync);
        // we're setting the "Content-Type" header to "text/plain" to behave as closely to `sendBeacon` as possible
        client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        client.send(data);
      }
    } catch (e) {
      // there's nothing we can do when monitoring is down, just log the error
      // eslint-disable-next-line no-console
      console.error(`Sending monitoring data failed:`, e);
    }
  }

  private createMetric({
    type,
    name,
    value,
    tags = {},
  }: Pick<MetricEvent, 'type' | 'name' | 'value'> &
    Partial<{ tags: Tags }>): MetricEvent {
    const formattedTags = formatTags(tags);

    return {
      type,
      name,
      value,
      sampleRate: 1,
      tags: formattedTags,
      timestamp: new Date().toISOString(),
    };
  }
}
