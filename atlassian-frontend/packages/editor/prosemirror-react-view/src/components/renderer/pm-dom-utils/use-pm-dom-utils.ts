import { RefObject, useLayoutEffect, useMemo } from 'react';

import { Node as ProseMirrorNode } from 'prosemirror-model';

import { ProseMirrorDOMUtils } from './pm-dom-utils';
import { DOMUtils } from './types';

export const useProseMirrorDOMUtils = (
  ref: RefObject<HTMLElement>,
  contentRef: RefObject<HTMLElement>,
  node: ProseMirrorNode,
  parent?: DOMUtils<ProseMirrorNode>,
) => {
  // We want to create the dom utils only once. and update the nodes if some change is detected.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pmDomUtils = useMemo(() => new ProseMirrorDOMUtils(node, parent), []);

  useLayoutEffect(() => {
    pmDomUtils.setNode(node);
  }, [node, pmDomUtils]);

  useLayoutEffect(() => {
    if (ref.current) {
      pmDomUtils.setDOM(ref.current);
    }
    if (contentRef.current) {
      pmDomUtils.setContentDOM(contentRef.current);
    }
  });

  return pmDomUtils;
};
