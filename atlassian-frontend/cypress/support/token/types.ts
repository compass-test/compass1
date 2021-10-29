export interface IdentityVerifyResponse {
  token: string;
}
export interface TokenServiceOpts {
  identityHostname: string;
  identityLoginHostname: string;
  identityUsername: string;
  identityPassword: string;
  cookieName: string;
}

export interface UserSession {
  sessionToken: string;
  xsrfToken: string;
}
