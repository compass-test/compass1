import { PagedResults } from '../../models/PagedResults';
import { TemplateFormIndex } from '../../models/ProjectForm';
import { urlParam } from '../../utils/live/urlHelpers';
import { ProjectFormApiAbstract, XlsxDownloadTask } from '../ProjectFormApi';

import { AcceptedResponseType, ApiUtil } from './ApiUtil';

export class LiveProjectFormApi extends ProjectFormApiAbstract {
  private util: ApiUtil;

  public constructor(util: ApiUtil) {
    super();
    this.util = util;
  }

  public getForms(projectId: number): Promise<TemplateFormIndex[]> {
    return this.util.get(`/api/1/projects/${projectId}/forms`);
  }

  public getFormsPaginated(
    pageSize: number,
    projectId: number,
    cursor?: string,
  ): Promise<PagedResults<TemplateFormIndex>> {
    return this.util.get(
      `/api/2/projects/${projectId}/forms?pageSize=${pageSize}` +
        urlParam('cursor', cursor),
    );
  }

  public startXlsxDownload(
    projectId: number,
    projectFormId: number,
  ): Promise<XlsxDownloadTask> {
    return this.util.post(
      `/api/2/reports/all-form-responses/${projectId}/${projectFormId}`,
      undefined,
    );
  }

  public checkXlsxDownload(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<XlsxDownloadTask> {
    return this.util.get(
      `/api/2/reports/all-form-responses/${projectId}/${projectFormId}/${taskId}`,
    );
  }

  public downloadFinishedXlsx(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<Blob> {
    return this.util.get(
      `/api/2/reports/all-form-responses/${projectId}/${projectFormId}/${taskId}/ProForma-${projectId}-form-${projectFormId}.xlsx`,
      AcceptedResponseType.Blob,
    );
  }

  public getXlsxDownloadUrl(projectId: number, formId: number): string {
    return `/api/1/projects/${projectId}/forms/${formId}/spreadsheet`;
  }

  public deleteProjectForm(projectId: number, formId: number): Promise<void> {
    return this.util.delete(`/api/1/projects/${projectId}/forms/${formId}`);
  }
}
