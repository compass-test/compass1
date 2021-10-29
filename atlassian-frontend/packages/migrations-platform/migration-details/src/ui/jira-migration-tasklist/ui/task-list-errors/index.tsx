import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import SectionMessage from '@atlaskit/section-message';

import { ErrorMessageWrapper } from './styled';

export type ErrorData = {
  hasError: boolean;
  errorTitle?: FormattedMessage.MessageDescriptor;
  errorDescription?: FormattedMessage.MessageDescriptor;
};

export type Props = {
  errorData: ErrorData;
};

const TaskListErrors: FC<Props & InjectedIntlProps> = ({ errorData, intl }) => {
  return errorData.hasError &&
    errorData.errorTitle &&
    errorData.errorDescription ? (
    <ErrorMessageWrapper>
      <SectionMessage
        title={intl.formatMessage(errorData.errorTitle)}
        appearance="error"
      >
        <p>{intl.formatMessage(errorData.errorDescription)}</p>
      </SectionMessage>
    </ErrorMessageWrapper>
  ) : null;
};

export default injectIntl(TaskListErrors);
