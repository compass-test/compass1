import React, { FocusEvent, useCallback, useState } from 'react';

import { ErrorMessage, Field, ValidMessage } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { useTeamQuery } from '@atlassian/performance-portal-team-editor';

const renderTeamStatus = (teamId: string, team: any, loading: boolean) => {
  if (!teamId || loading) {
    return null;
  }

  if (team) {
    return <ValidMessage>Team found</ValidMessage>;
  }

  return <ErrorMessage>Team not found</ErrorMessage>;
};
const TeamField = ({
  defaultValue = '',
  label = 'Team Id',
  name = 'team-id',
}) => {
  const [teamId, setTeamId] = useState<string>(defaultValue);
  const [loading, team] = useTeamQuery(teamId);

  const idFieldOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const teamIdFromTarget = e.currentTarget.value;
      setTeamId(teamIdFromTarget);
    },
    [setTeamId],
  );

  return (
    <Field name={name} defaultValue={defaultValue} label={label} isRequired>
      {({ fieldProps }) => (
        <>
          <TextField {...fieldProps} onBlur={idFieldOnBlur} />
          {renderTeamStatus(teamId, team, loading)}
        </>
      )}
    </Field>
  );
};

export default TeamField;
