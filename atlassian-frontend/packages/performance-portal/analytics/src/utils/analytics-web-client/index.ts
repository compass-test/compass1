import AnalyticsClient, {
  envType,
  originType,
  userType,
} from '@atlassiansox/analytics-web-client';
import Cookie from 'js-cookie';

import {
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

type AnalyticsWebClient = {
  sendUIEvent: (event: GasPurePayload) => void;
  sendOperationalEvent: (event: GasPurePayload) => void;
  sendTrackEvent: (event: GasPurePayload) => void;
  sendScreenEvent: (event: GasPureScreenEventPayload) => void;
  setUserInfo: (userType: string, id: string) => void;
};

const init = () => {
  const hostname = window.location.hostname;
  const isDev = hostname.includes('dev');
  const isStaging = hostname.includes('staging');
  const isProd = hostname.includes('prod');

  const analyticsClient: AnalyticsWebClient = new AnalyticsClient(
    {
      env: isProd
        ? envType.PROD
        : isStaging
        ? envType.STAGING
        : isDev
        ? envType.DEV
        : envType.LOCAL,
      product: 'performancePortal',
      version: '1.0.0',
      origin: originType.WEB,
    },
    { useLegacyUrl: true },
  );

  const aaid = Cookie.get('aaid');

  if (aaid) {
    analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, aaid);
  }

  return analyticsClient;
};

let analyticsClient: AnalyticsWebClient | null = null;

export const getAnalyticsWebClient = (): AnalyticsWebClient => {
  if (analyticsClient === null) {
    analyticsClient = init();
  }
  return analyticsClient;
};

export const sendScreenEvent = (
  name: string,
  attributes: { [key: string]: string | number | boolean } | null = null,
) => {
  const payload: GasPureScreenEventPayload = { name };
  if (attributes !== null) {
    payload.attributes = attributes;
  }
  getAnalyticsWebClient().sendScreenEvent(payload);
};

export const sendUIEvent = (event: UIAnalyticsEvent) => {
  getAnalyticsWebClient().sendUIEvent(event.payload as GasPurePayload);
};
