import { renderHook } from '@testing-library/react-hooks';

import { useTourReset } from '../../../common/services/tour-reset';
import { Product, ProductTourKey, UrlData } from '../../../common/types';

import { FetchMock } from 'jest-fetch-mock';

interface ExtendedGlobal extends NodeJS.Global {
  fetch: FetchMock;
}

const extendedGlobal: ExtendedGlobal = global;

const { Welcome, ChangeManagement, IncidentManagement } = ProductTourKey;

describe('useTourReset', () => {
  const urlData = {
    serviceDeskBaseUrl: 'some-base-url',
    projectId: 'some-project-id',
    product: Product.ServiceDesk,
  } as UrlData;

  const originalLocation = window.location;
  const originalOpen = window.open;
  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    window.open = jest.fn();
    // @ts-ignore
    window.location = {};
    Object.defineProperties(window.location, {
      assign: { value: jest.fn() },
    });
  });
  afterAll(() => {
    window.location = originalLocation;
    window.open = originalOpen;
  });

  afterEach(() => {
    extendedGlobal.fetch.resetMocks();
  });

  const urls = [
    [
      Welcome,
      'some-base-url/rest/servicedesk/onboarding/1/your-coach/reset-tour/some-project-id/fsf-project-tour',
    ],
    [
      ChangeManagement,
      'some-base-url/rest/servicedesk/onboarding/1/your-coach/reset-tour/some-project-id/change-management',
    ],
    [
      IncidentManagement,
      'some-base-url/rest/servicedesk/onboarding/1/your-coach/reset-tour/some-project-id/incident-management',
    ],
  ];

  it.each(urls)(
    'when restarting in Opsgenie %s should redirect to %s',
    async (tourKey, url) => {
      await renderHook(() =>
        useTourReset(
          {
            ...urlData,
            product: Product.Opsgenie,
          },
          tourKey as ProductTourKey,
        ),
      ).result.current();

      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    },
  );

  it.each(urls)(
    'when restarting in Jira %s should redirect to %s',
    async (tourKey, url) => {
      await renderHook(() =>
        useTourReset(urlData, tourKey as ProductTourKey),
      ).result.current();

      expect(window.location.assign).toHaveBeenCalledWith(url);
    },
  );
});
