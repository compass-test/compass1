import React from 'react';

import { Helmet } from 'react-helmet';
import LooselyLazy from 'react-loosely-lazy';
import {
  createBrowserHistory,
  RouteComponent,
  Router,
} from 'react-resource-router';

import { PageLayout, RightPanel, TopNavigation } from '@atlaskit/page-layout';
import { useHelp } from '@atlassian/dragonfruit-in-product-help';
import { Intercom } from '@atlassian/dragonfruit-intercom';
import DragonfruitNavigation from '@atlassian/dragonfruit-navigation';
import { Onboarding } from '@atlassian/dragonfruit-onboarding';
import { RouteListener } from '@atlassian/dragonfruit-performance';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { FallbackErrorPage } from '../common/ui/error-page';
import { withProviders } from '../services';
import { useAppState } from '../services/app-context';

import { AppStateHandler } from './app-state-handler';
import { LoadingScreen } from './loading-screen';
import routes from './routes';

LooselyLazy.init({ mode: 'RENDER' });

const App = () => {
  const appState = useAppState();
  const [{ isHelpOpen }] = useHelp();

  return (
    <Router history={createBrowserHistory()} routes={routes}>
      {/* TODO: Consider merging loadingScreen and AppStateHandler to handle loading, errors and redirects */}
      <RouteListener />
      <LoadingScreen />
      <AppStateHandler />

      {appState.success && (
        <PageLayout>
          <Helmet>
            <title>Compass</title>
          </Helmet>

          <TopNavigation>
            <DragonfruitNavigation />
          </TopNavigation>
          <Onboarding />
          <Intercom />

          <RouteComponent />
          {isHelpOpen && (
            <RightPanel>
              {/* Add anchor for help-panel to attach to */}
              <div id="help-panel" />
            </RightPanel>
          )}
        </PageLayout>
      )}
    </Router>
  );
};

// We have to provide the FallbackErrorPage here because if an error occurs
// at this level we won't have the IntlProvider available
export default withErrorBoundary(withProviders(App), {
  componentName: 'app',
  Fallback: FallbackErrorPage,
});
