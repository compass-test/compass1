import { JiraSubProduct, SubProduct } from '../../src/types';
import { InviteResponseMode, ProductId } from './invite-fixture';
import {
  InviteCapability,
  InviteResult,
} from './invite-fixture/mockInviteServer';

export const userRoleOptions = [
  {
    name: 'admin',
    label: 'Admin',
    value: 'admin',
  },
  {
    name: 'trusted',
    label: 'Trusted user',
    value: 'trusted',
  },
  {
    name: 'basic',
    label: 'Basic user',
    value: 'basic',
  },
];
export const selectInputOptions = [
  {
    name: 'User Picker',
    label: 'User Picker',
    value: 'userPicker',
  },
  {
    name: 'Creatable Select',
    label: 'Creatable Select',
    value: 'creatableSelect',
  },
];

export const productOptions: Array<{
  name: string;
  label: string;
  value: ProductId;
}> = [
  {
    name: 'jira',
    label: 'Jira',
    value: 'jira' as const,
  },
  {
    name: 'confluence',
    label: 'Confluence',
    value: 'confluence' as const,
  },
  {
    name: 'platform',
    label: 'Platform',
    value: 'platform' as const,
  },
];

export const sourceOptions: Array<{
  name: string;
  label: string;
  value: string;
}> = [
  {
    name: 'peopleMenu',
    label: 'People Menu',
    value: 'peopleMenu',
  },
  {
    name: 'mentionInEditor',
    label: 'Mention in Editor',
    value: 'mentionInEditor',
  },
  {
    name: 'assigneeField',
    label: 'Assignee Field',
    value: 'assigneeField',
  },
];

export const subProductOptions: Array<{
  name: SubProduct | '';
  label: string;
  value: SubProduct | '';
}> = [
  {
    name: 'servicedesk',
    label: 'Jira Service Management',
    value: 'servicedesk',
  },
  {
    name: 'software',
    label: 'Jira Software',
    value: 'software',
  },
  {
    name: 'core',
    label: 'Jira Work Management',
    value: 'core',
  },
  {
    name: '',
    label: 'unknown',
    value: '',
  },
];

export const jiraSubProductOptions: Array<{
  name: JiraSubProduct | '';
  label: string;
  value: JiraSubProduct | '';
}> = subProductOptions
  .filter(({ value }) => value !== '')
  .map(({ value, name, label }) => ({
    value: `jira-${value}` as JiraSubProduct,
    name: `jira-${value}` as JiraSubProduct,
    label,
  }));

export const inviteResponseModeOptions: Array<{
  label: string;
  value: InviteResponseMode;
}> = [
  {
    label: 'Honor invite capabilities',
    value: 'use-capabilities',
  },
  {
    label: 'Return general error 400',
    value: 'general-error',
  },
];

export type InviteFixtureOption = {
  label: string;
  result: InviteResult;
  capability: InviteCapability;
};

export const inviteFixtureOptions: InviteFixtureOption[] = [
  { label: 'None', capability: 'none', result: 'ERROR' },
  { label: 'Invite', capability: 'directInvite', result: 'INVITED' },
  {
    label: 'Request Access',
    capability: 'invitePendingApproval',
    result: 'INVITED_PENDING_APPROVAL',
  },
  {
    label: 'Invite Error',
    capability: 'directInvite',
    result: 'ERROR',
  },
];
