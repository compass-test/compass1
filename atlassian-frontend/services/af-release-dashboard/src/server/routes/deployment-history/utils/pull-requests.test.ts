import axios from 'axios';
import { parsePullRequests } from './pull-requests';
import { PAGINATION_THRESHOLD_IN_HOURS } from '../../../constants';
import { getMergedPullRequests } from '../../../bitbucket';
import { mockPullRequests } from '../__tests__/_mocking';
import mockedPullRequestData from '../__tests__/__fixtures__/pull-requests.json';
import mockedPullRequestDataPg2 from '../__tests__/__fixtures__/pull-requests-pg2.json';
import mockedPullRequestDataBadSort from '../__tests__/__fixtures__/pull-requests-wrong-sort.json';

jest.mock('axios');

describe('parsePullRequests:', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Silence logs
    jest.spyOn(console, 'warn').mockImplementation((_msg: string) => {});
  });

  it('should date sort PRs by merge_date with most recent first', async () => {
    // Mock the JSON response with an unsorted dataset.
    axios.get.mockResolvedValueOnce(
      Promise.resolve({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
        },
        // Deep clone the JSON as `getMergedPullRequests` mutates the sort order before returning it
        data: JSON.parse(JSON.stringify(mockedPullRequestDataBadSort)),
      }),
    );

    const pullRequests = await getMergedPullRequests();

    const latestMergeTimestamp = '2021-03-16T03:18:49.722696+00:00';
    const firstResultTimestamp = '2021-03-15T11:34:34.920735+00:00';

    expect(pullRequests[0].closed_on).not.toEqual(
      mockedPullRequestDataBadSort.values[0].closed_on,
    );
    expect(pullRequests[0].closed_on).toEqual(latestMergeTimestamp);
    expect(pullRequests[4].closed_on).toEqual(firstResultTimestamp);
    expect(mockedPullRequestDataBadSort.values[0].closed_on).toEqual(
      firstResultTimestamp,
    );
    expect(mockedPullRequestDataBadSort.values[1].closed_on).toEqual(
      latestMergeTimestamp,
    );
  });

  it('should be behind by zero PRs when deployment timestamp matches latest commit timestamp', async () => {
    mockPullRequests(mockedPullRequestData);
    const latestPr = mockedPullRequestData.values[0];

    const pullRequests = await getMergedPullRequests();
    const result = await parsePullRequests(
      pullRequests,
      latestPr.merge_commit.hash,
      latestPr.closed_on,
    );
    expect(result.numPrsBehind).toEqual(0);
    expect(result.latestPr).toEqual(result.deployedPr);
    expect(result.prAfterDeployed).toBeUndefined();
    expect(result.latestPr).toEqual({
      commit: latestPr.merge_commit.hash,
      timestamp: latestPr.closed_on,
      date: new Date(latestPr.closed_on),
    });
  });

  it('should be behind by one PR when a single yet to be deployed commit merges into develop', async () => {
    mockPullRequests(mockedPullRequestData);
    const latestPr = mockedPullRequestData.values[0];
    const prevPr = mockedPullRequestData.values[1];

    const pullRequests = await getMergedPullRequests();
    const result = await parsePullRequests(
      pullRequests,
      prevPr.merge_commit.hash,
      prevPr.closed_on,
    );
    expect(result.numPrsBehind).toEqual(1);
    expect(result.prAfterDeployed).toBeDefined();
    expect(result.latestPr).toEqual({
      commit: latestPr.merge_commit.hash,
      timestamp: latestPr.closed_on,
      date: new Date(latestPr.closed_on),
    });
    expect(result.deployedPr).toEqual({
      commit: prevPr.merge_commit.hash,
      timestamp: prevPr.closed_on,
      date: new Date(prevPr.closed_on),
    });
  });

  it('should be behind by the number of merged PRs between the deployed commit and the latest one', async () => {
    mockPullRequests(mockedPullRequestData);
    const prevPr = mockedPullRequestData.values[4];

    const pullRequests = await getMergedPullRequests();
    const result = await parsePullRequests(
      pullRequests,
      prevPr.merge_commit.hash,
      prevPr.closed_on,
    );
    expect(result.numPrsBehind).toEqual(4);
  });

  it('should be behind by the paged PR dataset length when it negates pagination due to exceeding time threshold', async () => {
    mockPullRequests(mockedPullRequestData);

    const resultsPerPagedPayload = mockedPullRequestData.pagelen;
    const d = new Date(mockedPullRequestData.values[0].closed_on);
    d.setDate(d.getDate() - PAGINATION_THRESHOLD_IN_HOURS / 24);

    const pullRequests = await getMergedPullRequests();
    const result = await parsePullRequests(
      pullRequests,
      'abcd',
      d.toISOString(),
    );
    expect(result.numPrsBehind).toEqual(resultsPerPagedPayload);
  });

  describe('pagination', () => {
    it('should load additional paginated PR results to find the deployed commit', async () => {
      const deployedPr = mockedPullRequestDataPg2.values[1];
      mockPullRequests([mockedPullRequestData, mockedPullRequestDataPg2]);

      const pullRequests = await getMergedPullRequests();
      const results = await parsePullRequests(
        pullRequests,
        deployedPr.merge_commit.hash,
        deployedPr.closed_on,
      );

      expect(getMergedPullRequests).toBeCalledTimes(2);
      expect(getMergedPullRequests).toHaveBeenNthCalledWith(1);
      expect(getMergedPullRequests).toHaveBeenNthCalledWith(2, { pageNo: 2 });
      expect(results.prAfterDeployed).toBeDefined();
    });

    it(`should not load additional paginated PR results if more than ${
      PAGINATION_THRESHOLD_IN_HOURS / 24
    } days elapsed between deployment and latest commit`, async () => {
      const { values: data } = mockedPullRequestData;
      const d = new Date(data[data.length - 1].closed_on);
      d.setDate(d.getDate() - PAGINATION_THRESHOLD_IN_HOURS / 24);
      mockPullRequests(mockedPullRequestData);

      const pullRequests = await getMergedPullRequests();
      const results = await parsePullRequests(
        pullRequests,
        'foobar',
        d.toISOString(),
      );

      expect(getMergedPullRequests).toBeCalledTimes(1);
      expect(getMergedPullRequests).toHaveBeenNthCalledWith(1);
      expect(results.prAfterDeployed).toBeUndefined();
    });

    it(`should not load additional paginated PR results if it doesn't find the deployed commit within the first 3 paged datasets`, async () => {
      const nextUrl =
        'https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/pullrequests?q=state%3D%22merged%22+and+destination.branch.name%3D%22develop%22&pagelen=2&page=';
      const page1 = {
        page: 1,
        pagelen: 1,
        size: 5,
        values: [mockedPullRequestData.values[0]],
        next: `${nextUrl}2`,
      };
      const page2 = {
        page: 2,
        pagelen: 1,
        size: 5,
        values: [mockedPullRequestData.values[1]],
        next: `${nextUrl}3`,
      };
      const page3 = {
        page: 3,
        pagelen: 1,
        size: 5,
        values: [mockedPullRequestData.values[2]],
        next: `${nextUrl}4`,
      };

      const deploymentData = mockedPullRequestData.values[3];
      const d = new Date(deploymentData.closed_on);
      d.setHours(d.getHours() - 1);
      mockPullRequests([page1, page2, page3]);

      const pullRequests = await getMergedPullRequests();
      await expect(parsePullRequests(pullRequests, 'foobar', d.toISOString()))
        .rejects.toThrow(`
      Failed to find the PR for the deployed commit 'foobar'.
      Unable to ascertain the number of PRs between it and the latest commit.
      Checked the latest ${page3.values.length} PRs from 3 paged sets.
    `);

      expect(getMergedPullRequests).toBeCalledTimes(3);
      expect(getMergedPullRequests).toHaveBeenNthCalledWith(1);
      expect(getMergedPullRequests).toHaveBeenNthCalledWith(2, { pageNo: 2 });
      expect(getMergedPullRequests).toHaveBeenNthCalledWith(3, { pageNo: 3 });
    });
  });
});
