import { MockData } from '@af/proforma-mocks';
import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import {
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  ProjectAndTemplateForm,
  ReferenceData,
} from '@atlassian/proforma-common-core/jira-common-models';

import { TemplateFormApi } from '../../src/apis/TemplateFormApi';

export class MockTemplateFormApi implements TemplateFormApi {
  private mockData: MockData;

  public constructor(mockData: MockData) {
    this.mockData = mockData;
  }

  getTemplateForm(projectId: number, formId: number): Promise<TemplateForm> {
    return new Promise<TemplateForm>((resolve, reject) => {
      setTimeout((): void => {
        const form = this.mockData.getTemplateForm(projectId, formId);
        if (form) {
          resolve(form);
        } else {
          reject('Form not found.');
        }
      }, 1000);
    });
  }

  putTemplateForm(
    projectId: number,
    formId: number,
    updatedForm: TemplateForm,
  ): Promise<ProjectAndTemplateForm> {
    return new Promise<ProjectAndTemplateForm>((resolve, reject) => {
      setTimeout((): void => {
        // eslint-disable-next-line no-console
        console.log(
          `Put template form API received form ${formId} for project ${projectId}:`,
          updatedForm,
        );
        const project = this.mockData.getProject(projectId);
        const form = this.mockData.getTemplateForm(projectId, formId);
        if (project && form) {
          resolve({ project, form });
        } else {
          reject(`Could not find form ${formId} on project ${projectId}`);
        }
      }, 1000);
    });
  }

  public getReferenceData = (): Promise<ReferenceData> => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(this.mockData.referenceData);
      }, 1000),
    );
  };

  getJiraFields(projectId: number): Promise<FormBuilderJiraFields> {
    return new Promise<FormBuilderJiraFields>(resolve => {
      setTimeout(() => {
        resolve(this.mockData.jiraFieldsData);
      }, 3000);
    });
  }

  getDataConnections(projectId: number): Promise<FormBuilderDataConnections> {
    return new Promise<FormBuilderDataConnections>(resolve => {
      setTimeout(() => {
        resolve(this.mockData.dataConnectionsData);
      }, 3000);
    });
  }
}
