import React, { useContext } from 'react';

import { CsvImportContextValue } from './types';

const noop = () => {};

/**
 * The default context shouldn't ever be used but must be provided.
 * We just supply dummy implementations of everything.
 */
const defaultContext: CsvImportContextValue = {
  state: { step: 'INITIAL' },
  resetWizard: noop,
  importParsedCsv: noop,
  confirmConfiguration: noop,
  confirmPreview: noop,
  startImport: noop,
};

const csvImportContext: React.Context<CsvImportContextValue> = React.createContext<
  CsvImportContextValue
>(defaultContext);

export const CsvImportContextProvider: React.Provider<CsvImportContextValue> =
  csvImportContext.Provider;

export function useCsvImportContext(): CsvImportContextValue {
  return useContext(csvImportContext);
}
