import * as mocks from './check-teams.test.mock';
import { uploadMetadata } from '../../src/routes/upload-metadata';
import { ALBEvent } from '../../src/types';
import * as utils from '../../src/lib/utils';
import { MetadataBody, ReviewerMethod } from '../../src/lib/utils/request';

describe('Upload meta data to pull request', () => {
  const packages = [
    {
      name: 'Fake Package A',
      team: 'Fake Team A',
    },
  ];
  const teams = {
    'Fake Team A': {
      contributors: ['user-a', 'user-b', 'user-c'],
    },
  };

  const contributorAccountIds = {
    'Fake Team A': {
      'user-a': 'User a',
      'user-b': 'User b',
      'user-c': 'User c',
    },
  };

  beforeEach(() => {
    mocks.mockCache.getChangedPackages.mockReset();
    mocks.mockCache.putChangedPackages.mockReset();
    mocks.mockBitbucketAPI.getTeams.mockReturnValue(teams);
    mocks.mockCache.getAccountId.mockImplementation(
      staffId =>
        contributorAccountIds['Fake Team A'][staffId] ||
        contributorAccountIds['Fake Team B'][staffId],
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add random contributor as reviewer to the PR', async () => {
    const body: MetadataBody = {
      changedPackages: packages,
      addReviewers: true,
      addComment: true,
      reviewerMethod: ReviewerMethod.RANDOM,
    };
    const request: ALBEvent = {
      microsHealthCheck: '',
      httpMethod: 'POST',
      path: '/upload-metadata',
      queryStringParameters: { prId: '1', commit: 'abcdefghijkl' },
      body: JSON.stringify(body),
      isBase64Encoded: true,
    };
    mocks.mockBitbucketAPI.getNumberOfComments.mockResolvedValue(0);
    mocks.mockBitbucketAPI.getPr.mockResolvedValue({
      title: 'title',
      sourceBranch: 'source',
      state: 'OPEN',
      reviewers: [],
      approvals: [],
      author: 'author',
    });
    mocks.mockCache.getChangedPackages.mockReturnValue(packages);
    jest.spyOn(Math, 'random').mockReturnValue(0);
    jest.spyOn(utils, 'ignorePr').mockReturnValue(undefined);
    const result = await uploadMetadata(request);
    expect(mocks.mockBitbucketAPI.addReviewersToPr).toBeCalledWith(
      '1',
      'title',
      ['User a'],
    );
    expect(result).toEqual({
      statusCode: 201,
      statusDescription: 'Created',
      isBase64Encoded: false,
      headers: { 'Content-type': 'application/json' },
      body:
        '{"message":"PR metadata cached","teamsAdded":["Fake Team A"],"commentAdded":true}',
    });
  });

  test('should add all team contributors as reviewers to the PR', async () => {
    const body: MetadataBody = {
      changedPackages: packages,
      addReviewers: true,
      addComment: true,
      reviewerMethod: ReviewerMethod.ENTIRE_TEAM,
    };
    const request: ALBEvent = {
      microsHealthCheck: '',
      httpMethod: 'POST',
      path: '/upload-metadata',
      queryStringParameters: { prId: '1', commit: 'abcdefghijkl' },
      body: JSON.stringify(body),
      isBase64Encoded: true,
    };
    mocks.mockBitbucketAPI.getNumberOfComments.mockResolvedValue(0);
    mocks.mockBitbucketAPI.getPr.mockResolvedValue({
      title: 'title',
      sourceBranch: 'source',
      state: 'OPEN',
      reviewers: [],
      approvals: [],
      author: 'author',
    });
    mocks.mockCache.getChangedPackages.mockReturnValue(packages);
    jest.spyOn(utils, 'ignorePr').mockReturnValue(undefined);
    const result = await uploadMetadata(request);
    expect(mocks.mockBitbucketAPI.addReviewersToPr).toBeCalledWith(
      '1',
      'title',
      ['User a', 'User b', 'User c'],
    );
    expect(result).toEqual({
      statusCode: 201,
      statusDescription: 'Created',
      isBase64Encoded: false,
      headers: { 'Content-type': 'application/json' },
      body:
        '{"message":"PR metadata cached","teamsAdded":["Fake Team A"],"commentAdded":true}',
    });
  });

  test(`should not include author as reviewer to the PR
        when reviewerMethod is entire-team`, async () => {
    const body: MetadataBody = {
      changedPackages: packages,
      addReviewers: true,
      addComment: true,
      reviewerMethod: ReviewerMethod.ENTIRE_TEAM,
    };
    const request: ALBEvent = {
      microsHealthCheck: '',
      httpMethod: 'POST',
      path: '/upload-metadata',
      queryStringParameters: { prId: '1', commit: 'abcdefghijkl' },
      body: JSON.stringify(body),
      isBase64Encoded: true,
    };
    mocks.mockBitbucketAPI.getNumberOfComments.mockResolvedValue(0);
    mocks.mockBitbucketAPI.getPr.mockResolvedValue({
      title: 'title',
      sourceBranch: 'source',
      state: 'OPEN',
      reviewers: [],
      approvals: [],
      author: 'User a',
    });
    mocks.mockCache.getChangedPackages.mockReturnValue(packages);
    jest.spyOn(utils, 'ignorePr').mockReturnValue(undefined);
    const result = await uploadMetadata(request);
    expect(mocks.mockBitbucketAPI.addReviewersToPr).toBeCalledWith(
      '1',
      'title',
      ['User b', 'User c'],
    );
    expect(result).toEqual({
      statusCode: 201,
      statusDescription: 'Created',
      isBase64Encoded: false,
      headers: { 'Content-type': 'application/json' },
      body:
        '{"message":"PR metadata cached","teamsAdded":["Fake Team A"],"commentAdded":true}',
    });
  });

  test('should not have author as random reviewer to the PR ', async () => {
    const body: MetadataBody = {
      changedPackages: packages,
      addReviewers: true,
      addComment: true,
      reviewerMethod: ReviewerMethod.ENTIRE_TEAM,
    };
    const request: ALBEvent = {
      microsHealthCheck: '',
      httpMethod: 'POST',
      path: '/upload-metadata',
      queryStringParameters: { prId: '1', commit: 'abcdefghijkl' },
      body: JSON.stringify(body),
      isBase64Encoded: true,
    };

    const teamA = {
      'Fake Team A': {
        contributors: ['user-a'],
      },
    };
    mocks.mockBitbucketAPI.getTeams.mockReturnValue(teamA);
    mocks.mockBitbucketAPI.getNumberOfComments.mockResolvedValue(0);
    mocks.mockBitbucketAPI.getPr.mockResolvedValue({
      title: 'title',
      sourceBranch: 'source',
      state: 'OPEN',
      reviewers: [],
      approvals: [],
      author: 'User a',
    });
    mocks.mockCache.getChangedPackages.mockReturnValue(packages);
    jest.spyOn(utils, 'ignorePr').mockReturnValue(undefined);
    const result = await uploadMetadata(request);
    expect(mocks.mockBitbucketAPI.addReviewersToPr).not.toBeCalled();
    expect(result).toEqual({
      statusCode: 201,
      statusDescription: 'Created',
      isBase64Encoded: false,
      headers: { 'Content-type': 'application/json' },
      body:
        '{"message":"PR metadata cached","teamsAdded":[],"commentAdded":false}',
    });
  });
});
