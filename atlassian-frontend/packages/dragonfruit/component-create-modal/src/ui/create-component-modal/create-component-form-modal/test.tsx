import React from 'react';

import { render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CreateComponentModalProvider } from '../../../controllers/create-component-modal-controller';

import { CreateComponentFormModal } from './index';

describe('CreateComponentFormModal', () => {
  describe('Modal selectors', () => {
    test('Should be found by data-testid when testId prop exists', async () => {
      const testId = 'create-component';

      const { getByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <CreateComponentModalProvider>
              <CreateComponentFormModal testId={testId} />
            </CreateComponentModalProvider>
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(getByTestId(testId + '-form-modal')).toBeInTheDocument();
    });

    test('Should be found by data-testid when testId prop does not exist', async () => {
      const testId = 'create-component-form-modal';

      const { getByTestId } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <CreateComponentModalProvider>
              <CreateComponentFormModal />
            </CreateComponentModalProvider>
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(getByTestId(testId)).toBeInTheDocument();
    });

    // This is how we select the modal in our pollinator tests.
    // If this test fails then we need to check pollinator.
    test('Should be found by [role=dialog]', async () => {
      const { getByRole } = render(
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <CreateComponentModalProvider>
              <CreateComponentFormModal />
            </CreateComponentModalProvider>
          </ApolloAutoMockProvider>
        </CompassTestProvider>,
      );

      expect(getByRole('dialog')).toBeInTheDocument();
    });
  });
});
