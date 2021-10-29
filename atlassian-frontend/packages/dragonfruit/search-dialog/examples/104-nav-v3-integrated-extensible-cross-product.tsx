/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useState, FunctionComponent, useEffect, useRef } from 'react';
import { action } from '@storybook/addon-actions';
import { ConfluenceClientsProvider, Products } from '../src';
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
  restore,
  mockSearch,
  mockExperiment,
  mockCollaborationGraph,
  mockScopes,
} from './storybook-utils/mock-requests';
import { SearchClientConfig as ConfluenceSearchClientConfig } from '../src/confluence/clients/confluence-search-provider';
import { ConfluenceFeatures } from '../src/confluence/confluence-features/confluence-features';
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
} from './storybook-utils/common-components';
import { UserDetails } from '../src/common/user-context';
import { themeExamples } from './storybook-utils/themes';
import { SearchDialog } from '@atlassian/search-dialog';
import { MetaContextProvider } from '../src/extensible/meta-context-provider';
import { KeyboardWrapper } from '../src/extensible/focus-and-keyboard-wrapper/focus-and-keyboard-wrapper';
import { useDialogExpansionContext } from '../src/extensible/dialog-expansion-context';
import { mergeRefCallback } from '../src/utils/merge-ref-callback';
import ActiveProductSearchInput, {
  ChildrenProps as InputChildrenProps,
} from '../src/extensible/active-product-search-input/active-product-search-input';
import { AsyncProduct, ProductTabs } from '../src/extensible/product-router';
import { ProductSearchInput } from '../src/common/product-search-input';
import ConfluenceSearchDialog from '../src/extensible/dialog-content/confluence-search-dialog';
import { LegacyContextConverter } from '../src/extensible/legacy-context-converter';

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
const FormattedDate = (props: { lastModified: string }) => {
  const date = new Date(props.lastModified);
  return <div>{date.toLocaleString('en-US')}</div>;
};

const ProductHomeExample = () => <ProductHome icon={Icon} logo={Logo} />;

const Example: FunctionComponent<{
  forwardRef: React.Ref<HTMLInputElement>;
  products: Products[];
}> = ({ forwardRef, products }) => {
  const { isExpanded, setIsExpanded } = useDialogExpansionContext();

  return (
    <KeyboardWrapper
      isExpanded={isExpanded}
      onClose={() => {
        setIsExpanded(false);
      }}
    >
      {(setRef) => {
        const ref = mergeRefCallback(setRef, forwardRef);
        return (
          <>
            <ActiveProductSearchInput forwardRef={ref}>
              {({
                activeProductId,
                query: value,
                setQuery: setValue,
                forwardRef,
                onOpen,
              }: InputChildrenProps) => {
                const commonProps = {
                  onInput: setValue,
                  isLoading: false,
                  debounceTime: 250,
                  onNavigate: () => {},
                  forwardRef,
                  value,
                  isExpanded,
                  onOpen,
                };

                switch (activeProductId) {
                  case 'confluence':
                    return (
                      <ProductSearchInput
                        {...commonProps}
                        advancedSearchURL={'advanced/search/url'}
                        actionSubjectId={'confluence'}
                        expandedPlaceholder={'Search Connie'}
                        collapsedPlaceholder={'Confluence'}
                      />
                    );
                  default:
                    return (
                      <ProductSearchInput
                        {...commonProps}
                        advancedSearchURL={'advanced/search/url'}
                        actionSubjectId={'generic-product'}
                        expandedPlaceholder={'Search in the dynamic product'}
                        collapsedPlaceholder={'Search'}
                      />
                    );
                }
              }}
            </ActiveProductSearchInput>
            <SearchDialog>
              <ProductTabs />
              {products.find((product) => product === Products.confluence) && (
                <AsyncProduct
                  id="confluence"
                  title="conflugoo"
                  sections={[
                    {
                      id: 'confluence.page,blogpost,attachment',
                      title: 'Confluence pages',
                    },
                  ]}
                >
                  <LegacyContextConverter>
                    <ConfluenceSearchDialog
                      isExpanded={isExpanded}
                      debounceTime={250}
                      linkComponent={LoggingLinkComponent}
                      formatDate={(lastModified: string) => (
                        <FormattedDate lastModified={lastModified} />
                      )}
                      onRetry={() => {}}
                    />
                  </LegacyContextConverter>
                </AsyncProduct>
              )}
              <AsyncProduct
                id="bitbucket"
                title="buttbucket"
                sections={[
                  { id: 'bitbucket.repository', title: 'Bitbucket Repository' },
                ]}
              >
                <div>boitbuckle</div>
              </AsyncProduct>
            </SearchDialog>
          </>
        );
      }}
    </KeyboardWrapper>
  );
};

const SearchDrawer = ({
  locale,
  confluenceConfig,
  theme,
  products,
  keepSearchOpen,
}: {
  locale: string;
  confluenceConfig: ConfluenceSearchClientConfig;
  theme: NavigationTheme;
  confluenceFeatures: ConfluenceFeatures;
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
            <MetaContextProvider
              theme={theme ? theme.mode.search : undefined}
              isExpanded={keepSearchOpen || isOpen}
              setIsExpanded={toggleOpen}
            >
              <Example forwardRef={ref} products={products} />
            </MetaContextProvider>
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
  theme: NavigationTheme;
  confluenceFeatures: ConfluenceFeatures;
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
        theme={theme}
        confluenceFeatures={confluenceFeatures}
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
  const defaultConfluenceValue: keyof typeof presetConfig =
    AllowedSites.confOnly;
  const confluenceConfigKey: keyof typeof presetConfig = radios(
    'Confluence Instance',
    options,
    defaultConfluenceValue,
    'confluence',
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
    ...ConfluenceDefaultFeatures,
  };

  const features: ConfluenceFeatures = Object.keys(availableFeatures).reduce(
    (acc, key) => {
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
    },
    {},
  ) as any;

  const products: Products[] = array(
    'Products',
    ['confluence'],
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
    baseUrl: 'wiki',
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

  return (
    <NavV3
      user={user}
      locale={locale}
      confluenceConfig={confluenceConfig}
      theme={theme}
      confluenceFeatures={features}
      products={products}
      keepSearchOpen={keepSearchOpen}
    />
  );
};
