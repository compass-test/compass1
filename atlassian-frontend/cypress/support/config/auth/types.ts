export interface IdentityConfiguration {
  verifyHostname: string;
  loginHostName: string;
}

export interface CookieConfiguration {
  name: string;
  domain: string;
}

export interface AuthConfiguration {
  username: string;
  password: string;
  identity: IdentityConfiguration;
  cookie: CookieConfiguration;
}
