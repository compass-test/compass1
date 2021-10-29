import cookie from 'cookie';

export function parseCookies(cookies: string[]): Record<string, string> {
  return cookies.reduce<Record<string, string>>(
    (acc, raw) => ({ ...acc, ...cookie.parse(raw) }),
    {},
  );
}
