import React, { FC, useCallback } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import MigrationProgressMessage, {
  Props as ProgressMessageProps,
} from '../../common/ui/migration-progress-message';

import messages from './messages';

type Status =
  | 'UNKNOWN'
  | 'RUNNING'
  | 'INCOMPLETE'
  | 'FAILED'
  | 'READY'
  | 'COMPLETE'
  | 'EXPIRED'
  | 'SAVED_PREFLIGHT_ERROR';
type Props = {
  status: Status;
};

const AppMigrationProgress: FC<Props & InjectedIntlProps> = ({
  status,
  intl,
}) => {
  const getProgressDetails = useCallback<() => ProgressMessageProps>(() => {
    switch (status) {
      case 'FAILED':
        return {
          status: 'error',
          message: intl.formatMessage(messages.FAILED),
          tooltip: intl.formatMessage(messages.FAILED_TOOLTIP),
        };
      case 'COMPLETE':
        return {
          status: 'complete',
          message: intl.formatMessage(messages.COMPLETE),
        };
      case 'READY':
        return {
          status: 'ready',
          message: intl.formatMessage(messages.READY),
          tooltip: intl.formatMessage(messages.READY_TOOLTIP),
        };
      case 'INCOMPLETE':
        return {
          status: 'warning',
          message: intl.formatMessage(messages.INCOMPLETE),
        };
      case 'RUNNING':
        return {
          status: 'running',
          message: intl.formatMessage(messages.RUNNING),
        };
      case 'SAVED_PREFLIGHT_ERROR':
        return {
          status: 'error-lite',
          message: intl.formatMessage(messages.SAVED_PREFLIGHT_ERROR),
        };
      case 'EXPIRED':
        return {
          status: 'disabled',
          message: intl.formatMessage(messages.EXPIRED),
        };
      case 'UNKNOWN':
      default:
        return {
          status: 'error-lite',
          message: intl.formatMessage(messages.UNKNOWN_STATUS),
        };
    }
  }, [status, intl]);

  const progressDetails = getProgressDetails();

  return (
    <MigrationProgressMessage
      status={progressDetails.status}
      tooltip={progressDetails.tooltip}
      message={progressDetails.message}
    />
  );
};

export default injectIntl(AppMigrationProgress);
