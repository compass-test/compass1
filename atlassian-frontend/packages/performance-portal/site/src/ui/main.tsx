import '@atlaskit/css-reset';

import React, { Suspense } from 'react';

import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { RouteComponent } from 'react-resource-router';

import { Loading } from '@atlassian/performance-portal-common';
import { RelayEnvironment } from '@atlassian/performance-portal-gql-client';

import type { mainAppQuery } from './__generated__/mainAppQuery.graphql';
import { Header } from './component/header';

const MainAppQuery = graphql`
  query mainAppQuery {
    ...headerFragment
  }
`;

const mainAppQueryRef = loadQuery<mainAppQuery>(
  RelayEnvironment,
  MainAppQuery,
  {},
);

export const App = () => {
  const data = usePreloadedQuery(MainAppQuery, mainAppQueryRef);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header data={data} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <RouteComponent />
      </Suspense>
    </>
  );
};
