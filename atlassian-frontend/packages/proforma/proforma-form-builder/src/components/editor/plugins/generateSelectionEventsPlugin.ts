import isEqual from 'lodash/isEqual';
import { NodeSelection, Plugin } from 'prosemirror-state';

import { MediaParameters } from '../../../models/MediaParameters';
import {
  ExtensionParameters,
  GenericAttributes,
  GenericExtensionAttributes,
  isMediaNodeSelection,
  isPFExtensionSelection,
} from '../ExtensionSelection';

export enum BuilderSelectionEvent {
  ExtensionSelected = 'ExtensionSelected',
  ExtensionDeselected = 'ExtensionDeselected',
  ImageSelected = 'ImageSelected',
  ImageDeselected = 'ImageDeselected',
}

export const generateSelectionEventsPlugin = (
  selectionEventHandler: (
    event: BuilderSelectionEvent,
    extension?:
      | GenericExtensionAttributes<ExtensionParameters>
      | GenericAttributes<MediaParameters>,
    newPos?: number,
  ) => void,
): Plugin => {
  return new Plugin({
    view: editorView => ({
      update(view, lastState) {
        const currentSelection = view.state.selection;
        const lastSelection = lastState.selection;

        // Avoid sending unnecessary events
        if (isEqual(lastSelection, currentSelection)) {
          return;
        }

        // Detect deselected events
        if (
          isPFExtensionSelection(lastSelection) &&
          !isPFExtensionSelection(currentSelection)
        ) {
          selectionEventHandler(BuilderSelectionEvent.ExtensionDeselected);
        }

        if (
          isMediaNodeSelection(lastSelection) &&
          !isMediaNodeSelection(currentSelection)
        ) {
          selectionEventHandler(BuilderSelectionEvent.ImageDeselected);
        }

        // Detect selection events
        // Check if this is a PF extension
        if (isPFExtensionSelection(currentSelection)) {
          const selection = currentSelection as NodeSelection;
          const newPos = selection.$anchor.pos;
          const extension = selection.node.attrs as GenericExtensionAttributes<
            ExtensionParameters
          >;

          selectionEventHandler(
            BuilderSelectionEvent.ExtensionSelected,
            extension,
            newPos,
          );
        }

        if (isMediaNodeSelection(currentSelection)) {
          const selection = currentSelection as NodeSelection;
          const attrs = selection.node.attrs as GenericAttributes<
            MediaParameters
          >;
          const url = selection.node.content.firstChild!.attrs.url;
          const extension: GenericAttributes<MediaParameters> = {
            parameters: {
              ...attrs,
              url: url || '',
            },
          };
          selectionEventHandler(BuilderSelectionEvent.ImageSelected, extension);
        }
      },
    }),
  });
};
