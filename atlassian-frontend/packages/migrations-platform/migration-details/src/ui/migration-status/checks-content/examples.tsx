import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';

import { CurrentChecksStatus } from '../../../common/types';

import ChecksContent from './index';

type Props = {
  checksStatus: CurrentChecksStatus;
  onViewChecks: () => void;
};

export const ChecksContentBasic = () => {
  return (
    <IntlProvider locale="en">
      <ChecksContent checksStatus="Running" onViewChecks={() => undefined} />
    </IntlProvider>
  );
};

export const ChecksContentSuccess = () => {
  return (
    <ChecksContentBasicWithProps
      checksStatus="Success"
      onViewChecks={() => undefined}
    />
  );
};

export const ChecksContentWarnings: FC<{ onViewChecks: () => void }> = ({
  onViewChecks,
}) => {
  return (
    <ChecksContentBasicWithProps
      checksStatus="Warning"
      onViewChecks={onViewChecks}
    />
  );
};

export const ChecksContentError = () => {
  return (
    <ChecksContentBasicWithProps
      checksStatus="Error"
      onViewChecks={() => undefined}
    />
  );
};

export const ChecksContentBlockingExecutionError = () => {
  return (
    <ChecksContentBasicWithProps
      checksStatus="BlockingExecutionError"
      onViewChecks={() => undefined}
    />
  );
};

export const ChecksContentExecutionError = () => {
  return (
    <ChecksContentBasicWithProps
      checksStatus="ExecutionError"
      onViewChecks={() => undefined}
    />
  );
};

const ChecksContentBasicWithProps: FC<Props> = ({
  checksStatus,
  onViewChecks = () => undefined,
}) => {
  return (
    <IntlProvider locale="en">
      <ChecksContent checksStatus={checksStatus} onViewChecks={onViewChecks} />
    </IntlProvider>
  );
};
