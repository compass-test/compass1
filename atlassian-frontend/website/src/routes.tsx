import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ModalTransition } from '@atlaskit/modal-dialog';

import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import Package from './pages/Package';
import Document from './pages/Document';
import FourOhFour from './pages/FourOhFour';
import PackagesList from './pages/PackagesList';
import PackageDocument from './pages/PackageDocument';
import ChangeLogExplorer from './pages/ChangeLogExplorer';
import ChangelogModal from './pages/Package/ChangelogModal';
import ExamplesModal from './pages/Package/ExamplesModal';
import DeprecationsPage from './pages/Deprecations';

const home = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
];

const staticDocs = [
  {
    path: '/docs/:docId*',
    component: Document,
  },
];

const getStartedDoc = [
  {
    path: '/get-started',
    component: GetStarted,
  },
];

const packagesDocs = [
  {
    // Proxy: For legacy 'core' routes
    path: '/packages/core/:pkgId',
    component: (
      props: RouteComponentProps<{ groupId: string; pkgId: string }>,
    ) => {
      const outputPath =
        props.match.params.pkgId === 'analytics' ||
        props.match.params.pkgId === 'analytics-next'
          ? '/analytics'
          : '/design-system';

      return <Redirect to={location.pathname.replace('/core', outputPath)} />;
    },
  },
  { path: '/packages/:groupId/:pkgId/docs/:docId', component: PackageDocument },
  { path: '/packages/:groupId/:pkgId', component: Package },
  { path: '/packages', component: PackagesList },
];

const examples = [
  {
    path: '/packages/examples',
    component: ({ location }: RouteComponentProps) => (
      <Redirect to={location.pathname.replace('/examples', '')} />
    ),
  },
];

const changelogs = [
  {
    // Proxy: For legacy 'core' routes
    path: '/changelog/core/:pkgId/:semver?',
    component: (
      props: RouteComponentProps<{
        groupId: string;
        pkgId: string;
        semver?: string;
      }>,
    ) => (
      <ChangeLogExplorer
        history={props.history}
        match={{
          ...props.match,
          params: {
            ...props.match.params,
            groupId: 'design-system',
          },
        }}
      />
    ),
  },
  { path: '/changelog/:groupId/:pkgId/:semver?', component: ChangeLogExplorer },
];

const deprecations = [{ path: '/deprecations', component: DeprecationsPage }];

const fourOhFour = [
  {
    path: '/error',
    component: FourOhFour,
  },
];

const redirects = [
  {
    path: '/mk-2',
    render: (props: RouteComponentProps) => (
      <Redirect to={props.location.pathname.replace('/mk-2', '')} />
    ),
  },
  {
    path: '/components',
    render: (props: RouteComponentProps) => (
      <Redirect
        to={props.location.pathname.replace('/components', '/packages/core')}
      />
    ),
  },
];

export const pageRoutes = [
  ...redirects,
  ...home,
  ...getStartedDoc,
  ...staticDocs,
  ...packagesDocs,
  ...examples,
  ...changelogs,
  ...fourOhFour,
  ...deprecations,
  // fallback url in case there are no matches
  {
    component: FourOhFour,
  },
];

const changelogModal = [
  {
    // Proxy: For legacy 'core' routes
    path: '/packages/core/:pkgId/changelog/:semver?',
    children: (
      props: RouteComponentProps<{
        groupId: string;
        pkgId: string;
        semver?: string;
      }>,
    ) => (
      <ModalTransition>
        {props.match && (
          <ChangelogModal
            {...props}
            match={{
              ...props.match,
              params: { ...props.match.params, groupId: 'design-system' },
            }}
          />
        )}
      </ModalTransition>
    ),
  },
  {
    path: '/packages/:groupId/:pkgId/changelog/:semver?',
    children: (
      props: RouteComponentProps<{
        groupId: string;
        pkgId: string;
        semver?: string;
      }>,
    ) => (
      <ModalTransition>
        {props.match && <ChangelogModal {...props} />}
      </ModalTransition>
    ),
  },
];

const examplesModal = [
  {
    // Proxy: For legacy 'core' routes
    path: '/packages/core/:pkgId/example/:exampleId',
    children: (
      props: RouteComponentProps<{
        pkgId: string;
        exampleId: string;
        groupId: string;
      }>,
    ) => (
      <ModalTransition>
        {props.match && (
          <ExamplesModal
            match={{
              ...props.match,
              params: {
                ...props.match.params,
                groupId: 'design-system',
              },
            }}
          />
        )}
      </ModalTransition>
    ),
  },
  {
    path: '/packages/:groupId/:pkgId/example/:exampleId',
    children: (
      props: RouteComponentProps<{
        pkgId: string;
        exampleId: string;
        groupId: string;
      }>,
    ) => (
      <ModalTransition>
        {props.match && <ExamplesModal {...props} />}
      </ModalTransition>
    ),
  },
];

export const modalRoutes = [...changelogModal, ...examplesModal];
