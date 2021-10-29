import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Tooltip from '@atlaskit/tooltip';

import messages from '../../messages';

import { LoadingRectangle } from './styled';

const LoadingPlaceholder: FC<InjectedIntlProps> = ({ intl }) => {
  return (
    <Tooltip content={intl.formatMessage(messages.loading)}>
      <LoadingRectangle
        role="img"
        aria-label={intl.formatMessage(messages.loading)}
      >
        &nbsp;
      </LoadingRectangle>
    </Tooltip>
  );
};

export default injectIntl(LoadingPlaceholder);
