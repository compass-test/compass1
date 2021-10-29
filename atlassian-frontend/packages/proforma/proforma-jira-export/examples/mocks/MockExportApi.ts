import {
  ExportApi,
  ExportGetStatusResponse,
  ExportStartResponse,
} from '../../src/apis/ExportApi';
import { ExportRequest } from '../../src/models/ExportRequest';

export class MockExportApi implements ExportApi {
  public start(exportRequest: ExportRequest): Promise<ExportStartResponse> {
    return new Promise<ExportStartResponse>(resolve => {
      const mockResponse: ExportStartResponse = {
        getStatusUrl: 'https://example.com',
      };
      setTimeout(() => {
        resolve(mockResponse);
      }, 1000);
    });
  }

  public getStatus(getStatusUrl: string): Promise<ExportGetStatusResponse> {
    return new Promise<ExportGetStatusResponse>(resolve => {
      let mockResponse: ExportGetStatusResponse;
      if (Math.random() < 0.3) {
        mockResponse = {
          progress: 100,
          downloadUrl: 'https://example.com',
        };
      } else {
        mockResponse = {
          progress: 50,
        };
      }
      setTimeout(() => {
        resolve(mockResponse);
      }, 1000);
    });
  }

  public createDownloadUrl(relativeDownloadUrl: string): string {
    return relativeDownloadUrl;
  }
}
