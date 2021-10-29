import React, { useState } from 'react';

import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import { TierFieldPicker } from '@atlassian/dragonfruit-components';
import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import {
  readJsonFromLocalStorage,
  withErrorBoundary,
  writeToLocalStorage,
} from '@atlassian/dragonfruit-utils';

import { DATA_MANAGER_SECTION_MESSAGE_SEEN_STORAGE_KEY } from '../../../common/constants';

import ComponentHeader from './component-header';
// This component might be more appropriate to locate within the package:
//
//   @atlassian/dragonfruit-external-component-management
//
// For the time being it's being left here, but was lifted out of the sub-
// package `right-sidebar` as part of:
//
//   https://softwareteams.atlassian.net/browse/COMPASS-2276
//
// Moving it to the aforementioned domain package involved too much change due
// to Tangerine import restrictions (we'd have to move its internal domain
// package dependencies to `common` within the domain package) and was likely to
// cause merge conflicts (so it was beyond the scope of a convenient code move).
//
// Leaving this guard rail in place should anyone be attempting to refactor.
// Just know that `ComponentManagerContainer` is a self-contained component that
// happens to live exclusively on `page-component-details` right now.
import ComponentSummary from './component-summary';
import { LabelsSection } from './labels';
import { LinkView } from './links';
import ManagedComponentSectionMessage from './managed-component-section-message';
import {
  DescriptionWrapper,
  LabelsSectionWrapper,
  TierWrapper,
} from './styled';
interface OverviewProps {
  component: CompassComponentDetailViewFragment;
}

function Overview(props: OverviewProps) {
  const { component } = props;

  const value = readJsonFromLocalStorage(
    DATA_MANAGER_SECTION_MESSAGE_SEEN_STORAGE_KEY,
  );

  const [isSectionMessageOpen, setIsSectionMessageOpen] = useState(
    value === null,
  );
  const closeSectionMessage = () => {
    writeToLocalStorage(DATA_MANAGER_SECTION_MESSAGE_SEEN_STORAGE_KEY, 'true');
    setIsSectionMessageOpen(false);
  };

  const showSectionMessage = component.dataManager === null;

  return (
    <MainContainer>
      {showSectionMessage && isSectionMessageOpen && (
        <ManagedComponentSectionMessage dismissMessage={closeSectionMessage} />
      )}
      <ComponentHeader
        component={component}
        isDisabled={!!component.dataManager}
      />

      <TierWrapper>
        <TierFieldPicker
          component={component}
          isDisabled={!!component.dataManager}
        />
      </TierWrapper>

      <DescriptionWrapper>
        <ComponentSummary
          componentId={component.id}
          componentDescription={component.description}
          dataManager={component.dataManager || undefined}
        />
      </DescriptionWrapper>
      <LinkView
        componentName={component.name}
        componentId={component.id}
        dataManager={component.dataManager || undefined}
        links={component.links ? component.links : []}
      />
      <LabelsSectionWrapper>
        <LabelsSection
          componentId={component.id}
          componentLabels={component.labels}
        />
      </LabelsSectionWrapper>
    </MainContainer>
  );
}

export default withErrorBoundary(Overview, {
  componentName: 'componentDetailsOverview',
});
