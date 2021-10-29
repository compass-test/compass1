import teams from '../../__fixtures__/teams.json';

jest.mock('fs', () => {
  const teams = require('../../__fixtures__/teams.json');
  return {
    readFileSync: jest.fn(() => JSON.stringify(teams)),
  };
});
jest.mock('bolt', () => {
  const workspaces = require('../../__fixtures__/workspaces.json');
  return {
    getWorkspaces: jest.fn(() => workspaces),
    getProject: jest.fn(() => ({ dir: process.cwd() })),
  };
});

import find from '../../index';

test('Should list all packages with no flags', async () => {
  expect(await find({})).toEqual(teams);
});

test('Should list teams that own defined packages', async () => {
  expect(
    await find({
      packages: '@atlaskit/package-a,@atlassian/package-b',
    }),
  ).toEqual({
    'Team A': {
      ...teams['Team A'],
      packages: ['@atlaskit/package-a'],
    },
    'Team B': teams['Team B'],
  });
});

test('Should list all packages owned by defined team', async () => {
  expect(
    await find({
      team: 'Team A',
    }),
  ).toEqual({
    'Team A': teams['Team A'],
  });
});

test('Should filter to include with globs', async () => {
  expect(
    await find({
      include: '**/build/**',
    }),
  ).toEqual({
    'Team B': teams['Team B'],
  });
});

test('Should filter to exclude with globs', async () => {
  expect(
    await find({
      exclude: '**/build/**',
    }),
  ).toEqual({
    'Team A': teams['Team A'],
  });
});

test('Should filter to include and exclude with package names', async () => {
  expect(
    await find({
      include: '@atlaskit',
      exclude: 'a2',
    }),
  ).toEqual({
    'Team A': {
      ...teams['Team A'],
      packages: ['@atlaskit/package-a'],
    },
  });
});
