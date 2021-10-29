import { defineMessages } from 'react-intl';

export enum SectionSidebarMessages {
  Heading = 'Heading',
  SubHeading = 'SubHeading',
  Name = 'Name',
  NamePlaceholder = 'NamePlaceholder',
  ShowSection = 'ShowSection',
  ShowSectionAlways = 'ShowSectionAlways',
  ShowSectionConditionally = 'ShowSectionConditionally',
  When = 'When',
  Question = 'Question',
  IsAnyOf = 'IsAnyOf',
}

export const IntlSectionSidebarMessages = defineMessages({
  [SectionSidebarMessages.Heading]: {
    id: 'form-builder.SectionSidebar.Heading',
    defaultMessage: 'Section',
  },
  [SectionSidebarMessages.SubHeading]: {
    id: 'form-builder.SectionSidebar.SubHeading',
    defaultMessage: 'Sections group questions for conditional logic.',
  },
  [SectionSidebarMessages.Name]: {
    id: 'form-builder.SectionSidebar.Name',
    defaultMessage: 'Name',
  },
  [SectionSidebarMessages.NamePlaceholder]: {
    id: 'form-builder.SectionSidebar.NamePlaceholder',
    defaultMessage: 'Unnamed',
  },
  [SectionSidebarMessages.ShowSection]: {
    id: 'form-builder.SectionSidebar.ShowSection',
    defaultMessage: 'Show section',
  },
  [SectionSidebarMessages.ShowSectionAlways]: {
    id: 'form-builder.SectionSidebar.ShowSectionAlways',
    defaultMessage: 'Always',
  },
  [SectionSidebarMessages.ShowSectionConditionally]: {
    id: 'form-builder.SectionSidebar.ShowSectionConditionally',
    defaultMessage: 'Conditionally',
  },
  [SectionSidebarMessages.When]: {
    id: 'form-builder.SectionSidebar.When',
    defaultMessage: 'When',
  },
  [SectionSidebarMessages.Question]: {
    id: 'form-builder.SectionSidebar.Question',
    defaultMessage: 'Question:',
  },
  [SectionSidebarMessages.IsAnyOf]: {
    id: 'form-builder.SectionSidebar.IsAnyOf',
    defaultMessage: 'Is any of:',
  },
});
