import { GasPurePayload } from '@atlaskit/analytics-gas-types';

import { BaseMetricData } from '../metric/base-metric';
import { BasePageLoadMetricData } from '../metric/base-page-load-metric';
import { BrowserMetricsConfig, PageVisibleFields } from '../types';

import { eventDataProcessor } from './event-data-processor';
import {
  metalDataProcessor,
  MetalProcessorExpectedPayload,
} from './metal-data-processor';
import {
  makeShareableGlobalConfig,
  ShareableGlobalConfigPerEventType,
} from './shareable-global-config';
import { HistogramConfig } from './types';

interface Submitter {
  config: {
    gasv3?: Promise<{
      sendOperationalEvent: (payload: GasPurePayload) => void;
    }>;
    metal?: Promise<{ metric: { submit: (payload: unknown) => void } }>;
    configChunk: Promise<ShareableGlobalConfigPerEventType> | null;
    histogram: HistogramConfig;
    useVisibleState: boolean;
  };
  configure(config: BrowserMetricsConfig): void;
  queue(data: BaseMetricData | BasePageLoadMetricData): void;
  debug: boolean;
  setDebug: (debug: boolean) => void;
}

export const submitter: Submitter = {
  debug: false,
  config: {
    gasv3: undefined,
    metal: undefined,
    configChunk: null,
    useVisibleState: false,
    histogram: {},
  },
  configure(config: BrowserMetricsConfig) {
    this.config.gasv3 = config.endpoints.eventPipelineClient;
    this.config.metal = config.endpoints.metalClient;
    this.config.configChunk = makeShareableGlobalConfig(config);
    if (config.events.all && config.events.all.sfxEvents) {
      this.config.useVisibleState =
        config.events.all.sfxEvents.activeTab ===
        PageVisibleFields.pageVisibleState;
    }
  },
  setDebug(debug: boolean) {
    this.debug = debug;
  },
  async queue(data: BaseMetricData | BasePageLoadMetricData) {
    if (!this.config.configChunk) {
      // eslint-disable-next-line no-console
      this.debug && console.warn('Submitter is not configured');
      return null;
    }
    const chunk = await this.config.configChunk;
    const payload: { [key: string]: unknown } | null = await eventDataProcessor(
      chunk[data.config.type],
      data,
    );
    if (payload === null) {
      return;
    }

    if (this.config.gasv3 !== undefined) {
      const client = await this.config.gasv3;
      const attributes = {
        task: payload['event:key'],
        properties: payload,
      };
      client &&
        client.sendOperationalEvent({
          actionSubject: 'performance',
          attributes,
          source: 'performance',
          action: 'measured',
        });
    }

    if (this.config.metal !== undefined) {
      const metal = await this.config.metal;
      if (metal && metal.metric) {
        const metalEvents = metalDataProcessor(
          payload as MetalProcessorExpectedPayload,
          this.config.useVisibleState,
        );
        if (metalEvents && metalEvents.length > 0) {
          metalEvents.forEach((eventData: unknown) => {
            metal.metric.submit(eventData);
          });
        }
      }
    }
  },
};
