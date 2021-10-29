export enum DataConnectionStatus {
  Unknown = 'unknown',
  Ok = 'ok',
  Failing = 'failing',
  Deleted = 'deleted',
}

export interface DataConnectionItem {
  id: string;
  label: string;
}

export interface DataConnectionResponse {
  id: string;
  name: string;
  status: DataConnectionStatus;
  choices: DataConnectionItem[];
}
