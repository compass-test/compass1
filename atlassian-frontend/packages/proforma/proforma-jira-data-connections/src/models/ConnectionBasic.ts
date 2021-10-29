import { AuthConfiguration } from '@atlassian/proforma-common-core/jira-common-models';

import { ConnectionType } from './ConnectionType';

export type ConnectionBasic = RestConnectionBasic;

export interface RestConnectionBasic {
  type: ConnectionType.RestApi;
  url: string;
  auth?: AuthConfiguration;
}
