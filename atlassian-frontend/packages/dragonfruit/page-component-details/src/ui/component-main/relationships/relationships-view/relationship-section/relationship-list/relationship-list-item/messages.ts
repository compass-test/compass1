import { defineMessages } from 'react-intl';

export default defineMessages({
  componentNotFound: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.component-not-found',
    defaultMessage:
      'The component you are trying to edit could not be found. It may have been removed.',
    description:
      'An error message for when the component being edited cannot be found',
  },
  errorDeletingDependencyFlagTitle: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.error-deleting-dependency',
    defaultMessage: 'Error deleting component dependency',
    description:
      'Title of the error flag shown when an error occurs during the deletion of a relationship between two components',
  },
  errorDeletingDependencyFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.error-deleting-relationship',
    defaultMessage:
      'An error occurred while deleting this dependency. Try deleting the dependency again.',
    description:
      'Shown when an error occurs during the deletion of a Relationship between two Components',
  },
  errorDeletingRelationshipNotFound: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.error-deleting-relationship-not-found',
    defaultMessage:
      'The dependency you are trying to remove could not be found. It may have been removed already.',
    description:
      'Shown when an error occurs when a user is trying to remove a relationship that cannot be found',
  },
  deleteRelationshipWithComponent: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.deleteRelationshipWithComponent',
    defaultMessage: 'Delete relationship with {componentName}',
    description:
      'Used for an aria-label to describe a button that deletes a relationship with a specific component',
  },
  removeDependencyTitle: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.remove-dependency-title',
    defaultMessage: 'Remove dependency?',
    description:
      'Shown in the title of a modal when a user is attempting to remove a dependency.',
  },
  removeDependencyDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationship-list-item.remove-dependency-description',
    defaultMessage:
      'The dependency between this component and <b>{componentName}</b> will no longer exist. You can add the dependency again if you ever need to.',
    description:
      'Shown in the description of a modal when a user is attempting to remove a dependency.',
  },
});
