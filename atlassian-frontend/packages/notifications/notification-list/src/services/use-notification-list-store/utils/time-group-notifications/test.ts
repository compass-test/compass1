import addMinutes from 'date-fns/addMinutes';
import subMinutes from 'date-fns/subMinutes';

import { buildConfluenceNotificationWithoutContent } from '../../../../common/mocks/notifications-factory';
import {
  LoadingState,
  ReadState as RenderableReadState,
  TimeGroup,
} from '../../../../common/types';
import { convertToRenderableNotifications } from '../create-renderable-notifications';

import timeGroupNotifications from './index';

describe('timeGroupNotifications', () => {
  /**
   * The date in unit tests is mocked to be Wed Aug 16 00:00:00 2017 +0000,
   * 1502841600 seconds since epoch, or 1502841600000 milliseconds since epoch,
   * the start of the UTC day of the first commit in atlassian-frontend.
   * Therefore, the timestamp for the test notifications will be based around it.
   */
  it('should time group notifications into the correct time slot', () => {
    /**
     * NOTE:
     * Ordering of timestampList matters because the expected result is a slice of the array
     */
    let timestampList = [
      '2017-08-16T00:00:00.000Z',
      '2017-08-16T23:59:59.000Z',
      '2017-08-16T12:00:00.000Z',
      '2017-08-15T00:00:00.000Z',
      '2017-08-15T23:59:59.000Z',
      '2017-08-15T12:00:00.000Z',
      '2017-07-13T00:00:00.000Z',
      '2017-07-13T23:59:59.000Z',
      '2017-07-13T12:00:00.000Z',
    ];

    const renderableNotifications = createRenderableNotificationsHelper(
      timestampList,
    );

    const timeGroupedNotifications = timeGroupNotifications(
      renderableNotifications,
    );

    const expectedTimeGroupedNotifications = [
      {
        timeGroup: TimeGroup.TODAY,
        notifications: renderableNotifications.slice(0, 3),
      },
      {
        timeGroup: TimeGroup.YESTERDAY,
        notifications: renderableNotifications.slice(3, 6),
      },
      {
        timeGroup: TimeGroup.OLDER,
        notifications: renderableNotifications.slice(6, 9),
      },
    ];

    expect(timeGroupedNotifications).toEqual(expectedTimeGroupedNotifications);
  });
});

function createRenderableNotificationsHelper(dateList: string[]) {
  return convertToRenderableNotifications(
    dateList.map((timestamp, index) => {
      return buildConfluenceNotificationWithoutContent({
        id: (index + 1).toString(),

        readState: RenderableReadState.READ,

        timestamp: formatTimezone(new Date(timestamp)).toISOString(),
      });
    }),

    LoadingState.LOADING,
  );
}

function formatTimezone(date: Date): Date {
  const offset = date.getTimezoneOffset();

  /**
   * NOTE:
   * The timezone under which the tests are run will impact the categorisation of the notifications, due to the
   * conversion of UTC time to local time.
   * As a result, 24 hours will be added to test timestamps if the tests are being run in a timezone with a positive offset.
   */
  return Math.sign(offset) === -1 || Math.sign(offset) === 0
    ? addMinutes(date, offset)
    : subMinutes(date, Math.abs(offset) + 24 * 60);
}
