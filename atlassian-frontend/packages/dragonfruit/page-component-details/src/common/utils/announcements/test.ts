import { CompassAnnouncement } from '@atlassian/dragonfruit-graphql';

import {
  filterAndSortPastAnnouncements,
  filterAndSortUpcomingAnnouncements,
} from './main';

type Announcement = Pick<CompassAnnouncement, 'targetDate'>;

describe('filterAndSortUpcomingAnnouncements', () => {
  describe('when there are no announcements', () => {
    it('should return empty array', () => {
      const announcements: Announcement[] = [];

      const results: Announcement[] = filterAndSortUpcomingAnnouncements(
        announcements,
      );

      expect(results.length).toBe(0);
    });
  });

  describe('when there are announcements', () => {
    it('should return only upcoming announcements sorted by ascending target date', () => {
      const announcements: Announcement[] = [
        {
          targetDate: new Date(1990, 1, 1),
        },
        {
          targetDate: new Date(3020, 1, 1),
        },
        {
          targetDate: new Date(3021, 1, 1),
        },
      ];

      const results: Announcement[] = filterAndSortUpcomingAnnouncements(
        announcements,
      );

      expect(results.length).toBe(2);
      expect(results[0].targetDate).toStrictEqual(new Date(3020, 1, 1));
      expect(results[1].targetDate).toStrictEqual(new Date(3021, 1, 1));
    });
  });

  describe('when there is an announcement with a target date of today', () => {
    it('should return the announcement', () => {
      const announcements: Announcement[] = [
        {
          targetDate: new Date(),
        },
      ];

      const results: Announcement[] = filterAndSortUpcomingAnnouncements(
        announcements,
      );

      expect(results.length).toBe(1);
    });
  });
});

describe('filterAndSortPastAnnouncements', () => {
  describe('when there are no announcements', () => {
    it('should return empty array', () => {
      const announcements: Announcement[] = [];

      const results: Announcement[] = filterAndSortPastAnnouncements(
        announcements,
      );

      expect(results.length).toBe(0);
    });
  });

  describe('when there are announcements', () => {
    it('should return only past announcements sorted by descending target date', () => {
      const announcements: Announcement[] = [
        {
          targetDate: new Date(2015, 1, 1),
        },
        {
          targetDate: new Date(2151, 1, 1),
        },
        {
          targetDate: new Date(1990, 1, 1),
        },
      ];

      const results: Announcement[] = filterAndSortPastAnnouncements(
        announcements,
      );

      expect(results.length).toBe(2);
      expect(results[0].targetDate).toStrictEqual(new Date(2015, 1, 1));
      expect(results[1].targetDate).toStrictEqual(new Date(1990, 1, 1));
    });
  });

  describe('when there is an announcement with a target date of today', () => {
    it('should not return the announcement', () => {
      const announcements: Announcement[] = [
        {
          targetDate: new Date(),
        },
      ];

      const results: Announcement[] = filterAndSortPastAnnouncements(
        announcements,
      );

      expect(results.length).toBe(0);
    });
  });
});
