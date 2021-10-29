import React, { useEffect, useReducer } from 'react';

import debounce from 'debounce-promise';

import { AsyncSelect, SelectProps } from '@atlaskit/select';
import { parse as parseAri } from '@atlassian/cs-ari';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { fetchTeam, searchTeams } from '@atlassian/dragonfruit-rest';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import {
  NoOptionsMessageDefault,
  NoOptionsMessageError,
} from './no-options-message';
import { Option } from './option';
import { reducer } from './reducer';
import { getSingleValueError, SingleValue } from './single-value';
import { TeamSelectOption } from './types';

const DEBOUNCE_TIMER = 300;

async function getTeam(teamId: string): Promise<TeamSelectOption> {
  const data = parseAri(teamId);

  if (!data.resourceId) {
    throw new Error(`Failed to parse ARI: ${teamId}`);
  }

  return fetchTeam(data.resourceId).then((response) => ({
    label: response.displayName,
    value: response.id,
    avatarUrl: response.smallAvatarImageUrl,
  }));
}

async function getTeamOptions(
  inputValue: string,
  orgId: string,
): Promise<TeamSelectOption[]> {
  const response = await searchTeams(inputValue, orgId);

  return response.map((team) => ({
    value: team.id,
    label: team.displayName,
    avatarUrl: team.smallAvatarImageUrl,
  }));
}

const debouncedGetTeamOptions = debounce(getTeamOptions, DEBOUNCE_TIMER);

type TeamSelectProps = SelectProps<TeamSelectOption> & {
  defaultTeamId?: string;
  orgId: string;
};

export function TeamSelect(props: TeamSelectProps): JSX.Element {
  const {
    defaultTeamId,
    orgId,
    components,
    placeholder,
    isLoading,
    isDisabled,
    value,
    onChange,
    ...forwardProps
  } = props;

  const { formatMessage } = useIntl();

  const [state, dispatch] = useReducer(reducer, {
    // Initialise in a loading state if there's a defaultTeamId we need to fetch
    isLoading: Boolean(defaultTeamId),
    value: defaultTeamId
      ? { label: formatMessage(CommonMessages.loadingWithEllipsis), value: '' }
      : undefined,
  });

  /**
   * Load the data for the default selected team when this component is mounted.
   */
  useEffect(() => {
    if (defaultTeamId) {
      getTeam(defaultTeamId)
        .then((response) =>
          dispatch({
            type: 'LOAD_DEFAULT_OPTION_SUCCESS',
            payload: response,
          }),
        )
        .catch((error) =>
          dispatch({
            type: 'LOAD_DEFAULT_OPTION_FAILURE',
            payload: error,
          }),
        );
    }
  }, [defaultTeamId]);

  const handleChange: TeamSelectProps['onChange'] = (value, meta) => {
    dispatch({ type: 'ON_VALUE_CHANGE', payload: value });

    // Pass the onChange event back up if the component is being controlled
    if (onChange) {
      onChange(value, meta);
    }
  };

  const loadOptions = (inputValue: string) =>
    debouncedGetTeamOptions(inputValue, orgId)
      .then((options) => {
        dispatch({ type: 'LOAD_OPTIONS_SUCCESS' });
        return options;
      })
      .catch((error) =>
        dispatch({
          type: 'LOAD_OPTIONS_FAILURE',
          payload: error,
        }),
      );

  return (
    <AsyncSelect<TeamSelectOption>
      components={{
        Option,
        // Swap what the selected option looks like based on the error
        ///
        // WARNING - WEIRD QUIRK: The SingleValue component overrides works even
        // if the value=undefined, HOWEVER... It won't display if the value has
        // *only ever been undefined* and wasn't a real value at any point.
        //
        // This should never be an issue because we'd only get an error here if
        // a default value failed to load, and when we have a default value we
        // also initialise the value as { label: "Loading..." }. So in theory
        // this bug will never occur. Just an FYI to those of you in the future
        // though :)
        SingleValue: state.errorLoadingDefault
          ? getSingleValueError(state.errorLoadingDefault)
          : SingleValue,
        // Swap the NoOptionsMessage message based on the error we got
        NoOptionsMessage: state.errorLoadingOptions
          ? NoOptionsMessageError
          : NoOptionsMessageDefault,
        // Allow the consumer to override these components
        ...components,
      }}
      // Performs a query with inputValue = '' to retrieve the initial options
      defaultOptions
      loadOptions={loadOptions}
      isLoading={isLoading || state.isLoading}
      isDisabled={isDisabled || state.isLoading}
      placeholder={placeholder || formatMessage(messages.placeholder)}
      // Take the value being passed in if this component is being controlled
      value={value && !defaultTeamId ? value : state.value}
      onChange={handleChange}
      {...forwardProps}
    />
  );
}
