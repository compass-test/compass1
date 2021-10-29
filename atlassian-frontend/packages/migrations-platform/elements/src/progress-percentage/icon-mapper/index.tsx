import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Spinner from '@atlaskit/spinner';
import { G300, R300, Y300 } from '@atlaskit/theme/colors';

import type { Status } from '../../common/types';
import { messages } from '../messages';

type Props = {
  status: Status;
} & InjectedIntlProps;

const IconMapper: FC<Props> = ({ status, intl }) => {
  switch (status) {
    case 'RUNNING':
      return (
        <span role="img" aria-label={intl.formatMessage(messages.running)}>
          <Spinner />
        </span>
      );
    case 'COMPLETE':
      return (
        <CheckCircleIcon
          primaryColor={G300}
          label={intl.formatMessage(messages.complete)}
        />
      );
    case 'INCOMPLETE':
      return (
        <WarningIcon
          primaryColor={Y300}
          label={intl.formatMessage(messages.incomplete)}
        />
      );
    case 'FAILED':
      return (
        <ErrorIcon
          primaryColor={R300}
          label={intl.formatMessage(messages.failed)}
        />
      );
    case 'TIMED_OUT':
      return (
        <ErrorIcon
          primaryColor={R300}
          label={intl.formatMessage(messages.timed_out)}
        />
      );
    case 'READY':
    default:
      return null;
  }
};

export default injectIntl(IconMapper);
