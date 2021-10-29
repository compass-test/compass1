import { each, Sync } from 'factory.ts';
import faker from 'faker';

import { TemplateFormIndex } from '@atlassian/proforma-common-core/jira-common-models';

export const templateFormIndexFactory = Sync.makeFactory<TemplateFormIndex>({
  id: each(i => i),
  projectId: each(i => i),
  name: each(i => `Template ${i}`),
  project: 'Mock Project',
  updated: {
    iso8601: faker.date.recent(10).toISOString(),
    friendly: '1 Jan 2014',
  },
  requesttypes: [],
  editUrl: each(i => `example.com/edit-url-${i}`),
});
