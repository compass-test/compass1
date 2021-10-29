import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import DeleteOwnerModal from './index';

describe('UpdateOwnerModal', () => {
  test('Should be found by data-testid', () => {
    const testId = 'dragonfruit-update-component-owner-modal';
    const { getByTestId, getByText } = render(
      <CompassTestProvider locale="en">
        <MockedProvider addTypename={false} mocks={[]}>
          <DeleteOwnerModal
            onCancel={jest.fn()}
            updateOwner={jest.fn()}
            componentId={'testId'}
          />
        </MockedProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByText('Remove this owner')).toBeInTheDocument();
  });
});
