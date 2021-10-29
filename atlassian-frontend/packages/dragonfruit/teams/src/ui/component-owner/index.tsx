import React from 'react';

import { di } from 'react-magnetic-di';

import { Card } from '@atlassian/dragonfruit-common-ui';
import { CompassComponentDataManager } from '@atlassian/dragonfruit-graphql';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import ComponentOwnerHeader from './component-owner-header';
import ComponentOwnerEmptyState from './empty-state';

interface Props {
  ownerId?: string | null;
  componentId: string;
  dataManager?: CompassComponentDataManager;
}

function ComponentOwnerContainer({ ownerId, componentId, dataManager }: Props) {
  di(ComponentOwnerHeader);

  if (!ownerId) {
    return (
      <Card data-testid="dragonfruit.teams.component-owner-card">
        <ComponentOwnerEmptyState
          componentId={componentId}
          dataManager={dataManager}
        />
      </Card>
    );
  }

  const teamId = ownerId.split('/')[1];

  return (
    <ComponentOwnerHeader
      link={true}
      teamId={teamId}
      componentId={componentId}
      dataManager={dataManager}
    />
  );
}

export default withErrorBoundary(ComponentOwnerContainer, {
  componentName: 'ComponentOwnerContainer',
});
