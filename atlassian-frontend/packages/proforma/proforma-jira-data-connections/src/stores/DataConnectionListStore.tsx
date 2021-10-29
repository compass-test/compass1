import { action, computed, observable } from 'mobx';

import { DataConnectionsApi } from '../apis/DataConnectionsApi';
import { ConnectionSummary } from '../models/Connection';

export class DataConnectionListStore {
  @observable public loadingSummaries: boolean = false;
  @observable public readonly connectionSummaries: ConnectionSummary[] = [];

  constructor(private dataConnectionsApi: DataConnectionsApi) {
    this.loadSummaries();
  }

  @action public loadSummaries(): Promise<void> {
    this.loadingSummaries = true;
    return this.dataConnectionsApi
      .getConnectionSummaries()
      .then(connectionSummaries => {
        this.connectionSummaries.splice(
          0,
          this.connectionSummaries.length,
          ...connectionSummaries,
        );
      })
      .finally(() => {
        this.loadingSummaries = false;
      });
  }

  @computed public get hasConnectionSummaries(): boolean {
    return this.connectionSummaries.length > 0;
  }
}
