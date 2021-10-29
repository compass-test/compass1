import React, { FC, useCallback } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Lozenge from '@atlaskit/lozenge';

import { messages } from './messages';

type Status =
  | 'READY'
  | 'RUNNING'
  | 'CHECKING'
  | 'FAILED'
  | 'INCOMPLETE'
  | 'COMPLETE'
  | 'ARCHIVED'
  | 'QUEUED'
  | 'EXPIRED'
  | 'SAVED'
  | 'SAVED_READY'
  | 'UNKNOWN'
  | 'STOPPED'
  | 'STOPPING'
  | 'TIMED_OUT';

type Props = {
  status: Status;
};

const StatusLozenge: FC<Props & InjectedIntlProps> = ({ status, intl }) => {
  const getLozengeStatus = useCallback(
    status => {
      switch (status) {
        case 'SAVED_READY':
        case 'SAVED': {
          return {
            appearance: 'default' as const,
            children: intl.formatMessage(messages.SAVED),
          };
        }
        case 'READY':
          return {
            appearance: 'default' as const,
            children: intl.formatMessage(messages.READY),
          };
        case 'RUNNING':
          return {
            appearance: 'inprogress' as const,
            children: intl.formatMessage(messages.RUNNING),
          };
        case 'FINISHED':
        case 'COMPLETE':
          return {
            appearance: 'success' as const,
            children: intl.formatMessage(messages.COMPLETE),
          };

        case 'INCOMPLETE':
          return {
            appearance: 'moved' as const,
            children: intl.formatMessage(messages.INCOMPLETE),
          };

        case 'FAILED':
          return {
            appearance: 'removed' as const,
            children: intl.formatMessage(messages.FAILED),
          };
        case 'CHECKING':
          return {
            appearance: 'inprogress' as const,
            children: intl.formatMessage(messages.CHECKING),
          };
        case 'QUEUED':
          return {
            appearance: 'default' as const,
            children: intl.formatMessage(messages.QUEUED),
          };
        case 'EXPIRED':
          return {
            appearance: 'default' as const,
            children: intl.formatMessage(messages.EXPIRED),
          };
        case 'ARCHIVED':
          return {
            appearance: 'default' as const,
            children: intl.formatMessage(messages.ARCHIVED),
            isBold: true,
          };
        case 'STOPPING':
          return {
            appearance: 'moved' as const,
            children: intl.formatMessage(messages.STOPPING),
          };
        case 'STOPPED':
          return {
            appearance: 'moved' as const,
            children: intl.formatMessage(messages.STOPPED),
          };
        case 'TIMED_OUT':
          return {
            appearance: 'removed' as const,
            children: intl.formatMessage(messages.TIMED_OUT),
          };
        default: {
          return {
            appearance: 'default' as const,
            children: intl.formatMessage(messages.UNKNOWN),
          };
        }
      }
    },
    [intl],
  );
  const lozengeStatus = getLozengeStatus(status);
  return (
    <Lozenge
      appearance={lozengeStatus.appearance}
      isBold={lozengeStatus.isBold}
    >
      {lozengeStatus.children}
    </Lozenge>
  );
};

export default injectIntl(StatusLozenge);
