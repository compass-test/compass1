import React, { Component, ComponentType } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { FlagsProvider } from '@atlaskit/flag';
import {
  withCrossFlow,
  WithCrossFlowProps,
} from '@atlassiansox/cross-flow-component-support';
import OriginTracing from '@atlassiansox/origin-tracing';
import * as untypedI18n from './i18n';
import addSupportedLocaleData from './common/i18n/addSupportedLocaleData';

import {
  initAnalyticsClient,
  sendAnalyticsEvent,
} from './common/analytics/analytics-web-client';
import View from './view/connected';
import { WithFireExposureEventProps } from './view/types';
import { Locale } from './common/constants/supported-locales';
import { initialProjectState } from './state/project/reducer';
import { initialContextState } from './state/context/reducer';
import { State } from './state/types';
import { createStore } from './state';
import { set as setExternal } from './state/external/actions';
import { set as setContext } from './state/context/actions';
import { set as setProject } from './state/project/actions';
import { set as setFeatureFlags } from './state/feature-flags/actions';
import { ProjectPagesProvider } from './controllers/project-pages';
import { FeatureFlagsProvider } from './controllers/feature-flags';
import { CONFLUENCE_INACTIVE, CONFLUENCE_ACTIVE } from './state/context/types';
import {
  ReactStateAnalyticsData,
  ScreenTypes,
  AnalyticsSource,
  PROJECT_PAGES_CHANNEL,
} from './common/analytics/util';
import {
  PROJECT_PAGES_SOURCE_COMPONENT,
  PROJECT_PAGES_SOURCE_CONTEXT,
} from './common/constants';

type OwnProps = {
  baseUrl: string;
  external?: any;
  locale: Locale;
  isAdmin: boolean;
  cloudId: string;
  accountId?: string;
  projectKey: string;
  projectId: string | number;
  projectName: string;
  projectType: string;
  environment?: string;
  EmbeddedProductUpdater: ComponentType<any>;
  breadcrumbs: React.ReactElement<any>;
  onGetFeatureFlagValue: Function;
  isGranularPagesExperiment: boolean;
  isJswConfluenceSilentBundlingExperiment: boolean;
  isProjectPagesProductionisation: boolean;
  isEmbeddedPagesExperiment: boolean;
  learnMoreBannerVisibility: boolean;
  dismissLearnMoreBanner: () => void;
  hasConfluence: boolean;
} & WithFireExposureEventProps;

type Props = WithCrossFlowProps & OwnProps;

const i18n: { [index: string]: Object | undefined } = untypedI18n;

const getCodesFromLocale = (locale: string) => {
  const match = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  if (!match) {
    throw Error('Unable to get language and country from invalid Locale');
  }
  const [, language, country] = match;

  return {
    language: language.toLowerCase(),
    country: country.toUpperCase(),
  };
};

class ProjectPagesComponent extends Component<Props> {
  static defaultProps: Partial<Props> = {
    baseUrl: initialContextState.baseUrl,
    locale: initialContextState.locale,
    isAdmin: initialContextState.isAdmin,
    cloudId: initialContextState.cloudId,
    accountId: initialContextState.accountId,
    projectKey: initialProjectState.key,
    projectId: initialProjectState.id,
    projectType: initialProjectState.type,
    projectName: initialProjectState.name,
    environment: 'dev',
    isGranularPagesExperiment: false,
    isJswConfluenceSilentBundlingExperiment: false,
    isProjectPagesProductionisation: false,
    isEmbeddedPagesExperiment: false,
    learnMoreBannerVisibility: true,
    hasConfluence: false,
  };

  constructor(props: Props) {
    super(props);
    const {
      baseUrl,
      locale,
      isAdmin,
      cloudId,
      accountId,
      projectKey,
      projectId,
      projectType,
      projectName,
      environment,
      onGetFeatureFlagValue,
      hasConfluence,
      isProjectPagesProductionisation,
    } = props;

    const origin = new OriginTracing({ product: 'jira' });
    this.store = createStore();
    this.store.dispatch(
      setContext({
        baseUrl: baseUrl as string,
        locale: locale as Locale,
        isAdmin: isAdmin as boolean,
        cloudId: cloudId as string,
        accountId: accountId as string,
        confluenceState: hasConfluence
          ? CONFLUENCE_ACTIVE
          : CONFLUENCE_INACTIVE,
        suggestedKey: initialContextState.suggestedKey,
        // origin: origin as OriginTracing,
        origin,
      }),
    );
    this.store.dispatch(
      setExternal({
        onGetFeatureFlagValue,
        crossFlow: props.crossFlow,
      }),
    );
    this.store.dispatch(
      setProject({
        key: projectKey as string,
        id: projectId as number,
        type: projectType as string,
        name: projectName,
      }),
    );
    this.store.dispatch(
      setFeatureFlags({
        isProjectPagesProductionisation,
      }),
    );

    initAnalyticsClient({
      client: {
        environment,
        locale,
        cloudId,
        accountId,
      },
      context: {
        containerType: 'project',
        containerId: projectId,
        parent: 'projectPages',
      },
    });
  }

  store: Store<State>;

  render() {
    const {
      locale,
      cloudId,
      breadcrumbs,
      EmbeddedProductUpdater,
      isGranularPagesExperiment,
      isJswConfluenceSilentBundlingExperiment,
      isProjectPagesProductionisation,
      isEmbeddedPagesExperiment,
      learnMoreBannerVisibility,
      projectKey,
      hasConfluence,
      onFireExposureEvent,
      dismissLearnMoreBanner,
    } = this.props;
    const { language, country } = getCodesFromLocale(locale as string);
    const messages = i18n[`${language}_${country}`] || i18n[language];
    addSupportedLocaleData();
    return (
      <AnalyticsListener
        channel={PROJECT_PAGES_CHANNEL}
        onEvent={sendAnalyticsEvent}
      >
        <Provider store={this.store}>
          <IntlProvider
            locale={language}
            messages={messages}
            defaultLocale="en"
          >
            <ProjectPagesProvider
              value={{
                locale,
                cloudId,
                projectKey,
              }}
            >
              <FeatureFlagsProvider
                value={{
                  isGranularPagesExperiment,
                  isJswConfluenceSilentBundlingExperiment,
                  isProjectPagesProductionisation,
                  isEmbeddedPagesExperiment,
                  fireFeatureExposed: onFireExposureEvent,
                }}
              >
                <FlagsProvider>
                  <View
                    breadcrumbs={breadcrumbs}
                    locale={locale}
                    EmbeddedProductUpdater={EmbeddedProductUpdater}
                    isGranularPagesExperiment={isGranularPagesExperiment}
                    isJswConfluenceSilentBundlingExperiment={
                      isJswConfluenceSilentBundlingExperiment
                    }
                    learnMoreBannerVisibility={learnMoreBannerVisibility}
                    dismissLearnMoreBanner={dismissLearnMoreBanner}
                    hasConfluence={hasConfluence}
                    onFireExposureEvent={onFireExposureEvent}
                    isEmbeddedPagesExperiment={isEmbeddedPagesExperiment}
                    isProjectPagesProductionisation={
                      isProjectPagesProductionisation
                    }
                  />
                </FlagsProvider>
              </FeatureFlagsProvider>
            </ProjectPagesProvider>
          </IntlProvider>
        </Provider>
      </AnalyticsListener>
    );
  }
}

export default ReactStateAnalyticsData<OwnProps, {}>((_, props) => ({
  containerType: 'project',
  containerId: props.projectId ? `${props.projectId}` : undefined,
  attributes: {
    isGranularPagesExperiment: props.isGranularPagesExperiment,
    hasConfluence: props.hasConfluence,
    projectId: props.projectId,
    sourceComponent: PROJECT_PAGES_SOURCE_COMPONENT,
    sourceContext: PROJECT_PAGES_SOURCE_CONTEXT,
  },
}))(
  AnalyticsSource<OwnProps>(
    'projectPages',
    ScreenTypes.SCREEN,
  )(withCrossFlow(ProjectPagesComponent)),
);
