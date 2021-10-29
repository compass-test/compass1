import React from 'react';

import { RightSidebarContainer } from '@atlassian/dragonfruit-common-ui';
import {
  UI_COMPONENT_CONTACT_CARD,
  UI_COMPONENT_CONTACT_CARD_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import { ScorecardQuickViewContainer } from '@atlassian/dragonfruit-scorecards';
import {
  ComponentContactCard,
  ComponentOwnerContainer,
} from '@atlassian/dragonfruit-teams';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

type ScorecardsSidebarProps = {
  component: CompassComponentDetailViewFragment;
};

function ScorecardsSidebar(props: ScorecardsSidebarProps) {
  const { component } = props;

  const componentContactCardEnabledFlag = useFeatureFlag<boolean>(
    UI_COMPONENT_CONTACT_CARD,
    UI_COMPONENT_CONTACT_CARD_DEFAULT_VALUE,
  );

  return (
    <RightSidebarContainer>
      <ComponentOwnerContainer
        ownerId={component.ownerId}
        componentId={component.id}
        dataManager={component.dataManager || undefined}
      />
      {componentContactCardEnabledFlag.value && (
        <ComponentContactCard
          componentId={component.id}
          componentName={component.name}
          componentType={component.type}
          links={component.links ? component.links : []}
          dataManager={component.dataManager || undefined}
        />
      )}
      <ScorecardQuickViewContainer componentId={component.id} />
    </RightSidebarContainer>
  );
}

export default withErrorBoundary(ScorecardsSidebar, {
  componentName: 'scorecardsSidebar',
});
