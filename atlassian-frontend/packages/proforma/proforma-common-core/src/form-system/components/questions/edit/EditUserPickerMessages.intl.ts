import { defineMessages } from 'react-intl';

export enum EditUserPickerMessage {
  UserPickerNoMatchesFound = 'UserPickerNoMatchesFound',
  UserPickerStartTyping = 'UserPickerStartTyping',
  UserPickerSelect = 'UserPickerSelect',
  UserPickerLoading = 'UserPickerLoading',
}

export const IntlEditUserPickerMessages = defineMessages({
  [EditUserPickerMessage.UserPickerNoMatchesFound]: {
    id: 'form-system.UserPicker.UserPickerNoMatchesFound',
    defaultMessage: 'No matches found',
  },
  [EditUserPickerMessage.UserPickerStartTyping]: {
    id: 'form-system.UserPicker.UserPickerStartTyping',
    defaultMessage: 'Start typing to search for users',
  },
  [EditUserPickerMessage.UserPickerSelect]: {
    id: 'form-system.UserPicker.UserPickerSelect',
    defaultMessage: 'Select...',
  },
  [EditUserPickerMessage.UserPickerLoading]: {
    id: 'form-system.UserPicker.UserPickerLoading',
    defaultMessage: 'Loading...',
  },
});
