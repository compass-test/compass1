import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import UpdateOwnerForm from './index';

describe('UpdateOwnerModal', () => {
  test('Should be found by data-testid', () => {
    const testId = 'dragonfruit-update-component-owner-modal';
    const { getByTestId, getByText } = render(
      <CompassTestProvider locale="en">
        <MockedProvider addTypename={false} mocks={[]}>
          <UpdateOwnerForm
            onCancel={jest.fn()}
            updateOwner={jest.fn()}
            defaultValues={undefined}
            isEditModal={false}
            componentId={'testId'}
          />
        </MockedProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByText('Add component owner')).toBeInTheDocument();
  });

  test('Should be found by data-testid', () => {
    const testId = 'dragonfruit-update-component-owner-modal';
    const { getByTestId, getByText } = render(
      <CompassTestProvider locale="en">
        <MockedProvider addTypename={false} mocks={[]}>
          <UpdateOwnerForm
            onCancel={jest.fn()}
            updateOwner={jest.fn()}
            defaultValues={undefined}
            isEditModal={true}
            componentId={'testId'}
          />
        </MockedProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByText('Edit component owner')).toBeInTheDocument();
  });
});
