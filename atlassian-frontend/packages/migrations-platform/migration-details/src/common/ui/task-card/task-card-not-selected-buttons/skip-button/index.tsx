import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AnalyticsButton } from '@atlassian/mpt-elements';

import messages from './messages';

export type Props = {
  taskName: string;
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  // Skip button text override. This defaults to using the taskName
  text?: string;
};

const SkipButton: FC<InjectedIntlProps & Props> = ({
  taskName,
  onClick,
  isDisabled,
  isLoading,
  intl,
  text,
}) => {
  return (
    <AnalyticsButton
      analyticsId="migrationTaskSkipButton"
      testId="buttonSkip"
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {text ||
        intl.formatMessage(messages.skipButton, {
          lowerCaseTaskName: taskName.toLowerCase(),
        })}
    </AnalyticsButton>
  );
};

export default injectIntl(SkipButton);
