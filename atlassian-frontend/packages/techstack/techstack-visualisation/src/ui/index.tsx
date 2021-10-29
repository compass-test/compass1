import React from 'react';

import { Route } from '@atlaskit/router';

import { AppRouterProvider } from '../controllers/router';

import { Content } from './content';
import { DetailsModal } from './details-modal';
import { Home } from './home';
import { RepositoryView } from './repository-view';
import { Navigation } from './top-nav';

const appRoutes: Route[] = [
  {
    name: 'home',
    path: `/`,
    exact: true,
    component: Home,
  },
  {
    name: 'repository',
    path: `/repository/:repositoryName`,
    component: RepositoryView,
  },
];

export const TechstackVisualisation = () => {
  return (
    <AppRouterProvider routes={appRoutes}>
      <Navigation />
      <Content />
      <DetailsModal />
    </AppRouterProvider>
  );
};
