import { of } from 'rxjs/observable/of';

import * as fetchJson$Module from '../../common/fetch/as-json-stream';
import { ProductKeys } from '../context/types';

import {
  CONFLUENCE_CREATE_SPACE_URL,
  CONFLUENCE_QUERY_SPACES_URL,
  fetchProjectSpaceLinkViaXflow$,
  getLicenseInformationUrl,
  getProjectSpaceLinkUrl,
  getSpaceContentUrl,
  requestConfluenceSpaces$,
  requestCreateConfluenceSpace$,
  requestProductLicenceState$,
  retrieveRootPageId$,
} from './requests';

const MOCK_CLOUD_ID = 'some-cloud-id';
const MOCK_JIRA_PROJECT_KEY = 'some-jira-project';
const MOCK_SPACE_KEY = 'some-space-key';
const MOCK_SPACE_NAME = 'some-space-name';
const MOCK_SPACE_BASE_URL = '/some-space-base-url';
const MOCK_SPACE_WEBUI_URL = '/some-space-webui-url';

const successfulConfluenceCreationResponse = {
  key: MOCK_SPACE_KEY,
  _links: {
    webui: MOCK_SPACE_WEBUI_URL,
    base: MOCK_SPACE_BASE_URL,
  },
};

const samplePromotedSpaceData = {
  id: 'OP',
  text: 'Optimus Prime',
};

const sampleOtherSpaceData = {
  id: 'MEGATRON',
  text: 'MEGATRON',
};

const successfulConfluenceSpacesResponse = {
  promotedSpaces: {
    spaces: [samplePromotedSpaceData],
    resultsLimit: 10,
    resultsTruncated: false,
  },
  otherSpaces: {
    spaces: [sampleOtherSpaceData],
    resultsLimit: 1000,
    resultsTruncated: false,
  },
};

const activeResponse = {
  hostname: 'some-instance',
  maintenanceEndDate: '2017-10-31',
  maintenanceStartDate: '2017-10-24',
  products: {
    [ProductKeys.CONFLUENCE]: {
      billingPeriod: 'MONTHLY',
      trialEndDate: '2017-11-30',
      state: 'ACTIVE',
    },
    [ProductKeys.JIRA_SOFTWARE]: {
      billingPeriod: 'MONTHLY',
      trialEndDate: '2017-10-31',
      state: 'ACTIVE',
    },
  },
};

const inactiveResponse = {
  hostname: 'some-instance',
  maintenanceEndDate: '2017-10-31',
  maintenanceStartDate: '2017-10-24',
  products: {
    [ProductKeys.JIRA_SOFTWARE]: {
      billingPeriod: 'MONTHLY',
      trialEndDate: '2017-10-31',
      state: 'ACTIVE',
    },
  },
};

const orphanedPage = {
  id: 1234,
  _links: {
    webui: '/spaces/MOCK/pages/123456/Orphaned+page',
  },
};

const spaceHome = {
  id: 5678,
  _links: {
    webui: '/spaces/MOCK/overview',
  },
};

const spaceHomeWithoutOverview = {
  id: 1357,
  _links: {
    webui: '/spaces/MOCK',
  },
};

const spaceContentWithTwoRootPages = {
  page: {
    results: [orphanedPage, spaceHome],
  },
};

const spaceContentWithoutOverviewEnding = {
  page: {
    results: [spaceHomeWithoutOverview],
  },
};

jest.mock('../../common/fetch/as-json-stream', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Project Pages requests', () => {
  let fetchJsonMock = fetchJson$Module.default as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should request for active product state', () => {
    const licenseInfoReponse = of(activeResponse);
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case getLicenseInformationUrl(MOCK_CLOUD_ID):
          return licenseInfoReponse;
      }
    });

    return requestProductLicenceState$(MOCK_CLOUD_ID)
      .do((output) => {
        expect(output).toEqual({
          hostname: 'some-instance',
          maintenanceEndDate: '2017-10-31',
          maintenanceStartDate: '2017-10-24',
          products: {
            [ProductKeys.CONFLUENCE]: {
              billingPeriod: 'MONTHLY',
              state: 'ACTIVE',
              trialEndDate: '2017-11-30',
            },
            [ProductKeys.JIRA_SOFTWARE]: {
              billingPeriod: 'MONTHLY',
              state: 'ACTIVE',
              trialEndDate: '2017-10-31',
            },
          },
        });
      })
      .toPromise();
  });

  test('should request for inactive product state', () => {
    const licenseInfoReponse = of(inactiveResponse);
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case getLicenseInformationUrl(MOCK_CLOUD_ID):
          return licenseInfoReponse;
      }
    });

    return requestProductLicenceState$(MOCK_CLOUD_ID)
      .do((output) => {
        expect(output).toEqual({
          hostname: 'some-instance',
          maintenanceEndDate: '2017-10-31',
          maintenanceStartDate: '2017-10-24',
          products: {
            [ProductKeys.JIRA_SOFTWARE]: {
              billingPeriod: 'MONTHLY',
              state: 'ACTIVE',
              trialEndDate: '2017-10-31',
            },
          },
        });
      })
      .toPromise();
  });

  test('should request for confluence space creation', () => {
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case CONFLUENCE_CREATE_SPACE_URL:
          return of(successfulConfluenceCreationResponse);
      }
    });

    return requestCreateConfluenceSpace$(
      MOCK_SPACE_NAME,
      MOCK_SPACE_KEY,
      MOCK_JIRA_PROJECT_KEY,
    )
      .do((output) => {
        expect(output).toEqual({
          spaceKey: MOCK_SPACE_KEY,
          projectKey: MOCK_JIRA_PROJECT_KEY,
          spaceUrl: `${MOCK_SPACE_BASE_URL}${MOCK_SPACE_WEBUI_URL}`,
        });
      })
      .toPromise();
  });

  test('should request for confluence spaces', () => {
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case CONFLUENCE_QUERY_SPACES_URL:
          return of(successfulConfluenceSpacesResponse);
      }
    });

    return requestConfluenceSpaces$()
      .do((output) => {
        expect(output).toEqual([samplePromotedSpaceData, sampleOtherSpaceData]);
      })
      .toPromise();
  });

  test('should request for project spaces link', () => {
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case getProjectSpaceLinkUrl(MOCK_CLOUD_ID, MOCK_JIRA_PROJECT_KEY):
          return of({ spaceKey: 'SUCCESS', pageId: 1000 });
      }
    });

    return fetchProjectSpaceLinkViaXflow$(MOCK_CLOUD_ID, MOCK_JIRA_PROJECT_KEY)
      .do((output) => {
        expect(output).toEqual({ spaceKey: 'SUCCESS', pageId: 1000 });
      })
      .toPromise();
  });

  test('should find the root page for a confluence space', () => {
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case getSpaceContentUrl(MOCK_SPACE_KEY):
          return of(spaceContentWithTwoRootPages);
      }
    });

    return retrieveRootPageId$(MOCK_SPACE_KEY)
      .do((output) => {
        expect(output).toEqual(spaceHome.id);
      })
      .toPromise();
  });

  test('should return the first result if no /overview found', () => {
    fetchJsonMock.mockImplementation((args) => {
      switch (args) {
        case getSpaceContentUrl(MOCK_SPACE_KEY):
          return of(spaceContentWithoutOverviewEnding);
      }
    });

    return retrieveRootPageId$(MOCK_SPACE_KEY)
      .do((output) => {
        expect(output).toEqual(spaceHomeWithoutOverview.id);
      })
      .toPromise();
  });
});
