import { ParseResult } from 'papaparse';

import { State } from '../../../services/csv-import-reducer';

export type CsvImportContextValue = {
  state: State;
  resetWizard: () => void;
  importParsedCsv: (parsedCsv: ParseResult<any>) => void;
  confirmConfiguration: () => void;
  confirmPreview: () => void;
  startImport: () => void;
};
