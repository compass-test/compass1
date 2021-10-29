import React from 'react';

import { render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { LibrariesView } from './index';

describe('LibrariesView', () => {
  const listFilterButtonTestId =
    'dragonfruit-page-component-list.ui.list-filter-button';

  it('renders unowned component filter button', async () => {
    const { findByTestId } = render(
      <ApolloAutoMockProvider>
        <CompassTestProvider>
          <LibrariesView />
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    const listFilterButton = await findByTestId(listFilterButtonTestId);

    expect(listFilterButton).toBeInTheDocument();
  });
});
