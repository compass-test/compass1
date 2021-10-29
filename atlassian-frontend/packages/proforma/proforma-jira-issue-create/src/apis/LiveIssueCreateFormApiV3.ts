import {
  FormAnswers,
  SelectOption,
  TemplateForm,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { convertTemplateFormToUnsavedForm } from '@atlassian/proforma-common-core/form-system-utils';
import {
  ApiUtil,
  insightPathSegment,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  InsightApiResponse,
  InsightChoiceApi,
  InsightObjectQuery,
} from '@atlassian/proforma-common-core/jira-common-models';
import { urlParam } from '@atlassian/proforma-common-core/jira-common-utils';

import {
  AvailableFormsResponse,
  FormDetails,
  IssueCreateFormApiV3,
  ProjectReference,
} from './IssueCreateFormApiV3';

export class LiveIssueCreateFormApiV3 implements IssueCreateFormApiV3 {
  private readonly util: ApiUtil;

  public constructor(util: ApiUtil) {
    this.util = util;
  }

  createIssue(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId: string | undefined,
    answers: FormAnswers,
  ): Promise<{ issueKey: string; projectId: number }> {
    return this.util.put(`/api/2/createissue`, {
      projectId,
      templateFormId,
      issueTypeId,
      requestTypeId,
      answers,
    });
  }

  getIssuePageUrl(issueKey: string): string {
    return this.util.createJiraUrl(`/browse/${issueKey}`);
  }

  getAvailableProjects(): Promise<ProjectReference[]> {
    return this.util.get(`/api/1/createissue/projects`);
  }

  getAvailableFormsForProject(
    projectId: number,
  ): Promise<AvailableFormsResponse> {
    return this.util.get(
      `/api/1/createissue/forms?projectId=${encodeURIComponent(projectId)}`,
    );
  }

  searchAvailableForms(
    projectId: number,
    searchText: string,
  ): Promise<AvailableFormsResponse> {
    return this.util.get(
      `/api/1/createissue/forms?projectId=${encodeURIComponent(
        projectId,
      )}&search=${encodeURIComponent(searchText)}`,
    );
  }

  getAvailableFormsFromCursor(cursor: string): Promise<AvailableFormsResponse> {
    return this.util.get(
      `/api/1/createissue/forms?cursor=${encodeURIComponent(cursor)}`,
    );
  }

  getFormDetails(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<FormDetails> {
    return this.util.get(
      `/api/3/createissue/form/${projectId}/${templateFormId}/issuetype/${issueTypeId}/formdetails?${urlParam(
        'requestTypeId',
        requestTypeId,
        '',
      )}`,
    );
  }

  getForm(projectId: number, templateFormId: number): Promise<UnsavedForm> {
    return this.util
      .get(`/api/3/createissue/form/${projectId}/${templateFormId}`)
      .then(
        (templateForms: TemplateForm): UnsavedForm => {
          return convertTemplateFormToUnsavedForm(templateForms);
        },
      );
  }

  getFormChoices(
    projectId: number,
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<ApiFormChoicesResponse> {
    if (requestTypeId) {
      return this.util.get(
        `/api/3/createissue/form/${projectId}/${templateFormId}/requesttype/${requestTypeId}/formchoices`,
      );
    }
    return this.util.get(
      `/api/3/createissue/form/${projectId}/${templateFormId}/issuetype/${issueTypeId}/formchoices`,
    );
  }

  postFieldValues(
    projectId: number,
    issueTypeId: string,
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return this.util.post(
      `/api/3/createissue/form/${projectId}/issuetype/${issueTypeId}/fieldvalues`,
      request,
    );
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
    return this.util.jiraPost(
      `/rest/insight/1.0/customfield/${pathSegment}/${choiceApi.fieldConfigId}/objects`,
      query,
    );
  }

  searchUsers(
    projectId: number,
    templateFormId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]> {
    return this.util
      .get(
        `/api/2/createissue/form/${projectId}/${templateFormId}/users/${questionId}?query=${encodeURIComponent(
          query,
        )}`,
      )
      .then(users =>
        users.map((user: any) => ({
          label: user.name,
          value: user.id,
        })),
      );
  }
}
