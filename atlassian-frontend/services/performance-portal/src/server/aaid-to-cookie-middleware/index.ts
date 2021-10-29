import { RequestHandler } from 'express';

import { getStaffDetails } from './get-staff-details';

const COOKIE_NAME = 'aaid';

const secondsToMillis = (seconds: number) => seconds * 1000;

const userInfoToCookieMiddleware: RequestHandler = async (req, res, next) => {
  const username = req.headers['x-slauth-subject'] as string;

  const slauthExpiryInMillis = req.headers['x-slauth-expiration']
    ? secondsToMillis(Number(req.headers['x-slauth-expiration']))
    : undefined;

  const currentUserDetails = username
    ? await getStaffDetails(username)
    : undefined;

  if (!currentUserDetails) {
    res.clearCookie(COOKIE_NAME);
  } else {
    res.cookie(COOKIE_NAME, currentUserDetails.atlassianId, {
      expires: slauthExpiryInMillis
        ? new Date(slauthExpiryInMillis)
        : undefined,
    });
  }
  next();
};

export default userInfoToCookieMiddleware;
