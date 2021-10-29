import { SourceFile } from 'ts-morph';
import { getImportTypes } from '../collectors/get-import-types';
import { printImportType } from '../printers/import-type';

export const transformImportTypes = (target: SourceFile) => {
  const importTypes = getImportTypes(target);

  printImportType(target, importTypes);
};

export default transformImportTypes;
