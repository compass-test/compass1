import React from 'react';

import { render } from '@testing-library/react';

import { UI_SHOW_NEW_RELIC_APP } from '@atlassian/dragonfruit-feature-flags';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { APP_KEY, getPublishedApp } from '../../../common/constants';

import AppList from './main';

const bbApp = getPublishedApp(APP_KEY.BITBUCKET);
const newRelicApp = getPublishedApp(APP_KEY.NEW_RELIC);
const flags = {
  [UI_SHOW_NEW_RELIC_APP]: false,
};

describe('AppList', () => {
  test('smoke test', async () => {
    const wrapper = render(
      <CompassTestProvider flags={flags}>
        <ApolloAutoMockProvider>
          <AppList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
    expect(await wrapper.findByText(bbApp.name)).toBeInTheDocument();
    expect(await wrapper.queryByText(newRelicApp.name)).toBeNull();
  });

  test('show New Relic app test', async () => {
    const flags = {
      [UI_SHOW_NEW_RELIC_APP]: true,
    };
    const wrapper = render(
      <CompassTestProvider flags={flags}>
        <ApolloAutoMockProvider>
          <AppList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
    expect(await wrapper.findByText(bbApp.name)).toBeInTheDocument();
    expect(await wrapper.findByText(newRelicApp.name)).toBeInTheDocument();
  });

  test('extension id does not match, no configure button', async () => {
    const testAppTitle = 'Test app';
    const mocks = {
      Extension: () => ({
        id:
          'ari:cloud:ecosystem::extension/appUuid/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2',
        properties: { title: testAppTitle, icon: bbApp.imageUrl },
      }),
      App: () => ({
        id: bbApp.ari,
        name: testAppTitle,
      }),
    };

    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    try {
      await wrapper.getAllByTestId(
        'dragonfruit-page-apps.app-card.configure-app-btn.Test-app',
      );
    } catch (error) {
      expect(error.message).toContain('Unable to find an element');
    }
  });

  test('extension id matches, shows configure button', async () => {
    const mocks = {
      Extension: () => ({
        id:
          'ari:cloud:ecosystem::extension/05175914-734f-4887-b303-4ad44d6c3a34/575409ba-ad7d-4f51-9665-d7371cd32854/static/bitbucket-sync-ui',
        properties: { title: bbApp.name, icon: bbApp.imageUrl },
      }),
      App: () => ({
        id: bbApp.ari,
        name: bbApp.name,
      }),
    };

    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
    expect(
      (
        await wrapper.findAllByTestId(
          'dragonfruit-page-apps.app-card.configure-app-btn.Bitbucket',
        )
      ).length,
    ).toBeGreaterThan(0);
  });

  test('lists installed apps', async () => {
    const testAppTitle = 'Test app';
    const mocks = {
      Extension: () => ({
        id:
          'ari:cloud:ecosystem::extension/appUuid/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2',
        properties: { title: testAppTitle, icon: 'https://google.com' },
      }),
      App: () => ({
        id: 'someappid',
        name: testAppTitle,
        vendorName: 'Testing Atlassian',
        description: 'This description is for testing purposes',
      }),
    };

    const wrapper = render(
      <CompassTestProvider flags={flags}>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
    expect(
      await wrapper.findByTestId(
        'dragonfruit-page-apps.app-card.install-app-btn.Bitbucket',
      ),
    ).toBeInTheDocument();
    expect(await wrapper.findByText(bbApp.name)).toBeInTheDocument();
    expect((await wrapper.findAllByText(testAppTitle)).length).toBeGreaterThan(
      0,
    );
    expect(await wrapper.findAllByText('By ' + bbApp.vendor)).not.toBeNull();
    expect(
      await wrapper.findAllByText(new RegExp(bbApp.learnMoreDescription!)),
    ).not.toBeNull();
  });

  test('lists published app configure buttons when installed', async () => {
    const flags = {
      [UI_SHOW_NEW_RELIC_APP]: true,
    };

    const mocks = {
      Extension: () => ({
        id:
          'ari:cloud:ecosystem::extension/64cf65a9-1426-4878-8a92-9aefe254ea2f/8463c146-7f9f-4384-bfaa-10731f0983a4/static/newrelic-integration-admin-page',
        properties: { title: newRelicApp.name, icon: newRelicApp.imageUrl },
      }),
      App: () => ({
        id: newRelicApp.ari,
        name: newRelicApp.name,
        vendorName: newRelicApp.vendor,
        description: newRelicApp.description,
      }),
    };

    const wrapper = render(
      <CompassTestProvider flags={flags}>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppList />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    await wrapper.findAllByText(newRelicApp.name);
    expect(
      wrapper.queryByTestId(
        'dragonfruit-page-apps.app-card.install-app-btn.New Relic',
      ),
    ).toBeNull();
    expect(
      (
        await wrapper.findAllByTestId(
          'dragonfruit-page-apps.app-card.configure-app-btn.New Relic',
        )
      ).length,
    ).toBeGreaterThan(0);
  });
});
