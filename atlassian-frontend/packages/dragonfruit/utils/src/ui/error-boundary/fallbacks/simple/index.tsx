import React from 'react';

import { InjectedIntl, injectIntl } from 'react-intl';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

import {
  ErrorBoundaryOptions,
  FallbackComponent,
} from '../../../../common/types/error-boundary';

import messages from './messages';
import { ErrorIconWrapper, Wrapper } from './styled';

export const SimpleErrorFallback: FallbackComponent<any> = injectIntl(
  ({
    intl,
    errorBoundaryOptions,
  }: {
    intl: InjectedIntl;
    errorBoundaryOptions: ErrorBoundaryOptions<any>;
  }) => {
    const { formatMessage } = intl;

    const message = getMessage(errorBoundaryOptions, intl);

    return (
      <Wrapper>
        <ErrorIconWrapper>
          <ErrorIcon label={formatMessage(CommonMessages.error)} />
        </ErrorIconWrapper>
        {message}
      </Wrapper>
    );
  },
);

const getMessage = (
  errorBoundaryOptions: ErrorBoundaryOptions<any>,
  intl: InjectedIntl,
) => {
  let componentName;
  if ('componentName' in errorBoundaryOptions) {
    componentName = errorBoundaryOptions.componentName;
  }

  if (componentName) {
    return intl.formatMessage(messages.errorIn, {
      location: componentName,
    });
  } else {
    return intl.formatMessage(CommonMessages.error);
  }
};
