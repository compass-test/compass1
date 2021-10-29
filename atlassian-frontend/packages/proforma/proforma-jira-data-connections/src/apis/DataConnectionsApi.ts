import { ConnectionSummary, DataConnection } from '../models/Connection';
import { ConnectionBasic } from '../models/ConnectionBasic';
import { ConnectionItemLocationsResponse } from '../models/ConnectionItemLocationsResponse';
import { ConnectionItemsRequest } from '../models/ConnectionItemsRequest';
import { ConnectionItemsResponse } from '../models/ConnectionItemsResponse';
import { TemplateFormName } from '../models/TemplateFormName';

export interface DataConnectionsApi {
  getConnectionSummaries(): Promise<ConnectionSummary[]>;

  getConnectionItems(
    request: ConnectionItemsRequest,
  ): Promise<ConnectionItemsResponse>;

  getConnection(id: string): Promise<DataConnection>;

  testConnection(
    conn: ConnectionBasic,
  ): Promise<ConnectionItemLocationsResponse>;

  addConnection(conn: DataConnection): Promise<string>;

  updateConnection(id: string, conn: DataConnection): Promise<string>;

  deleteConnection(id: string): Promise<void>;

  getConnectionForms(id: string): Promise<TemplateFormName[]>;
}
