import React from 'react';

import { act, render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { MockedTenantInfoProvider } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import AppCard from './index';

const appName = 'Bitbucket sync';
const appUuid = '34nfdkjsf-e7e3-4e4e-b63e-4f83f1b317ed';
const extensionId = `ari:cloud:ecosystem::extension/${appUuid}/90181aaa-bbb8-4ce0-b426-622313841eb9/static/compass-forge-hello-world2`;

describe('AppCard', () => {
  test('smoke test', async () => {
    const wrapper = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <AppCard
            name={appName}
            imageUrl=""
            appId=""
            isInstalled={false}
            intlKey={'test'}
          />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );
    expect(await wrapper.getByText(appName)).toBeInTheDocument();
  });

  test('successful app install', async () => {
    const mockCallback = jest.fn(
      (success: boolean, installationId?: string | null) => {
        expect(success).toBeTruthy();
        expect(installationId).toEqual('abc');
      },
    );

    const mocks = {
      AppInstallationResponse: () => ({ success: true, installationId: 'abc' }),
    };

    const wrapper = render(
      <ApolloAutoMockProvider mocks={mocks}>
        <CompassTestProvider>
          <AppCard
            name={appName}
            imageUrl=""
            appId=""
            isInstalled={false}
            postInstallCallback={mockCallback}
            intlKey={'test'}
          />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );
    const installBtn = await wrapper.getByTestId(
      `dragonfruit-page-apps.app-card.install-app-btn.${appName}`,
    );
    act(() => {
      installBtn.click();
    });
  });

  test('unsuccessful app install', async () => {
    const mockCallback = jest.fn(
      (success: boolean, installationId?: string | null) => {
        expect(success).toBeFalsy();
      },
    );

    const mocks = {
      AppInstallationResponse: () => ({ success: false }),
    };

    const wrapper = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider mocks={mocks}>
          <AppCard
            name={appName}
            imageUrl=""
            appId=""
            isInstalled={false}
            postInstallCallback={mockCallback}
            intlKey={'test'}
          />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    const installBtn = await wrapper.getByTestId(
      `dragonfruit-page-apps.app-card.install-app-btn.${appName}`,
    );
    act(() => {
      installBtn.click();
    });
  });

  test('displays option to install when app is not installed', async () => {
    const wrapper = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <AppCard
            name={appName}
            imageUrl=""
            appId=""
            isInstalled={false}
            intlKey={'test'}
          />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );
    expect(
      await wrapper.getByTestId(
        `dragonfruit-page-apps.app-card.install-app-btn.${appName}`,
      ),
    ).toBeInTheDocument();
  });

  test('displays option to configure when app is installed', async () => {
    const wrapper = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <AppCard
            name={appName}
            imageUrl=""
            appId=""
            isInstalled={true}
            extensionId={extensionId}
            intlKey={'test'}
          />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );
    expect(
      await wrapper.getByTestId(
        `dragonfruit-page-apps.app-card.configure-app-btn.${appName}`,
      ),
    ).toBeInTheDocument();
  });

  test('displays not installed when app is not installed and user is not admin', async () => {
    const wrapper = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <MockedTenantInfoProvider data={{ permissions: [] }}>
            <AppCard
              name={appName}
              imageUrl=""
              appId=""
              isInstalled={false}
              extensionId={extensionId}
              intlKey={'test'}
            />
          </MockedTenantInfoProvider>
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );
    expect(await wrapper.findByText('Not installed')).toBeInTheDocument();
  });

  test('displays installed when app is installed and user is not admin', async () => {
    const wrapper = render(
      <ApolloAutoMockProvider>
        <MockedTenantInfoProvider data={{ permissions: [] }}>
          <CompassTestProvider>
            <MockedTenantInfoProvider data={{ permissions: [] }}>
              <AppCard
                name={appName}
                imageUrl=""
                appId=""
                isInstalled={true}
                extensionId={extensionId}
                intlKey={'test'}
              />
            </MockedTenantInfoProvider>
          </CompassTestProvider>
        </MockedTenantInfoProvider>
      </ApolloAutoMockProvider>,
    );
    expect(
      await wrapper.getByTestId(
        'dragonfruit-page-apps.app-card.installed-check-icon',
      ),
    ).toBeInTheDocument();
  });

  test('displays documentation url when provided', async () => {
    const description = 'description is this {LearnMore}';
    const learnMore = 'Learn more';
    const docUrl = 'https://developer.atlassian.com';
    const wrapper = render(
      <ApolloAutoMockProvider>
        <MockedTenantInfoProvider data={{ permissions: [] }}>
          <CompassTestProvider>
            <MockedTenantInfoProvider data={{ permissions: [] }}>
              <AppCard
                name={appName}
                imageUrl=""
                appId=""
                description={description}
                documentationUrl={docUrl}
                learnMoreDescription={learnMore}
                isInstalled={true}
                intlKey={'test'}
              />
            </MockedTenantInfoProvider>
          </CompassTestProvider>
        </MockedTenantInfoProvider>
      </ApolloAutoMockProvider>,
    );

    expect(wrapper.getByText('Learn more')).toBeDefined();
  });

  test('does not display documentation url when not provided', async () => {
    const description = 'description is this';
    const wrapper = render(
      <ApolloAutoMockProvider>
        <MockedTenantInfoProvider data={{ permissions: [] }}>
          <CompassTestProvider>
            <MockedTenantInfoProvider data={{ permissions: [] }}>
              <AppCard
                name={appName}
                imageUrl=""
                appId=""
                description={description}
                isInstalled={true}
                intlKey={'test'}
              />
            </MockedTenantInfoProvider>
          </CompassTestProvider>
        </MockedTenantInfoProvider>
      </ApolloAutoMockProvider>,
    );
    expect(
      await wrapper.getByTestId(
        'dragonfruit-page-apps.app-card.app-description',
      ).textContent,
    ).toBe(description);
  });
});
