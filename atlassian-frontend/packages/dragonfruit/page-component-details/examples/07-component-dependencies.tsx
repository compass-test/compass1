import React from 'react';

import { v4 as uuid } from 'uuid';

import { PageLayout } from '@atlaskit/page-layout';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';
import { ComponentDetailPageUrlParam } from '@atlassian/dragonfruit-utils';

import { ComponentDetails } from '../src';
import {
  MOCKED_EMPTY_RELATIONSHIP_QUERY,
  MOCKED_SEARCH_RESULTS,
  RELATIONSHIP_VIEW_ACTION_SUCCESS_RESOLVER,
} from '../src/common/mocks';

const RELATIONSHIP_MOCKS = {
  ...MOCKED_EMPTY_RELATIONSHIP_QUERY,
  ...MOCKED_SEARCH_RESULTS,
};

export default function ComponentDependencies() {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider
        mocks={RELATIONSHIP_MOCKS}
        resolvers={RELATIONSHIP_VIEW_ACTION_SUCCESS_RESOLVER}
      >
        <PageLayout>
          <ComponentDetails
            componentResourceId={uuid()}
            pageType={ComponentDetailPageUrlParam.DEPENDENCIES}
          />
        </PageLayout>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
