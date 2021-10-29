import {
  Form,
  SelectOption,
  TemplateForm,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { convertTemplateFormToUnsavedForm } from '@atlassian/proforma-common-core/form-system-utils';
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

export class LivePortalCreateFormApiV3 implements FormApiV3 {
  private readonly util: ApiUtil;
  private readonly serviceDeskId: number;
  private readonly requestTypeId: number;

  public constructor(
    util: ApiUtil,
    serviceDeskId: number,
    requestTypeId: number,
  ) {
    this.util = util;
    this.serviceDeskId = serviceDeskId;
    this.requestTypeId = requestTypeId;
  }

  getFormIndex(): Promise<IssueIndexForm[]> {
    // eslint-disable-next-line no-console
    console.log('`LivePortalCreateFormApiV3.getFormIndex` is not implemented.');
    return Promise.reject('Not implemented for portal create.');
  }

  getForm(formId: number): Promise<UnsavedForm> {
    return this.util
      .get(
        `/api/2/portal/${this.serviceDeskId}/requesttypes/${this.requestTypeId}`,
      )
      .then((templateForms: TemplateForm[]) => {
        if (templateForms.length) {
          return convertTemplateFormToUnsavedForm(templateForms[0]);
        }
        return Promise.reject();
      });
  }

  submitForm(issueId: number, formId: number, lock?: boolean): Promise<Form> {
    return Promise.reject('Portal Create cannot explicitly submit a form.');
  }

  reopenForm(issueId: number, formId: number): Promise<Form> {
    return Promise.reject('Portal Create cannot reopen a form.');
  }

  unlockForm(issueId: number, formId: number): Promise<Form> {
    return Promise.reject('Portal Create cannot unlock a form.');
  }

  getFormChoices(formId: number): Promise<ApiFormChoicesResponse> {
    return this.util.get(
      `/api/3/portal/${this.serviceDeskId}/requesttype/${this.requestTypeId}/formchoices`,
    );
  }

  postFieldValues(
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return this.util.post(
      `/api/3/portal/${this.serviceDeskId}/requesttype/${this.requestTypeId}/fieldvalues`,
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
        `/api/2/portal/${this.serviceDeskId}/requesttypes/${
          this.requestTypeId
        }/users/${questionId}?query=${encodeURIComponent(query)}`,
      )
      .then(users =>
        users.map((user: any) => ({
          label: user.name,
          value: user.id,
        })),
      );
  }
}
