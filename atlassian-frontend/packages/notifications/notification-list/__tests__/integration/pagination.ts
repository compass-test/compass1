import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { ReadState } from '../../src/common/types';

import { NotificationsListPage } from './_helpers/page-object';

/* Url to test the example */
BrowserTestCase(
  'NotificationList should load and support pagination',
  { skip: ['edge'] },
  async (client: any) => {
    const page = new NotificationsListPage(client);
    await page.openTestURL();
    await page.verifyNotificationListDisplayed();
    await page.ensureReadStateToggleOff(); // Mark sure we show all read states
    await page.verifyLoadEndReached(false);

    await page.waitForNItemsLoaded(8);
    await page.scrollToLoadMoreZone();
    await page.waitForNItemsLoaded(24);
    await page.scrollToLoadMoreZone();
    await page.waitForNItemsLoaded(25, true);
    await page.waitForLoadEndMark();
    await page.verifyNotificationsDisplayed([
      ['Notification 1', ReadState.UNREAD],
      ['Notification 2', ReadState.UNREAD],
      ['Notification 3', ReadState.UNREAD],
      ['Notification 4', ReadState.UNREAD],
      ['Notification 5', ReadState.UNREAD],
      ['Notification 6', ReadState.UNREAD],
      ['Notification 7', ReadState.READ],
      ['Notification 8', ReadState.UNREAD],
      ['Notification 9', ReadState.READ],
      ['Notification 10', ReadState.READ],
      ['Notification 11', ReadState.READ],
      ['Notification 12', ReadState.UNREAD],
      ['Notification 13', ReadState.UNREAD],
      ['Notification 14', ReadState.READ],
      ['Notification 15', ReadState.READ],
      ['Notification 16', ReadState.UNREAD],
      ['Notification 17', ReadState.READ],
      ['Notification 18', ReadState.READ],
      ['Notification 19', ReadState.READ],
      ['Notification 20', ReadState.READ],
      ['Notification 21', ReadState.READ],
      ['Notification 22', ReadState.READ],
      ['Notification 23', ReadState.READ],
      ['Notification 24', ReadState.READ],
      ['Notification 25', ReadState.READ],
    ]);
    await page.verifyLoadEndReached(true);
  },
);
