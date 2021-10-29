import React, { useState } from 'react';

import debounce from 'debounce-promise';
import { di } from 'react-magnetic-di';

import { ActionMeta, AsyncSelect } from '@atlaskit/select';
import { FormatOptionLabelMeta, GroupType } from '@atlaskit/select/types';
import { TeamDetails, useGetTeams } from '@atlassian/dragonfruit-rest';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  ComponentOption,
  useSearchComponentsAddTeamOwner,
} from '../../../../controllers/components-add-team-owner';

import { ComponentOptionLabel } from './component-option-label';
import messages from './messages';
import {
  NoOptionsMessageDefault,
  NoOptionsMessageError,
} from './no-options-message/main';
import { ComponentColumnLabel, LabelDisplay, OwnerColumnLabel } from './styled';
import { TeamComponentPickerType } from './types';

export const RenderComp = (props: ComponentOption) => {
  di(useGetTeams);

  const ids = props.ownerId ? [props.ownerId] : [];

  const { loading, teams } = useGetTeams(ids);

  const isTeamInfoLoaded =
    props.ownerId &&
    !loading &&
    teams[props.ownerId] &&
    !(teams[props.ownerId] instanceof Error);
  let loadedTeam = null;
  if (isTeamInfoLoaded) {
    loadedTeam = teams[props.ownerId!] as TeamDetails;
  }
  return (
    <ComponentOptionLabel
      option={{
        label: props.label,
        type: props.type,
        isManaged: props.isManaged,
        teamName: loadedTeam?.displayName,
        teamAvatarUrl: loadedTeam?.smallAvatarImageUrl,
      }}
      isOwnerTeamLoaded={!props.ownerId || isTeamInfoLoaded}
    />
  );
};

// Show the rendered option if in the dropdown, just the component name for the selected option
const renderOption = (
  option: ComponentOption,
  { context }: FormatOptionLabelMeta<ComponentOption>,
) => (context === 'value' ? option.label : <RenderComp {...option} />);

const formatGroupLabel = (group: GroupType<ComponentOption>) => (
  <LabelDisplay>
    <ComponentColumnLabel>{group.leftColumnLabel}</ComponentColumnLabel>
    <OwnerColumnLabel>{group.rightColumnLabel}</OwnerColumnLabel>
  </LabelDisplay>
);

export const ComponentSelect = (props: TeamComponentPickerType) => {
  const [
    selectedComponent,
    setSelectedComponent,
  ] = useState<ComponentOption | null>(null);

  const [error, setError] = useState(false);

  const { formatMessage } = useIntl();

  const { ownerId, onChange } = props;

  const DEBOUNCE_TIMER = 300;

  const { search } = useSearchComponentsAddTeamOwner(ownerId);

  const debouncedSearchComponents = debounce(search, DEBOUNCE_TIMER);

  const loadComponentOptions = (inputValue: string) =>
    debouncedSearchComponents(inputValue)
      .then((options) => {
        setError(false);
        return options;
      })
      .catch((error) => setError(true));

  const onOptionChange = (
    selectedOption: ComponentOption,
    meta: ActionMeta<ComponentOption>,
  ) => {
    setSelectedComponent(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };
  return (
    <AsyncSelect<ComponentOption>
      components={{
        // Swap the NoOptionsMessage message based on error vs. truly no options
        NoOptionsMessage: error
          ? NoOptionsMessageError
          : NoOptionsMessageDefault,
      }}
      placeholder={formatMessage(messages.componentSearchPlaceholder)}
      menuPosition="fixed"
      defaultOptions
      isSearchable
      onChange={(newValue, meta) => {
        onOptionChange(newValue as ComponentOption, meta);
      }}
      value={selectedComponent}
      loadOptions={loadComponentOptions}
      onInputChange={loadComponentOptions}
      isOptionDisabled={(option) => option.isManaged}
      classNamePrefix="team-component-picker-select"
      formatOptionLabel={renderOption}
      formatGroupLabel={formatGroupLabel}
    />
  );
};
