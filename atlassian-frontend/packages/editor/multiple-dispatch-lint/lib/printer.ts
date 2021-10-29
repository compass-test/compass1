import * as ts from 'typescript';
import { findAncestor } from './find_ancestor';
import { BorrowedPlaces, LintFlags, ErrorMessage } from '../types';

type PrintProps = {
  fileName: string;
  issues: Array<BorrowedPlaces>;
  flags: LintFlags;
};
export function print({ issues, fileName }: PrintProps) {
  issues.forEach(r => {
    const {
      lineChar: { line, character },
      errorType,
      node,
    } = r;
    const errorMessage: string[] = [];
    errorMessage.push(`${fileName} (${line + 1},${character + 1}):`);
    const errorMessageFn = ErrorMessage[errorType];

    const callExpression = findAncestor(
      node,
      ts.isCallExpression,
    ) as ts.CallExpression;
    const functionCalledName = callExpression
      ? callExpression.expression.getText()
      : '';
    const dispatchVariableName = ts.isCallExpression(node)
      ? node.expression.getText()
      : node.getText();

    errorMessage.push(
      errorMessageFn({
        functionCalledName,
        dispatchVariableName,
      }),
    );

    // eslint-disable-next-line no-console
    console.log(errorMessage.join(' '));
  });
}
