import { response, ResponseCode } from './lib/utils/response';
import { Logger } from './lib/Logger';
import { ALBEvent } from './types';
import { integratorStatus, webhooksHandler } from './routes';
import { requireAuthentication, ApiKeyAuthenticationError } from './lib/auth';
import {
  AsapAuthorizationError,
  AsapAuthenticationError,
} from '@atlassian/micros-support';

export async function handler(event: ALBEvent) {
  if (event.microsHealthCheck) {
    return {
      status: 'ok',
    };
  }

  if (event.isBase64Encoded && event.body) {
    event.body = Buffer.from(event.body, 'base64').toString();
  }

  const request = `${event.httpMethod.toUpperCase()}:${event.path}`;

  Logger.info('Received event', { request });

  try {
    switch (request) {
      case 'POST:/integrator-status':
        await requireAuthentication(event, 'asap');
        return await integratorStatus(event);
      case 'POST:/webhooks':
        await requireAuthentication(event, 'apiKey');
        return await webhooksHandler(event);
      default:
        return response(ResponseCode.NOT_FOUND, {
          message: `${request} not implemented`,
        });
    }
  } catch (err) {
    const { message, ...rest } = err;
    Logger.error('Caught error', { message, err: rest, stack: err.stack });
    if (
      err instanceof AsapAuthenticationError ||
      err instanceof ApiKeyAuthenticationError
    ) {
      return response(ResponseCode.UNAUTHORIZED, { message });
    } else if (err instanceof AsapAuthorizationError) {
      return response(ResponseCode.FORBIDDEN, { message });
    } else {
      return response(ResponseCode.ERROR, { message });
    }
  }
}
