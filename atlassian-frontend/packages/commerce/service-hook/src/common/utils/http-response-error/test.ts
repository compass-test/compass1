import { HttpResponseError, rejectOnHttpError } from './index';

const createResponse = (status: number, data?: any): Response =>
  new Response(data ? JSON.stringify(data) : undefined, {
    status,
  });

test('should reject on http error', async () => {
  const response = rejectOnHttpError('testApi', createResponse(400));

  await expect(response).rejects.toBeInstanceOf(HttpResponseError);
  await expect(response).rejects.toHaveProperty('statusCode', 400);
  await expect(response).rejects.toHaveProperty('body', undefined);
  await expect(response).rejects.toHaveProperty(
    'message',
    'Unable to fetch testApi, status: 400',
  );
});

test('should reject on http error with body', async () => {
  const body = { test: 'value' };
  const response = rejectOnHttpError('testApi', createResponse(500, body));

  await expect(response).rejects.toBeInstanceOf(HttpResponseError);
  await expect(response).rejects.toHaveProperty('statusCode', 500);
  await expect(response).rejects.toHaveProperty('body', body);
  await expect(response).rejects.toHaveProperty(
    'message',
    'Unable to fetch testApi, status: 500',
  );
});

test('should handle response promise', async () => {
  const responsePromise = Promise.resolve(createResponse(400));
  const response = rejectOnHttpError('testApi', responsePromise);

  await expect(response).rejects.toBeInstanceOf(HttpResponseError);
});

test('should reject redirection response', async () => {
  const response = rejectOnHttpError('testApi', createResponse(301));

  await expect(response).rejects.toBeInstanceOf(HttpResponseError);
});

test('should pass valid response', async () => {
  const response = rejectOnHttpError('testApi', createResponse(200));

  await expect(response).resolves.toBeInstanceOf(Response);
});
