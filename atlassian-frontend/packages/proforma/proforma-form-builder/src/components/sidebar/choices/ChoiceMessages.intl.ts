import { defineMessages } from 'react-intl';

export enum ChoiceMessage {
  LabelPlaceholder = 'LabelPlaceholder',
  NoChoicesToDisplay = 'NoChoicesToDisplay',
  NoneLabel = 'NoneLabel',
  NoOptionsMsg = 'NoOptionsMsg',
}

export const IntlChoiceMessages = defineMessages({
  [ChoiceMessage.LabelPlaceholder]: {
    id: 'form-builder.Choice.LabelPlaceholder',
    defaultMessage: 'Choice label',
  },
  [ChoiceMessage.NoChoicesToDisplay]: {
    id: 'form-builder.Choice.NoChoicesToDisplay',
    defaultMessage: 'No choices are available for the linked field.',
  },
  [ChoiceMessage.NoneLabel]: {
    id: 'form-builder.Choice.NoneLabel',
    defaultMessage: 'None',
  },
  [ChoiceMessage.NoOptionsMsg]: {
    id: 'form-builder.Choice.NoOptionsMsg',
    defaultMessage: 'No options',
  },
});
