import { JiraFieldChoice } from './JiraFieldChoice';

export interface ApiFormChoicesResponse {
  fields: {
    [key: string]: JiraFieldChoice[];
  };
  dataConnections: {
    [key: string]: JiraFieldChoice[];
  };
}
