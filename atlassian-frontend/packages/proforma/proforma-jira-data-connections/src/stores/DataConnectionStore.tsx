import { action, observable } from 'mobx';

import { NoticeType } from '@atlassian/proforma-common-core/jira-common';
import {
  DataConnectionItem,
  DataConnectionStatus,
} from '@atlassian/proforma-common-core/jira-common-models';
import { ErrorUtils } from '@atlassian/proforma-common-core/jira-common-utils';

import { DataConnectionsApi } from '../apis/DataConnectionsApi';
import { DataConnection } from '../models/Connection';
import { ConnectionItemLocationsResponse } from '../models/ConnectionItemLocationsResponse';
import { ConnectionType } from '../models/ConnectionType';

import { RestConnectionDetailsStore } from './RestConnectionDetailsStore';

export class DataConnectionStore {
  @observable public loading: boolean = false;
  @observable public type?: ConnectionType;
  @observable public name?: string;
  @observable public status?: DataConnectionStatus;
  @observable public detailsStore?: RestConnectionDetailsStore;
  @observable public testing: boolean = false;
  @observable
  public testItemLocationsResponse?: ConnectionItemLocationsResponse;
  @observable public loadingConnectionItems: boolean = false;
  @observable public readonly connectionItems: DataConnectionItem[] = [];
  @observable public savingConnection: boolean = false;

  public constructor(
    private dataConnectionsApi: DataConnectionsApi,
    private errorUtils: ErrorUtils,
    public id?: string,
  ) {}

  @action public loadDetails(): void {
    this.loading = true;
    if (this.id !== undefined) {
      this.dataConnectionsApi
        .getConnection(this.id)
        .then(connection => {
          this.updateDetails(connection);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  @action public updateDetails(connection: DataConnection): void {
    this.type = connection.type;
    this.name = connection.name;
    this.status = connection.status;
    switch (connection.type) {
      case ConnectionType.RestApi:
        this.detailsStore = new RestConnectionDetailsStore(connection);
        break;
      default:
        throw new Error(
          'Unsupported connection type: ' + (connection as any).type,
        );
    }
  }

  @action public updateConnectionType(type: ConnectionType): void {
    this.type = type;
    switch (type) {
      case ConnectionType.RestApi:
        this.detailsStore = new RestConnectionDetailsStore();
        break;
      default:
        throw new Error('Unsupported connection type: ' + type);
    }
  }

  @action public updateName(name: string): void {
    this.name = name;
  }

  @action public testConnection(): Promise<void> {
    this.testItemLocationsResponse = undefined;
    const conn = this.detailsStore?.connectionBasic();
    if (!conn) {
      return Promise.resolve();
    }
    this.testing = true;
    return this.dataConnectionsApi
      .testConnection(conn)
      .then(response => {
        this.status =
          response.code === 200
            ? DataConnectionStatus.Ok
            : DataConnectionStatus.Failing;
        this.testItemLocationsResponse = response;
      })
      .finally(() => {
        this.testing = false;
      });
  }

  @action public getConnectionItems(): Promise<void> {
    this.connectionItems.splice(0, this.connectionItems.length);
    const itemRequest = this.detailsStore?.itemsRequest();
    if (!itemRequest) {
      return Promise.resolve();
    }
    this.loadingConnectionItems = true;
    return this.dataConnectionsApi
      .getConnectionItems(itemRequest)
      .then(response => {
        this.connectionItems.splice(
          0,
          this.connectionItems.length,
          ...response.items,
        );
      })
      .finally(() => {
        this.loadingConnectionItems = false;
      });
  }

  @action public save(): Promise<boolean> {
    if (
      this.detailsStore === undefined ||
      this.name === undefined ||
      this.status === undefined ||
      this.type === undefined
    ) {
      return Promise.reject('Connection details missing.');
    }

    const toSave = this.detailsStore.serialise(this.name, this.status);
    this.savingConnection = true;
    return (this.id === undefined
      ? this.dataConnectionsApi.addConnection(toSave)
      : this.dataConnectionsApi.updateConnection(this.id, toSave)
    )
      .then(id => {
        this.id = id;
        return true;
      })
      .catch(() => {
        this.errorUtils.notifyUser(
          this.id === undefined
            ? NoticeType.ErrorApiAddConnectionFailed
            : NoticeType.ErrorApiUpdateConnectionFailed,
        );
        return false;
      })
      .finally(() => {
        this.savingConnection = false;
      });
  }
}
