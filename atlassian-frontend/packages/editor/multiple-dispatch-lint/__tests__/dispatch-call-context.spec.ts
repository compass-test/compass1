import * as ts from 'typescript';
import { generateProgramFileFromString } from './_helpers';
import { LintFlags, ErrorType } from '../types';
import { checkSourceFile } from '../lib/file_analyzer';

describe('dispatch call context scenarios', () => {
  type Case = {
    scenario: string;
    sourceCode: string;
    expected: Array<{
      lineChar: ts.LineAndCharacter;
      errorType: ErrorType;
    }>;
    flags: LintFlags;
  };
  const case0: Case = {
    scenario: 'when dispatch was borrowed and is called in the same scope',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, cb?: AliasDispatchFunction) {
        callMe(cb);
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.DISPATCH_MOVED,
        lineChar: {
          character: 8,
          line: 10,
        },
      },
    ],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  const case1: Case = {
    scenario: 'when dispatch was borrowed in another scope',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        if (a > 10) {
          callMe(cb);
          return false;
        }

        cb(state.tr);
      }
    `,
    expected: [],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  const case2: Case = {
    scenario: 'when dispatch was borrowed in if block and called later',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        if (a > 10) {
          callMe(cb);
        }

        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.DISPATCH_MOVED,
        lineChar: {
          character: 8,
          line: 13,
        },
      },
    ],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  const case3: Case = {
    scenario: 'when dispatch was borrowed in else block and called later',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        if (a > 10) {
          console.log('nothing');
        } else {
          callMe(cb);
        }

        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.DISPATCH_MOVED,
        lineChar: {
          character: 8,
          line: 15,
        },
      },
    ],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  const case4: Case = {
    scenario: 'when dispatch was borrowed in if expression and called later',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        if (callMe(cb)) {
          cb(state.tr);
        }
      }
    `,
    expected: [
      {
        errorType: ErrorType.DISPATCH_MOVED,
        lineChar: {
          character: 10,
          line: 10,
        },
      },
    ],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  const case5: Case = {
    scenario: 'when dispatch was borrowed in if expression and called later',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        const tr = state.tr;
        if (cb && tr && a > 10) {
          cb(state.tr);
          return true;
        }

        if (cb && tr && a < 10) {
          cb(state.tr);
          return true;
        }
      }
    `,
    expected: [],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  const case6: Case = {
    scenario: 'when dispatch was called and borrowed in the same scope',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, cb?: AliasDispatchFunction) {
        cb(state.tr);
        callMe(cb);
      }
    `,
    expected: [
      {
        errorType: ErrorType.DISPATCH_ALREADY_USED,
        lineChar: {
          character: 15,
          line: 10,
        },
      },
    ],
    flags: LintFlags.NO_BORROW_AFTER_DISPATCH_WAS_USED,
  };

  describe.each<Case>([
    // prettier-ignore
    case0,
    case1,
    case2,
    case3,
    case4,
    case5,
    case6,
  ])(
    '[case%#] should check lint result',
    ({ scenario, sourceCode, expected, flags }) => {
      it(scenario, () => {
        const fakeProgram = generateProgramFileFromString({ sourceCode });
        const result = checkSourceFile({
          ...fakeProgram,
          flags,
        });
        expect(result).toHaveLength(expected.length);
        const filteredResult = result.map(r => ({
          errorType: r.errorType,
          lineChar: r.lineChar,
        }));
        expect(filteredResult).toEqual(expected);
      });
    },
  );
});
