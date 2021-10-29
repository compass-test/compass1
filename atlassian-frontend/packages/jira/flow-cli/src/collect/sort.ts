import { DefinitionsMap, DefinitionMeta } from '.';

const sortOrder = [
  'InterfaceDeclaration',
  'TypeAliasDeclaration',
  'VariableDeclaration',
  'EnumDeclaration',
  'FunctionDeclaration',
  'ClassDeclaration',
];

const sortByType = (definitions: [string, DefinitionMeta][]) =>
  definitions.sort((a, b) => {
    if (a[1].isDefaultExport && !b[1].isDefaultExport) {
      return 1;
    }
    if (b[1].isDefaultExport && !a[1].isDefaultExport) {
      return -1;
    }

    if (a[1].isExported && !b[1].isExported) {
      return 1;
    }

    if (b[1].isExported && !a[1].isExported) {
      return -1;
    }

    const sortByObject = sortOrder.reduce<{ [key: string]: number }>(
      (obj, item, index) => ({
        ...obj,
        [item]: index,
      }),
      {},
    );

    return sortByObject[a[1].type] - sortByObject[b[1].type];
  });

export const sort = (definitions: DefinitionsMap) =>
  new Map(sortByType([...definitions]));
