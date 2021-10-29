import React from 'react';

import { render } from '@testing-library/react';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CsvImportContextProvider } from '../../../controllers/csv-import-controller/context';
import {
  CompleteStep,
  ConfigureStep,
  ImportingStep,
  PreviewStep,
} from '../../../services/csv-import-reducer/types';

import { configureStepTestId } from './steps/configure';
import { completeStepTestId } from './steps/finished';
import { importStepTestId } from './steps/import';
import { previewStepTestId } from './steps/preview';
import { uploadStepTestId } from './steps/upload';

import { ImportWizard } from './index';

const noop = () => {};

const mockInitialStep = { step: 'INITIAL' };
const mockConfigureStep: ConfigureStep = {
  ...mockInitialStep,
  step: 'CONFIGURE',
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
  importComponents: {},
};
const mockPreviewState: PreviewStep = {
  ...mockConfigureStep,
  step: 'PREVIEW',
  existingComponents: {
    requestIsLoading: false,
  },
  existingComponentsByName: {},
};
const mockImportingState: ImportingStep = {
  ...mockPreviewState,
  step: 'IMPORTING',
  logs: [],
};
const mockCompleteState: CompleteStep = {
  ...mockImportingState,
  step: 'COMPLETE',
};

describe('ImportWizard', () => {
  test('should start at UploadStep', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ImportWizard />
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );
    expect(getByTestId(uploadStepTestId)).toBeTruthy();
  });

  test('should render the CONFIGURE step', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <CsvImportContextProvider
            value={{
              state: mockConfigureStep,
              resetWizard: noop,
              importParsedCsv: noop,
              confirmConfiguration: noop,
              confirmPreview: noop,
              startImport: noop,
            }}
          >
            <ImportWizard />
          </CsvImportContextProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(configureStepTestId)).toBeTruthy();
  });

  test('should render the PREVIEW step', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <CsvImportContextProvider
            value={{
              state: mockPreviewState,
              resetWizard: noop,
              importParsedCsv: noop,
              confirmConfiguration: noop,
              confirmPreview: noop,
              startImport: noop,
            }}
          >
            <ImportWizard />
          </CsvImportContextProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(previewStepTestId)).toBeTruthy();
  });

  test('should render the IMPORTING step', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <CsvImportContextProvider
            value={{
              state: mockImportingState,
              resetWizard: noop,
              importParsedCsv: noop,
              confirmConfiguration: noop,
              confirmPreview: noop,
              startImport: noop,
            }}
          >
            <ImportWizard />
          </CsvImportContextProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(importStepTestId)).toBeTruthy();
  });

  test('should render the COMPLETE step', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <CsvImportContextProvider
            value={{
              state: mockCompleteState,
              resetWizard: noop,
              importParsedCsv: noop,
              confirmConfiguration: noop,
              confirmPreview: noop,
              startImport: noop,
            }}
          >
            <ImportWizard />
          </CsvImportContextProvider>
        </ApolloAutoMockProvider>
      </CompassTestProvider>,
    );

    expect(getByTestId(completeStepTestId)).toBeTruthy();
  });
});
