import {
  Form,
  FormAnswers,
  FormVisibility,
  TemplateForm,
  UnsavedForm,
} from '../../../form-system/models/Form';
import { convertTemplateFormToUnsavedForm } from '../../../form-system/utils/conversion/convertTemplateFormToUnsavedForm';
import { AvailableForms, FormApi } from '../FormApi';

import { ApiUtil } from './ApiUtil';

export class LiveFormApi implements FormApi {
  private util: ApiUtil;

  public constructor(util: ApiUtil) {
    this.util = util;
  }

  public findAvailableFormsForIssue(issueId: number): Promise<AvailableForms> {
    return this.util.get(`/api/1/issues/${issueId}/availableforms`);
  }

  public getFormPreview(
    issueId: number,
    templateFormId: number,
  ): Promise<UnsavedForm> {
    return this.util
      .get(`/api/2/issues/${issueId}/availableforms/${templateFormId}/preview`)
      .then(
        (templateForm: TemplateForm): UnsavedForm => {
          return convertTemplateFormToUnsavedForm(templateForm);
        },
      );
  }

  public getForm(issueid: number, formId: number): Promise<Form> {
    return this.util.get(`/api/2/issues/${issueid}/forms/${formId}`);
  }

  public getXlsxDownloadUrl(
    issueid: number,
    issueKey: string,
    formId: number,
  ): string {
    return `/api/2/reports/individual-response/${issueid}/${formId}/ProForma-${issueKey}-form-${formId}.xlsx`;
  }

  public getPdfDownloadUrl(issueid: number, formId: number): string {
    return `/api/1/issues/${issueid}/forms/${formId}/pdf`;
  }

  public addForm(issueId: number, templateFormId: number): Promise<Form> {
    return this.util.post(`/api/2/issues/${issueId}/forms`, {
      templateFormId,
    });
  }

  public deleteForm(issueId: number, formId: number): Promise<any> {
    return this.util.delete(`/api/1/issues/${issueId}/forms/${formId}`);
  }

  public updateFormVisibility(
    issueId: number,
    formId: number,
    isInternal: boolean,
  ): Promise<void> {
    return this.util.post(`/api/2/issues/${issueId}/forms/${formId}`, {
      visibility: isInternal
        ? FormVisibility.Internal
        : FormVisibility.External,
    });
  }

  public saveAnswers(
    issueId: number,
    formId: number,
    answers: FormAnswers,
  ): Promise<Form> {
    return this.util.put(`/api/2/issues/${issueId}/forms/${formId}`, answers);
  }
}
