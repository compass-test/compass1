import fetch from 'node-fetch';
import {
  getConfluenceDeploymentInfo,
  getVersionFileUrlForLastSuccessfulDeployment,
  loadVersionFile,
} from './confluence-deployment';
import * as buildUtils from '@atlaskit/build-utils/guards';

jest.mock('node-fetch');

const mockedBuildResult = (build: number, successful = false) => {
  const key = `CONFMICRO-CFCPB14350-BUILDBRANCH-${build}`;
  const state = successful ? 'Successful' : 'Failed';
  return `{
    "buildResultKey":"${key}",
    "lifeCycleState":"Finished",
    "id":34437227${build},
    "specsResult":false,
    "key":"${key}",
    "state":"${state}",
    "buildState":"${state}",
    "number":${build},
    "buildNumber":${build}}`;
};

const mockedBuildResultsResponse = (
  numResults: number,
  pageIndex: number,
  successfulBuild?: number,
) => {
  const results = [];
  const startIndex = pageIndex * numResults;
  for (let i = 0; i < numResults; i++) {
    const buildNumber = startIndex + i + 1;
    results.push(
      mockedBuildResult(buildNumber, buildNumber === successfulBuild),
    );
  }
  return JSON.parse(
    `{"results":{"size":${numResults},"expand":"result","start-index":${startIndex},"max-result":${numResults},"result":[${results.join(
      ',',
    )}]},"expand":"results"}`,
  );
};

const mockedSuccessfulBuild = (build: number) => {
  const key = `CONFMICRO-CFCPB14350-BUILDBRANCH-${build}`;
  return JSON.parse(
    `{ "buildResultKey": "${key}", "key": "${key}", "state": "Successful", "vcsRevisionKey": "22c5d4f907799d07219956947da19ba78c2174f3" }`,
  );
};

function mockFetchResponse(payload: any) {
  fetch.mockResolvedValueOnce(
    Promise.resolve({
      json: () => Promise.resolve(payload),
    }),
  );
}

function mockBuildResultsResponse(
  pageSize: number,
  maxPages: number,
  successfulBuildIndex?: number,
) {
  for (let i = 0; i < maxPages; i++) {
    mockFetchResponse(
      mockedBuildResultsResponse(pageSize, i, successfulBuildIndex),
    );
  }
  if (typeof successfulBuildIndex !== 'undefined') {
    mockFetchResponse(mockedSuccessfulBuild(successfulBuildIndex));
  }
}

describe('get deployment info', () => {
  const stashHeaders = {
    Authorization: expect.any(String),
  };
  const bambooHeaders = {
    Accept: 'application/json',
    Authorization: expect.any(String),
  };

  process.env.STASH_USER_BOT = 'someuser';
  process.env.STASH_TOKEN_BOT = 'sometoken';
  process.env.CONFLUENCE_BAMBOO_TOKEN = 'othertoken';
  process.env.PF_BRANCH_BUILD_BAMBOO_KEY = 'CONF-BUILD';
  process.env.PF_BRANCH_DEPLOY_VERSION_FILE = '.version-file';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('getVersionFileUrlForLastSuccessfulDeployment', () => {
    it(`should use credentials on fetch`, async () => {
      const successBuild = 1;
      mockBuildResultsResponse(1, 1, successBuild);

      await getVersionFileUrlForLastSuccessfulDeployment();
      expect(fetch).toBeCalledTimes(2);
      expect(
        fetch,
      ).toBeCalledWith(
        'https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONF-BUILD.json?max-result=40&start-index=0',
        { headers: bambooHeaders },
      );
      expect(
        fetch,
      ).toBeCalledWith(
        `https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONF-BUILD-${successBuild}.json`,
        { headers: bambooHeaders },
      );
    });

    it('should return the version file url for a successful build when available', async () => {
      const pageSize = 1;
      const maxPages = 1;
      const successBuild = 1;
      mockBuildResultsResponse(pageSize, maxPages, successBuild);

      const result = await getVersionFileUrlForLastSuccessfulDeployment();
      expect(result).toStrictEqual({
        versionFileUrl:
          'https://stash.atlassian.com/rest/api/latest/projects/CONFCLOUD/repos/confluence-frontend/raw/.version-file?at=22c5d4f907799d07219956947da19ba78c2174f3',
        buildUrl:
          'https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONF-BUILD-1.json',
      });
    });

    it(`should return undefined for the version file url when it can't find a successful build`, async () => {
      const pageSize = 1;
      const maxPages = 3;
      mockBuildResultsResponse(pageSize, maxPages);
      const result = await getVersionFileUrlForLastSuccessfulDeployment(
        0,
        pageSize,
      );
      expect(result).toStrictEqual(undefined);
    });

    it(`should iterate across paged multiple paged results if it doesn't find a match in the first one`, async () => {
      const pageSize = 3;
      const maxPages = 3;
      const successBuild = pageSize * maxPages - (pageSize - 1); // 7 out of 9 on last page.
      mockBuildResultsResponse(pageSize, maxPages, successBuild);

      const result = await getVersionFileUrlForLastSuccessfulDeployment(
        0,
        pageSize,
      );
      expect(result).toStrictEqual({
        versionFileUrl:
          'https://stash.atlassian.com/rest/api/latest/projects/CONFCLOUD/repos/confluence-frontend/raw/.version-file?at=22c5d4f907799d07219956947da19ba78c2174f3',
        buildUrl:
          'https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONF-BUILD-7.json',
      });
    });

    it(`should return gracefully when the available results are less than the max pages.`, async () => {
      const pageSize = 2;
      const maxPages = 1;
      mockBuildResultsResponse(pageSize, maxPages);
      const emptyResultsPayload = mockedBuildResultsResponse(0, 0);
      mockFetchResponse(emptyResultsPayload);
      const result = await getVersionFileUrlForLastSuccessfulDeployment(
        0,
        pageSize,
      );
      expect(result).toStrictEqual(undefined);
    });

    it(`should give up after 3 paged results if it hasn't found a match`, async () => {
      const pageSize = 3;
      const maxPages = 3;
      mockBuildResultsResponse(pageSize, maxPages);
      const result = await getVersionFileUrlForLastSuccessfulDeployment(
        0,
        pageSize,
      );
      expect(result).toStrictEqual(undefined);
    });
  });

  describe('loadVersionFile', () => {
    it(`should use credentials on fetch`, async () => {
      const metadata = { akCommitHash: 'abc123', branchIsModified: true };
      mockFetchResponse(metadata);

      await loadVersionFile('url');
      expect(fetch).toBeCalledTimes(1);
      expect(fetch).toBeCalledWith('url', { headers: stashHeaders });
    });

    it('should return the commitHash and branchIsModified when the response has "akCommitHash"', async () => {
      const metadata = { akCommitHash: 'abc123', branchIsModified: true };
      mockFetchResponse(metadata);

      const result = await loadVersionFile('http://foo.com/.version-file');
      expect(result).toStrictEqual({
        commitHash: metadata.akCommitHash,
        branchIsModified: metadata.branchIsModified,
      });
    });

    it('should return the commitHash and branchIsModified when the response has "afCommitHash"', async () => {
      const metadata = { afCommitHash: 'abc123', branchIsModified: true };
      mockFetchResponse(metadata);

      const result = await loadVersionFile('http://foo.com/.version-file');
      expect(result).toStrictEqual({
        commitHash: metadata.afCommitHash,
        branchIsModified: metadata.branchIsModified,
      });
    });
  });

  describe('getConfluenceDeploymentInfo', () => {
    const metadata = { afCommitHash: 'abc123', branchIsModified: true };
    beforeEach(() => {
      mockBuildResultsResponse(1, 1, 1);
      mockFetchResponse(metadata);
    });
    it('should call checkEnvironmentVariables with the stash environement variables', async () => {
      const spy = jest.spyOn(buildUtils, 'validateEnvVars');

      await getConfluenceDeploymentInfo();

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(process.env, [
        'STASH_USER_BOT',
        'STASH_TOKEN_BOT',
        'CONFLUENCE_BAMBOO_TOKEN',
        'PF_BRANCH_BUILD_BAMBOO_KEY',
        'PF_BRANCH_DEPLOY_VERSION_FILE',
      ]);
    });

    it('should receive branch deploy info', async () => {
      const result = await getConfluenceDeploymentInfo();
      expect(result).toStrictEqual({
        commitHash: metadata.afCommitHash,
        branchIsModified: metadata.branchIsModified,
        buildBrowseUrl:
          'https://confluence-cloud-bamboo.internal.atlassian.com/browse/CONF-BUILD-1',
        buildRestUrl:
          'https://confluence-cloud-bamboo.internal.atlassian.com/rest/api/latest/result/CONF-BUILD-1.json',
      });
    });
  });
});
