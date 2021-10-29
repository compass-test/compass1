import { UnsavedForm } from '@atlassian/proforma-common-core/form-system-models';
import { convertTemplateFormToUnsavedForm } from '@atlassian/proforma-common-core/form-system-utils';
import {
  CreateTemplateFormResponse,
  TemplateFormApiAbstract,
} from '@atlassian/proforma-common-core/jira-common-apis';

import { MockData } from './data/MockData';

export class MockTemplateFormApi extends TemplateFormApiAbstract {
  private mockData: MockData;

  public constructor(mockData: MockData) {
    super();
    this.mockData = mockData;
  }

  createTemplateForm(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse> {
    return new Promise<CreateTemplateFormResponse>(resolve => {
      setTimeout((): void => {
        const newTemplateFormId = this.mockData.createTemplateForm(formName);
        // @ts-ignore
        resolve({ id: newTemplateFormId, nextUrl: 'https://localhost:3000' });
      }, 1000);
    });
  }

  createTemplateFormForProject(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse> {
    return this.createTemplateForm(projectId, formName);
  }

  getTemplateFormPreview(
    projectId: number,
    formId: string,
  ): Promise<UnsavedForm> {
    return new Promise<UnsavedForm>((resolve, reject) => {
      setTimeout((): void => {
        const templateForm = this.mockData.getTemplateForm(
          projectId,
          parseInt(formId, 10),
        );
        if (templateForm) {
          resolve(convertTemplateFormToUnsavedForm(templateForm));
        } else {
          reject(
            new Error(
              `Could not find templateForm with id: ${formId} on project with key: ${projectId} `,
            ),
          );
        }
      }, 1000);
    });
  }

  copyTemplateForm(
    formId: number,
    projectId: number,
    copyProjectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse> {
    return new Promise(resolve => {
      setTimeout((): void => {
        const newTemplateFormId = this.mockData.copyTemplateForm(
          projectId,
          copyProjectId,
          formId,
        );
        resolve({ id: newTemplateFormId, nextUrl: 'https://localhost:3000' });
      }, 1000);
    });
  }
}
