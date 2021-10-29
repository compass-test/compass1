import {
  createAsapAuthenticator,
  errors,
  Options,
} from '@atlassian/express-asap';

export const createAsapAuthenticationMiddleware = (opts: Options) => {
  const asapAuthenticator = createAsapAuthenticator(opts);

  return {
    // Verify and decode ASAP JWT
    requireAuth: async (authHeader: string) => asapAuthenticator(authHeader),

    // Only accept a valid JWT that was issued by an allowed issuer
    requireIssuer: async (authHeader: string, authorisedIssuers: string[]) => {
      const asapClaims = await asapAuthenticator(authHeader);
      if (!asapClaims || !authorisedIssuers.includes(asapClaims.iss)) {
        throw new errors.AsapAuthorizationError('Unauthorized issuer');
      }
      return asapClaims;
    },
  };
};

export const AsapAuthorizationError = errors.AsapAuthorizationError;
export const AsapAuthenticationError = errors.AsapAuthenticationError;
