import Url from 'url';
import fetch from 'node-fetch';
import { parseCookies } from './parse-cookies';

interface SessionCredentials {
  username: string;
  password: string;
}

interface SessionConfig {
  sessionUrl: string;
  loginUrl: string;
  cookieName: string;
}

export async function getSessionToken(
  credentials: SessionCredentials,
  config: SessionConfig,
): Promise<[Error, null] | [null, string]> {
  const tokenResponse = await fetch(config.sessionUrl, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!tokenResponse.ok) {
    return [
      new Error(
        `Failed verifying credentials: ${tokenResponse.status} - ${tokenResponse.statusText}`,
      ),
      null,
    ];
  }

  const tokenData = await tokenResponse.json();
  const loginUrl = new Url.URL(config.loginUrl);
  loginUrl.searchParams.set('token', tokenData.token);

  const cookieResponse = await fetch(loginUrl.toString());

  if (!cookieResponse.ok) {
    return [
      new Error(
        `Failed logging in: ${cookieResponse.status} - ${cookieResponse.statusText}`,
      ),
      null,
    ];
  }

  const headers = cookieResponse.headers as any;
  const rawCookies = headers.getAll('set-cookie');
  const cookies = parseCookies(rawCookies);
  const session = cookies[config.cookieName];

  if (!session) {
    return [
      new Error(
        `Failed extracting ${
          config.cookieName
        } cookie. Available cookies: ${Object.keys(cookies).join(', ')}`,
      ),
      null,
    ];
  }

  return [null, session];
}
