import { each, Sync } from 'factory.ts';

import {
  RequestType,
  TicketType,
} from '@atlassian/proforma-common-core/jira-common-models';

const mockDomain = 'https://your-domain.atlassian.net';
export const avatarURLRequestTypes = `${mockDomain}/secure/viewavatar?size=medium&avatarType=SD_REQTYPE`;
export const avatarURLIssueTypes = `${mockDomain}/secure/viewavatar?size=medium&avatarType=issuetype`;

export const exampleRequestTypes: { name: string; avatarId: string }[] = [
  { name: 'Fix an account problem', avatarId: '10518' },
  { name: 'Get a guest wifi account', avatarId: '10519' },
  { name: 'Get IT Help', avatarId: '10541' },
  { name: 'New mobile device', avatarId: '10534' },
  { name: 'Onboard new employees', avatarId: '10516' },
  { name: 'Request a new account', avatarId: '10517' },
  { name: 'Request admin access', avatarId: '10513' },
  { name: 'Request new hardware', avatarId: '10550' },
  { name: 'Request new software', avatarId: '10547' },
  { name: 'Set up VPN to the office', avatarId: '10526' },
  { name: 'Emailed request', avatarId: '10527' },
  { name: 'Report a system problem', avatarId: '10521' },
  { name: 'Report broken hardware', avatarId: '10512' },
  { name: 'Investigate a problem', avatarId: '10520' },
  { name: 'Request a change', avatarId: '10528' },
];

export const exampleIssueTypes: { name: string; avatarId: string }[] = [
  { name: 'Task', avatarId: '10318' },
  { name: 'Sub-Task', avatarId: '10316' },
  { name: 'Bug', avatarId: '10303' },
  { name: 'Story', avatarId: '10315' },
];

export const ticketTypeFactory = Sync.makeFactory<RequestType>({
  id: each(i => `rt-${i}`),
  name: each(i => `Mock request Type ${i}`),
  portal: true,
  hidden: false,
  newIssue: false,
  iconUrl: `${avatarURLRequestTypes}&avatarId=10550`,
  type: TicketType.RequestType,
});
