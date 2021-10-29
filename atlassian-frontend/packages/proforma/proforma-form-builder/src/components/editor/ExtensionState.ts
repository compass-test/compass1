import { Node as PMNode } from 'prosemirror-model';

import { UpdateExtension } from '@atlaskit/editor-common';

import {
  ExtensionParameters,
  FloatingToolbarParameters,
  GenericExtensionSelection,
} from './ExtensionSelection';

/**
 * Describes the state of an Atlassian Editor extension.
 *
 * This interface is defined by Atlaskit but is not a public export, so it has been copied here manually.
 * Original source in Atlaskit: `packages/editor/editor-core/src/plugins/extension/plugin.ts`
 */
export interface ExtensionState {
  element: HTMLElement | undefined;
  layout: ExtensionLayout;
  node: ExtensionNode;
  allowBreakout: boolean;
  stickToolbarToBottom: boolean;
  showEditButton: boolean;
  updateExtension: UpdateExtension<ExtensionParameters>;
}

export interface ExtensionNode {
  pos: number;
  node: PMNode;
}

export interface MediaNode {
  pos: number;
  node: PMNode;
}

/**
 * A simpler, custom interface that contains only the parts of an Atlassian Editor extension event which are relevant to ProForma.
 */
export interface ExtensionPluginEvent {
  node: PMNode;
  updateExtension: UpdateExtension<ExtensionParameters>;
}

export interface PfExtensionSelectionEvent {
  extension: GenericExtensionSelection<ExtensionParameters>;
  updateExtension: UpdateExtension<ExtensionParameters>;
}

export interface FloatingToolbarPluginEvent {
  node: PMNode;
  updateExtension: UpdateExtension<FloatingToolbarParameters>;
}

export type ExtensionLayout = 'default' | 'wide' | 'full-width';
