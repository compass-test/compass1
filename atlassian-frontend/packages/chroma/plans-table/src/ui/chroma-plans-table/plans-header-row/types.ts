import { FormattedMessage } from 'react-intl';

import { Plan } from '../../../common/types';

export type PlanMessages = {
  [key in Plan]: FormattedMessage.MessageDescriptor;
};
