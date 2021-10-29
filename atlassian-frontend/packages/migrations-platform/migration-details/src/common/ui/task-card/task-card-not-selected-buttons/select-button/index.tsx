import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AnalyticsButton } from '@atlassian/mpt-elements';

import messages from './messages';

export type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
};

const SelectButton: FC<InjectedIntlProps & Props> = ({
  onClick,
  isDisabled,
  isLoading,
  intl,
}) => {
  return (
    <AnalyticsButton
      appearance="primary"
      analyticsId="migrationTaskSelectButton"
      testId="buttonSelect"
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {intl.formatMessage(messages.selectButton)}
    </AnalyticsButton>
  );
};

export default injectIntl(SelectButton);
