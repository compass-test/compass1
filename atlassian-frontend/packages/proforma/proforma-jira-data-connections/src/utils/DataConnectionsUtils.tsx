import { DataConnectionStatus } from '@atlassian/proforma-common-core/jira-common-models';
import {
  AnalyticsEventName,
  AnalyticsUtils,
  ErrorUtils,
} from '@atlassian/proforma-common-core/jira-common-utils';

import { DataConnectionsApi } from '../apis/DataConnectionsApi';
import { CachingTimeout } from '../models/CachingTimeout';
import { ConnectionType } from '../models/ConnectionType';
import { TemplateFormName } from '../models/TemplateFormName';
import { DataConnectionListStore } from '../stores/DataConnectionListStore';
import { DataConnectionStore } from '../stores/DataConnectionStore';

export class DataConnectionsUtils {
  constructor(
    private dataConnectionsApi: DataConnectionsApi,
    private analyticsUtils: AnalyticsUtils,
    private errorUtils: ErrorUtils,
  ) {}

  public createDataConnectionListStore(): DataConnectionListStore {
    return new DataConnectionListStore(this.dataConnectionsApi);
  }

  public createDataConnectionStore(): DataConnectionStore {
    const dataConnectionStore = new DataConnectionStore(
      this.dataConnectionsApi,
      this.errorUtils,
    );
    dataConnectionStore.updateDetails({
      type: ConnectionType.RestApi,
      name: '',
      url: 'https://',
      path: '/',
      idName: '',
      labelName: '',
      cachingTimeout: CachingTimeout.Day1,
      status: DataConnectionStatus.Failing,
    });
    this.analyticsUtils.track(AnalyticsEventName.ConnectionsAddConnection, {});
    return dataConnectionStore;
  }

  public loadDataConnectionStore(
    connectionId: string,
  ): Promise<DataConnectionStore> {
    return this.dataConnectionsApi
      .getConnection(connectionId)
      .then(connection => {
        const dataConnectionStore = new DataConnectionStore(
          this.dataConnectionsApi,
          this.errorUtils,
          connectionId,
        );
        dataConnectionStore.updateDetails(connection);
        this.analyticsUtils.track(
          AnalyticsEventName.ConnectionsEditConnection,
          {},
        );
        return dataConnectionStore;
      });
  }

  public loadDataConnectionTemplateForms(
    connectionId: string,
  ): Promise<TemplateFormName[]> {
    return this.dataConnectionsApi.getConnectionForms(connectionId);
  }

  public deleteConnection(connectionId: string): Promise<void> {
    return this.dataConnectionsApi.deleteConnection(connectionId);
  }
}
