import { defineMessages } from 'react-intl';

export enum DataConnectionsMessage {
  IdLabel = 'IdLabel',
  LabelLabel = 'LabelLabel',
  TypeOptionRestApiLabel = 'TypeOptionRestApiLabel',
}

export const IntlDataConnectionsMessages = defineMessages({
  [DataConnectionsMessage.IdLabel]: {
    id: 'ui-admin.AdminConnections.IdLabel',
    defaultMessage: 'ID',
  },
  [DataConnectionsMessage.LabelLabel]: {
    id: 'ui-admin.AdminConnections.LabelLabel',
    defaultMessage: 'Label',
  },
  [DataConnectionsMessage.TypeOptionRestApiLabel]: {
    id: 'ui-admin.AdminConnections.TypeOptionRestApiLabel',
    defaultMessage: 'REST API',
  },
});
