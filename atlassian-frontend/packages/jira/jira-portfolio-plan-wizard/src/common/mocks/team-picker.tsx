import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import Avatar from '@atlaskit/avatar';
import Select, { components, OptionProps, OptionType } from '@atlaskit/select';

import type { TeamPickerProps } from '../../index';
import type { Team } from '../types';

import { teams as mockTeams } from './teams';

const LabelContainer = styled.div`
  display: flex;
  align-items: center;

  & > img {
    border-radius: 3px;
    margin-right: 8px;
  }
`;

const OptionComponent = (props: OptionProps) => (
  <components.Option {...props}>
    <LabelContainer>
      {props.data.icon}
      {props.data.label}
    </LabelContainer>
  </components.Option>
);

export const TeamPicker: React.FC<TeamPickerProps> = ({
  isDisabled,
  id,
  getTeamsFilter,
  onChange,
  selectedTeamId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const fetchTeams = useCallback(
    async (search: string) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTeams([...mockTeams]);
      }, 500);
    },
    [setLoading],
  );

  const teamsOptions: OptionType[] = (teams || []).map((team) => ({
    label: team.title,
    value: team.id,
    icon: (
      <div>
        <Avatar src={team.avatarUrl} />
      </div>
    ),
  }));

  const selectedOption: OptionType | null =
    teamsOptions.find((t) => t.value === selectedTeamId) || null;

  const handleChange = (selectedOption: OptionType | null) => {
    const team = teams.find((t) => t.id === selectedOption?.value);
    onChange(team);
  };

  const handleInputChange = (input: string, { action }: { action: string }) => {
    if (action !== 'input-change') {
      return;
    }
    fetchTeams(input);
  };

  const handleClose = () => {
    fetchTeams('');
  };

  useEffect(() => {
    fetchTeams('');
  }, [fetchTeams]);

  return (
    <Select
      id={id}
      isLoading={loading}
      loadingMessage={() => 'Loading...'}
      options={teamsOptions}
      value={selectedOption}
      onChange={handleChange}
      onMenuClose={handleClose}
      isClearable
      isDisabled={isDisabled}
      placeholder="Choose a Team"
      onInputChange={handleInputChange}
      components={{ Option: OptionComponent }}
      backspaceRemovesValue
      filterOption={getTeamsFilter}
    />
  );
};
