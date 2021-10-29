import React from 'react';

import EmptyState from '../src/common/ui/empty-state';

import Ticket from './assets/Ticket.svg';

export default function ExampleEmptyStateComponent() {
  return (
    <EmptyState
      title={'EmptyState'}
      description={'EmptyState with directly imported SVG image.'}
      imageUrl={Ticket}
      testId={'team-work-empty-state-component'}
    />
  );
}
