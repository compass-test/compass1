import { auth } from '@atlaskit/outbound-auth-flow-client';
import { sanitizeUrl } from '../markup';

export const ATLASSIAN_AUTH_SERVICE_KEY = 'atlassian-token-service-key';

export const safeAuth: typeof auth = async (
  startUrl: string,
  windowFeatures?: string,
) => {
  return auth(sanitizeUrl(startUrl), windowFeatures);
};

export const isExternalAuth = (startUrl: string) => {
  const url = new URL(startUrl || '', window.location.href);
  const serviceKey = url.searchParams.get('serviceKey');
  return serviceKey !== ATLASSIAN_AUTH_SERVICE_KEY;
};
