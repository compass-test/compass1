import React from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import { PillSelector } from '../src';

const i18n = defineMessages({
  starred: {
    id: 'space-directory.filters.starred',
    defaultMessage: 'Starred',
    description:
      'Name of a filter that will show the user has starred (favorited)',
  },
  personal: {
    id: 'space-directory.filters.personal.v2',
    defaultMessage: 'Personal',
    description:
      "Name of a filter that will show personal spaces (previously this read 'Personal spaces' but now just says 'Personal')",
  },
  archived: {
    id: 'space-directory.filters.archived',
    defaultMessage: 'Archived',
    description:
      'Name of a filter that will show spaces that have been archived',
  },
});

const pills = [
  { name: 'starred', content: <FormattedMessage {...i18n.starred} /> },
  { name: 'personal', content: <FormattedMessage {...i18n.personal} /> },
  { name: 'archived', content: <FormattedMessage {...i18n.archived} /> },
];

export default function PillSelectorComponent() {
  const defaultPill = 'personal';
  const testId = 'pill-selector';

  return (
    <div style={{ padding: 50, width: 400 }}>
      <PillSelector
        selectedPillName={defaultPill}
        pills={pills}
        testId={testId}
      />
    </div>
  );
}
