import { Form, FormAnswers, UnsavedForm } from '../../form-system/models/Form';

export interface AvailableForm {
  value: number;
  label: string;
}

export interface AvailableForms {
  recommended: AvailableForm[];
  available: AvailableForm[];
}

export interface FormApi {
  findAvailableFormsForIssue(issueId: number): Promise<AvailableForms>;

  getFormPreview(issueId: number, templateFormId: number): Promise<UnsavedForm>;

  getXlsxDownloadUrl(issueId: number, issueKey: string, formId: number): string;

  getPdfDownloadUrl(issueId: number, formId: number): string;

  addForm(issueId: number, templateFormId: number): Promise<Form>;

  getForm(issueId: number, formId: number): Promise<Form>;

  deleteForm(issueId: number, formId: number): Promise<any>;

  updateFormVisibility(
    issueId: number,
    formId: number,
    isInternal: boolean,
  ): Promise<void>;

  saveAnswers(
    issueId: number,
    formId: number,
    answers: FormAnswers,
  ): Promise<Form>;
}
