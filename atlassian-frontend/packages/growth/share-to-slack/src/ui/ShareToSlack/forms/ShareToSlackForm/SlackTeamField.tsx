import React, { useCallback, useMemo } from 'react';

import styled from 'styled-components';

import { ErrorMessage, Field } from '@atlaskit/form';
import AddIcon from '@atlaskit/icon/glyph/add';
import AsyncSelect, { ValueType } from '@atlaskit/select';

import {
  useAddNewTeamOptionClickedEvent,
  useSlackTeamSelectClickedEvent,
  useSlackTeamSelectedEvent,
} from '../../../../common/analytics';
import type { SlackTeam } from '../../../../common/types';
import useFormattedMessage from '../../../../common/useFormattedMessage';

import type Team from './Team';
import validateRequired, { REQUIRED } from './validateRequired';

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionLabelWrapper = styled.span`
  padding: 0 0 0 8px;
`;

type TeamOption = Team & {
  type: 'team';
};

type AddOption = {
  type: 'addTeam';
};

const ADD_TEAM_OPTION: AddOption = { type: 'addTeam' };

function teamToOption(team: SlackTeam): TeamOption {
  return {
    type: 'team',
    value: team.id,
    label: team.name,
    avatarUrl: team.avatar,
  };
}

type Option = TeamOption | AddOption;

type Props = {
  canShare: boolean;
  teams?: SlackTeam[];
  selectedTeam?: SlackTeam;
  onChangeSelectedTeam: (team: SlackTeam) => void;
  onAddTeam: () => void;
};

const SlackTeamField = React.forwardRef(
  (
    { canShare, teams, selectedTeam, onChangeSelectedTeam, onAddTeam }: Props,
    ref: any,
  ) => {
    const teamPlaceholder = useFormattedMessage('teamPlaceholder');
    const addNewTeamOption = useFormattedMessage('addNewTeamOption');
    const teamRequiredError = useFormattedMessage('teamRequired');
    const formatOptionLabel = useCallback(
      (option: Option) =>
        option.type === 'team' ? (
          <OptionWrapper>
            <img src={option.avatarUrl} width="20" height="20" alt="" />
            <OptionLabelWrapper>{option.label}</OptionLabelWrapper>
          </OptionWrapper>
        ) : (
          <OptionWrapper>
            <AddIcon label="" size="small" />
            <OptionLabelWrapper>{addNewTeamOption}</OptionLabelWrapper>
          </OptionWrapper>
        ),
      [addNewTeamOption],
    );

    // Convert teams to select options
    const teamOptions = useMemo(
      () => [...(teams?.map(teamToOption) ?? []), ADD_TEAM_OPTION],
      [teams],
    );

    const value = useMemo(
      () => (selectedTeam ? teamToOption(selectedTeam) : undefined),
      [selectedTeam],
    );

    // Analytics
    const fireTeamSelectOpenedEvent = useSlackTeamSelectClickedEvent();
    const fireTeamSelectedEvent = useSlackTeamSelectedEvent();
    const fireAddTeamClickedEvent = useAddNewTeamOptionClickedEvent();

    return (
      <Field<ValueType<Option>>
        name="team"
        isRequired
        validate={validateRequired}
        defaultValue={value}
      >
        {({ fieldProps, meta, error }) => (
          <div data-testid="share-to-slack-teams">
            <AsyncSelect<Option>
              {...fieldProps}
              ref={ref}
              onMenuOpen={fireTeamSelectOpenedEvent}
              formatOptionLabel={formatOptionLabel}
              maxMenuHeight={200}
              placeholder={teamPlaceholder}
              spacing="compact"
              options={teamOptions}
              isDisabled={!canShare}
              value={value}
              onChange={(newValue: ValueType<Option>) => {
                fieldProps.onChange(newValue);

                if (newValue && !Array.isArray(newValue)) {
                  const value = newValue as TeamOption | AddOption;

                  if (value.type === 'team') {
                    fireTeamSelectedEvent();
                    onChangeSelectedTeam({
                      id: value.value,
                      name: value.label,
                      avatar: value.avatarUrl,
                    });
                  } else if (value.type === 'addTeam') {
                    fireAddTeamClickedEvent();
                    onAddTeam();
                  }
                }
              }}
            />
            {!meta.valid && error === REQUIRED && (
              <ErrorMessage>{teamRequiredError}</ErrorMessage>
            )}
          </div>
        )}
      </Field>
    );
  },
);

SlackTeamField.displayName = 'SlackTeamField';

export default SlackTeamField;
