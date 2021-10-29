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

export class MockPortalCreateFormApiV3 implements FormApiV3 {
  constructor(
    private mockData: MockData,
    private createFromTemplateFormId: number,
  ) {}

  getFormIndex(): Promise<IssueIndexForm[]> {
    return Promise.reject('Not implemented.');
  }

  getForm(formId: number): Promise<Form | UnsavedForm> {
    return new Promise<UnsavedForm>((resolve, reject) => {
      setTimeout(() => {
        const unsavedForm = this.mockData.getFormFromTemplateForm(
          this.createFromTemplateFormId,
        );
        if (unsavedForm) {
          resolve(unsavedForm);
        } else {
          reject();
        }
      }, 1000);
    });
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
