import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import type { Status } from '../common/types';

import Icon from './icon-mapper';
import { messages } from './messages';
import { Message, Wrapper } from './styled';

type Props = {
  status: Status;
  progress: number;
} & InjectedIntlProps;

const ProgressPercentage: FC<Props> = ({ status, progress, intl }) => (
  <Wrapper>
    <Icon status={status} />
    <Message>
      {status === 'READY' ? intl.formatMessage(messages.ready) : `${progress}%`}
    </Message>
  </Wrapper>
);

export default injectIntl(ProgressPercentage);
