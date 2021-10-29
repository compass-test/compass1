import { defineMessages } from 'react-intl';

export default defineMessages({
  announcementTargetDate: {
    id: 'dragonfruit-components.announcement-item.target-date.nonfinal',
    defaultMessage: '{timeFromTargetDate}, on {fullTargetDate}',
    description:
      'Specifies when the announcement applies. ' +
      '{fullTargetDate} is the full date string (e.g. January 1, 2022). ' +
      '{timeFromTargetDate} is the amount of time until (or since) the {fullTargetDate} (e.g. "6 days until", "2 months ago", etc.).' +
      'A complete example in English would be "2 days ago, on September 6, 2021".',
  },
  today: {
    id: 'dragonfruit-components.announcement-item.today.nonfinal',
    defaultMessage: 'Today',
    description: 'Today',
  },
});
