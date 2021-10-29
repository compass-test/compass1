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

export class LivePortalFormApiV3 implements FormApiV3 {
  private readonly util: ApiUtil;
  private readonly serviceDeskId: number;
  private readonly requestTypeId: number;
  private readonly issueKey: string;

  public constructor(
    util: ApiUtil,
    serviceDeskId: number,
    requestTypeId: number,
    issueKey: string,
  ) {
    this.util = util;
    this.serviceDeskId = serviceDeskId;
    this.requestTypeId = requestTypeId;
    this.issueKey = issueKey;
  }

  getFormIndex(): Promise<IssueIndexForm[]> {
    return this.util.get(
      `/api/3/portal/${this.serviceDeskId}/request/${this.issueKey}/formindex`,
    );
  }

  getForm(formId: number): Promise<Form> {
    return this.util.get(
      `/api/3/portal/${this.serviceDeskId}/request/${this.issueKey}/form/${formId}`,
    );
  }

  submitForm(issueId: number, formId: number, lock?: boolean): Promise<Form> {
    return this.util.put(
      `/api/3/portal/${this.serviceDeskId}/request/${issueId}/form/${formId}/${
        lock ? 'lock' : 'submit'
      }`,
      {},
    );
  }

  reopenForm(issueId: number, formId: number): Promise<Form> {
    return Promise.reject('Portal Create cannot reopen a form.');
  }

  unlockForm(issueId: number, formId: number): Promise<Form> {
    return Promise.reject('Portal Create cannot unlock a form.');
  }

  getFormChoices(formId: number): Promise<ApiFormChoicesResponse> {
    return this.util.get(
      `/api/3/portal/${this.serviceDeskId}/request/${this.issueKey}/form/${formId}/formchoices`,
    );
  }

  postFieldValues(
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return this.util.post(
      `/api/3/portal/${this.serviceDeskId}/request/${this.issueKey}/fieldvalues`,
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
    // @ts-ignore
    query['customFieldId'] = customFieldId;
    return this.util.jiraPost(
      `/rest/insight_servicedesk/1.0/servicedesk/customfield/${pathSegment}/${this.requestTypeId}/objects`,
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
        `/api/2/portal/${this.serviceDeskId}/issues/${
          this.issueKey
        }/users/${formId}/${questionId}?query=${encodeURIComponent(query)}`,
      )
      .then(users =>
        users.map((user: any) => ({
          label: user.name,
          value: user.id,
        })),
      );
  }
}
