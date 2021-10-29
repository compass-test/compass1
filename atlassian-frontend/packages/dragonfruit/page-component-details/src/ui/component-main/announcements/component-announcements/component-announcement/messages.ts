import { defineMessages } from 'react-intl';

export default defineMessages({
  acknowledgementStatus: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.component-announcements.component-announcement.acknowledgement-status.nonfinal',
    defaultMessage: '{numAcknowledged} of {total} acknowledged',
    description:
      '{numAcknowledged} represents the number of components that have acknowledged. ' +
      '{total} is the total number of components that need to acknowledge. ' +
      'For example, given that 10 components need to acknowledge, and 5 have already acknowledged, ' +
      'the message would be "5 of 10 acknowledged".',
  },
});
