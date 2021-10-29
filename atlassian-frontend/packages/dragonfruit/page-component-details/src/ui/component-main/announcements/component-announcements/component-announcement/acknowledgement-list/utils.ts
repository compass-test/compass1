import { CompassAnnouncementAcknowledgement } from '@atlassian/dragonfruit-graphql';

/**
 * Returns an object containing two arrays - one containing acknowledgements
 * where `hasAcknowledged` is true, and another where `hasAcknowledged` is false.
 */
export const groupAcknowledgementsByStatus = (
  acknowledgements: CompassAnnouncementAcknowledgement[],
) => {
  const acknowledged: CompassAnnouncementAcknowledgement[] = [];
  const unacknowledged: CompassAnnouncementAcknowledgement[] = [];

  acknowledgements.forEach(
    (acknowledgement: CompassAnnouncementAcknowledgement) => {
      if (acknowledgement.hasAcknowledged) {
        acknowledged.push(acknowledgement);
      } else {
        unacknowledged.push(acknowledgement);
      }
    },
  );

  return {
    acknowledged,
    unacknowledged,
  };
};
