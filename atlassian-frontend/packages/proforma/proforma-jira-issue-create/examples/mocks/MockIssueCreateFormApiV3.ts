import { MockData } from '@af/proforma-mocks';
import {
  FormAnswers,
  SelectOption,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { insightPathSegment } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  InsightApiResponse,
  InsightChoiceApi,
  InsightObjectQuery,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  AvailableFormsResponse,
  FormDetails,
  IssueCreateFormApiV3,
  ProjectReference,
} from '../../src/apis/IssueCreateFormApiV3';

export class MockIssueCreateFormApiV3 implements IssueCreateFormApiV3 {
  availableForms: FormDetails[] = [];

  constructor(private mockData: MockData) {
    mockData.projects.forEach(project => {
      for (let index = 0; index < 127; index += 1) {
        this.availableForms.push({
          projectFormId: index,
          projectId: project.id,
          projectName: project.name,
          name: `mockFormName${index}`,
          issueType: {
            id: 'mockIssueTypeId',
            name: 'mockIssueTypeName',
          },
        });
      }
    });
  }

  createIssue(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId: string | undefined,
    answers: FormAnswers,
  ): Promise<{ issueKey: string; projectId: number }> {
    return new Promise<{ issueKey: string; projectId: number }>(
      (resolve): void => {
        setTimeout((): void => {
          resolve({ issueKey: 'Mock111', projectId: 0 });
        }, 1000);
      },
    );
  }

  getIssuePageUrl(issueKey: string): string {
    return `/modules/browse/${issueKey}`;
  }

  getAvailableProjects(): Promise<ProjectReference[]> {
    return new Promise<ProjectReference[]>((resolve): void => {
      setTimeout((): void => {
        const availableProjects = this._getAvailableCreateIssueProjects();
        resolve(availableProjects);
      }, 1000);
    });
  }

  getAvailableFormsForProject(
    projectId: number,
  ): Promise<AvailableFormsResponse> {
    return new Promise<AvailableFormsResponse>((resolve): void => {
      setTimeout((): void => {
        const availableForms = this._getAvailableFormsForProject(projectId);

        let availableFormsSubset;
        let batchSize = 50;
        if (availableForms.length < 50) {
          availableFormsSubset = availableForms;
          batchSize = availableForms.length;
        } else {
          availableFormsSubset = availableForms.slice(0, 50);
        }

        resolve({
          start: 0,
          count: batchSize,
          total: availableForms.length,
          cursor: {
            first: 'mockFirstCursor',
            last: 'mockLastCursor',
            next: 'mockNextCursor',
            prev: 'mockPrevCursor',
          },
          forms: availableFormsSubset,
        });
      }, 1000);
    });
  }

  searchAvailableForms(
    projectId: number,
    searchText: string,
  ): Promise<AvailableFormsResponse> {
    return new Promise<AvailableFormsResponse>((resolve): void => {
      setTimeout((): void => {
        const availableForms = this._searchAvailableForms(searchText);

        let availableFormsSubset;
        let batchSize = 50;
        if (availableForms.length < 50) {
          availableFormsSubset = availableForms;
          batchSize = availableForms.length;
        } else {
          availableFormsSubset = availableForms.slice(0, 50);
        }
        resolve({
          start: 0,
          count: batchSize,
          total: availableForms.length,
          cursor: {
            first: 'mockFirstCursor',
            last: 'mockLastCursor',
            next: 'mockNextCursor',
            prev: 'mockPrevCursor',
          },
          forms: availableFormsSubset,
        });
      }, 1000);
    });
  }

  getAvailableFormsFromCursor(cursor: string): Promise<AvailableFormsResponse> {
    return new Promise<AvailableFormsResponse>((resolve): void => {
      setTimeout((): void => {
        const availableForms = this._getRandomBatchOfAvailableForms(50);

        let availableFormsSubset;
        let batchSize = 50;
        if (availableForms.length < 50) {
          availableFormsSubset = availableForms;
          batchSize = availableForms.length;
        } else {
          availableFormsSubset = availableForms.slice(0, 50);
        }
        resolve({
          start: 0,
          count: batchSize,
          total: availableForms.length,
          cursor: {
            first: 'mockFirstCursor',
            last: 'mockLastCursor',
            next: 'mockNextCursor',
            prev: 'mockPrevCursor',
          },
          forms: availableFormsSubset,
        });
      }, 1000);
    });
  }

  getFormDetails(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<FormDetails> {
    const formDetails = this.availableForms.find(
      formDetails =>
        formDetails.projectId === projectId &&
        formDetails.projectFormId === templateFormId &&
        formDetails.issueType.id === issueTypeId &&
        formDetails.requestType?.id === requestTypeId,
    );
    if (formDetails) {
      return Promise.resolve(formDetails);
    }
    return Promise.reject('Not found.');
  }

  getForm(projectId: number, templateFormId: number): Promise<UnsavedForm> {
    const form = this.mockData.v3.issue['TEST-1'].form[`2`].form;
    return Promise.resolve({ ...form, id: undefined });
  }

  getFormChoices(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<ApiFormChoicesResponse> {
    return Promise.resolve(
      this.mockData.v3.issue['TEST-1'].form[`${templateFormId}`].formchoices,
    );
  }

  postFieldValues(
    projectId: number,
    issueTypeId: string,
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return Promise.resolve(this.mockData.v3.issue['TEST-1'].fieldvalues) as any;
  }

  getInsightChoices(
    customFieldId: number,
    choiceApi: InsightChoiceApi,
    query: InsightObjectQuery,
  ): Promise<InsightApiResponse> {
    const pathSegment = insightPathSegment(choiceApi);
    if (!pathSegment) {
      return Promise.reject();
    }
    return Promise.resolve(
      this.mockData.v3.issue['TEST-1'].insight[
        choiceApi.fieldConfigId.toString()
      ],
    );
  }

  searchUsers(
    projectId: number,
    templateFormId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]> {
    return Promise.reject('Not implemented.');
  }

  private _getAvailableCreateIssueProjects(): ProjectReference[] {
    return this.mockData.projects.map(project => {
      return {
        id: project.id,
        name: project.name,
        projectTypeKey: project.projectTypeKey,
      };
    });
  }

  private _getAvailableFormsForProject(projectId: number): FormDetails[] {
    return this.availableForms.filter(
      availableForm => availableForm.projectId === projectId,
    );
  }

  private _searchAvailableForms(searchText: string): FormDetails[] {
    return this.availableForms.filter(availableForm => {
      return availableForm.name.includes(searchText);
    });
  }

  private _getRandomBatchOfAvailableForms(nForms: number): FormDetails[] {
    const randomSort = () => 0.5 - Math.random();
    const shuffled = this.availableForms.sort(randomSort);
    return shuffled.slice(0, nForms);
  }
}
