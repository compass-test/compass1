import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ButtonGroup } from '@atlaskit/button';
import PageHeader from '@atlaskit/page-header';
import { StarredStatusButton } from '@atlassian/dragonfruit-common-ui';
import {
  UI_STARRED_COMPONENT,
  UI_STARRED_COMPONENT_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import { InlineName } from '@atlassian/dragonfruit-services-components';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ComponentBreadcrumbs } from '../../../../common/ui/breadcrumbs';
import HeaderDropdown from '../../../../common/ui/header-dropdown/main';

import { ComponentTags } from './component-tags';

interface ComponentHeaderProps {
  component: CompassComponentDetailViewFragment;
  isDisabled?: boolean;
}

function ComponentHeader(props: ComponentHeaderProps & InjectedIntlProps) {
  const { component, isDisabled = false } = props;

  const breadcrumbs = (
    <ComponentBreadcrumbs
      componentId={component.id}
      componentName={''}
      componentType={component.type}
    />
  );

  // Add starred status button under feature flag
  const starredButtonEnabled = useFeatureFlag<boolean>(
    UI_STARRED_COMPONENT,
    UI_STARRED_COMPONENT_DEFAULT_VALUE,
  );

  const isStarred = false;

  const actions = (
    <ButtonGroup>
      {starredButtonEnabled.value && (
        <StarredStatusButton
          isStarred={isStarred}
          onClick={() => {}}
          appearance="subtle"
        />
      )}
      <HeaderDropdown
        componentId={component.id}
        componentName={component.name}
        componentManaged={component.dataManager !== null}
        externalSourceURL={component.dataManager?.externalSourceURL}
      />
    </ButtonGroup>
  );

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      actions={actions}
      bottomBar={<ComponentTags component={component} />}
    >
      <InlineName
        componentId={component.id}
        componentName={component.name}
        isDisabled={isDisabled}
      />
    </PageHeader>
  );
}

export default withErrorBoundary(injectIntl(ComponentHeader), {
  componentName: 'componentHeader',
});
