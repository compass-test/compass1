import { SourceFile } from 'ts-morph';
import { ImportTypes } from '../collectors/get-import-types';

export const printImportType = (file: SourceFile, nodes: ImportTypes) => {
  for (const [node, info] of nodes) {
    if (node.wasForgotten()) {
      continue;
    }

    node.replaceWithText(info.type);
  }
};
