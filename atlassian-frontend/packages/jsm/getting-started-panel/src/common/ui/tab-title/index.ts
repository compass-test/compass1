import messages from './messages';
import { ChecklistTabKey } from '../../types';
import { FormattedMessage } from 'react-intl';

const messageMap: {
  [checklistTabKey in ChecklistTabKey]: FormattedMessage.MessageDescriptor;
} = {
  [ChecklistTabKey.Basics]: messages.checklistBasics,
  [ChecklistTabKey.Changes]: messages.checklistChanges,
  [ChecklistTabKey.Incidents]: messages.checklistIncidents,
};

export const getTabTitle = (
  tabKey: ChecklistTabKey,
): FormattedMessage.MessageDescriptor => {
  const message = messageMap[tabKey];
  return message;
};
