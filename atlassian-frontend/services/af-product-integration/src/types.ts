export interface ALBEvent {
  microsHealthCheck?: any;
  httpMethod: string;
  path: string;
  queryStringParameters?: { [parameter: string]: string };
  headers?: { [header: string]: string };
  body: string | null;
  isBase64Encoded: boolean;
}

export interface BambooResult {
  successful: boolean;
  planKey: string;
  buildNumber: number;
  numPackagesInstalled?: number;
  resultUrl: string;
}

/** The status stored in the DB where commit + branch have been merged into a single hash key */
export interface DBStatus {
  commitBranch: string;
  product: string;
  result: Omit<BambooResult, 'planKey'>;
}

export interface Status {
  commit: string;
  product: string;
  branchName: string;
  result: Omit<BambooResult, 'planKey'>;
}

export interface ParsedWebhookRequest {
  headers: {
    eventKey: string;
    hookUUID: string;
    requestUUID: string;
    attemptNumber: string;
  };
  body: Record<string, unknown>;
}
