/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useState, FunctionComponent, useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import { addons, mockChannel } from '@storybook/addons';
/**
 * Any new component in this storybook must be exported at the root and then consumed here.
 * The components below serve as a list of things which will flow into the consumer's codebase.
 */
import {
  ConfluenceClientsProvider,
  JiraSearchClientProvider,
  Products,
  ConfluenceFeatures,
  JiraFeatures,
  UserDetails,
  ConfluenceTab,
  JiraTab,
  MultiProductDialog,
  JiraFilterContextProvider,
  ConfluenceFilterContextProvider,
  MetaContextProviderProps,
  UserInputContextProvider,
  BitbucketTab,
  AvocadoTab,
  DialogFeatures,
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
import { radios, boolean, array, number } from '@storybook/addon-knobs';
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
import { DefaultFeatures as JiraDefaultFeatures } from '../src/jira/features';
import { DefaultFeatures as ConfluenceDefaultFeatures } from '../src/confluence/confluence-features';
import {
  bindHotkeyToDocument,
  removeHotkeyFromDocument,
} from './storybook-utils/hotkeys';
import {
  DefaultCreate,
  HelpDropdown,
  NotificationsDrawer,
  ProfileDropdown,
  SettingsDrawer,
  PrimaryDropdown,
  AppSwitcherDrawer,
  SearchDialogContainer,
  LoggingLinkComponent,
  emptyContent,
} from './storybook-utils/common-components';
import { themeExamples } from './storybook-utils/themes';
import { EMPTY_SEARCH_ITEMS } from '../src/extensible/product-router/product/result-provider/result-provider-types';

// Prevents "Accessing nonexistent addons channel" error in integration tests
if (!addons.hasChannel()) {
  addons.setChannel(mockChannel());
}

const linkCSS = {
  color: 'inherit',
  textDecoration: 'none',
  ':hover, :visited, :active': {
    color: 'inherit',
  },
};

const onNavigate = (productId: string, href: string, event: any) => {
  action(`onNavigate ${productId}`)(href);
  window.open(href, '_blank');
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
const FormattedDate = (props: { lastModified: string }) => {
  const date = new Date(props.lastModified);
  return <div>{date.toLocaleString('en-US')}</div>;
};

const ProductHomeExample = () => <ProductHome icon={Icon} logo={Logo} />;

const Example: FunctionComponent<
  MetaContextProviderProps & {
    forwardRef: React.Ref<HTMLInputElement>;
    products: string[];
    jiraFeatures: JiraFeatures;
    confluenceFeatures: ConfluenceFeatures;
    dialogFeatures?: DialogFeatures;
    skipPermissionsCheck: boolean;
    isExpanded: boolean;
    replicatePreQueryNoResults: boolean;
    replicatePostQueryNoResults: boolean;
    replicatePostQueryFailure: boolean;
    replicatePreQueryFailure: boolean;
    keepExpandedInTab: boolean;
  }
> = ({
  forwardRef,
  products,
  jiraFeatures,
  confluenceFeatures,
  dialogFeatures,
  skipPermissionsCheck,
  theme,
  setIsExpanded,
  isExpanded,
  abTestCloudId,
  aggregatorUrl,
  user,
  replicatePreQueryNoResults,
  replicatePostQueryNoResults,
  replicatePostQueryFailure,
  replicatePreQueryFailure,
  keepExpandedInTab,
}) => {
  const defaultPreQuerySupplier = replicatePreQueryNoResults
    ? () => Promise.resolve(EMPTY_SEARCH_ITEMS)
    : replicatePreQueryFailure
    ? () => Promise.reject('pre query failure scenario replicated')
    : undefined;

  const defaultPostQuerySupplier = replicatePostQueryNoResults
    ? () => Promise.resolve(EMPTY_SEARCH_ITEMS)
    : replicatePostQueryFailure
    ? () => Promise.reject('post query failure scenario replicated')
    : undefined;

  return (
    <MultiProductDialog
      theme={theme}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      abTestCloudId={abTestCloudId}
      aggregatorUrl={aggregatorUrl}
      user={user}
      forwardRef={forwardRef}
      onNavigateGeneric={onNavigate}
      dialogFeatures={dialogFeatures}
      keepExpandedInTab={keepExpandedInTab}
    >
      {({ onRetry }) => (
        <>
          {products.find((product) => product === Products.confluence) && (
            <ConfluenceTab
              isExpanded={isExpanded}
              features={confluenceFeatures}
              linkComponent={LoggingLinkComponent}
              formatDate={(lastModified: string) => (
                <FormattedDate lastModified={lastModified} />
              )}
              onRetry={onRetry}
              /** Passing a permission supplier ensures that the perms check is skipped. We want to pass this in case of primary product.*/
              permissionSupplier={() =>
                Promise.resolve(['confluence.page,blogpost,attachment'])
              }
              order={products.indexOf('CONFLUENCE')}
            />
          )}
          {products.find((product) => product === Products.jira) && (
            <JiraTab
              isExpanded={isExpanded}
              linkComponent={LoggingLinkComponent}
              formatDate={(lastModified: string) => (
                <FormattedDate lastModified={lastModified} />
              )}
              onRetry={onRetry}
              onNavigate={(href) => {
                action('onNavigate')(href);
                window.open(href, '_blank');
              }}
              order={products.indexOf('JIRA')}
              features={jiraFeatures}
            />
          )}
          {products.find((product) => product === 'BITBUCKET') && (
            <BitbucketTab
              onRetry={onRetry}
              order={products.indexOf('BITBUCKET')}
              preQueryItemSupplier={defaultPreQuerySupplier}
              postQueryItemSupplier={defaultPostQuerySupplier}
              isPrefetchingEnabled
              features={{
                enableSingleScopesCall: true,
              }}
              permissionSupplier={
                skipPermissionsCheck
                  ? () => Promise.resolve(['bitbucket.repository'])
                  : undefined
              }
            />
          )}
          {products.find((product) => product === 'AVOCADO') && (
            <AvocadoTab
              onRetry={onRetry}
              order={products.indexOf('AVOCADO')}
              preQueryItemSupplier={defaultPreQuerySupplier}
              postQueryItemSupplier={defaultPostQuerySupplier}
              isPrefetchingEnabled
              permissionSupplier={
                skipPermissionsCheck
                  ? () => Promise.resolve(['avocado.question,answer'])
                  : undefined
              }
            />
          )}
        </>
      )}
    </MultiProductDialog>
  );
};

export const SearchDrawer = ({
  locale,
  confluenceConfig,
  jiraConfig,
  theme,
  confluenceFeatures,
  jiraFeatures,
  dialogFeatures,
  products,
  keepSearchOpen,
  stickySearchEnabled,
  user,
  skipPermissionsCheck,
  searchSessionIdleTime,
  ...rest
}: {
  locale: string;
  confluenceConfig: ConfluenceSearchClientConfig;
  jiraConfig: JiraSearchClientConfig;
  theme: NavigationTheme;
  confluenceFeatures: ConfluenceFeatures;
  jiraFeatures: JiraFeatures;
  dialogFeatures?: DialogFeatures;
  keepSearchOpen: boolean;
  stickySearchEnabled: boolean;
  skipPermissionsCheck: boolean;
  user?: UserDetails;
  products: string[];
  replicatePreQueryNoResults: boolean;
  replicatePostQueryNoResults: boolean;
  replicatePostQueryFailure: boolean;
  replicatePreQueryFailure: boolean;
  keepExpandedInTab: boolean;
  searchSessionIdleTime?: number;
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
  const toggleOpen = (open?: boolean) => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
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
              <UserInputContextProvider
                stickySearchEnabled={stickySearchEnabled}
                sessionResetIdleTime={searchSessionIdleTime}
                isExpanded={keepSearchOpen || isOpen}
              >
                <JiraFilterContextProvider isEnabled={keepSearchOpen || isOpen}>
                  <ConfluenceFilterContextProvider
                    isEnabled={keepSearchOpen || isOpen}
                  >
                    <Example
                      forwardRef={ref}
                      products={products}
                      jiraFeatures={jiraFeatures}
                      confluenceFeatures={confluenceFeatures}
                      skipPermissionsCheck={skipPermissionsCheck}
                      isExpanded={keepSearchOpen || isOpen}
                      theme={theme ? theme.mode.search : undefined}
                      setIsExpanded={toggleOpen}
                      abTestCloudId={confluenceConfig.cloudId}
                      aggregatorUrl={confluenceConfig.aggregatorUrl}
                      user={user}
                      {...rest}
                    />
                  </ConfluenceFilterContextProvider>
                </JiraFilterContextProvider>
              </UserInputContextProvider>
            </JiraSearchClientProvider>
          </ConfluenceClientsProvider>
        </AnalyticsListener>
      </LocaleIntlProvider>
    </SearchDialogContainer>
  );
};

const primaryItems = [
  <PrimaryDropdown content={emptyContent()} text="Activity" />,
  <PrimaryDropdown content={emptyContent()} text="Your Work" />,
  <PrimaryDropdown content={emptyContent()} text="Spaces" />,
  <PrimaryDropdown content={emptyContent()} text="People" />,
  <PrimaryDropdown content={emptyContent()} text="Apps" />,
];

export const NavV3: FunctionComponent<{
  theme: NavigationTheme;
  renderSearch: () => JSX.Element;
}> = ({ theme, renderSearch }) => (
  <AtlassianNavigation
    primaryItems={primaryItems}
    renderAppSwitcher={AppSwitcherDrawer}
    renderCreate={DefaultCreate}
    renderHelp={HelpDropdown}
    renderNotifications={NotificationsDrawer}
    renderProductHome={ProductHomeExample}
    renderProfile={ProfileDropdown}
    label="cross-product-storybook"
    renderSearch={renderSearch}
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

  const products = array(
    'Products',
    ['confluence', 'jira', 'bitbucket', 'avocado'],
    ',',
    featuresGroupId,
  ).map((p) => p.toUpperCase());

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

  // keep search open knob
  const storybookOptionsId = 'Storybook options';
  const keepSearchOpen: boolean = boolean(
    'Keep the search drawer open',
    false,
    storybookOptionsId,
  );
  // enable sticky search knob
  const stickySearchEnabled: boolean = boolean(
    'Enable sticky search',
    true,
    storybookOptionsId,
  );
  // enable keeping the search dialog open when changing tabs knob
  const keepExpandedInTab: boolean = boolean(
    'Keep expanded when changing tabs',
    true,
    storybookOptionsId,
  );
  // time in ms to wait until sticky search session is reset
  const searchSessionIdleTime: number = number(
    'Time in ms to reset sticky search session',
    300000,
    { step: 60000 },
    storybookOptionsId,
  );

  const skipPermissionsCheck: boolean = boolean(
    'Skip product permissions check for bitbucket',
    true,
    storybookOptionsId,
  );

  const failedScenariosId = 'Failed Scenarios';
  const replicatePreQueryFailure: boolean = boolean(
    'Pre Query Failure',
    false,
    failedScenariosId,
  );

  const replicatePreQueryNoResults: boolean = boolean(
    'Pre Query No Results',
    false,
    failedScenariosId,
  );

  const replicatePostQueryFailure: boolean = boolean(
    'Post Query Failure',
    false,
    failedScenariosId,
  );

  const replicatePostQueryNoResults: boolean = boolean(
    'Post Query No Results',
    false,
    failedScenariosId,
  );

  const failedScenarioProps = {
    replicatePreQueryNoResults,
    replicatePostQueryNoResults,
    replicatePostQueryFailure,
    replicatePreQueryFailure,
  };

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
      theme={theme}
      renderSearch={() => (
        <SearchDrawer
          locale={locale}
          confluenceConfig={confluenceConfig}
          jiraConfig={jiraConfig}
          theme={theme}
          confluenceFeatures={features}
          jiraFeatures={features}
          keepSearchOpen={keepSearchOpen}
          stickySearchEnabled={stickySearchEnabled}
          skipPermissionsCheck={skipPermissionsCheck}
          user={user}
          products={products}
          keepExpandedInTab={keepExpandedInTab}
          searchSessionIdleTime={searchSessionIdleTime}
          {...failedScenarioProps}
        />
      )}
    />
  );
};
