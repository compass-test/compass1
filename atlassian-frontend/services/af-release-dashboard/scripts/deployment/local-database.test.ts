import * as buildUtils from '@atlaskit/build-utils/guards';
import { sendDeploymentInfo } from './local-database';
import * as axiosModule from 'axios';

import type { UpdateDeploymentEntity } from './local-database';

describe('send deployment info', () => {
  process.env.RELEASE_DASHBOARD_TOKEN = 'sometoken';
  process.env.RELEASE_DASHBOARD_URL = 'someurl';

  const payload: UpdateDeploymentEntity = {
    lastDeploymentCommitHash: '123abc',
    isAutoRebase: true,
    confluenceBuildUrl: 'https://',
  };
  const headers = {
    Authorization: expect.any(String),
  };
  const mockedResponse = {
    data: { status: 'success', payload: { lastDeploymentTimestamp: 'TIME' } },
  };

  let spy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    spy = jest
      .spyOn(axiosModule.default, 'post')
      .mockResolvedValueOnce(Promise.resolve(mockedResponse));
  });

  it('should call checkEnvironmentVariables with the release dashboard env variables', async () => {
    const envSpy = jest.spyOn(buildUtils, 'validateEnvVars');

    await sendDeploymentInfo(payload);

    expect(envSpy).toBeCalledTimes(1);
    expect(envSpy).toBeCalledWith(process.env, [
      'RELEASE_DASHBOARD_TOKEN',
      'RELEASE_DASHBOARD_URL',
    ]);
  });

  it('should call axios post with the correct url', async () => {
    await sendDeploymentInfo(payload);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.RELEASE_DASHBOARD_URL}/api/v1/deployment`,
      {
        lastDeploymentCommitHash: expect.any(String),
        isAutoRebase: expect.any(Boolean),
        confluenceBuildUrl: 'https://',
      },
      {
        headers,
      },
    );
  });

  it('should call axios post with the correct data: "isAutoRebase : true"', async () => {
    const rebasingPayload = { ...payload, isAutoRebase: true };
    await sendDeploymentInfo(rebasingPayload);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.RELEASE_DASHBOARD_URL}/api/v1/deployment`,
      rebasingPayload,
      {
        headers,
      },
    );
  });

  it('should call axios post with the correct data: "isAutoRebase : false"', async () => {
    const nonRebasingPayload = { ...payload, isAutoRebase: false };
    await sendDeploymentInfo(nonRebasingPayload);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(
      `${process.env.RELEASE_DASHBOARD_URL}/api/v1/deployment`,
      nonRebasingPayload,
      {
        headers,
      },
    );
  });
});
