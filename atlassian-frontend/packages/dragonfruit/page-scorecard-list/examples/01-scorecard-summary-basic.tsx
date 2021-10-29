import React from 'react';

import faker from 'faker';

import Page, { Grid, GridColumn } from '@atlaskit/page';
import {
  AccountStatus,
  CompassComponentType,
  CompassScorecard,
  CompassScorecardImportance,
  fake,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ScorecardSummary from '../src/ui/page-scorecard-list/scorecard-summary';

const FakeCompassScorecard = fake<CompassScorecard>({
  owner: {
    accountId: '1234',
    accountStatus: AccountStatus.ACTIVE,
    name: 'test',
    picture: null,
  },
  id: 'fake-scorecard-id',
  name: faker.random.words(2),
  description: faker.lorem.paragraph(),
  criterias: [],
  componentType: CompassComponentType.APPLICATION,
  importance: CompassScorecardImportance.RECOMMENDED,
  changeMetadata: {},
});

export default function Basic() {
  return (
    <Page>
      <Grid>
        <GridColumn medium={5}>
          <CompassTestProvider>
            <ApolloAutoMockProvider>
              <ScorecardSummary
                scorecard={FakeCompassScorecard() as CompassScorecard}
                isAdmin={true}
                onEdit={() => 'Placeholder edit action'}
                onDelete={() => 'Placeholder delete action'}
                loading={false}
              />
            </ApolloAutoMockProvider>
          </CompassTestProvider>
        </GridColumn>
      </Grid>
    </Page>
  );
}
