import { ApiUtil } from '@atlassian/proforma-common-core/jira-common-apis';

import { ConnectionSummary, DataConnection } from '../models/Connection';
import { ConnectionBasic } from '../models/ConnectionBasic';
import { ConnectionItemLocationsResponse } from '../models/ConnectionItemLocationsResponse';
import { ConnectionItemsRequest } from '../models/ConnectionItemsRequest';
import { ConnectionItemsResponse } from '../models/ConnectionItemsResponse';
import { TemplateFormName } from '../models/TemplateFormName';

import { DataConnectionsApi } from './DataConnectionsApi';

export class LiveDataConnectionsApi implements DataConnectionsApi {
  public constructor(private util: ApiUtil) {}

  public getConnectionSummaries(): Promise<ConnectionSummary[]> {
    return this.util.get(`/api/1/admin/connection`);
  }

  public getConnection(id: string): Promise<DataConnection> {
    return this.util.get(`/api/1/admin/connection/${id}`);
  }

  public deleteConnection(id: string): Promise<void> {
    return this.util.delete(`/api/1/admin/connection/${id}`);
  }

  public testConnection(
    conn: ConnectionBasic,
  ): Promise<ConnectionItemLocationsResponse> {
    return this.util.post('/api/1/admin/connection/itemLocations', conn).then(
      result =>
        result || {
          code: 504,
          headers: [],
          itemLocations: [],
        },
    );
  }

  public getConnectionItems(
    request: ConnectionItemsRequest,
  ): Promise<ConnectionItemsResponse> {
    return this.util.post('/api/1/admin/connection/items', request);
  }

  public addConnection(conn: DataConnection): Promise<string> {
    return this.util
      .post('/api/1/admin/connection', conn)
      .then((r): string => r.id);
  }

  public updateConnection(id: string, conn: DataConnection): Promise<string> {
    return this.util.put(`/api/1/admin/connection/${id}`, conn).then(_ => id);
  }

  public getConnectionForms(id: string): Promise<TemplateFormName[]> {
    return this.util.post(`/api/1/admin/connection/${id}/forms`, undefined);
  }
}
