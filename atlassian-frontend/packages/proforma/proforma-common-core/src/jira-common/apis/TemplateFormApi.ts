import { UnsavedForm } from '../../form-system/models/Form';

export interface CreateTemplateFormResponse {
  id: number;
  nextUrl: string;
}

export interface TemplateFormApi {
  type: string;

  copyTemplateForm(
    formId: number,
    projectId: number,
    copyProjectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse>;

  createTemplateForm(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse>;

  createTemplateFormForProject(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse>;

  getTemplateFormPreview(
    projectId: number,
    formId: string,
  ): Promise<UnsavedForm>;
}

export abstract class TemplateFormApiAbstract {
  type = 'templateForm';

  abstract copyTemplateForm(
    formId: number,
    projectId: number,
    copyProjectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse>;

  abstract createTemplateForm(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse>;

  abstract createTemplateFormForProject(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse>;

  abstract getTemplateFormPreview(
    projectId: number,
    formId: string,
  ): Promise<UnsavedForm>;
}
