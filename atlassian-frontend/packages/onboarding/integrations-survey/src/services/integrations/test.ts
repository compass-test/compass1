import fetchMock from 'fetch-mock/cjs/client';

import {
  EXISTS_STATUS_CODE,
  NOT_EXISTS_STATUS_CODE,
} from '../../common/constants';
import { IntegrationInstallStatusMap } from '../../common/types';
import {
  getInstallRequestStatusUrlForIntegrationKey,
  getInstallStatusUrlForIntegrationKey,
} from '../../common/utils';
import { getUserSegmentationData } from '../user-segmentation';

import {
  IntegrationInstallRequestResponse,
  UserSegmentationDataMapping,
} from './types';

import {
  createUserSegmentationBasedIntegrationList,
  getIntegrations,
  getIntegrationsFromLocalStorage,
  getIntegrationsInstallRequestStatus,
  getIntegrationsInstallStatus,
  saveIntegrationListToLocalStorage,
  sendIntegrationInstallRequest,
} from './index';

jest.mock('../user-segmentation', () => ({
  getUserSegmentationData: jest.fn(),
}));

jest.mock('./index', () => ({
  ...jest.requireActual<Object>('./index'),
  createUserSegmentationBasedIntegrationList: jest.fn(),
}));

const defaultUserParams = {
  cloudId: 'DUMMY-12345',
  aaid: 'dummy12345',
  product: 'jira',
  baseUrl: 'https://atl-makkuro.jira-dev.com',
};

const MAX_INTEGRATION_KEYS = 6;
const INTERNAL_ERROR_STATUS_CODE = 500;

const integrationsKeys = {
  SLACK: 'com.atlassian.jira.slack',
  MICROSOFT_TEAMS: 'microsoft-teams',
  GITHUB: 'com.github.integration.production',
  GITLAB: 'gitlab-jira-connect-gitlab.com',
  SENTRY: 'sentry.io.jira',
  CIRCLECI: 'circleci.jira',
  ZENDESK: 'zendesk_for_jira',
  JENKINS: 'com.atlassian.jira.plugins.jenkins',
  FIGMA: 'com.figma.jira-add-on',
  ZEPLIN: 'io.zeplin.integration.jira',
  INVISION: 'com.invisionapp.integration.jira',
  ZOOM: 'zoom-jira-connector',
  GOOGLE_SHEETS: 'jira-sheets-official',
  HALP: 'halp.com',
  MINDVILLE: 'com.riadalabs.jira.plugins.insight',
  MICROSOFT_OUTLOOK: 'jira-outlook-integration',
  OCTOPUS: 'com.octopus.jiraconnectapp.production',
};

let mockGetUserSegmentationData = getUserSegmentationData as jest.Mock;

describe('getIntegrations', () => {
  const aaid = 'random_string';

  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const localStorageMock = (function () {
      let store: {
        [key: string]: string;
      } = {};

      return {
        getItem: function (key: string) {
          return store[key];
        },
        setItem: function (key: string, value: string) {
          store[key] = value;
        },
        clear: function () {
          store = {};
        },
        removeItem: function (key: string) {
          delete store[key];
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    window.localStorage.clear();
  });
  afterEach(() => {
    fetchMock.restore();

    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });
  });

  it(`should return the local storage integrations list, exactly as it was saved, if the local storage has valid items`, async () => {
    const mockIntegrationKeys = [
      'key-1',
      'key-2',
      'key-3',
      'key-4',
      'key-5',
      'key-6',
      'key-7',
      'key-8',
      'key-9',
    ];

    saveIntegrationListToLocalStorage(aaid, mockIntegrationKeys);

    const integrations = await getIntegrations(aaid);
    expect(createUserSegmentationBasedIntegrationList).toHaveBeenCalledTimes(0);
    expect(integrations).toEqual(mockIntegrationKeys);
  });

  it(`should return the right user seg list, of max length ${MAX_INTEGRATION_KEYS} or less, if local storage is empty and the the user seg call succeeded`, async () => {
    const softwareDevelopment = [
      integrationsKeys.SLACK,
      integrationsKeys.MICROSOFT_TEAMS,
      integrationsKeys.GITHUB,
      integrationsKeys.GITLAB,
      integrationsKeys.CIRCLECI,
      integrationsKeys.ZENDESK,
      integrationsKeys.GOOGLE_SHEETS,
      integrationsKeys.SENTRY,
      integrationsKeys.JENKINS,
    ];

    const itAndCustomerSupport = [
      integrationsKeys.SLACK,
      integrationsKeys.MICROSOFT_TEAMS,
      integrationsKeys.GITHUB,
      integrationsKeys.GITLAB,
      integrationsKeys.ZENDESK,
      integrationsKeys.HALP,
      integrationsKeys.MINDVILLE,
      integrationsKeys.ZOOM,
      integrationsKeys.CIRCLECI,
    ];

    const businessManagementAndOps = [
      integrationsKeys.SLACK,
      integrationsKeys.MICROSOFT_TEAMS,
      integrationsKeys.MICROSOFT_OUTLOOK,
      integrationsKeys.ZENDESK,
      integrationsKeys.GOOGLE_SHEETS,
      integrationsKeys.ZOOM,
      integrationsKeys.CIRCLECI,
      integrationsKeys.ZEPLIN,
      integrationsKeys.FIGMA,
    ];

    const userSegmentationDataMapping: UserSegmentationDataMapping = {
      'Software Development': softwareDevelopment,
      'IT Support': itAndCustomerSupport,
      'Customer Service': itAndCustomerSupport,
      Sales: itAndCustomerSupport,
      Operations: businessManagementAndOps,
      Marketing: businessManagementAndOps,
      Finance: businessManagementAndOps,
      Legal: businessManagementAndOps,
      Other: businessManagementAndOps,
    };

    const teamTypes = [
      'Software Development',
      'IT Support',
      'Customer Service',
      'Sales',
      'Operations',
      'Marketing',
      'Finance',
      'Legal',
      'Other',
    ];

    for (let i = 0; i < teamTypes.length; i++) {
      // Resets
      const teamType = teamTypes[i];
      const expectedListOfIntegrations = userSegmentationDataMapping[
        teamType
      ].slice(0, MAX_INTEGRATION_KEYS);
      window.localStorage.clear();

      mockGetUserSegmentationData.mockResolvedValue({
        title: 'Unknown',
        teamType,
      });

      // Check matching return value
      const integrations = await getIntegrations(aaid);
      expect(integrations).toEqual(expectedListOfIntegrations);

      // Check that localstorage was set correctly
      const integrationsFromLocalStorage = getIntegrationsFromLocalStorage(
        aaid,
      );
      expect(integrationsFromLocalStorage).toEqual(expectedListOfIntegrations);
    }
  });

  it(`should return the default integrations of max length ${MAX_INTEGRATION_KEYS} or less, if empty local storage and the user seg call returns a default response`, async () => {
    const defaultIntegrationKeys = [
      integrationsKeys.SLACK,
      integrationsKeys.MICROSOFT_TEAMS,
      integrationsKeys.GITHUB,
      integrationsKeys.GITLAB,
      integrationsKeys.ZENDESK,
      integrationsKeys.GOOGLE_SHEETS,
      integrationsKeys.CIRCLECI,
      integrationsKeys.SENTRY,
      integrationsKeys.JENKINS,
    ];

    mockGetUserSegmentationData.mockResolvedValue({
      title: 'Unknown',
      teamType: 'Unknown',
    });

    const integrations = await getIntegrations(aaid);

    expect(integrations).toEqual(
      defaultIntegrationKeys.slice(0, MAX_INTEGRATION_KEYS),
    );

    // Check that localstorage is still empty
    const integrationsFromLocalStorage = getIntegrationsFromLocalStorage(aaid);
    expect(integrationsFromLocalStorage).toEqual([]);
  });
});

describe('getIntegrationsInstallStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should correctly return install status if no errors', async () => {
    const mockIntegrations = [
      {
        key: 'key-one',
        mock: (url: string) => fetchMock.mock(url, EXISTS_STATUS_CODE),
        installed: true,
      },
      {
        key: 'key-two',
        mock: (url: string) => fetchMock.mock(url, NOT_EXISTS_STATUS_CODE),
        installed: false,
      },
      {
        key: 'key-three',
        mock: (url: string) => fetchMock.mock(url, EXISTS_STATUS_CODE),
        installed: true,
      },
    ];
    const mockIntegrationsKeys = ['key-one', 'key-two', 'key-three'];

    const expectedStatuses: IntegrationInstallStatusMap = {};
    mockIntegrations.forEach((integration) => {
      const url = getInstallStatusUrlForIntegrationKey(integration.key);
      integration.mock(url);
      expectedStatuses[integration.key] = {
        key: integration.key,
        installed: integration.installed,
      };
    });

    const integrationsStatuses = await getIntegrationsInstallStatus(
      mockIntegrationsKeys,
    );
    expect(integrationsStatuses).toEqual(expectedStatuses);
    mockIntegrations.forEach((integration, index) => {
      expect(fetchMock.calls()[index][0]).toEqual(
        getInstallStatusUrlForIntegrationKey(integration.key),
      );
    });
  });

  it('should throw if trying to call without any integrations keys', async () => {
    await expect(getIntegrationsInstallStatus([])).rejects.toThrow(
      'At least one integration key is required.',
    );
  });

  it('should retry once if there is an unexpected HTTP status code and throw after retry if http error code still unexpected', async () => {
    const url = getInstallStatusUrlForIntegrationKey('key-fail-retry');
    fetchMock.mock(url, 502);

    await expect(
      getIntegrationsInstallStatus(['key-fail-retry']),
    ).rejects.toThrow();

    expect(fetchMock.calls()).toHaveLength(2);
  });

  it('should retry once if there is an unexpected http status code and throw if there is a network error after retry', async () => {
    const key = 'key-failed-retry-throws';

    const url = getInstallStatusUrlForIntegrationKey(key);
    fetchMock.mock(url, INTERNAL_ERROR_STATUS_CODE, { repeat: 1 });

    fetchMock.mock(
      url,
      {
        status: NOT_EXISTS_STATUS_CODE,
        throws: new Error('throw'),
      },
      { overwriteRoutes: false },
    );

    await expect(getIntegrationsInstallStatus([key])).rejects.toThrow('throw');
    expect(fetchMock.calls()).toHaveLength(2);
  });

  it('should not retry first response is 404', async () => {
    const key = 'key-no-retry-404';

    const url = getInstallStatusUrlForIntegrationKey(key);
    fetchMock.mock(url, NOT_EXISTS_STATUS_CODE, { repeat: 1 });

    const expectedStatuses: IntegrationInstallStatusMap = {
      [key]: {
        key,
        installed: false,
      },
    };

    const integrationsStatuses = await getIntegrationsInstallStatus([key]);
    expect(integrationsStatuses).toEqual(expectedStatuses);
    expect(fetchMock.calls()).toHaveLength(1);
  });

  it('should retry once if there is an unexpected http status code and work if receive a valid HTTP response code after retry', async () => {
    const key = 'key-succeed-retry';

    const url = getInstallStatusUrlForIntegrationKey(key);
    fetchMock.mock(url, INTERNAL_ERROR_STATUS_CODE, { repeat: 1 });

    fetchMock.mock(url, EXISTS_STATUS_CODE, {
      overwriteRoutes: false,
    });

    const expectedStatuses: IntegrationInstallStatusMap = {
      [key]: {
        key,
        installed: true,
      },
    };

    const integrationsStatuses = await getIntegrationsInstallStatus([key]);
    expect(integrationsStatuses).toEqual(expectedStatuses);
    expect(fetchMock.calls()).toHaveLength(2);
  });
});

describe('sendIntegrationInstallRequest', () => {
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
      sendIntegrationInstallRequest(
        integrationsKeys.CIRCLECI,
        defaultUserParams.product,
        defaultUserParams.baseUrl,
        defaultUserParams.cloudId,
        '',
      ),
    ).rejects.toThrow('An atlassian Account Id is required');
  });
  it('should send a POST request to the api', async () => {
    const integrationKey = integrationsKeys.SENTRY;
    const integrationFullName = 'Sentry for Jira';

    const url = `/gateway/api/marketplace/internal/demand/app-requests/product-name/jira/cloud-id/${defaultUserParams.cloudId}/app-key/${integrationKey}`;
    fetchMock.post(url, 200);

    await sendIntegrationInstallRequest(
      integrationKey,
      defaultUserParams.product,
      defaultUserParams.baseUrl,
      defaultUserParams.cloudId,
      defaultUserParams.aaid,
    );
    expect(fetchMock.calls()).toHaveLength(1);
    const body = JSON.parse(fetchMock.calls()[0][1].body);
    expect(body).toMatchObject({
      appDetailsUrl: `https://atl-makkuro.jira-dev.com/plugins/servlet/ac/com.atlassian.jira.emcee/discover#!/discover/app/${integrationKey}`,
      appName: integrationFullName,
      comment: `Hi, I'd like to try this app. I think it could be really useful to the team. Thanks!`,
      manageAppRequestUrl:
        'https://atl-makkuro.jira-dev.com/plugins/servlet/ac/com.atlassian.jira.emcee/app-requests#!/manage/app-requests',
      userId: defaultUserParams.aaid,
    });
  });
  it('should throw an error if market place api sends an incorrect status code', async () => {
    const integrationKey = integrationsKeys.SENTRY;
    const url = `/gateway/api/marketplace/internal/demand/app-requests/product-name/jira/cloud-id/${defaultUserParams.cloudId}/app-key/${integrationKey}`;
    fetchMock.post(url, INTERNAL_ERROR_STATUS_CODE);

    await expect(
      sendIntegrationInstallRequest(
        integrationKey,
        defaultUserParams.product,
        defaultUserParams.baseUrl,
        defaultUserParams.cloudId,
        defaultUserParams.aaid,
      ),
    ).rejects.toThrow(
      `Incorrect return status code (${INTERNAL_ERROR_STATUS_CODE}) while fetching ${integrationKey}`,
    );
  });
});

describe('getIntegrationsInstallRequestStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    fetchMock.restore();
  });
  it('should correctly return install request statuses if no errors', async () => {
    const mockIntegrations = [
      {
        key: 'key-one',
        mock: (url: string) => fetchMock.mock(url, EXISTS_STATUS_CODE),
        requested: true,
      },
      {
        key: 'key-two',
        mock: (url: string) => fetchMock.mock(url, NOT_EXISTS_STATUS_CODE),
        requested: false,
      },
      {
        key: 'key-three',
        mock: (url: string) => fetchMock.mock(url, EXISTS_STATUS_CODE),
        requested: true,
      },
    ];
    const mockIntegrationsKeys = ['key-one', 'key-two', 'key-three'];

    const expectedStatuses: IntegrationInstallRequestResponse[] = [];
    mockIntegrations.forEach((integration) => {
      const url = getInstallRequestStatusUrlForIntegrationKey(
        integration.key,
        defaultUserParams.product,
        defaultUserParams.cloudId,
        defaultUserParams.aaid,
      );
      integration.mock(url);
      expectedStatuses.push({
        key: integration.key,
        requested: integration.requested,
      });
    });

    const installRequestStatus = await getIntegrationsInstallRequestStatus(
      mockIntegrationsKeys,
      defaultUserParams.product,
      defaultUserParams.cloudId,
      defaultUserParams.aaid,
    );
    expect(installRequestStatus).toEqual(expectedStatuses);
    mockIntegrations.forEach((integration, index) => {
      expect(fetchMock.calls()[index][0]).toEqual(
        getInstallRequestStatusUrlForIntegrationKey(
          integration.key,
          defaultUserParams.product,
          defaultUserParams.cloudId,
          defaultUserParams.aaid,
        ),
      );
    });
  });
  it('should throw an error if market place api sends an incorrect status code', async () => {
    const integrationKey = 'key-one';
    const url = getInstallRequestStatusUrlForIntegrationKey(
      integrationKey,
      defaultUserParams.product,
      defaultUserParams.cloudId,
      defaultUserParams.aaid,
    );
    fetchMock.mock(url, INTERNAL_ERROR_STATUS_CODE);

    await expect(
      getIntegrationsInstallRequestStatus(
        [integrationKey],
        defaultUserParams.product,
        defaultUserParams.cloudId,
        defaultUserParams.aaid,
      ),
    ).rejects.toThrow(
      `Incorrect return status code (${INTERNAL_ERROR_STATUS_CODE}) while fetching ${integrationKey}`,
    );
  });
});
