import {
  DataConnectionItem,
  ResponseStatus,
} from '@atlassian/proforma-common-core/jira-common-models';

export interface ConnectionItemsResponse extends ResponseStatus {
  raw?: string;
  items: DataConnectionItem[];
}
