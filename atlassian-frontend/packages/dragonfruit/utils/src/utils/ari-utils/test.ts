import { teamIdToIdentityAri } from './index';

describe('teamIdToIdentityAri', () => {
  let teamId: string;

  //given a teamID
  beforeEach(() => {
    teamId = '0006b873-ace9-4e73-bc19-b80b68c69397';
  });

  it('should return teamARI ', () => {
    expect(teamIdToIdentityAri(teamId)).toEqual(
      'ari:cloud:identity::team/0006b873-ace9-4e73-bc19-b80b68c69397',
    );
  });
});
