import { defineMessages } from 'react-intl';

export enum ListFormsMessage {
  TableHeaderFormName = 'TableHeaderFormName',
  TableHeaderAddForm = 'TableHeaderAddForm',
  StatusOpen = 'StatusOpen',
  StatusSubmitted = 'StatusSubmitted',
  StatusLocked = 'StatusLocked',
  InternalLozengeTooltip = 'InternalLozengeTooltip',
  ExternalLozengeTooltip = 'ExternalLozengeTooltip',
  NoAvailableActionsBtn = 'NoAvailableActionsBtn',
  NoAvailableActionsTooltip = 'NoAvailableActionsTooltip',
  ViewingLozenge = 'ViewingLozenge',
}

export const IntlListFormsMessages = defineMessages({
  [ListFormsMessage.TableHeaderFormName]: {
    id: 'jira-common.ListForms.TableHeaderFormName',
    defaultMessage: 'Form Name',
  },
  [ListFormsMessage.TableHeaderAddForm]: {
    id: 'jira-common.ListForms.TableHeaderAddForm',
    defaultMessage: 'Add Form',
  },
  [ListFormsMessage.StatusOpen]: {
    id: 'jira-common.ListForms.StatusOpen',
    defaultMessage: 'Open',
  },
  [ListFormsMessage.StatusSubmitted]: {
    id: 'jira-common.ListForms.StatusSubmitted',
    defaultMessage: 'Submitted',
  },
  [ListFormsMessage.StatusLocked]: {
    id: 'jira-common.ListForms.StatusLocked',
    defaultMessage: 'Locked',
  },
  [ListFormsMessage.ViewingLozenge]: {
    id: 'jira-common.ListForms.ViewingLozenge',
    defaultMessage: 'Viewing',
  },
  [ListFormsMessage.InternalLozengeTooltip]: {
    id: 'jira-common.ListForms.InternalLozengeTooltip',
    defaultMessage:
      'The form is only accessible on the Jira issue, and not through the Customer Portal.',
  },
  [ListFormsMessage.ExternalLozengeTooltip]: {
    id: 'jira-common.ListForms.ExternalLozengeTooltip',
    defaultMessage:
      'The form is accessible through the Customer Portal and from the Jira issue.',
  },
  [ListFormsMessage.NoAvailableActionsBtn]: {
    id: 'jira-common.ListForms.NoAvailableActionsBtn',
    defaultMessage: 'No actions available',
  },
  [ListFormsMessage.NoAvailableActionsTooltip]: {
    id: 'jira-common.ListForms.NoAvailableActionsTooltip',
    defaultMessage: 'You do not have any available actions on this form.',
  },
});
