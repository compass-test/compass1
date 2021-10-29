import {
  Form,
  FormAnswers,
  UnsavedForm,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  AvailableForms,
  FormApi,
} from '@atlassian/proforma-common-core/jira-common-apis';

import { MockData } from './data/MockData';

export class MockFormApi implements FormApi {
  constructor(private mockData: MockData) {}

  public findAvailableFormsForIssue(issueId: number): Promise<AvailableForms> {
    return new Promise<AvailableForms>((resolve): void => {
      setTimeout((): void => {
        resolve(this.mockData.getAvailableTemplateForms());
      }, 1000);
    });
  }

  public getFormPreview(
    issueId: number,
    templateFormId: number,
  ): Promise<UnsavedForm> {
    return new Promise<UnsavedForm>((resolve): void => {
      setTimeout((): void => {
        const formPreview = this.mockData.getFormFromTemplateForm(
          templateFormId,
        );
        if (formPreview) {
          resolve(formPreview);
        }
        resolve();
      }, 1000);
    });
  }

  public getXlsxDownloadUrl(
    issueId: number,
    issueKey: string,
    formId: number,
  ): string {
    return 'https://docs.collectiveaccess.org/images/6/68/Sample_data.xlsx'; // arbitrary XLSX file for mock
  }

  public getPdfDownloadUrl(issueId: number, formId: number): string {
    return 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // arbitrary PDF file for mock
  }

  public addForm(issueId: number, templateFormId: number): Promise<Form> {
    return new Promise<Form>((resolve): void => {
      setTimeout((): void => {
        const unsavedForm = this.mockData.getFormFromTemplateForm(
          templateFormId,
        );
        if (unsavedForm) {
          const form: Form = {
            ...unsavedForm,
            id: 987, // This should be calculated.
          };
          this.mockData.addFormWithId(issueId, form);
          resolve(form);
        }
      }, 1000);
    });
  }

  public getForm(issueId: number, formId: number): Promise<Form> {
    return new Promise<Form>((resolve, reject): void => {
      setTimeout((): void => {
        const form = this.mockData.getForm(issueId, formId);
        if (form) {
          resolve(form);
        } else {
          reject();
        }
      }, 1000);
    });
  }

  public deleteForm(issueId: number, formId: number): Promise<any> {
    return new Promise<any>((resolve): void => {
      setTimeout((): void => {
        this.mockData.deleteForm(issueId, formId);
        resolve();
      }, 1000);
    });
  }

  public updateFormVisibility(
    issueId: number,
    formId: number,
    isInternal: boolean,
  ): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      setTimeout((): void => {
        // update visibility in issue form
        const issueForm = this.mockData.updateFormVisibility(
          issueId,
          formId,
          isInternal,
        );
        if (issueForm) {
          resolve();
        } else {
          reject(
            new Error(
              `No issue form for issueKey: ${issueId} and formID: ${formId} found.`,
            ),
          );
        }
      }, 1000);
    });
  }

  public saveAnswers(
    issueId: number,
    formId: number,
    answers: FormAnswers,
  ): Promise<Form> {
    return new Promise<Form>((resolve, reject): void => {
      setTimeout((): void => {
        const issue = this.mockData.getIssueWithId(issueId);
        if (!issue) {
          reject(new Error(`No issue for ID: ${issueId}`));
          return;
        }
        const form = issue.forms.find((f): boolean => f.id === formId);
        if (!form) {
          reject(new Error(`No form for ID: ${formId}`));
          return;
        }
        form.state.answers = answers;
        resolve(form);
      }, 1000);
    });
  }
}
