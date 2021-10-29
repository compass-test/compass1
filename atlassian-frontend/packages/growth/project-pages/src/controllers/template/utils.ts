import { TemplateType, Template, ConfluenceTemplate } from './types';

export const isConfluenceTemplate = (
  template?: Template,
): template is ConfluenceTemplate => template?.type === TemplateType.Confluence;

export const isBlankPageTemplate = (template?: Template) =>
  isConfluenceTemplate(template) &&
  template.blueprintModuleCompleteKey === null;
