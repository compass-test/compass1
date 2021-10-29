/*global IS_PRIVATE_WEBSITE,COMMIT_HASH*/
import React, { FunctionComponent } from 'react';
import Media from 'react-media';
import GlobalTheme from '@atlaskit/theme';
import Page from '@atlaskit/page';
import { RouteProps, RouteComponentProps } from 'react-router';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import { DESKTOP_BREAKPOINT_MIN } from '../constants';
import FullscreenExamples from '../pages/Examples';
import { modalRoutes, pageRoutes } from '../routes';
import ScrollHandler from '../components/ScrollToTop';
import ErrorBoundary from '../components/ErrorBoundary';
import AnalyticsListeners from '../components/Analytics/AnalyticsListeners';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { Theme } from '../types';

const Router: FunctionComponent = props =>
  IS_PRIVATE_WEBSITE ? (
    <HashRouter>{props.children}</HashRouter>
  ) : (
    <BrowserRouter>{props.children}</BrowserRouter>
  );
export default () => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href={`${PUBLIC_PATH}css/charlie-display-font.css`}
        />
      </Helmet>
      <GlobalTheme.Provider value={() => ({ mode: 'light' })}>
        <Router>
          <Media query={`(min-width: ${DESKTOP_BREAKPOINT_MIN}px)`}>
            {(isDesktop: boolean) => (
              <AnalyticsListeners>
                <ScrollHandler />
                <Switch>
                  <Route
                    path="/examples/core/:pkgId?/:exampleId*"
                    component={({
                      match,
                    }: RouteComponentProps<{
                      groupId?: string;
                      pkgId?: string;
                      exampleId: string;
                      theme: Theme;
                    }>) => (
                      <FullscreenExamples
                        match={{
                          ...match,
                          params: {
                            ...match.params,
                            groupId: 'design-system',
                          },
                        }}
                      />
                    )}
                  />
                  <Route
                    path="/examples/:groupId?/:pkgId?/:exampleId*"
                    component={FullscreenExamples}
                  />
                  <Route
                    render={appRouteDetails => (
                      <Page
                        navigation={
                          isDesktop ? (
                            <DesktopNav {...appRouteDetails} />
                          ) : (
                            false
                          )
                        }
                      >
                        {!isDesktop && (
                          <MobileNav appRouteDetails={appRouteDetails} />
                        )}
                        <ErrorBoundary>
                          <Switch>
                            {pageRoutes.map((routeProps: RouteProps, index) => (
                              <Route {...routeProps} key={index} />
                            ))}
                          </Switch>
                          <Switch>
                            {modalRoutes.map((modal: RouteProps, index) => (
                              <Route {...modal} key={index} />
                            ))}
                          </Switch>
                        </ErrorBoundary>
                      </Page>
                    )}
                  />
                </Switch>
              </AnalyticsListeners>
            )}
          </Media>
        </Router>
      </GlobalTheme.Provider>
    </>
  );
};
