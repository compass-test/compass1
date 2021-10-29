import React from 'react';
import SettingsGlyph from '@atlaskit/icon/glyph/settings';
import { mapResultsToSwitcherProps } from '../../map-results-to-switcher-props';
import {
  ResultLoading,
  Status,
  ResultComplete,
  ResultError,
} from '../../../providers/as-data-provider';
import {
  AvailableProductsResponse,
  AvailableSite,
  SwitcherProductType,
  AvailableProduct,
  Product,
  CustomLinksResponse,
  RecommendationsEngineResponse,
  JoinableSitesResponse,
  CollaborationGraphContainersResponse,
  CollaborationGraphRecentContainerType,
  ProductKey,
  ProductConfigurationResponse,
  FeatureMap,
} from '../../../../types';
import { PRODUCT_CONFIGURATION_MAP } from '../../../providers/product-configuration-provider';
import { createIcon } from '../../icon-themes';
import { FormattedMessage } from 'react-intl';

const defaultFeatures: FeatureMap = {
  disableCustomLinks: false,
  enableRecentContainers: true,
  enableRemoteConfiguration: false,
  enableRemoteAdminLinks: false,
  xflow: true,
  isProductStoreInTrelloJSWFirstEnabled: false,
  isProductStoreInTrelloConfluenceFirstEnabled: false,
  isSlackDiscoveryEnabled: false,
};

describe('map-results-to-switcher-props', () => {
  describe('show heading and start link based on product and act959Enabled FF', () => {
    [
      {
        product: Product.JIRA,
        expected: {
          showStartLink: true,
        },
      },
      {
        product: Product.CONFLUENCE,
        expected: {
          showStartLink: true,
        },
      },
      // Expecting false
      {
        product: Product.START,
        expected: {
          showStartLink: false,
        },
      },
    ].forEach(({ product, expected }) => {
      it(`returns showStartLink ${expected.showStartLink} if the product is ${product}`, () => {
        const props = mapResultsToSwitcherProps(
          null,
          {
            ...loadingProvidersResult,
            availableProducts: asCompletedProvider<AvailableProductsResponse>({
              links: [],
              sites: [],
              isPartial: false,
            }),
          },
          defaultFeatures,
          () => {},
          () => {},
          product,
        );

        expect(props.showStartLink).toEqual(expected.showStartLink);
      });
    });
  });
  describe('hasLoaded flags', () => {
    it('account-centric hasLoadedCritical is set when license information has been loaded', () => {
      const props = mapResultsToSwitcherProps(
        null,
        loadingProvidersResult,
        defaultFeatures,
        () => {},
        () => {},
      );

      expect(props.hasLoadedCritical).toEqual(true);
      expect(props.hasLoaded).toEqual(false);
    });

    it('account-centric hasLoaded is set when license information + permissions + product recommendations have been loaded', () => {
      const props = mapResultsToSwitcherProps(
        null,
        {
          ...loadingProvidersResult,
          productConfiguration: asCompletedProvider<
            ProductConfigurationResponse
          >({ products: PRODUCT_CONFIGURATION_MAP, links: {} }),
          isXFlowEnabled: asCompletedProvider(true),
          managePermission: asCompletedProvider(true),
          productRecommendations: asCompletedProvider([]),
        },
        defaultFeatures,
        () => {},
        () => {},
      );

      expect(props.hasLoadedCritical).toEqual(true);
      expect(props.hasLoaded).toEqual(true);
    });

    it('hasLoaded is not blocked on failed request', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          isXFlowEnabled: asFailedProvider(),
          managePermission: asFailedProvider(),
          productRecommendations: asFailedProvider(),
        },
        defaultFeatures,
        () => {},
        () => {},
      );

      expect(props.hasLoadedCritical).toEqual(true);
      expect(props.hasLoaded).toEqual(true);
    });

    it('xflow does not block hasLoaded if not enabled', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          managePermission: asCompletedProvider(true),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
      );

      expect(props.hasLoadedCritical).toEqual(true);
      expect(props.hasLoaded).toEqual(true);
    });
  });

  describe('user-centric products', () => {
    it('displays the products in alphabetical order with an expand link', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [
              generateSite('emu', 'JIRA_SERVICE_DESK'),
              generateSite('frillneckedlizard', 'JIRA_SOFTWARE'),
              generateSite('dropbear', 'JIRA_BUSINESS'),
              generateSite('canetoad', 'JIRA_SOFTWARE'),
              generateSite('bilby', 'CONFLUENCE'),
              generateSite('koala', 'JIRA_SOFTWARE'),
              generateSite('australianfauna', 'JIRA_SOFTWARE'),
            ],
          }),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          description: 'australianfauna',
          label: 'Jira Software',
          href:
            'https://australianfauna.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
          childItems: [
            {
              label: 'australianfauna',
              href:
                'https://australianfauna.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },
            {
              label: 'canetoad',
              href:
                'https://canetoad.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },
            {
              label: 'frillneckedlizard',
              href:
                'https://frillneckedlizard.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },
            {
              label: 'koala',
              href:
                'https://koala.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },
          ],
        },
        {
          description: 'emu',
          label: 'Jira Service Management',
          href:
            'https://emu.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
          childItems: [],
        },
        {
          description: 'dropbear',
          label: 'Jira Core',
          href:
            'https://dropbear.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=business',
          childItems: [],
        },
        {
          description: 'bilby',
          label: 'Confluence',
          href: 'https://bilby.atlassian.net/wiki',
          childItems: [],
        },
      ]);
    });

    it('shows the current site at the top of the product by default', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [
              generateSite('site60', 'JIRA_SOFTWARE'),
              generateSite('site30', 'JIRA_SOFTWARE'),
              generateSite('site10', 'JIRA_SOFTWARE'),
              generateSite(CLOUD_ID, 'JIRA_SOFTWARE'),
            ],
          }),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          description: CLOUD_ID,
          label: 'Jira Software',
          href: `https://${CLOUD_ID}.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software`,
          childItems: [
            {
              label: 'site10',
              href:
                'https://site10.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },

            {
              label: 'site30',
              href:
                'https://site30.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },
            {
              label: 'site60',
              href:
                'https://site60.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software',
            },
            {
              label: CLOUD_ID,
              href: `https://${CLOUD_ID}.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software`,
            },
          ],
        },
      ]);
    });

    it('shows descriptions for products that belong to multiple sites', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [
              generateSite('site50', 'JIRA_SERVICE_DESK'),
              generateSite('site30', 'JIRA_BUSINESS'),
              generateSite('site20', 'OPSGENIE'),
              generateSite('site40', 'CONFLUENCE'),
              generateSite('bitbucket', 'BITBUCKET'),
            ],
          }),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          description: 'site50',
          label: 'Jira Service Management',
          childItems: [],
        },
        { description: 'site30', label: 'Jira Core', childItems: [] },
        { description: 'site40', label: 'Confluence', childItems: [] },
        { description: 'site20', label: 'Opsgenie', childItems: [] },
        { label: 'Bitbucket', childItems: [] },
      ]);
    });

    it('does not show descriptions for products that belong to a single site', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [
              generateSite('site10', 'JIRA_SERVICE_DESK'),
              generateSite('site10', 'JIRA_BUSINESS'),
              generateSite('site10', 'CONFLUENCE'),
              generateSite('bitbucket', 'BITBUCKET'),
            ],
          }),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
      );

      expect(props.licensedProductLinks).toMatchObject([
        { label: 'Jira Service Management', childItems: [] },
        { label: 'Jira Core', childItems: [] },
        { label: 'Confluence', childItems: [] },
        { label: 'Bitbucket', childItems: [] },
      ]);
    });

    it('renders opsgenie and bitbucket correctly', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...loadingProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [
              generateSite('opsgenie', 'OPSGENIE', 'https://app.opsgenie.com'),
              generateSite('bitbucket', 'BITBUCKET', 'https://bitbucket.org'),
            ],
          }),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          description: 'opsgenie',
          label: 'Opsgenie',
          href: 'https://app.opsgenie.com',
          childItems: [],
        },
        {
          label: 'Bitbucket',
          href: 'https://bitbucket.org',
          childItems: [],
        },
      ]);
    });

    it('shows manage list if custom links are enabled', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          customLinks: asCompletedProvider<CustomLinksResponse>([
            {
              key: 'home',
              link:
                'https://some-random-instance.atlassian.net/secure/MyJiraHome.jspa',
              label: 'Jira',
              local: true,
            },
          ]),
          managePermission: asCompletedProvider(true),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite('site40', 'CONFLUENCE')],
          }),
        },
        {
          ...defaultFeatures,
          xflow: false,
        },
        () => {},
        () => {},
        Product.CONFLUENCE,
      );

      expect(props.showManageLink).toBe(true);
    });

    it('does not shows manage list if custom links are disabled', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          customLinks: asCompletedProvider<CustomLinksResponse>([
            {
              key: 'home',
              link:
                'https://some-random-instance.atlassian.net/secure/MyJiraHome.jspa',
              label: 'Jira',
              local: true,
            },
          ]),
          managePermission: asCompletedProvider(true),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite('site40', 'CONFLUENCE')],
          }),
        },
        {
          ...defaultFeatures,
          disableCustomLinks: true,
          xflow: false,
        },
        () => {},
        () => {},
        Product.CONFLUENCE,
      );

      expect(props.showManageLink).toBe(false);
    });
  });

  describe('recent containers', () => {
    it('returns recent links when collaboration graph endpoint is enabled', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          collaborationGraphRecentContainers: asCompletedProvider<
            CollaborationGraphContainersResponse
          >({
            collaborationGraphEntities: [
              {
                entityType: 'CONTAINER',
                containerType:
                  CollaborationGraphRecentContainerType.JIRA_PROJECT,
                id: '20740',
                containerDetails: {
                  id: '20740',
                  key: 'PC',
                  name: 'Project Central',
                  url: 'https://hello.atlassian.net/browse/PC',
                  iconUrl:
                    'https://hello.atlassian.net/secure/projectavatar?pid=20740&avatarId=15426',
                },
                score: 109250,
              },
            ],
          }),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        {
          ...defaultFeatures,
          enableRecentContainers: true,
        },
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.recentLinks).toMatchObject([
        {
          key: '20740',
          label: 'Project Central',
          href: 'https://hello.atlassian.net/browse/PC',
          type: 'jiraProject',
        },
      ]);
    });

    it('returns no recent links when collaboration graph endpoint is disabled', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          collaborationGraphRecentContainers: asCompletedProvider<
            CollaborationGraphContainersResponse
          >({ collaborationGraphEntities: null }),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.recentLinks).toMatchObject([]);
    });
  });
  describe('customizeLinks', () => {
    [
      {
        product: Product.JIRA,
      },
      {
        product: Product.TRELLO,
      },
      {
        product: Product.CONFLUENCE,
      },
    ].forEach(({ product }) => {
      it('should NOT append atlOrigin to url for products that are NOT Confluence when customizeURL is present', () => {
        const mockAnalytics = {
          originProduct: product,
          originGeneratedId: '1234',
        };
        const mockCustomizeLinks = () => {
          return {
            mapUrl: (url: string, switcherType?: SwitcherProductType) => {
              if (switcherType === 'CONFLUENCE') {
                return `${url}?atlOrigin=test`;
              } else {
                return url;
              }
            },
            getExtendedAnalyticsAttributes: (
              switcherType?: SwitcherProductType,
            ) => {
              if (switcherType === 'CONFLUENCE') {
                return mockAnalytics;
              } else {
                return {};
              }
            },
          };
        };
        const props = mapResultsToSwitcherProps(
          null,
          {
            ...completedProvidersResult,
            availableProducts: asCompletedProvider<AvailableProductsResponse>({
              isPartial: false,
              links: [],
              sites: [
                generateSite(CLOUD_ID, 'JIRA_SOFTWARE'),
                generateSite(CLOUD_ID, 'TRELLO'),
              ],
            }),
          },
          defaultFeatures,
          () => {},
          () => {},
          product,
          undefined,
          undefined,
          undefined,
          mockCustomizeLinks,
        );
        expect(props.licensedProductLinks[0].href).not.toBeNull();
        expect(props.licensedProductLinks[0].href).not.toContain('atlOrigin');
        expect(props.getExtendedAnalyticsAttributes('JIRA_SOFTWARE')).toEqual(
          {},
        );
        expect(props.getExtendedAnalyticsAttributes('TRELLO')).toEqual({});
      });
    });
    [
      {
        product: Product.JIRA,
      },
      {
        product: Product.TRELLO,
      },
      {
        product: Product.CONFLUENCE,
      },
    ].forEach(({ product }) => {
      it('should append atlOrigin to url for Confluence when customizeURL is present', () => {
        const mockAnalytics = {
          originProduct: product,
          originGeneratedId: '1234',
        };
        const mockCustomizeLinks = () => ({
          mapUrl: (url: string, switcherType?: SwitcherProductType) => {
            if (switcherType === 'CONFLUENCE') {
              return `${url}?atlOrigin=test`;
            } else {
              return url;
            }
          },
          getExtendedAnalyticsAttributes: (
            switcherType?: SwitcherProductType,
          ) => {
            if (switcherType === 'CONFLUENCE') {
              return mockAnalytics;
            } else {
              return {};
            }
          },
        });
        const props = mapResultsToSwitcherProps(
          null,
          {
            ...completedProvidersResult,
            availableProducts: asCompletedProvider<AvailableProductsResponse>({
              isPartial: false,
              links: [],
              sites: [
                generateSite(CLOUD_ID, 'JIRA_SOFTWARE'),
                generateSite(CLOUD_ID, 'CONFLUENCE'),
                generateSite(CLOUD_ID, 'TRELLO'),
              ],
            }),
          },
          defaultFeatures,
          () => {},
          () => {},
          product,
          undefined,
          undefined,
          undefined,
          mockCustomizeLinks,
        );
        expect(props.getExtendedAnalyticsAttributes('JIRA_SOFTWARE')).toEqual(
          {},
        );
        expect(props.getExtendedAnalyticsAttributes('CONFLUENCE')).toEqual(
          mockAnalytics,
        );
        expect(props.licensedProductLinks[1].href).toBe(
          'https://some-cloud-id.atlassian.net/wiki?atlOrigin=test',
        );
        expect(props.licensedProductLinks[0].href).not.toContain(
          '?atlOrigin=test',
        );
        expect(props.licensedProductLinks[2].href).not.toContain(
          '?atlOrigin=test',
        );
      });
    });
    it('should return empty object for analytic attributes if customizeLinks is not present', () => {
      const props = mapResultsToSwitcherProps(
        null,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'CONFLUENCE')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.CONFLUENCE,
      );
      expect(props.getExtendedAnalyticsAttributes('CONFLUENCE')).toEqual({});
      expect(props.licensedProductLinks).toMatchObject([
        {
          href: 'https://some-cloud-id.atlassian.net/wiki',
        },
      ]);
    });
  });

  describe('renders Jira Work Management correctly', () => {
    it('should return Jira Core in licensed products with rebrand FF off', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_BUSINESS')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          href:
            'https://some-cloud-id.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=business',
          key: 'JIRA_BUSINESSsome-cloud-id',
          label: 'Jira Core',
        },
      ]);
    });

    it('should return Jira Work Management in licensed products with rebrand FF off', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_BUSINESS')],
            unstableFeatures: {
              jwmRebrandEnabled: true,
            },
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          href:
            'https://some-cloud-id.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=business',
          key: 'JIRA_BUSINESSsome-cloud-id',
          label: 'Jira Work Management',
        },
      ]);
    });
  });

  describe('renders JSM correctly', () => {
    it('should return JSM in licensed products', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SERVICE_DESK')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.licensedProductLinks).toMatchObject([
        {
          href:
            'https://some-cloud-id.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
          key: 'JIRA_SERVICE_DESKsome-cloud-id',
          label: 'Jira Service Management',
        },
      ]);
    });
    it('should return JSM in suggested products', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          isXFlowEnabled: asCompletedProvider(true),
          productRecommendations: asCompletedProvider<
            RecommendationsEngineResponse
          >([
            {
              productKey: ProductKey.JIRA_SERVICE_DESK,
            },
          ]),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );
      expect(props.suggestedProductLinks).toMatchObject([
        {
          key: 'jira-servicedesk.ondemand',
          href: '/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
          label: 'Jira Service Management',
        },
      ]);
    });
    it('should return JSM in joinable sites', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          joinableSites: asCompletedProvider<JoinableSitesResponse>({
            sites: [
              {
                cloudId: 'CLOUD_ID_MOCK',
                displayName: 'Joinable',
                url: '/somewhere',
                avatarUrl: '',
                relevance: 1,
                products: {
                  [ProductKey.JIRA_SERVICE_DESK]: {
                    collaborators: [],
                    productUrl: '/someproduct-url',
                  },
                },
              },
            ],
          }),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.joinableSiteLinks).toMatchObject([
        {
          href: '/someproduct-url',
          key: 'CLOUD_ID_MOCK',
          label: 'Jira Service Management',
          description: 'Joinable',
          productType: 'JIRA_SERVICE_DESK',
        },
      ]);
    });
  });

  describe('render admininstration button correctly', () => {
    it('should return Administration link if the user is an Admin', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          managePermission: asCompletedProvider(true),
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.adminLinks).toMatchObject([
        {
          href: '/admin',
          key: 'administration',
        },
      ]);
    });

    it('should NOT return Administration link if the user is not an Admin', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        defaultFeatures,
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.adminLinks).toMatchObject([]);
    });

    it('should NOT return Administration link if remote configuration is turned on but the feature flag is not', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [
              {
                linkType: 'ADMINISTRATION',
                url: '/admin',
              },
            ],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        {
          ...defaultFeatures,
          enableRemoteConfiguration: true,
          enableRemoteAdminLinks: false,
        },
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.adminLinks).toMatchObject([]);
    });

    it('should NOT return Administration link if remote configuration is turned off and the feature flag is on', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [
              {
                linkType: 'ADMINISTRATION',
                url: '/admin',
              },
            ],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        {
          ...defaultFeatures,
          enableRemoteConfiguration: true,
          enableRemoteAdminLinks: false,
        },
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.adminLinks).toMatchObject([]);
    });

    it('should return Administration link if included in the links list and remote configuration is turned on', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [
              {
                linkType: 'ADMINISTRATION',
                url: '/admin',
              },
            ],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        {
          ...defaultFeatures,
          enableRemoteConfiguration: true,
          enableRemoteAdminLinks: true,
        },
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.adminLinks).toMatchObject([
        {
          href: '/admin',
          key: 'administration/admin',
        },
      ]);
    });

    it('should return Administration link (and exclude Billing) if included in the links list and remote configuration is turned on', () => {
      const props = mapResultsToSwitcherProps(
        CLOUD_ID,
        {
          ...completedProvidersResult,
          availableProducts: asCompletedProvider<AvailableProductsResponse>({
            isPartial: false,
            links: [
              {
                linkType: 'ADMINISTRATION',
                url: '/admin',
              },
              {
                linkType: 'BILLING',
                url: '/billing',
              },
            ],
            sites: [generateSite(CLOUD_ID, 'JIRA_SOFTWARE')],
          }),
        },
        {
          ...defaultFeatures,
          enableRemoteConfiguration: true,
          enableRemoteAdminLinks: true,
        },
        () => {},
        () => {},
        Product.JIRA,
      );

      expect(props.adminLinks).toMatchObject([
        {
          href: '/admin',
          key: 'administration/admin',
        },
      ]);
    });
  });
});

function generateSite(
  siteName: string,
  productType: SwitcherProductType,
  productUrl = '',
  adminAccess = false,
): AvailableSite {
  const availableProducts = [
    {
      productType,
      url: productUrl,
    },
  ] as AvailableProduct[]; // assert the type here so we can use `url`
  return {
    adminAccess,
    availableProducts,
    avatar: null,
    cloudId: siteName,
    displayName: siteName,
    url:
      productType === 'BITBUCKET'
        ? `https://bitbucket.org`
        : `https://${siteName}.atlassian.net`,
  };
}

const CLOUD_ID = 'some-cloud-id';

function asFailedProvider(): ResultError {
  return {
    status: Status.ERROR,
    error: 'error',
    data: null,
  };
}

function asCompletedProvider<T>(data: T): ResultComplete<T> {
  return {
    status: Status.COMPLETE,
    data,
  };
}

const loadingProviderResultObject: ResultLoading = {
  status: Status.LOADING,
  data: null,
};

const loadingProvidersResult = {
  customLinks: loadingProviderResultObject,
  recentContainers: loadingProviderResultObject,
  managePermission: loadingProviderResultObject,
  isXFlowEnabled: loadingProviderResultObject,
  productRecommendations: loadingProviderResultObject,
  collaborationGraphRecentContainers: loadingProviderResultObject,
  productConfiguration: asCompletedProvider<ProductConfigurationResponse>({
    products: PRODUCT_CONFIGURATION_MAP,
    links: {},
  }),
  availableProducts: asCompletedProvider<AvailableProductsResponse>({
    isPartial: false,
    links: [],
    sites: [],
  }),
  joinableSites: asCompletedProvider<JoinableSitesResponse>({
    sites: [],
  }),
};

const completedProvidersResult = {
  productConfiguration: asCompletedProvider<ProductConfigurationResponse>({
    products: PRODUCT_CONFIGURATION_MAP,
    links: {
      ADMINISTRATION: {
        label: (
          <FormattedMessage
            id="fabric.atlassianSwitcher.administration"
            defaultMessage="Administration"
            description="The text of a link redirecting the user to the site administration"
          />
        ),
        key: 'administration',

        Icon: createIcon(SettingsGlyph, { size: 'medium' }),
        href: '/admin-remote',
        ordinal: 1000,
        description: null,
      },
    },
  }),
  customLinks: asCompletedProvider<CustomLinksResponse>([]),
  managePermission: asCompletedProvider(false),
  isXFlowEnabled: asCompletedProvider(false),
  productRecommendations: asCompletedProvider<RecommendationsEngineResponse>(
    [],
  ),
  collaborationGraphRecentContainers: asCompletedProvider<
    CollaborationGraphContainersResponse
  >({ collaborationGraphEntities: null }),
  joinableSites: asCompletedProvider<JoinableSitesResponse>({
    sites: [],
  }),
};
