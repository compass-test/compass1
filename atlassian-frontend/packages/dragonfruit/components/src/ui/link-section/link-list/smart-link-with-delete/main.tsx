import React, { useCallback, useState } from 'react';

import { sanitizeUrl } from '@braintree/sanitize-url';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import {
  BaseErrorFlagProps,
  DefaultList,
  DeleteModal,
  List,
  SmartLinkDelete,
  SmartLinkListItem,
} from '@atlassian/dragonfruit-common-ui';
import {
  checkCompassMutationSuccess,
  CompassComponent,
  CompassLink,
  CompassLinkType,
  CompassMutationError,
  DeleteComponentLinkHandledErrors,
  useDeleteComponentLink,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../../../common/constants';

import messages from './messages';

export type Props = {
  link: CompassLink;
  componentId: CompassComponent['id'];
  componentName: CompassComponent['name'];
  isDisabled?: boolean;
  position?: 'main' | 'sidebar';
};

const getDeleteModalTitle = (linkType: CompassLinkType) => {
  switch (linkType) {
    case CompassLinkType.REPOSITORY:
      return messages.deleteRepositoryLinkModalTitle;
    case CompassLinkType.DOCUMENT:
      return messages.deleteDocumentLinkModalTitle;
    case CompassLinkType.PROJECT:
      return messages.deleteProjectLinkModalTitle;
    case CompassLinkType.DASHBOARD:
      return messages.deleteDashboardLinkModalTitle;
    case CompassLinkType.OTHER_LINK:
      return messages.deleteOtherLinkModalTitle;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.deleteChatChannelLinkModalTitle;
    case CompassLinkType.ON_CALL:
      return messages.deleteOnCallLinkModalTitle;
    default:
      throw new Error(`Unsupported link type ${linkType}`);
  }
};

const getDeleteErrorFlagTitle = (linkType: CompassLinkType) => {
  switch (linkType) {
    case CompassLinkType.REPOSITORY:
      return messages.deleteRepositoryLinkErrorFlagTitle;
    case CompassLinkType.DOCUMENT:
      return messages.deleteDocumentLinkErrorFlagTitle;
    case CompassLinkType.PROJECT:
      return messages.deleteProjectLinkErrorFlagTitle;
    case CompassLinkType.DASHBOARD:
      return messages.deleteDashboardLinkErrorFlagTitle;
    case CompassLinkType.OTHER_LINK:
      return messages.deleteOtherLinkErrorFlagTitle;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.deleteChatChannelLinkErrorFlagTitle;
    case CompassLinkType.ON_CALL:
      return messages.deleteOnCallLinkErrorFlagTitle;
    default:
      throw new Error(`Unsupported link type ${linkType}`);
  }
};

const getDeleteErrorFlagDescription = (linkType: CompassLinkType) => {
  switch (linkType) {
    case CompassLinkType.REPOSITORY:
    case CompassLinkType.DOCUMENT:
    case CompassLinkType.PROJECT:
    case CompassLinkType.DASHBOARD:
    case CompassLinkType.OTHER_LINK:
      return messages.deleteLinkErrorFlagDescription;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.deleteChatChannelLinkErrorFlagDescription;
    case CompassLinkType.ON_CALL:
      return messages.deleteOnCallLinkErrorFlagDescription;
    default:
      throw new Error(`Unsupported link type ${linkType}`);
  }
};

export function SmartLinkWithDelete(props: Props) {
  const {
    componentId,
    componentName,
    link,
    isDisabled = false,
    position = 'main',
  } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showDeleteLinkErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        id: 'compassDeleteLinkFailure',
        title: formatMessage(getDeleteErrorFlagTitle(link.type)),
        description: formatMessage(description),
      });
    },
    [formatMessage, link, showFlag],
  );

  const [handleMutate] = useDeleteComponentLink();
  const onSubmit = useCallback(() => {
    closeDeleteModal();
    return handleMutate({
      componentId: componentId,
      link: link.id,
    })
      .then((mutationResult) => {
        // Throws MutationError if mutation unsuccessful
        checkCompassMutationSuccess(
          mutationResult?.data?.compass?.deleteComponentLink,
        );
      })
      .catch((error) => {
        if (error instanceof CompassMutationError) {
          const errorType = error.getFirstErrorType();
          switch (errorType) {
            case DeleteComponentLinkHandledErrors.COMPONENT_LINK_DOES_NOT_EXIST:
              showDeleteLinkErrorFlag(messages.componentLinkDoesNotExist);
              return;
            case DeleteComponentLinkHandledErrors.COMPONENT_NOT_FOUND:
              showDeleteLinkErrorFlag(messages.componentNotFound);
              return;
            default:
              fireCompassMutationErrorAnalytics({
                error,
                componentName: 'SmartLinkWithDelete',
                packageName: ANALYTICS_PACKAGE_NAME,
              });
          }
        }
        showDeleteLinkErrorFlag(getDeleteErrorFlagDescription(link.type));
      });
  }, [
    componentId,
    handleMutate,
    fireCompassMutationErrorAnalytics,
    link,
    showDeleteLinkErrorFlag,
  ]);

  return (
    <>
      {position === 'sidebar' ? (
        <DefaultList.Item
          data-smart-link-url={link.url}
          data-smart-link-name={link.name}
        >
          <SmartLinkDelete
            text={link.name === '' || link.name === null ? link.url : link.name}
            url={sanitizeUrl(link.url)}
            onDelete={openDeleteModal}
            isDisabled={isDisabled}
          />
        </DefaultList.Item>
      ) : (
        <List.Item
          data-smart-link-url={link.url}
          data-smart-link-name={link.name}
        >
          <SmartLinkListItem
            text={link.name === '' || link.name === null ? link.url : link.name}
            url={sanitizeUrl(link.url)}
            onDelete={openDeleteModal}
            isDisabled={isDisabled}
          />
        </List.Item>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          heading={formatMessage(getDeleteModalTitle(link.type))}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onSubmit={onSubmit}
        >
          <FormattedHTMLMessage
            {...messages.deleteLinkModalDescription}
            values={{ componentName }}
          />
        </DeleteModal>
      )}
    </>
  );
}
