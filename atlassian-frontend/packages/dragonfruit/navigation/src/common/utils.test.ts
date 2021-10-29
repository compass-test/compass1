import { Environment } from '@atlassian/dragonfruit-tenant-context';

import { getLogoutUrl } from './utils';

describe('Get logout URL', () => {
  test('Returns correct logout URL for staging environment', () => {
    const continueUrl = 'https://www.atlassian.net';
    const environment = Environment.STAGING;

    const result = getLogoutUrl(environment, continueUrl);

    expect(result).toBe(
      `https://id.stg.internal.atlassian.com/logout?continue=${encodeURIComponent(
        continueUrl,
      )}`,
    );
  });

  test('Returns correct logout URL for production environment', () => {
    const continueUrl = 'https://www.atlassian.net';
    const environment = Environment.PROD;

    const result = getLogoutUrl(environment, continueUrl);

    expect(result).toBe(
      `https://id.atlassian.com/logout?continue=${encodeURIComponent(
        continueUrl,
      )}`,
    );
  });

  test('Throws error for local environment', () => {
    const continueUrl = 'https://www.atlassian.net';
    const environment = Environment.LOCAL;

    expect(() => {
      getLogoutUrl(environment, continueUrl);
    }).toThrow('No logout URL for the given environment: local');
  });

  test('Gets correct logout URL for staging environment if no continueUrl is given', () => {
    const environment = Environment.STAGING;

    const result = getLogoutUrl(environment);

    expect(result).toBe(`https://id.stg.internal.atlassian.com/logout`);
  });

  test('Gets correct logout URL for production environment if no continueUrl is given', () => {
    const environment = Environment.PROD;

    const result = getLogoutUrl(environment);

    expect(result).toBe(`https://id.atlassian.com/logout`);
  });
});
