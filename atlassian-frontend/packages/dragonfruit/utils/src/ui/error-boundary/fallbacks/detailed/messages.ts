import { defineMessages } from 'react-intl';

export default defineMessages({
  unexpectedError: {
    id: 'dragonfruit-utils.error-boundary.detailed.unexpected-error',
    defaultMessage:
      'Unexpected error occurred. {clickHereLink} to reload the page',
    description: 'Message shown when an error occurs',
  },
  clickHere: {
    id: 'dragonfruit-utils.error-boundary.detailed.click-here',
    defaultMessage: 'Click here',
    description: 'A link that the user can click',
  },
  showDetails: {
    id: 'dragonfruit-utils.error-boundary.detailed.show-details',
    defaultMessage: 'Show details',
    description: 'Shown on a button that shows details',
  },
  hideDetails: {
    id: 'dragonfruit-utils.error-boundary.detailed.hide-details',
    defaultMessage: 'Hide details',
    description: 'Shown on a button that hides details',
  },
  seeBrowserConsole: {
    id: 'dragonfruit-utils.error-boundary.detailed.see-browser-console',
    defaultMessage: 'See browser console for the full error.',
    description: 'Shown when an error occurs',
  },
});
