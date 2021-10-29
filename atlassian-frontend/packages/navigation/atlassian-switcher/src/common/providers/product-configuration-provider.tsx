import React from 'react';
import {
  createProviderWithCustomFetchData,
  ExportedDataProvider,
} from './create-data-provider';
import {
  AvailableProductLinks,
  i18nLabel,
  ProductConfigurationMap,
  ProductConfigurationResponse,
  SwitcherLinkType,
  SwitcherProductType,
} from '../../types';
import {
  createIcon,
  createRemoteIcon,
  createThemedImageIcon,
} from '../utils/icon-themes';
import { fetchJsonWithNetworkRetries } from '../utils/fetch';
import {
  AtlassianIcon,
  BitbucketIcon,
  CompassIcon,
  ConfluenceIcon,
  JiraServiceManagementIcon,
  JiraSoftwareIcon,
  JiraWorkManagementIcon,
  OpsgenieIcon,
  StatuspageIcon,
  TrelloIcon,
} from '@atlaskit/logo';
import { WithAnalyticsEventsProps } from '../utils/analytics';
import messages from '../utils/messages';
import { FormattedMessage } from '../../ui/primitives';
import { SwitcherItemType } from '../utils/links';

export const PRODUCT_CONFIGURATION_MAP: ProductConfigurationMap = {
  BITBUCKET: {
    label: 'Bitbucket',
    key: 'bitbucket',
    Icon: createIcon(BitbucketIcon, { size: 'small' }),
    href: '/dashboard/overview',
    ordinal: 6,
  },
  CONFLUENCE: {
    label: 'Confluence',
    key: 'confluence.ondemand',
    Icon: createIcon(ConfluenceIcon, { size: 'small' }),
    href: '/wiki',
    ordinal: 3,
    description: (
      <FormattedMessage {...messages.productDescriptionConfluence} />
    ),
  },
  JIRA_BUSINESS: {
    label: 'Jira Core',
    key: 'jira-core.ondemand',
    Icon: createIcon(JiraWorkManagementIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=business',
    ordinal: 2,
  },
  JIRA_WORK_MANAGEMENT: {
    label: 'Jira Work Management',
    key: 'jira-core.ondemand',
    Icon: createIcon(JiraWorkManagementIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=business',
    ordinal: 2,
  },
  JIRA_SOFTWARE: {
    label: 'Jira Software',
    key: 'jira-software.ondemand',
    Icon: createIcon(JiraSoftwareIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=software',
    ordinal: 0,
    description: (
      <FormattedMessage {...messages.productDescriptionJiraSoftware} />
    ),
  },
  JIRA_SERVICE_DESK: {
    label: 'Jira Service Management',
    key: 'jira-servicedesk.ondemand',
    Icon: createIcon(JiraServiceManagementIcon, { size: 'small' }),
    href: '/secure/BrowseProjects.jspa?selectedProjectType=service_desk',
    ordinal: 1,
    description: (
      <FormattedMessage {...messages.productDescriptionJiraServiceManagement} />
    ),
  },
  COMPASS: {
    label: 'Compass',
    key: 'compass',
    Icon: createIcon(CompassIcon, { size: 'small' }),
    href: '/compass',
    ordinal: 4,
    description: <FormattedMessage {...messages.productDescriptionCompass} />,
  },
  TEAM_CENTRAL: {
    label: 'Team Central (Beta)',
    key: 'townsquare',
    Icon: createIcon(AtlassianIcon, { size: 'small' }),
    href: 'https://team.atlassian.com',
    ordinal: 9,
  },
  AVOCADO: {
    label: 'Avocado',
    key: 'avocado',
    Icon: createIcon(AtlassianIcon, { size: 'small' }),
    href: '',
    ordinal: 10,
  },
  OPSGENIE: {
    label: 'Opsgenie',
    key: 'opsgenie',
    Icon: createIcon(OpsgenieIcon, { size: 'small' }),
    href: 'https://app.opsgenie.com',
    ordinal: 5,
    description: <FormattedMessage {...messages.productDescriptionOpsgenie} />,
  },
  STATUSPAGE: {
    label: 'Statuspage',
    key: 'statuspage',
    Icon: createIcon(StatuspageIcon, { size: 'small' }),
    href: 'https://statuspage.io',
    ordinal: 7,
  },
  TRELLO: {
    label: 'Trello',
    key: 'trello',
    Icon: createIcon(TrelloIcon, { size: 'small' }),
    href: 'https://trello.com',
    ordinal: 8,
  },
};

type ProductConfigurationOptions = WithAnalyticsEventsProps & {
  useRemoteProductConfiguration?: boolean;
};

type ProductConfigurationApiBase = {
  key: string;
  ordinal: number;
  href: string;
  label: string | i18nLabel;
  description: string | i18nLabel | null;
};

type ProductConfigurationApiProduct = ProductConfigurationApiBase & {
  icons: {
    blue: string;
    neutral: string;
    white: string;
  };
};

type ProductConfigurationApiLink = ProductConfigurationApiBase & {
  iconUrl: string;
};

type ProductConfigurationApiResponse = {
  products: Record<SwitcherProductType, ProductConfigurationApiProduct>;
  links: Record<SwitcherLinkType, ProductConfigurationApiLink>;
};

const defaultResponse = (): Promise<ProductConfigurationResponse> => {
  return Promise.resolve({
    products: PRODUCT_CONFIGURATION_MAP,
    links: {},
  });
};

const formatLabel = (
  label: ProductConfigurationApiBase['label'],
): SwitcherItemType['label'] => {
  return typeof label === 'string' ? label : <FormattedMessage {...label} />;
};

const formatDescription = (
  description: ProductConfigurationApiBase['description'],
): SwitcherItemType['description'] => {
  return typeof description === 'string' ? (
    description
  ) : description ? (
    <FormattedMessage {...description} />
  ) : null;
};

export const DEFAULT_PRODUCT_CONFIGURATION_ENDPOINT =
  '/gateway/api/available-products/api/product-configuration';

export const createProductConfigurationProvider = ({
  url = DEFAULT_PRODUCT_CONFIGURATION_ENDPOINT,
  useRemoteProductConfiguration,
}: {
  url?: string;
  useRemoteProductConfiguration: boolean;
}): ExportedDataProvider<
  ProductConfigurationResponse,
  ProductConfigurationOptions
> => {
  return createProviderWithCustomFetchData<
    ProductConfigurationResponse,
    ProductConfigurationOptions
  >('productConfiguration', async () => {
    if (useRemoteProductConfiguration) {
      const response = await fetchJsonWithNetworkRetries<
        ProductConfigurationApiResponse
      >(url, {
        intervalsMS: [50, 200, 1000],
      });

      return {
        links: Object.entries(response.links).reduce<
          Record<string, AvailableProductLinks>
        >((acc, [key, link]) => {
          return {
            ...acc,
            [key]: {
              ...link,
              label: formatLabel(link.label),
              description: formatDescription(link.description),
              Icon: createRemoteIcon(link.iconUrl, {
                primaryColor: 'white',
              }),
            },
          };
        }, {}),
        products: Object.entries(response.products).reduce<
          ProductConfigurationMap
        >((acc, [key, product]) => {
          return {
            ...acc,
            [key]: {
              ...product,
              label: formatLabel(product.label),
              description: formatDescription(product.description),
              Icon: createThemedImageIcon({
                default: product.icons.blue,
                product: product.icons.white,
              }),
            },
          };
        }, {} as ProductConfigurationMap),
      };
    }

    return defaultResponse();
  });
};
