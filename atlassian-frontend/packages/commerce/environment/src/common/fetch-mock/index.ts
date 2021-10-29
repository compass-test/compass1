import { Request } from 'cross-fetch';

import { HttpCallMock, ResponseMock } from './types';
export type { HttpCallMock, RequestPredicate } from './types';

export const fetchMock = (callMocks: HttpCallMock[]): typeof window.fetch => {
  const responseOnList = new Map<HttpCallMock, number>();
  // if a mock returns list of responses getResponseFromList would
  // fetch correct response and track which one should be picked next
  const getResponseFromList = (
    responses: ResponseMock,
    match: HttpCallMock,
    request: Request,
  ): Promise<Response> | Response => {
    if (!Array.isArray(responses)) {
      return responses;
    }
    const index = responseOnList.get(match) || 0;
    if (index === responses.length) {
      // eslint-disable-next-line no-console
      console.error(
        'There are no more responses on the list for the request:',
        request,
      );
      throw new Error('Requests overflow');
    }
    responseOnList.set(match, index + 1);
    return responses[index];
  };

  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const request: Request =
      typeof input === 'string' ? new Request(input, init) : input;

    const matches = callMocks.filter((mocks) => mocks.request(request));

    if (matches.length === 0) {
      // eslint-disable-next-line no-console
      console.error('Could not find matching request for:', request);
      throw new Error('Request not mocked');
    }

    if (matches.length > 1) {
      // eslint-disable-next-line no-console
      console.error('Found multiple matching requests for:', request);
      throw new Error('Request mocks conflict');
    }

    const response = matches[0].response;
    const responses: ResponseMock =
      typeof response === 'function' ? response(request) : response;
    const responsePromise = Promise.resolve(
      getResponseFromList(responses, matches[0], request),
    );

    return responsePromise
      .then((res) => res.clone())
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('🐕 fetch:', request, response);
        return res;
      });
  };
};
