import '@atlaskit/css-reset';

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import LooselyLazy from 'react-loosely-lazy';
import { createBrowserHistory, Router, useRouter } from 'react-resource-router';

import { InitBM3 } from '@atlassian/performance-portal-analytics';
import { ErrorBoundary, Loading } from '@atlassian/performance-portal-common';
import { useFeatureFlag } from '@atlassian/performance-portal-feature-flags';
import { GqlClientProviders } from '@atlassian/performance-portal-gql-client';

import { GenericErrorFlag } from './component/generic-error-flag';
import { RouteListener } from './component/route-listener';
import { App } from './main';
import { getRoutes } from './routes';
import { Wrapper } from './styled';

LooselyLazy.init({ mode: 'RENDER' });

interface Props {
  graphqlEndpoint: string;
}

const history = createBrowserHistory();

const Content = ({ hasApolloGqlError }: { hasApolloGqlError: boolean }) => {
  const errorBoundaryFallback = useCallback(() => <GenericErrorFlag />, []);

  const isMetricPageWithRelayEnabled = useFeatureFlag(
    'metric-page.with-relay',
    false,
  );

  const routes = useMemo(() => getRoutes(isMetricPageWithRelayEnabled), [
    isMetricPageWithRelayEnabled,
  ]);

  return (
    <Router history={history} routes={routes}>
      <>
        <RouteListener />
        <Wrapper>
          <ErrorBoundary fallback={errorBoundaryFallback}>
            <App />
          </ErrorBoundary>
          {hasApolloGqlError && <GenericErrorFlag />}
        </Wrapper>
      </>
    </Router>
  );
};

export const Site = (props: Props) => {
  const [hasApolloGqlError, setHasGqlError] = useState<boolean>(false);

  const [routerState] = useRouter();

  useEffect(() => {
    setHasGqlError(false);
  }, [routerState.match.url]);

  const onApoloGqlErrorHandler = useCallback(() => {
    setHasGqlError(true);
  }, []);

  const errorBoundaryFallback = useCallback(() => <GenericErrorFlag />, []);

  return (
    <>
      <InitBM3 />
      <ErrorBoundary fallback={errorBoundaryFallback}>
        <GqlClientProviders onApolloGqlError={onApoloGqlErrorHandler}>
          <Suspense fallback={<Loading />}>
            <Content hasApolloGqlError={hasApolloGqlError} />
          </Suspense>
        </GqlClientProviders>
      </ErrorBoundary>
    </>
  );
};
