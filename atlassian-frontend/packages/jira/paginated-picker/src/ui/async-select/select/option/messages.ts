import { defineMessages } from 'react-intl';

export default defineMessages({
  errorMessage: {
    id: 'paginated-picker.async-select.select.option.error-message',
    defaultMessage: "Couldn't retrieve data",
    description: 'The text for when an error occurs when loading options',
  },
  retryMessage: {
    id: 'paginated-picker.async-select.select.option.retry-message',
    defaultMessage: 'Click to retry',
    description: 'The text for button to reload options',
  },
});
