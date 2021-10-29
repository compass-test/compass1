import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import { ApiUtil } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  ProjectAndTemplateForm,
  ReferenceData,
} from '@atlassian/proforma-common-core/jira-common-models';

import { TemplateFormApi } from './TemplateFormApi';

export class LiveTemplateFormApi implements TemplateFormApi {
  private readonly projectId: number;
  private readonly util: ApiUtil;

  public constructor(projectId: number, util: ApiUtil) {
    this.projectId = projectId;
    this.util = util;
  }

  getTemplateForm(projectId: number, formId: number): Promise<TemplateForm> {
    return this.util.get(`/api/2/projects/${projectId}/forms/${formId}`);
  }

  putTemplateForm(
    projectId: number,
    formId: number,
    form: TemplateForm,
  ): Promise<ProjectAndTemplateForm> {
    return this.util.put(`/api/2/projects/${projectId}/forms/${formId}`, form);
  }

  public getReferenceData = (): Promise<ReferenceData> => {
    return this.util.get(`/api/1/projects/${this.projectId}/forms/reference`);
  };

  getJiraFields(projectId: number): Promise<FormBuilderJiraFields> {
    return this.util.get(`/api/2/projects/${projectId}/jirafields`);
  }

  getDataConnections(projectId: number): Promise<FormBuilderDataConnections> {
    return this.util.get(`/api/1/projects/${projectId}/connection`);
  }
}
