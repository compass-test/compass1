import {
  SyntaxKind,
  Node,
  TypeAliasDeclarationStructure,
  StructureKind,
} from 'ts-morph';
import { getLogger } from '../../utils/get-logger';

const log = getLogger('transform:replace-interface-with-numerical-literal');

export const transformInterfaceWithNumericalLiteral = (
  statement: Node,
): TypeAliasDeclarationStructure | undefined => {
  if (Node.isInterfaceDeclaration(statement)) {
    const numericalLiteral = statement.getFirstDescendantByKind(
      SyntaxKind.NumericLiteral,
    );

    if (
      numericalLiteral &&
      numericalLiteral.getParentWhileKind(SyntaxKind.PropertySignature)
    ) {
      log(statement.getName());
      const {
        name,
        isExported,
        isDefaultExport,
        ...rest
      } = statement.getStructure();

      let arrayType: string = '';
      if (rest && rest.extends && Array.isArray(rest.extends)) {
        if (typeof rest.extends[0] === 'string') {
          arrayType = rest.extends[0];
        }
      }
      if (!arrayType.includes('Array')) {
        return;
      }

      arrayType = arrayType.replace('Array<', '(').replace('>', ')[]');
      log(arrayType);

      return {
        type: arrayType,
        name,
        isExported,
        isDefaultExport,
        kind: StructureKind.TypeAlias,
      };
    }
  }
};
