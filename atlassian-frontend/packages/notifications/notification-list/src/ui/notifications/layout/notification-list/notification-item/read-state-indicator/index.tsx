import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Tooltip from '@atlaskit/tooltip';

import messages from '../../../../../../common/utils/i18n/messages';

import { UnreadIndicator, UnreadIndicatorWrapper } from './styled';

type ReadStateIndicatorProps = {
  read: boolean;
  onToggle: () => void;
  testId?: string;
};

function ReadStateIndicator({
  read,
  onToggle,
  testId,
  intl,
}: ReadStateIndicatorProps & InjectedIntlProps) {
  const label = read
    ? intl.formatMessage(messages.markNotificationAsUnread)
    : intl.formatMessage(messages.markNotificationAsRead);
  return (
    <Tooltip content={label} position="left" testId="read-state-tooltip">
      <UnreadIndicatorWrapper
        className="notification-list__unread-indicator-wrapper"
        data-testid={testId ? testId : 'mark-as-read-button'}
        onClick={onToggle}
        aria-pressed={read}
        aria-label={intl.formatMessage(messages.markNotificationAsRead)}
      >
        {!read && <UnreadIndicator data-testid="unread-indicator" />}
      </UnreadIndicatorWrapper>
    </Tooltip>
  );
}

export default injectIntl(ReadStateIndicator);
