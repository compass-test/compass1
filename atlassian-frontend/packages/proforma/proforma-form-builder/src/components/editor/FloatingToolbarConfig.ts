import { NodeType } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

/**
 * Describes the state of a floating toolbar on an Atlassian Editor plugin.
 *
 * This interface is defined by Atlaskit but is not a public export, so it has been copied here manually.
 * Original source in Atlaskit: `packages/editor/editor-core/src/plugins/floating-toolbar/types.ts`
 */
export interface FloatingToolbarConfig {
  title: string;
  getDomRef?: (view: EditorView) => HTMLElement | undefined;

  visible?: boolean;
  nodeType: NodeType | NodeType[];
  items: Array<any>;
  align?: AlignType;
  className?: string;
  height?: number;
  width?: number;
  offset?: [number, number];
  forcePlacement?: boolean;
}

export type AlignType = 'left' | 'center' | 'right';
