import { ExportRequest } from '../models/ExportRequest';

export interface ExportStartResponse {
  getStatusUrl: string;
}

export interface ExportGetStatusResponse {
  progress: number;
  failureMessage?: string;
  downloadUrl?: string;
}

export interface ExportApi {
  start(exportRequest: ExportRequest): Promise<ExportStartResponse>;

  getStatus(getStatusUrl: string): Promise<ExportGetStatusResponse>;

  createDownloadUrl(relativeDownloadUrl: string): string;
}
