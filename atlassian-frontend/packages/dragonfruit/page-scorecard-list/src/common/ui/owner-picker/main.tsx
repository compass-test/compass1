import React, { useCallback } from 'react';

import {
  OnChange,
  OptionIdentifier,
  Value as PickerUserValue,
  SmartUserPicker,
  User as UserPickerUser,
} from '@atlaskit/user-picker';
import { useIntl } from '@atlassian/dragonfruit-utils';

import OwnerPickerMessages from './messages';
import { Wrapper } from './styled';

interface Props {
  testId?: string;
  onChange: (value: UserPickerUser) => void;
  value?: OptionIdentifier;
  cloudId: string;
}

const OwnerPicker: React.FC<Props> = ({ testId, onChange, value, cloudId }) => {
  const { formatMessage } = useIntl();
  const DEBOUNCE_MS = 150;

  //  filters out inactive and bot users
  const CPUS_SEARCH_QUERY_FILTER =
    'account_status:"active" AND (NOT not_mentionable:true) AND (NOT account_type: "app") AND (NOT email_domain:"connect.atlassian.com")';

  const handleOnChange: OnChange = useCallback(
    (value: PickerUserValue) => {
      const selectedUser = (value || null) as UserPickerUser;
      onChange(selectedUser);
    },
    [onChange],
  );
  return (
    <Wrapper data-testid={testId}>
      <SmartUserPicker
        onChange={handleOnChange}
        includeTeams={false}
        // server uses the fieldId to determine which model to utilize when generating suggestions
        fieldId="assignee"
        principalId="Context"
        placeholder={formatMessage(OwnerPickerMessages.placeholderMessage)}
        noOptionsMessage={() => formatMessage(OwnerPickerMessages.noOptions)}
        productKey="compass"
        width="100%"
        siteId={cloudId}
        defaultValue={value}
        debounceTime={DEBOUNCE_MS}
        searchQueryFilter={CPUS_SEARCH_QUERY_FILTER}
      />
    </Wrapper>
  );
};

export default OwnerPicker;
