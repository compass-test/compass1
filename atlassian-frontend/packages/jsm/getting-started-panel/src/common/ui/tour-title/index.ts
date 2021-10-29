import messages from './messages';
import { ProductTourKey } from '../../types';
import { FormattedMessage } from 'react-intl';

const messageMap: {
  [tourId in ProductTourKey]: FormattedMessage.MessageDescriptor;
} = {
  [ProductTourKey.Welcome]: messages.welcomeTour,
  [ProductTourKey.IncidentManagement]: messages.incidentManagementTour,
  [ProductTourKey.ChangeManagement]: messages.changeManagementTour,
};

export const getTourTitle = (
  key: ProductTourKey,
): FormattedMessage.MessageDescriptor => {
  const message = messageMap[key];
  return message;
};
