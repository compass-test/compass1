import { getMergedPullRequests } from '.';
import {
  BITBUCKET_PULL_REQUESTS_URL,
  PULL_REQUESTS_PAGE_LENGTH,
} from '../constants';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');

// https://product-fabric.atlassian.net/browse/ED-13153
const temporaryExpand = '&fields=%2Bvalues.closed_on';

function mockAxiosRequest(
  response: Partial<AxiosResponse> = {
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json',
    },
    data: {
      pagelen: 30,
      size: 0,
      values: [],
    },
  },
) {
  axios.get.mockResolvedValue(Promise.resolve(response));
  if (response.status !== 200) {
    // Silence logs
    jest.spyOn(console, 'error').mockImplementation((_msg: string) => {});
  }
}

describe('Pull Requests', () => {
  const headers = {
    Authorization: expect.any(String),
  };

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should call fetch with the correct bitbucket url', async () => {
    mockAxiosRequest();
    await getMergedPullRequests();
    expect(axios.get).toBeCalledTimes(1);
    expect(
      axios.get,
    ).toBeCalledWith(
      `${BITBUCKET_PULL_REQUESTS_URL}?q=state="merged" and destination.branch.name="develop"${temporaryExpand}&pagelen=${PULL_REQUESTS_PAGE_LENGTH}&page=1`,
      { headers },
    );
  });

  it('should call fetch with the correct bitbucket url with correct page number', async () => {
    mockAxiosRequest();
    await getMergedPullRequests({ pageNo: 2 });
    expect(
      axios.get,
    ).toBeCalledWith(
      `${BITBUCKET_PULL_REQUESTS_URL}?q=state="merged" and destination.branch.name="develop"${temporaryExpand}&pagelen=${PULL_REQUESTS_PAGE_LENGTH}&page=2`,
      { headers },
    );
  });

  it('should call fetch with the correct bitbucket url with correct branch name', async () => {
    mockAxiosRequest();
    const branch = 'foo';
    await getMergedPullRequests({ branch });
    expect(
      axios.get,
    ).toBeCalledWith(
      `${BITBUCKET_PULL_REQUESTS_URL}?q=state="merged" and destination.branch.name="${branch}"${temporaryExpand}&pagelen=${PULL_REQUESTS_PAGE_LENGTH}&page=1`,
      { headers },
    );
  });

  it('should return appropriate error message if Bitbucket returns a 401 response', async () => {
    mockAxiosRequest({
      status: 401,
      statusText: 'Unauthorized',
      headers: {
        'content-type': 'text/plain',
      },
      data:
        'Too many invalid password attempts. Log in at https://id.atlassian.com/ to restore access.',
    });
    return expect(getMergedPullRequests()).rejects.toThrow(
      `Failed to fetch PRs from Bitbucket.\n\t401 Unauthorized: Too many invalid password attempts. Log in at https://id.atlassian.com/ to restore access.`,
    );
  });

  it('should return appropriate error message if Bitbucket returns a 403 json response', async () => {
    mockAxiosRequest({
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        type: 'error',
        error: { message: 'Access token expired.' },
      },
    });
    return expect(getMergedPullRequests()).rejects.toThrow(
      `Failed to fetch PRs from Bitbucket.\n\t403 Forbidden: Access token expired.`,
    );
  });

  it('should return appropriate error message if Bitbucket returns a 403 html response', async () => {
    const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Error</title>
</head>
<body>
  <div id="page">
    <div id="error" class="generic-error aui-page-panel-content">
      <h1>
        You're currently blocked from this page
      </h1>
      <p>
              To access this repository, ask Atlassian to allowlist
              your IP address (0.0.0.0)
      </p>
    </div>
  </div>
</body>
</html>`;
    mockAxiosRequest({
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'content-type': 'text/html',
      },
      data: htmlResponse,
    });
    return expect(getMergedPullRequests()).rejects.toThrow(
      `Failed to fetch PRs from Bitbucket.\n\t403 Forbidden: ${htmlResponse}`,
    );
  });
});
