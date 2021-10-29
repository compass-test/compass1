import React from 'react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  fetchMockGet,
} from '@atlassian/dragonfruit-testing';

import {
  MOCK_TEAM_ID,
  MOCKED_SEARCH_RESULTS,
  MOCKED_TEAM_REQUEST,
} from './component-select/mocks';

import { TeamComponentPickerModal } from './index';

export const TeamComponentPickerModalExample = () => {
  fetchMockGet(MOCKED_TEAM_REQUEST);

  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={MOCKED_SEARCH_RESULTS}>
        <TeamComponentPickerModal
          ownerId={MOCK_TEAM_ID}
          onFormSubmit={async () => {
            'fake';
          }}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};
