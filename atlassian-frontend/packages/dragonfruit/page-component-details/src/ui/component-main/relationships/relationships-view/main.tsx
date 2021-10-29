import React from 'react';

import { MutationUpdaterFn } from '@apollo/client';

import EmptyState from '@atlaskit/empty-state';
import Spinner from '@atlaskit/spinner';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useCompassComponentDownstreamDependenciesEnabled } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentInRelationshipViewFragment,
  CompassRelationshipDirection,
  CompassRelationshipInRelationshipViewFragment,
  CompassRelationshipType,
  CreateRelationshipMutation,
  GetComponentRelationshipsDocument,
  GetComponentRelationshipsOldDocument,
  GetComponentRelationshipsOldQuery,
  GetComponentRelationshipsQuery,
  MAX_RELATIONSHIPS_PER_COMPONENT,
  useGetComponentRelationshipsOldQuery,
  useGetComponentRelationshipsQuery,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { RelationshipsEmptyState } from './empty-state';
import messages from './messages';
import { RelationshipSection } from './relationship-section';
import { RelationshipsSectionWrapper } from './styled';

type Props = {
  currentComponent: CompassComponentInRelationshipViewFragment;
};

const ErrorBoundaryFallback: React.FC<Props> = () => {
  const { formatMessage } = useIntl();
  return (
    <EmptyState
      header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
      imageUrl={ErrorIcon}
    />
  );
};

const RelationshipsView: React.FC<Props> = (props: Props) => {
  /**
   * TODO: When cleaning up feature flag for downstream dependencies, delete everything within "DOWNSTREAM_DEPENDENCIES_FF_REGION"
   * START: "DOWNSTREAM_DEPENDENCIES_FF_REGION"
   */
  const isDownstreamDependenciesEnabled = useCompassComponentDownstreamDependenciesEnabled();

  return isDownstreamDependenciesEnabled ? (
    <NewRelationshipsView {...props} />
  ) : (
    <OldRelationshipsView {...props} />
  );
};

const OldRelationshipsView = (props: Props) => {
  const { currentComponent } = props;

  const { formatMessage } = useIntl();

  const variables = {
    id: currentComponent.id,
    query: {
      first: MAX_RELATIONSHIPS_PER_COMPONENT,
    },
  };

  const { data, loading, error } = useGetComponentRelationshipsOldQuery({
    variables,
  });

  // a mutation updater function that gets passed to the CreateRelationshipMutation
  // handler to update the cache with the new relationship
  const updateCreateMutation: MutationUpdaterFn<CreateRelationshipMutation> = (
    proxy,
    { data },
  ) => {
    if (
      !data?.compass?.createRelationship?.success ||
      !data.compass.createRelationship.createdCompassRelationship
    ) {
      return;
    }

    const createdRelationship: CompassRelationshipInRelationshipViewFragment =
      data.compass.createRelationship.createdCompassRelationship;

    // Get the existing relationship data from cache
    const currentComponentRelationshipData = proxy.readQuery<
      GetComponentRelationshipsOldQuery
    >({
      query: GetComponentRelationshipsOldDocument,
      variables,
    });

    if (
      currentComponentRelationshipData?.compass?.component?.__typename !==
        'CompassComponent' ||
      currentComponentRelationshipData.compass.component.relationships
        ?.__typename !== 'CompassRelationshipConnection' ||
      !currentComponentRelationshipData.compass.component.relationships.nodes
    ) {
      return;
    }

    const currentRelationshipNodes: Array<CompassRelationshipInRelationshipViewFragment> =
      currentComponentRelationshipData.compass.component.relationships.nodes;

    // check if the currentRelationshipNodes already contains the createdRelationship
    const newRelationshipNodes: Array<CompassRelationshipInRelationshipViewFragment> = currentRelationshipNodes.some(
      (node) =>
        node.type === createdRelationship.type &&
        node.startNode?.id === createdRelationship.startNode?.id &&
        node.endNode?.id === createdRelationship.endNode?.id,
    )
      ? [...currentRelationshipNodes]
      : [...currentRelationshipNodes, createdRelationship];

    // write the new relationship data to the cache
    proxy.writeQuery({
      query: GetComponentRelationshipsOldDocument,
      variables,
      data: {
        ...currentComponentRelationshipData,
        compass: {
          ...currentComponentRelationshipData.compass,
          component: {
            ...currentComponentRelationshipData.compass.component,
            relationships: {
              ...currentComponentRelationshipData.compass.component
                .relationships,
              nodes: newRelationshipNodes,
            },
          },
        },
      },
    });
  };

  const errorUI = (
    <EmptyState
      header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
      description={formatMessage(
        messages.relationshipsViewLoadingErrorDescription,
      )}
      imageUrl={ErrorIcon}
    />
  );

  const queriedComponent = data?.compass?.component;

  if (error) {
    return errorUI;
  }

  // When loading the relationships
  if (loading) {
    return (
      <RelationshipsSectionWrapper>
        <Spinner size={'large'} />
      </RelationshipsSectionWrapper>
    );
  }

  // When the query returns successfully
  if (
    queriedComponent?.__typename === 'CompassComponent' &&
    queriedComponent.relationships?.__typename ===
      'CompassRelationshipConnection'
  ) {
    const rawRelationships: Array<CompassRelationshipInRelationshipViewFragment> =
      queriedComponent.relationships.nodes ?? [];

    // Get the relationships that haven't been deleted
    // Important that we do this here so that the empty state works
    const relationships = rawRelationships.filter(
      (relationship) => !relationship._isDeleted,
    );

    // When the component has relationships
    if (relationships.length > 0) {
      return (
        <>
          <div>{formatMessage(messages.relationshipsViewDescription)}</div>
          <RelationshipsSectionWrapper>
            <RelationshipSection
              currentComponent={currentComponent}
              relationshipType={CompassRelationshipType.DEPENDS_ON}
              direction={CompassRelationshipDirection.OUTWARD}
              relationships={relationships}
              // Editing is disabled if a data manager exists
              dataManager={queriedComponent.dataManager}
              updateCreateMutation={updateCreateMutation}
            />
          </RelationshipsSectionWrapper>
        </>
      );
    }

    // When there are no relationships for this component
    else {
      return (
        <RelationshipsSectionWrapper>
          <RelationshipsEmptyState
            currentComponent={currentComponent}
            dataManager={queriedComponent.dataManager}
            updateCreateMutation={updateCreateMutation}
          />
        </RelationshipsSectionWrapper>
      );
    }
  }

  // When it fail to query the relationships
  return errorUI;
};

const NewRelationshipsView = (props: Props) => {
  /**
   * TODO: When cleaning up feature flag for downstream dependencies, delete everything within "DOWNSTREAM_DEPENDENCIES_FF_REGION"
   * END: "DOWNSTREAM_DEPENDENCIES_FF_REGION"
   */
  const { currentComponent } = props;

  const { formatMessage } = useIntl();

  const variables = {
    id: currentComponent.id,
    outwardRelationshipsQuery: {
      first: MAX_RELATIONSHIPS_PER_COMPONENT,
      direction: CompassRelationshipDirection.OUTWARD,
    },
    inwardRelationshipsQuery: {
      first: MAX_RELATIONSHIPS_PER_COMPONENT,
      direction: CompassRelationshipDirection.INWARD,
    },
  };

  const {
    data,
    loading,
    error: relationshipsQueryError,
  } = useGetComponentRelationshipsQuery({
    variables,
  });

  // a mutation updater function that gets passed to the CreateRelationshipMutation
  // handler to update the cache with the new relationship
  // This will be reworked as part of COMPASS-2992.
  const updateCreateMutation: MutationUpdaterFn<CreateRelationshipMutation> = (
    proxy,
    { data },
  ) => {
    if (
      !data?.compass?.createRelationship?.success ||
      !data.compass.createRelationship.createdCompassRelationship
    ) {
      return;
    }

    const createdRelationship: CompassRelationshipInRelationshipViewFragment =
      data.compass.createRelationship.createdCompassRelationship;

    // Get the existing relationship data from cache
    const currentComponentRelationshipData = proxy.readQuery<
      GetComponentRelationshipsQuery
    >({
      query: GetComponentRelationshipsDocument,
      variables,
    });

    if (
      currentComponentRelationshipData?.compass?.component?.__typename !==
        'CompassComponent' ||
      currentComponentRelationshipData.compass.component.outwardRelationships
        ?.__typename !== 'CompassRelationshipConnection' ||
      !currentComponentRelationshipData.compass.component.outwardRelationships
        .nodes
    ) {
      return;
    }

    const currentRelationshipNodes: Array<CompassRelationshipInRelationshipViewFragment> =
      currentComponentRelationshipData.compass.component.outwardRelationships
        .nodes;

    // check if the currentRelationshipNodes already contains the createdRelationship
    const newRelationshipNodes: Array<CompassRelationshipInRelationshipViewFragment> = currentRelationshipNodes.some(
      (node) =>
        node.type === createdRelationship.type &&
        node.startNode?.id === createdRelationship.startNode?.id &&
        node.endNode?.id === createdRelationship.endNode?.id,
    )
      ? [...currentRelationshipNodes]
      : [...currentRelationshipNodes, createdRelationship];

    // write the new relationship data to the cache
    proxy.writeQuery({
      query: GetComponentRelationshipsDocument,
      variables,
      data: {
        ...currentComponentRelationshipData,
        compass: {
          ...currentComponentRelationshipData.compass,
          component: {
            ...currentComponentRelationshipData.compass.component,
            outwardRelationships: {
              ...currentComponentRelationshipData.compass.component
                .outwardRelationships,
              nodes: newRelationshipNodes,
            },
          },
        },
      },
    });
  };

  const queriedComponent = data?.compass?.component;

  // When loading the relationships
  if (loading) {
    return (
      <RelationshipsSectionWrapper>
        <Spinner size={'large'} />
      </RelationshipsSectionWrapper>
    );
  }

  // Show error state if upstream or downstream dependencies could not be fetched
  if (
    relationshipsQueryError ||
    queriedComponent?.__typename !== 'CompassComponent' ||
    queriedComponent.outwardRelationships?.__typename !==
      'CompassRelationshipConnection' ||
    queriedComponent.inwardRelationships?.__typename !==
      'CompassRelationshipConnection'
  ) {
    return (
      <EmptyState
        header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
        description={formatMessage(
          messages.relationshipsViewLoadingErrorDescription,
        )}
        imageUrl={ErrorIcon}
      />
    );
  }

  // Get inward and outward relationships that haven't been optimistically deleted.
  // Important that we do this here so that the empty state works
  const inwardRelationships: Array<CompassRelationshipInRelationshipViewFragment> =
    queriedComponent.inwardRelationships.nodes?.filter(
      (relationship) => !relationship._isDeleted,
    ) ?? [];
  const outwardRelationships: Array<CompassRelationshipInRelationshipViewFragment> =
    queriedComponent.outwardRelationships.nodes?.filter(
      (relationship) => !relationship._isDeleted,
    ) ?? [];

  // Show full-page empty state if component has no relationships at all
  if (inwardRelationships.length === 0 && outwardRelationships.length === 0) {
    return (
      <RelationshipsSectionWrapper>
        <RelationshipsEmptyState
          currentComponent={currentComponent}
          dataManager={queriedComponent.dataManager}
          updateCreateMutation={updateCreateMutation}
        />
      </RelationshipsSectionWrapper>
    );
  }

  // When the component has relationships
  return (
    <>
      <div>{formatMessage(messages.relationshipsViewDescription)}</div>

      {/* Always show upstream dependencies section as long as there is at least one upstream or downstream dependency */}
      <RelationshipsSectionWrapper>
        <RelationshipSection
          currentComponent={currentComponent}
          relationshipType={CompassRelationshipType.DEPENDS_ON}
          direction={CompassRelationshipDirection.OUTWARD}
          relationships={outwardRelationships}
          // Editing is disabled if a data manager exists
          dataManager={queriedComponent.dataManager}
          updateCreateMutation={updateCreateMutation}
        />
      </RelationshipsSectionWrapper>

      {/* Only show downstream dependencies section if there are any */}
      {inwardRelationships.length > 0 && (
        <RelationshipsSectionWrapper>
          <RelationshipSection
            currentComponent={currentComponent}
            relationshipType={CompassRelationshipType.DEPENDS_ON}
            direction={CompassRelationshipDirection.INWARD}
            relationships={inwardRelationships}
            dataManager={queriedComponent.dataManager}
            updateCreateMutation={updateCreateMutation}
          />
        </RelationshipsSectionWrapper>
      )}
    </>
  );
};

export default withErrorBoundary(RelationshipsView, {
  Fallback: ErrorBoundaryFallback,
  componentName: `RelationshipsView`,
});
