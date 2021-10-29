import { ConnectionBasic } from './ConnectionBasic';

export interface ConnectionItemsRequestBase {
  preview: boolean;
  path: string;
  idName: string;
  labelName: string;
}

export type ConnectionItemsRequest = ConnectionItemsRequestBase &
  ConnectionBasic;
