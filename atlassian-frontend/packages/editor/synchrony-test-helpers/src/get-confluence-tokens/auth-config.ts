export interface ConfluenceConfig {
  cookieName: string;
  cookieDomain: string;
  sessionUrl: string;
  loginUrl: string;
}

export const production = {
  cookieName: 'cloud.session.token',
  cookieDomain: '.atlassian.net',
  sessionUrl: 'https://aid-account.prod.atl-paas.net/verifyCredentials',
  loginUrl: 'https://id.atlassian.com/login',
};

export const staging = {
  cookieName: 'cloud.session.token.stg',
  cookieDomain: 'jira-dev.com',
  sessionUrl: 'https://aid-account.staging.atl-paas.net/verifyCredentials',
  loginUrl: 'https://id.stg.internal.atlassian.com/login',
};
