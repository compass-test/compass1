/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import {
  AtlassianNavigation,
  ProductHome,
  NavigationTheme,
} from '@atlaskit/atlassian-navigation';
import { JiraIcon, JiraLogo } from '@atlaskit/logo';
import LocaleIntlProvider, {
  supportedLanguages,
} from './storybook-utils/locale-intl-provider';
import { AllowedSites, presetConfig } from './storybook-utils/instance-config';
import { radios, boolean } from '@storybook/addon-knobs';
import {
  mockRecents,
  restore,
  mockSearch,
  mockExperiment,
} from './storybook-utils/mock-requests';
import {
  JiraSearchDialog,
  JiraSearchClientProvider,
  ConfluenceClientsProvider,
} from '../src';
import { SearchClientConfig } from '../src/jira/clients';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { DefaultFeatures, JiraFeatures } from '../src/jira/features';
import {
  LoggingLinkComponent,
  PrimaryDropdown,
  AppSwitcherDrawer,
  HelpDropdown,
  DefaultCreate,
  NotificationsDrawer,
  ProfileDropdown,
  SettingsDrawer,
  SearchDialogContainer,
  onNavigate,
} from './storybook-utils/common-components';
import {
  bindHotkeyToDocument,
  removeHotkeyFromDocument,
} from './storybook-utils/hotkeys';
import { themeExamples } from './storybook-utils/themes';

const FormattedDate = (props: { updated: string }) => {
  const date = new Date(props.updated);
  return <div>{date.toLocaleString('en-US')}</div>;
};

const linkCSS = {
  color: 'inherit',
  textDecoration: 'none',
  ':hover, :visited, :active': {
    color: 'inherit',
  },
};

const Icon = () => (
  <a css={linkCSS} href="#">
    <JiraIcon />
  </a>
);

const Logo = () => (
  <a css={linkCSS} href="#">
    <JiraLogo />
  </a>
);

const ProductHomeExample = () => <ProductHome icon={Icon} logo={Logo} />;

const SearchDrawer = ({
  locale,
  config,
  theme,
  features,
  keepSearchOpen,
}: {
  locale: string;
  config: SearchClientConfig;
  theme?: NavigationTheme;
  features: JiraFeatures;
  keepSearchOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onOpen = (e?: React.MouseEvent | KeyboardEvent) => {
    e && e.preventDefault();
    setIsOpen(true);
    ref.current?.focus();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    bindHotkeyToDocument(']', onOpen);
    return () => {
      removeHotkeyFromDocument(']');
    };
  }, []);

  return (
    <SearchDialogContainer>
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
        <LocaleIntlProvider locale={locale}>
          <ConfluenceClientsProvider config={config}>
            <JiraSearchClientProvider {...config}>
              <JiraSearchDialog
                isExpanded={keepSearchOpen || isOpen}
                onOpen={onOpen}
                onClose={onClose}
                linkComponent={LoggingLinkComponent}
                theme={theme ? theme.mode.search : undefined}
                formatDate={(updated: string) => (
                  <FormattedDate updated={updated} />
                )}
                onNavigate={onNavigate}
                features={features}
                forwardRef={ref}
                user={{}}
              />
            </JiraSearchClientProvider>
          </ConfluenceClientsProvider>
        </LocaleIntlProvider>
      </AnalyticsListener>
    </SearchDialogContainer>
  );
};

const ProjectsContent = () => <></>;

const FiltersContent = () => <></>;

const DashboardsContent = () => <></>;

const AppsContent = () => <></>;

const primaryItems = [
  <PrimaryDropdown content={ProjectsContent} text="Projects" />,
  <PrimaryDropdown content={FiltersContent} text="Filters" />,
  <PrimaryDropdown content={DashboardsContent} text="Dashboards" />,
  <PrimaryDropdown content={AppsContent} text="Apps" />,
];

const NavV3: FunctionComponent<{
  locale: string;
  config: SearchClientConfig;
  theme?: NavigationTheme;
  features: JiraFeatures;
  keepSearchOpen: boolean;
}> = ({ locale, config, theme, features, keepSearchOpen }) => (
  <AtlassianNavigation
    primaryItems={primaryItems}
    renderAppSwitcher={AppSwitcherDrawer}
    renderCreate={DefaultCreate}
    renderHelp={HelpDropdown}
    renderNotifications={NotificationsDrawer}
    renderProductHome={ProductHomeExample}
    renderProfile={ProfileDropdown}
    renderSearch={() => (
      <SearchDrawer
        locale={locale}
        config={config}
        theme={theme}
        features={features}
        keepSearchOpen={keepSearchOpen}
      />
    )}
    renderSettings={SettingsDrawer}
    moreLabel="More"
    theme={theme}
    label="Atlassian Navigation"
  />
);

export default () => {
  // set up instance knob
  const options = Object.keys(presetConfig).reduce(
    (acc, configKey) => ({ ...acc, [configKey]: configKey }),
    {},
  );
  const defaultValue: keyof typeof presetConfig = AllowedSites.jdog;
  const groupId = 'Instance';
  const configKey: keyof typeof presetConfig = radios(
    'Instance',
    options,
    defaultValue,
    groupId,
  );

  // set up locale knob
  const localeGroupId = 'Locale';
  const locale: string = radios(
    'Locale',
    supportedLanguages.reduce((acc, lang) => ({ ...acc, [lang]: lang }), {}),
    'en',
    localeGroupId,
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

  // Features knob
  const featuresGroupId = 'Features';
  const features: JiraFeatures = Object.keys(DefaultFeatures).reduce(
    (acc, key) => {
      const value = (DefaultFeatures as any)[key];
      const types = typeof value;
      switch (types) {
        case 'boolean': {
          return { ...acc, [key]: boolean(key, value, featuresGroupId) };
        }
        default: {
          return { ...acc, [key]: value };
        }
      }
    },
    {},
  ) as any;

  // set anonymous user knob
  const useAnonymousUser: boolean = boolean(
    'Use anonymous user',
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

  if (configKey === ('local' as keyof typeof presetConfig)) {
    mockSearch();
  }

  const config = {
    aggregatorUrl: presetConfig[configKey].searchAggregatorServiceUrl,
    collaborationGraphUrl: presetConfig[configKey].collaborationGraphUrl,
    cloudId: presetConfig[configKey].cloudId,
    baseUrl: presetConfig[configKey].baseUrl,
    accountId: useAnonymousUser ? undefined : presetConfig[configKey].accountId,
    isUserAnonymous: useAnonymousUser,
  };

  return (
    <NavV3
      locale={locale}
      config={config}
      theme={theme}
      features={features}
      keepSearchOpen={keepSearchOpen}
    />
  );
};
