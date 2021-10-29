import * as ts from 'typescript';
import {
  BlockContentTree,
  BorrowedPlaces,
  LintFlags,
  ErrorType,
  Reporter,
  DispatchBorrowed,
  DispatchCall,
} from '../types';

export function createReport(sourceFile: ts.SourceFile): Reporter {
  let found: Array<BorrowedPlaces> = [];
  function report(node: ts.Node, errorType: ErrorType) {
    found.push({
      node,
      errorType,
      lineChar: sourceFile.getLineAndCharacterOfPosition(node.getStart()),
    });
  }

  type ValidateProps = {
    blockContent: BlockContentTree;
    flags: LintFlags;
  };
  function validate({ blockContent, flags }: ValidateProps) {
    const { blocks } = blockContent;
    type DispatchActionsFiltered = {
      dispatchCalls: Array<DispatchCall>;
      dispatchBorrowers: Array<DispatchBorrowed>;
      dispatchAlreadyBorrowed: Array<DispatchCall>;
      dispatchAlreadyUsed: Array<DispatchBorrowed>;
    };
    const {
      dispatchCalls,
      dispatchBorrowers,
      dispatchAlreadyBorrowed,
      dispatchAlreadyUsed,
    } = blockContent.actions.reduce<DispatchActionsFiltered>(
      (acc, value) => {
        if (value instanceof DispatchBorrowed) {
          acc.dispatchBorrowers.push(value);

          if (acc.dispatchCalls.length > 0) {
            acc.dispatchAlreadyUsed.push(value);
          }
        } else if (value instanceof DispatchCall) {
          acc.dispatchCalls.push(value);

          if (acc.dispatchBorrowers.length > 0) {
            acc.dispatchAlreadyBorrowed.push(value);
          }
        }
        return acc;
      },
      {
        dispatchCalls: [],
        dispatchBorrowers: [],
        dispatchAlreadyBorrowed: [],
        dispatchAlreadyUsed: [],
      },
    );

    if (flags & LintFlags.NO_MULTIPLE_CALLS && dispatchCalls.length > 1) {
      dispatchCalls.forEach(dispatch => {
        report(dispatch.node, ErrorType.MULTIPLE_CALL);
      });
    }

    if (
      flags & LintFlags.NO_CALL_AFTER_DISPATCH_LENT &&
      dispatchAlreadyBorrowed.length > 0
    ) {
      dispatchAlreadyBorrowed.forEach(dispatch => {
        report(dispatch.node, ErrorType.DISPATCH_MOVED);
      });
    }

    if (
      flags & LintFlags.NO_BORROW_AFTER_DISPATCH_WAS_USED &&
      dispatchAlreadyUsed.length > 0
    ) {
      dispatchAlreadyUsed.forEach(dispatch => {
        report(dispatch.node, ErrorType.DISPATCH_ALREADY_USED);
      });
    }

    if (
      flags & LintFlags.ONLY_ONE_BORROWING_ALLOWED &&
      dispatchBorrowers.length > 1
    ) {
      dispatchBorrowers.forEach(dispatch => {
        report(dispatch.node, ErrorType.ALREADY_BORROWED);
      });
    }

    if (flags & LintFlags.NO_BORROWING && dispatchBorrowers.length >= 1) {
      dispatchBorrowers.forEach(dispatch => {
        report(dispatch.node, ErrorType.BORROWED);
      });
    }

    blocks.forEach(childBlock => {
      validate({ blockContent: childBlock, flags });
    });
  }

  return {
    found,
    report,
    validate,
  };
}
