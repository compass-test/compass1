import React from 'react';

import { dropCursor } from 'prosemirror-dropcursor';
import { Slice } from 'prosemirror-model';
import {
  EditorState,
  NodeSelection,
  Plugin,
  Transaction,
} from 'prosemirror-state';
import {
  findParentNodeOfType,
  findSelectedNodeOfType,
  isNodeSelection,
  replaceSelectedNode,
} from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { IntlShape } from 'react-intl';

import { Transformer } from '@atlaskit/editor-common';
import {
  Editor,
  EditorActions,
  EditorProps,
  EventDispatcher,
} from '@atlaskit/editor-core';
import { B200 } from '@atlaskit/theme/colors';
import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';
import { withProFormaIntlProvider } from '@atlassian/proforma-translations';

import { MediaParameters } from '../../models/MediaParameters';

import {
  ExtensionParameters,
  ExtensionSelection,
  FloatingToolbarParameters,
  GenericAttributes,
  GenericExtensionAttributes,
  MediaSingleSelection,
} from './ExtensionSelection';
import { ExtensionNode, MediaNode } from './ExtensionState';
import { generateQuestionDeletedPlugin } from './plugins/generateQuestionDeletedPlugin';
import { generateQuestionTypeChangedPlugin } from './plugins/generateQuestionTypeChangedPlugin';
import {
  BuilderSelectionEvent,
  generateSelectionEventsPlugin,
} from './plugins/generateSelectionEventsPlugin';
import { ExtendedEditorWrapper } from './styled';

interface ExtendedEditorProps extends EditorProps {
  onExtensionSelected?: (extension: ExtensionSelection) => void;
  onExtensionDeselected?: () => void;
  onImageSelected?: (selected: MediaSingleSelection) => void;
  onImageDeselected?: () => void;
  onPaste?: (slice: Slice) => Slice;
  onDrop?: (slice: Slice, dropPosition: number) => boolean;
  onQuestionDeleted?: (questionId: number, type: FormQuestionType) => void;
  onQuestionTypeChanged?: (
    questionId: number,
    prevType: FormQuestionType,
    newType: FormQuestionType,
  ) => void;
}

interface Context {
  editorActions?: EditorActions;
  intl: IntlShape;
}

/**
 * At the moment, the editor does not export its messages using Atlassian Frontend exports.
 * They plan to fix it in https://product-fabric.atlassian.net/browse/ED-12605, but it might take a while.
 * This is the stopgap solution to be able to obtain the messages correctly in production environment.
 */
const getI18nMessages = () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    return require('@atlaskit/editor-core/dist/cjs/i18n');
  } catch {
    // Fallback to default messages when used out of production (e.g. storybook).
    return {};
  }
};

/**
 * An extended version of the Atlassian Editor with overrides that allow us to hook into the event dispatch queue.
 *
 * This means that we can monitor the low-level behaviour of the editor to detect when our extensions are being
 * used, and so display the appropriate question or section etc in the form builder sidebar.
 */
export const ExtendedEditor = withProFormaIntlProvider(
  getI18nMessages(),
  class ExtendedEditorComponent extends Editor {
    private view?: EditorView;
    private readonly onExtensionSelected?: (
      extension: ExtensionSelection,
    ) => void;
    private readonly onExtensionDeselected?: () => void;
    private readonly onImageSelected?: (selected: MediaSingleSelection) => void;
    private readonly onImageDeselected?: () => void;
    private readonly onPaste?: (slice: Slice) => Slice;
    private readonly onDrop?: (slice: Slice, dropPosition: number) => boolean;
    private readonly onQuestionDeleted?: (
      questionId: number,
      type: FormQuestionType,
    ) => void;
    private readonly onQuestionTypeChanged?: (
      questionId: number,
      prevType: FormQuestionType,
      newType: FormQuestionType,
    ) => void;

    private readonly wrapperNode: any;

    constructor(props: ExtendedEditorProps, context: Context) {
      super(props, context);
      this.onExtensionSelected = props.onExtensionSelected;
      this.onExtensionDeselected = props.onExtensionDeselected;
      this.onImageSelected = props.onImageSelected;
      this.onImageDeselected = props.onImageDeselected;
      this.onPaste = props.onPaste;
      this.onDrop = props.onDrop;
      this.onQuestionDeleted = props.onQuestionDeleted;
      this.onQuestionTypeChanged = props.onQuestionTypeChanged;
      this.wrapperNode = React.createRef();
    }

    render() {
      return (
        <ExtendedEditorWrapper ref={this.wrapperNode}>
          {super.render()}
        </ExtendedEditorWrapper>
      );
    }

    onEditorCreated(instance: {
      view: EditorView;
      eventDispatcher: EventDispatcher;
      transformer?: Transformer<string>;
    }): void {
      this.view = instance.view;
      const { state } = this.view;

      const extraPlugins: Plugin[] = [];

      // Add drop cursor plugin
      extraPlugins.push(dropCursor({ color: B200 }));

      // Add plugin to detect deleted PF questions
      if (this.onQuestionDeleted) {
        extraPlugins.push(
          generateQuestionDeletedPlugin(this.onQuestionDeleted),
        );
      }

      // Add plugin to detect when a PF question changes type
      if (this.onQuestionTypeChanged) {
        extraPlugins.push(
          generateQuestionTypeChangedPlugin(this.onQuestionTypeChanged),
        );
      }

      extraPlugins.push(
        generateSelectionEventsPlugin((event, extension, newPos) => {
          if (
            event === BuilderSelectionEvent.ExtensionSelected &&
            extension &&
            typeof newPos !== 'undefined'
          ) {
            if (this.onExtensionSelected) {
              // Build selection object
              const extensionSelection: ExtensionSelection = {
                extension: extension as GenericExtensionAttributes<
                  ExtensionParameters
                >,
                updateExtension: this.updateExtensionProperties,
                pos: newPos,
              };

              this.onExtensionSelected(extensionSelection);
            }
          }

          if (event === BuilderSelectionEvent.ExtensionDeselected) {
            if (this.onExtensionDeselected) {
              this.onExtensionDeselected();
            }
          }

          if (event === BuilderSelectionEvent.ImageSelected && extension) {
            if (this.onImageSelected) {
              // Build selection object
              const extensionSelection: MediaSingleSelection = {
                extension: extension as GenericAttributes<MediaParameters>,
                updateSelection: this.updateMediaSingleProperties,
              };

              this.onImageSelected(extensionSelection);
            }
          }

          if (event === BuilderSelectionEvent.ImageDeselected) {
            if (this.onImageDeselected) {
              this.onImageDeselected();
            }
          }
        }),
      );

      // Add the transformPasted prop to the underlying Prosemirror editor
      if (this.onPaste) {
        const editorProps = this.view.props;

        editorProps.transformPasted = (slice: Slice): Slice => {
          return this.onPaste!(slice);
        };
      }

      if (this.onDrop) {
        const editorProps = this.view.props;

        editorProps.handleDrop = (
          dropView: EditorView,
          event: any,
          slice: Slice,
        ): boolean => {
          const dropPosition = dropView.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!dropPosition) {
            return true;
          }

          return this.onDrop!(slice, dropPosition.pos);
        };
      }

      const newState = state.reconfigure({
        plugins: [...state.plugins, ...extraPlugins],
      });
      this.view.updateState(newState);

      super.onEditorCreated(instance);
    }

    private static getExtensionNode(state: EditorState): ExtensionNode {
      const { selection } = state;
      const { extension, bodiedExtension } = state.schema.nodes;

      if (
        isNodeSelection(selection) &&
        findSelectedNodeOfType([extension, bodiedExtension])(selection)
      ) {
        return {
          node: (selection as NodeSelection).node,
          pos: selection.$from.pos,
        };
      }

      return findParentNodeOfType([extension, bodiedExtension])(
        selection,
      ) as ExtensionNode;
    }

    private static getMediaSingleNode(state: EditorState): MediaNode {
      const { selection } = state;
      const { mediaSingle } = state.schema.nodes;

      if (
        isNodeSelection(selection) &&
        findSelectedNodeOfType([mediaSingle])(selection)
      ) {
        return {
          node: (selection as NodeSelection).node,
          pos: selection.$from.pos,
        };
      }

      return findParentNodeOfType([mediaSingle])(selection) as ExtensionNode;
    }

    private updateExtensionProperties = async (
      update: ExtensionParameters,
    ): Promise<ExtensionParameters | undefined> => {
      const { view } = this;

      if (view) {
        const { dispatch, state } = view;

        // Get the actual node of the selected extension; the node parameter may be a child of the node rather than the node itself
        const selectedNode = ExtendedEditorComponent.getExtensionNode(state);

        if (!selectedNode) {
          return undefined;
        }

        const newAttrs = {
          ...selectedNode.node.attrs,
          parameters: {
            ...selectedNode.node.attrs.parameters,
            ...update,
          },
        };

        const extensionType = selectedNode.node.type.name;

        // Create a new node with the new attributes but the existing content and marks (if any)
        const newNode = state.schema.nodes[extensionType].create(
          newAttrs,
          selectedNode.node.content,
          selectedNode.node.marks,
        );
        if (!newNode) {
          return undefined;
        }

        // Transaction holds the list of changes to be made to the ProseMirror document, if any
        let transaction: Transaction | undefined;

        if (extensionType === 'extension') {
          // Extensions like questions are simple single nodes, updating them just requires replacing them with a new node.
          transaction = replaceSelectedNode(newNode)(state.tr);

          // Replacing selected node doesn't update the selection. `selection.node` still returns the old node
          transaction = transaction.setSelection(
            NodeSelection.create(transaction.doc, state.selection.anchor),
          );
        } else if (extensionType === 'bodiedExtension') {
          // BodiedExtensions like sections are complex hierarchical nodes, updating them requires identifying the extent of the hierarchy
          // and replacing that range of the document with a new hierarchy of nodes.

          // Determine the range of the BodiedExtension (section)
          const replaceFrom = selectedNode.pos;
          const replaceTo = replaceFrom + selectedNode.node.nodeSize;

          // Replace the existing BodiedExtension with its new version
          transaction = state.tr;
          transaction.replaceRangeWith(replaceFrom, replaceTo, newNode);

          // The replacement above doesn't update the selection, so manually select the new node to avoid weird behaviour in the editor
          transaction = transaction.setSelection(
            NodeSelection.create(transaction.doc, replaceFrom),
          );
        }

        // The editor only updates once we dispatch the transaction, so if there are any changes dispatch them now
        if (transaction && dispatch) {
          dispatch(transaction);
        }

        return newAttrs.parameters;
      }
      return undefined;
    };

    private updateMediaSingleProperties = async (
      update: FloatingToolbarParameters,
    ): Promise<FloatingToolbarParameters | undefined> => {
      const { view } = this;

      if (view) {
        const { dispatch, state } = view;

        // Get the actual node of the selected media; the node parameter may be a child of the node rather than the node itself
        const selectedNode = ExtendedEditorComponent.getMediaSingleNode(state);

        if (!selectedNode) {
          return undefined;
        }

        const firstChild = selectedNode.node.content.firstChild;
        if (!firstChild) {
          return;
        }

        const newAttrs = { ...firstChild.attrs, ...update };
        const childTypeName = firstChild.type.name;
        const newChildNode = state.schema.nodes[childTypeName].create(
          newAttrs,
          firstChild.content,
          firstChild.marks,
        );
        const newNodeContent = selectedNode.node.content.replaceChild(
          0,
          newChildNode,
        );

        const nodeTypeName = selectedNode.node.type.name;
        const newNode = state.schema.nodes[nodeTypeName].create(
          selectedNode.node.attrs,
          newNodeContent,
          selectedNode.node.marks,
        );
        if (!newNode) {
          return undefined;
        }

        // Transaction holds the list of changes to be made to the ProseMirror document, if any
        let transaction: Transaction | undefined;

        if (nodeTypeName === 'mediaSingle') {
          // Extensions like questions are simple single nodes, updating them just requires replacing them with a new node.
          transaction = replaceSelectedNode(newNode)(state.tr);

          // Replacing selected node doesn't update the selection. `selection.node` still returns the old node
          transaction = transaction.setSelection(
            NodeSelection.create(transaction.doc, state.selection.anchor),
          );

          // Adjust the scroll point to make sure the extension is visible after the update
          transaction.scrollIntoView();
        }

        // The editor only updates once we dispatch the transaction, so if there are any changes dispatch them now
        if (transaction && dispatch) {
          dispatch(transaction);
        }

        return update;
      }
      return undefined;
    };
  },
);
