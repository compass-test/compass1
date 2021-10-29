import React from 'react';
import {
  Router,
  RouteComponent,
  createBrowserHistory,
} from 'react-resource-router';

import { Header } from './components/Header';
import { routes } from './routes';

export const App: React.FC = () => {
  return (
    <Router history={createBrowserHistory()} routes={routes}>
      <Header />
      <RouteComponent />
    </Router>
  );
};
