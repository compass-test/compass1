import { Reducer } from 'react';

import { ParseResult } from 'papaparse';

import {
  CompassComponent,
  CompassComponentType,
  CompassSearchComponentFragment,
} from '@atlassian/dragonfruit-graphql';
import { Modify } from '@atlassian/dragonfruit-utils';

/**
 * Utility/common types
 */

/**
 * Typed columns that are expected.
 * */
export type CsvRow = {
  name: string;
  type: CompassComponentType;
  description?: string | null | undefined;
};

export type CsvRowNumber = string;

export type ImportComponent = {
  data: CsvRow;

  importPlan: ImportPlanState;
  importState: ImportState;
};

export type ImportPlanState =
  | {
      action: 'CREATE';
    }
  | {
      action: 'UPDATE';
      updateComponentId: string;
    }
  | {
      action: 'SKIP';
      skipReason: string;
    };

type ImportState =
  | {
      state: 'PENDING';
    }
  | {
      state: 'IN_PROGRESS';
    }
  | {
      state: 'FAILURE';
      errorMessage: String;
    }
  | {
      state: 'SKIP';
      skipMessage: String;
    }
  | {
      state: 'SUCCESS';
      action: 'CREATE' | 'UPDATE';
      componentId: CompassComponent['id'];
    };

/**
 * State
 */

/**
 * This is the starting step of the flow, before the user has selected a csv.
 */
export type InitialStep = {
  step: 'INITIAL';
};

/**
 * Configuration page where the user can see a preview of the CSV and set
 * options.
 */
export type ConfigureStep = Modify<
  InitialStep,
  {
    step: 'CONFIGURE';
    parsedCsv: ParseResult<CsvRow>;
    importComponents: Record<CsvRowNumber, ImportComponent>;
  }
>;

/**
 * "Planning" state where we load all of the existing components to determine
 * what to create/update.
 */
export type PreviewStep = Modify<
  ConfigureStep,
  {
    step: 'PREVIEW';
    existingComponents: {
      requestIsLoading: Boolean;
      requestErrorMessage?: String;
    };
    existingComponentsByName: Record<
      NonNullable<CompassComponent['name']>,
      // There can be multiple components with the same name, so this must be an array
      CompassSearchComponentFragment[]
    >;
  }
>;

/**
 * Step where we loop through the importComponents and update their
 * importStatus.
 */
export type ImportingStep = Modify<
  PreviewStep,
  {
    step: 'IMPORTING';
    logs: string[];
  }
>;

/**
 * Display the summary of results.
 */
export type CompleteStep = Modify<
  ImportingStep,
  {
    step: 'COMPLETE';
  }
>;

export type State =
  | InitialStep
  | ConfigureStep
  | PreviewStep
  | ImportingStep
  | CompleteStep;

/**
 * Actions
 */

/**
 * Resets the wizard back to the start
 */
type ResetWizardAction = {
  type: 'RESET_WIZARD';
};

/**
 * Accepts the parsed CSV and moves to the configuration step
 */
type ImportParsedCsvAction = {
  type: 'IMPORT_PARSED_CSV';
  payload: {
    parsedCsv: ConfigureStep['parsedCsv'];
  };
};

/**
 * Finish the configuration step and move forwards.
 */
type ConfigurationCompleteAction = {
  type: 'CONFIGURATION_COMPLETE';
};

type PreviewRequestAction = {
  type: 'PREVIEW_REQUEST';
};
/**
 * Saves a page of exiting components, appending it in the state.
 */
type PreviewSuccessAction = {
  type: 'PREVIEW_SUCCESS';
  payload: {
    existingComponents: CompassSearchComponentFragment[];
  };
};

type PreviewFailureAction = {
  type: 'PREVIEW_FAILURE';
  payload: {
    errorMessage: string;
  };
};

/**
 * Completes planning and moves to the next step.
 */
type PreviewCompleteAction = {
  type: 'PREVIEW_COMPLETE';
};

/**
 * Starts the import process for an item.
 */
type ImportItemRequestAction = {
  type: 'IMPORT_ITEM_REQUEST';
  payload: {
    rowNumber: CsvRowNumber;
  };
};

type ImportItemFailureAction = {
  type: 'IMPORT_ITEM_FAILURE';
  payload: {
    rowNumber: CsvRowNumber;
    errorMessage: string;
  };
};

type ImportItemSkipAction = {
  type: 'IMPORT_ITEM_SKIP';
  payload: {
    rowNumber: CsvRowNumber;
    skipMessage: string;
  };
};

type ImportItemSuccessAction = {
  type: 'IMPORT_ITEM_SUCCESS';
  payload: {
    rowNumber: CsvRowNumber;
    componentId: CompassComponent['id']; // The ID of the component that was created/updated
  };
};

type ImportCompleteAction = {
  type: 'IMPORT_COMPLETE';
};

export type Actions =
  | ResetWizardAction
  | ImportParsedCsvAction
  | ConfigurationCompleteAction
  | PreviewRequestAction
  | PreviewSuccessAction
  | PreviewFailureAction
  | PreviewCompleteAction
  | ImportItemRequestAction
  | ImportItemFailureAction
  | ImportItemSkipAction
  | ImportItemSuccessAction
  | ImportCompleteAction;

export type CsvImportReducer = Reducer<State, Actions>;
