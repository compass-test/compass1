import { Secrets } from '@atlassian/micros-serverless-platform';
import {
  createAsapAuthenticationMiddleware,
  AsapAuthenticationError,
} from '@atlassian/micros-support';
import { ALBEvent } from '../types';
import { config } from '../config';

export class ApiKeyAuthenticationError extends Error {}

export async function requireAuthentication(
  event: ALBEvent,
  type: 'asap' | 'apiKey',
) {
  if (type === 'asap') {
    return requireAsapAuthentication(
      event.headers && event.headers['authorization'],
    );
  } else if (type === 'apiKey') {
    return requireApiKeyAuthentication(event.queryStringParameters);
  }
  throw new Error(`Invalid auth type "${type}`);
}

async function requireAsapAuthentication(authHeader?: string) {
  if (!authHeader) {
    throw new AsapAuthenticationError('No authorization header');
  }

  const publicKeyBaseUrls = await Promise.all([
    Secrets.get('ASAP_PUBLIC_KEY_REPOSITORY_URL'),
    Secrets.get('ASAP_PUBLIC_KEY_FALLBACK_REPOSITORY_URL'),
  ]);

  const audience = await Secrets.get('ASAP_AUDIENCE');

  if (!audience || publicKeyBaseUrls.filter(Boolean).length < 2) {
    throw new Error('Missing ASAP env vars');
  }

  const asapMiddleware = createAsapAuthenticationMiddleware({
    publicKeyBaseUrls,
    resourceServerAudience: `micros/${audience}`,
  });

  return asapMiddleware.requireIssuer(authHeader, config.allowedIssuers);
}

async function requireApiKeyAuthentication(
  queryString?: Record<string, string>,
) {
  const userApiKey = queryString && queryString['apiKey'];
  if (!userApiKey) {
    throw new ApiKeyAuthenticationError('Missing API key');
  }

  const apiKey = await Secrets.get('WEBHOOK_API_KEY');
  if (!apiKey) {
    throw new Error('Missing webhook API env var');
  }
  if (apiKey !== userApiKey) {
    throw new ApiKeyAuthenticationError('Invalid API key');
  }

  return true;
}
