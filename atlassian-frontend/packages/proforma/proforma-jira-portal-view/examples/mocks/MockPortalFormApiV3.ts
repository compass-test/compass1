import { MockData } from '@af/proforma-mocks';
import {
  Form,
  SelectOption,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { FormApiV3 } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  InsightApiResponse,
  InsightChoiceApi,
  InsightObjectQuery,
  IssueIndexForm,
} from '@atlassian/proforma-common-core/jira-common-models';

export class MockPortalFormApiV3 implements FormApiV3 {
  constructor(private mockData: MockData, private issueKey: string) {}

  getFormIndex(): Promise<IssueIndexForm[]> {
    return Promise.resolve(this.mockData.v3.issue[this.issueKey].formindex);
  }

  getForm(formId: number): Promise<Form | UnsavedForm> {
    return Promise.resolve(
      this.mockData.v3.issue[this.issueKey].form[formId].form,
    );
  }

  submitForm(issueId: number, formId: number, lock?: boolean): Promise<Form> {
    return Promise.reject('Not implemented.');
  }

  reopenForm(issueId: number, formId: number): Promise<Form> {
    return Promise.reject('Not implemented.');
  }

  unlockForm(issueId: number, formId: number): Promise<Form> {
    return Promise.reject('Not implemented.');
  }

  getFormChoices(formId: number): Promise<ApiFormChoicesResponse> {
    return Promise.reject('Not implemented.');
  }

  postFieldValues(
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return Promise.reject('Not implemented.');
  }

  /** Returns up to `INSIGHT_OBJECT_LIMIT + 1` responses. */
  getInsightChoices(
    customFieldId: number,
    choiceApi: InsightChoiceApi,
    query: InsightObjectQuery,
  ): Promise<InsightApiResponse> {
    return Promise.reject('Not implemented.');
  }

  searchUsers(
    formId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]> {
    return Promise.reject('Not implemented.');
  }
}
