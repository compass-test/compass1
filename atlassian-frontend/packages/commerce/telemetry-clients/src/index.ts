// TODO: Remove ts-ignore once analytics-web-client has types
// @ts-ignore
import AnalyticsWebClient, {
  envType,
} from '@atlassiansox/analytics-web-client';
import MetalClient, {
  catalog,
  Env,
  envTypes,
  UserMetric,
} from '@atlassiansox/metal-client';
import { BrowserClient } from '@sentry/browser';

import type { AnalyticsWebClientType } from '@atlassian/commerce-analytics-web-client-types';

export { MetalClient, catalog };
export type { UserMetric, AnalyticsWebClientType };

/*export type CommerceMetalOptions = {
  packageName: string;
  packageVersion: string;
};*/

export const getMetalEnv = (): Env => {
  const microsEnv = process.env.MICROS_ENV;
  if (microsEnv === undefined) {
    return envTypes.LOCAL;
  }
  if (microsEnv.includes('prod')) {
    return envTypes.PROD;
  }
  if (microsEnv.includes('stg')) {
    return envTypes.STAGING;
  }
  if (microsEnv.includes('dev')) {
    return envTypes.DEV;
  }
  // Might not be prod but better to be paged about than not
  return envTypes.PROD;
};

let metalClient: MetalClient | undefined;
// TODO: Support providing information about which package and package version is sending the metric
export const createMonitoringClient = (/*{
  packageName,
  packageVersion,
}: CommerceMetalOptions*/): MetalClient => {
  if (metalClient === undefined) {
    // TODO: This will eventually no longer be a singleton. Review post-observasaurus
    metalClient = new MetalClient({
      productInfo: {
        metalId: 'b9f64d7f-8101-41ed-9bfe-5488ec281c87',
        env: getMetalEnv(), // TODO: Take this from the Commerce environment at some point
        version: '1.0.0',
      },
      /*settings: {
        meta: {
          subproduct: `${packageName}@${packageVersion}`,
        },
      },*/
    });
  }
  return metalClient!;
};

let sentryClient: BrowserClient | undefined;
const getSentryEnv = getMetalEnv;
export const createSentryClient = (): BrowserClient => {
  if (sentryClient === undefined) {
    sentryClient = new BrowserClient({
      dsn:
        'https://1d1cdcd18d1541f0b770a1b9ed74335f@sentry.prod.atl-paas.net/1174',
      environment: getSentryEnv(),
    });
  }
  return sentryClient!;
};

export const getAnalyticsEnv = (): string => {
  const microsEnv = process.env.MICROS_ENV;
  if (microsEnv === undefined) {
    return envType.LOCAL;
  }
  if (microsEnv.includes('prod')) {
    return envType.PROD;
  }
  if (microsEnv.includes('stg')) {
    return envType.STAGING;
  }
  if (microsEnv.includes('dev')) {
    return envType.DEV;
  }
  // Might not be LOCAL but best not polute guaranteed prod analytics
  return envType.LOCAL;
};
let analyticsWebClient: AnalyticsWebClientType | undefined;
export const createAnalyticsClient = (): AnalyticsWebClientType => {
  if (analyticsWebClient === undefined) {
    analyticsWebClient = new AnalyticsWebClient({
      env: getAnalyticsEnv(),
      product: 'commerce-libraries',
      subproduct: 'commerce-libraries',
      version: '1.0.0',
      locale: 'en-US',
    });
  }

  return analyticsWebClient!;
};
