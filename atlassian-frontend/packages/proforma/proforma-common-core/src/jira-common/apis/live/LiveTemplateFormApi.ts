import { TemplateForm, UnsavedForm } from '../../../form-system/models/Form';
import { convertTemplateFormToUnsavedForm } from '../../../form-system/utils/conversion/convertTemplateFormToUnsavedForm';
import {
  CreateTemplateFormResponse,
  TemplateFormApiAbstract,
} from '../TemplateFormApi';

import { ApiUtil } from './ApiUtil';

export class LiveTemplateFormApi extends TemplateFormApiAbstract {
  private util: ApiUtil;

  public constructor(util: ApiUtil) {
    super();
    this.util = util;
  }

  copyTemplateForm(
    formId: number,
    projectId: number,
    copyProjectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse> {
    return this.util.post(`/api/2/projects/${projectId}/forms`, {
      name: formName,
      copyProjectId,
      copyFormId: formId.toString(),
    });
  }

  createTemplateForm(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse> {
    return this.util.post(`/api/2/projects/${projectId}/forms`, {
      name: formName,
    });
  }

  createTemplateFormForProject(
    projectId: number,
    formName: string,
  ): Promise<CreateTemplateFormResponse> {
    return this.util.post(`/api/2/projects/${projectId}/forms`, {
      name: formName,
    });
  }

  getTemplateFormPreview(
    projectId: number,
    formId: string,
  ): Promise<UnsavedForm> {
    return this.util
      .get(`/api/2/projects/${projectId}/forms/${formId}/preview`)
      .then((templateForm: TemplateForm) =>
        convertTemplateFormToUnsavedForm(templateForm),
      );
  }
}
