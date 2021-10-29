import { ALBEvent, ParsedWebhookRequest } from '../../types';
import { config } from '../../config';
import { Logger } from '../../lib/Logger';
import { prCreated } from './pr-created';
import { response, ResponseCode, Response } from '../../lib/utils/response';

function parseWebhookRequest(
  request: ALBEvent,
): ParsedWebhookRequest | undefined {
  if (!request.headers) {
    Logger.error('Missing request headers');
    return undefined;
  }

  const headers = {
    eventKey: request.headers['x-event-key'],
    hookUUID: request.headers['x-hook-uuid'],
    requestUUID: request.headers['x-request-uuid'],
    attemptNumber: request.headers['x-attempt-number'],
  };

  if (!headers.eventKey) {
    Logger.error('Missing event key');
    return undefined;
  }

  let body;
  try {
    body = JSON.parse(request.body || '');
  } catch (e) {
    Logger.error('Error parsing JSON request body');
    return undefined;
  }

  if (!body['repository']) {
    Logger.error('Missing repository field');
    return undefined;
  }

  if (body['repository'].full_name !== config.repository) {
    Logger.error(
      `Webhook came from wrong repository "${body['repository'].full_name}". Should come from "${config.repository}"`,
    );
    return undefined;
  }
  return { headers, body };
}

type WebhookHandlerFn = (request: ParsedWebhookRequest) => Promise<Response>;

const webhookHandlerMap: Record<string, WebhookHandlerFn> = {
  'pullrequest:created': prCreated,
};

export async function webhooksHandler(request: ALBEvent): Promise<Response> {
  const parsedRequest = parseWebhookRequest(request);
  if (!parsedRequest) {
    return response(ResponseCode.BAD_REQUEST, `Invalid webhook request`);
  }
  Logger.info('Parsed webhook request headers', {
    parsedRequest: parsedRequest.headers,
  });

  const handlerFn = webhookHandlerMap[parsedRequest.headers.eventKey];
  if (handlerFn) {
    return handlerFn(parsedRequest);
  } else {
    Logger.error(
      `Missing handler for ${parsedRequest.headers.eventKey} webhook type`,
    );
    return response(ResponseCode.BAD_REQUEST, 'Unsupported webhook event type');
  }
}
