import React, { FC } from 'react';

import { createBrowserHistory } from 'history';

import { Route, Router } from '@atlaskit/router';

const history = createBrowserHistory();
export const AppRouterProvider: FC<{ routes: Route[] }> = ({
  routes,
  children,
}) => (
  <Router isStatic={false} routes={routes} history={history}>
    {children}
  </Router>
);
