import {
  Form,
  SelectOption,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  ApiUtil,
  FormApiV3,
  insightPathSegment,
} from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  InsightApiResponse,
  InsightChoiceApi,
  InsightObjectQuery,
  IssueIndexForm,
} from '@atlassian/proforma-common-core/jira-common-models';

export class LiveIssueFormApiV3 implements FormApiV3 {
  private readonly util: ApiUtil;
  private readonly issueKey: string;
  private readonly issueId: number;

  public constructor(util: ApiUtil, issueKey: string, issueId: number) {
    this.util = util;
    this.issueKey = issueKey;
    this.issueId = issueId;
  }

  getFormIndex(): Promise<IssueIndexForm[]> {
    return this.util.get(`/api/3/issue/${this.issueId}/formindex`);
  }

  getForm(formId: number): Promise<Form> {
    return this.util.get(`/api/3/issue/${this.issueId}/form/${formId}`);
  }

  public submitForm(
    issueId: number,
    formId: number,
    lock?: boolean,
  ): Promise<Form> {
    return this.util.put(
      `/api/3/issue/${issueId}/form/${formId}/${lock ? 'lock' : 'submit'}`,
      {},
    );
  }

  public reopenForm(issueId: number, formId: number): Promise<Form> {
    return this.util.put(`/api/3/issue/${issueId}/form/${formId}/reopen`, {});
  }

  public unlockForm(issueId: number, formId: number): Promise<Form> {
    return this.util.put(`/api/3/issue/${issueId}/form/${formId}/unlock`, {});
  }

  getFormChoices(formId: number): Promise<ApiFormChoicesResponse> {
    return this.util.get(
      `/api/3/issue/${this.issueKey}/form/${formId}/formchoices`,
    );
  }

  postFieldValues(
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return this.util.post(`/api/3/issue/${this.issueId}/fieldvalues`, request);
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
    formId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]> {
    return this.util
      .get(
        `/api/2/issues/${
          this.issueId
        }/forms/${formId}/users/${questionId}?query=${encodeURIComponent(
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
