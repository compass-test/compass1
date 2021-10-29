import {
  FormAnswers,
  SelectOption,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  InsightApiResponse,
  InsightChoiceApi,
  InsightObjectQuery,
} from '@atlassian/proforma-common-core/jira-common-models';

export interface ProjectReference {
  id: number;
  name: string;
  projectTypeKey: string;
}

export interface IssueRequestType {
  id: string;
  name: string;
  icon?: string;
}

export interface FormDetails {
  projectFormId: number;
  projectName?: string;
  projectId: number;
  name: string;
  issueType: IssueRequestType;
  requestType?: IssueRequestType;
}

export interface AvailableFormsResponse {
  start: number;
  count: number;
  total: number;
  cursor: {
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
  };
  forms: FormDetails[];
}

export interface IssueCreateFormApiV3 {
  // NOTE: This should `extends FormApiV3`, but it would need mutable state.

  createIssue(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId: string | undefined,
    answers: FormAnswers,
  ): Promise<{ issueKey: string; projectId: number }>;

  getIssuePageUrl(issueKey: string): string;

  getAvailableProjects(): Promise<ProjectReference[]>;

  getAvailableFormsForProject(
    projectId: number,
  ): Promise<AvailableFormsResponse>;

  searchAvailableForms(
    projectId: number,
    searchText: string,
  ): Promise<AvailableFormsResponse>;

  getAvailableFormsFromCursor(cursor: string): Promise<AvailableFormsResponse>;

  getFormDetails(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<FormDetails>;

  getForm(projectId: number, templateFormId: number): Promise<UnsavedForm>;

  getFormChoices(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<ApiFormChoicesResponse>;

  postFieldValues(
    projectId: number,
    issueTypeId: string,
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse>;

  /** Returns up to `INSIGHT_OBJECT_LIMIT + 1` responses. */
  getInsightChoices(
    customFieldId: number,
    choiceApi: InsightChoiceApi,
    query: InsightObjectQuery,
  ): Promise<InsightApiResponse>;

  searchUsers(
    projectId: number,
    templateFormId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]>;
}
