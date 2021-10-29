import { defineMessages } from 'react-intl';

export const IntlCopyProjectFormModalMessages = defineMessages({
  Heading: {
    id: 'jira-common.ListProjectForms.CopyModal.Heading.non-final',
    defaultMessage: 'Copy {formName} to other projects',
    description: 'Heading for a modal to copy a form between projects',
  },
  SubHeading: {
    id: 'jira-common.ListProjectForms.CopyModal.SubHeading',
    defaultMessage:
      'Changes made to a form in a service project are not reflected across copies of that form in other service projects',
    description: 'Subheading for a modal for copying a form between projects',
  },
  Cancel: {
    id: 'jira-common.ListProjectForms.CopyModal.Cancel',
    defaultMessage: 'Cancel',
    description:
      'Title of a Modal button for cancellation an action to copy a form between projects',
  },
  Copy: {
    id: 'jira-common.ListProjectForms.CopyModal.Copy',
    defaultMessage: 'Copy',
    description:
      'Title of a Modal button for starting the copy of a form between projects',
  },
  Name: {
    id: 'jira-common.ListProjectForms.CopyModal.Name',
    defaultMessage: 'Name',
    description:
      'Title of a heading above the name of the form chosen to be copied between projects',
  },
  CopyToProjectsTitle: {
    id: 'jira-common.ListProjectForms.CopyModal.CopyToProjectsTitle',
    defaultMessage: 'Copy to project(s)',
    description:
      'Title of a heading above the name of the projects where the form can be copied to',
  },
  LoadingProjects: {
    id: 'jira-common.ListProjectForms.CopyModal.LoadingProjects',
    defaultMessage: 'Loading projects',
    description:
      'Message to display while the list of projects are being loaded',
  },
  SelectAllProjects: {
    id: 'jira-common.ListProjectForms.CopyModal.SelectAllProjects',
    defaultMessage: 'Select all projects',
    description:
      'Description for a checkbox to allow all projects in a list to be selected',
  },
});

export const ListProjectFormsMessages = defineMessages({
  Copy: {
    id: 'jira-common.ListProjectForms.Copy',
    defaultMessage: 'Copy to other projects',
    description:
      'Label for a dropdown item, which pops a modal to copy a form between projects',
  },
  CopyFormSuccessTitle: {
    id: 'jira-common.ListProjectForms.CopyFormSuccessTitle',
    defaultMessage: 'Form copied to project',
    description:
      'Title displayed when a form has been successfully copied to one or more new projects',
  },
  CopyFormSuccessDesc: {
    id: 'jira-common.ListProjectForms.CopyFormSuccessDesc',
    defaultMessage: '{formName} can now be used in {projectName}',
    description:
      'Description displayed when a form has been successfully copied to one or more new projects',
  },
  CopyFormSuccessTitleMultiple: {
    id: 'jira-common.ListProjectForms.CopyFormSuccessTitle',
    defaultMessage: 'Form copied to {numFormsCopied} service projects',
    description:
      'Title displayed when a form has been successfully copied to one or more new projects',
  },
  CopyFormSuccessDescMultiple: {
    id: 'jira-common.ListProjectForms.CopyFormSuccessDesc',
    defaultMessage:
      '{formName} can now be used in {numFormsCopied} service projects',
    description:
      'Description displayed when a form has been successfully copied to one or more new projects',
  },

  CopyFormErrorTitle: {
    id: 'jira-common.ListProjectForms.CopyFormErrorTitle',
    defaultMessage: 'Error: Could not copy {formName} over',
    description:
      'Title displayed when an error occurred when trying to copy a form over to one or more projects',
  },
});
