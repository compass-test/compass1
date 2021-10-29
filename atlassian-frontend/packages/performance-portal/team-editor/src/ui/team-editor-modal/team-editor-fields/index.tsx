import React, {
  Dispatch,
  FocusEvent,
  SetStateAction,
  useCallback,
} from 'react';

import { Field, ValidMessage } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';

import { TeamType } from '../../../types';

type Props = {
  teamId?: string;
  team: TeamType | null;
  setTeamId: Dispatch<SetStateAction<string | undefined>>;
};

const TeamEditorFields = ({ team, teamId, setTeamId }: Props) => {
  const idFieldOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const teamIdFromTarget = e.currentTarget.value;
      setTeamId(teamIdFromTarget);
    },
    [setTeamId],
  );

  return (
    <>
      <Field
        name="team-id"
        defaultValue={teamId ?? ''}
        label="Team id"
        isRequired
      >
        {({ fieldProps }) => (
          <>
            <TextField {...fieldProps} onBlur={idFieldOnBlur} />
            {team && <ValidMessage>Team found</ValidMessage>}
          </>
        )}
      </Field>
      <Field
        name="team-name"
        defaultValue={team?.teamName ?? ''}
        label="Team name"
        isRequired
      >
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
    </>
  );
};

export default TeamEditorFields;
