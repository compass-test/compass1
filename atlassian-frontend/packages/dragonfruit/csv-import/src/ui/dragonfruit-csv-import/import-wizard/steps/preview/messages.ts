import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id: 'dragonfruit-csv-import.ui.preview-step.heading',
    defaultMessage: 'Preview changes',
    description: 'The title of the preview step in the progress tracker.',
  },
  descriptionLoading: {
    id: 'dragonfruit-csv-import.ui.preview-step.description-loading',
    defaultMessage: 'Generating preview...',
    description: 'Description shown while generating the preview.',
  },
  description: {
    id: 'dragonfruit-csv-import.ui.preview-step.description-loaded',
    defaultMessage: 'The following changes will be made',
    description: 'Description shown after preview has been generated.',
  },
  componentsToCreate: {
    id: 'dragonfruit-csv-import.ui.preview-step.components-to-create',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} from the CSV will be created',
    description: 'Message shown with count of components to create.',
  },
  componentsToUpdate: {
    id: 'dragonfruit-csv-import.ui.preview-step.components-to-update',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} from the CSV will be updated',
    description: 'Message shown with count of components to update.',
  },
  componentsUnchanged: {
    id: 'dragonfruit-csv-import.ui.preview-step.components-unchanged',
    defaultMessage:
      '{count, plural, =0 {components} one {component} other {components}} from the CSV will be unchanged',
    description:
      'Message shown alongside count in case any components from CSV will be applied or imported.',
  },
  backButton: {
    id: 'dragonfruit-csv-import.ui.preview-step.back-button',
    defaultMessage: 'Back',
    description: 'Button text for going back.',
  },
  nextButton: {
    id: 'dragonfruit-csv-import.ui.preview-step.next-button',
    defaultMessage: 'Start Import',
    description: 'Button text for going to the next step.',
  },
});
