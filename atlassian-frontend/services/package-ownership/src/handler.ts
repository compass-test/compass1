import { Secrets } from '@atlassian/micros-serverless-platform';
import {
  createAsapAuthenticationMiddleware,
  AsapAuthenticationError,
  AsapAuthorizationError,
} from '@atlassian/micros-support';

import { response, ResponseCode } from './lib/utils/response';
import { Logger } from './lib/Logger';
import { uploadMetadata, ownershipCheck } from './routes';
import { config } from './config';
import { ALBEvent } from './types';

const requireAuthentication = async (authHeader: string | undefined) => {
  if (!authHeader) {
    throw new Error('No authorization header');
  }

  const publicKeyBaseUrls = await Promise.all([
    Secrets.get('ASAP_PUBLIC_KEY_REPOSITORY_URL'),
    Secrets.get('ASAP_PUBLIC_KEY_FALLBACK_REPOSITORY_URL'),
  ]);

  const audience = await Secrets.get('ASAP_AUDIENCE');

  const asapMiddleware = createAsapAuthenticationMiddleware({
    publicKeyBaseUrls,
    resourceServerAudience: `micros/${audience}`,
  });

  return asapMiddleware.requireIssuer(authHeader, config.allowedIssuers);
};

exports.handler = async (event: ALBEvent) => {
  if (event.microsHealthCheck) {
    return {
      status: 'ok',
    };
  }

  if (event.isBase64Encoded && event.body) {
    event.body = Buffer.from(event.body, 'base64').toString();
  }

  const request = `${event.httpMethod.toUpperCase()}:${event.path}`;
  const authHeader = event.headers && event.headers['authorization'];

  Logger.info('Received event', { request });

  try {
    await requireAuthentication(authHeader);
    switch (request) {
      case 'POST:/upload-metadata':
        return await uploadMetadata(event);
      case 'GET:/ownership-check':
        return await ownershipCheck(event);
      default:
        return response(ResponseCode.NOT_FOUND, {
          message: `${request} not implemented`,
        });
    }
  } catch (err) {
    const { message, ...rest } = err;
    Logger.error('Caught error', { message, err: rest });
    if (err instanceof AsapAuthenticationError) {
      return response(ResponseCode.UNAUTHORIZED, { message });
    } else if (err instanceof AsapAuthorizationError) {
      return response(ResponseCode.FORBIDDEN, { message });
    } else {
      return response(ResponseCode.ERROR, { message });
    }
  }
};
