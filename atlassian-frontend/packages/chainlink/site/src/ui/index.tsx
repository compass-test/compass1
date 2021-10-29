import React from 'react';

import LooselyLazy from 'react-loosely-lazy';

import routes from '@af/statuspage-chainlink-entries';
import { createBrowserHistory, RouteComponent, Router } from '@atlaskit/router';

import { Providers } from '../services';

import { Navigation } from './navigation';

LooselyLazy.init({ mode: 'RENDER' });

export const Site = () => (
  <Providers>
    {/*
    // @ts-ignore */}
    <Router history={createBrowserHistory()} routes={routes}>
      <Navigation />
      <RouteComponent />
    </Router>
  </Providers>
);
