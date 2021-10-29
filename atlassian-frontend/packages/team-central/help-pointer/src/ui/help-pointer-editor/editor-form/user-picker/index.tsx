import React, { useState } from 'react';

import { OptionData, SmartUserPicker, Team } from '@atlaskit/user-picker';
import { Value } from '@atlaskit/user-picker/types';

import { UserPickerStyledDiv } from './styled';

export const NEW_TEAM_ID = 'new_help_team_option';

type Props = {
  initialTeamId?: string;
  selectedTeam?: Team;
  setSelectedTeam: (team?: Team) => void;
  cloudId: string;
  workspaceUuid: string;
};

const removeSelectedOptions = (selectedIds?: string[]) => (
  options?: OptionData[],
) => (options ?? []).filter((option) => selectedIds?.indexOf(option.id) === -1);

const HelpPointerTeamPicker = (props: Props) => {
  const [isOpen, setisOpen] = useState(false);

  const filterOptions = (options: OptionData[], query: string) => {
    let filteredOptions = removeSelectedOptions([props.selectedTeam?.id || ''])(
      options,
    );
    if (query.trim()) {
      filteredOptions = filteredOptions.slice(0, 9);
      filteredOptions.push({
        id: NEW_TEAM_ID,
        name: query.trim(),
        type: 'team',
        includesYou: true,
        lozenge: {
          text: 'Create new team',
          appearance: 'new',
        },
      } as Team);
    }
    return filteredOptions;
  };

  const onFocus = () => {
    setisOpen(true);
  };

  const onBlur = () => {
    setisOpen(false);
  };

  const onClear = () => {
    props.setSelectedTeam(undefined);
  };

  return (
    <UserPickerStyledDiv>
      <SmartUserPicker
        onSelection={(optionData: Value) => {
          if (optionData && 'id' in optionData) {
            props.setSelectedTeam({
              id: optionData.id,
              name: optionData.name,
              avatarUrl: optionData?.avatarUrl || undefined,
              type: 'team',
              lozenge: optionData.lozenge,
            });
          }
        }}
        open={isOpen}
        onFocus={onFocus}
        onBlur={onBlur}
        onClear={onClear}
        value={props.selectedTeam || null}
        isMulti={false}
        includeUsers={false}
        includeTeams={true}
        siteId={props.cloudId!}
        productKey="people"
        debounceTime={400}
        fieldId="helpPointerTeam"
        maxOptions={10}
        placeholder="Search teams"
        filterOptions={filterOptions}
        containerId={props.workspaceUuid}
        width={'100%'}
      />
    </UserPickerStyledDiv>
  );
};

export default HelpPointerTeamPicker;
