import request, {
  AxiosRequestConfig as RequestInit,
  AxiosResponse as Response,
} from 'axios';
import { TokenServiceOpts, IdentityVerifyResponse, UserSession } from './types';

interface CookieTokens {
  sessionToken: string;
  xsrfToken: string;
}

export class TokenClient {
  private identityHostname: string;
  private identityLoginHostname: string;
  private identityUsername: string;
  private identityPassword: string;
  private cookieName: string;

  constructor({
    identityHostname,
    identityLoginHostname,
    identityUsername,
    identityPassword,
    cookieName,
  }: TokenServiceOpts) {
    this.identityHostname = identityHostname;
    this.identityLoginHostname = identityLoginHostname;
    this.identityUsername = identityUsername;
    this.identityPassword = identityPassword;
    this.cookieName = cookieName;
  }

  public getSession(siteUrl: string): Promise<UserSession> {
    try {
      return this.verifySession().then(this.getSessionToken.bind(this));
    } catch (err) {
      throw Error(
        `😬 Unable to get session token for ${this.identityUsername}: ${err.message}`,
      );
    }
  }

  /**
   * A method which will fire off a request to Identity, and return an intermediate token which can
   * be issued to the /login Identity endpoint (implemented further below) to gain a session token for
   * this user.
   */
  private verifySession(): Promise<string> {
    const requestUrl = `https://${this.identityHostname}/verifyCredentials`;
    const requestBody = {
      username: this.identityUsername,
      password: this.identityPassword,
    };
    const requestOpts: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(requestBody),
    };

    return this.fetchJson<IdentityVerifyResponse>(requestUrl, requestOpts)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(`✅ Login token fetched for ${this.identityUsername}`);
        return response.token;
      })
      .catch(err => {
        throw Error(
          `😬 Unable to verify user credentials from ${requestUrl}: ${err.toString()}`,
        );
      });
  }

  /**
   * A method which will use the token received from the login verification call to grab a session token
   * (a proper cookie value). The expectation is that this call will return a `Set-Cookie` header which can
   * be used to gain access to site-protected resources from a user.
   */
  private getSessionToken(token: string): Promise<CookieTokens> {
    const requestUrl = `https://${this.identityLoginHostname}/login?token=${token}`;
    return request(requestUrl, {})
      .then(response => {
        const cookie = this.findCookie(response.headers, this.cookieName);
        // eslint-disable-next-line no-console
        console.log(`✅ Cookie fetched for ${this.identityUsername}`, '...');
        return cookie;
      })
      .catch(err => {
        throw Error(
          `😬 Unable to verify user credentials from ${requestUrl}: ${err.message}`,
        );
      });
  }

  private fetchJson<ResponseType>(
    requestUrl: string,
    requestOpts: RequestInit,
  ): Promise<ResponseType> {
    return request(requestUrl, requestOpts)
      .then(response => response.data)
      .then(responseAsJson => responseAsJson as ResponseType);
  }

  private findCookie(
    headers: Response['headers'],
    cookieName: string,
  ): CookieTokens {
    const cookies: string[] = headers['set-cookie'];
    const cookiePrefix = `${cookieName}=`;

    const cookieAuthToken = cookies.find(cookie =>
      cookie.startsWith(cookiePrefix),
    );
    const cookieXsrfToken = cookies.find(cookie =>
      cookie.startsWith('atlassian.account.xsrf.token='),
    );

    if (cookies && cookieAuthToken && cookieXsrfToken) {
      return {
        sessionToken: cookieAuthToken.split(';')[0].split('=')[1],
        xsrfToken: cookieXsrfToken.split(';')[0].split('=')[1],
      };
    } else {
      throw new Error(`Cookie ${cookieName} not found in Set-Cookie header`);
    }
  }
}
