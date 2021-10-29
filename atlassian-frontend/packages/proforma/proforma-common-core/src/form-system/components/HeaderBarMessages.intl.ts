import { defineMessages } from 'react-intl';

export enum HeaderBarMessage {
  FullFormBtn = 'FullFormBtn',
  FullFormTooltip = 'FullFormTooltip',
  DynamicFormBtn = 'DynamicFormBtn',
  DynamicFormTooltip = 'DynamicFormTooltip',
  DeleteBtn = 'DeleteBtn',
  DeleteTooltip = 'DeleteTooltip',
  DeleteSubmittedTooltip = 'DeleteSubmittedTooltip',
  DeleteLockedTooltip = 'DeleteLockedTooltip',
  DownloadPdfBtn = 'DownloadPdfBtn',
  DownloadPdfTooltip = 'DownloadPdfTooltip',
  DownloadXlsxBtn = 'DownloadXlsxBtn',
  DownloadXlsxTooltip = 'DownloadXlsxTooltip',
  VisibilityDropdownInternal = 'VisibilityDropdownInternal',
  VisibilityDropdownExternal = 'VisibilityDropdownExternal',
  VisibilityDropdownCurrentlyInternal = 'VisibilityDropdownCurrentlyInternal',
  VisibilityDropdownCurrentlyExternal = 'VisibilityDropdownCurrentlyExternal',
  VisibilityDropdownMakeInternal = 'VisibilityDropdownMakeInternal',
  VisibilityDropdownMakeExternal = 'VisibilityDropdownMakeExternal',
  VisibilityDropdownCurrentlyInternalTooltip = 'VisibilityDropdownCurrentlyInternalTooltip',
  VisibilityDropdownCurrentlyExternalTooltip = 'VisibilityDropdownCurrentlyExternalTooltip',
  VisibilityDropdownMakeInternalTooltip = 'VisibilityDropdownMakeInternalTooltip',
  VisibilityDropdownMakeExternalTooltip = 'VisibilityDropdownMakeExternalTooltip',
}

export const IntlHeaderBarMessages = defineMessages({
  [HeaderBarMessage.FullFormBtn]: {
    id: 'form-system.HeaderBar.FullFormBtn',
    defaultMessage: 'Full Form',
  },
  [HeaderBarMessage.FullFormTooltip]: {
    id: 'form-system.HeaderBar.FullFormTooltip',
    defaultMessage: 'Show all form questions.',
  },
  [HeaderBarMessage.DynamicFormBtn]: {
    id: 'form-system.HeaderBar.DynamicFormBtn',
    defaultMessage: 'Dynamic Form',
  },
  [HeaderBarMessage.DynamicFormTooltip]: {
    id: 'form-system.HeaderBar.DynamicFormTooltip',
    defaultMessage:
      'Show the true state of the form hiding dynamic fields with unmet conditions.',
  },
  [HeaderBarMessage.DownloadPdfBtn]: {
    id: 'form-system.HeaderBar.DownloadPdfBtn',
    defaultMessage: 'Download PDF',
  },
  [HeaderBarMessage.DownloadPdfTooltip]: {
    id: 'form-system.HeaderBar.DownloadPdfTooltip',
    defaultMessage: 'Download the form as a PDF file.',
  },
  [HeaderBarMessage.DownloadXlsxBtn]: {
    id: 'form-system.HeaderBar.DownloadXlsxBtn',
    defaultMessage: 'Download XLSX',
  },
  [HeaderBarMessage.DownloadXlsxTooltip]: {
    id: 'form-system.HeaderBar.DownloadXlsxTooltip',
    defaultMessage: 'Download the form as a XLSX file.',
  },
  [HeaderBarMessage.DeleteBtn]: {
    id: 'form-system.HeaderBar.DeleteBtn',
    defaultMessage: 'Delete',
  },
  [HeaderBarMessage.DeleteTooltip]: {
    id: 'form-system.HeaderBar.DeleteTooltip',
    defaultMessage: 'Permanently delete the form',
  },
  [HeaderBarMessage.DeleteSubmittedTooltip]: {
    id: 'form-system.HeaderBar.DeleteSubmittedTooltip',
    defaultMessage:
      'The form has been submitted and connot be deleted, reopen the form in order to delete it.',
  },
  [HeaderBarMessage.DeleteLockedTooltip]: {
    id: 'form-system.HeaderBar.DeleteLockedTooltip',
    defaultMessage:
      'The form has been submitted in a locked state and cannot be deleted, reopen the locked form to delete it.',
  },
  [HeaderBarMessage.VisibilityDropdownInternal]: {
    id: 'form-system.HeaderBar.VisibilityDropdownInternal',
    defaultMessage: 'Internal',
  },
  [HeaderBarMessage.VisibilityDropdownExternal]: {
    id: 'form-system.HeaderBar.VisibilityDropdownExternal',
    defaultMessage: 'External',
  },
  [HeaderBarMessage.VisibilityDropdownCurrentlyInternal]: {
    id: 'form-system.HeaderBar.VisibilityDropdownCurrentlyInternal',
    defaultMessage: 'Currently Internal',
  },
  [HeaderBarMessage.VisibilityDropdownCurrentlyExternal]: {
    id: 'form-system.HeaderBar.VisibilityDropdownCurrentlyExternal',
    defaultMessage: 'Currently External',
  },
  [HeaderBarMessage.VisibilityDropdownMakeInternal]: {
    id: 'form-system.HeaderBar.VisibilityDropdownMakeInternal',
    defaultMessage: 'Make Internal',
  },
  [HeaderBarMessage.VisibilityDropdownMakeExternal]: {
    id: 'form-system.HeaderBar.VisibilityDropdownMakeExternal',
    defaultMessage: 'Make External',
  },
  [HeaderBarMessage.VisibilityDropdownCurrentlyInternalTooltip]: {
    id: 'form-system.HeaderBar.VisibilityDropdownCurrentlyInternalTooltip',
    defaultMessage:
      'The Form is only accessible on the Jira issue, and not through the Customer Portal.',
  },
  [HeaderBarMessage.VisibilityDropdownCurrentlyExternalTooltip]: {
    id: 'form-system.HeaderBar.VisibilityDropdownCurrentlyExternalTooltip',
    defaultMessage:
      'The form is accessible through the Customer Portal and from the Jira issue.',
  },
  [HeaderBarMessage.VisibilityDropdownMakeInternalTooltip]: {
    id: 'form-system.HeaderBar.VisibilityDropdownMakeInternalTooltip',
    defaultMessage:
      'Change the form so that it is only accessible through the Jira issue, and not through the customer portal.',
  },
  [HeaderBarMessage.VisibilityDropdownMakeExternalTooltip]: {
    id: 'form-system.HeaderBar.VisibilityDropdownMakeExternalTooltip',
    defaultMessage:
      'Change the form so that it is accessible through the Jira issue and the Customer Portal.',
  },
});
