/**
 * Set of requests you can make to HAMS
 */

import * as hamsHttp from '@atlassian/commerce-hams-client';

export type StripeKeyPayload = {
  publishableKey: string;
  gateway: string;
};

export const getStripeKey = async (fetch: typeof window.fetch, url: string) =>
  hamsHttp.get<StripeKeyPayload>(fetch, url);

export type ClienSecretInput = {
  gateway: string;
};

export type ClientSecretPayload = {
  setupIntentClientSecret: string;
};

export const createSetupIntentClientSecret = (
  fetch: typeof window.fetch,
  url: string,
  input: ClienSecretInput,
) => {
  return hamsHttp.get<ClientSecretPayload>(
    fetch,
    `${url}?gateway=${input.gateway}`,
  );
};
