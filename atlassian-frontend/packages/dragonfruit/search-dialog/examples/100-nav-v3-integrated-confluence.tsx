/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useState, FunctionComponent, useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import { ConfluenceSearchDialog, ConfluenceClientsProvider } from '../src';
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
import { radios, boolean } from '@storybook/addon-knobs';
import {
  restore,
  mockSearch,
  mockExperiment,
  mockCollaborationGraph,
} from './storybook-utils/mock-requests';
import { SearchClientConfig } from '../src/confluence/clients/confluence-search-provider';
import {
  ConfluenceFeatures,
  DefaultFeatures,
} from '../src/confluence/confluence-features/confluence-features';
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
  onNavigate,
} from './storybook-utils/common-components';
import { UserDetails } from '../src/common/user-context';
import { themeExamples } from './storybook-utils/themes';
import { setSmartUserPickerEnv } from '@atlaskit/user-picker';

setSmartUserPickerEnv('local');

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
  config,
  theme,
  features,
  keepSearchOpen,
  user,
}: {
  locale: string;
  config: SearchClientConfig;
  theme: NavigationTheme;
  features: ConfluenceFeatures;
  keepSearchOpen: boolean;
  user?: UserDetails;
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
    bindHotkeyToDocument(']', onOpen);
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
          <ConfluenceClientsProvider config={config}>
            <ConfluenceSearchDialog
              isExpanded={keepSearchOpen || isOpen}
              onOpen={onOpen}
              onClose={onClose}
              linkComponent={LoggingLinkComponent}
              formatDate={(lastModified: string) => (
                <FormattedDate lastModified={lastModified} />
              )}
              theme={theme ? theme.mode.search : undefined}
              features={features}
              forwardRef={ref}
              user={user}
              onNavigate={onNavigate}
            />
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
  config: SearchClientConfig;
  theme: NavigationTheme;
  features: ConfluenceFeatures;
  keepSearchOpen: boolean;
  user?: UserDetails;
}> = ({ theme, config, locale, features, keepSearchOpen, user }) => (
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
        user={user}
      />
    )}
    label="Confluence Nav"
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
  const defaultValue: keyof typeof presetConfig = AllowedSites.pug;
  const configKey: keyof typeof presetConfig = radios(
    'Instance',
    options,
    defaultValue,
    'Instance',
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
  const featuresGroupId = 'Features';
  const features: ConfluenceFeatures = Object.keys(DefaultFeatures).reduce(
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
    { isSmartUserPickerFFEnabled: true },
  ) as any;

  // set collboration graph knob
  const useCollaborationGraphForRecents: boolean = boolean(
    'Use Collaboration Graph for Recent containers and people',
    false,
    featuresGroupId,
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
  mockExperiment({
    abTestId: 'storybook',
    experimentId: 'default',
    controlId: 'default',
  });

  if (configKey === ('local' as keyof typeof presetConfig)) {
    mockCollaborationGraph();
    mockSearch();
  }

  const config = {
    aggregatorUrl: presetConfig[configKey].searchAggregatorServiceUrl,
    collaborationGraphUrl: presetConfig[configKey].collaborationGraphUrl,
    useCollaborationGraphForRecents,
    baseUrl: 'wiki',
    cloudId: presetConfig[configKey].cloudId,
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

  return (
    <NavV3
      user={user}
      locale={locale}
      config={config}
      theme={theme}
      features={features}
      keepSearchOpen={keepSearchOpen}
    />
  );
};
