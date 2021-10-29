import waitForExpect from 'wait-for-expect';

import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import { ReadState } from '../../../src/common/types';

import { selectors } from './selectors';

/* Url to test the example */
const testUrl = getExampleUrl(
  'notifications',
  'notification-list',
  'integration-test',
);

export class NotificationsListPage extends Page {
  private getHTMLNotificationReadStateButton = async (
    notification: WebdriverIO.Element,
  ) => {
    return notification.$(selectors.readStateToggleButton);
  };
  private getHTMLNotificationReadState = async (
    notification: WebdriverIO.Element,
  ) => {
    const unreadIndicators = await notification.$$(
      selectors.readStateUnreadIndicator,
    );
    return unreadIndicators.length ? ReadState.UNREAD : ReadState.READ;
  };

  openTestURL = async () => {
    await this.setWindowSize(1366, 800);
    await this.goto(testUrl);
  };
  ensureReadStateToggleOff = async () => {
    const checkedToggle = await this.$(
      selectors.filterReadStateDataCheckedTrue,
    );
    const exists = await checkedToggle.isExisting();

    if (exists) {
      await this.changeReadStateFilterView();
    }
  };
  changeReadStateFilterView = async () => {
    const toggle = await this.$(selectors.filterReadStateToggleLabel);
    await toggle.click();
  };
  clickReadStateToggleAtPositions = async (positions: number[]) => {
    const notifications = await this.$$(selectors.notificationListItem);
    const clickOperations = positions.map(async (position) => {
      const readStateButton = await this.getHTMLNotificationReadStateButton(
        notifications[position],
      );
      return readStateButton.click();
    });
    await Promise.all(clickOperations);
  };
  scrollToTop = async () => {
    const header = await this.$(selectors.tabList);
    await header.scrollIntoView();
  };
  scrollToBottom = async () => {
    const notifications = await this.$$(selectors.notificationListItem);
    await notifications[notifications.length - 1].scrollIntoView();
  };
  scrollToLoadMoreZone = async () => {
    const loadMoreWaypoint = await this.$(selectors.loadMoreWaypoint);
    await loadMoreWaypoint.scrollIntoView();
  };
  waitForNItemsLoaded = async (num: number, final = false) => {
    await waitForExpect(async () => {
      const notifications = await this.$$(selectors.notificationListItem);
      expect(notifications.length).toEqual(num);
      if (!final) {
        await this.waitForSelector(selectors.loadMoreWaypoint);
      }
    });
  };
  waitForAtLeastNItemsLoaded = async (num: number, final = false) => {
    await waitForExpect(async () => {
      const notifications = await this.$$(selectors.notificationListItem);
      expect(notifications.length).toBeGreaterThanOrEqual(num);
    });
  };
  waitForLoadEndMark = async () => {
    await this.waitForVisible(selectors.loadEndReached);
  };
  waitForNoNotificationsToShow = async () => {
    await this.waitForVisible(selectors.noNotificationsToShow);
  };
  verifyNotificationsDisplayed = async (
    expectedNotificationStates: [string, ReadState][],
    opts: { comparison: 'contains' | 'strict-equal' } = {
      comparison: 'strict-equal',
    },
  ) => {
    const notifications = await this.$$(selectors.notificationListItem);
    const expectationPromises = notifications.map(async (notification) => {
      const notificationTitle = await (
        await notification.$(selectors.notificationListEntityLink)
      ).getText();
      const notificationReadState = await this.getHTMLNotificationReadState(
        notification,
      );
      return [notificationTitle, notificationReadState];
    });
    const actualNotificationStates = await Promise.all(expectationPromises);
    if (opts.comparison === 'strict-equal') {
      expect(actualNotificationStates).toEqual(expectedNotificationStates);
    } else if (opts.comparison === 'contains') {
      const unmatchedExpectations: [string, ReadState][] = [];
      expectedNotificationStates.forEach(
        ([expectedNotificationTitle, expectedNotificationReadState]) => {
          const exists = actualNotificationStates.some(
            ([title, readState]) =>
              title === expectedNotificationTitle &&
              readState === expectedNotificationReadState,
          );
          if (!exists) {
            unmatchedExpectations.push([
              expectedNotificationTitle,
              expectedNotificationReadState,
            ]);
          }
        },
      );
      expect(unmatchedExpectations).toEqual([]);
    }
  };
  verifyNotificationListDisplayed = async () => {
    expect(await this.isVisible(selectors.notificationListRoot)).toBe(true);
  };
  verifyLoadEndReached = async (reached: boolean) => {
    expect(await this.isExisting(selectors.loadEndReached)).toBe(reached);
  };
  verifyNoNotificationsToShow = async (reached: boolean) => {
    expect(await this.isExisting(selectors.noNotificationsToShow)).toBe(
      reached,
    );
  };
}
