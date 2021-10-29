import fetch, { RequestInit } from 'node-fetch';

export type AuthOpts = {
  username?: string;
  password?: string;
  token?: string;
};

export class BaseClient {
  private username?: string;
  private password?: string;
  private token?: string;

  public constructor({ username, password, token }: AuthOpts) {
    this.username = username;
    this.password = password;
    this.token = token;
  }

  protected getAuth() {
    if (this.token) {
      return `Bearer ${this.token}`;
    }
    const basicAuth = Buffer.from(`${this.username}:${this.password}`);
    const basicAuthBase64 = basicAuth.toString('base64');
    return `Basic ${basicAuthBase64}`;
  }

  protected getHeaders() {
    return {
      Authorization: this.getAuth(),
      'Content-Type': 'application/json',
    };
  }

  protected getOptions(method: RequestInit['method'], body?: object) {
    return {
      method,
      headers: this.getHeaders(),
      ...(body ? { body: JSON.stringify(body) } : {}),
    };
  }

  protected async request(endpoint: string, options: RequestInit) {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      try {
        return await response.json();
      } catch (err) {
        return undefined;
      }
    }
  }
}
