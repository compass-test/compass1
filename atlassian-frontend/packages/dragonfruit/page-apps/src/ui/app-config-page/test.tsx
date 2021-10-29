import React from 'react';

import { act, render, RenderResult } from '@testing-library/react';

import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppConfigPage from './main';

const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
const appId = `ari:cloud:ecosystem::app/${appUuid}`;
const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;
const appTitle = 'Bitbucket';

describe('AppConfigPage', () => {
  describe('renders elements of config page', async () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      const mocks = {
        Extension: () => ({
          id: extensionId,
          properties: { title: appTitle, icon: 'iconurl' },
        }),
        App: () => ({ id: appId }),
      };

      wrapper = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider mocks={mocks}>
            <AppConfigPage
              extensionId={extensionId}
              pageUrl="dummy-unused-url"
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );
    });

    test('smoke test', async () => {
      expect((await wrapper.findAllByText(appTitle)).length).toBeGreaterThan(0);
    });

    test('breadcrumbs', async () => {
      const appLink = await wrapper.findByTestId(
        'dragonfruit-page-apps.app-config-page.app-breadcrumb',
      );
      expect(appLink).toBeDefined();
    });
  });

  test('spinner when loading', async () => {
    const { findByTestId } = render(
      <CompassTestProvider>
        <ApolloLoadingProvider>
          <AppConfigPage extensionId={extensionId} pageUrl="dummy-unused-url" />
        </ApolloLoadingProvider>
      </CompassTestProvider>,
    );

    const spinner = await findByTestId(
      'dragonfruit-common-ui.loading-view.loading-spinner',
    );

    expect(spinner).toBeInTheDocument();
  });

  test('uninstall displays success flag', async () => {
    const mocks = {
      Extension: () => ({
        id: extensionId,
        properties: { title: appTitle, icon: 'iconurl' },
      }),
      App: () => ({ id: appId }),
      AppUninstallationResponse: () => ({ success: true }),
    };

    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppConfigPage extensionId={extensionId} pageUrl="dummy-unused-url" />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const uninstallBtn = await wrapper.findByTestId(
      'dragonfruit-page-apps.app-config-page.uninstall-app-btn',
    );

    act(() => uninstallBtn.click());
    const flag = await wrapper.findByTestId(
      'dragonfruit-page-apps.ui.app-config-page.flags.app-uninstall',
    );
    expect(flag).toBeDefined();
  });

  test('uninstall displays error flag', async () => {
    const mocks = {
      Extension: () => ({
        id: extensionId,
        properties: { title: appTitle, icon: 'iconurl' },
      }),
      App: () => ({ id: appId }),
      AppUninstallationResponse: () => ({ success: false }),
    };

    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppConfigPage extensionId={extensionId} pageUrl="dummy-unused-url" />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const uninstallBtn = await wrapper.findByTestId(
      'dragonfruit-page-apps.app-config-page.uninstall-app-btn',
    );
    act(() => uninstallBtn.click());
    const flag = await wrapper.findByTestId(
      'dragonfruit-page-apps.ui.app-config-page.flags.app-uninstall.error',
    );
    expect(flag).toBeDefined();
  });
});
