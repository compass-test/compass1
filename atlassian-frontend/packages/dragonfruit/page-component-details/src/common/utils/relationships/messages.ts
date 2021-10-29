import { defineMessages } from 'react-intl';

export default defineMessages({
  componentNotFound: {
    id:
      'dragonfruit-page-component-details.common.relationships.component-not-found',
    defaultMessage:
      'The component you are trying to edit could not be found. It may have been removed.',
    description:
      'An error message for when the component being edited cannot be found',
  },
  errorCreatingRelationshipFlagDescription: {
    id:
      'dragonfruit-page-component-details.common.relationships.error-creating-flag-description',
    defaultMessage:
      'An error occurred while creating your dependency. Try adding the dependency again.',
    description:
      'Shown when an error occurs during the creation of a Relationship between two Components',
  },
  errorCreatingRelationshipFlagTitle: {
    id:
      'dragonfruit-page-component-details.common.relationships.error-creating-flag-title',
    defaultMessage: 'Error creating component dependency',
    description:
      'Shown when an error occurs during the creation of a Relationship between two Components',
  },
  relationshipAlreadyExistsError: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-already-exists-error',
    defaultMessage: 'Dependency already exists',
    description:
      'Shown when a user attempts to add a relationship that already exists',
  },
  relationshipAlreadyExistsErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-already-exists-error-flag-description',
    defaultMessage:
      'This dependency already exists. Refresh your page to see the latest changes.',
    description:
      'Shown in an error flag when a user attempts to add a relationship that already exists',
  },
  relationshipEndNodeDoesNotExistErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-end-node-does-not-exist-error-flag-description',
    defaultMessage:
      "The component you selected as a dependency doesn't exist. It may have been removed. Try again with an existing component.",
    description:
      'Shown in an error flag when a user attempts to add a relationship with a component that does not exist',
  },
  relationshipLimitReachedError: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-limit-reached-error',
    defaultMessage: 'Dependency limit reached',
    description:
      'Shown when a user attempts to add a relationship when the relationship limit has already been reached',
  },
  relationshipLimitReachedErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-limit-reached-error-flag-description',
    defaultMessage:
      'Dependency limit reached. The maximum number of dependencies a component can have is {limit}.',
    description:
      'Shown in an error flag when a user attempts to add a relationship between a component and itself',
  },
  relationshipStartNodeDoesNotExistErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-start-node-does-not-exist-error-flag-description',
    defaultMessage:
      'The component you are trying to create a dependency for does not exist. It may have been removed.',
    description:
      'Shown in an error flag when a user attempts to add a relationship for a component that does not exist',
  },
  relationshipSelfReferencingError: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-self-referencing-error',
    defaultMessage: `A component can't be dependent on itself, select another component.`,
    description:
      'Shown when a user attempts to add a relationship between a component and itself',
  },
  relationshipSelfReferencingErrorFlagDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.add-relationship-form.relationship-self-referencing-error-flag-description',
    defaultMessage: `The component can't be dependent on itself. Select another component to create a dependency.`,
    description:
      'Shown in an error flag when a user attempts to add a relationship between a component and itself',
  },
});
