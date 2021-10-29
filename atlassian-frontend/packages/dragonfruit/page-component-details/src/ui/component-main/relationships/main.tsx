import React from 'react';

import PageHeader from '@atlaskit/page-header';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponentDataManager,
  CompassComponentInRelationshipViewFragment,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentBreadcrumbs } from '../../../common/ui/breadcrumbs';
import { DataManagerInfo } from '../../../common/ui/data-manager-info';

import messages from './messages';
import { RelationshipsView } from './relationships-view';
import { BottomBarWrapper } from './styled';

type RelationshipsProps = {
  currentComponent: CompassComponentInRelationshipViewFragment;
  dataManager?: CompassComponentDataManager | null;
};

export function Relationships(props: RelationshipsProps) {
  const { currentComponent, dataManager } = props;

  const { formatMessage } = useIntl();

  const breadcrumbs = (
    <ComponentBreadcrumbs
      componentId={currentComponent.id}
      componentName={currentComponent.name}
      componentType={currentComponent.type}
    />
  );

  return (
    <MainContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        bottomBar={
          dataManager ? (
            <BottomBarWrapper>
              <DataManagerInfo
                componentId={currentComponent.id}
                dataManager={dataManager}
              />
            </BottomBarWrapper>
          ) : undefined
        }
      >
        {formatMessage(messages.pageHeader)}
      </PageHeader>

      <RelationshipsView currentComponent={currentComponent} />
    </MainContainer>
  );
}
