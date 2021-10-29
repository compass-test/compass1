import { FormattedMessage, MessageValue } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  CompassComponentInRelationshipViewFragment,
  CompassComponentType,
  CompassMutationError,
  CompassRelationshipInRelationshipViewFragment,
  CompassRelationshipType,
  CreateRelationshipHandledErrors,
  CreateRelationshipMutation,
  MAX_RELATIONSHIPS_PER_COMPONENT,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';
// import { fireErrorAnalytics } from '@atlassian/error-handling';

import { ANALYTICS_PACKAGE_NAME } from '../../constants';

import messages from './messages';

export const useHandleCreateRelationshipError = () => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showCreateRelationshipErrorFlag = (
    description: FormattedMessage.MessageDescriptor,
    values?: { [key: string]: MessageValue },
  ) => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'dragonfruitCreateRelationshipFailure',
      title: formatMessage(messages.errorCreatingRelationshipFlagTitle),
      description: formatMessage(description, values),
    });
  };

  /**
   * Function for handling any errors that may occur while creating a relationship.
   * Will show error flags with messages describing the error if an expected error
   * occurs. Will fireErrorAnalytics if an unexpected error occurs.
   * @param error - the mutation error.
   * @param componentName - the name of the component that the error occurred in.
   */
  const handleCreateRelationshipError = (props: {
    error: Error;
    componentName: string;
  }) => {
    const { error, componentName } = props;

    // if the server response contains an error
    // else likely a client/network error - do not log
    if (error instanceof CompassMutationError) {
      const errorType = error.getFirstErrorType();
      switch (errorType) {
        case CreateRelationshipHandledErrors.RELATIONSHIP_ALREADY_EXISTS:
          showCreateRelationshipErrorFlag(
            messages.relationshipAlreadyExistsErrorFlagDescription,
          );
          return;
        case CreateRelationshipHandledErrors.RELATIONSHIP_LIMIT_REACHED:
          showCreateRelationshipErrorFlag(
            messages.relationshipLimitReachedErrorFlagDescription,
            { limit: MAX_RELATIONSHIPS_PER_COMPONENT },
          );
          return;
        case CreateRelationshipHandledErrors.RELATIONSHIP_START_NODE_NOT_FOUND:
          showCreateRelationshipErrorFlag(
            messages.relationshipStartNodeDoesNotExistErrorFlagDescription,
          );
          return;
        case CreateRelationshipHandledErrors.RELATIONSHIP_END_NODE_NOT_FOUND:
          showCreateRelationshipErrorFlag(
            messages.relationshipEndNodeDoesNotExistErrorFlagDescription,
          );
          return;
        case CreateRelationshipHandledErrors.RELATIONSHIP_NODES_SELF_REFERENCING_ERROR:
          showCreateRelationshipErrorFlag(
            messages.relationshipSelfReferencingErrorFlagDescription,
          );
          return;
        case CreateRelationshipHandledErrors.COMPONENT_NOT_FOUND:
          showCreateRelationshipErrorFlag(messages.componentNotFound);
          return;
        default:
          fireCompassMutationErrorAnalytics({
            error,
            componentName,
            packageName: ANALYTICS_PACKAGE_NAME,
          });
      }
    }
    showCreateRelationshipErrorFlag(
      messages.errorCreatingRelationshipFlagDescription,
    );
  };

  return { handleCreateRelationshipError };
};

/**
 * Checks whether a relationship can be created between [currentComponentId] and [otherComponentId].
 * [existingRelationships] is a list of relationships already existing on [currentComponentId].
 * @returns The appropriate error string if the new relationship cannot be created, `undefined` otherwise.
 */
export const validateNewRelationship = (
  currentComponentId: CompassComponent['id'],
  otherComponentId: CompassComponent['id'],
  existingRelationships: Array<CompassRelationshipInRelationshipViewFragment>,
) => {
  // Check if [currentComponentId] is the same as [otherComponentId]
  if (currentComponentId === otherComponentId) {
    return CreateRelationshipHandledErrors.RELATIONSHIP_NODES_SELF_REFERENCING_ERROR;
  }

  // Check if relationship with [otherComponentId] already exists
  const relationshipAlreadyExists = existingRelationships.some(
    (relationship) => relationship.endNode?.id === otherComponentId,
  );
  if (relationshipAlreadyExists) {
    return CreateRelationshipHandledErrors.RELATIONSHIP_ALREADY_EXISTS;
  }

  return undefined;
};

export const convertErrorToMessage = (
  error: string,
): FormattedMessage.MessageDescriptor => {
  switch (error) {
    case CreateRelationshipHandledErrors.RELATIONSHIP_NODES_SELF_REFERENCING_ERROR:
      return messages.relationshipSelfReferencingError;
    case CreateRelationshipHandledErrors.RELATIONSHIP_ALREADY_EXISTS:
      return messages.relationshipAlreadyExistsError;
    default:
      return CommonMessages.somethingWentWrongPleaseTryAgainFullStop;
  }
};

// Returns a numerical value based on the provided node's component type.
// This allows us to sort in the same order that they appear in on the component list page.
const getOrderByType = (
  node: CompassComponentInRelationshipViewFragment,
): number => {
  switch (node.type) {
    case CompassComponentType.SERVICE:
      return 0;
    case CompassComponentType.LIBRARY:
      return 1;
    case CompassComponentType.APPLICATION:
      return 2;
    case CompassComponentType.OTHER:
      return 3;
    default:
      return 4;
  }
};

export const getRelationshipStartNode = (
  relationship: CompassRelationshipInRelationshipViewFragment,
): CompassRelationshipInRelationshipViewFragment['startNode'] => {
  return relationship.startNode;
};

export const getRelationshipEndNode = (
  relationship: CompassRelationshipInRelationshipViewFragment,
): CompassRelationshipInRelationshipViewFragment['endNode'] => {
  return relationship.endNode;
};

/**
 * Given a function that determines which node (i.e. startNode/endNode) to sort by,
 * returns a sort function to be used as the compareFn in a JavaScript `sort()`.
 * The returned function sorts a list of relationships by their specified nodes' component types, then component names.
 */
export const getSortByTypeThenNameFn = (
  nodeToSortBy: (
    relationship: CompassRelationshipInRelationshipViewFragment,
  ) =>
    | CompassRelationshipInRelationshipViewFragment['startNode']
    | CompassRelationshipInRelationshipViewFragment['endNode'],
) => (
  a: CompassRelationshipInRelationshipViewFragment,
  b: CompassRelationshipInRelationshipViewFragment,
) => {
  const nodeA = nodeToSortBy(a);
  const nodeB = nodeToSortBy(b);

  // Sort null/undefined values to the end.
  if (!nodeA) {
    return 1;
  } else if (!nodeB) {
    return -1;
  }

  // Sort by type first
  const typeOrderA = getOrderByType(nodeA);
  const typeOrderB = getOrderByType(nodeB);
  if (typeOrderA !== typeOrderB) {
    return typeOrderA - typeOrderB;
  }

  // Sort by name second
  return nodeA.name.localeCompare(nodeB.name);
};

export const getCreateRelationshipOptimisticResponse = (props: {
  startNode: CompassComponentInRelationshipViewFragment;
  endNode: CompassComponentInRelationshipViewFragment;
  type: CompassRelationshipType;
}): CreateRelationshipMutation => {
  return {
    __typename: 'Mutation',
    compass: {
      __typename: 'CompassCatalogMutationApi',
      createRelationship: {
        __typename: 'CreateCompassRelationshipPayload',
        success: true,
        createdCompassRelationship: {
          __typename: 'CompassRelationship',
          startNode: props.startNode,
          type: props.type,
          endNode: props.endNode,
        },
        errors: null,
      },
    },
  };
};
