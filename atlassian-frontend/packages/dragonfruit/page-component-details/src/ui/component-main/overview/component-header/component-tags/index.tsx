import React from 'react';

import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';

import { DataManagerInfo } from '../../../../../common/ui/data-manager-info';
import { LastDeployed } from '../../../../../common/ui/last-deployed';

import { BottomBarWrapper, SeparatorWrapper } from './styled';

type ComponentTagsProps = {
  component: CompassComponentDetailViewFragment;
};

export function ComponentTags(props: ComponentTagsProps) {
  const { component } = props;

  const deploymentEvent = getDeploymentEvent(component);

  return (
    <BottomBarWrapper>
      {component.dataManager && (
        <DataManagerInfo
          componentId={component.id}
          dataManager={component.dataManager}
          canDisplayErrors={true}
        />
      )}
      {deploymentEvent && component.dataManager && <Separator />}
      {deploymentEvent && (
        <LastDeployed
          deploymentEvent={deploymentEvent}
          componentType={component.type}
        />
      )}
    </BottomBarWrapper>
  );
}

function Separator() {
  return <SeparatorWrapper>•</SeparatorWrapper>;
}

function getDeploymentEvent(component: CompassComponentDetailViewFragment) {
  if (component.events?.__typename !== 'CompassEventConnection') {
    return null;
  }

  return (component.events.nodes ?? [])[0] ?? null;
}
