import { visibilityChangeObserver } from '@atlassian/ufo-experimental';
import {
  getGlobalEventStream,
  setGlobalEventStream,
} from '@atlassian/ufo-experimental/global-stream-buffer';
import { ufolog, ufowarn } from '@atlassian/ufo-experimental/logger';
import {
  CustomData,
  ExperienceData,
  PageLoadExperienceData,
  UFOGlobalEventStreamEventType,
} from '@atlassian/ufo-experimental/types';

import { AppConfig, TenantType } from '../../types';
import { UFOGlobalEventStream } from '../event-stream/event-stream';
import { FeatureFlagClient, SSRConfig } from '../types';

import { getPerformancePayload } from './performance';
import { pageVisibleState } from './performance/plugins/page-visible-state';
import { appFramework } from './plugins/app/framework';
import { appVersion } from './plugins/app/version';
import { eventBrowserPlugin } from './plugins/browser';
import { eventCpusPlugin } from './plugins/cpus';
import { featureFlags } from './plugins/feature-flags';
import { eventMemoryPlugin } from './plugins/memory';
import { eventNetworkPlugin } from './plugins/network';
import { ssrFeatureFlags } from './plugins/ssr/feature-flags';
import { ssrSuccess } from './plugins/ssr/success';
import { Route } from './route';
import { isInitialPageLoad } from './utils/is-initial-page-load';

type GasV3 = {
  sendOperationalEvent: (payload: any) => void;
};

export type PublisherSetupAttrs = {
  gasv3: GasV3;
  product: string;
  tenantType?: TenantType;
  hostname?: string;
  region?: string;
  allowlist?: (
    key: string,
    data: ExperienceData | PageLoadExperienceData,
  ) => boolean;
  app: AppConfig;
  featureFlagClient?: FeatureFlagClient;
  featureFlags?: string[];
  ssr?: SSRConfig;
};

type Payload = {
  actionSubject: 'experience';
  action: 'measured';
  source: 'measured';
  tags: string[];
  attributes: {
    properties: {
      'event:source': { name: string; version: string };
      'event:schema': string;
      'event:product': string;
      'event:region': string;
      'experience:name': string;
      'experience:key': string;
      'experience:status': string;
      'experience:duration': number;
      'experience:startTime'?: number;
      'experience:spanId'?: string;
      [key: string]: unknown;
    };
    performance: {
      'event:key': string;
      [key: string]: unknown;
    };
    task: string;
  };
};

type allowlistType = (
  key: string,
  data: ExperienceData | PageLoadExperienceData,
) => boolean;

class Publisher {
  gasv3: GasV3 | null = null;

  product: string = '';

  region: string = 'unknown';

  hostname: string = window.location.hostname;

  tenantType: TenantType = TenantType.RealUser;

  app: AppConfig = { version: { web: 'unknown' } };

  buffer: Array<Payload> = [];

  featureFlagClient: FeatureFlagClient | null = null;

  featureFlags: string[] = [];

  ssr: SSRConfig | null = null;

  route = Route;

  allowlist: allowlistType = () => true;

  publish(data: ExperienceData | PageLoadExperienceData) {
    const experienceKey = this.getExperienceKey(data);

    if (!this.allowlist(experienceKey, data)) {
      ufowarn(
        `experience ${experienceKey} does not meet requirements of allowlist`,
      );
      return;
    }

    const payload: Payload = {
      actionSubject: 'experience',
      action: 'measured',
      source: 'measured',
      tags: ['observability'],
      attributes: {
        properties: {
          'event:source': { name: 'ufo/web', version: '1.0.0' },
          'event:schema': '1.0.0',
          'event:product': this.product,
          'event:region': this.region,
          'event:hostname': this.hostname,
          'event:route': this.route.getRoute(),
          ...eventBrowserPlugin(),
          ...eventCpusPlugin(),
          ...eventMemoryPlugin(),
          ...eventNetworkPlugin(),
          ...appFramework(this.app),
          ...appVersion(this.app),
          'experience:name': data.id,
          // platform.fe.page-load|interaction|custom|page-segment.editor
          'experience:key': experienceKey,
          'experience:status': data.state.id,
          'experience:duration': data.result.duration,
          ...(data.result.startTime !== null
            ? {
                'experience:startTime': data.result.startTime,
              }
            : null),
          ...(data.uuid ? { 'experience:spanId': data.uuid } : null),
          ...(this.tenantType !== TenantType.RealUser
            ? { 'event:tenantType': this.tenantType }
            : null),
          ...this.mapMetadataToPayload(data.metadata),
          ...this.extractPageLoadData(data),
          ...pageVisibleState(data),
          ...(isInitialPageLoad(data) && ssrSuccess(this.ssr)),
          ...(isInitialPageLoad(data) && ssrFeatureFlags(this.ssr)),
          ...(this.featureFlagClient &&
            featureFlags(this.featureFlagClient, this.featureFlags, data)),
        },
        performance: this.getPerformanceMetrics(data),
        task: data.id,
      },
    };

    if (this.gasv3) {
      this.gasv3.sendOperationalEvent(payload);
    } else {
      this.buffer.push(payload);
    }

    ufolog('PAYLOAD:', JSON.stringify(payload, null, 2));
  }

  setGlobalEventStream() {
    if (!(getGlobalEventStream() instanceof UFOGlobalEventStream)) {
      const eventStream = new UFOGlobalEventStream();
      eventStream.push({
        type: UFOGlobalEventStreamEventType.SUBSCRIBE,
        payload: {
          experienceId: '__SUBSCRIBE_ALL__',
          callback: this.publish.bind(this),
        },
      });
      setGlobalEventStream(eventStream);
    }
  }

  setRoute(newRoute: string) {
    this.route.setRoute(newRoute);
  }

  setup(config: PublisherSetupAttrs) {
    visibilityChangeObserver.start();

    if (!this.product) {
      this.product = config.product || '';
    }

    if (config.allowlist) {
      this.allowlist = config.allowlist;
    }

    if (config.tenantType) {
      this.tenantType = config.tenantType;
    }

    if (config.hostname) {
      this.hostname = config.hostname;
    }

    if (config.region) {
      this.region = config.region;
    }

    if (config.app) {
      this.app = config.app;
    }

    if (config.featureFlagClient) {
      this.featureFlagClient = config.featureFlagClient;
    }

    if (config.featureFlags) {
      this.featureFlags = config.featureFlags;
    }

    if (config.ssr) {
      this.ssr = config.ssr;
    }

    this.setGlobalEventStream();

    if (!this.gasv3) {
      this.gasv3 = config.gasv3;
      this.buffer.forEach(this.gasv3.sendOperationalEvent);
    }
  }

  private mapMetadataToPayload(metadata: CustomData) {
    const payload: CustomData = {};
    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined) {
        payload[`custom:${key}`] = value;
      }
    });
    return payload;
  }

  private extractPageLoadData(data: ExperienceData | PageLoadExperienceData) {
    if ('initial' in data) {
      return {
        'experience:pageLoadType': data.initial ? 'initial' : 'transition',
      };
    }
    return {};
  }

  private getPrefix(data: ExperienceData | PageLoadExperienceData) {
    if (data.platform !== null) {
      return 'platform';
    }
    return this.product;
  }

  private getExperienceKey(data: ExperienceData | PageLoadExperienceData) {
    const keyParts = [this.getPrefix(data), 'fe', data.type];
    if (data.platform) {
      keyParts.push(data.platform.component);
    }
    keyParts.push(data.id);
    return keyParts.join('.');
  }

  private getExperiencePerformanceKey(
    data: ExperienceData | PageLoadExperienceData,
  ) {
    const keyParts = [this.getPrefix(data), 'fe', data.performanceType];
    if (data.platform) {
      keyParts.push(data.platform.component);
    }
    keyParts.push(data.id);
    return keyParts.join('.');
  }

  private getPerformanceMetrics(data: ExperienceData | PageLoadExperienceData) {
    return {
      'event:key': this.getExperiencePerformanceKey(data),
      ...getPerformancePayload(data, this.ssr),
    };
  }
}

export const payloadPublisher = new Publisher();
