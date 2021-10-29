import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { EnvironmentType, FeatureFlagUserWithIdentifier } from '../index';

import { ResponseError } from './errors';
import {
  ClientMetadata,
  FeatureFlagRequest,
  FeatureFlagResponse,
} from './types';

const REQUEST_TIMEOUT = 2000;

const PROD_BASE_URL = 'https://api.atlassian.com/flags';
const STAGING_BASE_URL = 'https://api.stg.atlassian.com/flags';
const DEV_BASE_URL = 'https://api.dev.atlassian.com/flags';

export default class Fetcher {
  private readonly apiKey: string;

  private readonly baseUrl: string;

  constructor(
    apiKey: string,
    serviceEnv: EnvironmentType = EnvironmentType.PROD,
    baseUrl?: string,
  ) {
    this.apiKey = apiKey;
    this.baseUrl = Fetcher.buildBaseUrl(serviceEnv, baseUrl);
  }

  async fetchFeatureFlags(
    user: FeatureFlagUserWithIdentifier,
    metadata: ClientMetadata,
    version?: string,
  ): Promise<FeatureFlagResponse> {
    const requestBody: FeatureFlagRequest = {
      apiKey: this.apiKey,
      identifier: user.identifier,
      isAnonymous: user.isAnonymous,
      additionalIdentifiers: user.additionalIdentifiers,
      customAttributes: user.custom,
      versionData: version,
      metadata,
    };

    // in case there are still IE users, check AbortController before init,
    // IE has no timeout applied on fetch since AbortController isn't available
    const controller =
      typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = setTimeout(() => controller?.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(
        `${this.baseUrl}/api/${CURRENT_FFS_API_VERSION}/frontend/featureFlagValues`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Name': metadata.client.name,
            'X-Client-Version': metadata.client.version,
            'X-Api-Key': this.apiKey,
          },
          body: JSON.stringify(requestBody),
          signal: controller?.signal,
        },
      );
      const successfulResponse = await Fetcher.handleResponseError(response);
      return Fetcher.extractBody(successfulResponse);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  static async handleResponseError(response: Response): Promise<Response> {
    if (!response.ok) {
      // Use text() instead of json() as the error body might not be json data
      const body = await response.text();
      throw new ResponseError(response.status, body);
    }

    return response;
  }

  static async extractBody(response: Response): Promise<FeatureFlagResponse> {
    if (response.status === 204) {
      return {};
    }

    return response.text().then((text) => JSON.parse(text || '{}'));
  }

  private static buildBaseUrl(
    serviceEnv: EnvironmentType,
    baseUrl?: string,
  ): string {
    if (baseUrl) {
      return baseUrl;
    }

    if (
      serviceEnv === EnvironmentType.DEV ||
      serviceEnv === EnvironmentType.LOCAL
    ) {
      return DEV_BASE_URL;
    }
    if (serviceEnv === EnvironmentType.STAGING) {
      return STAGING_BASE_URL;
    }
    return PROD_BASE_URL;
  }
}
