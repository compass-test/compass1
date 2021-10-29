/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
import { teams, contributorAccountIds } from '../../__fixtures__/teams.json';

export const mockBitbucketAPI = {
  getTeams: jest.fn(() => teams),
  getNumberOfComments: jest.fn(),
  getPr: jest.fn(),
  addReviewersToPr: jest.fn(),
  addCommentToPr: jest.fn(),
};
jest.mock('../../src/lib/api', () => ({
  BitbucketAPI: mockBitbucketAPI,
}));

export const mockCache = {
  getAccountId: jest.fn(
    staffId =>
      contributorAccountIds['Fake Team A'][staffId] ||
      contributorAccountIds['Fake Team B'][staffId],
  ),
  getChangedPackages: jest.fn(),
  putChangedPackages: jest.fn(),
};
jest.mock('../../src/lib/Cache', () => ({
  Cache: {
    getInstance: jest.fn(() => mockCache),
  },
}));
jest.mock('../../src/lib/Logger', () => ({
  Logger: {
    info: jest.fn(),
  },
}));
