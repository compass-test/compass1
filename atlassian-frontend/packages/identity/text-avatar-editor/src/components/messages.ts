import { defineMessages } from 'react-intl';

const messages = defineMessages({
  text: {
    id: 'text-avatar-editor.text-label-nonfinal',
    defaultMessage: 'Initials',
    description:
      'The label on a field allowing the user to decide what text will be shown in their profile picture. This defaults to their initials',
  },
  update: {
    id: 'text-avatar-editor.update-label',
    defaultMessage: 'Update',
    description: 'A button with the word "Update" on it',
  },
  cancel: {
    id: 'text-avatar-editor.cancel-label',
    defaultMessage: 'Cancel',
    description: 'A button with the word "Cancel" on it',
  },
  backgroundColor: {
    id: 'text-avatar-editor.color-label-nonfinal',
    defaultMessage: 'Background color',
    description:
      'The label on a field allowing the user to decide what color should be in the background of their profile picture',
  },
  modalTitle: {
    id: 'text-avatar-editor.modal-title',
    defaultMessage: 'Edit initials',
    description: 'The heading that appears on top of the modal component',
  },
  editVisibilityLink: {
    id: 'text-avatar-editor.visibility.action',
    defaultMessage: 'Manage your profile visibility',
    description:
      'A link taking users to their profile settings so they can manage who has permission to view their profile picture',
  },
  placeholderText: {
    id: 'text-avatar-editor.text-input-placeholder',
    defaultMessage:
      'Enter up to {maxInitialLength} {maxInitialLength, plural, one {initial} other {initials}}',
    description:
      'Placeholder text inside the input field explaining that the user may enter up to {maxInitialLength} characters representing their initials',
  },
  emptyTextError: {
    id: 'text-avatar-editor.empty-text-error',
    defaultMessage: 'Please enter at least 1 initial',
    description:
      'The error shown when a user tries to submit the form before entering there initials in the textbox',
  },
  visibility: {
    id: 'text-avatar-editor.visibility-warning',
    defaultMessage:
      'This replaces your current profile picture. Only users who have permission to view your profile picture will see this. {editVisibilityLink}',
    description: 'A message explaining who will be able to see this image',
  },
  blueColor: {
    id: 'text-avatar-editor.color.palette.blue',
    defaultMessage: 'Blue',
    description: 'The internationalisation supported  color name',
  },
  tealColor: {
    id: 'text-avatar-editor.color.palette.teal',
    defaultMessage: 'Teal',
    description: 'The internationalisation supported  color name',
  },
  greenColor: {
    id: 'text-avatar-editor.color.palette.green',
    defaultMessage: 'Green',
    description: 'The internationalisation supported  color name',
  },
  yellowColor: {
    id: 'text-avatar-editor.color.palette.yellow',
    defaultMessage: 'Yellow',
    description: 'The internationalisation supported  color name',
  },
  redColor: {
    id: 'text-avatar-editor.color.palette.red',
    defaultMessage: 'Red',
    description: 'The internationalisation supported  color name',
  },
  purpleColor: {
    id: 'text-avatar-editor.color.palette.purple',
    defaultMessage: 'Purple',
    description: 'The internationalisation supported  color name',
  },
  darkgrayColor: {
    id: 'text-avatar-editor.color.palette.darkgray',
    defaultMessage: 'Dark gray',
    description: 'The internationalisation supported color name',
  },
});

export default messages;
