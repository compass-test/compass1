import { diff_js } from '@atlassian/prosemirror-synchrony-plugin/cljs/synchrony.prosemirror.diff_js';
import { create_steps_via_diff } from '@atlassian/prosemirror-synchrony-plugin/cljs/synchrony.prosemirror.provider';
import { Node } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Step as PmStep } from 'prosemirror-transform';
import { stepFromDelta } from '../step-from-delta';
import { Step } from '../types';
import * as insert from './__fixtures__/insert';
import * as remove from './__fixtures__/remove';
import * as replace from './__fixtures__/replace';
import { schema } from './__fixtures__/schema';

function apply(before: Node, steps: Step[]): Node {
  const state = EditorState.create({
    schema,
    doc: before,
  });

  const tr = steps.reduce<Transaction>(
    (tr, data) => tr.step(PmStep.fromJSON(schema, data)),
    state.tr,
  );

  return tr.doc;
}

function setup(initialDoc: any, steps: Step[]) {
  const beforeDoc = Node.fromJSON(schema, initialDoc);
  const expectedDoc = apply(beforeDoc, steps);
  const delta = diff_js(beforeDoc.toJSON(), expectedDoc.toJSON());
  const stepsFromDiff = create_steps_via_diff(
    schema,
    beforeDoc.toJSON(),
    expectedDoc.toJSON(),
  );
  return { beforeDoc, expectedDoc, delta, steps: stepsFromDiff };
}

describe('insert', () => {
  test.each([
    ['"a" at 1', insert.atOne],
    ['"b" at 2', insert.atTwo],
    ['"c" at 3', insert.atThree],
    ['"c" after empty paragraph', insert.afterEmptyParagraph],
    ['"c" at last paragraph', insert.atLastParagraph],
    ['"b" between 1 and 3', insert.between],
    ['p at EOL', insert.pAtEol],
    ['b in 2', insert.nestedExpand],
    ['b in 2', insert.appendToTextInExpand],
    ['b in 2', insert.textAfterEmptyParagraphInExpand],
    ['b in 2', insert.nestedInfoPanel],
    ['b in 3', insert.appendToTextInPanel],
    ['"a" at 6', insert.textAfterEmptyParagraphInPanel],
    ['a at 5', insert.textInTableHeader],
    ['a at 10', insert.textInTableRow],
    ['"a" at 6', insert.textInInfoPanelNestedInTableRow],
  ])('%s', (_, testCase) => {
    const { delta, expectedDoc, beforeDoc } = setup(
      testCase.initialADF,
      testCase.steps,
    );
    const { result, err } = stepFromDelta(delta, beforeDoc);
    expect(result).toEqual(testCase.steps);
    expect(err).toBeNull();

    const after = apply(beforeDoc, result!);
    expect(after.toJSON()).toEqual(expectedDoc.toJSON());
  });
});

describe('delete', () => {
  test.each([
    ['at end', remove.atTwo],
    ['middle range', remove.middleRange],
  ])('%s', (_, testCase) => {
    const { delta, expectedDoc, beforeDoc } = setup(
      testCase.initialADF,
      testCase.steps,
    );
    const { result, err } = stepFromDelta(delta, beforeDoc);
    expect(result).toEqual(testCase.steps);
    expect(err).toBeNull();

    const after = apply(beforeDoc, result!);
    expect(after.toJSON()).toEqual(expectedDoc.toJSON());
  });
});

describe('replace', () => {
  test.each([
    ['replace character', replace.replaceOne],
    ['replace range', replace.replaceRange],
  ])('%s', (name, testCase) => {
    const { delta, expectedDoc, beforeDoc } = setup(
      testCase.initialADF,
      testCase.steps,
    );
    const { result } = stepFromDelta(delta, beforeDoc);

    const after = apply(beforeDoc, result!);
    expect(after.toJSON()).toEqual(expectedDoc.toJSON());
  });
});
