import { AuthConfiguration } from './types';

export const authConfig: AuthConfiguration = {
  username: Cypress.env('BOT_USERNAME'),
  password: Cypress.env('BOT_PASSWORD'),
  identity: {
    verifyHostname: 'aid-account.staging.atl-paas.net',
    loginHostName: 'id.stg.internal.atlassian.com',
  },
  cookie: {
    name: 'cloud.session.token.stg',
    domain: 'api-private.stg.atlassian.com',
  },
};

export const siteUrl = 'https://start.stg.atlassian.com/';
