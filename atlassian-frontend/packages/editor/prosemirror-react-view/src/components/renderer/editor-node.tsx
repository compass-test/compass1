import React, {
  FunctionComponent,
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import { Node as ProsemirrorNode } from 'prosemirror-model';
import { useMergeRefs } from 'use-callback-ref';

import { map } from '../../utils';

import { useDOMSerializer } from './dom-serializer/context';
import { NodeComponentAttrs } from './dom-serializer/types';
import { DOMUtils } from './pm-dom-utils/types';
import { useProseMirrorDOMUtils } from './pm-dom-utils/use-pm-dom-utils';

type Props = {
  node: ProsemirrorNode;
  parent: DOMUtils<ProsemirrorNode>;
};

function getNodeAttrs(_node: ProsemirrorNode): NodeComponentAttrs {
  const nodeAttrs: NodeComponentAttrs = {
    'data-prosemirror-node': true,
  };
  return nodeAttrs;
}

const EditorNode: FunctionComponent<Props> = ({ node, parent }) => {
  const domSerializer = useDOMSerializer();

  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const mergeRef = useMergeRefs([rootRef, contentRef]);

  const refs = useMemo(() => {
    return {
      root: rootRef,
      content: contentRef,
    };
  }, [rootRef, contentRef]);
  let index = 0;

  const pmDOMUtils = useProseMirrorDOMUtils(rootRef, contentRef, node, parent);

  /**
   * return node pos
   */
  const getPos = useCallback(() => {
    return pmDOMUtils.getPos();
  }, [pmDOMUtils]);

  const NodeComponent = domSerializer.getNodeComponent(node);

  // Create children nodes
  const children = map(node, (child) => {
    return (
      <EditorNodeMemoized
        node={child}
        key={child.id ? child.id : index++}
        parent={pmDOMUtils}
      />
    );
  });

  // Create wrapper based on node component
  let Wrapper = (
    <NodeComponent
      node={node}
      ref={mergeRef}
      refs={refs}
      attrs={getNodeAttrs(node)}
      getPos={getPos}
    >
      {children}
    </NodeComponent>
  );

  // Wrap node component with the marks
  for (let i = node.marks.length - 1; i >= 0; i--) {
    const mark = node.marks[i];
    const Mark = domSerializer.getMarkComponent(node.marks[i]);
    Wrapper = (
      <Mark
        mark={mark}
        inline={node.isInline}
        attrs={{ 'data-prosemirror-mark': true }}
      >
        {Wrapper}
      </Mark>
    );
  }

  // Set final element
  return Wrapper;
};

const EditorNodeMemoized = memo(
  EditorNode,
  (prevProps, nextProps) => prevProps.node === nextProps.node,
);

export { EditorNodeMemoized as EditorNode };
