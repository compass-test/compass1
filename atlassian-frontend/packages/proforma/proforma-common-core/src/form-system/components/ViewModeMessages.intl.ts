import { defineMessages } from 'react-intl';

export enum ViewModeMessage {
  ViewModeView = 'ViewModeView',
  ViewModeFull = 'ViewModeFull',
  ViewModeEdit = 'ViewModeEdit',
  ViewModePreview = 'ViewModePreview',
}

export const IntlViewModeMessages = defineMessages({
  [ViewModeMessage.ViewModeView]: {
    id: 'form-system.viewMode.ViewModeView',
    defaultMessage: 'Viewing Form',
  },
  [ViewModeMessage.ViewModeFull]: {
    id: 'form-system.viewMode.ViewModeFull',
    defaultMessage: 'Viewing FULL Form',
  },
  [ViewModeMessage.ViewModeEdit]: {
    id: 'form-system.viewMode.ViewModeEdit',
    defaultMessage: 'Editing Form',
  },
  [ViewModeMessage.ViewModePreview]: {
    id: 'form-system.viewMode.ViewModePreview',
    defaultMessage: 'Previewing Form',
  },
});
