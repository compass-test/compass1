import fetchMock from 'fetch-mock/cjs/client';

import {
  EXISTS_STATUS_CODE,
  integrationsKeys,
  NOT_EXISTS_STATUS_CODE,
} from '../../common/constants';
import {
  IntegrationData,
  IntegrationInstallStatusResponse,
  IntegrationsData,
} from '../../common/types';
import {
  getInstallRequestStatusUrlForIntegrationKey,
  getInstallStatusUrlForIntegrationKey,
} from '../../common/utils';
import { getIntegrations } from '../integrations';

import { getIntegrationsData } from './index';

jest.mock('../integrations', () => ({
  ...jest.requireActual<Object>('../integrations'),
  getIntegrations: jest.fn(),
}));

const defaultUserParams = {
  cloudId: 'DUMMY-12345',
  aaid: 'dummy12345',
  product: 'jira',
};

describe('getIntegrationsData', () => {
  let mockGetIntegrations = getIntegrations as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    fetchMock.restore();
  });
  it('should throw an error if the atlassian account id is not defined', async () => {
    await expect(
      getIntegrationsData(
        false,
        defaultUserParams.product,
        defaultUserParams.cloudId,
        '',
      ),
    ).rejects.toThrow('An atlassian Account Id is required');
  });
  it('should correctly return integration data if no errors for site admin user', async () => {
    const mockIntegrations = [
      {
        key: 'key-one',
        mock: (installStatusUrl: string) => {
          fetchMock.mock(installStatusUrl, NOT_EXISTS_STATUS_CODE);
        },
        installed: false,
      },
      {
        key: 'key-two',
        mock: (installStatusUrl: string) => {
          fetchMock.mock(installStatusUrl, NOT_EXISTS_STATUS_CODE);
        },
        installed: false,
      },
      {
        key: 'key-three',
        mock: (installStatusUrl: string) => {
          fetchMock.mock(installStatusUrl, EXISTS_STATUS_CODE);
        },
        installed: true,
      },
    ];

    const expectedData: IntegrationsData = [];
    mockIntegrations.forEach((integration) => {
      const installStatusUrl = getInstallStatusUrlForIntegrationKey(
        integration.key,
      );

      integration.mock(installStatusUrl);
      const data: IntegrationInstallStatusResponse = {
        key: integration.key,
        installed: integration.installed,
      };

      expectedData.push(data);
    });

    mockGetIntegrations.mockResolvedValue(['key-one', 'key-two', 'key-three']);

    const integrationData = await getIntegrationsData(
      false,
      defaultUserParams.product,
      defaultUserParams.cloudId,
      defaultUserParams.aaid,
    );
    expect(integrationData).toEqual(expectedData);
    mockIntegrations.forEach((integration, index) => {
      expect(fetchMock.calls()[index][0]).toEqual(
        getInstallStatusUrlForIntegrationKey(integration.key),
      );
    });
  });
  it('should correctly return integration data if no errors for non site admin user', async () => {
    const mockIntegrations = [
      {
        key: 'key-one',
        mock: (installStatusUrl: string, installRequestStatusUrl: string) => {
          fetchMock.mock(installStatusUrl, NOT_EXISTS_STATUS_CODE);
          fetchMock.mock(installRequestStatusUrl, EXISTS_STATUS_CODE);
        },
        requested: true,
        installed: false,
      },
      {
        key: 'key-two',
        mock: (installStatusUrl: string, installRequestStatusUrl: string) => {
          fetchMock.mock(installStatusUrl, NOT_EXISTS_STATUS_CODE);
          fetchMock.mock(installRequestStatusUrl, NOT_EXISTS_STATUS_CODE);
        },
        requested: false,
        installed: false,
      },
      {
        key: 'key-three',
        mock: (installStatusUrl: string) => {
          fetchMock.mock(installStatusUrl, EXISTS_STATUS_CODE);
        },
        installed: true,
      },
    ];

    const expectedData: IntegrationsData = [];
    mockIntegrations.forEach((integration) => {
      const installStatusUrl = getInstallStatusUrlForIntegrationKey(
        integration.key,
      );
      const installRequestStatusUrl = getInstallRequestStatusUrlForIntegrationKey(
        integration.key,
        defaultUserParams.product,
        defaultUserParams.cloudId,
        defaultUserParams.aaid,
      );

      integration.mock(installStatusUrl, installRequestStatusUrl);
      const data: IntegrationData = {
        key: integration.key,
        installed: integration.installed,
      };
      if (typeof integration.requested !== 'undefined') {
        data.requested = integration.requested;
      }
      expectedData.push(data);
    });

    mockGetIntegrations.mockResolvedValue(['key-one', 'key-two', 'key-three']);

    const integrationData = await getIntegrationsData(
      true,
      defaultUserParams.product,
      defaultUserParams.cloudId,
      defaultUserParams.aaid,
    );
    expect(integrationData).toEqual(expectedData);
    mockIntegrations.forEach((integration, index) => {
      expect(fetchMock.calls()[index][0]).toEqual(
        getInstallStatusUrlForIntegrationKey(integration.key),
      );
    });
    mockIntegrations.forEach((integration, index) => {
      if (typeof integration.requested !== 'undefined') {
        expect(fetchMock.calls()[index + mockIntegrations.length][0]).toEqual(
          getInstallRequestStatusUrlForIntegrationKey(
            integration.key,
            defaultUserParams.product,
            defaultUserParams.cloudId,
            defaultUserParams.aaid,
          ),
        );
      }
    });
  });

  it('should keep the input order if we needed to retry promise once', async () => {
    const key1 = integrationsKeys.CIRCLECI;
    const key2 = integrationsKeys.GITHUB;
    const keys = [key1, key2];

    mockGetIntegrations.mockResolvedValue(keys);

    keys.forEach((key, i) => {
      const url2 = getInstallRequestStatusUrlForIntegrationKey(
        key,
        defaultUserParams.product,
        defaultUserParams.cloudId,
        defaultUserParams.aaid,
      );
      fetchMock.mock(url2, 200);

      const url1 = getInstallStatusUrlForIntegrationKey(key);
      if (i === 0) {
        fetchMock.mock(url1, 500, { repeat: 1 });
        fetchMock.mock(
          url1,
          {
            status: NOT_EXISTS_STATUS_CODE,
          },
          { overwriteRoutes: false },
        );
      } else {
        fetchMock.mock(url1, 200);
      }
    });

    const result = await getIntegrationsData(
      true,
      defaultUserParams.product,
      defaultUserParams.cloudId,
      defaultUserParams.aaid,
    );

    const expected = [
      {
        key: key1,
        installed: false,
        requested: true,
      },
      {
        key: key2,
        installed: true,
      },
    ];
    expect(expected).toEqual(result);
  });
});
