import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import {
  CompassLinkType,
  MAX_COMPASS_LINKS_PER_SECTION,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

function getLimitReachedFlagTitle(linkType: CompassLinkType) {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
      return messages.documentationLinkLimitReachedFlagTitle;
    case CompassLinkType.DASHBOARD:
      return messages.dashboardLinkLimitReachedFlagTitle;
    case CompassLinkType.PROJECT:
      return messages.projectLinkLimitReachedFlagTitle;
    case CompassLinkType.REPOSITORY:
      return messages.repositoryLinkLimitReachedFlagTitle;
    case CompassLinkType.OTHER_LINK:
      return messages.otherLinkLimitReachedFlagTitle;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.chatChannelLinkLimitReachedFlagTitle;
    case CompassLinkType.ON_CALL:
      return messages.onCallLinkLimitReachedFlagTitle;
    default:
      throw Error('Unsupported link type');
  }
}

function getLimitReachedFlagDescription(linkType: CompassLinkType) {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
    case CompassLinkType.DASHBOARD:
    case CompassLinkType.PROJECT:
    case CompassLinkType.REPOSITORY:
    case CompassLinkType.OTHER_LINK:
      return messages.linkLimitReachedFlagDescription;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.chatChannelLinkLimitReachedFlagDescription;
    case CompassLinkType.ON_CALL:
      return messages.onCallLinkLimitReachedFlagDescription;
    default:
      throw Error('Unsupported link type');
  }
}

const getErrorFlagTitle = (linkType: CompassLinkType) => {
  switch (linkType) {
    case CompassLinkType.DOCUMENT:
      return messages.addDocumentLinkErrorFlagTitle;
    case CompassLinkType.DASHBOARD:
      return messages.addDashboardLinkErrorFlagTitle;
    case CompassLinkType.PROJECT:
      return messages.addProjectLinkErrorFlagTitle;
    case CompassLinkType.REPOSITORY:
      return messages.addRepositoryLinkErrorFlagTitle;
    case CompassLinkType.OTHER_LINK:
      return messages.addOtherLinkErrorFlagTitle;
    case CompassLinkType.CHAT_CHANNEL:
      return messages.addChatChannelLinkErrorFlagTitle;
    case CompassLinkType.ON_CALL:
      return messages.addOnCallLinkErrorFlagTitle;
    default:
      throw Error('Unsupported link type');
  }
};

export const useCreateLinkErrorFlags = () => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  // Limit reached flag has its own title
  const showLinkLimitReachedFlag = (linkType: CompassLinkType) => {
    showFlag({
      ...BaseErrorFlagProps,
      id: 'linkLimitReachedFlag',
      title: formatMessage(getLimitReachedFlagTitle(linkType)),
      description: formatMessage(getLimitReachedFlagDescription(linkType), {
        limit: MAX_COMPASS_LINKS_PER_SECTION,
      }),
    });
  };

  // Show the rest of errors with generic title
  const showLinkErrorFlag = (
    linkType: CompassLinkType,
    description: FormattedMessage.MessageDescriptor,
  ) => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(getErrorFlagTitle(linkType)),
      description: formatMessage(description),
    });
  };

  const showComponentNotFoundErrorFlag = (linkType: CompassLinkType) => {
    showLinkErrorFlag(linkType, messages.componentNotFound);
  };

  const showInvalidLinkUrlErrorFlag = (linkType: CompassLinkType) => {
    showLinkErrorFlag(linkType, messages.addInvalidLinkErrorFlagDescription);
  };

  const showLinkNameTooLongErrorFlag = (linkType: CompassLinkType) => {
    showLinkErrorFlag(linkType, messages.componentLinkNameTooLong);
  };

  const showLinkUrlTooLongErrorFlag = (linkType: CompassLinkType) => {
    showLinkErrorFlag(linkType, messages.componentLinkUrlTooLong);
  };

  const showGenericLinkErrorFlag = (linkType: CompassLinkType) => {
    showLinkErrorFlag(linkType, messages.addLinkErrorFlagDescription);
  };

  return {
    showComponentNotFoundErrorFlag,
    showInvalidLinkUrlErrorFlag,
    showLinkLimitReachedFlag,
    showLinkNameTooLongErrorFlag,
    showLinkUrlTooLongErrorFlag,
    showGenericLinkErrorFlag,
  };
};
