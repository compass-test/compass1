import { authConfig, siteUrl } from './config/auth';
import { UserSession } from './token/types';

export const initCookies = () => {
  const config = authConfig;

  cy.task('getTokens', { credentials: config, siteUrl }).then(
    (tokens: UserSession) => {
      const cookieOpts: Partial<Cypress.SetCookieOptions> = {
        domain: config.cookie.domain,
        httpOnly: true,
        secure: true,
        sameSite: 'no_restriction' as const,
      };
      // For the user's session.
      cy.setCookie(config.cookie.name, tokens.sessionToken, cookieOpts);
      // For user's XSRF session protections.
      cy.setCookie('atl.xsrf.token', tokens.xsrfToken, cookieOpts);
      // For api-private.atlassian.com, Stargate APIs.
      cy.setCookie(config.cookie.name, tokens.sessionToken, {
        ...cookieOpts,
        domain: 'atlassian.com',
      });
      // For bitbucket.org APIs, with Atlassian Session.
      cy.setCookie(config.cookie.name, tokens.sessionToken, {
        ...cookieOpts,
        domain: 'bitbucket.org',
      });
      cy.setCookie('optintowebauth', '1', {
        ...cookieOpts,
        domain: 'bitbucket.org',
      });
    },
  );
};

before(() => {
  initCookies();
});

beforeEach(() => {
  initCookies();
});

export default initCookies;
