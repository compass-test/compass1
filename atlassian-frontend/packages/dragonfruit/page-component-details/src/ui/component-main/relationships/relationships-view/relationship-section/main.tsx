import React, { useState } from 'react';

import { MutationUpdaterFn } from '@apollo/client';

import { useFlags } from '@atlaskit/flag';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { EditInExternalSourceLink } from '@atlassian/dragonfruit-components';
import {
  CompassComponentDataManager,
  CompassComponentInRelationshipViewFragment,
  CompassRelationshipDirection,
  CompassRelationshipInRelationshipViewFragment,
  CompassRelationshipType,
  CreateRelationshipMutation,
  MAX_RELATIONSHIPS_PER_COMPONENT,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { AddRelationshipForm } from './add-relationship-form';
import messages from './messages';
import { RelationshipList } from './relationship-list';
import { SectionEmptyState } from './section-empty-state';
import { SectionHeader } from './section-header';
import { DataManagerLinkWrapper, RelationshipListContainer } from './styled';

export type RelationshipSectionProps = {
  currentComponent: CompassComponentInRelationshipViewFragment;
  relationshipType: CompassRelationshipType;
  direction: CompassRelationshipDirection;
  relationships: Array<CompassRelationshipInRelationshipViewFragment>;
  dataManager?: CompassComponentDataManager | null;
  updateCreateMutation?: MutationUpdaterFn<CreateRelationshipMutation>;
  // Used as a prefix
  testId?: string;
};

export const shouldShowDataManagerLink = (
  relationshipType: CompassRelationshipType,
  direction: CompassRelationshipDirection,
  isManaged: boolean,
  isEmpty: boolean,
): boolean => {
  return (
    isManaged &&
    !isEmpty &&
    relationshipType === CompassRelationshipType.DEPENDS_ON &&
    direction === CompassRelationshipDirection.OUTWARD
  );
};

const RelationshipSection: React.FC<RelationshipSectionProps> = ({
  currentComponent,
  relationshipType,
  direction,
  relationships,
  dataManager,
  updateCreateMutation,
  testId,
}) => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const filteredRelationships = relationships.filter(
    (relationship) => relationship.type === relationshipType,
  );

  const prefixTestId =
    testId ??
    `relationships.${relationshipType.toLowerCase()}.${direction.toLowerCase()}`;

  const openAddForm = () => {
    if (filteredRelationships.length >= MAX_RELATIONSHIPS_PER_COMPONENT) {
      showFlag({
        ...BaseErrorFlagProps,
        id: 'dragonfruitCreateRelationshipFailure',
        title: formatMessage(messages.relationshipLimitReachedErrorFlagTitle),
        description: formatMessage(
          messages.relationshipLimitReachedErrorFlagDescription,
          { limit: MAX_RELATIONSHIPS_PER_COMPONENT },
        ),
      });
    } else {
      setIsAddFormVisible(true);
    }
  };
  const closeAddForm = () => setIsAddFormVisible(false);

  const isManaged = Boolean(dataManager);
  const isEmpty = filteredRelationships.length === 0;
  const showEmptyState = isEmpty && !isAddFormVisible;
  const showAddRelationshipForm = isAddFormVisible && !isManaged;
  const showDataManagerLink = shouldShowDataManagerLink(
    relationshipType,
    direction,
    isManaged,
    isEmpty,
  );
  // Only allow deletion of relationships if they are upstream and the component is not externally managed
  const areRelationshipsEditable =
    !isManaged && direction === CompassRelationshipDirection.OUTWARD;

  const addDependencyLabel = formatMessage(messages.addDependency);

  return (
    <RelationshipListContainer data-testid={`${prefixTestId}--section`}>
      <SectionHeader
        testId={prefixTestId}
        relationshipType={relationshipType}
        direction={direction}
        isSectionEmpty={isEmpty}
        isManaged={isManaged}
        actionLabel={addDependencyLabel}
        onActionClick={openAddForm}
      />

      {showEmptyState && (
        <SectionEmptyState
          testId={prefixTestId}
          relationshipType={relationshipType}
          direction={direction}
          dataManager={dataManager}
          actionLabel={addDependencyLabel}
          onClick={openAddForm}
        />
      )}

      {!isEmpty && (
        <RelationshipList
          relationships={filteredRelationships}
          direction={direction}
          isDisabled={!areRelationshipsEditable}
          testId={testId ?? `${prefixTestId}--list`}
        />
      )}

      {showDataManagerLink && (
        <DataManagerLinkWrapper>
          <EditInExternalSourceLink
            data-testid={`${prefixTestId}--data-manager-link`}
            href={dataManager?.externalSourceURL}
            target="_blank"
            rel="noopener"
          >
            {formatMessage(messages.configAsCodePrompt)}
          </EditInExternalSourceLink>
        </DataManagerLinkWrapper>
      )}

      {showAddRelationshipForm && (
        <AddRelationshipForm
          existingRelationships={filteredRelationships}
          relationshipType={relationshipType}
          currentComponent={currentComponent}
          onSuccess={closeAddForm}
          onCancel={closeAddForm}
          updateCreateMutation={updateCreateMutation}
        />
      )}
    </RelationshipListContainer>
  );
};

export default withErrorBoundary(RelationshipSection, {
  componentName: `RelationshipSection`,
});
