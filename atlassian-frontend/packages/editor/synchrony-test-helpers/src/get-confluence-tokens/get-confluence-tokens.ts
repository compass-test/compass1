import Url from 'url';
import * as authConfig from './auth-config';
import { getSessionToken } from './get-session-token';
import { getXsrfToken } from './get-xsrf-token';

interface ConfluenceTokensInit {
  username: string;
  password: string;
  url: string;
}

export interface ConfluenceTokens {
  session: string;
  xsrf: string;
}

export async function getConfluenceTokens(
  init: ConfluenceTokensInit,
): Promise<[Error, null] | [null, ConfluenceTokens]> {
  const url = new Url.URL(init.url);
  const env = url.hostname.endsWith('atlassian.net') ? 'production' : 'staging';
  const config = authConfig[env];

  const credentials = {
    username: init.username,
    password: init.password,
  };

  const sessionResult = await getSessionToken(credentials, config);

  if (sessionResult[0] !== null) {
    return sessionResult;
  }

  const xsrfResult = await getXsrfToken(init.url);

  if (xsrfResult[0] !== null) {
    return xsrfResult;
  }

  const [, session] = sessionResult;
  const [, xsrf] = xsrfResult;

  return [
    null,
    {
      session,
      xsrf,
    },
  ];
}
