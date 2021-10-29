import { EditorState } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { Step } from 'prosemirror-transform';

type ResultADT = { err: Error; result: null } | { err: null; result: boolean };

export const validateSteps = (
  state: EditorState,
  steps: Step[],
  expectedDoc: any,
): ResultADT => {
  const { tr, schema } = state;
  try {
    steps
      .map((step) => Step.fromJSON(schema, step))
      .forEach((step) => tr.step(step));
  } catch (err) {
    return { err, result: null };
  }

  let expected;
  try {
    expected = Node.fromJSON(schema, expectedDoc);
  } catch (err) {
    return { err, result: null };
  }

  return { err: null, result: tr.doc.eq(expected) };
};
