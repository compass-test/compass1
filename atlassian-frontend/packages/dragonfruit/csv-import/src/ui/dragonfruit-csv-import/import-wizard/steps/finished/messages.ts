import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id: 'dragonfruit-csv-import.ui.finished-step.heading',
    defaultMessage: 'Your file is now imported to Compass',
    description: 'The title of the finished step in the progress tracker.',
  },
  description: {
    id: 'dragonfruit-csv-import.ui.finished-step.description',
    defaultMessage:
      '{componentsImported, plural, =0 {No components} one {# component} other {# components}} imported to Compass',
    description: 'Description shown when file has finished being imported.',
  },
  componentsCreated: {
    id: 'dragonfruit-csv-import.ui.finished-step.components-created',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} created',
    description: 'Message shown with count of components created.',
  },
  componentsUpdated: {
    id: 'dragonfruit-csv-import.ui.finished-step.components-updated',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} updated',
    description: 'Message shown with count of components updated.',
  },
  componentsSkipped: {
    id: 'dragonfruit-csv-import.ui.finished-step.components-skipped',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} skipped',
    description: 'Message shown with count of components that were skipped.',
  },
  componentsFailed: {
    id: 'dragonfruit-csv-import.ui.finished-step.components-failed',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} failed',
    description:
      'Message shown with count of components that failed to be imported.',
  },
  downloadImportLogs: {
    id: 'dragonfruit-csv-import.ui.finished-step.download-import-logs',
    defaultMessage: 'Download import logs',
    description: 'Button text to download import logs.',
  },
  backButton: {
    id: 'dragonfruit-csv-import.ui.finished-step.back-button',
    defaultMessage: 'Back',
    description: 'Button text for going back.',
  },
});
