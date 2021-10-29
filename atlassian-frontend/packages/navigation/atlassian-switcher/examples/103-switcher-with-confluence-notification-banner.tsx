import React from 'react';
import { mockEndpoints } from '@atlassian/switcher-test-utils';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher, {
  createProviderWithCustomFetchData,
  ExportedDataProvider,
} from '../src';
import { createJoinableSitesProvider } from '../src/cross-join/providers/default-joinable-sites-provider';
import { AvailableProductsResponse, JoinableSitesResponse } from '../src/types';
import mockJoinableSites from '../test-helpers/mockJoinableSites';
import { FakeTrelloChrome } from './helpers/FakeTrelloChrome';

const fetchJoinableSites: () => Promise<JoinableSitesResponse> = () =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({ sites: mockJoinableSites.sites } as JoinableSitesResponse),
      1000,
    );
  });

export const createMockAvailableProductsProvider = (): ExportedDataProvider<
  AvailableProductsResponse
> => {
  return createProviderWithCustomFetchData<AvailableProductsResponse>(
    'availableProducts',
    () =>
      Promise.resolve({
        isPartial: false,
        sites: [
          {
            adminAccess: false,
            availableProducts: [
              {
                productType: 'CONFLUENCE',
                url: null,
              },
              {
                productType: 'JIRA_SOFTWARE',
                url: null,
              },
            ],
            cloudId: '0706eddc-00d7-4e1c-9268-ee3c1d2408cc',
            displayName: 'sre-ehlo',
            url: 'https://sre-ehlo.jira-dev.com',
            avatar:
              'https://site-admin-avatar-cdn.staging.public.atl-paas.net/avatars/240/rings.png',
          },
          {
            adminAccess: false,
            availableProducts: [
              {
                productType: 'CONFLUENCE',
                url: null,
              },
              {
                productType: 'JIRA_BUSINESS',
                url: null,
              },
            ],
            cloudId: '536e586b-06fe-4550-b084-4e5b12ede8c5',
            displayName: 'atl-vertigo-product-fabric-testing',
            url: 'https://atl-vertigo-product-fabric-testing.jira-dev.com',
            avatar:
              'https://site-admin-avatar-cdn.staging.public.atl-paas.net/avatars/240/site.png',
          },
        ],
      } as any),
  );
};

const customJoinableSitesDataProvider = createJoinableSitesProvider(
  fetchJoinableSites,
);

class SwitcherWithConfluenceNotificationBanner extends React.Component {
  state = {
    showConfluenceBannerNotification: true,
  };

  componentDidMount() {
    mockEndpoints('😏', (originalMockData) => originalMockData, {
      containers: 1000,
      xflow: 500,
      permitted: 2000,
      appswitcher: 1500,
    });
  }

  onClose = () => {};

  render() {
    return (
      <FakeTrelloChrome>
        <AtlassianSwitcher
          product="trello"
          appearance="standalone"
          cloudId="some-cloud-id"
          availableProductsDataProvider={createMockAvailableProductsProvider()}
          joinableSitesDataProvider={customJoinableSitesDataProvider}
          confluenceAutoProvisionedSiteFromTrello={{
            showConfluenceBannerNotification: this.state
              .showConfluenceBannerNotification,
            onConfluenceBannerNotificationClicked: () =>
              this.setState({ showConfluenceBannerNotification: false }),
            displayedBannerMessage:
              'Free with Trello! Create content, organize your thoughts, and link it all to your boards.',
          }}
          onClose={this.onClose}
        />
      </FakeTrelloChrome>
    );
  }
}

export default withIntlProvider(
  withAnalyticsLogger(SwitcherWithConfluenceNotificationBanner),
);
