import { each, Sync } from 'factory.ts';

import {
  Project,
  ProjectWithEnabledState,
} from '@atlassian/proforma-common-core/jira-common-models';

export const projectFactory = Sync.makeFactory<Project>({
  id: each(i => i),
  name: each(i => `Test Project ${i}`),
  projectTypeKey: 'servicedesk',
  projectTypeName: 'servicedesk',
  smallAvatarUrl:
    'https://proformajax.atlassian.net/secure/projectavatar?size=small&avatarId=10324',
});

export const projectWithEnabledStateFactory: Sync.Factory<ProjectWithEnabledState> = Sync.makeFactory(
  {
    enabled: true,
  },
).combine(projectFactory);
