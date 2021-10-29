import React from 'react';
import EmptyState from '@atlaskit/empty-state';
import { InjectedIntlProps, FormattedMessage, injectIntl } from 'react-intl';
import errorImage from '../../../../view/empty-state/icons/error.svg';
import ContactSupport from '../contact-support';

interface BaseUnknownErrorProps {
  messages: {
    title: FormattedMessage.MessageDescriptor;
    description: FormattedMessage.MessageDescriptor;
  };
}

const BaseUnknownError = ({
  intl: { formatMessage },
  messages,
}: InjectedIntlProps & BaseUnknownErrorProps) => (
  <EmptyState
    imageUrl={errorImage}
    imageWidth={71}
    header={formatMessage(messages.title)}
    description={
      <FormattedMessage
        {...messages.description}
        values={{
          contactSupport: <ContactSupport />,
        }}
      />
    }
  />
);

export default injectIntl(BaseUnknownError);
