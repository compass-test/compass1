import {
  Children,
  cloneElement,
  createElement,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';

import { DOMOutputSpec } from 'prosemirror-model';

import { attributesToProps } from '../../../../../utils/attributes-to-props/attributes-to-props';
import { NodeRefs } from '../../types';

type Props = Record<string, any>;
type DOMOutputSpecChild = Exclude<DOMOutputSpec, string> | 0;
type CustomDOMOutputSpecArray = [
  string,
  DOMOutputSpecChild | { [attr: string]: string } | undefined,
  ...DOMOutputSpecChild[]
];

function isProp(props: any): props is Props {
  return (
    props &&
    typeof props === 'object' &&
    props.nodeType == null &&
    !Array.isArray(props)
  );
}

function isNode(node: any): node is Node {
  return node.nodeType != null;
}
// Based on: https://github.com/ProseMirror/prosemirror-model/blob/0ad6b98c26218a4324767361a6f83a5837c4496e/src/to_dom.js#L119
function _toReactElement(
  structure: DOMOutputSpec,
  depth: number,
  childrenElement?: ReactNode,
  contentRef?: Ref<HTMLElement | null>,
): { element: ReactElement; childAt?: number } {
  // TODO: Implement support to dom nodes (I think this will not be possible at all)
  if (isNode(structure)) {
    throw new Error(
      'Prosemirror React View it doesnt support plain dom nodes yet.',
    );
  }

  if (typeof structure === 'string') {
    // @ts-ignore
    // TODO: React doesn't recognize string as a ReactElement
    return { element: structure };
  }
  // Casting to custom implementation to make happy typescript
  const typedStructure = structure as CustomDOMOutputSpecArray;

  // We have a DOM Spec Array
  const elementType = typedStructure[0];

  let maybeProps: Record<string, any> | null = null;
  let start = 1;
  if (isProp(typedStructure[1])) {
    start = 2;
    maybeProps = attributesToProps(typedStructure[1]);
  }

  const children: JSX.Element[] = [];
  let childAt;
  for (let i = start; i < typedStructure.length; i++) {
    const child = typedStructure[i] as DOMOutputSpecChild;
    // If it's the insertion point create the element with the props and the children element
    if (child === 0) {
      if (i < typedStructure.length - 1 || i > start) {
        throw new RangeError(
          'Content hole must be the only child of its parent node',
        );
      }
      // need to set the content dom ref at this point
      return {
        element: createElement(
          elementType,
          maybeProps ? { ...maybeProps, ref: contentRef } : { ref: contentRef },
          childrenElement,
        ),
        childAt: depth,
      };
    } else {
      // It's another element, example ['div', {}?, 0]
      const { element: childElement, childAt: _childAt } = _toReactElement(
        child,
        depth + 1,
        childrenElement,
        contentRef,
      );
      childAt = _childAt;
      children.push(childElement);
    }
  }
  // Create the element with the props and his children
  return {
    element: createElement(elementType, maybeProps, ...children),
    childAt,
  };
}

function isSelfEnclosing(type: string) {
  return ['hr', 'br'].indexOf(type) !== -1;
}

export function domOutputSpecToReactElement(
  structure: Exclude<DOMOutputSpec, string>,
  attrs?: {
    ref?: Ref<HTMLElement | null>;
    [key: string]: any;
  },
  childrenElement?: ReactNode,
  refs?: NodeRefs,
): ReactElement {
  const { element, childAt } = _toReactElement(
    structure,
    0,
    childrenElement,
    refs ? refs.content : undefined,
  );
  const attrsWithRef = { ...attrs };
  if (refs && childAt && childAt > 0) {
    (attrsWithRef as any).ref = refs.content; // TODO: Remove this any
  }

  if (!isSelfEnclosing(element.type as string)) {
    if (childAt === undefined && Children.count(childrenElement) > 0) {
      const children = [childrenElement];
      if (element.props && element.props.children) {
        children.push(element.props.children);
      }
      return cloneElement(element, attrsWithRef, ...children);
    }
  }
  // Child was handled

  return cloneElement(element, attrsWithRef);
}
