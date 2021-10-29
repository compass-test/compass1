import { SourceFile, StructureKind } from 'ts-morph';
import { getLogger } from '../../utils/get-logger';

import { OmitReferences } from '../collectors/omit/get-omit-type-references';
import { getLastImportPosition } from './common/get-last-import-position';

const log = getLogger('print:omit');

export const omitPrinter = (
  file: SourceFile,
  omitReferences: OmitReferences,
) => {
  for (const [name, info] of omitReferences) {
    if (info.node.wasForgotten()) {
      log(`forgotten type for node ${name}`);

      continue;
    }

    if (
      !info.omitPropertySignatures ||
      info.omitPropertySignatures.length === 0
    ) {
      info.node.replaceWithText('any');
      continue;
    }

    info.node.replaceWithText(info.name);
    file.insertInterface(getLastImportPosition(file), {
      name: info.name,
      properties: info.omitPropertySignatures,
      kind: StructureKind.Interface,
    });
  }
};
