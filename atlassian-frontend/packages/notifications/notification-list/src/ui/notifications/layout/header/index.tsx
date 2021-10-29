import React, { useContext } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import { h300, h400, h700 } from '@atlaskit/theme/typography';
import Toggle from '@atlaskit/toggle';

import { RequestCategory, RequestReadState } from '../../../../common/types';
import { NotificationsStoreContext } from '../../../../common/ui/notifications-context';
import {
  triggerMarkAllReadButtonClicked,
  useCreateFireAnalyticsFromTrigger,
} from '../../../../common/utils/analytics';
import messages from '../../../../common/utils/i18n/messages';

import {
  GroupingText,
  HeaderText,
  HeaderWrapper,
  MarkAsReadWrapper,
  StickyHeader,
  StickyHeaderText,
  ToggleText,
} from './styled';
import { resolveCategoryMessage } from './utils';

type HeaderProps = {
  groupingHeader?: string;
  readStateFilter: RequestReadState;
  requestCategory: RequestCategory;
  isSticky: boolean;
  toggleReadStateFilter: () => void;
};

export default function Header({
  readStateFilter,
  requestCategory,
  toggleReadStateFilter,
  groupingHeader = 'Today',
  isSticky,
}: HeaderProps) {
  const {
    state: { isMarkAllAsReadVisible, markAllNotificationsRead },
  } = useContext(NotificationsStoreContext);

  const fireTriggerMarkAllRead = useCreateFireAnalyticsFromTrigger(
    triggerMarkAllReadButtonClicked,
  );
  const handleOnMarkAllClick = () => {
    markAllNotificationsRead();
    fireTriggerMarkAllRead();
  };

  return (
    <>
      {isSticky ? (
        <StickyHeader>
          <GroupingText mixin={h300}> {groupingHeader} </GroupingText>
          <StickyHeaderText mixin={h400}>
            <FormattedMessage {...resolveCategoryMessage(requestCategory)} />
          </StickyHeaderText>
          <MarkAsReadWrapper>
            {isMarkAllAsReadVisible ? (
              <Button appearance="subtle-link" onClick={handleOnMarkAllClick}>
                <FormattedMessage {...messages.markAllAsRead} />
              </Button>
            ) : (
              // Render content so the notification text stays centered
              <span></span>
            )}
          </MarkAsReadWrapper>
        </StickyHeader>
      ) : (
        <HeaderWrapper>
          <HeaderText mixin={h700} id="notification-list-header-label">
            <FormattedMessage {...messages.notifications} />
          </HeaderText>
          <ToggleText htmlFor={'mark-as-read-toggle'}>
            <FormattedMessage {...messages.onlyShowUnread} />
          </ToggleText>
          <Toggle
            id="mark-as-read-toggle"
            testId="read-state-toggle"
            onChange={toggleReadStateFilter}
            isChecked={readStateFilter === RequestReadState.UNREAD}
          />
        </HeaderWrapper>
      )}
    </>
  );
}
