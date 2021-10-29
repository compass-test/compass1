import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Lozenge from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';

import { messages } from './messages';
import { Text } from './styled';

export type Props = {
  done?: number;
  total?: number;
  label: string;
  loadingLabel?: string;
  title?: string;
  testId?: string;
  isLoading?: boolean;
};

const getAppearance = (percent: number) => {
  if (percent === 0) {
    return 'default';
  }
  if (percent === 100) {
    return 'success';
  }
  return 'moved';
};

const wrapWithTitle = (children: JSX.Element, title: string | undefined) => {
  if (title) {
    return <Tooltip content={title}>{children}</Tooltip>;
  }
  return children;
};

const ProgressStatus: FC<Props & InjectedIntlProps> = ({
  intl,
  done = 0,
  total = 0,
  testId,
  label,
  title,
  isLoading = false,
  loadingLabel = '',
}) => {
  // No loading state
  if (!isLoading && !total) {
    return null;
  }

  // Loading State
  if (isLoading) {
    return wrapWithTitle(
      <span data-testid={testId}>
        <Lozenge appearance="default">
          {intl.formatMessage(messages.loading)}
        </Lozenge>{' '}
        <Text>{loadingLabel}</Text>
      </span>,
      title,
    );
  }

  const percent = Math.round((done / total) * 100);
  const text = `${done} ${intl.formatMessage(messages.of)} ${total} ${label}`;
  return wrapWithTitle(
    <span data-testid={testId}>
      <Lozenge appearance={getAppearance(percent)}>
        {percent}% {intl.formatMessage(messages.complete)}
      </Lozenge>{' '}
      <Text>{text}</Text>
    </span>,
    title,
  );
};

export default injectIntl(ProgressStatus);
