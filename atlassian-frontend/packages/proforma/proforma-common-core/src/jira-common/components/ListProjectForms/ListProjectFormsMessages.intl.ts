import { defineMessages } from 'react-intl';

export enum ListProjectFormsMessage {
  AgentView = 'AgentView',
  AssociatedIssueTypes = 'AssociatedIssueTypes',
  AssociatedRequestTypes = 'AssociatedRequestTypes',
  RequestIssueType = 'RequestIssueType',
  ClearAll = 'ClearAll',
  CustomerView = 'CustomerView',
  Edit = 'Edit',
  FilterForms = 'FilterForms',
  FormUsage = 'FormUsage',
  FormUsages = 'FormUsages',
  IssueType = 'IssueType',
  LastUpdated = 'LastUpdated',
  Locations = 'Locations',
  PortalPill = 'Portal',
  PortalHiddenPill = 'PortalHidden',
  PortalHiddenTooltip = 'PortalHiddenTooltip',
  NewIssuePill = 'NewIssuePill',
  CopyFormTo = 'CopyFormTo',
  Delete = 'Delete',
  ExportInXlsx = 'ExportInXlsx',
  DeleteFormSuccess = 'DeleteFormSuccess',
  IssueTypeCount = 'IssueTypeCount',
  Recommended = 'Recommended',
  RequestType = 'RequestType',
  RequestTypeCount = 'RequestTypeCount',
  Search = 'Search',
}

export const IntlListProjectFormsMessages = defineMessages({
  [ListProjectFormsMessage.AgentView]: {
    id: 'jira-common.ListProjectForms.AgentView',
    defaultMessage: 'Agent view',
    description: 'A label used to indicate the form is used by Jira agents',
  },
  [ListProjectFormsMessage.AssociatedIssueTypes]: {
    id: 'jira-common.ListProjectForms.AssociatedIssueTypes',
    defaultMessage: 'Issue Type',
    description:
      'A table column heading showing issue types associated with a project form',
  },
  [ListProjectFormsMessage.AssociatedRequestTypes]: {
    id: 'jira-common.ListProjectForms.AssociatedRequestTypes',
    defaultMessage: 'Request Type',
    description:
      'A table column heading showing request types associated with a project form',
  },
  [ListProjectFormsMessage.ClearAll]: {
    id: 'jira-common.ListProjectForms.ClearAll',
    defaultMessage: 'Clear all',
    description:
      'Text for a button used to remove all selections from a list of checkboxes',
  },
  [ListProjectFormsMessage.CustomerView]: {
    id: 'jira-common.ListProjectForms.CustomerView',
    defaultMessage: 'Portal view',
    description:
      'A label used to indicate the form is used in Customer (portal) screens',
  },
  [ListProjectFormsMessage.Edit]: {
    id: 'form-system.general.Edit',
    defaultMessage: 'Edit',
    description: 'Text for a button that links to an editor for project forms',
  },
  [ListProjectFormsMessage.IssueType]: {
    id: 'jira-common.ListProjectForms.IssueType',
    defaultMessage: 'Issue type',
    description:
      'A button label for a dropdown listing issue types used for forms',
  },
  [ListProjectFormsMessage.RequestIssueType]: {
    id: 'jira-common.ListProjectForms.RequestIssueType',
    defaultMessage: 'Request/Issue Type',
  },
  [ListProjectFormsMessage.LastUpdated]: {
    id: 'jira-common.ListProjectForms.LastUpdated',
    defaultMessage: 'Last Updated',
  },
  [ListProjectFormsMessage.Locations]: {
    id: 'jira-common.ListProjectForms.Locations',
    defaultMessage: '({locations} locations)',
    description: 'List the number of locations where a form is used',
  },
  [ListProjectFormsMessage.FormUsage]: {
    id: 'jira-common.ListProjectForms.FormUsage',
    defaultMessage: 'Location',
    description:
      'Title of a table column showing locations of forms. Used when a single location is selected.',
  },
  [ListProjectFormsMessage.FormUsages]: {
    id: 'jira-common.ListProjectForms.FormUsages',
    defaultMessage: 'Location: {locations}',
    description:
      'Title of a table column showing locations of forms. Used when multiple locations are selected.',
  },
  [ListProjectFormsMessage.PortalPill]: {
    id: 'jira-common.ListProjectForms.PortalPill',
    defaultMessage: 'PORTAL',
  },
  [ListProjectFormsMessage.PortalHiddenPill]: {
    id: 'jira-common.ListProjectForms.PortalHiddenPill',
    defaultMessage: 'PORTAL - HIDDEN',
  },
  [ListProjectFormsMessage.PortalHiddenTooltip]: {
    id: 'jira-common.ListProjectForms.PortalHiddenTooltip',
    defaultMessage:
      'This request type is currently hidden from the portal, add it to a group to be visible on the portal.',
  },
  [ListProjectFormsMessage.NewIssuePill]: {
    id: 'jira-common.ListProjectForms.NewIssuePill',
    defaultMessage: 'NEW ISSUE',
  },
  [ListProjectFormsMessage.CopyFormTo]: {
    id: 'jira-common.ListProjectForms.CopyFormTo',
    defaultMessage: 'Copy form to:',
  },
  [ListProjectFormsMessage.Delete]: {
    id: 'jira-common.ListProjectForms.Delete',
    defaultMessage: 'Delete',
    description:
      'Text for a modal dialog title when prompting the user to delete a form',
  },
  [ListProjectFormsMessage.ExportInXlsx]: {
    id: 'jira-common.ListProjectForms.ExportInXlsx',
    defaultMessage: 'Export in XLSX',
    description:
      'Label for a dropdown button used to export form data to a spreadsheet',
  },
  [ListProjectFormsMessage.DeleteFormSuccess]: {
    id: 'jira-common.ListProjectForms.DeleteFormSuccess',
    defaultMessage: 'Form: {formName} deleted',
    description:
      'Text for a modal dialog shown when a project form has been deleted',
  },
  [ListProjectFormsMessage.FilterForms]: {
    id: 'jira-common.ListProjectForms.FilterForms',
    defaultMessage: 'Filter forms',
    description:
      'Placeholder for a text field where a user can type to search for a form by name',
  },
  [ListProjectFormsMessage.IssueTypeCount]: {
    id: 'jira-common.ListProjectForms.IssueTypeCount',
    defaultMessage: '({types} issue types)',
    description:
      'A label showing the number of issue types associated with a project form',
  },
  [ListProjectFormsMessage.Recommended]: {
    id: 'jira-common.ListProjectForms.RecommendedInIssue',
    defaultMessage: 'Recommended in issue view',
    description:
      'A label used to indicate the form is a recommended form for given issue/request types',
  },
  [ListProjectFormsMessage.RequestType]: {
    id: 'jira-common.ListProjectForms.RequestType',
    defaultMessage: 'Request type',
    description:
      'A button label for a dropdown listing request types used for forms',
  },
  [ListProjectFormsMessage.RequestTypeCount]: {
    id: 'jira-common.ListProjectForms.RequestTypeCount',
    defaultMessage: '({types} request types)',
    description:
      'A label showing the number of request types associated with a project form',
  },
  [ListProjectFormsMessage.Search]: {
    id: 'jira-common.ListProjectForms.Search',
    defaultMessage: 'Search',
    description:
      'Placeholder message in a text field used for searching request types by name',
  },
});
