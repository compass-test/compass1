import React, { useCallback, useState } from 'react';

import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import { useFlags } from '@atlaskit/flag';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Tooltip from '@atlaskit/tooltip';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  DeleteModal,
} from '@atlassian/dragonfruit-common-ui';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import {
  checkCompassMutationSuccess,
  CompassComponentType,
  CompassMutationError,
  CompassRelationshipInRelationshipViewFragment,
  DeleteRelationshipHandledErrors,
  useDeleteRelationship,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../../../../../../common/constants';

import messages from './messages';
import {
  ComponentDetailsLink,
  ComponentIconContainer,
  ComponentNameContainer,
  ComponentTypeContainer,
  DeleteButtonContainer,
  RelationshipListItemWrapper,
} from './styled';

type ComponentIconProps = {
  componentType: CompassComponentType;
};

const ComponentIcon = (props: ComponentIconProps) => {
  const { componentType } = props;

  return (
    <ComponentIconContainer>
      <ComponentTypeIcon label="" type={componentType} />
    </ComponentIconContainer>
  );
};

type ComponentTypeProps = {
  componentType: CompassComponentType;
};

const ComponentType = (props: ComponentTypeProps) => {
  const { componentType } = props;
  const { formatMessage } = useIntl();

  function getComponentTypeMessage(type: CompassComponentType) {
    switch (type) {
      case CompassComponentType.APPLICATION:
        return formatMessage(CommonMessages.application);
      case CompassComponentType.LIBRARY:
        return formatMessage(CommonMessages.library);
      case CompassComponentType.SERVICE:
        return formatMessage(CommonMessages.service);
      case CompassComponentType.OTHER:
        return formatMessage(CommonMessages.other);
      default:
        return '';
    }
  }

  return (
    <ComponentTypeContainer>
      {getComponentTypeMessage(componentType)}
    </ComponentTypeContainer>
  );
};

type ComponentNameProps = {
  componentName: string;
};

const ComponentName = (props: ComponentNameProps) => {
  const { componentName } = props;

  return (
    <ComponentNameContainer>
      <Tooltip content={componentName} position="mouse">
        <span>{componentName}</span>
      </Tooltip>
    </ComponentNameContainer>
  );
};

export type RelationshipListItemProps = {
  relationship: CompassRelationshipInRelationshipViewFragment;
  getRelationshipNode: (
    relationship: CompassRelationshipInRelationshipViewFragment,
  ) =>
    | CompassRelationshipInRelationshipViewFragment['startNode']
    | CompassRelationshipInRelationshipViewFragment['endNode'];
  isDisabled?: boolean;
};

export const RelationshipListItem = (props: RelationshipListItemProps) => {
  const { relationship, getRelationshipNode, isDisabled } = props;
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const [handleMutate] = useDeleteRelationship();

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showDeleteRelationshipErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        id: 'dragonfruitCreateRelationshipFailure',
        title: formatMessage(messages.errorDeletingDependencyFlagTitle),
        description: formatMessage(description),
      });
    },
    [formatMessage, showFlag],
  );

  const handleDeleteRelationshipError = useCallback(
    (error: Error) => {
      if (error instanceof CompassMutationError) {
        const errorType = error.getFirstErrorType();
        switch (errorType) {
          case DeleteRelationshipHandledErrors.RELATIONSHIP_NOT_FOUND:
            showDeleteRelationshipErrorFlag(
              messages.errorDeletingRelationshipNotFound,
            );
            return;
          case DeleteRelationshipHandledErrors.COMPONENT_NOT_FOUND:
            showDeleteRelationshipErrorFlag(messages.componentNotFound);
            return;
          default:
            fireCompassMutationErrorAnalytics({
              error,
              componentName: 'RelationshipListItem',
              packageName: ANALYTICS_PACKAGE_NAME,
            });
        }
      }
      showDeleteRelationshipErrorFlag(
        messages.errorDeletingDependencyFlagDescription,
      );
    },
    [fireCompassMutationErrorAnalytics, showDeleteRelationshipErrorFlag],
  );

  const handleSubmit = useCallback(() => {
    handleMutate({
      endNodeId: relationship.endNode?.id ?? '',
      startNodeId: relationship.startNode?.id ?? '',
      type: relationship.type,
    })
      .then((mutationResult) => {
        checkCompassMutationSuccess(
          mutationResult?.data?.compass?.deleteRelationship,
        );
      })
      .catch((error) => handleDeleteRelationshipError(error));
    closeDeleteModal();
  }, [handleMutate, handleDeleteRelationshipError, relationship]);

  const nodeToDisplay = getRelationshipNode(relationship);

  if (!nodeToDisplay) {
    return null;
  }

  const componentPath = routes.COMPONENT_DETAILS(nodeToDisplay.id);

  return (
    <RelationshipListItemWrapper>
      <ComponentDetailsLink to={componentPath} isDisabled={isDisabled}>
        <ComponentIcon componentType={nodeToDisplay.type} />
        <ComponentType componentType={nodeToDisplay.type} />
        <ComponentName componentName={nodeToDisplay.name} />
      </ComponentDetailsLink>
      {!isDisabled && (
        <>
          <DeleteButtonContainer>
            <Button
              iconBefore={<EditorCloseIcon label="" size="medium" />}
              onClick={openDeleteModal}
              spacing="none"
              aria-label={formatMessage(
                messages.deleteRelationshipWithComponent,
                { componentName: nodeToDisplay.name },
              )}
            />
          </DeleteButtonContainer>
          <DeleteModal
            heading={formatMessage(messages.removeDependencyTitle)}
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onSubmit={handleSubmit}
          >
            <FormattedHTMLMessage
              {...messages.removeDependencyDescription}
              values={{ componentName: nodeToDisplay.name }}
            />
          </DeleteModal>
        </>
      )}
    </RelationshipListItemWrapper>
  );
};
