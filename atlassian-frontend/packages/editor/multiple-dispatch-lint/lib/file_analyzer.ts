import * as ts from 'typescript';
import { BorrowedPlaces, LintFlags } from '../types';
import { createReport } from './report';
import { createFunctionExtractor } from './function_extractor';
import { createBlockAnalizer } from './block_analyzer';

type Props = {
  program: ts.Program;
  fileName: string;
  flags: LintFlags;
};
export function checkSourceFile({
  program,
  fileName,
  flags,
}: Props): Array<BorrowedPlaces> {
  const sourceFile = program.getSourceFile(fileName);
  if (!sourceFile) {
    return [];
  }

  const checker = program.getTypeChecker();
  const extractFunctionParameters = createFunctionExtractor({ checker });
  const { found, validate } = createReport(sourceFile);

  const start = (parentNode: ts.Node) => {
    ts.forEachChild(parentNode, node => {
      if (
        ts.isFunctionDeclaration(node) ||
        ts.isFunctionExpression(node) ||
        ts.isArrowFunction(node)
      ) {
        const dispatchArg = extractFunctionParameters(node);

        if (!dispatchArg) {
          return start(node);
        }
        const isSymbolProseMirrorDispatch = (symbol: ts.Symbol) => {
          return symbol === dispatchArg;
        };
        const analyzerFunctionBlock = createBlockAnalizer({
          checker,
          isSymbolProseMirrorDispatch,
        });

        const blockContent = analyzerFunctionBlock(node.body!);

        validate({ blockContent, flags });
      } else {
        start(node);
      }
    });
  };

  start(sourceFile);

  return found.sort((x, y) => {
    return x.lineChar.line > y.lineChar.line ? 1 : -1;
  });
}
