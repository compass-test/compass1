import { ParseResult } from 'papaparse';

import {
  CompassComponent,
  CompassSearchComponentFragment,
} from '@atlassian/dragonfruit-graphql';

import { useThunkReducer } from './thunk-reducer';
import {
  CsvImportReducer,
  CsvRow,
  CsvRowNumber,
  ImportComponent,
  ImportPlanState,
  PreviewStep,
  State,
} from './types';

const initialState: State = {
  step: 'INITIAL',
};

export const reducer: CsvImportReducer = (state, action) => {
  switch (action.type) {
    // Reset the wizard back to the start
    case 'RESET_WIZARD':
      return initialState;

    // Import a parsed CSV
    case 'IMPORT_PARSED_CSV':
      return {
        step: 'CONFIGURE',
        parsedCsv: action.payload.parsedCsv,
        importComponents: action.payload.parsedCsv.data.reduce(
          (acc, row, index) => {
            const rowNumber = index + 1;
            const importComponent: ImportComponent = {
              data: {
                name: row.name,
                type: row.type,
                description: row.description,
              },
              importPlan: {
                action: 'CREATE', // Default to the create action
              },
              importState: {
                state: 'PENDING',
              },
            };
            return { ...acc, [rowNumber]: importComponent };
          },
          {},
        ),
      };

    // For our first iteration there are no options, so this simply continues the flow
    case 'CONFIGURATION_COMPLETE':
      if (state.step !== 'CONFIGURE') {
        throw new Error('Must be in the configuration step to complete it');
      }

      return {
        ...state,
        step: 'PREVIEW', // Move to the next step
        existingComponents: {
          requestIsLoading: true,
        },
        existingComponentsByName: {},
      };

    // Start the process of loading in existing components
    case 'PREVIEW_REQUEST':
      if (state.step !== 'PREVIEW') {
        throw new Error(
          'Must be in the preview step to start receiving preview components',
        );
      }

      return {
        ...state,
        step: 'PREVIEW',
        existingComponents: { requestIsLoading: true },
      };

    // This function should be called each time a page of existing components is received
    case 'PREVIEW_SUCCESS':
      if (state.step !== 'PREVIEW') {
        throw new Error(
          'Must be in the preview step to receive preview components',
        );
      }

      const existingComponentsByName = action.payload.existingComponents.reduce(
        (acc, component) => {
          acc[component.name] = [...(acc[component.name] ?? []), component];
          return acc;
        },
        {} as PreviewStep['existingComponentsByName'],
      );

      const importComponents = Object.keys(state.importComponents).reduce(
        (acc, key) => {
          const csvData = state.importComponents[key].data;
          const componentName = csvData.name;
          const existingComponents =
            existingComponentsByName[componentName] ?? [];
          let plan = {
            action: 'SKIP',
            skipReason: "Couldn't import",
          } as ImportPlanState; // Should not occur
          if (existingComponents.length === 1) {
            if (existingComponents[0].type === csvData.type) {
              plan = {
                action: 'UPDATE',
                updateComponentId: existingComponents[0].id,
              };
            } else {
              plan = {
                action: 'SKIP',
                skipReason:
                  'Component with same name but different type already exists',
              };
            }
          } else if (existingComponents.length === 0) {
            plan = { action: 'CREATE' };
          } else if (existingComponents.length > 1) {
            plan = {
              action: 'SKIP',
              skipReason: 'Multiple components with the same name exist',
            };
          }

          acc[key] = {
            ...state.importComponents[key],
            importPlan: plan,
          };
          return acc;
        },
        {} as PreviewStep['importComponents'],
      );

      return {
        ...state,
        existingComponents: {
          requestIsLoading: false,
        },
        existingComponentsByName,
        importComponents,
      };

    // Call this if an error occurs during the planning
    case 'PREVIEW_FAILURE':
      if (state.step !== 'PREVIEW') {
        throw new Error('Must be in the preview step');
      }

      return {
        ...state,
        step: 'PREVIEW',
        existingComponents: {
          requestIsLoading: false,
          requestErrorMessage: action.payload.errorMessage,
        },
      };
    // All existing components have been retrieved and planning is complete
    case 'PREVIEW_COMPLETE':
      if (state.step !== 'PREVIEW') {
        throw new Error('Must be in the preview step');
      }

      return {
        ...state,
        step: 'IMPORTING', // Move to the next step
        logs: ['Staring import'],
      };

    // Start the request/mutation to create/update a component
    case 'IMPORT_ITEM_REQUEST':
      if (state.step !== 'IMPORTING') {
        throw new Error('Must be in the import step');
      }

      return {
        ...state,
        importComponents: {
          ...state.importComponents,
          [action.payload.rowNumber]: {
            ...state.importComponents[action.payload.rowNumber],
            importState: { state: 'IN_PROGRESS' },
          },
        },
      };

    // A component failed to import
    case 'IMPORT_ITEM_FAILURE': {
      if (state.step !== 'IMPORTING') {
        throw new Error('Must be in the import step');
      }

      const importComponent = state.importComponents[action.payload.rowNumber];

      return {
        ...state,
        importComponents: {
          ...state.importComponents,
          [action.payload.rowNumber]: {
            ...state.importComponents[action.payload.rowNumber],
            importState: {
              state: 'FAILURE',
              errorMessage: action.payload.errorMessage,
            },
          },
        },
        logs: [
          ...state.logs,
          `Failed to import ${importComponent.data.name}: ${action.payload.errorMessage}`,
        ],
      };
    }

    // A component was skipped
    case 'IMPORT_ITEM_SKIP': {
      if (state.step !== 'IMPORTING') {
        throw new Error('Must be in the import step');
      }

      const importComponent = state.importComponents[action.payload.rowNumber];

      return {
        ...state,
        importComponents: {
          ...state.importComponents,
          [action.payload.rowNumber]: {
            ...state.importComponents[action.payload.rowNumber],
            importState: {
              state: 'SKIP',
              skipMessage: action.payload.skipMessage,
            },
          },
        },
        logs: [
          ...state.logs,
          `Skipped importing ${importComponent.data.name}: ${action.payload.skipMessage}`,
        ],
      };
    }

    // A component successfully imported
    case 'IMPORT_ITEM_SUCCESS': {
      if (state.step !== 'IMPORTING') {
        throw new Error('Must be in the import step');
      }

      const importComponent = state.importComponents[action.payload.rowNumber];

      const log =
        importComponent.importPlan.action === 'CREATE'
          ? `Created "${importComponent.data.name}"`
          : `Updated "${importComponent.data.name}"`;

      if (importComponent.importPlan.action === 'SKIP') {
        throw new Error('Skip is not a success - illegal state');
      }

      return {
        ...state,
        importComponents: {
          ...state.importComponents,
          [action.payload.rowNumber]: {
            ...state.importComponents[action.payload.rowNumber],
            importState: {
              state: 'SUCCESS',
              action: importComponent.importPlan.action,
              componentId: action.payload.componentId,
            },
          },
        },
        logs: [...state.logs, log],
      };
    }

    // The import process/loop is complete!
    case 'IMPORT_COMPLETE':
      if (state.step !== 'IMPORTING') {
        throw new Error('Must be in the import step');
      }

      return {
        ...state,
        step: 'COMPLETE', // Move to the next step
        logs: [...state.logs, 'Import complete'],
      };

    default:
      throw new Error('Unknown CSV import reducer action');
  }
};

export function useCsvImportReducer() {
  const [state, dispatch] = useThunkReducer<CsvImportReducer>(
    reducer,
    initialState,
  );

  /**
   * The functions below are just for convenience, so that we don't have to
   * constantly call dispatch and remember the payload format.
   */

  function resetWizard() {
    dispatch({ type: 'RESET_WIZARD' });
  }

  function importParsedCsv(parsedCsv: ParseResult<CsvRow>) {
    dispatch({ type: 'IMPORT_PARSED_CSV', payload: { parsedCsv } });
  }

  function configurationComplete() {
    dispatch({ type: 'CONFIGURATION_COMPLETE' });
  }

  function previewRequest() {
    dispatch({ type: 'PREVIEW_REQUEST' });
  }

  function previewSuccess(
    existingComponents: CompassSearchComponentFragment[],
  ) {
    dispatch({
      type: 'PREVIEW_SUCCESS',
      payload: { existingComponents },
    });
  }

  function previewFailure(errorMessage: string) {
    dispatch({ type: 'PREVIEW_FAILURE', payload: { errorMessage } });
  }

  function previewComplete() {
    dispatch({ type: 'PREVIEW_COMPLETE' });
  }

  function importItemRequest(rowNumber: CsvRowNumber) {
    dispatch({ type: 'IMPORT_ITEM_REQUEST', payload: { rowNumber } });
  }

  function importItemFailure(rowNumber: CsvRowNumber, errorMessage: string) {
    dispatch({
      type: 'IMPORT_ITEM_FAILURE',
      payload: { rowNumber, errorMessage },
    });
  }

  function importItemSkip(rowNumber: CsvRowNumber, skipMessage: string) {
    dispatch({
      type: 'IMPORT_ITEM_SKIP',
      payload: { rowNumber, skipMessage },
    });
  }

  function importItemSuccess(
    rowNumber: CsvRowNumber,
    componentId: CompassComponent['id'],
  ) {
    dispatch({
      type: 'IMPORT_ITEM_SUCCESS',
      payload: { rowNumber, componentId },
    });
  }

  function importComplete() {
    dispatch({ type: 'IMPORT_COMPLETE' });
  }

  return {
    state,
    dispatch,

    resetWizard,
    importParsedCsv,
    configurationComplete,

    previewRequest,
    previewFailure,
    previewSuccess,
    previewComplete,

    importItemRequest,
    importItemFailure,
    importItemSkip,
    importItemSuccess,
    importComplete,
  };
}
