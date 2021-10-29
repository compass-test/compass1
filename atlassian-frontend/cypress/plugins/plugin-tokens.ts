import { AuthConfiguration } from '../support/config/auth/types';
import { TokenClient } from '../support/token';

interface GetTokensOpts {
  credentials: AuthConfiguration;
  siteUrl: string;
}

const run: Cypress.PluginConfig = on => {
  on('task', {
    getTokens: ({ credentials, siteUrl }: GetTokensOpts) => {
      const tokenClient = new TokenClient({
        identityUsername: credentials.username,
        identityPassword: credentials.password,
        identityHostname: credentials.identity.verifyHostname,
        identityLoginHostname: credentials.identity.loginHostName,
        cookieName: credentials.cookie.name,
      });
      return tokenClient.getSession(siteUrl).then(session => session);
    },
  });
};
export default run;
