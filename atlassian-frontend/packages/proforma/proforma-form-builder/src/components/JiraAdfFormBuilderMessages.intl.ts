import { defineMessages } from 'react-intl';

export enum FormBuilderMessage {
  DragHandleQuestionTooltip = 'DragHandleQuestionTooltip',
  DragHandleSectionTooltip = 'DragHandleSectionTooltip',
  SectionStart = 'SectionStart',
  SectionEnd = 'SectionEnd',
}

export const IntlFormBuilderMessages = defineMessages({
  [FormBuilderMessage.DragHandleQuestionTooltip]: {
    id: 'ui-form-builder.FormBuilder.DragHandleQuestionTooltip',
    defaultMessage: 'Reorder Question',
  },
  [FormBuilderMessage.DragHandleSectionTooltip]: {
    id: 'ui-form-builder.FormBuilder.DragHandleSectionTooltip',
    defaultMessage: 'Reorder Section',
  },
  [FormBuilderMessage.SectionStart]: {
    id: 'ui-form-builder.FormBuilder.SectionStart',
    defaultMessage: 'Section start',
  },
  [FormBuilderMessage.SectionEnd]: {
    id: 'ui-form-builder.FormBuilder.SectionEnd',
    defaultMessage: 'Section end',
  },
});
