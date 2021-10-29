import { defineMessages } from 'react-intl';

export default defineMessages({
  applyScorecardToComponentButtonText: {
    id:
      'dragonfruit-page-component-details.header-dropdown.apply-scorecard-to-component-button-text',
    defaultMessage: 'Apply scorecard',
    description: 'The text for apply scorecard to component button.',
  },
  copyComponentIdButtonText: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.copy-component-id-button-text',
    defaultMessage: 'Copy ID',
    description: 'The text for the copy component id button.',
  },
  compassYmlLinkText: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.compass-yml-link-text',
    defaultMessage: 'Edit in compass.yml',
    description:
      'Link back to the external compass.yml file that manages this component.',
  },
  componentNotFound: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.component-not-found',
    defaultMessage:
      'The component you are trying to remove could not be found. It may have been removed already.',
    description:
      'Error message shown when a user tries to remove a component that cannot be found',
  },
  removeComponentButtonText: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.remove-component-button-text',
    defaultMessage: 'Remove from Compass',
    description: 'The text for the remove component button.',
  },
  removeComponentErrorFlagTitle: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.remove-component-error-flag-title',
    defaultMessage: 'Error removing component',
    description:
      'Title for the error flag that displays when removing a component is unsuccessful',
  },
  removeComponentErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.remove-component-error-flag-description',
    defaultMessage:
      "<b>{componentName}</b> couldn't be removed. Try removing the component again.",
    description:
      'Description for the error flag that displays when removing a component is unsuccessful',
  },
  removeComponentDeleteModalTitle: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.remove-component-delete-modal-title',
    defaultMessage: 'Are you sure you want to remove this component?',
    description:
      'Title for the delete modal that displays when removing a component',
  },
  removeComponentDeleteModalDescription: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.remove-component-delete-modal-description',
    defaultMessage:
      'This will remove <b>{componentName}</b> from Compass, but does not delete it in any other system. All dependencies, links, and ownership information will be permanently deleted.',
    description:
      'Description for the delete modal that displays when removing a component',
  },
  copyIdFlagSuccessTitle: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.flags.copy-id-flag-success-title',
    defaultMessage: 'ID copied!',
    description:
      'The text for the success flag when we successfully copied the component id to clipboard.',
  },
  copyIdFlagFailureDescription: {
    id:
      'dragonfruit-page-component-details.right-panel-contents.header-dropdown.flags.copy-id-flag-failure-description',
    defaultMessage: "ID couldn't be copied. Try again.",
    description:
      'The text for the error flag when we failed to copy the component id to clipboard.',
  },
});
