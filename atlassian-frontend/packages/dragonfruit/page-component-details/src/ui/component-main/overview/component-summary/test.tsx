import React from 'react';

import { render } from '@testing-library/react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentSummary from './index';

const inlineDescriptionTestId =
  'dragonfruit-page-component-details.ui.description.inline-description.empty-state';
const emptyStateDataManagerTestId =
  'dragonfruit-page-component-details.ui.description.content-section.empty-state';

describe('ComponentSummary', () => {
  describe('empty state', () => {
    it('shows disabled state when data manager', () => {
      const { queryByTestId } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider locale="en">
            <ComponentSummary
              componentId="id"
              componentDescription={null}
              dataManager={mockDataManager}
            />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      expect(queryByTestId(emptyStateDataManagerTestId)).toBeDefined();
      expect(queryByTestId(inlineDescriptionTestId)).toBeNull();
    });

    it('shows inline edit when there is no data manager', () => {
      const { queryByTestId } = render(
        <ApolloAutoMockProvider>
          <CompassTestProvider locale="en">
            <ComponentSummary componentId="id" componentDescription={null} />
          </CompassTestProvider>
        </ApolloAutoMockProvider>,
      );

      expect(queryByTestId(emptyStateDataManagerTestId)).toBeNull();
      expect(queryByTestId(inlineDescriptionTestId)).toBeDefined();
    });
  });
});
