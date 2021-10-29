import {
  createBackendSettings,
  loadTypicalMockData,
  MockAnalyticsUtils,
  MockBrowserUtils,
  MockData,
  MockErrorUtils,
  MockFormApi,
} from '@af/proforma-mocks';
import {
  Form,
  SelectOption,
} from '@atlassian/proforma-common-core/form-system-models';
import { FormApiV3 } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  ApiFieldValuesRequest,
  ApiFieldValuesResponse,
  ApiFormChoicesResponse,
  BackendSettings,
  InsightApiResponse,
  InsightChoiceApi,
  InsightObjectQuery,
  IssueIndexForm,
} from '@atlassian/proforma-common-core/jira-common-models';
import { FormViewModuleContext } from '@atlassian/proforma-common-core/jira-common-stores';
import { Locale } from '@atlassian/proforma-translations';

import { adminPermissions, IssueViewSettings } from '../../src/components';

export class MockIssueFormApiV3 implements FormApiV3 {
  private mockData: MockData;

  constructor(mockData: MockData) {
    this.mockData = mockData;
  }

  getFormIndex(): Promise<IssueIndexForm[]> {
    const { issue } = this.mockData.v3;
    const { formindex } = issue['TEST-1'];
    return Promise.resolve(formindex);
  }

  getForm(formId: number): Promise<Form> {
    const form = this.mockData.v3.issue['TEST-1'].form[`${formId}`].form;
    return Promise.resolve(form);
  }

  submitForm(issueId: number, formId: number, lock?: boolean): Promise<Form> {
    return new Promise<Form>((resolve, reject): void => {
      setTimeout((): void => {
        const form = this.mockData.setFormSubmitted(issueId, formId);
        if (form) {
          resolve(form);
        } else {
          reject(
            new Error(
              `No issue form for issueId: ${issueId} and formID: ${formId} found.`,
            ),
          );
        }
      }, 1000);
    });
  }

  reopenForm(issueId: number, formId: number): Promise<Form> {
    return new Promise<Form>((resolve, reject): void => {
      setTimeout((): void => {
        const form = this.mockData.setFormOpen(issueId, formId);
        if (form) {
          resolve(form);
        } else {
          reject(
            new Error(
              `No issue form for issueId: ${issueId} and formID: ${formId} found.`,
            ),
          );
        }
      }, 1000);
    });
  }

  unlockForm(issueId: number, formId: number): Promise<Form> {
    return this.reopenForm(issueId, formId);
  }

  getFormChoices(formId: number): Promise<ApiFormChoicesResponse> {
    return Promise.resolve(
      this.mockData.v3.issue['TEST-1'].form[`${formId}`].formchoices,
    );
  }

  postFieldValues(
    request: ApiFieldValuesRequest,
  ): Promise<ApiFieldValuesResponse> {
    return Promise.resolve(this.mockData.v3.issue['TEST-1'].fieldvalues);
  }

  getInsightChoices(
    customFieldId: number,
    choiceApi: InsightChoiceApi,
    query: InsightObjectQuery,
  ): Promise<InsightApiResponse> {
    return Promise.resolve(
      this.mockData.v3.issue['TEST-1'].insight[
        choiceApi.fieldConfigId.toString()
      ],
    );
  }

  searchUsers(
    formId: number,
    questionId: number,
    query: string,
  ): Promise<SelectOption[]> {
    return Promise.reject('Not implemented.');
  }
}

export const locale = Locale.en_AU;

const mockData = new MockData();
loadTypicalMockData(mockData);

const mockFormApi = new MockFormApi(mockData);
const mockIssueFormApiV3 = new MockIssueFormApiV3(mockData);
const mockBrowserUtils = new MockBrowserUtils(locale);
const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
const mockAnalyticsUtils = new MockAnalyticsUtils();

export const settings: BackendSettings<IssueViewSettings> = createBackendSettings(
  {
    issueKey: 'TEST-1',
    issueId: 10001,
    projectId: 0,
    userIsProjectAdmin: true,
    showFormVisibility: true,
  },
);

export const moduleContext: FormViewModuleContext = {
  apis: {
    formApi: mockFormApi,
    formApiV3: mockIssueFormApiV3,
  },
  utils: {
    errorUtils: mockErrorUtils,
    analyticsUtils: mockAnalyticsUtils,
    browserUtils: mockBrowserUtils,
  },
  permissions: adminPermissions,
};
