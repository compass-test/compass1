import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { RecentComponentsProvider } from '@atlassian/dragonfruit-component-create-modal';
import { UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW } from '@atlassian/dragonfruit-feature-flags';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { resultsMock } from './mocks';

import { ComponentsTable } from './index';

describe('ComponentsTable', () => {
  let result: RenderResult;

  const tableTestId = 'dragonfruit-components.ui.component-list--table';

  beforeEach(() => {
    jest.resetAllMocks();

    result = render(
      <ApolloAutoMockProvider>
        <RecentComponentsProvider>
          <CompassTestProvider>
            <ComponentsTable
              emptyState={<div />}
              loading={false}
              teamId={'abc123'}
              results={resultsMock}
            />
          </CompassTestProvider>
        </RecentComponentsProvider>
      </ApolloAutoMockProvider>,
    );
  });

  it('should render the ComponentsTable', () => {
    expect(result.getByTestId(tableTestId)).toBeTruthy();
  });

  it('should not render the scorecards column when the UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW FF is toggled off', () => {
    expect(result.queryByText('Scorecards')).toBeNull();
  });

  describe('The UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW FF is toggled on', () => {
    it('should render the scorecards column', () => {
      const flags = {
        [UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW]: true,
      };
      const { getByText } = render(
        <ApolloAutoMockProvider>
          <RecentComponentsProvider>
            <CompassTestProvider flags={flags}>
              <ComponentsTable
                emptyState={<div />}
                loading={false}
                teamId={'abc123'}
                results={resultsMock}
              />
            </CompassTestProvider>
          </RecentComponentsProvider>
        </ApolloAutoMockProvider>,
      );

      expect(getByText('Scorecards')).toBeTruthy();
    });
  });
});
