import { defineMessages } from 'react-intl';

export default defineMessages({
  removeComponent: {
    id: 'dragonfruit-page-component-list.actions-cell.remove-component',
    defaultMessage: 'Remove component?',
    description: 'Header for a modal to remove a Component',
  },
  deleteComponentDescription: {
    id:
      'dragonfruit-page-component-list.actions-cell.delete-component-description',
    defaultMessage:
      'This will remove the component from Compass, but does not delete it in any other system. All dependency, links and ownership information will be gone for good',
    description: 'Description for the delete component modal',
  },
});
