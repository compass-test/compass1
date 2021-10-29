import { defineMessages } from 'react-intl';

export enum BuilderMessage {
  EmptyBuilderPlaceholder = 'EmptyBuilderPlaceholder',
}

export const IntlBuilderMessages = defineMessages({
  [BuilderMessage.EmptyBuilderPlaceholder]: {
    id: 'form-builder.EmptyBuilderPlaceholder',
    defaultMessage:
      'To help you start building a form you can use the form templates in the right sidebar.',
  },
});
