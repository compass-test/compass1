import React from 'react';

import { act, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  reducer,
  useCsvImportReducer,
} from '../../services/csv-import-reducer/main';
import { useThunkReducer } from '../../services/csv-import-reducer/thunk-reducer';
import {
  CsvImportReducer,
  ImportingStep,
} from '../../services/csv-import-reducer/types';

import { useCsvImportContext } from './context';
import { CsvImportController, IMPORT_CSV_LABEL } from './main';

const originalUseCsvImportReducer = useCsvImportReducer;
const mockUseCsvImportReducer = jest.fn();

jest.mock('../../services/csv-import-reducer', () =>
  Object.assign({}, jest.requireActual('../../services/csv-import-reducer'), {
    useCsvImportReducer: () => mockUseCsvImportReducer(),
  }),
);

const ChildComponent = () => {
  const { state } = useCsvImportContext();
  expect(state.step).toEqual('INITIAL');

  return <div />;
};

describe('CsvImportController', () => {
  beforeEach(() => {
    mockUseCsvImportReducer.mockImplementation(() =>
      originalUseCsvImportReducer(),
    );
  });

  test('controller should pass initial state to children', () => {
    render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <CsvImportController>
            <ChildComponent />
          </CsvImportController>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
  });

  test('controller should add label to created and updated components', async () => {
    mockUseCsvImportReducer.mockImplementation(() => {
      const mockImportingState: ImportingStep = {
        step: 'IMPORTING',
        parsedCsv: {
          data: [],
          errors: [],
          meta: {
            delimiter: ',',
            linebreak: '\n',
            aborted: false,
            truncated: false,
            cursor: 1,
          },
        },
        existingComponents: {
          requestIsLoading: false,
        },
        existingComponentsByName: {},
        importComponents: {
          0: {
            data: {
              name: 'create-test',
              type: 'SERVICE' as CompassComponentType,
            },
            importPlan: {
              action: 'CREATE',
            },
            importState: {
              state: 'PENDING',
            },
          },
          1: {
            data: {
              name: 'update-test',
              type: 'SERVICE' as CompassComponentType,
            },
            importPlan: {
              updateComponentId: 'update-test-id',
              action: 'UPDATE',
            },
            importState: {
              state: 'PENDING',
            },
          },
        },
        logs: [],
      };

      const [state, dispatch] = useThunkReducer<CsvImportReducer>(reducer, {
        ...mockImportingState,
      });

      return {
        state,
        dispatch,
        importItemRequest: jest.fn(),
        importItemSuccess: jest.fn(),
        importItemFailure: jest.fn(),
        importComplete: jest.fn(),
      };
    });

    const mutationFn = jest.fn(() => ({
      success: true,
    }));

    const resolvers = () => ({
      Mutation: {
        compass: () => ({
          addComponentLabels: mutationFn,
          createComponent: {
            success: true,
            componentDetails: {
              id: 'create-test-id',
            },
          },
          updateComponent: {
            success: true,
            errors: null,
            componentDetails: {
              id: 'update-test-id',
            },
          },
        }),
      },
    });

    const ImportStarter = () => {
      const { startImport } = useCsvImportContext();

      return <div data-testid={'click-me'} onClick={startImport} />;
    };

    const { getByTestId } = render(
      <ApolloAutoMockProvider resolvers={resolvers}>
        <CompassTestProvider>
          <CsvImportController>
            <ImportStarter />
          </CsvImportController>
        </CompassTestProvider>
      </ApolloAutoMockProvider>,
    );

    const btn = getByTestId('click-me');
    expect(btn).toBeTruthy();

    act(() => {
      userEvent.click(btn);
    });

    await wait(() => expect(mutationFn).toHaveBeenCalledTimes(2));

    // Created component should have called addComponentLabels.
    expect(mutationFn).toHaveBeenCalledWith(
      {
        input: {
          componentId: 'create-test-id',
          labelNames: [IMPORT_CSV_LABEL],
        },
      },
      // Apollo default function parameters, we don't care about these.
      undefined,
      expect.anything(),
    );

    // Updated component should have called addComponentLabels.
    expect(mutationFn).toHaveBeenCalledWith(
      {
        input: {
          componentId: 'update-test-id',
          labelNames: [IMPORT_CSV_LABEL],
        },
      },
      // Apollo default function parameters, we don't care about these.
      undefined,
      expect.anything(),
    );
  });
});
