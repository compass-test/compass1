import { matchPath } from 'react-router-dom';
// @ts-ignore
import redirects from '!!raw-loader!../../public/_redirects';

const redirectsArr: [string, string][] = redirects
  .split('\n')
  .filter((redirect: string) => {
    // Ignore empty and any catch all redirects
    return !!redirect && !redirect.startsWith('/*');
  })
  .map((redirect: string) => redirect.split(/\s+/) || []);

export const getRedirectURL = (to?: string): string | undefined => {
  if (!to) {
    return undefined;
  }

  const pathFound = redirectsArr.find(
    redirect => !!matchPath(to, { path: redirect[0] }),
  );

  if (pathFound) {
    return pathFound[1];
  }

  return undefined;
};
