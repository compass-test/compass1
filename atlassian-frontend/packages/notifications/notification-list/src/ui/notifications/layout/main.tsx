/* TODO: (from codemod) We have added an "id" prop to "Tabs" for accessibility reasons.
The codemod has added a random ID but you can add one that makes sense for your use case. */
/* TODO: (from codemod) This file uses onSelect and this prop has been changed names to onChange.

The type of onChange has also changed from
(selected: TabData, selectedIndex: number, analyticsEvent: UIAnalyticsEvent) => void;
to
(index: number, analyticsEvent: UIAnalyticsEvent) => void;

The logic around selecting tabs has changed internally and there is no longer the concept of TabData.
Tabs is now composable and the tabs prop has been removed.

The codemod has changed your usage of onSelect to be one of onChange. We are using the tabs
array and the selected index to pass the "selected tab" to your old onSelect function. This is
functional but you may like to update your usage of tabs to fit with the new API.

If you are using the selected prop you will need to ensure that you are passing in the index
of the selected tab as it also doesn't accept TabData anymore. */
import React, { ReactNode, useState } from 'react';

import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';
import { Waypoint } from 'react-waypoint';

import Tabs, { Tab, TabList, useTabPanel } from '@atlaskit/tabs';
import { TabData } from '@atlaskit/tabs/types';

import { RequestCategory } from '../../../common/types';
import messages from '../../../common/utils/i18n/messages';
import { useNotificationsController } from '../../../controllers/notifications';

import Header from './header';
import LoadMoreWaypoint from './load-more-waypoint';
import NotificationList from './notification-list';
import { TabWrapper, WaypointWrapper, Wrapper } from './styled';
import { NotificationListProps } from './types';

interface IntlProps {
  intl: InjectedIntl;
}

function NotificationsLayout({
  testId,
  intl,
}: NotificationListProps & IntlProps) {
  const [headerWaypointHidden, setHeaderWaypointHidden] = useState(false);
  const [groupingHeader, setGroupingHeader] = useState<
    FormattedMessage.MessageDescriptor
  >(messages.timeGroupingToday);

  const updateGroupingHeaders = (
    message: FormattedMessage.MessageDescriptor,
  ): void => {
    setGroupingHeader(message);
  };

  const tabData = [
    {
      label: intl.formatMessage(messages.direct),
      category: RequestCategory.DIRECT,
      content: (
        <NotificationList
          key="category-direct"
          updateGroupingHeaders={updateGroupingHeaders}
        />
      ),
    },
    {
      label: intl.formatMessage(messages.watching),
      category: RequestCategory.NONE,
      content: (
        <NotificationList
          key="category-none"
          updateGroupingHeaders={updateGroupingHeaders}
        />
      ),
    },
  ];

  const {
    setCategoryFilter,
    toggleReadStateFilter,
    filter: { readStateFilter, requestCategory },
  } = useNotificationsController();
  const selectedTab = requestCategory === RequestCategory.DIRECT ? 0 : 1;
  const handleTabSelect = (selected: TabData): void => {
    setCategoryFilter(selected.category);
  };

  return (
    <Wrapper
      data-testid={testId}
      role="dialog"
      aria-labelledby="notification-list-header-label"
    >
      <Header
        toggleReadStateFilter={toggleReadStateFilter}
        readStateFilter={readStateFilter}
        requestCategory={requestCategory}
        groupingHeader={intl.formatMessage(groupingHeader)}
        isSticky={headerWaypointHidden}
      />
      {/* Show the sticky header if scrolled and header waypoint hidden */}
      <Waypoint
        onEnter={() => setHeaderWaypointHidden(false)}
        onLeave={() => setHeaderWaypointHidden(true)}
      />
      <TabWrapper>
        <Tabs
          onChange={(index) => {
            const selectedTab = tabData[index];
            handleTabSelect(selectedTab);
          }}
          selected={selectedTab}
          id="1wvhohfusvxqah2l3vkx8e"
          testId="category-filter-tab"
          shouldUnmountTabPanelOnChange
        >
          <TabList>
            {tabData.map((tab, index) => (
              <Tab testId={`${testId}-${tab.label}`} key={index}>
                {tab.label}
              </Tab>
            ))}
          </TabList>
          {tabData.map((tab, index) => (
            <NoFocusTabPanel key={index}>{tab.content}</NoFocusTabPanel>
          ))}
        </Tabs>
      </TabWrapper>
      <WaypointWrapper>
        <LoadMoreWaypoint />
      </WaypointWrapper>
    </Wrapper>
  );
}

/**
 * Overrides default TabPanel from @atlaskit/tabs and sets tabIndex = -1
 * Notifications are already focusable so the panel does not need focus.
 */
function NoFocusTabPanel({ children }: { children: ReactNode }) {
  const tabPanelAttributes = useTabPanel();

  return (
    <div {...tabPanelAttributes} tabIndex={-1}>
      {children}
    </div>
  );
}

export default injectIntl(NotificationsLayout);
