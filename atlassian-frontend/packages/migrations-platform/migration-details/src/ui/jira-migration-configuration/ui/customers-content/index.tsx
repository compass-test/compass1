import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { CustomersConfig } from '../../../../common/types';

import messages from './messages';

type Props = {
  customersConfig: CustomersConfig;
};

const getModeMessage = (
  customersConfig: CustomersConfig,
): FormattedMessage.MessageDescriptor => {
  const { mode } = customersConfig;

  if (mode === 'ALL') {
    return messages.allCustomersSelectionTitle;
  } else if (mode === 'REFERENCED') {
    return messages.referencedProjectCustomersSelectionTitle;
  } else {
    return messages.noCustomersSelectionTitle;
  }
};

const CustomersContent: FC<InjectedIntlProps & Props> = ({
  customersConfig,
  intl,
}) => {
  return (
    <>{intl.formatMessage(getModeMessage(customersConfig), { customers: 0 })}</>
  );
};

export default injectIntl(CustomersContent);
