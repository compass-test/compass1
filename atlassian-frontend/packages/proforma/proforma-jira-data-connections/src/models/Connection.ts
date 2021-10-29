import {
  AuthConfiguration,
  DataConnectionStatus,
} from '@atlassian/proforma-common-core/jira-common-models';

import { CachingTimeout } from './CachingTimeout';
import { ConnectionType } from './ConnectionType';

export interface BaseDataConnection {
  type: ConnectionType;
  name: string;
  path: string;
  idName: string;
  labelName: string;
  cachingTimeout: CachingTimeout;
  status: DataConnectionStatus;
}

export interface ConnectionSummary {
  id: string;
  type: ConnectionType;
  name: string;
  status: DataConnectionStatus;
  source: string;
}

export type DataConnection = RestConnection;

export interface RestConnection extends BaseDataConnection {
  type: ConnectionType.RestApi;
  url: string;
  auth?: AuthConfiguration;
  source?: string;
}
