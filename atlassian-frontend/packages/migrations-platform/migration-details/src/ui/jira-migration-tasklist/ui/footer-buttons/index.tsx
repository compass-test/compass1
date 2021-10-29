import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AnalyticsButton } from '@atlassian/mpt-elements';

import { UsersAndGroupsConfig } from '../../../../common/types';

import messages from './messages';

export type Props = {
  usersAndGroupsConfig?: UsersAndGroupsConfig;
  disableNextButton: boolean;
  onNextClick: () => void;
  onBackButtonClick: () => void;
};

export const FooterButtons: FC<Props & InjectedIntlProps> = ({
  intl,
  usersAndGroupsConfig,
  onNextClick,
  onBackButtonClick,
  disableNextButton,
}) => {
  return (
    <>
      <AnalyticsButton
        analyticsId="backButton"
        appearance="subtle"
        onClick={onBackButtonClick}
      >
        {intl.formatMessage(messages.backButton)}
      </AnalyticsButton>
      <AnalyticsButton
        analyticsAttributes={{
          migrateProjectUsers: usersAndGroupsConfig?.mode || '',
          includeRoleActors: !!usersAndGroupsConfig?.includeRoleActors,
          includeUsersInGroups: !!usersAndGroupsConfig?.includeUsersInGroups,
          shouldIncludeMemberships: !!usersAndGroupsConfig?.shouldPreserveMemberships,
        }}
        analyticsId="nextButton"
        appearance="primary"
        onClick={onNextClick}
        testId="buttonCheckForErrors"
        isDisabled={disableNextButton}
      >
        {intl.formatMessage(messages.checkForErrorsButton)}
      </AnalyticsButton>
    </>
  );
};

export default injectIntl(FooterButtons);
