import { response, pullrequest } from '../../../__fixtures__/pullrequest.json';

const mockAxiosInstance = {
  get: jest.fn(),
};
jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
}));
jest.mock('@atlassian/micros-serverless-platform', () => ({
  Secrets: new Map([
    ['BB_USERNAME', 'username'],
    ['BB_PASSWORD', 'password'],
  ]),
}));
jest.mock('../../../src/lib/Logger', () => ({
  Logger: {
    error: jest.fn(),
  },
}));

import { BitbucketAPI } from '../../../src/lib/api';

describe('Bitbucket API', () => {
  beforeEach(() => {
    mockAxiosInstance.get.mockReset();
  });

  test('Correctly transforms PRs', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: response });
    expect(await BitbucketAPI.getPr('1')).toEqual(pullrequest);
  });

  test("Returns undefined if PR doesn't exist", async () => {
    mockAxiosInstance.get.mockRejectedValue({ status: 404 });
    expect(await BitbucketAPI.getPr('1')).toEqual(undefined);
  });
});
