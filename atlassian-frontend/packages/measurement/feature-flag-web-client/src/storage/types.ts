export class IE8Exception extends Error {
  public number = 0;
}

export interface OldUserValue {
  value: string;
  timestamp: number;
}

export interface ObjectWithTimestamp {
  timestamp: number;
}
