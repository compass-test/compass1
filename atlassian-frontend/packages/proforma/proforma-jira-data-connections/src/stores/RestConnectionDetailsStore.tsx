import { action, observable } from 'mobx';

import {
  AuthConfiguration,
  AuthenticationType,
  BasicAuthConfiguration,
  CustomAuthConfiguration,
  DataConnectionStatus,
  DigestAuthConfiguration,
} from '@atlassian/proforma-common-core/jira-common-models';

import { CachingTimeout } from '../models/CachingTimeout';
import { RestConnection } from '../models/Connection';
import { ConnectionBasic } from '../models/ConnectionBasic';
import { ConnectionItemsRequest } from '../models/ConnectionItemsRequest';
import { ConnectionType } from '../models/ConnectionType';

import { DataConnectionMessage } from './DataConnectionMessages.intl';

export class RestConnectionDetailsStore {
  @observable public cachingTimeout: CachingTimeout;
  @observable public url: string;
  @observable public authStore: AuthConfigurationStore;
  @observable public path: string;
  @observable public idName: string;
  @observable public labelName: string;

  public constructor(connection?: RestConnection) {
    if (connection) {
      this.cachingTimeout = connection.cachingTimeout;
      this.url = connection.url;
      this.path = connection.path;
      this.idName = connection.idName;
      this.labelName = connection.labelName;

      if (!connection.auth) {
        this.authStore = undefined;
      } else {
        switch (connection.auth.type) {
          case AuthenticationType.Basic:
            this.authStore = new BasicAuthConfigurationStore(connection.auth);
            break;
          case AuthenticationType.Digest:
            this.authStore = new DigestAuthConfigurationStore(connection.auth);
            break;
          case AuthenticationType.Custom:
            this.authStore = new CustomAuthConfigurationStore(connection.auth);
            break;
          default:
            throw new Error(
              'Unsupported authentication type: ' + connection.auth,
            );
        }
      }
    } else {
      this.cachingTimeout = CachingTimeout.Day1;
      this.url = 'http://';
      this.authStore = undefined;
      this.path = '/';
      this.idName = '';
      this.labelName = '';
    }
  }

  @action public updateAuthenticationType(
    type: AuthenticationType | undefined,
  ): void {
    if (!type) {
      this.authStore = undefined;
    } else {
      switch (type) {
        case AuthenticationType.Basic:
          this.authStore = new BasicAuthConfigurationStore();
          break;
        case AuthenticationType.Digest:
          this.authStore = new DigestAuthConfigurationStore();
          break;
        case AuthenticationType.Custom:
          this.authStore = new CustomAuthConfigurationStore();
          break;
        default:
          throw new Error('Unsupported authentication type: ' + type);
      }
    }
  }

  @action public updateCachingTimeout(timeout: CachingTimeout): void {
    this.cachingTimeout = timeout;
  }

  @action public updateUrl(url: string): void {
    this.url = url;
  }

  validateUrl(): DataConnectionMessage | undefined {
    const urlLower = this.url.toLowerCase();
    if (urlLower.startsWith('http://') || urlLower.startsWith('https://')) {
      return;
    }
    return DataConnectionMessage.InvalidUrl;
  }

  serialise(name: string, status: DataConnectionStatus): RestConnection {
    return {
      type: ConnectionType.RestApi,
      name: name,
      status: status,
      cachingTimeout: this.cachingTimeout,
      url: this.url,
      ...(this.authStore && { auth: this.authStore.serialise() }),
      path: this.path,
      idName: this.idName,
      labelName: this.labelName,
    };
  }

  @action public setItemLocationPath(path: string): void {
    this.path = path;
    this.idName = '';
    this.labelName = '';
  }

  public getItemLocationPath(): string {
    return this.path;
  }

  public getItemId(): string {
    return this.idName;
  }

  @action public setItemId(id: string): void {
    this.idName = id;
  }

  public getItemLabel(): string {
    return this.labelName;
  }

  @action public setItemLabel(label: string): void {
    this.labelName = label;
  }

  public connectionBasic(): ConnectionBasic {
    return {
      type: ConnectionType.RestApi,
      url: this.url,
      auth: this.authStore?.serialise(),
    };
  }

  public itemsRequest(): ConnectionItemsRequest {
    return {
      preview: true,
      path: this.path,
      idName: this.idName,
      labelName: this.labelName,
      ...this.connectionBasic(),
    };
  }

  public getSource(): string {
    return this.url;
  }
}

//-----------------------------------------------------------------------------
// AuthConfig Store

export type AuthConfigurationStore =
  | BasicAuthConfigurationStore
  | DigestAuthConfigurationStore
  | CustomAuthConfigurationStore
  | undefined;

export abstract class UsernameAndPasswordConfigurationStore {
  @observable public username: string;
  @observable public password: string;

  protected constructor(details?: { username: string; password: string }) {
    if (details) {
      this.username = details.username;
      this.password = details.password;
    } else {
      this.username = '';
      this.password = '';
    }
  }

  @action public updateUsername(username: string): void {
    this.username = username;
  }

  @action public updatePassword(password: string): void {
    this.password = password;
  }
}

export class BasicAuthConfigurationStore extends UsernameAndPasswordConfigurationStore {
  public type = AuthenticationType.Basic;

  public constructor(auth?: BasicAuthConfiguration) {
    super(auth);
  }

  public description(): string {
    return `Basic, username=${this.username}`;
  }

  public serialise(): AuthConfiguration {
    return {
      type: AuthenticationType.Basic,
      username: this.username,
      password: this.password,
    };
  }
}

export class DigestAuthConfigurationStore extends UsernameAndPasswordConfigurationStore {
  public type = AuthenticationType.Digest;

  public constructor(auth?: DigestAuthConfiguration) {
    super(auth);
  }

  public description(): string {
    return `Digest, username=${this.username}`;
  }

  public serialise(): AuthConfiguration {
    return {
      type: AuthenticationType.Digest,
      username: this.username,
      password: this.password,
    };
  }
}

export class CustomAuthConfigurationStore {
  public type = AuthenticationType.Custom;

  @observable public token: string;

  public constructor(auth?: CustomAuthConfiguration) {
    if (auth) {
      this.token = auth.token;
    } else {
      this.token = '';
    }
  }

  @action public updateToken(token: string): void {
    this.token = token;
  }

  public description(): string {
    return `Custom, token`;
  }

  public serialise(): AuthConfiguration {
    return {
      type: AuthenticationType.Custom,
      token: this.token,
    };
  }
}
