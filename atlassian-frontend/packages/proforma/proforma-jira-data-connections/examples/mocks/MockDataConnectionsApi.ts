import { MockData } from '@af/proforma-mocks';
import {
  AuthenticationType,
  DataConnectionStatus,
} from '@atlassian/proforma-common-core/jira-common-models';

import { DataConnectionsApi } from '../../src/apis/DataConnectionsApi';
import { CachingTimeout } from '../../src/models/CachingTimeout';
import { ConnectionSummary, DataConnection } from '../../src/models/Connection';
import { ConnectionBasic } from '../../src/models/ConnectionBasic';
import { ConnectionItemLocationsResponse } from '../../src/models/ConnectionItemLocationsResponse';
import { ConnectionItemsRequest } from '../../src/models/ConnectionItemsRequest';
import { ConnectionItemsResponse } from '../../src/models/ConnectionItemsResponse';
import { ConnectionType } from '../../src/models/ConnectionType';
import { TemplateFormName } from '../../src/models/TemplateFormName';

export class MockDataConnectionsApi implements DataConnectionsApi {
  private connections: Record<string, DataConnection> = {
    '00000000-0000-0000-0000-000000000000': {
      type: ConnectionType.RestApi,
      name: 'Product list API - REST',
      url: 'https://testurl.one.com',
      path: '/states',
      idName: 'stateId',
      labelName: 'stateName',
      cachingTimeout: CachingTimeout.Day1,
      status: DataConnectionStatus.Ok,
      source: 'https://testurl.one.com',
    },
    '11111111-1111-1111-1111-111111111111': {
      type: ConnectionType.RestApi,
      name: 'Product list API - REST with AUTH',
      url: 'https://testurl.two.com',
      auth: {
        type: AuthenticationType.Basic,
        username: 'admin',
        password: '',
      },
      path: '/states',
      idName: 'stateId',
      labelName: 'stateName',
      cachingTimeout: CachingTimeout.Day1,
      status: DataConnectionStatus.Failing,
      source: 'https://testurl.two.com',
    },
  };
  private templateFormNames: TemplateFormName[] = [];
  private connectionItemsResponses: Record<string, ConnectionItemsResponse> = {
    '00000000-0000-0000-0000-000000000000': {
      code: 200,
      items: [
        { id: '1', label: 'Melbourne' },
        { id: '2', label: 'Brisbane' },
        { id: '3', label: 'Sydney' },
        { id: '4', label: 'Hobart' },
      ],
    },
    '11111111-1111-1111-1111-111111111111': {
      code: 200,
      items: [
        { id: '1', label: 'Barcelona' },
        { id: '2', label: 'Madrid' },
      ],
    },
  };
  private connectionUuids: Record<string, string> = {
    'Product list API - REST': '00000000-0000-0000-0000-000000000000',
    'Product list API - REST with AUTH': '11111111-1111-1111-1111-111111111111',
    'Product list API - Jira Project property':
      '22222222-2222-2222-2222-222222222222',
  };

  constructor(private mockData: MockData) {
    this._createTemplateForms();
  }

  getConnectionSummaries(): Promise<ConnectionSummary[]> {
    return new Promise<ConnectionSummary[]>(resolve => {
      setTimeout(() => {
        const connectionSummaries = Object.keys(this.connections).map(uuid => {
          const conn = this.connections[uuid];
          return {
            id: uuid,
            type: conn.type,
            name: conn.name,
            status: conn.status,
            source: conn.source || '',
          };
        });
        resolve(connectionSummaries);
      }, 1000);
    });
  }

  getConnectionItems(
    request: ConnectionItemsRequest,
  ): Promise<ConnectionItemsResponse> {
    let connectionItemsResponse: ConnectionItemsResponse | undefined;
    if (request.type === ConnectionType.RestApi) {
      Object.keys(this.connections).forEach(uuid => {
        const connection = this.connections[uuid];
        if (
          request.type === connection.type &&
          request.url === connection.url
        ) {
          if (uuid in this.connectionItemsResponses) {
            connectionItemsResponse = this.connectionItemsResponses[uuid];
          }
        }
      });
    }
    if (connectionItemsResponse) {
      return Promise.resolve(connectionItemsResponse);
    }
    return Promise.resolve({
      code: 200,
      items: [
        {
          id: '1',
          label: 'Timbuktu',
        },
        {
          id: '2',
          label: 'Back of Bourke',
        },
        {
          id: '3',
          label: 'Boondocks',
        },
        {
          id: '4',
          label: 'Past the black stump',
        },
      ],
    });
  }

  getConnection(id: string): Promise<DataConnection> {
    return new Promise<DataConnection>((resolve, reject) => {
      setTimeout(() => {
        if (id in this.connections) {
          resolve(this.connections[id]);
        } else {
          reject();
        }
      }, 1000);
    });
  }

  testConnection(
    conn: ConnectionBasic,
  ): Promise<ConnectionItemLocationsResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: 200,
          headers: [],
          itemLocations: [
            {
              name: '/states',
              count: 0,
              idNames: ['stateId'],
              labelNames: ['stateId', 'stateName'],
            },
          ],
          request: [],
          contentType: 'application/json',
          data: '',
        });
      }, 1000);
    });
  }

  addConnection(conn: DataConnection): Promise<string> {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        const id = this._addConnection(conn);
        resolve(id);
      }, 1000);
    });
  }

  updateConnection(id: string, conn: DataConnection): Promise<string> {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        conn.status = DataConnectionStatus.Ok;
        this._updateConnection(id, conn);
        resolve(id);
      }, 1000);
    });
  }

  deleteConnection(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const conn = this._getConnection(id);
        if (conn) {
          conn.status = DataConnectionStatus.Deleted;
          this._updateConnection(id, conn);
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  }

  getConnectionForms(id: string): Promise<TemplateFormName[]> {
    return new Promise<TemplateFormName[]>(resolve => {
      if (Math.random() >= 0.5) {
        resolve(this.templateFormNames);
      } else {
        resolve([]);
      }
    });
  }

  private uuidV4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c,
    ) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private _addConnection(conn: DataConnection): string {
    const uuid =
      conn.name in this.connectionUuids
        ? this.connectionUuids[conn.name]
        : this.uuidV4();
    console.log('_addConnection:', uuid);
    this.connections[uuid] = conn;
    return uuid;
  }

  private _updateConnection(id: string, conn: DataConnection) {
    console.log('_addConnection:', id, conn);
    this.connections[id] = conn;
  }

  private _getConnection(id: string): DataConnection | undefined {
    return this.connections[id];
  }

  private _createTemplateForms = (): void => {
    this.mockData.templateForms.forEach((templateForm, i) =>
      this.templateFormNames.push({
        project: `Project ${i}`,
        name: templateForm.design.settings.name,
      }),
    );
  };
}
