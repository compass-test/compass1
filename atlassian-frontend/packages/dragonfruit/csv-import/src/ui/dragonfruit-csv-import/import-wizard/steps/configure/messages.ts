import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id: 'dragonfruit-csv-import.ui.configure-step.heading',
    defaultMessage: 'Validation',
    description: 'The title of the step in the progress tracker.',
  },
  csvValid: {
    id: 'dragonfruit-csv-import.ui.configure-step.csv-is-valid',
    defaultMessage: 'Great! Your CSV file is valid.',
    description: 'Shown when a CSV file has been confirmed as valid.',
  },
  csvInvalid: {
    id: 'dragonfruit-csv-import.ui.configure-step.csv-is-not-valid',
    defaultMessage:
      'There are some errors in your CSV file. Please fix them and try importing again.',
    description: 'Shown when a CSV file has been confirmed as invalid.',
  },
  backButton: {
    id: 'dragonfruit-csv-import.ui.configure-step.back-button',
    defaultMessage: 'Back',
    description: 'Button text for going back.',
  },
  nextButton: {
    id: 'dragonfruit-csv-import.ui.configure-step.next-button',
    defaultMessage: 'Preview CSV import',
    description: 'Button text for going to the next step.',
  },
});
