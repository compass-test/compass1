import { FormattedMessage } from 'react-intl';

import { ProductFamilyKey } from '../../../common/types';

export type StatusMessages = {
  title: FormattedMessage.MessageDescriptor;
  description?: FormattedMessage.MessageDescriptor;
  cloudDestination?: Record<
    ProductFamilyKey,
    FormattedMessage.MessageDescriptor
  >;
};
