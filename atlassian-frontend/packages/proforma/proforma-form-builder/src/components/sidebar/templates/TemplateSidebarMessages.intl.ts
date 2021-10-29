import { defineMessages } from 'react-intl';

export enum TemplateSidebarMessage {
  Templates = 'Templates',
  Language = 'Language',
  Team = 'Team',
  Process = 'Process',
  TemplatePreview = 'TemplatePreview',
  LoadingTemplatePreview = 'LoadingTemplatePreview',
  InsertTemplate = 'InsertTemplate',
  New = 'New',
  SearchTemplates = 'SearchTemplates',
}

export const IntlTemplateSidebarMessages = defineMessages({
  [TemplateSidebarMessage.Templates]: {
    id: 'form-builder.TemplatesSidebar.Templates',
    defaultMessage: 'Templates',
  },
  [TemplateSidebarMessage.Language]: {
    id: 'form-builder.TemplatesSidebar.Language',
    defaultMessage: 'Language',
  },
  [TemplateSidebarMessage.Team]: {
    id: 'form-builder.TemplatesSidebar.Team',
    defaultMessage: 'Team',
  },
  [TemplateSidebarMessage.Process]: {
    id: 'form-builder.TemplatesSidebar.Process',
    defaultMessage: 'Process',
  },
  [TemplateSidebarMessage.TemplatePreview]: {
    id: 'form-builder.TemplatesSidebar.TemplatePreview',
    defaultMessage: 'Template Preview',
  },
  [TemplateSidebarMessage.LoadingTemplatePreview]: {
    id: 'form-builder.TemplatesSidebar.LoadingTemplatePreview',
    defaultMessage: 'Loading template preview',
  },
  [TemplateSidebarMessage.InsertTemplate]: {
    id: 'form-builder.TemplatesSidebar.InsertTemplate',
    defaultMessage: 'Insert Template',
  },
  [TemplateSidebarMessage.New]: {
    id: 'form-builder.TemplatesSidebar.New',
    defaultMessage: 'New !',
  },
  [TemplateSidebarMessage.SearchTemplates]: {
    id: 'form-builder.TemplatesSidebar.SearchTemplates',
    defaultMessage: 'Search Templates',
  },
});
