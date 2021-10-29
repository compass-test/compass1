import { Environment } from '@atlassian/dragonfruit-tenant-context';

export const getLogoutUrl = (
  environment: Environment,
  continueUrl?: string,
): string => {
  let baseLogoutUrl;

  switch (environment) {
    case Environment.PROD:
      baseLogoutUrl = 'https://id.atlassian.com/logout';
      break;
    case Environment.STAGING:
      baseLogoutUrl = 'https://id.stg.internal.atlassian.com/logout';
      break;
    default:
      throw Error('No logout URL for the given environment: ' + environment);
  }

  const logoutUrl = continueUrl
    ? `${baseLogoutUrl}?continue=${encodeURIComponent(continueUrl)}`
    : baseLogoutUrl;

  return logoutUrl;
};
