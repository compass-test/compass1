/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import FabricAnalyticsListeners, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import { colors } from '@atlaskit/theme';
import { setGlobalTheme } from '@atlaskit/tokens';
import Loadable from '../../components/WrappedLoader';
import qs from 'query-string';

import packageResolver from '../../utils/packageResolver';
import * as fs from '../../utils/fs';
import { File } from '../../types';
import Loading from '../../components/Loading';
import { Theme } from '../../types';
import Helmet from 'react-helmet';

const ErrorMessage = styled.div`
  background-color: ${colors.R400};
  color: white;
  font-size: 120%;
  padding: 1em;
`;

export type State = {
  packageId: string;
  groupId: string;
  exampleId: string;
  examplesPath: string | undefined;
  client: AnalyticsWebClient;
  theme: Theme;
};

export type ExampleLoaderProps = {
  example: File;
  client: AnalyticsWebClient;
};

// Using console.debug instead of console.log to reduce noise.
// Chrome's default logging level excludes debug
const mockClient: AnalyticsWebClient = {
  sendUIEvent: e => console.debug('UI event', e),
  sendOperationalEvent: e => console.debug('Operational event', e),
  sendTrackEvent: e => console.debug('Track event', e),
  sendScreenEvent: e => console.debug('Screen event', e),
};

export default class ExamplesIFrame extends React.Component<{}, State> {
  state: State = {
    packageId: '',
    groupId: '',
    exampleId: '',
    examplesPath: undefined,
    client: mockClient,
    theme: 'none',
  };

  async UNSAFE_componentWillMount() {
    if (window) {
      const {
        packageId,
        groupId,
        exampleId,
        examplesPath,
        mode: theme = 'none',
      } = qs.parse(window.location.search);
      this.setState({
        packageId,
        groupId,
        exampleId,
        examplesPath,
        theme,
      });
      if (theme !== 'none') {
        console.log('Theme is set to', theme);
      }
    }
    /* This variable is set by pipelines. */
    if (ENABLE_ANALYTICS_GASV3) {
      try {
        /* eslint-disable import/no-unresolved */
        const analyticsWebClientModule = await import(
          /* webpackChunkName: "@atlaskit-internal_analytics-web-client" */ '@atlassiansox/analytics-web-client'
        );

        const {
          default: AnalyticsWebClient,
          originType,
          envType,
          platformType,
        } = analyticsWebClientModule;
        const analyticsWebClient = new AnalyticsWebClient({
          env: envType.DEV,
          product: 'atlaskit',
          origin: originType.WEB,
          platform: platformType.WEB,
          subproduct: 'website',
          user: '-',
          serverTime: Date.now(),
        });
        analyticsWebClient.startUIViewedEvent();
        this.setState({ client: analyticsWebClient });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { example, packageId, exampleId } = packageResolver(
      this.state.groupId,
      this.state.packageId,
      this.state.exampleId,
      this.state.examplesPath,
    );

    if (this.state.theme && this.state.theme !== 'none') {
      setGlobalTheme(this.state.theme);
    }

    return (
      <>
        <Helmet>
          <link
            rel="stylesheet"
            href={`${PUBLIC_PATH}css/charlie-display-font.css`}
          />
          {['light', 'dark']
            .filter(() => this.state.theme !== 'none')
            .map(theme => (
              <link
                key={`${PUBLIC_PATH}css/atlassian-${theme}.css`}
                rel="stylesheet"
                href={`${PUBLIC_PATH}css/atlassian-${theme}.css`}
              />
            ))}
        </Helmet>
        {example && exampleId ? (
          <ExampleLoader example={example as File} client={this.state.client} />
        ) : (
          <ErrorMessage>
            {`${fs.titleize(packageId)} does not have an example built for '${
              this.state.exampleId
            }'`}
          </ErrorMessage>
        )}
      </>
    );
  }
}

export type Metadata = {
  meta?: {
    noListener?: boolean;
  };
};

export type Example = {
  default: React.ComponentType & Metadata;
};

function ExampleLoader(props: ExampleLoaderProps) {
  const ExampleComponent = Loadable({
    loader: () => props.example.exports(),
    loading: () => <Loading />,
    render(loaded: Example) {
      const ExampleComp = loaded.default;
      if (!ExampleComp) {
        return (
          <ErrorMessage>
            Example "{props.example.id}" doesn't have default export.
          </ErrorMessage>
        );
      }

      const meta = ExampleComp.meta || {};

      return meta.noListener ? (
        <ExampleComp />
      ) : (
        <FabricAnalyticsListeners client={props.client}>
          <ExampleComp />
        </FabricAnalyticsListeners>
      );
    },
  });

  return <ExampleComponent />;
}
