import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Lozenge from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';

import commonMessages from '../../messages';

import messages from './messages';
import { Text } from './styled';

type Props = {
  done: number;
  total: number;
  label: string;
  isLoading?: boolean;
  loadingLabel?: string;
  title?: string;
};

const getAppearance = (percent: number) => {
  if (percent === 0) {
    return 'default';
  }
  if (percent === 1) {
    return 'success';
  }
  return 'moved';
};

const ProgressStatus: FC<InjectedIntlProps & Props> = ({
  done,
  total,
  label,
  isLoading = false,
  loadingLabel = '',
  title,
  intl,
}) => {
  // Loading
  if (isLoading) {
    return (
      <span>
        <Lozenge testId="lozenge">
          {intl.formatMessage(commonMessages.loading)}
        </Lozenge>
        {loadingLabel && <Text>{loadingLabel}</Text>}
      </span>
    );
  }

  // Infinity
  if (total === 0) {
    return null;
  }

  // Normal
  const percentNumber = done / total;
  const percent = intl.formatNumber(percentNumber, { style: 'percent' });
  const lozengeText = intl.formatMessage(messages.complete, { percent });
  const text = intl.formatMessage(messages.label, { done, total, unit: label });
  const element = (
    <span>
      <Lozenge appearance={getAppearance(percentNumber)} testId="lozenge">
        {lozengeText}
      </Lozenge>
      <Text>{text}</Text>
    </span>
  );

  // Normal with title
  if (title) {
    return (
      <Tooltip content={title} testId="tooltip">
        {element}
      </Tooltip>
    );
  }

  // Normal without title
  return element;
};

export default injectIntl(ProgressStatus);
