import * as mocks from './check-teams.test.mock';
import {
  allTeams,
  teamA,
  noTeam,
  noPackages,
} from '../../__fixtures__/changedPackages.json';
import { teams, contributorAccountIds } from '../../__fixtures__/teams.json';

import {
  checkTeams,
  METADATA_NOT_FOUND,
  TEAMS_NOT_FOUND,
} from '../../src/lib/check-teams';

beforeEach(() => {
  mocks.mockCache.getChangedPackages.mockReset();
});

test('Action called for each team when there are no participants', async () => {
  const action = jest.fn();
  mocks.mockCache.getChangedPackages.mockReturnValue(allTeams);
  await checkTeams('abcdefg', [], action);
  expect(action).toHaveBeenNthCalledWith(
    1,
    'Fake Team A',
    {
      ...teams['Fake Team A'],
      packages: ['Fake Package A'],
    },
    contributorAccountIds['Fake Team A'],
  );
  expect(action).toHaveBeenNthCalledWith(
    2,
    'Fake Team B',
    {
      ...teams['Fake Team B'],
      packages: ['Fake Package B'],
    },
    contributorAccountIds['Fake Team B'],
  );
});

test('Action not called when participant is in team', async () => {
  const action = jest.fn();
  mocks.mockCache.getChangedPackages.mockReturnValue(allTeams);
  await checkTeams(
    'abcdefg',
    [contributorAccountIds['Fake Team A']['user-a']],
    action,
  );
  expect(action).toHaveBeenCalledWith(
    'Fake Team B',
    {
      ...teams['Fake Team B'],
      packages: ['Fake Package B'],
    },
    contributorAccountIds['Fake Team B'],
  );
});

test('No action called with participant from each team', async () => {
  const action = jest.fn();
  mocks.mockCache.getChangedPackages.mockReturnValue(allTeams);
  await checkTeams(
    'abcdefg',
    [
      contributorAccountIds['Fake Team A']['user-a'],
      contributorAccountIds['Fake Team B']['user-c'],
    ],
    action,
  );
  expect(action).not.toHaveBeenCalled();
});

test('Particpants can satisfy multiple packages', async () => {
  const action = jest.fn();
  mocks.mockCache.getChangedPackages.mockReturnValue(teamA);
  await checkTeams(
    'abcdefg',
    [contributorAccountIds['Fake Team A']['user-a']],
    action,
  );
  expect(action).not.toHaveBeenCalled();
});

test('No action called with no packages', async () => {
  const action = jest.fn();
  mocks.mockCache.getChangedPackages.mockReturnValue(noPackages);
  await checkTeams('abcdefg', [], action);
  expect(action).not.toHaveBeenCalled();
});

test('Package with no team is ignored', async () => {
  const action = jest.fn();
  mocks.mockCache.getChangedPackages.mockReturnValue(noTeam);
  await checkTeams('abcdefg', [], action);
  expect(action).not.toHaveBeenCalled();
});

test('Error thrown when changedPackages not found', async () => {
  mocks.mockCache.getChangedPackages.mockReturnValue(undefined);
  await expect(checkTeams('abcdefg', [], jest.fn())).rejects.toThrow(
    METADATA_NOT_FOUND,
  );
});

test("Error thrown when teams.json isn't found", async () => {
  mocks.mockCache.getChangedPackages.mockReturnValue(noTeam);
  mocks.mockBitbucketAPI.getTeams.mockReturnValue(undefined);
  await expect(checkTeams('abcdefg', [], jest.fn())).rejects.toThrow(
    TEAMS_NOT_FOUND('abcdefg'),
  );
});
