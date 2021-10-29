import { RequestHandler } from 'express';

import { logger as baseLogger } from '../../utils/logger';

/** Allows us to trigger our error request handler */
export const wrap = (fn: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(fn(req, res, next));
    } catch (err) {
      next(err);
    }
  };
};

export const decodeCursor: RequestHandler = (req, _, next) => {
  if (req.query.cursor) {
    req.query.cursor = Buffer.from(
      req.query.cursor as string,
      'base64',
    ).toString('ascii');
  }
  next();
};

export const logRequests = (): RequestHandler => {
  const requestLogger = baseLogger.child({ namespace: 'request' });
  return wrap((req, _, next) => {
    requestLogger.info({ req });
    next();
  });
};
