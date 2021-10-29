// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const DEFAULT_HEARTBEAT_ENDPOINT = '/gateway/api/session/heartbeat';

export const handlers = [
  rest.post(DEFAULT_HEARTBEAT_ENDPOINT, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        nextCallTimestamp: new Date(Date.now() + 60 * 1000 * 5).toISOString(),
        sessionExpiryTime: new Date(Date.now() + 60 * 1000 * 15).toISOString(),
      }),
    );
  }),
];
