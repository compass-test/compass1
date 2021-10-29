import fetch from 'node-fetch';
import { parseCookies } from './parse-cookies';

export async function getXsrfToken(
  url: string,
): Promise<[Error, null] | [null, string]> {
  const cookieResponse = await fetch(url);

  if (!cookieResponse.ok) {
    return [
      new Error(
        `Failed fetching xsrf token: ${cookieResponse.status} - ${cookieResponse.statusText}`,
      ),
      null,
    ];
  }

  const headers = cookieResponse.headers as any;
  const rawCookies = headers.getAll('set-cookie');
  const cookies = parseCookies(rawCookies);
  const xsrf = cookies['atlassian.account.xsrf.token'];

  if (!xsrf) {
    return [
      new Error(
        `Failed extracting atl.xsrf.token cookie. Available cookies: ${Object.keys(
          cookies,
        ).join(', ')}`,
      ),
      null,
    ];
  }

  return [null, xsrf];
}
