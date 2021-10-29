import * as ts from 'typescript';
import { generateProgramFileFromString } from './_helpers';
import { LintFlags, ErrorType } from '../types';
import { checkSourceFile } from '../lib/file_analyzer';

describe('file_analyzer', () => {
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
    scenario: 'when dispatch is an alias type',
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
        errorType: ErrorType.BORROWED,
        lineChar: {
          line: 10,
          character: 15,
        },
      },
    ],
    flags: LintFlags.NO_BORROWING,
  };

  const case1: Case = {
    scenario: 'when dispatch is a function type',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      function badFunction(state: EditorState, cb?: (tr: Transaction) => void) {
        cb(state.tr);
        callMe(cb);
      }
    `,
    expected: [
      {
        errorType: ErrorType.BORROWED,
        lineChar: {
          line: 9,
          character: 15,
        },
      },
    ],
    flags: LintFlags.NO_BORROWING,
  };

  const case2: Case = {
    scenario: 'when the lint flag is NONE',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      function badFunction(state: EditorState, cb?: (tr: Transaction) => void) {
        cb(state.tr);
        callMe(cb);
      }
    `,
    expected: [],
    flags: LintFlags.NONE,
  };

  const case3: Case = {
    scenario: 'when there is a double calling',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      function badFunction(state: EditorState, cb?: (tr: Transaction) => void) {
        cb(state.tr);
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 8,
          line: 8,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 8,
          line: 9,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case4: Case = {
    scenario: 'when there is a double calling coming from another branch',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      function badFunction(state: EditorState, cb?: (tr: Transaction) => void) {
        if (state) {
          cb(state.tr);
        }
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 9,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 8,
          line: 11,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case5: Case = {
    scenario: 'when command is an arrow function',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      const badFunction = (state: EditorState, cb?: (tr: Transaction) => void) => {
        cb(state.tr);
        callMe(cb);
      }
    `,
    expected: [
      {
        errorType: ErrorType.BORROWED,
        lineChar: {
          line: 9,
          character: 15,
        },
      },
    ],
    flags: LintFlags.NO_BORROWING,
  };

  const case6: Case = {
    scenario: 'when command is an arrow function with type reference',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function callMe(anyFunc: Function) {
        anyFunc();
      }

      type Command = (state: EditorState, cb?: (tr: Transaction) => void) => void;
      const badFunction: Command = (state, cb) => {
        cb(state.tr);
        callMe(cb);
      }
    `,
    expected: [
      {
        errorType: ErrorType.BORROWED,
        lineChar: {
          line: 10,
          character: 15,
        },
      },
    ],
    flags: LintFlags.NO_BORROWING,
  };

  const case7: Case = {
    scenario: 'when multiple dispatch happens in same flow',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function badFunction(
        state: EditorState,
        a: number,
        cb?: (tr: Transaction) => void
      ) {
        if (a > 12) {
          if (a < 40) {
            cb(state.tr);
            return;
          }
          if (a >= 40) {
            cb(state.tr);
          }
        }
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 12,
          line: 14,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 8,
          line: 17,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case8: Case = {
    scenario:
      'when there are multiple dispatchs on function but only one by branch',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function badFunction(
        state: EditorState,
        a: number,
        cb?: (tr: Transaction) => void
      ) {
        if (a > 12) {
          if (a < 40) {
            cb(state.tr);
            return;
          }
          if (a >= 40) {
            cb(state.tr);
          }
        }
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 12,
          line: 14,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 8,
          line: 17,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case9: Case = {
    scenario: 'when a function is returning a command a function expression',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function funTwo(inputMethod: string) {
        return function(state: EditorState, dispatch: (tr: Transaction) => void) {
          const tr = state.tr;
          dispatch(tr);
          dispatch(tr);
          return true;
        };
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 6,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 7,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case10: Case = {
    scenario:
      'when a function is returning a command as arrow function expression',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function funTwo(inputMethod: string) {
        const loko = (state: EditorState, dispatch: (tr: Transaction) => void) {
          const tr = state.tr;
          dispatch(tr);
          dispatch(tr);
          return true;
        };

        return loko;
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 6,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 7,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case11: Case = {
    scenario:
      'when a function is returning a command as arrow function expression coming from a type',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      type Command = (
        state: EditorState,
        dispatch?: (tr: Transaction) => void
      ) => boolean;

      function funOne(inputMethod: string): Command {
        return function(state, dispatch) {
          const tr = state.tr;
          dispatch(tr);
          dispatch(tr);
          return true;
        };
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 11,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 12,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case12: Case = {
    scenario: 'when a function is returning a command as arrow function',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      type Command = (
        state: EditorState,
        dispatch?: (tr: Transaction) => void
      ) => boolean;

      function funOne(inputMethod: string): Command {
        return (state, dispatch) => {
          const tr = state.tr;
          dispatch(tr);
          dispatch(tr);
          return true;
        };
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 11,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 12,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case13: Case = {
    scenario: 'when there is a multi dispatch in separated but siblings blocks',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      type Command = (
        state: EditorState,
        dispatch?: (tr: Transaction) => void,
      ) => boolean;
      function funOne(inputMethod: string): Command {
        return (state, dispatch) => {
          if (dispatch) {
            dispatch(state.tr);
          }

          if (inputMethod === "foo") {
            return false;
          }

          if (inputMethod === "lol") {
            return false;
          } else {
            if (inputMethod === "rei") {
              dispatch(state.tr);
            }

            return true;
          }
        };
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 12,
          line: 10,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 14,
          line: 21,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case14: Case = {
    scenario: 'when there multiple dispatch happening on if/else',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function badFunction(
        state: EditorState,
        a: number,
        cb?: (tr: Transaction) => void
      ) {
        if (cb) {
          if (a < 40) {
            cb(state.tr);
          } else {
            cb(state.tr);
          }
        }
      }
    `,
    expected: [],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case15: Case = {
    scenario:
      'when there multiple dispatch happening on if and in the parent block',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function badFunction(
        state: EditorState,
        a: number,
        cb?: (tr: Transaction) => void
      ) {
        if (a < 40) {
          console.log('nothing');
        } else {
          cb(state.tr);
        }
        cb(state.tr);
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 11,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 8,
          line: 13,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case16: Case = {
    scenario:
      'when there multiple dispatch happening on if and in the parent if block',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function badFunction(
        state: EditorState,
        a: number,
        cb?: (tr: Transaction) => void
      ) {
        if (cb) {
          if (a < 40) {
            console.log('nothing');
          } else {
            cb(state.tr);
          }
          cb(state.tr);
        }
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 12,
          line: 12,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 14,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
  };

  const case17: Case = {
    scenario: 'when there multiple dispatch happening on if and else block',
    sourceCode: `
      import { Transaction, EditorState } from "prosemirror-state";

      function badFunction(
        state: EditorState,
        a: number,
        cb?: (tr: Transaction) => void
      ) {
        if (cb) {
          if (a < 40) {
            cb(state.tr);
          } else {
            cb(state.tr);
          }

          cb(state.tr);
        }
      }
    `,
    expected: [
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 12,
          line: 10,
        },
      },
      {
        errorType: ErrorType.MULTIPLE_CALL,
        lineChar: {
          character: 10,
          line: 15,
        },
      },
    ],
    flags: LintFlags.NO_MULTIPLE_CALLS,
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
    case7,
    case8,
    case9,
    case10,
    case11,
    case12,
    case13,
    case14,
    case15,
    case16,
    case17,
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
