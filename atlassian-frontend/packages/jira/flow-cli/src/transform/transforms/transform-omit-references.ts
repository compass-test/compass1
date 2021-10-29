import { SourceFile } from 'ts-morph';
import { getLogger } from '../../utils/get-logger';

import { getOmitTypeReferences } from '../collectors/omit/get-omit-type-references';
import { omitPrinter } from '../printers/omit';

const log = getLogger('transform:omit');

export const transformOmitReferences = (target: SourceFile) => {
  const omitReferences = getOmitTypeReferences(target);
  log(omitReferences);
  omitPrinter(target, omitReferences);
};

export default transformOmitReferences;
