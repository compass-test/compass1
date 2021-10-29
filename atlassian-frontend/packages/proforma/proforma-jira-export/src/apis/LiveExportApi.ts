import { ApiUtil } from '@atlassian/proforma-common-core/jira-common-apis';

import { ExportRequest, InternalExportApiPath } from '../models/ExportRequest';

import {
  ExportApi,
  ExportGetStatusResponse,
  ExportStartResponse,
} from './ExportApi';

export class LiveExportApi implements ExportApi {
  private util: ApiUtil;

  public constructor(util: ApiUtil) {
    this.util = util;
  }

  public start(exportRequest: ExportRequest): Promise<ExportStartResponse> {
    return this.util.post(InternalExportApiPath, exportRequest);
  }

  public getStatus(getStatusUrl: string): Promise<ExportGetStatusResponse> {
    return this.util.get(getStatusUrl);
  }

  public createDownloadUrl(relativeDownloadUrl: string): string {
    return this.util.createApiUrl(relativeDownloadUrl);
  }
}
