import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import { mockDataManager } from '@atlassian/dragonfruit-external-component-management';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ComponentOwnerEmptyState from './index';

describe('ComponentOwnerEmptyState', () => {
  it('should display card with proper test id, button and header with proper text', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <CompassTestProvider locale="en">
        <MockedProvider addTypename={false} mocks={[]}>
          <ComponentOwnerEmptyState componentId={'1234'} />
        </MockedProvider>
      </CompassTestProvider>,
    );
    expect(
      getByTestId('dragonfruit.teams.component-owner-empty-state'),
    ).toBeInTheDocument();
    expect(getByText('No owner team')).toBeInTheDocument();
    expect(getByText('Add owner team')).toBeInTheDocument();
    expect(queryByText('Set in compass.yml')).not.toBeInTheDocument();
  });

  it('should display proper button when there is an data manager', async () => {
    const { getByText, queryByText } = render(
      <CompassTestProvider locale="en">
        <MockedProvider addTypename={false} mocks={[]}>
          <ComponentOwnerEmptyState
            componentId={'1234'}
            dataManager={mockDataManager}
          />
        </MockedProvider>
      </CompassTestProvider>,
    );
    expect(getByText('Set in compass.yml')).toBeInTheDocument();
    expect(queryByText('Add owner team')).not.toBeInTheDocument();
  });
});
