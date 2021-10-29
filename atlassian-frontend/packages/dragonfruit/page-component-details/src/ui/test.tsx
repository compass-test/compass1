import React from 'react';

import { render, within } from '@testing-library/react';

import { UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentType,
  CompassLink,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
  FakeCompassComponentResultQueryError,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentDetailsPage from './main';
import messages from './messages';

const mockAddRecentComponent = jest.fn();

jest.mock('@atlassian/compass-search-cache', () => ({
  ...(jest.requireActual('@atlassian/compass-search-cache') as Object),
  useCompassRecents: () => ({
    addRecentComponent: mockAddRecentComponent,
  }),
}));

describe('ComponentDetailsPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('when successful', () => {
    it('can see the component name in the left sidebar', async () => {
      // Define these fields manually so that we can search for them
      const testName = 'My Component';

      const mocks = {
        CompassComponent: () => ({ name: testName }),
      };

      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const sidebar = await findByTestId(
        'dragonfruit-page-component-details.ui.left-sidebar',
      );

      const { findByText } = within(sidebar);

      const name = await findByText(testName);

      expect(name).toBeInTheDocument();
    });

    it('can see the component owner card in the right sidebar', async () => {
      const mocks = {
        CompassComponent: () => ({ name: 'My Component' }),
      };

      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const ownerCard = await findByTestId(
        'dragonfruit.teams.component-owner-card',
      );

      expect(ownerCard).toBeInTheDocument();
    });

    it('can see the component name in the main content', async () => {
      // Define these fields manually so that we can search for them
      const testName = 'My Component';

      const mocks = {
        CompassComponent: () => ({ name: testName }),
      };

      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const main = await findByTestId(
        'dragonfruit-page-component-details.ui.main',
      );

      const { findAllByText } = within(main);

      const names = await findAllByText(testName);

      expect(names).toHaveLength(1);
    });

    it('can see the component description', async () => {
      // Define these fields manually so that we can search for them
      const testDescription = 'My Component Description';

      const mocks = {
        CompassComponent: () => ({ description: testDescription }),
      };

      const { findByText } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const description = await findByText(testDescription);

      expect(description).toBeInTheDocument();
    });

    it('shows the managed component section message if flag is on', async () => {
      const flags = {
        [UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED]: true,
      };

      const mocks = {
        CompassComponent: () => ({ dataManager: null }),
      };

      const { findByTestId } = render(
        <CompassTestProvider flags={flags}>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const section = await findByTestId('managed-component-section-message');

      expect(section).toBeInTheDocument();
    });

    it('does not show the managed component section message if flag is on but component is already managed externally', async () => {
      const flags = {
        [UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED]: true,
      };

      const mocks = {
        CompassComponent: () => ({ name: 'test' }),
      };

      const { queryByTestId } = render(
        <CompassTestProvider flags={flags}>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const section = await queryByTestId('managed-component-section-message');

      expect(section).toBeNull();
    });

    it('does not show the managed component section message by default', async () => {
      const mocks = {
        CompassComponent: () => ({ name: 'test' }),
      };

      const { queryByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const section = await queryByTestId('managed-component-section-message');

      expect(section).toBeNull();
    });

    it('can see the links on the page', async () => {
      // Manually set the links our mock component returns
      const testLinks: CompassLink[] = [
        {
          url: 'https://google.com',
          name: 'Google',
          id: 'fake-id',
          type: CompassLinkType.REPOSITORY,
        },
      ];

      const mocks = {
        CompassComponent: () => ({ links: testLinks }),
      };

      // Render the page
      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      // Find the main section
      const main = await findByTestId(
        'dragonfruit-page-component-details.ui.main',
      );
      const { findByText } = within(main);

      // Check that all link sections exist in the document
      const repositories = await findByText('Repositories');
      const documentation = await findByText('Documentation');
      const projects = await findByText('Projects');
      const dashboards = await findByText('Dashboards');
      const other = await findByText('Other links');

      expect(repositories).toBeInTheDocument();
      expect(documentation).toBeInTheDocument();
      expect(projects).toBeInTheDocument();
      expect(dashboards).toBeInTheDocument();
      expect(other).toBeInTheDocument();
    });

    it('adds the component to the recently viewed cache', async () => {
      const testComponent = {
        id: '12345',
        name: 'My Component',
        ownerId: 'My Owner',
      };

      const mocks = {
        CompassComponent: () => testComponent,
      };

      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId={testComponent.id} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const sidebar = await findByTestId(
        'dragonfruit-page-component-details.ui.left-sidebar',
      );

      const { findByText } = within(sidebar);

      const name = await findByText(testComponent.name);

      expect(name).toBeInTheDocument();
      expect(mockAddRecentComponent).toHaveBeenCalledTimes(1);

      // The mocked component provided by ApolloAutoMockProvider contains many more fields.
      // We expect the mocked component to include the fields defined in testComponent.
      expect(mockAddRecentComponent).toHaveBeenCalledWith(
        expect.objectContaining(testComponent),
      );
    });
  });

  describe("when there's a partial response", () => {
    it('it can render with only the non-nullable fields available', async () => {
      // Define these fields manually so that we can search for them
      const testId = '12345';
      const testName = 'My Component';
      const testType = CompassComponentType.SERVICE;

      const mocks = {
        CompassComponent: () => ({
          id: testId,
          name: testName,
          type: testType,

          // The fields below could hypothetically return null, so we force them to do so
          // We let auto-mock generate the rest of the required data
          applicableScorecards: null,
          dataManager: null,
          description: null,
          externalAliases: null,
          fields: null,
          labels: null,
          links: null,
          ownerId: null,
          scorecardScores: null,
          scorecards: null,
          relationships: null,
          events: null,
        }),
      };

      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId={testId} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const sidebar = await findByTestId(
        'dragonfruit-page-component-details.ui.left-sidebar',
      );

      const { findByText } = within(sidebar);

      const name = await findByText(testName);
      expect(name).toBeInTheDocument();

      const type = await findByText('Service');
      expect(type).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('can see the spinner', async () => {
      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloLoadingProvider>
            <ComponentDetailsPage componentId="12345" />
          </ApolloLoadingProvider>
        </CompassTestProvider>,
      );

      const spinner = await findByTestId(
        'component-details-page.loading-spinner',
      );

      expect(spinner).toBeInTheDocument();
    });

    it('does not add the component to the recently viewed cache while loading', async () => {
      const { findByTestId } = render(
        <CompassTestProvider>
          <ApolloLoadingProvider>
            <ComponentDetailsPage componentId="12345" />
          </ApolloLoadingProvider>
        </CompassTestProvider>,
      );

      const spinner = await findByTestId(
        'component-details-page.loading-spinner',
      );

      expect(spinner).toBeInTheDocument();
      expect(mockAddRecentComponent).toHaveBeenCalledTimes(0);
    });
  });

  describe("when there's a network error", () => {
    it('can see the error heading', async () => {
      const { findByText } = render(
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <ComponentDetailsPage componentId="12345" />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>,
      );

      const errorHeading = await findByText(
        messages.errorStateHeading.defaultMessage,
      );

      expect(errorHeading).toBeInTheDocument();
    });

    it('does not add the component to the recently viewed cache on network error', async () => {
      const { findByText } = render(
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <ComponentDetailsPage componentId="12345" />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>,
      );

      const errorHeading = await findByText(
        messages.errorStateHeading.defaultMessage,
      );

      expect(errorHeading).toBeInTheDocument();
      expect(mockAddRecentComponent).toHaveBeenCalledTimes(0);
    });
  });

  describe("when there's a query error", () => {
    it('can see the error heading', async () => {
      // Force a QueryError to be returned
      const mocks = {
        CompassComponentResult: FakeCompassComponentResultQueryError,
      };

      const { findByText } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const errorHeading = await findByText(
        messages.errorStateHeading.defaultMessage,
      );

      expect(errorHeading).toBeInTheDocument();
    });

    it('does not add the component to the recently viewed cache on query error', async () => {
      // Force a QueryError to be returned
      const mocks = {
        CompassComponentResult: FakeCompassComponentResultQueryError,
      };

      const { findByText } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <ComponentDetailsPage componentId="12345" />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      const errorHeading = await findByText(
        messages.errorStateHeading.defaultMessage,
      );

      expect(errorHeading).toBeInTheDocument();
      expect(mockAddRecentComponent).toHaveBeenCalledTimes(0);
    });
  });
});
