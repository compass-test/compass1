import { SubProduct } from '../../src/types';
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
];

export const subProductOptions: Array<{
  name: SubProduct | '';
  label: string;
  value: SubProduct | '';
}> = [
  {
    name: 'servicedesk',
    label: 'Jira Service Desk',
    value: 'servicedesk',
  },
  {
    name: 'software',
    label: 'Jira Software',
    value: 'software',
  },
  {
    name: 'core',
    label: 'Jira Core',
    value: 'core',
  },
  {
    name: '',
    label: 'unknown',
    value: '',
  },
];

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
