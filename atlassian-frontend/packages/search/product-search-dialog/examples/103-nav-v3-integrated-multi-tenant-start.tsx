/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useState, FunctionComponent, useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import {
  ConfluenceClientsProvider,
  JiraSearchClientProvider,
  Products,
} from '../src';
import {
  AtlassianNavigation,
  ProductHome,
  NavigationTheme,
} from '@atlaskit/atlassian-navigation';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ConfluenceIcon, ConfluenceLogo } from '@atlaskit/logo';
import LocaleIntlProvider, {
  supportedLanguages,
} from './storybook-utils/locale-intl-provider';
import { AllowedSites, presetConfig } from './storybook-utils/instance-config';
import { radios, boolean, optionsKnob } from '@storybook/addon-knobs';
import {
  mockRecents,
  restore,
  mockExperiment,
} from './storybook-utils/mock-requests';
import { SearchClientConfig as ConfluenceSearchClientConfig } from '../src/confluence/clients/confluence-search-provider';
import { SearchClientConfig as JiraSearchClientConfig } from '../src/jira/clients';
import { ConfluenceFeatures } from '../src/confluence/confluence-features/confluence-features';
import {
  DefaultFeatures as JiraDefaultFeatures,
  JiraFeatures,
} from '../src/jira/features';
import {
  bindHotkeyToDocument,
  removeHotkeyFromDocument,
} from './storybook-utils/hotkeys';
import {
  LoggingLinkComponent,
  DefaultCreate,
  HelpDropdown,
  NotificationsDrawer,
  ProfileDropdown,
  SettingsDrawer,
  PrimaryDropdown,
  AppSwitcherDrawer,
  SearchDialogContainer,
} from './storybook-utils/common-components';
import { UserDetails } from '../src/common/user-context';
import { themeExamples } from './storybook-utils/themes';
import { CrossProductSearchDialog } from '../src/cross-product';
import { getConfluenceRecents } from './multi-site-utils/activity-platform-requests';
import { FormattedDate, FormattedRelative } from 'react-intl';

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

const linkCSS = {
  color: 'inherit',
  textDecoration: 'none',
  ':hover, :visited, :active': {
    color: 'inherit',
  },
};

const Icon = () => (
  <a style={linkCSS} href="#">
    <ConfluenceIcon />
  </a>
);

const Logo = () => (
  <a style={linkCSS} href="#">
    <ConfluenceLogo />
  </a>
);

const ProductHomeExample = () => <ProductHome icon={Icon} logo={Logo} />;

const SearchDrawer = ({
  locale,
  confluenceConfig,
  jiraConfig,
  theme,
  confluenceFeatures,
  keepSearchOpen,
  user,
  jiraFeatures,
  products,
}: {
  locale: string;
  confluenceConfig: ConfluenceSearchClientConfig;
  jiraConfig: JiraSearchClientConfig;
  theme: NavigationTheme;
  confluenceFeatures: ConfluenceFeatures;
  jiraFeatures: JiraFeatures;
  keepSearchOpen: boolean;
  user?: UserDetails;
  products: Products[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = (e?: React.MouseEvent | KeyboardEvent) => {
    e && e.preventDefault();
    setIsOpen(true);
    ref.current?.focus();
  };

  useEffect(() => {
    bindHotkeyToDocument(']', () => onOpen());
    return () => {
      removeHotkeyFromDocument(']');
    };
  }, []);

  const withUpdatedLabel = (formattedDate: string) =>
    `Updated ${formattedDate}`;

  const formatDate = (lastModified: string) => {
    const daysElapsed =
      (Date.now() - new Date(lastModified).getTime()) / MILLISECONDS_IN_DAY;

    if (daysElapsed < 8) {
      return (
        <FormattedRelative value={lastModified}>
          {withUpdatedLabel}
        </FormattedRelative>
      );
    }

    return (
      <FormattedDate
        year="numeric"
        month="short"
        day="2-digit"
        value={lastModified}
      >
        {withUpdatedLabel}
      </FormattedDate>
    );
  };

  return (
    <SearchDialogContainer>
      <LocaleIntlProvider locale={locale}>
        <AnalyticsListener
          channel="*"
          onEvent={({ payload }: any) =>
            action('analytics')(
              `${payload.actionSubject} ${payload.action} ${
                payload.actionSubjectId ? `(${payload.actionSubjectId})` : ''
              }`,
              payload,
            )
          }
        >
          <ConfluenceClientsProvider config={confluenceConfig}>
            <JiraSearchClientProvider {...jiraConfig}>
              <CrossProductSearchDialog
                doProductPermissionsCheck={false}
                isExpanded={keepSearchOpen || isOpen}
                onOpen={onOpen}
                onClose={onClose}
                linkComponent={LoggingLinkComponent}
                formatDate={formatDate}
                theme={theme ? theme.mode.search : undefined}
                confluenceFeatures={confluenceFeatures}
                jiraFeatures={jiraFeatures}
                products={products}
                ref={ref}
                user={user}
                onNavigate={(href) => {
                  action('onNavigate')(href);
                }}
                disableDefaultNavigationOnInput
              />
            </JiraSearchClientProvider>
          </ConfluenceClientsProvider>
        </AnalyticsListener>
      </LocaleIntlProvider>
    </SearchDialogContainer>
  );
};

const primaryItems = [
  <PrimaryDropdown content={() => <></>} text="Activity" />,
  <PrimaryDropdown content={() => <></>} text="Your Work" />,
  <PrimaryDropdown content={() => <></>} text="Spaces" />,
  <PrimaryDropdown content={() => <></>} text="People" />,
  <PrimaryDropdown content={() => <></>} text="Apps" />,
];

const NavV3: FunctionComponent<{
  locale: string;
  confluenceConfig: ConfluenceSearchClientConfig;
  jiraConfig: JiraSearchClientConfig;
  theme: NavigationTheme;
  confluenceFeatures: ConfluenceFeatures;
  jiraFeatures: JiraFeatures;
  keepSearchOpen: boolean;
  products: Products[];
  user?: UserDetails;
}> = ({
  theme,
  confluenceConfig,
  locale,
  confluenceFeatures,
  keepSearchOpen,
  user,
  jiraFeatures,
  jiraConfig,
  products,
}) => (
  <AtlassianNavigation
    primaryItems={primaryItems}
    renderAppSwitcher={AppSwitcherDrawer}
    renderCreate={DefaultCreate}
    renderHelp={HelpDropdown}
    renderNotifications={NotificationsDrawer}
    renderProductHome={ProductHomeExample}
    renderProfile={ProfileDropdown}
    label="cross-product-storybook"
    renderSearch={() => (
      <SearchDrawer
        locale={locale}
        confluenceConfig={confluenceConfig}
        jiraConfig={jiraConfig}
        theme={theme}
        confluenceFeatures={confluenceFeatures}
        jiraFeatures={jiraFeatures}
        keepSearchOpen={keepSearchOpen}
        user={user}
        products={products}
      />
    )}
    renderSettings={SettingsDrawer}
    moreLabel="More"
    theme={theme}
  />
);

interface ProductConfig {
  accountId?: string;
  product: string;
  name: string;
  searchAggregatorServiceUrl: string;
  collaborationGraphUrl: string;
  cloudId: string;
  baseUrl: string;
  aggregatorUrl?: string;
  corsEnabled?: boolean;
  products?: Array<Products>;
}

export default () => {
  // set up instance knob
  const confluenceSites: ProductConfig[] = [];
  const jiraSites: ProductConfig[] = [];

  Object.keys(presetConfig)
    .map((key) => ({ ...presetConfig[key as AllowedSites], key }))
    .filter((site) => site.corsEnabled)
    .forEach((site) => {
      site.products.forEach((product: Products) => {
        const config = {
          product,
          name: site.key,
          accountId: site.accountId,
          aggregatorUrl: site.aggregatorUrl,
          searchAggregatorServiceUrl: site.searchAggregatorServiceUrl,
          collaborationGraphUrl: site.collaborationGraphUrl,
          corsEnabled: site.corsEnabled,
          cloudId: site.cloudId,
          baseUrl: site.baseUrl,
        };

        if (product === Products.jira) {
          jiraSites.push(config);
        } else if (product === Products.confluence) {
          confluenceSites.push(config);
        }
      });
    });

  const jiraSiteOptions = jiraSites.reduce(
    (acc, value) => ({ ...acc, [value.name]: value.name }),
    {},
  );

  const selectedJiras = optionsKnob<string[]>(
    'Jira',
    jiraSiteOptions,
    Object.keys(jiraSiteOptions).slice(0, 3),
    {
      display: 'multi-select',
    },
    'Sites',
  ).map((key) => jiraSites.find((s) => s.name === key)!);

  const confluenceSiteOptions = confluenceSites.reduce(
    (acc, value) => ({ ...acc, [value.name]: value.name }),
    {},
  );

  const selectedConfluences = optionsKnob<string[]>(
    'Confluence',
    confluenceSiteOptions,
    Object.keys(confluenceSiteOptions).slice(0, 3),
    {
      display: 'multi-select',
    },
    'Sites',
  ).map((key) => confluenceSites.find((s) => s.name === key)!);

  const products: Array<Products> = [];

  if (selectedJiras.length > 0) {
    products.push(Products.confluence);
  }

  if (selectedConfluences.length > 0) {
    products.push(Products.jira);
  }

  // set up locale knob
  const locale: string = radios(
    'Locale',
    supportedLanguages.reduce((acc, lang) => ({ ...acc, [lang]: lang }), {}),
    'en',
    'Locale',
  );

  // Theme knob
  const themeKey = radios(
    'Theme',
    {
      default: 'default',
      ...Object.keys(themeExamples).reduce(
        (acc, t) => ({ ...acc, [t]: t }),
        {},
      ),
    },
    'default',
    'Theme',
  );

  const theme = themeExamples[themeKey];

  // features knob
  // currently no features in confluence
  const availableFeatures = {
    ...JiraDefaultFeatures,
  };

  // set collboration graph knob
  const collabGraphGroupId = 'Features';
  const useCollaborationGraphForRecents: boolean = boolean(
    'Use Collaboration Graph for Recent containers and people',
    true,
    collabGraphGroupId,
  );

  // set anonymous user knob
  const anonymousUserGroupId = 'Features';
  const useAnonymousUser: boolean = boolean(
    'Use anonymous user',
    false,
    anonymousUserGroupId,
  );

  // keep search open knob
  const keepSearchOpenId = 'Storybook options';
  const keepSearchOpen: boolean = boolean(
    'Keep the search drawer open',
    false,
    keepSearchOpenId,
  );

  restore();
  mockRecents();
  mockExperiment({
    abTestId: 'storybook',
    experimentId: 'default',
    controlId: 'default',
  });

  const confluenceConfig = {
    aggregatorUrl: (selectedConfluences[0]?.aggregatorUrl as string) || '',
    collaborationGraphUrl: selectedConfluences[0]?.collaborationGraphUrl || '',
    useCollaborationGraphForRecents,
    baseUrl: `${selectedConfluences[0]?.baseUrl || ''}/wiki`,
    siteUrl: selectedConfluences[0]?.baseUrl || '',
    cloudId: selectedConfluences[0]?.cloudId || '',
    isUserAnonymous: useAnonymousUser,
    recentItemsSupplier: getConfluenceRecents,
    sites: selectedConfluences.map((site) => ({
      siteUrl: site.baseUrl,
      product: Products.confluence,
      cloudId: site.cloudId,
      avatarUrl: '',
      siteName: site.name,
    })),
  };

  const user = useAnonymousUser
    ? undefined
    : {
        name: 'confluence_storybook',
        email: 'storybook_test_user@examples.com',
        id: '123456789',
        avatarUrl: 'path/to/image/',
      };

  const jiraConfig = {
    aggregatorUrl: selectedJiras[0]?.searchAggregatorServiceUrl || '',
    cloudId: selectedJiras[0]?.cloudId || '',
    baseUrl: selectedJiras[0]?.baseUrl || '',
    siteUrl: selectedJiras[0]?.baseUrl || '',
    collaborationGraphUrl: selectedJiras[0]?.collaborationGraphUrl || '',
    accountId: useAnonymousUser ? undefined : selectedJiras[0]?.accountId || '',
    isUserAnonymous: useAnonymousUser,
    sites: selectedJiras.map((site) => ({
      siteUrl: site.baseUrl,
      product: Products.jira,
      cloudId: site.cloudId,
      avatarUrl: '',
      siteName: site.name,
    })),
  };

  console.log(jiraConfig);
  console.log(confluenceConfig);

  return (
    <NavV3
      user={user}
      locale={locale}
      confluenceConfig={confluenceConfig}
      jiraConfig={jiraConfig}
      theme={theme}
      confluenceFeatures={{}}
      jiraFeatures={availableFeatures}
      products={products}
      keepSearchOpen={keepSearchOpen}
    />
  );
};
