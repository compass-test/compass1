import Cookie from 'js-cookie';
import memoize from 'memoize-one';

export const canUseCookie = (): boolean => {
  return !(location.protocol === 'file:' || location.protocol === 'chrome-extension:');
};

// Only exported for testing
export const COOKIE_NAME = '__awc_tld_test__';
export const COOKIE_VALUE = 'tld_test';

// This is an expensive function so we should only run this once per page load
export const getTld: (() => string) = memoize((): string => {
  const { hostname } = location;
  const splitHostname = hostname.split('.');
  for (let i = 1; i <= splitHostname.length; i++) {
    const domainParts = splitHostname.slice(i * -1);
    const domain = `.${domainParts.join('.')}`;
    Cookie.set(COOKIE_NAME, COOKIE_VALUE, {
      domain
    });
    if (Cookie.get(COOKIE_NAME) === COOKIE_VALUE) {
      Cookie.remove(COOKIE_NAME);
      return domain;
    }
  }
  return hostname;
});
