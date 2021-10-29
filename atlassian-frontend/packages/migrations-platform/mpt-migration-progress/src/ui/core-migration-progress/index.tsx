import React, { FC, useCallback } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import MigrationProgressMessage, {
  Props as ProgressMessageProps,
} from '../../common/ui/migration-progress-message';

import messages from './messages';

type Status =
  | 'RUNNING'
  | 'INCOMPLETE'
  | 'FAILED'
  | 'COMPLETE'
  | 'SAVED_READY'
  | 'SAVED_PREFLIGHT_ERROR'
  | 'SAVED_INCOMPLETE'
  | 'VALIDATING'
  | 'CHECKING'
  | 'UNKNOWN'
  | 'EXPIRED';
type Props = {
  status: Status;
};

const CoreMigrationProgress: FC<Props & InjectedIntlProps> = ({
  status,
  intl,
}) => {
  const getProgressDetails = useCallback<() => ProgressMessageProps>(() => {
    switch (status) {
      case 'FAILED':
        return {
          status: 'error',
          message: intl.formatMessage(messages.FAILED),
        };
      case 'COMPLETE':
        return {
          status: 'complete',
          message: intl.formatMessage(messages.COMPLETE),
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
      case 'CHECKING':
      case 'VALIDATING':
        return {
          status: 'running',
          message: intl.formatMessage(messages.VALIDATING),
        };
      case 'SAVED_READY':
        return {
          status: 'ready',
          message: intl.formatMessage(messages.READY),
        };
      case 'SAVED_PREFLIGHT_ERROR':
      case 'SAVED_INCOMPLETE':
        return {
          status: 'error-lite',
          message: intl.formatMessage(messages.SOME_CHECKS_FAILED),
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

export default injectIntl(CoreMigrationProgress);
