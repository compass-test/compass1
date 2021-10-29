import { EventType, TRACK_EVENT_TYPE } from '@atlassian/analytics-bridge';

import {
  EMCEE_END_USER_DISCOVER_PATH,
  integrations,
  MARKETPLACE_DEMAND_SERVICE_PATH,
} from './constants';
import { ImperativeAnalyticsData } from './types';

export const getEmbeddedMarketplaceAppLink = ({
  key,
  installDialogOpen = false,
}: {
  key: string;
  installDialogOpen?: boolean;
}) =>
  `${EMCEE_END_USER_DISCOVER_PATH}/app/${key}?source=quickstart${
    installDialogOpen ? '&installDialogOpen=true' : ''
  }`;

export const getInstallStatusUrlForIntegrationKey = (key: string) =>
  `/rest/plugins/1.0/${key}-key`;

export const getInstallRequestStatusUrlForIntegrationKey = (
  key: string,
  productName: string,
  cloudId: string,
  userId?: string,
) => {
  const baseUrl = `${MARKETPLACE_DEMAND_SERVICE_PATH}/app-requests/product-name/${productName}/cloud-id/${cloudId}/app-key/${key}`;
  return userId ? `${baseUrl}/status?userId=${userId}` : baseUrl;
};

export const isConnectOnlyIntegration = (key: string) =>
  integrations[key] && integrations[key].isConnect;

export const getIntegrationRequestedSuccessfulEventDetails = (
  source: string,
  key: string,
): { payload: ImperativeAnalyticsData; eventType: EventType } => ({
  payload: {
    action: 'requested',
    actionSubject: 'app',
    actionSubjectId: key,
    attributes: {
      source,
    },
  },
  eventType: TRACK_EVENT_TYPE,
});
