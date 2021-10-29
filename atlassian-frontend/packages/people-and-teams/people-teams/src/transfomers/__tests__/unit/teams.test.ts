import { testMyTeamsData } from '@atlassian/ptc-test-utils';

import { transformTeams } from '../../../transfomers/teams';
import { RawTeamData } from '../../../types/team';

describe('transformTeams', () => {
  it('should transform data correctly', () => {
    const result = transformTeams(testMyTeamsData as RawTeamData);

    expect(result.length).toEqual(testMyTeamsData.entities.length);
    expect(result).toEqual(
      testMyTeamsData.entities.map((team) => {
        return {
          ...team,
          id: team.teamAri,
        };
      }),
    );
  });
});
