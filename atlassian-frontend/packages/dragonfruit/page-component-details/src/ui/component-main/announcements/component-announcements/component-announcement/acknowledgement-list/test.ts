import { CompassAnnouncementAcknowledgement } from '@atlassian/dragonfruit-graphql';

import { groupAcknowledgementsByStatus } from './utils';

const MOCK_ACKNOWLEDGED: CompassAnnouncementAcknowledgement = {
  __typename: 'CompassAnnouncementAcknowledgement',
  hasAcknowledged: true,
};

const MOCK_UNACKNOWLEDGED: CompassAnnouncementAcknowledgement = {
  __typename: 'CompassAnnouncementAcknowledgement',
  hasAcknowledged: false,
};

describe('groupAcknowledgementsByStatus', () => {
  describe('when there are no acknowledgements', () => {
    it('should group return empty arrays', () => {
      const acknowledgements: CompassAnnouncementAcknowledgement[] = [];
      const { unacknowledged, acknowledged } = groupAcknowledgementsByStatus(
        acknowledgements,
      );

      expect(unacknowledged.length).toBe(0);
      expect(acknowledged.length).toBe(0);
    });
  });

  describe('when all acknowledgements are acknowledged', () => {
    it('should group acknowledgements by acknowledgement status', () => {
      const acknowledgements: CompassAnnouncementAcknowledgement[] = [
        MOCK_ACKNOWLEDGED,
        MOCK_ACKNOWLEDGED,
      ];
      const { unacknowledged, acknowledged } = groupAcknowledgementsByStatus(
        acknowledgements,
      );

      expect(unacknowledged.length).toBe(0);
      expect(acknowledged.length).toBe(2);
    });
  });

  describe('when all acknowledgements are unacknowledged', () => {
    it('should group acknowledgements by acknowledgement status', () => {
      const acknowledgements: CompassAnnouncementAcknowledgement[] = [
        MOCK_UNACKNOWLEDGED,
        MOCK_UNACKNOWLEDGED,
      ];
      const { unacknowledged, acknowledged } = groupAcknowledgementsByStatus(
        acknowledgements,
      );

      expect(unacknowledged.length).toBe(2);
      expect(acknowledged.length).toBe(0);
    });
  });

  describe('when some acknowledgements are acknowledged and some are not', () => {
    it('should group acknowledgements by acknowledgement status', () => {
      const acknowledgements: CompassAnnouncementAcknowledgement[] = [
        MOCK_ACKNOWLEDGED,
        MOCK_UNACKNOWLEDGED,
      ];
      const { unacknowledged, acknowledged } = groupAcknowledgementsByStatus(
        acknowledgements,
      );

      expect(unacknowledged.length).toBe(1);
      expect(acknowledged.length).toBe(1);
    });
  });
});
