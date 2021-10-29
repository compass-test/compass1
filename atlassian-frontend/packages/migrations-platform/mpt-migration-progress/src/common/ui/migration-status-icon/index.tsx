import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { Size } from '@atlaskit/icon/types';
import Spinner from '@atlaskit/spinner';
import { G300, N70, R300, Y300 } from '@atlaskit/theme/colors';

import messages from './messages';

type Props = {
  status:
    | 'ready'
    | 'warning'
    | 'error-lite'
    | 'error'
    | 'complete'
    | 'running'
    | 'disabled';
  size?: Size;
};

const MigrationStatusIcon: FC<Props & InjectedIntlProps> = ({
  status,
  size = 'medium',
  intl,
}) => {
  switch (status) {
    case 'ready':
      return (
        <CheckCircleIcon
          label={intl.formatMessage(messages.READY_LABEL)}
          size={size}
        />
      );
    case 'complete':
      return (
        <CheckCircleIcon
          label={intl.formatMessage(messages.COMPLETE_LABEL)}
          primaryColor={G300}
          size={size}
        />
      );
    case 'error':
      return (
        <ErrorIcon
          label={intl.formatMessage(messages.ERROR_LABEL)}
          primaryColor={R300}
          size={size}
        />
      );
    case 'error-lite':
      return (
        <ErrorIcon
          label={intl.formatMessage(messages.ERROR_LITE_LABEL)}
          size={size}
        />
      );
    case 'warning':
      return (
        <EditorWarningIcon
          label={intl.formatMessage(messages.WARNING_LABEL)}
          primaryColor={Y300}
          size={size}
        />
      );
    case 'running':
      return <Spinner size={size} />;
    case 'disabled':
      return (
        <CheckCircleIcon
          label={intl.formatMessage(messages.DISABLED_LABEL)}
          primaryColor={N70}
          size={size}
        />
      );
  }
};

export default injectIntl(MigrationStatusIcon);
