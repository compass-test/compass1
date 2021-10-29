import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AnalyticsButton } from '@atlassian/mpt-elements';

import messages from './messages';

export type Props = {
  onClick: () => void;
};

const EditButton: FC<InjectedIntlProps & Props> = ({ onClick, intl }) => {
  return (
    <AnalyticsButton
      analyticsId="migrationTaskEditButton"
      testId="buttonEdit"
      onClick={onClick}
    >
      {intl.formatMessage(messages.editButton)}
    </AnalyticsButton>
  );
};

export default injectIntl(EditButton);
