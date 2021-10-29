import React from 'react';

import { FormattedMessage } from 'react-intl';

import { ErrorMessage, HelperMessage } from '@atlaskit/form';

import { MAX_MEMBERS } from '../../utils/constants';
import { messages } from '../i18n';

// Filter out inactive users AND bot accounts
export const CPUS_SEARCH_QUERY_FILTER =
  'account_status:"active" AND (NOT not_mentionable:true) AND (NOT account_type: "app") AND (NOT email_domain:"connect.atlassian.com")';

export function InfoMsg(props: { maxNumber: number }) {
  const { maxNumber = MAX_MEMBERS } = props;

  return (
    <HelperMessage>
      <FormattedMessage
        {...messages.limitedUsersInvitationMessageInfo}
        values={{
          maxNumber,
        }}
      />
    </HelperMessage>
  );
}

export function ErrorMsg(props: { maxNumber: number }) {
  const { maxNumber = MAX_MEMBERS } = props;

  return (
    <ErrorMessage>
      <FormattedMessage
        {...messages.limitedUsersInvitationMessageError}
        values={{
          maxNumber,
        }}
      />
    </ErrorMessage>
  );
}
