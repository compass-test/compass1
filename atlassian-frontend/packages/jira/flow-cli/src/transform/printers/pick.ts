import { SourceFile, StructureKind } from 'ts-morph';
import { getLogger } from '../../utils/get-logger';

import { PickReferences } from '../collectors/pick/get-pick-type-references';
import { getLastImportPosition } from './common/get-last-import-position';

const log = getLogger('print:pick');

export const pickPrinter = (
  file: SourceFile,
  pickReferences: PickReferences,
) => {
  for (const [name, info] of pickReferences) {
    if (info.node.wasForgotten()) {
      log(`forgotten type for node ${name}`);
      continue;
    }

    if (
      !info.pickPropertySignatures ||
      info.pickPropertySignatures.length === 0
    ) {
      info.node.replaceWithText('any');
      continue;
    }

    info.node.replaceWithText(info.name);

    file.insertInterface(getLastImportPosition(file), {
      name: info.name,
      properties: info.pickPropertySignatures,
      kind: StructureKind.Interface,
    });
  }
};
