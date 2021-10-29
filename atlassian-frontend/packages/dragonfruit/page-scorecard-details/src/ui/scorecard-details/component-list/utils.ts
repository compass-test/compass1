import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

export const GetComponentTypeMessage = (
  componentType: CompassComponentType,
): string => {
  const { formatMessage } = useIntl();

  switch (componentType) {
    case CompassComponentType.LIBRARY:
      return formatMessage(CommonMessages.libraries).toLowerCase();
    case CompassComponentType.APPLICATION:
      return formatMessage(CommonMessages.applications).toLowerCase();
    case CompassComponentType.SERVICE:
      return formatMessage(CommonMessages.services).toLowerCase();
    case CompassComponentType.OTHER:
      return formatMessage(messages.otherComponentTypeDescription);
  }
};
