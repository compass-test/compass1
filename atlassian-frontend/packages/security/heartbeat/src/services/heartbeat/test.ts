import { disableFetchMocks } from 'jest-fetch-mock';

import { rest, server } from '../../__mocks__/server';
import { DEFAULT_HEARTBEAT_ENDPOINT } from '../../constants';

import { postHeartbeat } from './index';

describe('postHeartbeat', () => {
  const onAuthenticationFailed = jest.fn();

  beforeAll(() => {
    disableFetchMocks();
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  afterAll(() => server.close());

  it('calls fetch method and retrieves response', async () => {
    const response = await postHeartbeat(
      DEFAULT_HEARTBEAT_ENDPOINT,
      onAuthenticationFailed,
    );
    const responseTimeStamp = response && response.nextCallTimestamp;
    expect(typeof responseTimeStamp).toBe('string');
  });

  it('with HTTP 401 calls onAuthenticationFailed callback ', async () => {
    server.use(
      rest.post(DEFAULT_HEARTBEAT_ENDPOINT, async (_, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ message: 'authentication failed' }),
        );
      }),
    );
    await postHeartbeat(DEFAULT_HEARTBEAT_ENDPOINT, onAuthenticationFailed);
    expect(onAuthenticationFailed).toBeCalled();
  });

  describe('with HTTP 500', () => {
    beforeEach(() => {
      server.use(
        rest.post(DEFAULT_HEARTBEAT_ENDPOINT, (_, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: 'internal server error' }),
          );
        }),
      );
    });

    it('does not call onAuthenticationFailed', async () => {
      await postHeartbeat(DEFAULT_HEARTBEAT_ENDPOINT, onAuthenticationFailed);
      expect(onAuthenticationFailed).not.toBeCalled();
    });
    it('rejects with undefined', async () => {
      const response = await postHeartbeat(
        DEFAULT_HEARTBEAT_ENDPOINT,
        onAuthenticationFailed,
      );

      expect(response).toEqual(undefined);
    });
  });
});
