import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id: 'dragonfruit-csv-import.ui.import-step.heading',
    defaultMessage: 'Importing CSV file...',
    description: 'The title of the importing step in the progress tracker.',
  },
  description: {
    id: 'dragonfruit-csv-import.ui.import-step.description',
    defaultMessage:
      '{numImportsCompleted} out of {numTotalImports} components imported',
    description: 'Description shown while importing components.',
  },
  logTextFieldHeading: {
    id: 'dragonfruit-csv-import.ui.import-step.log-text-field-heading',
    defaultMessage: 'Import logs',
    description: 'Heading for the logs text area.',
  },
});
