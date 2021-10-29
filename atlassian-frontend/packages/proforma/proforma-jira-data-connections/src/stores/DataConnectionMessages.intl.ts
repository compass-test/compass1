import { defineMessages } from 'react-intl';

export enum DataConnectionMessage {
  InvalidUrl = 'InvalidUrl',
}

export const IntlDataConnectionMessages = defineMessages({
  [DataConnectionMessage.InvalidUrl]: {
    id: 'ui-common.Connection.InvalidUrl',
    defaultMessage: 'URL must begin with http:// or https://',
  },
});
