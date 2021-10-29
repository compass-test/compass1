/* eslint-disable import/prefer-default-export */
import { PagedResults } from '../models/PagedResults';
import { TemplateFormIndex } from '../models/ProjectForm';

export interface XlsxDownloadTask {
  id: number;
  status: {
    complete: boolean;
    failed: boolean;
    progress: number;
    message?: string;
  };
}

export interface ProjectFormApi {
  type: string;

  getForms(projectId: number): Promise<TemplateFormIndex[]>;

  getFormsPaginated(
    pageSize: number,
    projectId: number,
    cursor?: string,
  ): Promise<PagedResults<TemplateFormIndex>>;

  startXlsxDownload(
    projectId: number,
    projectFormId: number,
  ): Promise<XlsxDownloadTask>;

  checkXlsxDownload(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<XlsxDownloadTask>;

  downloadFinishedXlsx(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<Blob>;

  getXlsxDownloadUrl(projectId: number, projectFormId: any): string;

  deleteProjectForm(projectId: number, projectFormId: any): Promise<void>;
}

export abstract class ProjectFormApiAbstract {
  type = 'projectForm';

  abstract getForms(projectId: number): Promise<TemplateFormIndex[]>;

  abstract getFormsPaginated(
    pageSize: number,
    projectId: number,
    cursor?: string,
  ): Promise<PagedResults<TemplateFormIndex>>;

  abstract startXlsxDownload(
    projectId: number,
    projectFormId: number,
  ): Promise<XlsxDownloadTask>;

  abstract checkXlsxDownload(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<XlsxDownloadTask>;

  abstract downloadFinishedXlsx(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<Blob>;

  abstract getXlsxDownloadUrl(projectId: number, projectFormId: any): string;

  abstract deleteProjectForm(
    projectId: number,
    projectFormId: any,
  ): Promise<void>;
}
