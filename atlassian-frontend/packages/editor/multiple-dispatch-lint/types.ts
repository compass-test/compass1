import type * as ts from 'typescript';

class DispatchAction<T> {
  node: T;

  constructor(node: T) {
    this.node = node;
  }
}

export class DispatchCall extends DispatchAction<ts.CallExpression> {}
export class DispatchBorrowed extends DispatchAction<ts.Identifier> {}

export type BlockContentTree = {
  blocks: Array<BlockContentTree>;
  elseBlock: BlockContentTree | null;
  actions: Array<DispatchCall | DispatchBorrowed>;
  hasReturn: boolean;
};
export type ReportFn = (node: ts.Node, errorType: ErrorType) => void;
export type Reporter = {
  found: Array<BorrowedPlaces>;
  report: ReportFn;
  validate: (props: {
    blockContent: BlockContentTree;
    flags: LintFlags;
  }) => void;
};
export enum LintFlags {
  NO_BORROW_AFTER_DISPATCH_WAS_USED = 32,
  NO_CALL_AFTER_DISPATCH_LENT = 16,
  ONLY_ONE_BORROWING_ALLOWED = 8,
  NO_MULTIPLE_CALLS = 4,
  NO_BORROWING = 2,
  NONE = 0,
}

export enum ErrorType {
  DISPATCH_ALREADY_USED = 32,
  DISPATCH_MOVED = 16,
  ALREADY_BORROWED = 8,
  BORROWED = 4,
  MULTIPLE_CALL = 2,
}

type BorrowedErrorFn = (props: {
  functionCalledName?: string;
  dispatchVariableName?: string;
}) => string;

export const ErrorMessage: Record<ErrorType, BorrowedErrorFn> = {
  [ErrorType.BORROWED]: ({ functionCalledName, dispatchVariableName }) =>
    `[ET-0001] The function: "${functionCalledName}" can't borrow the "${dispatchVariableName}" variable from the current scope`,
  [ErrorType.MULTIPLE_CALL]: ({ dispatchVariableName }) =>
    `[ET-0002] The variable: "${dispatchVariableName}" can't be called multiple times.`,
  [ErrorType.ALREADY_BORROWED]: ({
    functionCalledName,
    dispatchVariableName,
  }) =>
    `[ET-0003] The variable: "${dispatchVariableName}" was lent already. This function: "${functionCalledName}" can't borrow it anymore.`,
  [ErrorType.DISPATCH_MOVED]: ({ dispatchVariableName }) =>
    `[ET-0004] The variable: ${dispatchVariableName} was lent before. It can't be called anymore`,
  [ErrorType.DISPATCH_ALREADY_USED]: ({ dispatchVariableName }) =>
    `[ET-0005] The variable: ${dispatchVariableName} was called before. It can't be lend anymore`,
};

export type BorrowedPlaces = {
  node: ts.Node;
  lineChar: ts.LineAndCharacter;
  errorType: ErrorType;
};
