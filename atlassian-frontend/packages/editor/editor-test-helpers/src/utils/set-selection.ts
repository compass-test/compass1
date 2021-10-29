import { Refs, RefsNode, DocBuilder } from '../doc-builder';
import { EditorView } from 'prosemirror-view';
import {
  GapCursorSelection,
  GapCursorSide,
} from '@atlaskit/editor-core/test-utils';
import { findCellClosestToPos } from '@atlaskit/editor-tables/utils';
import { CellSelection } from '@atlaskit/editor-tables/cell-selection';
import { NodeSelection, TextSelection, Transaction } from 'prosemirror-state';

const positionExists = (position: number | undefined): boolean =>
  typeof position === 'number';

export function setSelectionTransform(doc: RefsNode, tr: Transaction) {
  let refs: Refs = doc.refs;

  if (refs) {
    // Collapsed selection.
    if (positionExists(refs['<>'])) {
      tr.setSelection(TextSelection.create(tr.doc, refs['<>']));
      // Expanded selection
    } else if (positionExists(refs['<']) || positionExists(refs['>'])) {
      if (!positionExists(refs['<'])) {
        throw new Error('A `<` ref must complement a `>` ref.');
      }
      if (!positionExists(refs['>'])) {
        throw new Error('A `>` ref must complement a `<` ref.');
      }
      tr.setSelection(TextSelection.create(tr.doc, refs['<'], refs['>']));
    }
    // CellSelection
    else if (positionExists(refs['<cell']) && positionExists(refs['cell>'])) {
      const anchorCell = findCellClosestToPos(tr.doc.resolve(refs['<cell']));
      const headCell = findCellClosestToPos(tr.doc.resolve(refs['cell>']));
      if (anchorCell && headCell) {
        tr.setSelection(
          new CellSelection(
            tr.doc.resolve(anchorCell.pos),
            tr.doc.resolve(headCell.pos),
          ) as any,
        );
      }
    }
    // NodeSelection
    else if (positionExists(refs['<node>'])) {
      tr.setSelection(NodeSelection.create(tr.doc, refs['<node>']));
    }
    // GapCursor right
    // This may look the wrong way around here, but looks correct in the tests. Eg:
    // doc(hr(), '{<|gap>}') = Horizontal rule with a gap cursor on its right
    // The | denotes the gap cursor's side, based on the node on the side of the |.
    else if (positionExists(refs['<|gap>'])) {
      tr.setSelection(
        new GapCursorSelection(
          tr.doc.resolve(refs['<|gap>']),
          GapCursorSide.RIGHT,
        ),
      );
    }
    // GapCursor left
    else if (positionExists(refs['<gap|>'])) {
      tr.setSelection(
        new GapCursorSelection(
          tr.doc.resolve(refs['<gap|>']),
          GapCursorSide.LEFT,
        ),
      );
    }
  }

  return {
    tr,
    refs,
  };
}

export function setSelection(doc?: DocBuilder, editorView?: EditorView): Refs {
  let refs: Refs = {};

  if (doc && editorView) {
    // replace the document
    const tr = editorView.state.tr;
    const defaultDoc = doc(editorView.state.schema);

    tr.setMeta('addToHistory', false);
    tr.replaceWith(0, tr.doc.nodeSize - 2, defaultDoc.content);
    tr.setMeta('replaceDocument', true);
    editorView.dispatch(tr);

    // add selection
    const transformed = setSelectionTransform(defaultDoc, editorView.state.tr);
    refs = transformed.refs;

    editorView.dispatch(transformed.tr);
  }

  return refs;
}
