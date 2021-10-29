import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id: 'dragonfruit-csv-import.ui.upload-step.heading',
    defaultMessage: 'Import components from CSV',
    description: 'The title of the upload step in the progress tracker.',
  },
  description: {
    id: 'dragonfruit-csv-import.ui.upload-step.description',
    defaultMessage: 'Select the CSV file you want to import.',
    description: 'Description shown below header for the upload step.',
  },
  downloadExampleCSV: {
    id: 'dragonfruit-csv-import.ui.upload-step.download-example-csv',
    defaultMessage: 'Download example CSV',
    description: 'Link to download example CSV file.',
  },
  backButton: {
    id: 'dragonfruit-csv-import.ui.upload-step.back-button',
    defaultMessage: 'Back',
    description: 'Button text for going back.',
  },
  nextButton: {
    id: 'dragonfruit-csv-import.ui.upload-step.next-button',
    defaultMessage: 'Start Import',
    description: 'Button text for going to the next step.',
  },
});
