import React, { useCallback, useMemo, useState } from 'react';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  OnChange,
  Value as PickerUserValue,
  SmartUserPicker,
  User as UserPickerUser,
  UserType,
} from '@atlaskit/user-picker';

import { InvitedUser } from '../../types/user';
import { DEBOUNCE_MS, MAX_MEMBERS } from '../../utils/constants';
import { triggerAnalyticsForMemberPickerError } from '../analytics';
import { messages, useIntl } from '../i18n';

import { MemberPickerProps } from './types';
import { CPUS_SEARCH_QUERY_FILTER, ErrorMsg, InfoMsg } from './utils';

const SMART_USER_PICKER_ID = 'AddMemberToTeam';
const LOGGED_IN_USER = 'Context';

export function MemberPicker(
  props: MemberPickerProps & WithAnalyticsEventsProps,
) {
  const {
    onChange,
    maxSelectedMembers = MAX_MEMBERS,
    cloudId,
    initialValues,
    teamId,
    filterUsers,
    createAnalyticsEvent,
    extraAnalyticsAttrs,
  } = props;

  const [hasError, setError] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { intl } = useIntl();

  const handleOnChange: OnChange = useCallback(
    (value: PickerUserValue) => {
      const selectedUsers = (value || []) as UserPickerUser[];

      setDisabled(selectedUsers.length >= maxSelectedMembers);

      const isError = selectedUsers.length > maxSelectedMembers;
      setError(isError);
      if (isError) {
        triggerAnalyticsForMemberPickerError(
          createAnalyticsEvent,
          extraAnalyticsAttrs,
        );
      }

      if (onChange) {
        onChange(selectedUsers, { hasError: isError, isDisabled });
      }
    },
    [
      createAnalyticsEvent,
      isDisabled,
      maxSelectedMembers,
      onChange,
      extraAnalyticsAttrs,
    ],
  );

  const handleOnInputChange = useCallback(
    (query?: string) => {
      setQuery(query || '');
    },
    [setQuery],
  );

  const handleOnBlur = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOnFocus = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  // convert InvitedUser type to (OptionalData | User) type of @atlaskit/user-picker
  const memoizedDefaultValue = useMemo(() => {
    if (!initialValues) {
      return;
    }

    return initialValues.map((user: InvitedUser) => ({
      name: user.fullName,
      publicName: user.nickname,
      type: UserType,
      ...user,
    })) as UserPickerUser[];
  }, [initialValues]);

  const propsWhenHasError = hasError ? { open: false, addMoreMessage: '' } : {};

  return (
    <div>
      <SmartUserPicker
        disableInput={isDisabled}
        onChange={handleOnChange}
        onInputChange={handleOnInputChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        open={isOpen && query.length > 0}
        includeTeams={false}
        fieldId={SMART_USER_PICKER_ID}
        principalId={LOGGED_IN_USER}
        isMulti
        placeholder={intl.formatMessage(messages.userPickerPlaceholder)}
        noOptionsMessage={() => intl.formatMessage(messages.userPickerNoOption)}
        productKey={'people'}
        siteId={cloudId}
        defaultValue={memoizedDefaultValue}
        debounceTime={DEBOUNCE_MS}
        width="100%"
        containerId={teamId || ''}
        searchQueryFilter={CPUS_SEARCH_QUERY_FILTER}
        filterOptions={filterUsers}
        maxOptions={maxSelectedMembers}
        {...propsWhenHasError}
      />

      {hasError ? (
        <ErrorMsg maxNumber={maxSelectedMembers} />
      ) : (
        <InfoMsg maxNumber={maxSelectedMembers} />
      )}
    </div>
  );
}

export default withAnalyticsEvents()(MemberPicker);
