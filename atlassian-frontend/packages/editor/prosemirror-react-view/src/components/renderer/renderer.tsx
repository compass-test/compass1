import React, { FunctionComponent, memo, useRef } from 'react';

import { Node as ProseMirrorNode } from 'prosemirror-model';

import { map } from '../../utils';

import { EditorNode } from './editor-node';
import { useProseMirrorDOMUtils } from './pm-dom-utils/use-pm-dom-utils';

interface RendererProps {
  doc: ProseMirrorNode;
}

const Renderer: FunctionComponent<RendererProps> = ({ doc }) => {
  const ref = useRef<HTMLDivElement>(null);

  let index = 0;
  const pmDOMUtils = useProseMirrorDOMUtils(ref, ref, doc);

  return (
    <div data-prosemirror-renderer={true} ref={ref}>
      {/* We dont render root doc because doesn't contain toDOM */}
      {map(doc, (child) => (
        <EditorNode
          node={child}
          key={child.id ? child.id : index++}
          parent={pmDOMUtils}
        />
      ))}
    </div>
  );
};

Renderer.displayName = 'Renderer';

const RendererMemoized = memo(Renderer);

export { RendererMemoized as Renderer };
