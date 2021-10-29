import * as ts from 'typescript';
import { generateProgramFileFromString } from './_helpers';
import { LintFlags, ErrorType } from '../types';
import { checkSourceFile } from '../lib/file_analyzer';

describe('flag configurations', () => {
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
    scenario: 'when multiple offense happens',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, cb?: AliasDispatchFunction) {
        callMe(cb);
        callMe(cb);
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.ALREADY_BORROWED,
        lineChar: {
          character: 15,
          line: 9,
        },
      },
      {
        errorType: ErrorType.ALREADY_BORROWED,
        lineChar: {
          character: 15,
          line: 10,
        },
      },
      {
        errorType: ErrorType.DISPATCH_MOVED,
        lineChar: {
          character: 8,
          line: 11,
        },
      },
    ],
    flags:
      LintFlags.NO_CALL_AFTER_DISPATCH_LENT |
      LintFlags.ONLY_ONE_BORROWING_ALLOWED,
  };

  const case1: Case = {
    scenario:
      'when multiple offense happens coming from different blocks in same scope',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type AliasDispatchFunction = (tr: Transaction) => void;
      function badFunction(state: EditorState, a:number, cb?: AliasDispatchFunction) {
        if (a > 9) {
          callMe(cb);
        }
        if (a > 10) {
          callMe(cb);
        }
        cb(state.tr);
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
          character: 17,
          line: 13,
        },
      },
      {
        errorType: ErrorType.DISPATCH_MOVED,
        lineChar: {
          character: 8,
          line: 15,
        },
      },
    ],
    flags:
      LintFlags.NO_CALL_AFTER_DISPATCH_LENT |
      LintFlags.ONLY_ONE_BORROWING_ALLOWED,
  };
  describe.each<Case>([
    // prettier-ignore
    case0,
    case1,
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
