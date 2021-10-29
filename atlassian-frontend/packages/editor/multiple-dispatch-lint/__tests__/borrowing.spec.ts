import * as ts from 'typescript';
import { generateProgramFileFromString } from './_helpers';
import { LintFlags, ErrorType } from '../types';
import { checkSourceFile } from '../lib/file_analyzer';

describe('borrowing scenarios', () => {
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
    scenario: 'when dispatch is borrowed in different context',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        if (a > 10) {
          callMe(cb);
          return;
        }

        callMe(cb);
      }
    `,
    expected: [],
    flags: LintFlags.ONLY_ONE_BORROWING_ALLOWED,
  };

  const case1: Case = {
    scenario:
      'when dispatch is borrowed in different scopes but in the same context',
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

        callMe(cb);
      }
    `,
    expected: [
      {
        errorType: ErrorType.ALREADY_BORROWED,
        lineChar: {
          character: 17,
          line: 10,
        },
      },
      {
        errorType: ErrorType.ALREADY_BORROWED,
        lineChar: {
          character: 15,
          line: 13,
        },
      },
    ],
    flags: LintFlags.ONLY_ONE_BORROWING_ALLOWED,
  };

  const case2: Case = {
    scenario:
      'when dispatch is used in the if expression but it was not borrowed',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a: number, cb?: AliasDispatchFunction) {
        const tr = state.tr;
        if (cb && tr) {
          cb(tr);
        }
      }
    `,
    expected: [],
    flags: LintFlags.NO_CALL_AFTER_DISPATCH_LENT,
  };

  describe.each<Case>([
    // prettier-ignore
    case0,
    case1,
    case2,
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
