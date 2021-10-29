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
import { radios, boolean, array } from '@storybook/addon-knobs';
import {
  mockRecents,
  restore,
  mockSearch,
  mockExperiment,
  mockCollaborationGraph,
  mockScopes,
} from './storybook-utils/mock-requests';
import { SearchClientConfig as ConfluenceSearchClientConfig } from '../src/confluence/clients/confluence-search-provider';
import { SearchClientConfig as JiraSearchClientConfig } from '../src/jira/clients';
import { ConfluenceFeatures } from '../src/confluence/confluence-features/confluence-features';
import {
  DefaultFeatures as JiraDefaultFeatures,
  JiraFeatures,
} from '../src/jira/features';
import { DefaultFeatures as ConfluenceDefaultFeatures } from '../src/confluence/confluence-features';
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

const linkCSS = {
  color: 'inherit',
  textDecoration: 'none',
  ':hover, :visited, :active': {
    color: 'inherit',
  },
};

const Icon = () => (
  <a css={linkCSS} href="#">
    <ConfluenceIcon />
  </a>
);

const Logo = () => (
  <a css={linkCSS} href="#">
    <ConfluenceLogo />
  </a>
);

const ProductHomeExample = () => <ProductHome icon={Icon} logo={Logo} />;

const FormattedDate = (props: { lastModified: string }) => {
  const date = new Date(props.lastModified);
  return <div>{date.toLocaleString('en-US')}</div>;
};

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
                isExpanded={keepSearchOpen || isOpen}
                onOpen={onOpen}
                onClose={onClose}
                linkComponent={LoggingLinkComponent}
                formatDate={(lastModified: string) => (
                  <FormattedDate lastModified={lastModified} />
                )}
                theme={theme ? theme.mode.search : undefined}
                confluenceFeatures={confluenceFeatures}
                jiraFeatures={jiraFeatures}
                products={products}
                ref={ref}
                user={user}
                onNavigate={(href) => {
                  action('onNavigate')(href);
                  window.open(href, '_blank');
                }}
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

export default () => {
  // set up instance knob
  const options = Object.keys(presetConfig).reduce(
    (acc, configKey) => ({ ...acc, [configKey]: configKey }),
    {},
  );
  const defaultConfluenceValue: keyof typeof presetConfig = AllowedSites.sdog;
  const defaultJiraValue: keyof typeof presetConfig = AllowedSites.sdog;
  const confluenceConfigKey: keyof typeof presetConfig = radios(
    'Confluence Instance',
    options,
    defaultConfluenceValue,
    'confluence',
  );
  const jiraConfigKey: keyof typeof presetConfig = radios(
    'Jira Instance',
    options,
    defaultJiraValue,
    'jira',
  );

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
  const featuresGroupId = 'Features';
  const availableFeatures = {
    ...JiraDefaultFeatures,
    ...ConfluenceDefaultFeatures,
  };

  const features: ConfluenceFeatures & JiraFeatures = Object.keys(
    availableFeatures,
  ).reduce((acc, key) => {
    const value: boolean = (availableFeatures as any)[key];
    const types = typeof value;
    switch (types) {
      case 'boolean': {
        return { ...acc, [key]: boolean(key, value, featuresGroupId) };
      }
      default: {
        return { ...acc, [key]: value };
      }
    }
  }, {}) as any;

  const products: Products[] = array(
    'Products',
    ['confluence', 'jira'],
    ',',
    featuresGroupId,
  ).map((p) => p.toUpperCase()) as Products[];

  // set collboration graph knob
  const collabGraphGroupId = 'Features';
  const useCollaborationGraphForRecents: boolean = boolean(
    'Use Collaboration Graph for Recent containers and people',
    false,
    collabGraphGroupId,
  );

  // set anonymous user knob
  const anonymousUserGroupId = 'Features';
  const useAnonymousUser: boolean = boolean(
    'Use anonymous user',
    false,
    anonymousUserGroupId,
  );

  const useGraphQLClient: boolean = boolean(
    'Use GraphQL client',
    false,
    featuresGroupId,
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

  if (confluenceConfigKey === ('local' as keyof typeof presetConfig)) {
    mockScopes();
    mockCollaborationGraph();
    mockSearch();
  }

  const confluenceConfig = {
    aggregatorUrl: presetConfig[confluenceConfigKey].searchAggregatorServiceUrl,
    collaborationGraphUrl:
      presetConfig[confluenceConfigKey].collaborationGraphUrl,
    useCollaborationGraphForRecents,
    baseUrl: `${presetConfig[confluenceConfigKey].baseUrl}/wiki`,
    cloudId: presetConfig[confluenceConfigKey].cloudId,
    isUserAnonymous: useAnonymousUser,
    useGraphQLClient,
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
    aggregatorUrl: presetConfig[jiraConfigKey].searchAggregatorServiceUrl,
    cloudId: presetConfig[jiraConfigKey].cloudId,
    baseUrl: presetConfig[jiraConfigKey].baseUrl,
    collaborationGraphUrl: presetConfig[jiraConfigKey].collaborationGraphUrl,
    accountId: useAnonymousUser
      ? undefined
      : presetConfig[jiraConfigKey].accountId,
    isUserAnonymous: useAnonymousUser,
  };

  return (
    <NavV3
      user={user}
      locale={locale}
      confluenceConfig={confluenceConfig}
      jiraConfig={jiraConfig}
      theme={theme}
      confluenceFeatures={features}
      jiraFeatures={features}
      products={products}
      keepSearchOpen={keepSearchOpen}
    />
  );
};
