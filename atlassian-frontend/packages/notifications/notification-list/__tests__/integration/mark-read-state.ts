import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { ReadState } from '../../src/common/types';

import { NotificationsListPage } from './_helpers/page-object';

BrowserTestCase(
  'NotificationList should support marking notifications as read / unread',
  {
    skip: ['edge'],
  },
  async (client: any) => {
    const page = new NotificationsListPage(client);
    await page.openTestURL();
    await page.ensureReadStateToggleOff(); // Mark sure we show all read states
    await page.waitForNItemsLoaded(8);
    await page.verifyNotificationsDisplayed([
      ['Notification 1', ReadState.UNREAD],
      ['Notification 2', ReadState.UNREAD],
      ['Notification 3', ReadState.UNREAD],
      ['Notification 4', ReadState.UNREAD],
      ['Notification 5', ReadState.UNREAD],
      ['Notification 6', ReadState.UNREAD],
      ['Notification 7', ReadState.READ],
      ['Notification 8', ReadState.UNREAD],
    ]);

    await page.scrollToTop();
    // Go to direct -> unread only
    await page.changeReadStateFilterView();
    await page.waitForAtLeastNItemsLoaded(1, true);
    await page.scrollToBottom();
    await page.waitForAtLeastNItemsLoaded(10, true);
    await page.scrollToTop();

    await page.verifyNotificationsDisplayed([
      ['Notification 1', ReadState.UNREAD],
      ['Notification 2', ReadState.UNREAD],
      ['Notification 3', ReadState.UNREAD],
      ['Notification 4', ReadState.UNREAD],
      ['Notification 5', ReadState.UNREAD],
      ['Notification 6', ReadState.UNREAD],
      ['Notification 8', ReadState.UNREAD],
      ['Notification 12', ReadState.UNREAD],
      ['Notification 13', ReadState.UNREAD],
      ['Notification 16', ReadState.UNREAD],
    ]);

    // Go to direct -> any read state
    await page.changeReadStateFilterView();
    await page.scrollToBottom();
    await page.waitForAtLeastNItemsLoaded(16);
    await page.clickReadStateToggleAtPositions([6]);
    await page.verifyNotificationsDisplayed(
      [
        ['Notification 1', ReadState.UNREAD],
        ['Notification 2', ReadState.UNREAD],
        ['Notification 3', ReadState.UNREAD],
        ['Notification 4', ReadState.UNREAD],
        ['Notification 5', ReadState.UNREAD],
        ['Notification 6', ReadState.UNREAD],
        ['Notification 7', ReadState.UNREAD],
        ['Notification 8', ReadState.UNREAD],
        ['Notification 9', ReadState.READ],
        ['Notification 10', ReadState.READ],
        ['Notification 11', ReadState.READ],
        ['Notification 12', ReadState.UNREAD],
        ['Notification 13', ReadState.UNREAD],
        ['Notification 14', ReadState.READ],
        ['Notification 15', ReadState.READ],
        ['Notification 16', ReadState.UNREAD],
      ],
      { comparison: 'contains' },
    );

    // Go to direct -> unread only
    await page.scrollToTop();
    await page.changeReadStateFilterView();
    await page.verifyNotificationsDisplayed([
      ['Notification 1', ReadState.UNREAD],
      ['Notification 2', ReadState.UNREAD],
      ['Notification 3', ReadState.UNREAD],
      ['Notification 4', ReadState.UNREAD],
      ['Notification 5', ReadState.UNREAD],
      ['Notification 6', ReadState.UNREAD],
      ['Notification 7', ReadState.UNREAD], // <<< Recently marked as unread
      ['Notification 8', ReadState.UNREAD],
      ['Notification 12', ReadState.UNREAD],
      ['Notification 13', ReadState.UNREAD],
      ['Notification 16', ReadState.UNREAD],
    ]);
    await page.clickReadStateToggleAtPositions([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);
    await page.scrollToTop();
    await page.waitForNoNotificationsToShow();
    await page.verifyNotificationsDisplayed([]);

    // Go to direct - any read state
    await page.changeReadStateFilterView();
    await page.verifyNotificationsDisplayed(
      [
        ['Notification 1', ReadState.READ],
        ['Notification 2', ReadState.READ],
        ['Notification 3', ReadState.READ],
        ['Notification 4', ReadState.READ],
        ['Notification 5', ReadState.READ],
        ['Notification 6', ReadState.READ],
        ['Notification 7', ReadState.READ],
        ['Notification 8', ReadState.READ],
        ['Notification 9', ReadState.READ],
        ['Notification 10', ReadState.READ],
        ['Notification 11', ReadState.READ],
        ['Notification 12', ReadState.READ],
        ['Notification 13', ReadState.READ],
        ['Notification 14', ReadState.READ],
        ['Notification 15', ReadState.READ],
        ['Notification 16', ReadState.READ],
      ],
      { comparison: 'contains' },
    );
  },
);
