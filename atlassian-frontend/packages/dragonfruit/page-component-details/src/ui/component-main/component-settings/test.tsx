import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CONFIG_AS_CODE_APP_IDS } from '@atlassian/dragonfruit-external-component-management/constants';
import {
  CompassComponentInRelationshipViewFragment,
  CompassComponentType,
  ComponentSyncEventStatus,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { MockedNonAdminTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCKED_COMPONENT } from '../../../common/mocks';

import messages from './empty-state/messages';

import { ComponentSettings } from './index';

const testComponent: CompassComponentInRelationshipViewFragment = {
  id: 'abc123',
  name: 'Test Component',
  type: CompassComponentType.SERVICE,
};

describe('ComponentSettings', () => {
  describe('Empty state', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      wrapper = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider>
            <ComponentSettings currentComponent={MOCKED_COMPONENT} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );
    });

    it('renders correctly', async () => {
      const emptyState = await wrapper.findByTestId(
        'dragonfruit-page-component-details.ui.settings.empty-state',
      );
      expect(emptyState).toBeInTheDocument();
    });

    it('does not render the right sidebar', () => {
      const sidebar = wrapper.queryByTestId(
        'dragonfruit-page-component-details.ui.right-sidebar',
      );
      expect(sidebar).toBeNull();
    });

    it('shows action button for admins', () => {
      const buttonText = wrapper.getByText(
        messages.installSCMPrompt.defaultMessage,
      );
      expect(buttonText).toBeInTheDocument();
    });

    it('shows info panel for non-admins', async () => {
      wrapper = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider>
            <MockedNonAdminTenantInfoProvider>
              <ComponentSettings currentComponent={MOCKED_COMPONENT} />
            </MockedNonAdminTenantInfoProvider>
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      const infoPanelText = await wrapper.findByText(
        messages.sectionMessageHeading.defaultMessage,
      );
      expect(infoPanelText).toBeInTheDocument();
    });
  });

  it('renders config-as-code setup when a config-as-code app is installed', async () => {
    const mocks = {
      App: () => ({ id: CONFIG_AS_CODE_APP_IDS[0] }),
    };

    const { findByTestId } = render(
      <ApolloAutoMockProvider mocks={mocks}>
        <CompassTestProvider>
          <ComponentSettings currentComponent={testComponent} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(
      await findByTestId('dragonfruit.config-as-code-generated-codeblock'),
    ).toBeInTheDocument();
  });

  it('renders managed settings when component is managed by config-as-code', async () => {
    const managedComponent = Object.assign(testComponent, {
      dataManager: {
        ecosystemAppId: CONFIG_AS_CODE_APP_IDS[0],
        externalSourceURL:
          'https://bitbucket.org/atlassian/atlassian-frontend/src/master/',
        lastSyncEvent: {
          status: ComponentSyncEventStatus.SUCCESS,
          time: new Date().toISOString(),
        },
      },
    });
    const mocks = {
      App: () => ({ id: CONFIG_AS_CODE_APP_IDS[0] }),
    };

    const { findByTestId } = render(
      <ApolloAutoMockProvider mocks={mocks}>
        <CompassTestProvider>
          <ComponentSettings currentComponent={managedComponent} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(
      await findByTestId(
        'dragonfruit-page-component-details.managed-settings.overview',
      ),
    ).toBeInTheDocument();
  });

  it('shows section message error when managed component has server error', async () => {
    const managedComponent = Object.assign(testComponent, {
      dataManager: {
        ecosystemAppId: CONFIG_AS_CODE_APP_IDS[0],
        externalSourceURL:
          'https://bitbucket.org/atlassian/atlassian-frontend/src/master/',
        lastSyncEvent: {
          status: ComponentSyncEventStatus.SERVER_ERROR,
          time: new Date().toISOString(),
        },
      },
    });
    const mocks = {
      App: () => ({ id: CONFIG_AS_CODE_APP_IDS[0] }),
    };

    const { findByTestId } = render(
      <ApolloAutoMockProvider mocks={mocks}>
        <CompassTestProvider>
          <ComponentSettings currentComponent={managedComponent} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(
      await findByTestId(
        'dragonfruit-page-component-details.managed-settings.sync-error-message',
      ),
    ).toBeInTheDocument();
  });

  it('shows section message error when managed component has user error', async () => {
    const managedComponent = Object.assign(testComponent, {
      dataManager: {
        ecosystemAppId: CONFIG_AS_CODE_APP_IDS[0],
        externalSourceURL:
          'https://bitbucket.org/atlassian/atlassian-frontend/src/master/',
        lastSyncEvent: {
          status: ComponentSyncEventStatus.USER_ERROR,
          lastSyncErrors: ['asdf1234', 'qwerty666'],
          time: new Date().toISOString(),
        },
      },
    });
    const mocks = {
      App: () => ({ id: CONFIG_AS_CODE_APP_IDS[0] }),
    };

    const { findByTestId, queryByText } = render(
      <ApolloAutoMockProvider mocks={mocks}>
        <CompassTestProvider>
          <ComponentSettings currentComponent={managedComponent} />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    expect(
      await findByTestId(
        'dragonfruit-page-component-details.managed-settings.sync-error-message',
      ),
    ).toBeInTheDocument();
    expect(await queryByText('asdf1234')).toBeInTheDocument();
  });
});
