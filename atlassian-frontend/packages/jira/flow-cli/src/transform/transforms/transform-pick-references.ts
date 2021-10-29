import { SourceFile } from 'ts-morph';
import { getLogger } from '../../utils/get-logger';

import { getPickTypeReferences } from '../collectors/pick/get-pick-type-references';
import { pickPrinter } from '../printers/pick';

const log = getLogger('transform:pick');

export const transformPickReferences = (target: SourceFile) => {
  const pickReferences = getPickTypeReferences(target);
  log(pickReferences);
  pickPrinter(target, pickReferences);

  return target;
};

export default transformPickReferences;
