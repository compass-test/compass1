export interface AuthUtilServerSettings {
  apiBaseUrl: string;
  token?: string;
}

export class AuthUtil {
  private refreshTimeout?: any;

  private tokenRefreshInterval: number;

  private tokenRefreshUrl: string;

  public authToken?: string;

  private tokenAuthorised: boolean = false;

  public constructor(
    serverSettings: AuthUtilServerSettings,
    tokenRefreshInterval?: number,
  ) {
    this.authToken = serverSettings.token;
    this.tokenRefreshUrl = `${serverSettings.apiBaseUrl}/api/1/token/refresh`;
    this.tokenRefreshInterval = tokenRefreshInterval || 900000; // Default 15min
    // Start refreshing tokens if initial token is set.
    if (this.authToken) {
      this.tokenAuthorised = true;
      this.refreshAuthToken();
    }
  }

  private refreshAuthToken = (): void => {
    clearTimeout(this.refreshTimeout);

    if (!this.tokenAuthorised) {
      return;
    }

    this.refreshTimeout = setTimeout((): void => {
      this.fetchAuthToken();
      this.refreshAuthToken();
    }, this.tokenRefreshInterval);
  };

  private fetchAuthToken = (): void => {
    if (!this.tokenAuthorised) {
      return;
    }

    // Refresh token
    fetch(this.tokenRefreshUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response && response.status !== 401) {
        response.json().then(data => {
          if (data && data.token) {
            this.authToken = data.token;
            this.tokenAuthorised = true;
          } else {
            // TODO: handle error here
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log(
          'API returned a HTTP/401 response - JWT token no longer authorised',
        );
        this.tokenAuthorised = false;
      }
    });
  };
}
