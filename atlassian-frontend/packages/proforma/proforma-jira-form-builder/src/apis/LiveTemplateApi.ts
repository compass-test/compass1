import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';
import { TemplateApi, TemplatesIndex } from '@atlassian/proforma-form-builder';

export class LiveTemplateApi implements TemplateApi {
  private templatesServiceUrl: string;

  public constructor(templatesServiceUrl: string) {
    this.templatesServiceUrl = templatesServiceUrl;
  }

  public getTemplatesList(): Promise<TemplatesIndex> {
    return new Promise<TemplatesIndex>(resolve => {
      const preFlight: RequestInit = {
        method: 'GET',
      };
      fetch(`${this.templatesServiceUrl}/index`, preFlight)
        .then(res => res.json())
        .then(response => {
          resolve(response);
        });
    });
  }

  public getTemplate(templateId: string): Promise<TemplateForm> {
    return new Promise<TemplateForm>(resolve => {
      const preFlight: RequestInit = {
        method: 'GET',
      };
      fetch(`${this.templatesServiceUrl}/template/${templateId}`, preFlight)
        .then(res => res.json())
        .then(response => {
          resolve(response);
        });
    });
  }
}
