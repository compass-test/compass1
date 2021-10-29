import {
  ProjectFormApiAbstract,
  XlsxDownloadTask,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  PagedResults,
  TemplateFormIndex,
} from '@atlassian/proforma-common-core/jira-common-models';

import { MockData } from './data/MockData';
import { MockSearchHelper } from './MockSearchHelper';

export class MockProjectFormApi extends ProjectFormApiAbstract {
  private mockSearch: MockSearchHelper<TemplateFormIndex>;

  public constructor(private mockData: MockData) {
    super();
    this.mockSearch = new MockSearchHelper(false);
  }

  public getForms(projectId: number): Promise<TemplateFormIndex[]> {
    return this.mockSearch
      .searchAll(() =>
        this.mockData.templateFormIndexes.filter(
          f => !projectId || f.projectId === projectId,
        ),
      )
      .then(pagedResults => pagedResults.results);
  }

  public getFormsForProjectId(projectId: number): Promise<TemplateFormIndex[]> {
    return this.mockSearch
      .searchAll(() =>
        this.mockData.templateFormIndexes.filter(
          f => !projectId || f.projectId === projectId,
        ),
      )
      .then(pagedResults => pagedResults.results);
  }

  public getFormsPaginated(
    pageSize: number,
    projectId: number,
    cursor?: string,
  ): Promise<PagedResults<TemplateFormIndex>> {
    return this.mockSearch.search(
      () =>
        this.mockData.templateFormIndexes.filter(
          f => !projectId || f.projectId === projectId,
        ),
      pageSize,
    );
  }

  public startXlsxDownload(
    projectId: number,
    projectFormId: number,
  ): Promise<XlsxDownloadTask> {
    return Promise.resolve(
      this.mockData.startXlsxDownload(projectId, projectFormId),
    );
  }

  public checkXlsxDownload(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<XlsxDownloadTask> {
    return Promise.resolve(
      this.mockData.checkXlsxDownload(projectId, projectFormId, taskId),
    );
  }

  public downloadFinishedXlsx(
    projectId: number,
    projectFormId: number,
    taskId: number,
  ): Promise<Blob> {
    return new Promise(resolve => {
      setTimeout(() => {
        const blob = new Blob(['Mock xlsx form'], { type: 'text/plain' });
        resolve(blob);
      }, 1000);
    });
  }

  public getXlsxDownloadUrl(projectId: any, formId: any): string {
    return 'https://docs.collectiveaccess.org/images/6/68/Sample_data.xlsx';
  }

  public deleteProjectForm(projectId: any, formId: any): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        this.mockData.deleteProjectForm(formId);
        resolve();
      }, 1000);
    });
  }
}
