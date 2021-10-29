import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import {
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  ProjectAndTemplateForm,
  ReferenceData,
} from '@atlassian/proforma-common-core/jira-common-models';

export interface TemplateFormApi {
  getTemplateForm(projectId: number, formId: number): Promise<TemplateForm>;

  putTemplateForm(
    projectId: number,
    formId: number,
    form: TemplateForm,
  ): Promise<ProjectAndTemplateForm>;

  getReferenceData: () => Promise<ReferenceData>;

  getJiraFields(projectId: number): Promise<FormBuilderJiraFields>;

  getDataConnections(projectId: number): Promise<FormBuilderDataConnections>;
}
