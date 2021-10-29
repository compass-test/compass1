import React from 'react';

import { components } from '@atlaskit/select';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import messages from './messages';
import { ComponentProps } from './types';

type NoOptionsMessage = NonNullable<ComponentProps['NoOptionsMessage']>;

/**
 * The default message that is shown when no options are found in the selector.
 */
export const NoOptionsMessageDefault: NoOptionsMessage = (props) => {
  const { children, ...forwardProps } = props;
  const { formatMessage } = useIntl();

  return (
    <components.NoOptionsMessage {...forwardProps}>
      {formatMessage(CommonMessages.noMatchesFound)}
    </components.NoOptionsMessage>
  );
};

/**
 * The message that is shown in the selector when an HTTP error occurs.
 */
export const NoOptionsMessageError: NoOptionsMessage = (props) => {
  const { children, ...forwardProps } = props;
  const { formatMessage } = useIntl();

  return (
    <components.NoOptionsMessage {...forwardProps}>
      <p>{formatMessage(messages.componentFetchErrorMessage)}</p>
      <p>
        {formatMessage(CommonMessages.checkYourConnectionAndTryAgainFullStop)}
      </p>
    </components.NoOptionsMessage>
  );
};
